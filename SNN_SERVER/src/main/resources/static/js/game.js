/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */

var config = {
  type:Phaser.AUTO,
  width:  800,
  height: 600,
  parent: "game",
  dom: {
    createContainer: true
  },
  physics:{
    default:'arcade',
    arcade: {
      gravity: { y: 1000}
    }
  },
  scene: [mainMenu, controlsMenu, creditsMenu,onlineLobby, localgame]
  
};

var game = new Phaser.Game(config);

