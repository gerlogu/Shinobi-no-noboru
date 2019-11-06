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
