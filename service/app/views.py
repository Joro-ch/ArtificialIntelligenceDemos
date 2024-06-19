import numpy as np
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
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import pandas as pd

# Create your views here.


@api_view(['POST'])
def transform_csv(request):
    data = request.data
    csv_data = data.get('csv')
    feature_target = data.get('featureTarget')
    file_name = data.get('fileName')
    criterion = data.get('criterion')
    print(data)
    create_csv(csv_data, file_name)
    metrics = create_tree(file_name, feature_target, criterion)
    return Response(metrics)


@api_view(['POST'])
def sklearn_dt(request):
    data = request.data
    file_name = data.get('fileName')
    csv_data = data.get('csv')
    feature_target = data.get('featureTarget')
    criterion = data.get('criterion')
    create_csv(csv_data, file_name)
    metrics = create_sklearn_dt(file_name, feature_target, criterion)
    return Response(metrics)


def create_csv(data, file):
    csv_filename = file + ".csv"
    with open(csv_filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)
    return csv_filename


def create_tree(file_name, featureTarget, criterion):
    # Cargar los datos.
    data = pd.read_csv(f'{file_name}.csv')

    # Preparar los datos.
    features = data.drop(featureTarget, axis=1)
    labels = data[featureTarget]

    print(labels)

    # Dividir los datos.
    X_train, X_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.2, random_state=42)

    # Crear e instanciar el árbol de decisión.
    criterio_impureza = criterion
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

        # Calcular la matriz de confusión
        conf_mat, classes = _scikitty_confusion_matrix(y_test, y_pred)

        # Crear la matriz con los títulos
        conf_mat_with_titles = _create_confusion_matrix_with_titles(conf_mat, classes)

        # Imprimir la matriz con títulos
        print(conf_mat_with_titles)

        # Se imprimen los resultados por consola.
        print("\n------------------------------ ARBOL ORIGINAL SCIKITTY ------------------------------\n")
        print("¿El árbol es balanceado?", dt.is_balanced())
        print("Exactitud:", accuracy)
        print("Precisión:", precision)
        print("Recall:", recall)
        print("F1-score:", f1)
        print("Matriz de confusión:")
        print(conf_mat_with_titles)
        print("Etiquetas predichas:", y_pred)
        print("Etiquetas reales:", y_test.tolist())
        print("\nVisualizando el árbol original...\n")

        metrics = {
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "conf_matrix": conf_mat_with_titles,
            "features": y_pred,
            "real_features": y_test.tolist(),
            "is_balanced": dt.is_balanced(),
        }
        return metrics

    # ---------------------------------------------------------

    treeMetrics = test_tree(dt, file_name, X_test, y_test)

    # Guardar el árbol en un archivo JSON
    TreePersistence.save_tree(dt, f'{file_name}.json')

    # Cargar el árbol desde el archivo JSON
    nueva_raiz = TreePersistence.load_tree(f'{file_name}.json')
    nuevo_dt = DecisionTree(X_train, y_train, criterio=criterio_impureza,
                            min_muestras_div=min_muestras_div, max_profundidad=max_profundidad)
    nuevo_dt.set_tree(nueva_raiz)

    test_tree(nuevo_dt, file_name, X_test, y_test)

    return treeMetrics


def create_sklearn_dt(file_name, featureTarget, criterion):
    data = pd.read_csv(f'{file_name}.csv')

    # Preparar los datos.
    # Asume que 'Play Tennis' es la columna objetivo
    features = data.drop(featureTarget, axis=1)
    labels = data[featureTarget]

    # Codificar las variables categóricas.
    encoder = OneHotEncoder()
    features_encoded = encoder.fit_transform(features)

    # Dividir los datos.
    X_train, X_test, y_train, y_test = train_test_split(
        features_encoded, labels, test_size=0.2, random_state=42)

    # Crear e instanciar el árbol de decisión.
    dt = DecisionTreeClassifier(
        criterion=criterion, min_samples_split=2, max_depth=5, random_state=42)
    dt.fit(X_train, y_train)

    # Imprimir resultados.
    y_pred = dt.predict(X_test)

    # Se calculan las metricas.
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    conf_matrix = confusion_matrix(y_test, y_pred)

    # Crear la matriz con los títulos
    conf_mat_with_titles = _create_confusion_matrix_with_titles(conf_matrix, dt.classes_)

    # Imprimir la matriz con títulos
    print(conf_mat_with_titles)

    # Se imprimen los resultados por consola.
    print("\n------------------------------ ARBOL SCI-KIT ------------------------------\n")
    print("Exactitud:", accuracy)
    print("Precisión:", precision)
    print("Recall:", recall)
    print("F1-score:", f1)
    print("Matriz de confusión:")
    print(conf_mat_with_titles)
    print("Etiquetas predichas:", y_pred)
    print("Etiquetas reales:", y_test.tolist())
    print("\nVisualizando el árbol de Sci-Kit Learn...\n")

    metrics = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "conf_matrix": conf_mat_with_titles,
        "features": y_pred,
        "real_features": y_test.tolist(),
    }
    return metrics


def _scikitty_confusion_matrix(y_true, y_pred):
    # Obtener los valores únicos que pueden tomar las clases
    classes = np.unique(np.concatenate((y_true, y_pred)))
    num_classes = len(classes)

    # Mapear las etiquetas a índices numéricos
    class_to_index = {label: i for i, label in enumerate(classes)}
    y_true_mapped = np.array([class_to_index[label] for label in y_true])
    y_pred_mapped = np.array([class_to_index[label] for label in y_pred])

    # Inicializar la matriz de confusión con ceros
    confusion_mat = np.zeros((num_classes, num_classes), dtype=int)

    # Rellenar la matriz de confusión
    for i in range(len(y_true_mapped)):
        true_class = y_true_mapped[i]
        pred_class = y_pred_mapped[i]
        confusion_mat[true_class, pred_class] += 1

    return confusion_mat, classes


def _create_confusion_matrix_with_titles(confusion_mat, classes):
    # Crear una matriz con una fila y una columna adicionales para los títulos
    num_classes = len(classes)
    mat_with_titles = np.empty(
        (num_classes + 1, num_classes + 1), dtype=object)

    # Agregar los títulos de las columnas
    mat_with_titles[0, 1:] = classes
    # Agregar los títulos de las filas
    mat_with_titles[1:, 0] = classes

    # Agregar los valores de la matriz de confusión
    mat_with_titles[1:, 1:] = confusion_mat

    # El título de la esquina superior izquierda puede dejarse vacío
    mat_with_titles[0, 0] = ""

    return mat_with_titles
