/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */

//Escena 1
class onlinegame extends Phaser.Scene{

  //Constructor de la escena, con el identificador de la misma.
  constructor(){
    super({key:"onlinegame"});
  }

  /**
   * Método que se ejecuta ANTES de cargar la página
   * En el se inicializan los sprites y otros elementos
   * como la barra de carga
   */
  preload(){

    //Codigo de numero aleatorio con la semilla, y la declaracion de la misma
    this.seed = Math.floor(Math.random() * (1000 - 1)) + 1;
    var that = this;
    //Metodo que devuelve numero aleatorio de la semilla
    this.rand= function( min, max, seed ) {
      min = min || 0;
      max = max || 1;
      var rand;
      if ( typeof seed === "number" ) {
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rnd = seed / 233280;
        var disp = Math.abs( Math.sin( seed ) );
        rnd = ( rnd + disp ) - Math.floor( ( rnd + disp ) );
        rand = Math.floor( min + rnd * ( max - min + 1 ) );
      } else {
        rand  = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
      }
      //Aumento la semilla, para que no siga siendo la misma.
      this.seed++;
      return rand;
    }

    // #region VARIABLES
    this.width                 = 800;
    this.height                = 600;
    this.minTrunkTimer         = 900;
    this.maxTrunkTimer         = 1100;
    this.nullGravity           = -1000;
    this.trunksVelocity        = 270; // 310
    this.jumpForce             = -535;
    this.xSpeed                = 320; // 280
    this.trunkSpeedAceleration = 1.00001;
    this.ended                 = false;
    this.isPlayable            = false;
    this.player1CanMove        = false;
    this.player2CanMove        = false;
    this.player1IZQ            = false;
    this.player2IZQ            = false;
    this.pointerOver           = true;
    this.fallingP1             = false;
    this.fallingP2             = false;
    this.maxLifes              = 5;
    this.screamPool            = [];



    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton  = this.input.keyboard.addKey('left');
    this.upButton    = this.input.keyboard.addKey('up');
    // #endregion


    // #region Sprites
    this.load.image('ground'                    ,  'assets/game-elements/ground.png');
    this.load.image('trunk'                     ,  'assets/game-elements/trunk.png');
    this.load.image('end-background'            ,  'assets/end-game-background.png');
    this.load.image('particle'                  ,  'assets/Particle2.png');
    this.load.image ('frontground'              ,  'assets/game-elements/level-frontground.png');
    this.load.image('beginning_platform'        ,  'assets/game-elements/platform.png');
    this.load.image('beginning_platform_behind' ,  'assets/game-elements/platform_up.png');
    this.load.image('scroll-background'         ,  'assets/controls-menu/pergamino.png');
    this.load.image('scroll-background2'        ,  'assets/controls-menu/pergamino2.png');
    this.load.image('scroll-background3'        ,  'assets/main-menu/pergamino-ninja-rollo.png');
    this.load.image('wall'                      ,  'assets/game-elements/wall.png');
    this.load.image('miniTutorial'              ,  'assets/game-elements/miniTutorial.png');

    this.load.image('purpleBanner' , 'assets/game-elements/estandartePurpura.png');
    this.load.image('ochreBanner'  , 'assets/game-elements/estandarteOcre.png');

    this.load.image('Return'              , 'assets/game-elements/boton_return.png');
    this.load.image('ReturnSelected'      , 'assets/game-elements/boton_return_seleccionado.png');
    this.load.image('Playagain'           , 'assets/game-elements/boton_play_again.png');
    this.load.image('PlayagainSelected'   , 'assets/game-elements/boton_play_again_seleccionado.png');

    this.load.audio('MenuSound1','assets/Menu sounds/MenuSound1.mp3');
    this.load.audio('MenuSound2','assets/Menu sounds/MenuSound2.mp3');
    this.load.audio('ManScream','assets/manScream.mp3');
    this.load.audio('ManScream2','assets/manScream2.mp3');
    this.load.audio('ManScream3','assets/manScream3.mp3');
    this.load.audio('ManScream4','assets/manScream4.mp3');
    this.load.audio('ManScream5','assets/manScream5.mp3');
   // this.load.image('background' , 'assets/main-menu/e.png');

    this.load.spritesheet('lightbackgroundSheet' , 'assets/game-elements/BackgroundSheet.png',{
      frameWidth: 800,
      frameHeight: 600
    });

    this.load.spritesheet('ocre' , 'assets/game-elements/ocrev3.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('purpura' , 'assets/game-elements/purpurav3.png',{
      frameWidth: 100,
      frameHeight: 175
    });
    this.load.spritesheet('tronco'  , 'assets/game-elements/troncos.png',{
      frameWidth: 67,
      frameHeight: 30
    });
    // #endregion

    // #region Sounds (no son los sonidos finales, son para testeos)
    this.load.audio('jump-audio'      ,  'assets/Jumping-sounds/jumpSound.mp3');
    this.load.audio('soundtrack'      ,  'assets/Soundtrack/Shinobi song 1.mp3');
    this.load.audio('soundtrack2'     ,  'assets/Soundtrack/Shinobi song 2.mp3');
    this.load.audio('soundtrackLoop'  ,  'assets/Soundtrack/Shinobi song 1 loop.mp3');
    this.load.audio('soundtrack2Loop' ,  'assets/Soundtrack/Shinobi song 2 loop.mp3');
    this.load.audio('FinalSound'      ,  'assets/Game over sound/GameOver3.mp3');
    this.load.audio('LooseHP'         ,  'assets/looseHP3.mp3');

    // #endregion

    // Usando este método, guardamos en la variables los
    // parámetros de las flechas del teclado
    // que se usaran para programar el control.
    this.cursors = this.input.keyboard.createCursorKeys();

    // #region Objetos
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
        x: width / 1.35,
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
        assetText.destroy();
    });
    // #endregion


    this.progressB  = progressBar;
    this.progressBx = progressBox;
    this.loading    = loadingText;
    this.asset      = assetText;

  }

  /**
   * Método que se ejecuta al comienzo del juego, cuandos se ha creado todo.
   */
  create(){
    this.bothconnected = false;

    // this.DButton = this.input.keyboard.addKey('right');
    // this.AButton = this.input.keyboard.addKey('left');
    // this.WButton = this.input.keyboard.addKey('up');

    //
    this.logsCoordX;
    this.logsCoordY;
  //varibles necesarias en el proyecto final (websockets) (la primera, es un booleano que comprueba si se ha establecido el playerId, la segunda es el playerId en si, el cual se recibe del servidor)
    this.playeridDefined = false;
    this.playerid;
    var that = this;




    this.url = game.url;

    // this.updateGameStarted = function(gameS) {
        
    //   $.ajax({
    //       method: "PUT",
    //       url: that.url + '/server/updateGameStarted',
    //       data: JSON.stringify(gameS),
    //       processData: false,
    //       headers: {
    //           "Content-Type": "application/json"
    //       }
    //       }).done(function (newText) {
    //           //console.log("new text chat: " + newText);
    //           //that.victoriesText2.setText("Purple victories: " + purpleVictories); 
    //   })
    // }



    this.deletePlayer=function(itemId) {
                
      $.ajax({
          method: 'DELETE',
          url: that.url + '/server/players/deletePlayer' + itemId
      }).done(function (item) {
        console.log("Personajes borrados");
      })
      //callback(item); 
      //console.log("Deleted item " + itemId)    
    }

    
    that.scene.get("onlinegame").time.addEvent({delay: 300, callback: function(){that.deletePlayer(1); that.deletePlayer(2);}, callbackScope:this, loop:false});

    this.url = game.url2;


    //código de websockets (pasar al proyecto final)
    this.connection = new WebSocket('ws://' + this.url + '/juegoOnline');
    //Cuando se inicia la conexion
    this.connection.onopen = function () {
      console.log("Conexion establecida");
    }
    //Cuando la conexion da un error
    this.connection.onerror = function(e) {
      console.log("WS error: " + e);
    }
    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
    this.connection.onclose = function(e){
      console.log("Motivo del cierre: " + e.code);
    }

    //Se ejecuta al recibir un mensaje. Ese mensaje se convierte a un objeto JS y despues se comprueba que atributos contiene (en funcion de cuales se hayan enviado como coordenadas del jugador, de los troncos...)
    this.connection.onmessage = function(message) {
      var parsedMessage = JSON.parse(message.data);

      //Si se ha enviado el playerId, se ejecuta.
      if(parsedMessage.playerID != null){     
        that.playerid = parsedMessage.playerID;
        console.log("Id de la sesion: " + parsedMessage.playerID);
        console.log("ID establecido: " + that.playerid);
      }

      if(parsedMessage.tiempoFinal != null){
        that.tiempofinalRecibido = parsedMessage.tiempoFinal;
        console.log(that.tiempofinalRecibido);
      }

      //Si se ha enviado el index de un tronco, se ejecuta.
      if(parsedMessage.index != null){
        if(that.playerid==1){
          that.particles.emitParticleAt(that.player2.x,that.player2.y+40,50);
        }else{
          that.particles.emitParticleAt(that.player1.x,that.player1.y+40,50);
        }
        

        that.cols[that.cols.length - parsedMessage.index].setGravityY(0);
        console.log("Se recibe el index.");
      }

      if(parsedMessage.colsX!=null){
        //Se copian los arrays de coordenadas de troncos, en las variables correspondientes. En el update, se actualiza la posición si se es el jugador 2, a las del jugador 1.
        that.logsCoordX = parsedMessage.colsX;   
        that.logsCoordY = parsedMessage.colsY;     
      }

      if(parsedMessage.time!=null){
        that.cont = parsedMessage.time;
        that.timer.setText(parseInt(that.cont));

        if(that.cont <= 0){
          //that.isPlayable = true;
          that.timer.setText(parseInt(''));
        }
      }

      //Se recibe que el ninja rival ha saltado sobre el del jugador, y se ejecutan las acciones correspondientes
      if(parsedMessage.jumped){
        that.ninjaScream = that.screamPool[Math.floor(Math.random() * 5)];
        that.ninjaScream.play();
        // Salto
        if(that.playerid == 2){
          that.particles.emitParticleAt(that.player1.x,that.player1.y+40,50);
          that.player2.setVelocityY(-that.jumpForce/2);
          that.fallingP2 = true;
          console.log("Siempre entra aqui");
          that.scene.get("onlinegame").time.addEvent({delay: 400, callback: function(){that.fallingP2 = false}, callbackScope:that, loop:false});
        }else{

          // Salto
          that.particles.emitParticleAt(that.player2.x,that.player2.y+40,50);
          that.player1.setVelocityY(-that.jumpForce/2);
          that.fallingP1 = true;
          console.log("¿Aqui no entra verdad?");
          that.scene.get("onlinegame").time.addEvent({delay: 400, callback: function(){that.fallingP1 = false}, callbackScope:that, loop:false});
        }
        //Sonido de salto
        that.jumpaudio.play({
          volume: 0.2
        });

      }

      //Si se ha enviado las coordenadas del jugador y su velocidad, se trabaja con ello
      if(parsedMessage.Xvel!=null){
        //console.log("Coordenadas del otro ninja: X=" + parsedMessage.Xcoord + " Y=" + parsedMessage.Ycoord);
        if(that.playerid == 1){
          that.bothconnected = true;

          that.player2.body.velocity.x = parsedMessage.Xvel;
          that.player2.body.velocity.y = parsedMessage.Yvel;

          if(that.player2.x > (parsedMessage.Xcoord+15) || that.player2.x < (parsedMessage.Xcoord+15)){
            that.player2.x = parsedMessage.Xcoord;
            that.player2.y = parsedMessage.Ycoord;
          }
          
          //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
          if(that.platformRight.body != undefined && parsedMessage.Xvel != 0){
            that.platformRight.body.immovable = false;
            that.platformRight.body.allowGravity = true;

            that.platformRight.setGravityY(0);
            that.platform_right_background.setGravityY(0);
            that.player2CanMove = true;

              //Si el otro jugador no salta en 2 segundos,su plataforma se cae, y el salta automaticamente una vez, para así iniciar la partida.
              that.scene.get("onlinegame").time.addEvent({delay: 2000, callback: function(){
                if(!that.player1CanMove){
                  that.player1CanMove = true;
                  that.player1.setVelocityY(that.jumpForce);
                }
                //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
                if(that.platformLeft.body != undefined){
                  that.platformLeft.body.immovable = false;
                  that.platformLeft.body.allowGravity = true;

                  that.platformLeft.setGravityY(0);
                  that.platform_left_background.setGravityY(0);
                }
                  

                //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
                that.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
                  that.platformLeft.destroy();
                  that.platform_left_background.destroy();
                }, callbackScope:that, loop:false});

              }, callbackScope:that, loop:false});
          }

        }else{
          that.player1.body.velocity.x = parsedMessage.Xvel;
          that.player1.body.velocity.y = parsedMessage.Yvel;

          if(that.player1.x > (parsedMessage.Xcoord+15) || that.player1.x < (parsedMessage.Xcoord+15)){
            that.player1.x = parsedMessage.Xcoord;
            that.player1.y = parsedMessage.Ycoord;
          }

          //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
          if(that.platformLeft.body != undefined && parsedMessage.Xvel != 0){
            that.platformLeft.body.immovable = false;
            that.platformLeft.body.allowGravity = true;

            that.platformLeft.setGravityY(0);
            that.platform_left_background.setGravityY(0);
            that.player1CanMove = true;

            //Si el otro jugador no salta en 2 segundos,su plataforma se cae, y el salta automaticamente una vez, para así iniciar la partida.
            that.scene.get("onlinegame").time.addEvent({delay: 2000, callback: function(){
              if(!that.player2CanMove){
                that.player2CanMove = true;
                that.player2.setVelocityY(that.jumpForce);
              }
              //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae

              if(that.platformRight.body){
                  if(that.platformRight.body.immovable)
                  that.platformRight.body.immovable = false;
                  that.platformRight.body.allowGravity = true;
                  that.platformRight.setGravityY(0);
                  that.platform_right_background.setGravityY(0);
              }

              

              //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
              that.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
                that.platformRight.destroy();
                that.platform_right_background.destroy();
              }, callbackScope:that, loop:false});

            }, callbackScope:that, loop:false});
          }
        }
      }
    }


    // Destruimos la barra de carga con todos sus elementos
    this.progressB.destroy();
    this.progressBx.destroy();
    this.loading.destroy();
    this.asset.destroy();

    this.looseHP_Sound = this.sound.add('LooseHP');
    this.screamPool = [this.sound.add('ManScream'), this.sound.add('ManScream2'), this.sound.add('ManScream3'), this.sound.add('ManScream4'), this.sound.add('ManScream5')]
    
    this.miniTutorialText = this.add.image(this.width/2, this.height/6, 'miniTutorial').setDepth(14000);

    var jumpTitleAnim = this.tweens.add({
        targets: this.miniTutorialText,
        scaleX: 0.97,
        scaleY: 0.97,
        ease: 'Sine.easeInOut',
        duration: 800,
        yoyo: true,
        repeat: -1
    });

    this.miniTutorialText.on('pointerdown', function () {

      if (jumpTitleAnim.isPlaying())
      {
          jumpTitleAnim.pause();
      }
      else
      {
          jumpTitleAnim.resume();
      }

    });

    /**
   * Funcion for, que recibe un personaje, y hace las comprobaciones de colision con los troncos
   * @param {*} player Personaje
   * @param {*} key Tecla presionada
   */
    this.ForPlayer = function(player, key){
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
              volume: 0.5
            });
            // Comprobación para tirar el tronco abajo (provisional)
            if(((player.x <= (this.cols[i].x+this.cols[i].width*1.25))
            && (player.x >= (this.cols[i].x-this.cols[i].width/4))
            && (player.y <= (this.cols[i].y+this.cols[i].height/1.5))
            && (player.y >= (this.cols[i].y-this.cols[i].height*1.5)))){
              //this.player1.setVelocityY(-600);
              this.cols[i].setGravityY(0) ;

              var index = {
                index : (this.cols.length - i)
              } 
              this.connection.send(JSON.stringify(index));
              //Se manda el indice del tronco que debe caer

              // Emision de particulas
              this.particles.emitParticleAt(player.x,player.y+40,50);
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
      if(!this.ended){
        this.allSoundtracksLoop[0].play({
          mute: false,
          volume: 0.5,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        });
      }
      this.scene.get("onlinegame").time.addEvent({delay: 23800, callback: playLoop1, callbackScope:this, loop:false});
    }

    var playLoop2 = function(){
      if(!this.ended){
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
    }
    switch(numeroCancion){
      case 0:
        this.scene.get("onlinegame").time.addEvent({delay: 29950, callback: playLoop1, callbackScope:this, loop:false});
        break;
      case 1:
        this.scene.get("onlinegame").time.addEvent({delay: 32900, callback: playLoop2, callbackScope:this, loop:false});
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

    this.lightbackground = this.add.sprite(this.width/2,this.height/2,'lightbackgroundSheet',0);

    this.anims.create({
      key: 'lightbackgroundAnimation',
      frames: this.anims.generateFrameNumbers('lightbackgroundSheet', { start: 0, end: 2}),
      frameRate: 8,
      repeat: -1
    });

    this.lightbackground.anims.play('lightbackgroundAnimation');

    this.frontground = this.add.image(this.width/2, this.height/2,'frontground');
    this.frontground.setDepth(10000);
    // this.frontground.displayWidth = 800;
    // this.frontground.scaleY= this.frontground.scaleX;

    var frontgroundAnim = this.tweens.add({
      targets: this.frontground,
      scaleX: 1.02,
      scaleY: 1.02,
      ease: 'Sine.easeInOut',
      duration: 3000,
      yoyo: true,
      repeat: -1
  });

  this.frontground.on('pointerdown', function () {

    if (frontgroundAnim.isPlaying())
    {
        frontgroundAnim.pause();
    }
    else
    {
        frontgroundAnim.resume();
    }

  });
    // #endregion

    this.InitSpawns();

    // #region Plataformas (suelo)

    this.platformLeft = this.physics.add.image(this.width/13,this.height/1.2, 'beginning_platform').setScale(0.45).setDepth(9000);
    //Hacemos la plataforma inmovible, e inmune a la gravedad. Así aunque el jugador salte encima, esta no se mueve.
    this.platformLeft.body.allowGravity = false;
    this.platformLeft.body.immovable = true;
    //this.platforms.setDepth(9000);
    this.platform_left_background = this.physics.add.image(this.width/13,this.height/1.53,'beginning_platform_behind').setScale(0.43).setGravityY(-1000).setDepth(1000);

    this.platformRight = this.physics.add.image(this.width/1.07,this.height/1.2, 'beginning_platform').setScale(0.45).setFlipX(true).setDepth(9000);
    //Hacemos la plataforma inmovible, e inmune a la gravedad. Así aunque el jugador salte encima, esta no se mueve.
    this.platformRight.body.allowGravity = false;
    this.platformRight.body.immovable = true;
    //this.platforms.setDepth(9000);
    this.platform_right_background = this.physics.add.image(this.width/1.07,this.height/1.53,'beginning_platform_behind').setScale(0.43).setFlipX(true).setGravityY(-1000).setDepth(1000);
    // #endregion

    this.cols        =  this.physics;
    this.cols.length =  0;
    //this.cols[0]     =  this.physics.add.sprite(-100,0,'tronco').body.setGravityY(-1000);


    this.InitPlayers();
    this.InitUI();
    this.InitEndGameScreen();
    this.InitColliders();
    this.InitStartTimer();
    this.CreateParticles();

  }

  /**
   * Inicializa a los personajes que se mostraránen pantalla,
   * con las animaciones y atributos propias de cada uno
   */
  InitPlayers(){
    //Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.player1   = this.physics.add.sprite(this.width/10,this.height/1.6,'ocre',4);
    this.player2   = this.physics.add.sprite(this.width/1.1,this.height/1.6,'purpura',4);

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

    this.anims.create({
      key: 'falling0',
      frames: [ { key: 'ocre', frame: 5 } ],
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

    this.anims.create({
      key: 'falling1',
      frames: [ { key: 'purpura', frame: 5 } ],
      frameRate: 10,
      repeat: -1
    });

    this.player1.score = 0;
    this.player1.lifes = this.maxLifes;
    this.player1.id = 0;
    this.player1.z = 100;

    // Reajusto el tamaño de la imagen del prota
    this.player1.displayWidth = 45;
    this.player1.scaleY       = this.player1.scaleX;
    this.player1.canLooseLifes = true;
    this.player1.setCollideWorldBounds(false);
    this.player1.setDepth(3000);
    // #endregion

    // #region Personaje 2
    this.player2.score = 0;
    this.player2.lifes = this.maxLifes;
    this.player2.id =1
    this.player2.canLooseLifes = true;

    //Reajusto el tamaño de la imagen del prota
    this.player2.displayWidth = 45;
    this.player2.scaleY       = this.player1.scaleX;

    this.player2.setCollideWorldBounds(false);

    this.player1.setDepth(3000);
    this.player2.setDepth(3000);
    // #endregion

  }

  /**
   * Inicializa las particulas que apareceran en la escena
   */
  CreateParticles(){
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
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player1.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.2,
      quantity: 0.7
    });

    this.particles2_1 = this.add.particles('particle').setDepth(0);
    this.emitterNinja1_1= this.particles2.createEmitter({
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player2.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0,
      quantity: 0.5
    });

    this.particles2_2 = this.add.particles('particle').setDepth(0);
    this.emitterNinja1_2= this.particles2.createEmitter({
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player2.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0,
      quantity: 0.5
    });
    // #endregion

    // #region player 2 particles
    this.emitterNinja2_1= this.particles2.createEmitter({
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player2.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0,
      quantity: 1
    });

    this.emitterNinja2_2= this.particles2.createEmitter({
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player2.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0,
      quantity: 1
    });

    this.emitterNinja2_3= this.particles2.createEmitter({
      x: 0,
      y: 0,
      lifespan:400,
      speed: {min:50, max: 100},
      angle: -this.player2.body.gravity,
      blendMode: 'ADD',
      gravityY: 100,
      scale:{
          start:0.5, end:0
      },
      alpha: 0.2,
      quantity: 1
    });
    // #endregion

  }

  /**
   * Inicializa la visualizacion de las vidas de los personajes en pantalla
   */
  InitUI(){
    // #region Scores
    // this.player1_Text = this.add.text(this.width/40, this.height/1.095, 'P1 LIFES', { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 });
    // this.player1_Text.setDepth(11000);
    // this.player1_Text.visible = false;
    this.player1_HP_Text = this.add.text(this.width/5.22, this.height/1.175, this.player1.lifes, {
      fontFamily: '"Roboto Condensed"',
      fontFamily: '"brush_font"',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center",
      color: 'black',
      fontSize: 29 });
    this.player1_HP_Text.setDepth(11000);

    // this.player2_Text = this.add.text(this.width/1.19, this.height/1.095, 'P2 LIFES', { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21 });
    // this.player2_Text.setDepth(11000);
    this.player2_HP_Text = this.add.text(this.width/1.255, this.height/1.175, this.player2.lifes, {
      fontFamily: '"Roboto Condensed"' ,
      fontFamily: '"brush_font"',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align:'center',
      color: 'black',
      fontSize: 29  });

      

      this.ochreBanner  = this.add.image(this.width/5,this.height/1.18,'ochreBanner');
      this.ochreBanner.displayWidth = 100;
      this.ochreBanner.scaleY = this.ochreBanner.scaleX;
      this.ochreBanner.angle += 15;
      this.ochreBanner.setDepth(9500);

      this.purpleBanner  = this.add.image(this.width/1.23,this.height/1.18,'purpleBanner');
      this.purpleBanner.displayWidth = 100;
      this.purpleBanner.scaleY = this.purpleBanner.scaleX;
      this.purpleBanner.angle -= 15;
      this.purpleBanner.setDepth(9500);
      // this.ochreBanner  = this.add.sprite(this.width/1.1,this.height/1.6,'ochreBanner',4);
      // this.ochreBanner.setDepth(9500);
     this.player2_HP_Text.setDepth(11000);
      this.lifesAnim1 = this.tweens.add({
        targets: this.player2_HP_Text,
        scale: 1.1,
        ease: 'Sine.easeInOut',
        duration: 100,
        yoyo: true,
        
      });

      this.lifesAnim2 = this.tweens.add({
        targets: this.player1_HP_Text,
        scale: 1.1,
        ease: 'Sine.easeInOut',
        duration: 100,
        yoyo: true,
        
      });

    
    // #endregion
  }

  /**
   * Inicializa los spawns de los troncos (parte superior de la cascada) utilizando la funcion rand, que va con una semilla (this.seed)
   */
  InitSpawns(){
      // #region spawnAreas
      var spawnTrunkRight = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(this.rand(this.width/5.12, this.width/3.20, this.seed),0,'tronco' ).body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }

      var spawnTrunkLeft = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(this.rand(this.width/1.8, this.width/1.24, this.seed),0,'tronco').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);
        this.cols.length++;
      }

      var spawnTrunkMiddle = function(){
        this.cols[this.cols.length] = this.physics.add.sprite(this.rand(this.width/3, this.width/2,this.seed),0,'tronco').body.setGravityY(this.nullGravity).setVelocityY(this.trunksVelocity);

        this.cols.length++;
      }
      // #endregion

      // Contador para el spawner de troncos
      this.TrunkGeneratorRight  = this.scene.get("onlinegame").time.addEvent({delay: this.rand(this.minTrunkTimer - 400, this.maxTrunkTimer, this.seed), callback: spawnTrunkRight, callbackScope:this, loop:true});
      this.TrunkGeneratorLeft   = this.scene.get("onlinegame").time.addEvent({delay: this.rand(this.minTrunkTimer - 400, this.maxTrunkTimer, this.seed), callback: spawnTrunkLeft, callbackScope:this, loop:true});
      this.TrunkGeneratorMiddle = this.scene.get("onlinegame").time.addEvent({delay: this.rand(this.minTrunkTimer, this.maxTrunkTimer, this.seed), callback: spawnTrunkMiddle, callbackScope:this, loop:true});
  }

  /**
   * Inicializa la relación entre los distintos elementos que
   * pueden colisionar entre sí
   */
  InitColliders(){
    this.walls = this.physics.add.staticGroup();
    this.wall_left = this.walls.create(-25,this.height/2,'wall');
    this.wall_left.setAlpha(0);
    this.wall_right   = this.walls.create(825,this.height/2,'wall');
    this.wall_right.setAlpha(0);

    var playersCollide = function players(){
      if(Phaser.Input.Keyboard.JustDown(this.upButton)){
          if(this.playerid == 1){

            this.ninjaScream = this.screamPool[Math.floor(Math.random() * 5)];
            this.ninjaScream.play();
            // Salto
            this.player1.setVelocityY(this.jumpForce);
            this.particles.emitParticleAt(this.player1.x,this.player1.y+40,50);
            this.player2.setVelocityY(-this.jumpForce/2);
            //Sonido de salto
            this.jumpaudio.play({
              volume: 0.2
            });

            //Se manda la señal al otro jugador de que se ha efectuado un salto
            var jump = {
              jumped : true
            } 
            this.connection.send(JSON.stringify(jump));

            this.fallingP2 = true;
            this.scene.get("onlinegame").time.addEvent({delay: 400, callback: function(){this.fallingP2 = false}, callbackScope:this, loop:false});
          }
          if(this.playerid == 2){
            console.log("Entra al segundo if??")
            this.ninjaScream = this.screamPool[Math.floor(Math.random() * 5)];
            this.ninjaScream.play();
            // Salto
            this.player2.setVelocityY(this.jumpForce);
            this.particles.emitParticleAt(this.player2.x,this.player2.y+40,50);
            this.player1.setVelocityY(-this.jumpForce/2);
            //Sonido de salto
            this.jumpaudio.play({
              volume: 0.2
            });

            //Se manda la señal al otro jugador de que se ha efectuado un salto
            var jump = {
              jumped : true
            } 
            this.connection.send(JSON.stringify(jump));

            this.fallingP1 = true;
            this.scene.get("onlinegame").time.addEvent({delay: 400, callback: function(){this.fallingP1 = false}, callbackScope:this, loop:false});
          }
      }
    };

    // this.physics.add.collider(this.platformLeft);
    // this.physics.add.collider(this.platformRight);
    this.physics.add.collider(this.wall_left, this.player1);
    this.physics.add.collider(this.wall_right, this.player1);
    this.physics.add.collider(this.wall_left, this.player2);
    this.physics.add.collider(this.wall_right, this.player2);

    // Entre los personajes no hay colision, pero se puede saltar encima del otro, para ello utilizamos la funcion overlap
    this.physics.add.overlap(this.player1,  this.player2, playersCollide, null, this);

    this.physics.add.collider(this.player1,  this.platformLeft);
    this.physics.add.collider(this.player2, this.platformRight);
  }

  /**
   * Prepara la pantalla que se muestra al finalizar la partida
   */
  InitEndGameScreen(){
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

      this.playagainButton = this.physics.add.sprite(this.width/1.45,this.height/1.72,'Playagain').setGravityY(-1000).setGravityX(0).setInteractive();
      this.playagainButton.setInteractive();
      this.playagainButton.displayWidth = 230;
      this.playagainButton.scaleY= this.playagainButton.scaleX;
      this.playagainButton.setDepth(13000);
      this.playagainButton.on('pointerup', function(){
          that.sound2.play();
          that.cameras.main.fadeOut(200);
          that.scene.get("onlinegame").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
      });

      this.returnButton = this.physics.add.sprite(this.width/1.85,this.height/1.72,'Return').setGravityY(-1000).setGravityX(0).setInteractive();
      this.returnButton.setInteractive();
      this.returnButton.displayWidth = 230;
      this.returnButton.scaleY= this.returnButton.scaleX;
      this.returnButton.setDepth(13000);
      this.returnButton.on('pointerup', function(){
          that.sound2.play();
          that.cameras.main.fadeOut(200);
          that.playeridDefined=false;
          that.playerid = null;
          that.connection.close();
          game.logged = true;
          that.scene.get("onlinegame").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu'); }, callbackScope:this, loop:false});
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
        that.playagainButton.anims.play('playagainSelected');
        do{  //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
            that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
            this.pointerOver = false;
        }while(this.pointerover);
      });

      // Cuando apartas el raton
      this.playagainButton.on('pointerout', function() {
        that.playagainButton.anims.play('playagain');

        this.pointerOver = true;
      });

      this.returnButton.on('pointerover', function() {
        that.returnButton.anims.play('returnSelected');
        do{  //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
            that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
            this.pointerOver = false;
        }while(this.pointerover);
      });

      // Cuando apartas el raton
      this.returnButton.on('pointerout', function() {
        that.returnButton.anims.play('return');
        this.pointerOver = true;
      });

      this.returnButton.visible = false;
      this.playagainButton.visible = false;

      // Texto del ganador
      this.playerX_Text = this.add.text(this.width/3.8, this.height/2.6, "XXXXX is the WINNER", { fontFamily: '"Roboto Condensed"' , fontFamily: '"kouzan_font"',  fontSize: 40 ,color:'black',align:'center',boundsAlignH: 'center', boundsAlignV: 'middle' });
      this.playerX_Text.setDepth(13000);
      this.playerX_Text.visible = false;

      this.playerX_WinnerText = this.add.text(this.width/2.2, this.height/2.4, 'is the WINNER', { fontFamily: '"Roboto Condensed"' , fontFamily: '"kouzan_font"',  fontSize: 40, color: 'black' });
      this.playerX_WinnerText.setDepth(13000);
      this.playerX_WinnerText.visible = false;

      // Background del pergamino en la pantalla final
      this.endScroll= this.physics.add.sprite(this.width/2, this.height/2,'scroll-background').setGravityY(-1000).setInteractive();
      this.endScroll.displayWidth = 730;
      this.endScroll.scaleY= this.endScroll.scaleX;
      this.endScroll.setDepth(12500);
      this.endScroll.visible =  false;

      // Rollo del pergamino
      this.endScroll2= this.physics.add.sprite(this.width/13, this.height/2,'scroll-background3').setGravityY(-1000).setInteractive();
      this.endScroll2.displayWidth = 60;
      this.endScroll2.scaleY= this.endScroll2.scaleX;
      this.endScroll2.displayHeight = 250;
      this.endScroll2.setDepth(12500);
      this.endScroll2.visible = false;
      // #endregion


      this.startTime = new Date();
      this.totalTime = 0;
      this.currentTime = 0;
      this.timerText = this.add.text(this.width/2.7, this.height/2.08, "00:00",{fontFamily: '"Roboto Condensed"', fontFamily: '"kouzan_font"',fontSize: 22, fill: "black"}).setDepth(13000);
      this.timerText.visible = false;
      this.scene.get("onlinegame").time.addEvent({delay: 100, callback: this.UpdateTimer, callbackScope:this, loop:true});
  }

  /**
   * Actualiza el contador, sumando un segundo en cada iteracion
   */
  UpdateTimer(){
      if(!this.ended && this.isPlayable===true){
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        this.currentTime = this.totalTime+this.timeElapsed;

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(this.currentTime / 60);
        var seconds = Math.floor(this.currentTime) - (60 * minutes);

        var result = "Time survived: "
        
        //Display minutes, add a 0 to the start if less than 10
        result += (minutes < 10) ? "0" + minutes : minutes;

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

        if(this.playerid == 1){
          var tiempofinal = {
            tiempoFinal : result
          }

          this.connection.send(JSON.stringify(tiempofinal));
        }else{
          result = this.tiempofinalRecibido;
        }
        this.finaltextoftime = result;
        this.timerText.text = result;
      }

  }

  /**
   * Inicializa la cuenta atrás para que empiece la partida al inicio
   * de la escena
   */
  InitStartTimer(){

    // Contador
    this.cont = 3;

    // Background del contador
    this.timerBox = this.add.graphics();
    this.timerBox.fillStyle(0x222222, 0.8).setDepth(6000);
    this.timerBox.fillRect(0, this.height/2, 800, 60).setDepth(5000);
    this.timerBox.displayHeight = 60;

    // Llamamos a la funcion AdvanceTimer en bucle con un delay determinado
    this.scene.get("onlinegame").time.addEvent({delay: 1500, callback:AdvanceTimer, callbackScope:this, loop:true});

    this.timer = this.add.text(this.width/2, this.height/1.98, '3', { fontFamily: '""', fontSize: 50 });
    this.timer.setDepth(7000);

    
    function AdvanceTimer(){
      if(this.cont >= 0){

        if(this.playerid != undefined && this.playerid == 1 && this.bothconnected === true){
          this.cont--;
          var initialTimer = {
            time : this.cont
          }
          this.connection.send(JSON.stringify(initialTimer));
        }

        this.timer.setText(parseInt(this.cont));
        console.log(this.cont);
      }
      if(this.cont <= 0){
        this.isPlayable = true;
        this.timer.setText(parseInt(''));
      }
      // if(this.cont <= 0)
      // this.timer.setText(parseInt(''));
    }

    // Llamamos a la animacion de "ocultacion" del background del contador
    this.scene.get("onlinegame").time.addEvent({delay: 0, callback:Anim, callbackScope:this, loop:true});

    this.height2 = 60;
    this.height3 = 300;
    this.alpha = 1;
    // Animación del timerBox al acabar el contador
    function Anim(){
      if(this.cont<1){
        this.height2 = this.height2-6;
        this.height3 = this.height3+3;
        this.alpha -= 0.1;
        this.miniTutorialText.setAlpha(this.alpha);
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
  UpdatePlayerAnim(player, playerCanMove, playerIZQ, falling){
    if(!falling){
      if(!player.body.touching.down && playerCanMove){
        if(player.body.velocity.x >0){
          if(player.body.velocity.y <0){
            player.anims.play("rightup" + player.id); // player1.id == 0 && player2.id == 1
          }else{
            player.anims.play("rightdown" + player.id);
          }

          playerIZQ = false;

        }else if(player.body.velocity.x <0 ){
          if(player.body.velocity.y <0){
            player.anims.play("leftup" + player.id);
          }else{
            player.anims.play("leftdown" + player.id);
          }

          playerIZQ = true;

        }else{
          if(playerIZQ){
            if(player.body.velocity.y <0){
              player.anims.play("leftup" + player.id);
            }else{
              player.anims.play("leftdown" + player.id);
            }
          }else{
            if(player.body.velocity.y <0){
              player.anims.play("rightup" + player.id);
            }else{
              player.anims.play("rightdown" + player.id);
            }
          }
        }
        return playerIZQ;
      }
    }else{
      player.anims.play("falling" + player.id);
    }
  }

  /**
   * Comprueba si ha terminado la partida al caer un personaje
   */
  CheckEndGame(){
    // #region Fin de partida
    if(this.player1.y > 800 || this.player2.y > 800){

      if(this.ended === false && (this.player1.lifes <= 0 || this.player2.lifes <= 0)){
        this.returnButton.visible = true;
        //this.playagainButton.visible = true;

        this.endBackground.visible = true;
        this.timerText.visible = true;
        this.endScroll.visible = true;
        this.endScroll2.visible = true;
        if(this.player1.y > 800){
          this.playerX_Text.setText('PURPLE is the WINNER');
        }else if(this.player2.y > 800){
          this.playerX_Text.setText('OCHRE is the WINNER');
        }
        this.playerX_Text.visible = true;

        //Paramos la banda sonora, y reproducimos el sonido de game over
        this.soundtrack.stop();
        this.allSoundtracksLoop[0].stop();
        this.allSoundtracksLoop[1].stop();
        this.gameOver.play();
        this.ended = true;
        this.isPlayable = false;

      }
      else if(this.ended === false){
        if(this.player1.y >= 800){
          if(this.player1.canLooseLifes === true){
            this.looseHP_Sound.play();
            this.lifesAnim2.play();
            this.player1.lifes--;
            this.player1.canLooseLifes = false;
          }
          if(this.player1.lifes >= 1)
            this.player1.setVelocityY(this.jumpForce * 2);
        }else if(this.player2.y >= 800){

          if(this.player2.canLooseLifes === true){
            this.looseHP_Sound.play();
            this.lifesAnim1.play();
            this.player2.lifes--;
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


  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta){
    if(this.ended){
      this.timerText.text = this.finaltextoftime;
    }

    var that = this;
    //Comprobacion necesaria y activacion de los envios de datos por websockets. Se mandan las coordenadas de los jugadores, y el array de troncos
    if(!this.playeridDefined){
      if(this.playerid != undefined){
        //Se configura el envio de datos, en funcion de si es el jugador 1 o 2
        this.playeridDefined = true;
        if(this.playerid==1){
          console.log('Jugador 1 manda coordenadas');
          this.scene.get("onlinegame").time.addEvent({
            delay: 33,                // ms
            callback: function(){
              var coords = {
                Xvel : this.player1.body.velocity.x,
                Yvel : this.player1.body.velocity.y,
                Xcoord : this.player1.x,
                Ycoord : this.player1.y
              }
        
              var colsCoords = {
                colsX : [],
                colsY : []
              }

              
              
              
              for(var i = (this.cols.length-101); i<this.cols.length; i++){
                if(this.cols[i] != null){
                  colsCoords.colsX[i-(this.cols.length-101)] = this.cols[i].x;
                  colsCoords.colsY[i-(this.cols.length-101)] = this.cols[i].y;
                }             
              }
              //console.log("Coordenadas del ultimo tronco: " + this.cols[this.cols.length-1].y);
              this.connection.send(JSON.stringify(coords));
              this.connection.send(JSON.stringify(colsCoords));
              
            },
            //args: [],
            callbackScope: this,
            loop: true
        });
        }else{
            console.log('Jugador 2 manda coordenadas');
            this.scene.get("onlinegame").time.addEvent({
              delay: 33,                // ms
              callback: function(){

                var coords = {
                  Xvel : this.player2.body.velocity.x,
                  Yvel : this.player2.body.velocity.y,
                  Xcoord : this.player2.x,
                  Ycoord : this.player2.y
                }
                
                this.connection.send(JSON.stringify(coords));
               
              },
              //args: [],
              callbackScope: this,
              loop: true
          });
        }
      }
    }

     //Se colocan los troncos del jugador 2 en la misma posición que la del jugador 1, para que vayan a la par. (websockets)
     if(this.playerid==2){
      if(this.logsCoordX != undefined){ 
        for(var i = 1; i<=this.cols.length; i++){ 
          if(this.cols[this.cols.length-i] != null && this.logsCoordX[this.logsCoordX.length-i]){       
            this.cols[this.cols.length-i].x = this.logsCoordX[this.logsCoordX.length-i];   
            this.cols[this.cols.length-i].y = this.logsCoordY[this.logsCoordY.length-i]; 
          }
        }
      }
    }


    // Actualizamos las animaciones de los personajes teniendo en cuenta la direccion del movimiento
    // y si se pueden mover
    this.player1IZQ = this.UpdatePlayerAnim(this.player1, this.player1CanMove, this.player1IZQ, this.fallingP1);
    this.player2IZQ = this.UpdatePlayerAnim(this.player2, this.player2CanMove, this.player2IZQ, this.fallingP2);

    // Actualizamos la posicion de las particulas que desprenden los personajes
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
      this.player1_HP_Text.setText(this.player1.lifes);
      this.player2_HP_Text.setText(parseInt(this.player2.lifes));
      // #endregion

      // #region Teclas y movimiento
      if(this.playerid==1){//Se comprueba si el jugador es 1 o 2, para que no pueda mover el personaje del contrincante
        if(this.leftButton.isDown){

          if(this.player1CanMove)
            this.player1.setVelocityX(-this.xSpeed);

        }else if(this.rightButton.isDown){

          if(this.player1CanMove)
            this.player1.setVelocityX(this.xSpeed);

        }else{

          this.player1.setVelocityX(0);

        }
      }

      if(this.playerid==2){//Se comprueba si el jugador es 1 o 2, para que no pueda mover el personaje del contrincante
        if(this.leftButton.isDown){

          if(this.player2CanMove)
            this.player2.setVelocityX(-this.xSpeed);

        }else if(this.rightButton.isDown){

          if(this.player2CanMove)
            this.player2.setVelocityX(this.xSpeed);

        }else{

          this.player2.setVelocityX(0);
        }
      }
      // #endregion
      if(this.upButton.isDown && this.playerid==1){
        this.ForPlayer(this.player1, this.upButton);
        if(!this.player1CanMove){
          this.player1CanMove = true;

          //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
          if(this.platformLeft.body){
            if(this.platformLeft.body.immovable)
              this.platformLeft.body.immovable = false;
              this.platformLeft.body.allowGravity = true;

              this.platformLeft.setGravityY(0);
              this.platform_left_background.setGravityY(0);
          }
          

          //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
          this.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
            this.platformLeft.destroy();
            this.platform_left_background.destroy();
          }, callbackScope:this, loop:false});

          //Si el otro jugador no salta en 2 segundos,su plataforma se cae, y el salta automaticamente una vez, para así iniciar la partida.
          this.scene.get("onlinegame").time.addEvent({delay: 2000, callback: function(){
            if(!this.player2CanMove){
              this.player2CanMove = true;
              this.player2.setVelocityY(this.jumpForce);
            }
            //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae

            if(this.platformRight.body){
              if(this.platformRight.body.immovable)
                this.platformRight.body.immovable = false;
              this.platformRight.body.allowGravity = true;
              this.platformRight.setGravityY(0);
            this.platform_right_background.setGravityY(0);
            }

            

            //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
            this.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
              this.platformRight.destroy();
              this.platform_right_background.destroy();
            }, callbackScope:this, loop:false});

          }, callbackScope:this, loop:false});
        }
      }

      if(this.upButton.isDown && this.playerid==2){
        this.ForPlayer(this.player2, this.upButton);
        if(!this.player2CanMove){
          this.player2CanMove = true;

          //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
          if(this.platformRight.body != undefined){
            this.platformRight.body.immovable = false;
            this.platformRight.body.allowGravity = true;

            this.platformRight.setGravityY(0);
            this.platform_right_background.setGravityY(0);
          }
            

          //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
          this.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
            this.platformRight.destroy();
            this.platform_right_background.destroy();
          }, callbackScope:this, loop:false});

          //Si el otro jugador no salta en 2 segundos,su plataforma se cae, y el salta automaticamente una vez, para así iniciar la partida.
          this.scene.get("onlinegame").time.addEvent({delay: 2000, callback: function(){
            if(!this.player1CanMove){
              this.player1CanMove = true;
              this.player1.setVelocityY(this.jumpForce);
            }
            //Cuando el jugador salta una vez empieza la partida, la plataforma deja de ser inmovible e inmune a la gravedad,y por lo tanto cae
            if(this.platformLeft.body != undefined){
              this.platformLeft.body.immovable = false;
              this.platformLeft.body.allowGravity = true;

              this.platformLeft.setGravityY(0);
              this.platform_left_background.setGravityY(0);
            }
              

            //Añadimos un evento de tiempo, que borrara la plataforma del juego tras medio segundo, para que esta desapareza cuando ya el jugador no la vea. Así liberamos memoria
            this.scene.get("onlinegame").time.addEvent({delay: 500, callback: function(){
              this.platformLeft.destroy();
              this.platform_left_background.destroy();
            }, callbackScope:this, loop:false});

          }, callbackScope:this, loop:false});
        }
      }
    }
    for(var i = 0; i < this.cols.length-1; i++){
        if(this.cols[i].y > 640){
          this.cols[i] = this.physics.add.sprite(this.cols[i].x,this.cols[i].y,'tronco' ).body.setGravityY(this.nullGravity).setVelocityX(10000);
        }
    }
    this.CheckEndGame();
  }
}
