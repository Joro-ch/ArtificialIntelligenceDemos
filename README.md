#  Artificial Intelligence Demos
Artificial Intelligence Demos es una página web con diferentes demos de inteligencia artificial utilizando una libreria creada desde cero en Python llamado SciKitty. Está libreria está basada en otra muy popular en el ambito de la IA llamado Scikitlearn.

## Inicialización de la Página Web
Antes de poder utilizar la página web, es necesario tener algunas herramientas instaladas, así como hacer algunos procedimientos importantes para su uso. 

1. Primero, hay que descargar el repositorio y descromprimirlo usando una aplicación como WinRaR o 7-Zip. Una vez descomprimido el proyecto, dentro de la carpeta principal, se deben de observar dos subcarpetas llamadas client y service.
2. Es necesario tener instalado Node.js. Se puede instalar desde su página oficial https://nodejs.org/en. Una vez instalado el "Node.js (LTS)" bastará con ejecutarlo y presionar en "siguiente" en todas las ventanas que aparecerán en su instalador. 
3. Una vez instalado Node.js, es necesario ubicarse en la carpeta client desde una consola utilizando cd o abriendola directamente. Una vez ubicado sobre la carpeta client, se ejecutará el comando npm install para poder instalar todas las dependencias de la página web.
4. En el caso de que todas las dependencias fueron instaladas correctamente, solo queda ejecutar o levantar la página web, utilizando npm run dev. Esto inicializará la página en el puerto localhost:3000. Se debe de ingresar dicho puerto en la URL de algún navegador para poder acceder a la página web.

## Inicialización del Servidor
El servidor permitirá a la web, interactuar con código Prolog y Python que ayudará a generar los Árboles de Decisión, las Regresiones Lineales, una IA Basada en Reglas, entre otras cosas. 

1. Es necesario tener alguna versión de Python instalada. Para poder descargar alguna, se puede realizar desde la página principal https://www.python.org/downloads/. Una vez instalado y ejecutado el instalador, quedará listo Python para usarse.
2. Al igual que con la carpeta client, se debe de ubicar en la carpeta service utilizando una consola y el comando cd.
3. Es necesario crear un enviroment para poder manejar las dependencias del servidor alojado en Python. Primero es necesario instalar la dependencia virtualenv utilizando el comando python -m pip install --user virtualenv. Ya solo falta crear el ambiente utilizando python -m virtualenv <nombre> y activarlo usando .\<nombre>\Scripts\activate.
4. Una vez se está en el ambiente creado, se tendrán que instalar las dependencias utilizando pip install -r .\requirements.txt.  Cuando las dependencias esten instadas, se deben de ejecutar los comandos python manage.py migrate y python manage.py makemigrations. 
5. Finalmente, si todo ha salido bien, se deberá ejecutar el comando .\runServices.bat. Este comando ejecutará un Script que se encargará de montar el servidor de Django en el puerto 127.0.0.1:8000 y otro servidor en Prolog en el puerto 127.0.0.1:8001. Ya solo queda entrar en la página web en el puerto localhost:3000 y usar los distintos demos que ahí se presentan. 

## Demos
En la página principal de la web, se encontrarán 5 demos que se pueden utilizar para probar distintos conceptos de la inteligencia artificial.

##### 1. SciKitty Decision Tree
En está demo, se podrá entrenar un modelo de un Árbol de Decisión utilizando un dataset en el formato CSV.  
1. Lo primero que se verá en está demo es un espacio para subir un dataset en el formato CSV o la opción de seleccionar un dataset guardado en la aplicación web. 
2. Una vez seleccionado y subido el dataset, la página mostrará dos selectores, uno para seleccionar el feature target y otro para seleccionar el críterio de impureza que se utilizará en el modelo del Árbol.
3. Se deberá de presionar sobre el boton "Send dataset to train a decision tree" para entrenar el Árbol de Decision. Este bóton enviará una petición HTTP que se realizará en el servidor de Django el Árbol de Decision utilizando el dataset subido, el target  y el críterio de impureza seleccionado, utilizando el paquete de SciKitty instalado en python.
4. Una vez el modelo este creado, la página web mostrará las metricas del Árbol de Decision, la matriz de confusión y la grafica con el Árbol que se generó. Esto tanto para el Árbol de Decision de SciKitty como el Árbol de Decision de Scikitlearn. 
5. Finalmente, en la página aparecerá un formulario con el cual seleccionar los features con los cuales realizar una predicción en el árbol de predicción. Se deberá de presionar sobre el bóton 'Predict' el cual enviará la petición HTTP a un servidor Prolog que se encargará de parsear el Árbol de Decisión que se encuentra en formato JSON, a un objeto de Prolog con el cual realizar la predicción. 

##### 2. RetrAiGo
Es un demo que permitirá observar el rendimiento de una IA Basada en Reglas utilizando una busqueda informada conocida como A*, utilizando las heuristicas Manhattan y Euclidiana. 
1. La página mostrará un input con el cual el usuario podrá cambiar el tamaño de los tableros que se utilizarán para realizar la busqueda informada. Esto permite probar tableros de tamaños en un rango de 2x2 hasta 10x10, limitado para no afectar el rendimiento de la página.
2. Justo debajo de dicho input, se observarán dos tableros, uno nombrado Initial Board y otro Goal Board. Cada celda de estos tableros, pueden ser modificados por el usuario, presionando sobre dichas celdas y escribiendo el número que desea. Los números que se podrán ingresar son entre el rango de 0 hasta el tamaño total del tablero - 1, osea (NxN) - 1. El cero será tomado como la celda vacia del juego. 
3. Habrá un bóton "Send Boards to Play", el cual, al ser presionado, enviará una petición HTTP al servidor de Prolog, en el cual se realizará la busqueda informada, usando el initial board para intentar llegar al goal board.
4. Finalmente, una vez la busqueda informada es realizada, el servidor devolverá parametros como las heuristicas, la profundidad de la busqueda, el camino que se realizó, así como el board resultante de la busqueda.

##### 3. SciKitty Tree Gradient Boosting
Se podrá entrenar un modelo de un Árbol de Decisión usando Decision Tree Gradient Boosting por medio de un dataset en el formato CSV.  
1. Lo primero que se verá en está demo es un espacio para subir un dataset en el formato CSV o la opción de seleccionar un dataset guardado en la aplicación web. 
2. Una vez seleccionado y subido el dataset, la página mostrará dos selectores, uno para seleccionar el feature target y otro para seleccionar el críterio de impureza que se utilizará en el modelo del Árbol.
3. Se deberá de presionar sobre el boton "Send dataset to train a decision tree" para entrenar el Árbol de Decision. Este bóton enviará una petición HTTP que se realizará en el servidor de Django el Árbol de Decision utilizando el dataset subido, el target  y el críterio de impureza seleccionado, utilizando el paquete de SciKitty instalado en python.
4. Una vez el modelo este creado, la página web mostrará las metricas del Árbol de Decision, la matriz de confusión y la grafica con el Árbol que se generó. Esto tanto para el Árbol de Decision de SciKitty como el Árbol de Decision de Scikitlearn. 

##### 4. SciKitty Linear Regression
En esta demo, se podrá probar una regresion lineal implementado en el paquete SciKitty utilizando un dataset en CSV.
1. Lo primero que se verá en está demo es un espacio para subir un dataset en el formato CSV o la opción de seleccionar un dataset guardado en la aplicación web. 
2. Una vez seleccionado y subido el dataset, la página mostrará un selector para seleccionar el feature target que se utilizará en el modelo de Regresion Lineal de SciKitty.
3. La página muestra dos bótones, uno que dice "Send Dataset to Create the Linear Regression" y otro que dice "Try with Sklearn California Housing Dataset". Utilizando el primer bóton, se enviará una petición HTTP al servidor en Django que permitirá generar el modelo de Regresion Lineal utilizando el dataset subido y el target seleccionado. Por otro lado, el segundo boton, permitirá probar el modelo de Regresion Lineal de SciKitty usando el dataset California Housing de Sklearn. 
4. Finalmente, en la página web se verá las metricas del modelo así como el gráfico que se generó.

##### 5. SciKitty Logistic Regression
Se podrá probar el modelo de regresion logistica implementado en el paquete SciKitty utilizando un dataset en CSV.
1. Lo primero que se verá en está demo es un espacio para subir un dataset en el formato CSV o la opción de seleccionar un dataset guardado en la aplicación web. 
2. Una vez seleccionado y subido el dataset, la página mostrará un selector para seleccionar el feature target que se utilizará en el modelo de Regresion Logistica de SciKitty.
3. La página muestra dos bótones, uno que dice "Send Dataset to Create the Logistic Regression" y otro que dice "Try with Sklearn Breast Cancer Dataset". Utilizando el primer bóton, se enviará una petición HTTP al servidor en Django que permitirá generar el modelo de Regresion Logistica utilizando el dataset subido y el target seleccionado. Por otro lado, el segundo boton, permitirá probar el modelo de Regresion Logistica de SciKitty usando el dataset Breast Cancer de Sklearn. 
4. Finalmente, en la página web se verá las metricas del modelo así como el gráfico que se generó.