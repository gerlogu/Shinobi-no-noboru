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
  scene: [example2, example3, localgame]
  
};

var game = new Phaser.Game(config);

