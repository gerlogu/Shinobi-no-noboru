

//Escena 1
class localgame extends Phaser.Scene{

  //Constructor de la escena, con el identificador de la misma.
  constructor(){
    super({key:"localgame"});
  }

  /**
   * Método que se ejecuta ANTES de cargar la página
   * En el se inicializan los sprites y otros elementos
   * como la barra de carga
   */
  preload(){

    // #region VARIABLES
    this.width                 = 800;
    this.height                = 600;
    this.minTrunkTimer         = 900;
    this.maxTrunkTimer         = 1100;
    this.nullGravity           = -1000;
    this.trunksVelocity        = 310; // 310
    this.jumpForce             = -535;
    this.xSpeed                = 320; // 280
    this.trunkSpeedAceleration = 1.00001;
    this.ended                 = false;
    this.isPlayable            = false;
    this.player1CanMove        = false;
    this.player2CanMove        = false;
    this.player1IZQ            = false;
    this.player2IZQ            = false;
    this.pointerOver = true;

    this.DButton = this.input.keyboard.addKey('D');
    this.AButton = this.input.keyboard.addKey('A');
    this.WButton = this.input.keyboard.addKey('W');

    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton  = this.input.keyboard.addKey('left');
    this.upButton    = this.input.keyboard.addKey('up');
    // #endregion


    // #region Sprites
    this.load.image('ground'         , 'assets/game-elements/ground.png');
    this.load.image('trunk'          , 'assets/game-elements/trunk.png');
    this.load.image('end-background' , 'assets/end-game-background.png');
    this.load.image('particle'       , 'assets/Particle2.png');
    this.load.image ('frontground'   , 'assets/game-elements/level-frontground.png');
    this.load.image('beginning_platform' , 'assets/game-elements/platform.png');
    this.load.image('beginning_platform_behind' , 'assets/game-elements/platform_up.png');
    this.load.image('scroll-background','assets/controls-menu/pergamino.png');
    this.load.image('scroll-background2','assets/controls-menu/pergamino2.png');
    this.load.image('scroll-background3' , 'assets/main-menu/buttons-background-2.png');

    this.load.image('Return'              , 'assets/game-elements/boton_return.png');
    this.load.image('ReturnSelected'      , 'assets/game-elements/boton_return_seleccionado.png');
    this.load.image('Playagain'           , 'assets/game-elements/boton_play_again.png');
    this.load.image('PlayagainSelected'   , 'assets/game-elements/boton_play_again_seleccionado.png');

    this.load.audio('MenuSound1','assets/Menu sounds/MenuSound1.mp3');
    this.load.audio('MenuSound2','assets/Menu sounds/MenuSound2.mp3');
   // this.load.image('background' , 'assets/main-menu/e.png');

    this.load.spritesheet('backgroundSheet'     , 'assets/game-elements/BackgroundSheet.png',{
      frameWidth: 800,
      frameHeight: 600
    });

    this.load.spritesheet('ocre'     , 'assets/game-elements/ocrev2.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('purpura'  , 'assets/game-elements/purpurav2.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('tronco'  , 'assets/game-elements/troncos.png',{
      frameWidth: 67,
      frameHeight: 30
    });   // #endregion

    // #region Sounds (no son los sonidos finales, son para testeos)
    this.load.audio('jump-audio' , 'assets/Jumping-sounds/jump_10.mp3');
    this.load.audio('soundtrack' , 'assets/Soundtrack/Shinobi song 1.mp3');
    this.load.audio('soundtrack2' , 'assets/Soundtrack/Shinobi song 2.mp3');
    this.load.audio('soundtrackLoop' , 'assets/Soundtrack/Shinobi song 1 loop.mp3');
    this.load.audio('soundtrack2Loop' , 'assets/Soundtrack/Shinobi song 2 loop.mp3');
    this.load.audio('FinalSound' , 'assets/Game over sound/GameOver.mp3');

    // #endregion

    this.cursors = this.input.keyboard.createCursorKeys(); // Usando este método, guardamos en la variebla los
    // parámetros de las flechas del teclado
    // que se usaran para programar el control.
    // NO ES LA ÚNICA MANERA DE HACER LOS CONTROLES. De hecho,
    // usaremos otra para el segundo ninja

    // #region Objetos
    this.platforms;
    this.player1;
    this.player2;
    this.cols = [];
    this.picture;
    // #endregion

    // #region Loading Bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xffe0ac, 0.8).setDepth(6000);
    progressBox.fillRect(20, 555, 760, 20).setDepth(5000);

    this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(25, 560, 750 * value, 10);
        });

    // Texto loading
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 30,
        y: height / 1.05 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setDepth(11000);

    var assetText = this.make.text({
        x: width / 1.23,
        y: height / 1.03 - 50,
        text: '',
        boundsAlignH: "right",
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);
    assetText.setDepth(11000);


    this.load.on('progress', function (value) {
        // percentText.setText(parseInt(value * 100) + '%');

        console.log(value);
    });

    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
        console.log(file.src);
    });

    // Destructor
    this.load.on('complete', function () {
        console.log('complete');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        // percentText.destroy();
        assetText.destroy();
    });
    // #endregion


    this.progressB = progressBar;
    this.progressBx = progressBox;
    this.loading = loadingText;
    this.asset = assetText;

  }

  /**
   * Método que se ejecuta al comienzo del juego, cuandos se ha creado todo.
   */
  create(){

    this.progressB.destroy();
    this.progressBx.destroy();
    this.loading.destroy();
    this.asset.destroy();

    //Funcion for, que recibe un personaje, y hace las comprobaciones de colision con los troncos
    this.forPlayer = function(player, key){
      // #region Recorre el array de troncos
      for(var i = 0; i < this.cols.length; i++){
        // Compara la posicion del player con un tronco o el suelo
        // Es importante saber que para phaser, la coordenada x no está en el centro del objeto, sino a la izquierda del mismo
        if(player.body.touching.down || ((player.x <= (this.cols[i].x+this.cols[i].width*1.25))
        && (player.x >= (this.cols[i].x-this.cols[i].width/4))
        && (player.y  <= (this.cols[i].y+this.cols[i].height/1.5))
        && (player.y >= (this.cols[i].y-this.cols[i].height*1.5)))){
           if(Phaser.Input.Keyboard.JustDown(key)){
            // Salto
            player.setVelocityY(this.jumpForce);
            //Sonido de salto
            this.jumpaudio.play({
              volume: 0.2
            });



            // Comprobación para tirar el tronco abajo (provisional)
            if(((player.x <= (this.cols[i].x+this.cols[i].width*1.25))
            && (player.x >= (this.cols[i].x-this.cols[i].width/4))
            && (player.y <= (this.cols[i].y+this.cols[i].height/1.5))
            && (player.y >= (this.cols[i].y-this.cols[i].height*1.5)))){
              //this.Law.setVelocityY(-600);
              this.cols[i].setGravityY(0) ;

              // Emision de particulas
              this.particles.emitParticleAt(player.x,player.y+40,50);
              if(player === this.player1){
                this.player1.score += 25;
              }
              else{
                this.player2.score += 25;
              }
            }

          }

        }

      }

    }

    this.cameras.main.fadeIn(1500);

    // #region Se crean los objetos de sonido
    var numeroCancion = Math.floor(Math.random() * 2);

    this.jumpaudio  = this.sound.add('jump-audio');
    this.allSoundtracks = [this.sound.add('soundtrack'),this.sound.add('soundtrack2')];
    this.allSoundtracksLoop = [this.sound.add('soundtrackLoop'),this.sound.add('soundtrack2Loop')];

    var playLoop1 = function(){
      this.allSoundtracksLoop[0].play({
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      });
      this.scene.get("localgame").time.addEvent({delay: 23800, callback: playLoop1, callbackScope:this, loop:false});
    }

    var playLoop2 = function(){
      this.allSoundtracksLoop[1].play({
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      });
    }
    switch(numeroCancion){
      case 0:
        this.scene.get("localgame").time.addEvent({delay: 29950, callback: playLoop1, callbackScope:this, loop:false});
        break;
      case 1:
        this.scene.get("localgame").time.addEvent({delay: 32900, callback: playLoop2, callbackScope:this, loop:false});
        break;
    }

    this.soundtrack = this.allSoundtracks[numeroCancion];
    this.gameOver   = this.sound.add('FinalSound');
    // Reproducimos la banda sonora, bajandole el volumen de 1 a 0.5 debido a que si no suena demasiado, y ponemos loop a true, para que si acaba reinicie
    this.soundtrack.play({
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    });

    //Se crea la imagen colocandola de fondo del menu

    this.background = this.add.sprite(this.width/2,this.height/2,'backgroundSheet',0);

    this.anims.create({
      key: 'backgroundAnimation',
      frames: this.anims.generateFrameNumbers('backgroundSheet', { start: 0, end: 2}),
      frameRate: 8,
      repeat: -1
    });

    this.background.anims.play('backgroundAnimation');

    this.frontground = this.add.image(this.width/2, this.height/2,'frontground');
    this.frontground.setDepth(10000);
    // #endregion

    this.InitializeSpawns();

    // NOTA: Abajo uso un #region que sirve para colapsar el código y
    // ocupe menos espacio, a la izquiera puedes clickear en la flechita para desplegarlo
    // #region Plataformas (suelo)
    this.platforms = this.physics.add.staticGroup();//Al ser static, nos aseguramos de que cuando colisione con el prota, las plataformas no reciban una fuerza y se muevan.
   // this.platforms.create(-300, this.height/1.5, 'ground').setScale(2).refreshBody();
    this.platforms.create(1100, this.height/1.5, 'ground').setScale(2).refreshBody();

    this.platforms.create(this.width/13,this.height/1.2, 'beginning_platform').setScale(0.45).refreshBody();
    this.platforms.setDepth(9000);
    this.platform_left_backgroubd = this.add.image(this.width/13,this.height/1.53,'beginning_platform_behind').setScale(0.43);
    // #endregion

    this.cols        =  this.physics;
    this.cols.length =  1;
    this.cols[0]     =  this.physics.add.sprite(-100,0,'tronco').body.setGravityY(-1000);

    /**
     * Inicializa a los personajes que se mostraránen pantalla,
     * con las animaciones y atributos propias de cada uno
     */
    this.InitializePlayers();
    this.InitializeScores();
    /**
     * Prepara la pantalla que se muestra al finalizar la partida
     */
    this.EndGameScreen();

    /**
     * Inicializa la relación entre los distintos elementos que
     * pueden colisionar entre sí
     */
    this.InitializeColliders();

    /**
     * Booleano que determina cuándo pueden perder vida los personajes,
     * se inicia por defecto a TRUE
     */
    //this.canLooseLifes = true;
    this.number = 3;

    /**
     * Inicializa la cuenta atrás para que empiece la partida al inicio
     * de la escena
     */
    this.InitializeStartTimer();

    /**
     * Inicializa las particulas que apareceran en la escena
     */
    this.CreateParticles(this.player1);

  }

  InitializePlayers(){
    //Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.player1   = this.physics.add.sprite(this.width/10,this.height/1.7,'ocre',4);
    this.player2   = this.physics.add.sprite(this.width/1.1,this.height/3,'purpura',4);

    this.anims.create({
      key: 'leftup0',
      frames: [ { key: 'ocre', frame: 3 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'rightup0',
      frames: [ { key: 'ocre', frame: 2 } ],
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'leftdown0',
      frames: [ { key: 'ocre', frame: 1 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'rightdown0',
      frames: [ { key: 'ocre', frame: 0 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'start0',
      frames: [ { key: 'ocre', frame: 4 } ],
      frameRate: 10,
      repeat: -1
    });

    this.player1.anims.play('start0');


    this.anims.create({
      key: 'leftup1',
      frames: [ { key: 'purpura', frame: 3 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'rightup1',
      frames: [ { key: 'purpura', frame: 2 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'leftdown1',
      frames: [ { key: 'purpura', frame: 1 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'rightdown1',
      frames: [ { key: 'purpura', frame: 0 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'start1',
      frames: [ { key: 'purpura', frame: 4 } ],
      frameRate: 10,
      repeat: -1
    });

    this.player1.score = 0;
    this.player1.lifes = 3;

    this.player1.z = 100;

    // Reajusto el tamaño de la imagen del prota
    this.player1.displayWidth = 45;
    this.player1.scaleY       = this.player1.scaleX;
    this.player1.canLooseLifes = true;
    // this.Law.setBounce(0.2);
    this.player1.setCollideWorldBounds(false);
    this.player1.setDepth(3000);

    // #endregion

    // #region Personaje 2
    //this.Law2 = this.physics.add.sprite(this.width/1.1,this.height/3,'purpura',3); // Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.player2.score = 0;
    this.player2.lifes = 3;
    this.player2.canLooseLifes = true;
    //Reajusto el tamaño de la imagen del prota
    this.player2.displayWidth = 45;
    this.player2.scaleY       = this.player1.scaleX;

    //this.Law.setBounce(0.2);
    this.player2.setCollideWorldBounds(false);

    this.player1.setDepth(3000);
    this.player2.setDepth(3000);
    // #endregion

  }

  CreateParticles(player){
    this.particles = this.add.particles('particle').setDepth(12000);
    this.emitter= this.particles.createEmitter({
      x: 400,
      y: 300,
      speed: 100,
      lifespan: 200,
      blendMode: 'ADD',
      // maxParticles: 50,
      scale:{
          start: 0.4, end: 0
      },
      rotate: 20,
      // alpha: 0.4,
      on: false
    });

    // #region player 1 particles
    this.particles2 = this.add.particles('particle').setDepth(0);

    this.emitterNinja1_3= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.1,
      quantity: 0.7
    });

    this.particles2_1 = this.add.particles('particle').setDepth(0);
    this.emitterNinja1_1= this.particles2.createEmitter({
      x: player.x-10,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.2,
      quantity: 0.5
    });

    this.particles2_2 = this.add.particles('particle').setDepth(0);
    this.emitterNinja1_2= this.particles2.createEmitter({
      x: player.x-10,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.2,
      quantity: 0.5
    });
    // #endregion

    // #region player 2 particles
    this.emitterNinja2_1= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      //maxParticles: 50,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.1,
      quantity: 1
    });

    this.emitterNinja2_2= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      //maxParticles: 50,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.1,
      quantity: 1
    });

    this.emitterNinja2_3= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      //maxParticles: 50,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.1,
      quantity: 1
    });
    // #endregion

  }

  InitializeScores(){
    // #region Scores
    this.player1_Text = this.add.text(this.width/40, this.height/1.095, 'P1 LIFES', { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 });
    this.player1_Text.setDepth(11000);
    this.player1_scoreText = this.add.text(this.width/16, this.height/1.055, this.player1.lifes, {
      fontFamily: '"Roboto Condensed"',
      fontFamily: '"brush_font"',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center",
      fontSize: 29 });
    this.player1_scoreText.setDepth(11000);

    this.player2_Text = this.add.text(this.width/1.19, this.height/1.095, 'P2 LIFES', { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21 });
    this.player2_Text.setDepth(11000);
    this.player2_scoreText = this.add.text(this.width/1.14, this.height/1.055, this.player2.lifes, {
      fontFamily: '"Roboto Condensed"' ,
      fontFamily: '"brush_font"',
      boundsAlignH: "right",
      boundsAlignV: "middle",
      align:'right',
      fontSize: 29  });
    this.player2_scoreText.setDepth(11000);
    // #endregion
  }

  InitializeSpawns(){
      // #region spawnAreas
      var spawnTrunkRight = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/5.12, this.width/3.20),0,'tronco' ).body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }

      var spawnTrunkLeft = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/1.8, this.width/1.24),0,'tronco').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }

      var spawnTrunkMiddle = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/3, this.width/2),0,'tronco').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }
      // #endregion

      // Contador para el spawner de troncos
      this.TrunkGeneratorRight  = this.scene.get("localgame").time.addEvent({delay: Phaser.Math.Between(this.minTrunkTimer - 400, this.maxTrunkTimer), callback: spawnTrunkRight, callbackScope:this, loop:true});
      this.TrunkGeneratorLeft   = this.scene.get("localgame").time.addEvent({delay: Phaser.Math.Between(this.minTrunkTimer - 400, this.maxTrunkTimer), callback: spawnTrunkLeft, callbackScope:this, loop:true});
      this.TrunkGeneratorMiddle = this.scene.get("localgame").time.addEvent({delay: Phaser.Math.Between(this.minTrunkTimer, this.maxTrunkTimer), callback: spawnTrunkMiddle, callbackScope:this, loop:true});
  }

  InitializeColliders(){
    var playersCollide = function players(){
      if(Phaser.Input.Keyboard.JustDown(this.WButton)){
        // Salto
        this.player1.setVelocityY(this.jumpForce);
        this.player2.setVelocityY(-this.jumpForce/2);
        //Sonido de salto
        this.jumpaudio.play({
          volume: 0.2
        });

        console.log("Arriba");
      }
      if(Phaser.Input.Keyboard.JustDown(this.upButton)){
        // Salto
        this.player2.setVelocityY(this.jumpForce);
        this.player1.setVelocityY(-this.jumpForce/2);
        //Sonido de salto
        this.jumpaudio.play({
          volume: 0.2
        });
        console.log("Arriba");
      }

    };

    this.physics.add.collider(this.platforms);
    // this.physics.add.overlap(this.player1,  this.player2);
    // this.physics.add.collider(this.player1,  this.platforms);
    // this.physics.add.collider(this.player2, this.platforms);
    this.physics.add.overlap(this.player1,  this.player2, playersCollide, null, this);
    this.physics.add.collider(this.player1,  this.platforms, function(){
      if(Phaser.Input.Keyboard.JustDown(this.WButton))
        this.player1.setVelocityY(this.jumpForce);
    }, null, this);
    this.physics.add.collider(this.player2, this.platforms,function(){
      if(Phaser.Input.Keyboard.JustDown(this.upButton))
        this.player2.setVelocityY(this.jumpForce);
    }, null, this);
  }

  EndGameScreen(){
      var that = this;

      // #region FIN PARTIDA
      this.endBackground = this.add.sprite(0,0,'end-background');
      this.endBackground.displayWidth = 20000;
      this.endBackground.scaleY       = this.endBackground.scaleX;
      this.endBackground.setDepth(12000);
      this.endBackground.visible = false;

      //#region Se crean los botones "playagain" y "return" para reiniciar la partida, o volver al menú principal, una vez la partida termina.
      this.sound1 = this.sound.add('MenuSound1');
      this.sound2 = this.sound.add('MenuSound2');

      this.playagainButton = this.physics.add.sprite(this.width/3.3,this.height/1.8,'Playagain').setGravityY(-1000).setGravityX(0).setInteractive();
      this.playagainButton.setInteractive();
      this.playagainButton.displayWidth = 230;
      this.playagainButton.scaleY= this.playagainButton.scaleX;
      this.playagainButton.setDepth(13000);
      this.playagainButton.on('pointerup', function(){
          that.sound2.play();
          that.cameras.main.fadeOut(200);
          that.scene.get("localgame").time.addEvent({delay: 210, callback: function(){that.scene.start('localgame');}, callbackScope:this, loop:false});
          //that.scene.start('creditsMenu');
      });

      this.returnButton = this.physics.add.sprite(this.width/1.5,this.height/1.8,'Return').setGravityY(-1000).setGravityX(0).setInteractive();
      this.returnButton.setInteractive();
      this.returnButton.displayWidth = 230;
      this.returnButton.scaleY= this.returnButton.scaleX;
      this.returnButton.setDepth(13000);
      this.returnButton.on('pointerup', function(){
          that.sound2.play();
          that.cameras.main.fadeOut(200);
          that.scene.get("localgame").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
          //that.scene.start('creditsMenu');
      });

      this.anims.create({
        key: 'return',
        frames: [ { key: 'Return'} ],
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'returnSelected',
        frames: [ { key: 'ReturnSelected'} ],
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'playagain',
        frames: [ { key: 'Playagain'} ],
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'playagainSelected',
        frames: [ { key: 'PlayagainSelected'} ],
        frameRate: 10,
        repeat: -1
      });

      this.playagainButton.on('pointerover', function() {
        // this.displayWidth=250; //Con this accedemos al botón Empezar, porque ese botón ha desencadenado el evento.
        // this.scaleY=this.scaleX;
        that.playagainButton.anims.play('playagainSelected');

        do{  //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
            that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
            this.pointerOver = false;
        }while(this.pointerover);
      });

      // When moves away
      this.playagainButton.on('pointerout', function() {
        // this.displayWidth=230;
        // this.scaleY = this.scaleX;
        that.playagainButton.anims.play('playagain');

        this.pointerOver = true;
      });

      this.returnButton.on('pointerover', function() {
        // this.displayWidth=250; //Con this accedemos al botón Empezar, porque ese botón ha desencadenado el evento.
        // this.scaleY=this.scaleX;
        that.returnButton.anims.play('returnSelected');

        do{  //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
            that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
            this.pointerOver = false;
        }while(this.pointerover);
      });

      // When moves away
      this.returnButton.on('pointerout', function() {
        // this.displayWidth=230;
        // this.scaleY = this.scaleX;
        that.returnButton.anims.play('return');

        this.pointerOver = true;
      });

      this.returnButton.visible = false;
      this.playagainButton.visible = false;

      this.playerX_Text = this.add.text(this.width/5.7, this.height/2.4, 'PLAYER 1', { fontFamily: '"Roboto Condensed"' , fontFamily: '"brush_font"',  fontSize: 25 ,color:'black' });
      this.playerX_Text.setDepth(13000);
      this.playerX_Text.visible = false;
      this.playerX_WinnerTex = this.add.text(this.width/2.1, this.height/2.4, 'is the WINNER', { fontFamily: '"Roboto Condensed"' , fontFamily: '"brush_font"',  fontSize: 25, color: 'black' });
      this.playerX_WinnerTex.setDepth(13000);
      this.playerX_WinnerTex.visible = false;

      this.endScroll= this.physics.add.sprite(this.width/2, this.height/2,'scroll-background').setGravityY(-1000).setInteractive();
      this.endScroll.displayWidth = 730;
      this.endScroll.scaleY= this.endScroll.scaleX;
      this.endScroll.setDepth(12500);
      this.endScroll.visible =  false;

      this.endScroll2= this.physics.add.sprite(this.width/13, this.height/2,'scroll-background3').setGravityY(-1000).setInteractive();
      this.endScroll2.displayWidth = 60;
      this.endScroll2.scaleY= this.endScroll2.scaleX;
      this.endScroll2.displayHeight = 250;
      this.endScroll2.setDepth(12500);
      this.endScroll2.visible = false;
      // #endregion
  }

  InitializeStartTimer(){
    this.timerBox = this.add.graphics();
    this.timerBox.fillStyle(0x222222, 0.8).setDepth(6000);


    this.timedEvent = this.scene.get("localgame").time.addEvent({delay: 1500, callback:onEvent, callbackScope:this, loop:true});

    this.timerBox.fillRect(0, this.height/2, 800, 60).setDepth(5000);
    this.timerBox.displayHeight = 60;

    this.timer = this.add.text(this.width/2, this.height/1.98, '3', { fontFamily: '""', fontSize: 50 });
    this.timer.setDepth(7000);

    function onEvent(){
      if(this.number >= 0){
        this.number--;
        this.timer.setText(parseInt(this.number));
        console.log(this.number);
      }
      if(this.number === 0){
        this.isPlayable = true;
      }
      if(this.number <= 0)
        this.timer.setText(parseInt(''));
    }

    this.timedEvent2 = this.scene.get("localgame").time.addEvent({delay: 0, callback:anim, callbackScope:this, loop:true});

    this.height2 = 60;

    this.height3 = 300;
    function anim(){
      if(this.number<1){
        this.height2 = this.height2-6;
        this.height3 = this.height3+3;
        if(this.height2 >= 0){
          this.timerBox.displayHeight = this.height2;
          this.timerBox.destroy();
          this.timerBox = this.add.graphics();
          this.timerBox.fillStyle(0x222222, 0.8).setDepth(6000);
          this.timerBox.fillRect(0, this.height3, 800, this.height2).setDepth(5000);
        }
      }
    }
  }

  /**
   * Actualiza la posicion de las particulas del movimiento del personaje
   * @param {*} player Personaje
   * @param {*} playerCanMove Booleano que determina si se puede mover
   * @param {*} particle1 Primera particula de movimiento del personaje
   * @param {*} particle2 Segunda particula de movimiento del personaje
   * @param {*} particle3 Tercera particula de movimiento del personaje
   */
  UpdateParticles(player, playerCanMove, particle1, particle2, particle3){
    if(playerCanMove){
      particle3.setAngle(-270);
      particle3.setPosition(player.x, player.y);

      particle1.setAngle(-270);

      if(this.player1.body.velocity.x > 0){
        particle1.setPosition(player.x + 15, player.y - 18);
        particle1.setAlpha(0.1);
      }
      else if(this.player1.body.velocity.x < 0){
        particle1.setPosition(player.x - 15, player.y - 18);
        particle1.setAlpha(0.1);
      }else{
        particle1.setPosition(player.x, player.y - 18);
        particle1.setAlpha(0.1);
      }

      particle2.setAngle(-270);
      if(this.player1.body.velocity.x > 0){
        particle2.setPosition(player.x + 5, player.y + 20);
        particle2.setAlpha(0.1);
      }
      else if(this.player1.body.velocity.x < 0){
        particle2.setPosition(player.x - 5, player.y + 20);
        particle2.setAlpha(0.1);
      }else{
        particle2.setPosition(player.x, player.y + 20);
        particle2.setAlpha(0.1);
      }
    }
  }

  /**
   * Actualiza la animacion del personaje
   * @param {*} player Personaje
   * @param {*} playerCanMove Booleano que determina si se puede mover
   * @param {*} playerIZQ Boolean que determina hacia donde mira el personaje
   */
  UpdatePlayerAnim(player, playerCanMove, playerIZQ){
    if(!player.body.touching.down && playerCanMove){
      if(player.body.velocity.x >0){
        if(player.body.velocity.y <0){
          player.anims.play("rightup0");
        }else{
          player.anims.play("rightdown0");
        }

        playerIZQ = false;

      }else if(player.body.velocity.x <0 ){
        if(player.body.velocity.y <0){
          player.anims.play("leftup0");
        }else{
          player.anims.play("leftdown0");
        }

        playerIZQ = true;

      }else{
        if(playerIZQ){
          if(player.body.velocity.y <0){
            player.anims.play("leftup0");
          }else{
            player.anims.play("leftdown0");
          }
        }else{
          if(player.body.velocity.y <0){
            player.anims.play("rightup0");
          }else{
            player.anims.play("rightdown0");
          }
        }
      }
    }
  }

  /**
   * Comprueba si ha terminado la partida al caer un personaje
   */
  CheckEndGame(){
    if(this.player1.y > 800 || this.player2.y > 800){

      if(this.ended === false && (this.player1.lifes <= 0 || this.player2.lifes <= 0)){

        this.endBackground.visible = true;
        this.endScroll.visible = true;
        this.endScroll2.visible = true;
        if(this.player1.y > 800){
          this.playerX_Text.setText('PLAYER 2');
        }else if(this.player2.y > 800){
          this.playerX_Text.setText('PLAYER 1');
        }
        this.playerX_Text.visible = true;
        this.playerX_WinnerTex.visible = true;

        //Paramos la banda sonora, y reproducimos el sonido de game over
        this.soundtrack.stop();
        this.gameOver.play();
        this.ended = true;
        this.isPlayable = false;
      }
      else if(this.ended === false){
        if(this.player1.y >= 800){
          if(this.player1.canLooseLifes === true){
            this.player1.lifes--;
            //console.log("Vidas: " + this.player2.lifes);
            this.player1.canLooseLifes = false;
          }
          if(this.player1.lifes >= 1)
            this.player1.setVelocityY(this.jumpForce * 2);
          console.log("Player 2 lifes: " + this.player1.lifes);
        }else if(this.player2.y >= 800){

          if(this.player2.canLooseLifes === true){
            this.player2.lifes--;
            //console.log("Vidas: " + this.player2.lifes);
            this.player2.canLooseLifes = false;
          }
          if(this.player2.lifes >= 1)
            this.player2.setVelocityY(this.jumpForce * 2);
          console.log("Player 2 lifes: " + this.player2.lifes);
        }
      }
    }
  }


  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta){

    // Actualizamos las animaciones de los personajes teniendo en cuenta la direccion del movimiento
    // y si se pueden mover
    this.UpdatePlayerAnim(this.player1, this.player1CanMove, this.player1IZQ);
    this.UpdatePlayerAnim(this.player2, this.player2CanMove, this.player2IZQ);

    this.UpdateParticles(this.player1, this.player1CanMove, this.emitterNinja1_1, this.emitterNinja1_2, this.emitterNinja1_3);
    this.UpdateParticles(this.player2, this.player2CanMove, this.emitterNinja2_1, this.emitterNinja2_2, this.emitterNinja2_3);


    if(this.player2.y <= 700){
      this.player2.canLooseLifes = true;
    }

    if(this.player1.y <= 700){
      this.player1.canLooseLifes = true;
    }

    if(this.isPlayable){

      // #region Player Lifes
      this.player1_scoreText.setText(this.player1.lifes);
      this.player2_scoreText.setText(parseInt(this.player2.lifes));
      // #endregion

      // #region Teclas y movimiento
      if(this.AButton.isDown){

        if(this.player1CanMove)
          this.player1.setVelocityX(-this.xSpeed);

      }else if(this.DButton.isDown){

        if(this.player1CanMove)
          this.player1.setVelocityX(this.xSpeed);

      }else{

        this.player1.setVelocityX(0);

      }

      if(this.leftButton.isDown){

        if(this.player2CanMove)
          this.player2.setVelocityX(-this.xSpeed);

      }else if(this.rightButton.isDown){

        if(this.player2CanMove)
          this.player2.setVelocityX(this.xSpeed);

      }else{

        this.player2.setVelocityX(0);
      }
      // #endregion
      if(this.WButton.isDown){
        this.forPlayer(this.player1, this.WButton);
        if(!this.player1CanMove){
          this.player1CanMove = true;
        }
      }

      if(this.upButton.isDown){
        this.forPlayer(this.player2, this.upButton);
        if(!this.player2CanMove){
          this.player2CanMove = true;
        }
      }
    }

    // #region Fin de partida
    if(this.player1.y > 800 || this.player2.y > 800){

      if(this.ended === false && (this.player1.lifes <= 0 || this.player2.lifes <= 0)){
        this.returnButton.visible = true;
        this.playagainButton.visible = true;

        this.endBackground.visible = true;
        // this.player1_Text_end.visible = true;
        // this.player1_scoreText_end.setText(parseInt(this.player1.score));
        // this.player1_scoreText_end.visible = true;
        // this.player2_Text_end.visible = true;
        // this.player2_scoreText_end.setText(parseInt(this.player2.score));
        // this.player2_scoreText_end.visible = true;
        this.endScroll.visible = true;
        this.endScroll2.visible = true;
        if(this.player1.y > 800){
          this.playerX_Text.setText('PLAYER 2');
        }else if(this.player2.y > 800){
          this.playerX_Text.setText('PLAYER 1');
        }
        this.playerX_Text.visible = true;
        this.playerX_WinnerTex.visible = true;

        //Paramos la banda sonora, y reproducimos el sonido de game over
        this.soundtrack.stop();
        this.gameOver.play();
        this.ended = true;
        this.isPlayable = false;
      }
      else if(this.ended === false){
        if(this.player1.y >= 800){
          if(this.player1.canLooseLifes === true){
            this.player1.lifes--;
            //console.log("Vidas: " + this.player2.lifes);
            this.player1.canLooseLifes = false;
          }
          if(this.player1.lifes >= 1)
            this.player1.setVelocityY(this.jumpForce * 2);
          console.log("Player 2 lifes: " + this.player1.lifes);
        }else if(this.player2.y >= 800){

          if(this.player2.canLooseLifes === true){
            this.player2.lifes--;
            //console.log("Vidas: " + this.player2.lifes);
            this.player2.canLooseLifes = false;
          }
          if(this.player2.lifes >= 1)
            this.player2.setVelocityY(this.jumpForce * 2);
          console.log("Player 2 lifes: " + this.player2.lifes);
        }
      }
    }
    // #endregion
  }
}
