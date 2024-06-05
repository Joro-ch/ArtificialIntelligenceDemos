import csv
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from scikitty.models.DecisionTree import DecisionTree
from scikitty.view.TreeVisualizer import TreeVisualizer
from scikitty.persist.TreePersistence import TreePersistence
from scikitty.metrics.accuracy_score import puntuacion_de_exactitud
from scikitty.metrics.precision_score import puntuacion_de_precision
from scikitty.metrics.recall_score import puntuacion_de_recall
from scikitty.metrics.f1_score import puntuacion_de_f1
from scikitty.metrics.confusion_matrix import matriz_de_confusion
from scikitty.model_selection.train_test_split import train_test_split
import pandas as pd

# Create your views here.

@api_view(['POST'])
def process_data(request):
    # Recibe los datos del frontend
    data = request.data
    number = data.get('number', 0) * 2

    print("asdasdasdasdas", number)

    # Devuelve el resultado
    return Response({"processed_data": number})


@api_view(['POST'])
def transform_csv(request):
    data = request.data
    csvData = data.get('csv')
    featureTarget = data.get('featureTarget')
    fileName = data.get('fileName')
    create_csv(csvData, fileName)
    create_tree(fileName, featureTarget)
    return Response({"message": "Creation Completed!"})


def create_csv(data, file):
    csv_filename = file + ".csv"
    with open(csv_filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)
    return csv_filename


def create_tree(file_name, featureTarget):
    # Cargar los datos.
    data = pd.read_csv(f'{file_name}.csv')

    # Preparar los datos.
    # Asume que 'Play Tennis' es la columna objetivo
    features = data.drop(featureTarget, axis=1)
    labels = data[featureTarget]

    # Dividir los datos.
    X_train, X_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.2, random_state=42)

    # Crear e instanciar el árbol de decisión.
    criterio_impureza = 'entropy'
    min_muestras_div = 2
    max_profundidad = 5
    dt = DecisionTree(X_train, y_train, criterio=criterio_impureza,
                    min_muestras_div=min_muestras_div, max_profundidad=max_profundidad)
    dt.fit()

    # ---------------------------------------------------------

    def test_tree(dt, file_name, X_test, y_test):
        
        # Visualizar el árbol.
        # tree_structure = dt.get_tree_structure()
        # visualizer = TreeVisualizer()
        # visualizer.graph_tree(tree_structure)
        # visualizer.get_graph(f'{file_name}_tree', ver=True)

        # Imprimir resultados.
        y_pred = dt.predict(X_test)

        # Se calculan las metricas.
        accuracy = puntuacion_de_exactitud(y_test, y_pred)
        precision = puntuacion_de_precision(y_test, y_pred, average='weighted')
        recall = puntuacion_de_recall(y_test, y_pred, average='weighted')
        f1 = puntuacion_de_f1(y_test, y_pred, average='weighted')
        conf_matrix = matriz_de_confusion(y_test, y_pred)

        # Se imprimen los resultados por consola.
        print("\n------------------------------ ARBOL ORIGINAL SCIKITTY ------------------------------\n")
        print("¿El árbol es balanceado?", dt.is_balanced())
        print("Exactitud:", accuracy)
        print("Precisión:", precision)
        print("Recall:", recall)
        print("F1-score:", f1)
        print("Matriz de confusión:")
        print(conf_matrix)
        print("Etiquetas predichas:", y_pred)
        print("Etiquetas reales:", y_test.tolist())
        print("\nVisualizando el árbol original...\n")

    # ---------------------------------------------------------

    test_tree(dt, file_name, X_test, y_test)

    # Guardar el árbol en un archivo JSON
    TreePersistence.save_tree(dt, f'{file_name}.json')

    # Cargar el árbol desde el archivo JSON
    nueva_raiz = TreePersistence.load_tree(f'{file_name}.json')
    nuevo_dt = DecisionTree(X_train, y_train, criterio=criterio_impureza,
                            min_muestras_div=min_muestras_div, max_profundidad=max_profundidad)
    nuevo_dt.set_tree(nueva_raiz)

    test_tree(nuevo_dt, file_name, X_test, y_test)
