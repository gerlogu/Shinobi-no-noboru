var config = {
  type:Phaser.AUTO,
  width:  800,
  height: 600,
  physics:{
    default:'arcade',
    arcade: {
      gravity: { y: 1000}
    }
  },
  scene: [mainMenu, controlsMenu, creditsMenu, localgame]
  
};

var game = new Phaser.Game(config);

