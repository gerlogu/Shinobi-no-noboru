# Shinobi no Noboru
- Letra del grupo: C

## Principal

### Temática
- Aventura de ninjas en el japón feudal.

### Género
- Plataformas

### Características importantes

#### Plataforma 
- PC

#### Equipo

  - Integrante 1:
  
 	- Nombre: Germán López Gutiérrez

	- Email de la urjc: g.lopezg.2017@alumnos.urjc.es

	- Email de GitHub: gerlogu@gmail.com
 
- Integrante 2: 

	- Nombre: Ignacio Atance Loras

	- Email de la urjc: i.atance.2017@alumnos.urjc.es

	- Email de GitHub: ignacio.atance.loras@gmail.com
 
- Integrante 3:

	- Nombre: Jorge Sánchez Sánchez

	- Email de la urjc: j.sanchezs.2017@alumnos.urjc.es

	- Email de GitHub: jorgesanworks@gmail.com

- Integrante 4:

	- Nombre: Alberto Romero Abarca

	- Email de la urjc: a.romeroa.2017@alumnos.urjc.es

	- Email de GitHub: romeroabarca.alberto@gmail.com
	
- Github del equipo:

	- https://github.com/gerlogu/Shinobi-no-noboru

#### Trello del grupo

- Link: https://trello.com/b/T5xBf1k2/juegos-en-red

#### Influencias
- Off The Balls
	- Videojuego
  - Inspira: La mecánica en la que se debe ir saltando entre superficies.
  
- PROYECTO NINJAS DEL INFIERNO (1985)
	- Película
	- Inspira: La estética de los ninjas y el tono de los mismos.
	
### The elevator Pitch
Un juego de plataformas multijugador de ninjas centrado en el objetivo de subir una cascada a base de saltos. Es un videojuego centrado en la verticalidad y la resistencia, donde se tendrá que sobrevivir hasta que tu rival sea el primero en caer ya que si no, él será quién se lleve la victoria. De la parte superior de la cascada irán cayendo troncos, los cuales serán nuestro medio para mantenernos en la cascada, con el único problema de que, al tocarlos, estos se destruirán y nosotros saldremos disparados hacia arriba de un salto. En eso consistirá el juego, en ir saltando de tronco en tronco y fijarse en los siguientes, ya que cualquier error de cálculo se verá reflejado en nuestra derrota.

### Descripción del proyecto
Juego multijugador para 2 jugadores ambientado en la época Edo. Los personajes que se manejarán serán ninjas cuyo objetivo es escalar una cascada. Este título gira entorno a la resistencia, el jugador derrotado será aquel que haya caído durante la escalada mientras que el victorioso será el que se haya mantenido en pie cuando esto haya sucedido.

Se jugará en panorámico y los jugadores se encontrarán en la misma cascada. En uno de los laterales se encontrará la distancia recorrida por los jugadores. Mientras tanto, de la parte superior de la pantalla irán apareciendo troncos que utilizará el jugador para saltar de uno en otro para mantenerse en la subida, por lo que también habrá un carácter selectivo en el videojuego que el jugador deberá dominar para aguantar más que su rival y no caer al vacío por un error de cálculo.

La partida concluirá cuando uno de los jugadores haya perecido.

### ¿Qué caracteriza a este proyecto?
- El gameplay frenético que genera tensión a medida que se va subiendo la cascada. 

- Partidas rápidas y simples que implican que cualquier clase de jugador pueda entretenerse con el título en cualquier situación.

### Aspecto gráfico
El juego tendrá una estética cartoon, más similar a la de cómic. Tomaremos de referencia los sigientes elementos:
- Ninja Gaiden: Para la estética de los ninjas.

- PROYECTO NINJAS DEL INFIERNO (1985): Para la estética de los ninjas y la paleta de colores.

- Battleblock Theater: La paleta de colores y la poca sobrecarga de la imagen, tanto de los personajes como de los escenarios.

--------------------

## Historia y Gameplay

### Historia
Un grupo de ninjas, en busca de perfeccionar sus habilidades, deciden competir en la escalada de una cascada mejorando así sus reflejos y con la motivación de querer destacar sobre el resto de compañeros ninja.

### Gameplay
Los jugadores aparecerán en las esquinas de la pantalla y saltarán a un tronco empezando así la partida. Cuando el jugador colisiona con un tronco, su personaje será impulsado hacia arriba, y se deberá controlar la caída haciendo uso de las teclas 'A' y 'D' o las flechas de dirección, moviéndose a la izquierda o a la derecha.

De la parte superior de la pantalla irán cayendo los troncos que los jugadores deberán alcanzar para poder impulsarse y no caer al vacío. A su vez, el tronco con el que colisione un jugador es destruido.

A medida que avanza la partida, la corriente aumenta, haciendo que los troncos caigan más rápido, pero el número de troncos disminuirá, hasta que uno de los jugadores caiga finalizando así la partida.

### Diagrama de estados - Jugador

![SnN - Diagrama de estados](https://user-images.githubusercontent.com/55363746/66085940-e5720c80-e572-11e9-9344-45d69f4b9f60.jpeg)

### Interfaz
In game en una de las esquinas se mostrará la distancia recorrida de los jugadores. Por lo demás, en cuanto a UI no hay más contenido durante la partida. 

El menú inicial contará con una opción para acceder menú opciones para configurar el sonido del juego y ver los controles, otra para iniciar una partida en local, una más para iniciar una partida online y una última para salir del juego.

### Diagrama de flujo - Transiciones entre pantallas

![SnN - Diagrama de flujo (Pantallas)](https://user-images.githubusercontent.com/55363746/66076182-881f9080-e55d-11e9-8dd7-81c8907c7e52.png)


--------------------

## Assets Necesarios

### 2D
 - Cascada

 - Troncos

 - Ninjas 
 
### Sonido
#### Lista de sonidos (Ambiente)
- Fuera
	- Música de fondo
- Dentro
	- Agua de la cascada

#### Lista de sonidos (jugador)
- Movimiento
	- Salto
- Caída del personaje
	- Grito

### Animación
- Animaciones del entorno 
	- Agua de la cascada

- Animaciones de los personajes 
	- Salto
	- Caída

--------------

## Código

### Mecánicas

- Físicas (Para salto y caída del ninja).

- Detección de colisión entre el ninja y el tronco.

- Impulso al detectar la colisión.

- Muerteuerte del jugador.

- Pantalla final (Vencedor y perdedor).

### Interfaz

- Menú de inicio.

- Configuración del volumen.

- Distancia recorrida por los jugadores (in game).

--------------

## Fase 2

### Capturas de cada página y explicaciones

- Menú principal:

![Screenshot menú principal](https://user-images.githubusercontent.com/44704611/68335951-b86ac980-00dd-11ea-9f78-66501bfea109.PNG)

Este es el menú inicial, el primero que sale al iniciar el juego. En el tenemos varias opciones. "Local game" nos permite iniciar una partida en local, para 2 jugadores en el mismo ordenador. "Online game" permitirá enfrentarse a otros jugadores a través de internet en un futuro, ya que todavía no está implementado. "Controls" nos lleva a un menú para aprender a jugar, y "Credits" muestra los créditos del juego. 

- Modo online:

![Screenshot modo online](https://user-images.githubusercontent.com/44704611/68344681-ec4eea80-00ef-11ea-9b5f-30479d7d7ada.png)

Al seleccionar el botón "Online game" en el menú principal, aparecerá un mensaje, indicando que ese modo no está disponible todavía.

- Menú de controles:

![Screenshot controles](https://user-images.githubusercontent.com/44704611/68336333-768e5300-00de-11ea-847d-3ca1dc0bee43.png)

En el menú de controles se muestran las teclas que se usan para jugar, y las reglas del juego.

- Menú de créditos:

![Screenshot creditos](https://user-images.githubusercontent.com/44704611/68332607-658e1380-00d7-11ea-89bd-33e66c624f66.png)

En el menú de créditos aparecen los creadores del videojuego, así como referencias a materiales externos.

- Partida en proceso:

![Screenshot partida](https://user-images.githubusercontent.com/44704611/68332636-7179d580-00d7-11ea-9c96-325bbf99d399.png)

Es como se vería la partida en sí. En ella hay dos ninjas, cada uno controlado por un jugador, y van apareciendo troncos. Los ninjas deben saltar de tronco en tronco para no caerse, y pueden saltar sobre el ninja rival para empujarle hacia abajo. Si un jugador cae por debajo de la pantalla, pierde una vida y vuelve a subir. Si un jugador las pierde todas, se acaba la partida.

- Fin de la partida:

![Screenshot final de partida](https://user-images.githubusercontent.com/44704611/68336407-9c1b5c80-00de-11ea-8d4a-9ac5a9d08eea.png)

Cuando uno de los jugadores pierde todas las vidas, aparece un cartel indicando qué jugador ha ganado, y cuantos segundos ha durado la partida. Además hay 2 botones, uno para reiniciar la partida y jugar de nuevo; y otro para volver al menú principal.

- Pantalla de carga:

![Screenshot pantalla de carga](https://user-images.githubusercontent.com/44704611/68332707-8c4c4a00-00d7-11ea-839a-4ab6c7a7627e.png)

También está incluida una pantalla de carga, la cual aparece cuando se quiere pasar de una escena a otra. En ella aparece una barra que se va rellenando conforme se cargan los elementos, hasta llegar al final, indicando al jugador el progreso de la carga. También aparece el nombre del elemento que se está cargando en ese momento.



### Diagrama de navegación


![Diagrama en blanco](https://user-images.githubusercontent.com/44704611/68335290-7a20da80-00dc-11ea-8c27-d6fbdf751cd7.jpeg)

## Fase 3

### Navegación

- Para jugar online al pulsar el botón "Online Game" se muestra en pantalla un cuadro donde se debe escribir la IP del servidor del lobby al que se desea acceder.


#### Raton sobre el boton online game
![Captura1 - raton sobre el boton online game](https://user-images.githubusercontent.com/44704611/70210070-123cce80-1732-11ea-805f-8e0c01553a9c.png)

El botón "Online Game", a diferencia de la fase anterior, en la cual aparecía un mensaje avisando de que ese modo no estaba disponible, ahora permite acceder a una nueva escena donde encontrarse con otro jugador con el que se jugaría una supuesta partida al juego. Para entrar hay que hacer click en el botón e introducir la ip del servidor. En el caso de que la ip sea real, el servidor esté activo y haya espacio en la sala (solo puede haber 2 jugadores por sala)  se accederá a la sala en cuestión. Si la ip es incorrecta, o el servidor no está activo, aparecerá un mensaje avisando de ello al jugador, y si la sala está llena, aparecerá otro mensaje de advertencia.


#### Cuadro de la IP
![Captura2 - cuadro de la IP](https://user-images.githubusercontent.com/44704611/70210366-b9ba0100-1732-11ea-879e-fc6dfd8414f0.png)

Tras pulsar el botón "online Game" aparecerá este recuadro para introducir la ip del servidor. Tras escribirla, se debe pulsar el botón "Find out" para intentar acceder al servidor en cuestión.
 
 
#### Suriken como pantalla de carga
![Captura3 - suriken](https://user-images.githubusercontent.com/44704611/70210400-d5250c00-1732-11ea-9866-24a44fe9208d.png)

El suriken girando se utiliza como indicación de que se está intentando acceder al sevidor. Si no encuentra el servidor debido a que no existe o no esté activado, se muestra un mensaje donde se le comunica al jugador que el servidor que ha escrito no está disponible y un botón con el que puede volver al menú principal.


#### Pantalla: servidor no disponible
![Captura4 - pantalla: servidor no disponible](https://user-images.githubusercontent.com/44704611/70210433-eb32cc80-1732-11ea-8296-dbca3d8c3551.png)

En el caso de que el servidor no funcione o no esté disponible, se muestra este mensaje por pantalla a modo de aviso, con un botón para volver al menú.


#### pantalla: lobby lleno
![Captura5 - pantalla: lobby lleno](https://user-images.githubusercontent.com/44704611/70210450-fa197f00-1732-11ea-9c19-cde1f0e6f489.png)

En el caso de que ya haya 2 jugadores en ese servidor, se muestra un mensaje por pantalla indicando esto, con un botón para volver al menú.


#### Pantalla: elegir nickname
![Captura6 - pantalla: elegir nickname](https://user-images.githubusercontent.com/44704611/70210469-0998c800-1733-11ea-9dbd-28b154bbded4.png)

Si la sala está disponible se cambia de escena, donde aparece un cuadro de texto donde el usuario debe escribir su nombre para poder acceder a la sala, junto a un botón de confirmar. Al acceder se muestra el nombre escogido junto a los saltos realizados por el jugador.


#### Pantalla: Online Game
![Captura7 - pantalla: Online Game](https://user-images.githubusercontent.com/44704611/70210493-1ae1d480-1733-11ea-8aa0-58bace1300c2.png)


Tras introducir el nickname, se mostrará este por pantalla, junto a los troncos que haya saltado en total durante sus partidas a modo de estadísticas del jugador. Esta información se guarda asociada al nickname, por lo que, incluso si el servidor se apaga y se vuelve a encender, si el jugador entrá con un mismo nickname que en una sesión anterior, sus estadísticas seguiran iguales. Si no entra un segundo jugador, el juego de dicho jugador aparecerá vacío, y si entra se mostrará su nickname y sus troncos saltados. A la derecha aparecen siempre (independientemente de si en la escena hay uno o dos jugadores) el número de victorias del clan Ochre y el número de victorias del clan Púrpura. Estos datos representan todas las victorias que los jugadores en su conjunto han logrado con el ninja de color ochre y el ninja de color púrpura, respectivamente. Es importante aclarar que estas estadícticas actualmente no se aumentan de forma real (las victorias o los saltos no influyen) sino que para cambiarlas se deben usar los 4 botones de la escena. Los 2 botones de las flechas aumentan los saltos del jugador 1 y 2, y los botones con surikens para aumentar las victorias de cada clan, respectivamente. 


### Diagrama de clases y API REST

![Captura de los 2 diagramas de clases](https://user-images.githubusercontent.com/44704611/70210034-f5080000-1731-11ea-9699-ac2ff7bc6ee5.jpeg)


En la parte de cliente primero encontramos el index.html tiene una agregacion del phaser.js y game.js; ya que se incluyen con la etiqueta de <script>. Tambien se podria decir que las otras escenas tambien actuan como agregados del index, pero en realidad son clases que actuan como agregados del propio game.js ya que este contiene la configuracion de todo el juego y por tanto tambien maneja las diversas escenas (main-menu, credits-menu, controls-menu, local-menu y online-lobby). Por otra parte, existe una asociacion entre la escena del main-menu y las escenas del menu de creditos, controles, local y menu ya que podemos acceder desde el main a las otras escenas. Por ultimo, en online-lobby encontramos como agregados input.html e input-url.html ya que contienen los input que se hacen uso dentro de esta escena.
En la parte de servidor tenemos tres clases. Primero aplication.java, esta clase se encarga del correcto funcionamiento de toda la aplicacion. Se trata de una clase independiente por lo que no encontramos ninguna composicion ni agregacion, pero existe una agregacion con players-controlers ya que consigue que esta clase funcione adecuajamente dentro de la aplicacion. Player-controlers a su vez tiene una asociacion de composicion con players pues si este se elimina players-controlers no podria existir.


### Instrucciones precisas para ejecutar la aplicación

Para la ejecución de la aplicación unicamente será necesario el archivo "jar" de la misma, incluido en la entrega, y en el repositorio de github. Se puede ejecutar haciendo doble click en él, o bien con el CMD. Para este caso, hay que acceder al directorio que contiene el "jar" mediante el comando "cd" para entrar por las carpetas. Una vez en el directorio, se escribe "java -jar 'nombre del fichero.jar'". Una vez ejecutado, desde un navegador web, se introducirá como url la dirección IP del servidor seguido de 2 puntos y el puerto 8080 (ejemplo: 10.10.115.189:8080). Para saber la Ip se introduce en el CMD el comando ipconfig, y se utiliza la direccion ipv4 mostrada. Otra opcion, si se quiere entrar desde el mismo ordenador en el que está el servidor, es poner localhost:8080. Eso mostrará el menú principal del juego. Habrá que hacer click en "Online Game" e introducir de nuevo o la ip con el puerto, o localhost con el puerto. No se debe añadir http al principio, eso lo hace el juego automaticamente. Una vez dentro, se introduce el apodo que se desea, y cuando este se ha introducido y se haya creado el jugador, apareceran las estadísticas del mismo. Se pueden usar los 4 botones presentes en la escena para aumentar dichas estadísticas. Y el cuadrado sirve para marcar si el jugador está listo o no para iniciar la partida (recordemos que estas partidas no se pueden iniciar de verdad). En la parte inferior de la pantalla hay un chat. Se puede escribir en la barra y mandar el mensaje pulsando el botón. El botón "return" sirve para volver al menú principal.


### Diagrama de estados de la fase 3

![DiagramaEstados](https://user-images.githubusercontent.com/44704611/70209935-c2f69e00-1731-11ea-9a39-a46b5c23cfab.jpeg)

