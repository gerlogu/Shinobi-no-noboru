
//Escena 1
class localgame extends Phaser.Scene{

  //Constructor de la escena, con el identificador de la misma.
  constructor(){
    super({key:"localgame"});
  }

  //Método que se ejecuta antes de cargar la página (creo)
  //En este método he cargado todos los sprites del juego (en un futuro habrá más y también habrá sonidos).
  //También he creado las variables que van a ser parte de la escena. Para ello se escribe "this." 
  //seguido del nombre. No hay que escribir var, ya que estas variables 
  //son en realidad parámetros de la clase "example1"
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
    // #endregion


    // #region Sprites
    this.load.image('ground'        , 'assets/game-elements/ground.png');
    this.load.image('player1'       , 'assets/game-elements/p5.png');
    this.load.image('player2'       , 'assets/game-elements/p2.jpg');
    this.load.image('trunk'         , 'assets/game-elements/trunk.png');
    this.load.image('end-background', 'assets/end-game-background.png');
    this.load.spritesheet('ocre'    , 'assets/game-elements/ocre.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('purpura', 'assets/game-elements/purpura.png',{
      frameWidth: 100,
      frameHeight: 175
    });    // #endregion

    //  #region Sounds (no son los sonidos finales, son para testeos)
    this.load.audio('jump-audio','assets/Jumping-sounds/jump_10.mp3');
    this.load.audio('soundtrack','assets/Soundtrack/Prueba shinobi.mp3');
    this.load.audio('FinalSound','assets/Game over sound/GameOver.mp3');
    
    //  #endregion

    this.cursors = this.input.keyboard.createCursorKeys(); // Usando este método, guardamos en la variebla los 
    // parámetros de las flechas del teclado
    // que se usaran para programar el control. 
    // NO ES LA ÚNICA MANERA DE HACER LOS CONTROLES. De hecho, 
    // usaremos otra para el segundo ninja
    
    // #region Objetos
    this.platforms;
    this.Law;
    this.Law2;
    this.cols = [];
    this.picture;
    // #endregion


    // #region Loading Bar
    //     var progressBar = this.add.graphics();
    //     var progressBox = this.add.graphics();
    //     progressBox.fillStyle(0x222222, 0.8).setDepth(6000);
    //     progressBox.fillRect(240, 270, 320, 50).setDepth(5000);

    //     this.load.on('progress', function (value) {
    //         console.log(value);
    //         progressBar.clear();
    //         progressBar.fillStyle(0xffffff, 1);
    //         progressBar.fillRect(250, 280, 300 * value, 30);
    //     });
        
    //     // Texto loading
    //     var width = this.cameras.main.width;
    //     var height = this.cameras.main.height;
    //     var loadingText = this.make.text({
    //         x: width / 2,
    //         y: height / 2 - 50,
    //         text: 'Loading...',
    //         style: {
    //             font: '20px monospace',
    //             fill: '#ffffff'
    //         }
    //     });

    //     // Porcentaje
    //     loadingText.setOrigin(0.5, 0.5);
    //     var percentText = this.make.text({
    //         x: width / 2,
    //         y: height / 2 - 5,
    //         text: '0%',
    //         style: {
    //             font: '18px monospace',
    //             fill: '#ffffff'
    //         }
    //     });

    //     percentText.setOrigin(0.5, 0.5);
    //     percentText.setDepth(10000);
        
    //     var assetText = this.make.text({
    //         x: width / 2,
    //         y: height / 2 + 50,
    //         text: '',
    //         style: {
    //             font: '18px monospace',
    //             fill: '#ffffff'
    //         }
    //     });
    //     assetText.setOrigin(0.5, 0.5);



    //     this.load.on('progress', function (value) {
    //         percentText.setText(parseInt(value * 100) + '%');

    //         console.log(value);
    //     });
                    
    //     this.load.on('fileprogress', function (file) {
    //         assetText.setText('Loading asset: ' + file.key);
    //         console.log(file.src);
    //     });

    //     // Destructor
    //     this.load.on('complete', function () {
    //         console.log('complete');
    //         progressBar.destroy();
    //         progressBox.destroy();
    //         loadingText.destroy();
    //         percentText.destroy();
    //         assetText.destroy();
    //     });
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
    // Porcentaje
    // loadingText.setOrigin(0.5, 0.5);
    // var percentText = this.make.text({
    //     x: width / 2.55,
    //     y: height / 1.08 - 50,
    //     text: '0%',
    //     style: {
    //         font: '18px monospace',
    //         fill: '#ffffff'
    //     }
    // });

    // percentText.setOrigin(0.5, 0.5);
    // percentText.setDepth(10000);
    
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

    this.DButton = this.input.keyboard.addKey('D');
    this.AButton = this.input.keyboard.addKey('A');
    this.WButton = this.input.keyboard.addKey('W');

    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton  = this.input.keyboard.addKey('left');
    this.upButton    = this.input.keyboard.addKey('up');

    //Funcion for, que recibe un personaje, y hace las comprobación
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
              if(player === this.Law){
                this.Law.score += 25;
              }
              else{
                this.Law2.score += 25;
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
    this.soundtrack.play({          //Reproducimos la banda sonora, bajandole el volumen de 1 a 0.5 debido a que si no suena demasiado, y ponemos loop a true, para que si acaba reinicie
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
    // #endregion

    this.InitializeSpawns();
    
    this.InitializeScores();
    
    // NOTA: Abajo uso un #region que sirve para colapsar el código y 
    // ocupe menos espacio, a la izquiera puedes clickear en la flechita para desplegarlo
    // #region Plataformas (suelo)
    this.platforms = this.physics.add.staticGroup();//Al ser static, nos aseguramos de que cuando colisione con el prota, las plataformas no reciban una fuerza y se muevan.
    this.platforms.create(-300, this.height/2, 'ground').setScale(2).refreshBody();
    this.platforms.create(1100, this.height/2, 'ground').setScale(2).refreshBody();
    // #endregion

    this.cols        = this.physics;
    this.cols.length = 1;
    this.cols[0]     = this.physics.add.sprite(-100,0,'trunk').body.setGravityY(-1000);


    this.InitializePlayers();

    this.EndGameScreen();

    this.InitializeColliders();
    
    this.canLooseLifes = true;

    this.number = 3;

    this.InitializeStartTimer();

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
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/5.12, this.width/3.20),0,'trunk').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }
        
      var spawnTrunkLeft = function(){ 
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/1.8, this.width/1.24),0,'trunk').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }
    
      var spawnTrunkMiddle = function(){ 
        this.cols[this.cols.length] = this.physics.add.sprite(Phaser.Math.Between(this.width/3, this.width/2),0,'trunk').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
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
        this.Law.setVelocityY(this.jumpForce);  
        this.Law2.setVelocityY(-this.jumpForce/2); 
        //Sonido de salto
        this.jumpaudio.play({
          volume: 0.2
        });
  
        console.log("Arriba");
      }
      if(Phaser.Input.Keyboard.JustDown(this.upButton)){
        // Salto
        this.Law2.setVelocityY(this.jumpForce);  
        this.Law.setVelocityY(-this.jumpForce/2); 
        //Sonido de salto
        this.jumpaudio.play({
          volume: 0.2
        });
        console.log("Arriba");
      }
      
    };

    this.physics.add.collider(this.platforms);
    this.physics.add.overlap(this.Law,  this.Law2, playersCollide, null, this);
    this.physics.add.collider(this.Law,  this.platforms, function(){
      if(Phaser.Input.Keyboard.JustDown(this.WButton))
        this.Law.setVelocityY(this.jumpForce);       
    }, null, this);
    this.physics.add.collider(this.Law2, this.platforms,function(){
      if(Phaser.Input.Keyboard.JustDown(this.upButton))
        this.Law2.setVelocityY(this.jumpForce);       
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

  InitializePlayers(){
    this.Law   = this.physics.add.sprite(this.width/10,this.height/3,'ocre',3);//Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.Law2   = this.physics.add.sprite(this.width/1.1,this.height/3,'purpura',3);
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

    this.Law.anims.play('start0');
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
   
    this.Law.score = 0;
    this.Law.lifes = 6;

    this.Law.z = 100;
    
    // Reajusto el tamaño de la imagen del prota
    this.Law.displayWidth = 45;
    this.Law.scaleY       = this.Law.scaleX;
    // this.Law.setBounce(0.2);
    this.Law.setCollideWorldBounds(false);
    this.Law.setDepth(3000);
    
    // #endregion

    // #region Personaje 2
    //this.Law2 = this.physics.add.sprite(this.width/1.1,this.height/3,'purpura',3); // Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.Law2.score = 0;
    this.Law2.lifes = 6;
    //Reajusto el tamaño de la imagen del prota
    this.Law2.displayWidth = 45;
    this.Law2.scaleY       = this.Law.scaleX;

    //this.Law.setBounce(0.2);
    this.Law2.setCollideWorldBounds(false);
    
    this.Law.setDepth(3000);
    this.Law2.setDepth(3000);
    // #endregion

  }

  InitializeStartTimer(){
    this.timerBox = this.add.graphics();
    this.timerBox.fillStyle(0x222222, 0.8).setDepth(6000);
    

    this.timedEvent = this.scene.get("localgame").time.addEvent({delay: 1500, callback:onEvent, callbackScope:this, loop:true});
    
    this.timerBox.fillRect(0, this.height/2, 800, 60).setDepth(5000);
    
    this.timerBox.displayHeight = 60;

    this.timer = this.add.text(this.width/2, this.height/1.98, '3', { fontFamily: '"Aldrich"', fontSize: 50 });
    this.timer.setDepth(7000);

    function onEvent(){
      this.number--;
      this.timer.setText(parseInt(this.number));
      console.log(this.number);
      if(this.number <= 0){
        this.isPlayable = true;
        this.timer.setText(parseInt(''));
      }
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

  AnimPlayer(player){

  }
  
  // Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento. 
  // Más tarde lo usaremos para spawnear troncos de vez en cuando, y en 
  // lugares aleatorios, actualizar puntuaciones,
  // y derribar los troncos golpeados.
  update(delta){

    if(this.isPlayable){
      
      // #region Scores
      this.trunksVelocity += this.trunkSpeedAceleration;
      if(!this.ended){
        this.Law.score  += 0.05;
        this.Law2.score  += 0.05;
      }

      this.player1_scoreText.setText(parseInt(this.Law.score));
      this.player2_scoreText.setText(parseInt(this.Law2.score));
      // #endregion

      // #region Teclas y movimiento

      if(this.AButton.isDown){

        this.Law.setVelocityX(-this.xSpeed);

        if(!this.Law.body.touching.down)       
          this.Law.anims.play('left0');

      }else if(this.DButton.isDown){

        this.Law.setVelocityX(this.xSpeed);

        if(!this.Law.body.touching.down)       
          this.Law.anims.play('right0');

      }else{

        this.Law.setVelocityX(0);

      }

      if(this.leftButton.isDown){

        this.Law2.setVelocityX(-this.xSpeed);

        if(!this.Law2.body.touching.down)  
          this.Law2.anims.play('left1');

      }else if(this.rightButton.isDown){

        this.Law2.setVelocityX(this.xSpeed);

        if(!this.Law2.body.touching.down)  
          this.Law2.anims.play('right1');

      }else{

        this.Law2.setVelocityX(0);

      }
      
      // #endregion 
      this.forPlayer(this.Law, WButton);    

      this.forPlayer(this.Law2, upButton);
     

    }

    // #region Fin de partida
    if(this.Law.y > 800 || this.Law2.y > 800){
      
      if(this.ended === false && (this.Law.lifes <= 0 || this.Law2.lifes <= 0)){
        this.endBackground.visible = true;
        this.player1_Text_end.visible = true;
        this.player1_scoreText_end.setText(parseInt(this.Law.score));
        this.player1_scoreText_end.visible = true;
        this.player2_Text_end.visible = true;
        this.player2_scoreText_end.setText(parseInt(this.Law2.score));
        this.player2_scoreText_end.visible = true;
        if(this.Law.y > 800){
          this.playerX_Text.setText('PLAYER 2');
        }else if(this.Law2.y > 800){
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
        if(this.Law.y > 800){
          this.Law.setVelocityY(this.jumpForce * 2);
          // if(this.canLooseLifes === true){
            this.Law.lifes--;
            this.canLooseLifes = false;
          // }
          
          console.log("Player 1 lifes: " + this.Law.lifes);
        }else if(this.Law2.y > 800){
          this.Law2.setVelocityY(this.jumpForce * 2);  
          // if(this.canLooseLifes === true){
            this.Law2.lifes--;
            this.canLooseLifes = false;
          // }
          console.log("Player 2 lifes: " + this.Law2.lifes);
        }
      }
      
    }

    // #endregion
  }
}
