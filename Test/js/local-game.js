// import particleConfig from 'particleConfig';

//Escena 1
class localgame extends Phaser.Scene{
  
  //Constructor de la escena, con el identificador de la misma.
  constructor(){
    super({key:"localgame"});
  }

  /**
   * Método que se ejecuta antes de cargar la página (creo)
   * En este método he cargado todos los sprites del juego (en un futuro habrá más y también habrá sonidos).
   * También he creado las variables que van a ser parte de la escena. Para ello se escribe "this." 
   * seguido del nombre. No hay que escribir var, ya que estas variables 
   * son en realidad parámetros de la clase "example1"
   */
  preload(){
    
    // #region VARIABLES
    this.width                 = 800;
    this.height                = 600;
    this.minTrunkTimer         = 900;
    this.maxTrunkTimer         = 1100;
    this.nullGravity           = -1000;
    this.trunksVelocity        = 270;
    this.jumpForce             = -535;
    this.xSpeed                = 280;
    this.trunkSpeedAceleration = 0.01;
    this.ended                 = false;
    this.isPlayable            = false;
    this.player1CanMove        = false;
    this.player2CanMove        = false;

    this.DButton = this.input.keyboard.addKey('D');
    this.AButton = this.input.keyboard.addKey('A');
    this.WButton = this.input.keyboard.addKey('W');

    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton  = this.input.keyboard.addKey('left');
    this.upButton    = this.input.keyboard.addKey('up');
    // #endregion


    // #region Sprites
    this.load.image('ground'         , 'assets/game-elements/ground.png');
    this.load.image('player1'        , 'assets/game-elements/p5.png');
    this.load.image('player2'        , 'assets/game-elements/p2.jpg');
    this.load.image('trunk'          , 'assets/game-elements/trunk.png');
    this.load.image('end-background' , 'assets/end-game-background.png');
    this.load.image('particle'       , 'assets/Particle2.png');

    this.load.image('background' , 'assets/main-menu/e.png');

    this.load.spritesheet('ocre'     , 'assets/game-elements/ocre.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('purpura'  , 'assets/game-elements/purpura.png',{
      frameWidth: 100,
      frameHeight: 175
    }); 
    this.load.spritesheet('tronco'  , 'assets/game-elements/troncos.png',{
      frameWidth: 50,
      frameHeight: 24
    });   // #endregion

    // #region Sounds (no son los sonidos finales, son para testeos)
    this.load.audio('jump-audio' , 'assets/Jumping-sounds/jump_10.mp3');
    this.load.audio('soundtrack' , 'assets/Soundtrack/Prueba shinobi.mp3');
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

  }

  // Método que se ejecuta al comienzo del juego, cuandos se ha creado todo. En él inicializo la mayoría 
  // de elementos del juego, como plataformas y el personaje en cuestión, 
  // colliders y demás...
  create(){

    

    //Funcion for, que recibe un personaje, y hace las comprobaciones de colision con los troncos
    this.forPlayer = function(player, key){
      // #region Recorre el array de troncos
      for(var i = 0; i < this.cols.length; i++){
        // Compara la posicion del player con un tronco o el suelo
        // Es importante saber que para phaser, la coordenada x no está en el centro del objeto, sino a la izquierda del mismo
        if(player.body.touching.down || ((player.x <= (this.cols[i].x+this.cols[i].width*1.5)) 
        && (player.x >= (this.cols[i].x-this.cols[i].width/2))
        && (player.y  <= (this.cols[i].y+this.cols[i].height))
        && (player.y >= (this.cols[i].y-this.cols[i].height/1.5)))){
           if(Phaser.Input.Keyboard.JustDown(key)){
            // Salto
            player.setVelocityY(this.jumpForce);  
            //Sonido de salto
            this.jumpaudio.play({
              volume: 0.2
            });

            

            // Comprobación para tirar el tronco abajo (provisional)
            if(((player.x <= (this.cols[i].x+this.cols[i].width*1.5)) 
            && (player.x >= (this.cols[i].x-this.cols[i].width/2))
            && (player.y <= (this.cols[i].y+this.cols[i].height))
            && (player.y >= (this.cols[i].y-this.cols[i].height/1.5)))){
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
      // #endregion
    }

    this.cameras.main.fadeIn(1500);

    // #region Se crean los objetos de sonido
    this.jumpaudio  = this.sound.add('jump-audio');
    this.soundtrack = this.sound.add('soundtrack');
    this.gameOver   = this.sound.add('FinalSound');
    // Reproducimos la banda sonora, bajandole el volumen de 1 a 0.5 debido a que si no suena demasiado, y ponemos loop a true, para que si acaba reinicie
    this.soundtrack.play({ 
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });

    //Se crea la imagen colocandola de fondo del menu
    this.background = this.add.image(400,300,'background');

    // #endregion

    this.InitializeSpawns();
    
    this.InitializeScores();
    
    // NOTA: Abajo uso un #region que sirve para colapsar el código y 
    // ocupe menos espacio, a la izquiera puedes clickear en la flechita para desplegarlo
    // #region Plataformas (suelo)
    this.platforms = this.physics.add.staticGroup();//Al ser static, nos aseguramos de que cuando colisione con el prota, las plataformas no reciban una fuerza y se muevan.
    this.platforms.create(-300, this.height/1.5, 'ground').setScale(2).refreshBody();
    this.platforms.create(1100, this.height/1.5, 'ground').setScale(2).refreshBody();
    // #endregion

    this.cols        = this.physics;
    this.cols.length = 1;
    this.cols[0]     = this.physics.add.sprite(-100,0,'tronco').body.setGravityY(-1000);

    /**
     * Inicializa a los personajes que se mostraránen pantalla, 
     * con las animaciones y atributos propias de cada uno
     */
    this.InitializePlayers();

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
    this.player1   = this.physics.add.sprite(this.width/10,this.height/3,'ocre',3);
    this.player2   = this.physics.add.sprite(this.width/1.1,this.height/3,'purpura',3);

    this.anims.create({
      key: 'left0',
      frames: [ { key: 'ocre', frame: 2 } ],
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'right0',
      frames: [ { key: 'ocre', frame: 1 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'start0',
      frames: [ { key: 'ocre', frame: 3 } ],
      frameRate: 10,
      repeat: -1
    });

    this.player1.anims.play('start0');
    this.anims.create({
      key: 'left1',
      frames: [ { key: 'purpura', frame: 2 } ],
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'right1',
      frames: [ { key: 'purpura', frame: 1 } ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'start1',
      frames: [ { key: 'purpura', frame: 3 } ],
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
      //maxParticles: 50,
      scale:{
          start: 0.4, end: 0
      },
      rotate: 20,
      //alpha: 0.4,
      on: false
  });

    this.particles2 = this.add.particles('particle').setDepth(0);
    this.emitterNinja1= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:100, max: 200},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      //maxParticles: 50,
      scale:{
          start:0.4, end:0
      },
      alpha: 0,
      quantity: 1
    });

    this.emitterNinja2= this.particles2.createEmitter({
      x: player.x,
      y: player.y,
      lifespan:400,
      speed: {min:100, max: 200},
      angle: -player.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      //maxParticles: 50,
      scale:{
          start:0.4, end:0
      },
      alpha: 0,
      quantity: 1
    });
  }

  InitializeScores(){
    // #region Scores
    this.player1_Text = this.add.text(this.width/40, 0, 'PLAYER 1  ', { fontFamily: '"Roboto Condensed"', fontSize: 24 });
    this.player1_scoreText = this.add.text(this.width/35, this.height/15, this.player1_score, { fontFamily: '"Roboto Condensed"' ,boundsAlignH: "center", boundsAlignV: "middle",align: "center", fontSize: 34 });

    this.player2_Text = this.add.text(this.width/1.19, 0, 'PLAYER 2  ', { fontFamily: '"Roboto Condensed"', fontSize: 24 });
    this.player2_scoreText = this.add.text(this.width/1.045, this.height/15, this.player2_score, { fontFamily: '"Roboto Condensed"' , boundsAlignH: "right",boundsAlignV: "middle", align:'right', fontSize: 34  });
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
      // #region FIN PARTIDA
      this.endBackground = this.add.sprite(0,0,'end-background');
      this.endBackground.displayWidth = 20000;
      this.endBackground.scaleY       = this.endBackground.scaleX;
      this.endBackground.setDepth(4000);
      this.endBackground.visible = false;
    
      this.player1_Text_end = this.add.text(this.width/4, this.height/2, 'PLAYER 1  ', { fontFamily: '"Roboto Condensed"', fontSize: 24 });
      this.player1_Text_end.setDepth(5000);
      this.player1_Text_end.visible = false;
      this.player1_scoreText_end = this.add.text(this.width/3.25, this.height/1.75, this.player1_score, { fontFamily: '"Roboto Condensed"' , fontSize: 34 });
      this.player1_scoreText_end.setDepth(5000);
      this.player1_scoreText_end.visible = false;
    
      this.player2_Text_end = this.add.text(this.width/1.55, this.height/2, 'PLAYER 2  ', { fontFamily: '"Roboto Condensed"', fontSize: 24 });
      this.player2_Text_end.setDepth(5000);
      this.player2_Text_end.visible = false;
      this.player2_scoreText_end = this.add.text(this.width/1.42, this.height/1.75, this.player2_score, { fontFamily: '"Roboto Condensed"' , boundsAlignH: "center",  fontSize: 34  });
      this.player2_scoreText_end.setDepth(5000);
      this.player2_scoreText_end.visible = false;
    
      this.playerX_Text = this.add.text(this.width/4.25, this.height/3, 'PLAYER 1', { fontFamily: '"Roboto Condensed"' ,  fontSize: 40  });
      this.playerX_Text.setDepth(5000);
      this.playerX_Text.visible = false;
      this.playerX_WinnerTex = this.add.text(this.width/2.1, this.height/3, 'is the WINNER', { fontFamily: '"Roboto Condensed"' ,  fontSize: 40  });
      this.playerX_WinnerTex.setDepth(5000);
      this.playerX_WinnerTex.visible = false;
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
      if(this.number > 0){
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

  
  // Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento. 
  // Más tarde lo usaremos para spawnear troncos de vez en cuando, y en 
  // lugares aleatorios, actualizar puntuaciones,
  // y derribar los troncos golpeados.
  update(delta){
    
    this.emitterNinja1.setAngle(-270);
    this.emitterNinja1.setPosition(this.player1.x, this.player1.y);

    this.emitterNinja2.setAngle(-270);
    this.emitterNinja2.setPosition(this.player2.x, this.player2.y);

    if(this.player2.y <= 700){
      this.player2.canLooseLifes = true;
    }

    if(this.player1.y <= 700){
      this.player1.canLooseLifes = true;
    }

    if(this.isPlayable){
      
      // #region Scores
      this.trunksVelocity += this.trunkSpeedAceleration;
      if(!this.ended){
        this.player1.score  += 0.05;
        this.player2.score  += 0.05;
      }

      this.player1_scoreText.setText(parseInt(this.player1.score));
      this.player2_scoreText.setText(parseInt(this.player2.score));
      // #endregion

      // #region Teclas y movimiento

      
      if(this.AButton.isDown){

        if(this.player1CanMove)
          this.player1.setVelocityX(-this.xSpeed);

        if(!this.player1.body.touching.down)       
          this.player1.anims.play('left0');

      }else if(this.DButton.isDown){

        if(this.player1CanMove)
          this.player1.setVelocityX(this.xSpeed);

        if(!this.player1.body.touching.down)       
          this.player1.anims.play('right0');

      }else{

        this.player1.setVelocityX(0);

      }

      if(this.leftButton.isDown){
        if(this.player2CanMove)
          this.player2.setVelocityX(-this.xSpeed);

        if(!this.player2.body.touching.down)  
          this.player2.anims.play('left1');

      }else if(this.rightButton.isDown){
        if(this.player2CanMove)
          this.player2.setVelocityX(this.xSpeed);

        if(!this.player2.body.touching.down)  
          this.player2.anims.play('right1');

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
        this.isPlayable = false;
        this.endBackground.visible = true;
        this.player1_Text_end.visible = true;
        this.player1_scoreText_end.setText(parseInt(this.player1.score));
        this.player1_scoreText_end.visible = true;
        this.player2_Text_end.visible = true;
        this.player2_scoreText_end.setText(parseInt(this.player2.score));
        this.player2_scoreText_end.visible = true;
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
