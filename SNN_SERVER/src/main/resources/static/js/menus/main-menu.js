/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */



class mainMenu extends Phaser.Scene{
    constructor(){
        super({key:"mainMenu"});
      }

    preload(){
        this.load.html('url', 'js/menus/input-url.html');
        this.activado = false;
        
        // #region se cargar los sonidos para el menu
        this.load.audio('MenuSound1','assets/Menu sounds/PaperSound4.mp3');
        this.load.audio('MenuSound2','assets/Menu sounds/PaperSound3.mp3');
        this.load.audio('PaperSound1', 'assets/Menu sounds/PaperSound1.mp3');
        this.load.audio('Waterfall', 'assets/Menu sounds/WaterfallSound.mp3');
        this.load.image('black-background' ,  'assets/end-game-background.png');

        this.pointerOver = true; // Booleano que se activa y desactiva al pasar por encima de los botones, con el objetivo de que los sonidos se reproduzcan una sola vez , y no se bugee
        // //#endregion

        this.load.image('Local-game'         , 'assets/main-menu/local-game-btn.png');
        this.load.image('Online-game'        , 'assets/main-menu/online-game-btn.png');
        this.load.image('Controls'           , 'assets/main-menu/controls-btn.png');
        this.load.image('Credits'            , 'assets/main-menu/credits-btn.png');

        this.load.image('Local-gameSelected'         , 'assets/main-menu/boton_local_game_seleccionado.png');
        this.load.image('CreditsSelected'        , 'assets/main-menu/boton_credits_seleccionado.png');
        this.load.image('ControlsSelected'           , 'assets/main-menu/boton_controls_seleccionado.png');
        this.load.image('Online-gameSelected'         , 'assets/main-menu/boton_online_game_seleccionado.png');

        this.load.image('Return'              , 'assets/game-elements/boton_return.png');
        this.load.image('ReturnSelected'      , 'assets/game-elements/boton_return_seleccionado.png');
        this.load.image('Playagain'           , 'assets/game-elements/boton_play_again.png');
        this.load.image('PlayagainSelected'   , 'assets/game-elements/boton_play_again_seleccionado.png');

        this.load.image('T1'                 , 'assets/main-menu/tit-1.png');
        this.load.image('T2'                 , 'assets/main-menu/tit-2.png');
        this.load.image('buttons-background' , 'assets/main-menu/PergaminoNinja.png');
        this.load.image('buttons-background-2' , 'assets/main-menu/pergamino-ninja-rollo.png');
        this.load.image('scroll-background'         , 'assets/controls-menu/pergamino.png');
        this.load.spritesheet('backgroundSheet'     , 'assets/game-elements/BackgroundSheet.png',{
            frameWidth: 800,
            frameHeight: 600
        }); 

        this.load.image('shuriken', 'assets/shuriken.png');

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

        this.progressB = progressBar;
        this.progressBx = progressBox;
        this.loading = loadingText;
        this.asset = assetText;
    }

    
  
    
    create(){
        var that = this;
        this.url = 'http://localhost:8080';
        this.fullLobby = false;

        $.getJSON('https://api.ipify.org/?format=json', function(data){
            console.log("direccion ip: " + data.ip);
        });

        //Servidor activo??
        this.getActiveServer= function() { 
            that.activado=false;     
            $.ajax({
                url: that.url+'/server/activeServer'
            }).done(function (items) {
                console.log("Servidor activo: " + items);
                that.activado = items;
            })
        } 

        //Comprueba si la sala está llena, y lo escribe en un booleano.
        this.checkPlayers= function() {
             
            that.fullLobby=false;     
            $.ajax({
                url: that.url+'/server/players/getPlayers'
            }).done(function (items) {
                if(items[0] != null && items[1] != null){
                    that.fullLobby=true;
                }
            })
        } 

        //Create item in server
        this.createItem = function(item) {
            
            $.ajax({
                method: "POST",
                url: that.url+'/server/players/player1',
                data: JSON.stringify(item),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (item) {
                console.log("Item created: " + JSON.stringify(item));
                //callback(item);
            })
        }   

        this.getActiveServer();
        console.log("createItem")

        this.progressB.destroy();
        this.progressBx.destroy();
        this.loading.destroy();
        this.asset.destroy();

        this.blackBackground = this.add.sprite(0,0,'black-background').setInteractive();
        this.blackBackground.displayWidth = 20000;
        this.blackBackground.scaleY       = this.blackBackground.scaleX;
        this.blackBackground.setDepth(12000);
        this.blackBackground.visible = false;

        //Variable auxiliar que guarda la escena actual en ella. Es importante porque en los eventos, si ponemos this, no devuelve la escena,
        //sino el objeto que ha llamado al evento (eso objeto puede ser un botón, por ejemplo)
        var that = this;
        this.width  = 800;
        this.height = 600;

        this.cameras.main.fadeIn(1000);
        
        //Se crean los objetos para los sonidos
        this.sound1 = this.sound.add('MenuSound1');
        this.sound2 = this.sound.add('MenuSound2');
        this.sound3 = this.sound.add('PaperSound1');
        if(this.waterfallSound){
            this.waterfallSound.volume = 0.15;
        }else if(!this.waterfallSound){
            this.waterfallSound = this.sound.add('Waterfall');
            this.waterfallSound.play({
                volume: 0.15,
                loop: true
            });
        }

        this.background = this.add.sprite(this.width/2,this.height/2,'backgroundSheet',0);

        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('backgroundSheet', { start: 0, end: 2}),
            frameRate: 8,
            repeat: -1
        });

        this.background.anims.play('backgroundAnimation');

        this.btn_bck = this.physics.add.sprite(this.width/1.97, this.height/1.42,'buttons-background').setGravityY(-1000).setVelocityX(0).setInteractive();
        //this.t1.setInteractive();
        this.btn_bck.displayWidth = 400;
        this.btn_bck.scaleY= this.btn_bck.scaleX;
        this.btn_bck.setDepth(1000);

        this.btn_bck2 = this.physics.add.sprite(this.width/3.8, this.height/1.41,'buttons-background-2').setGravityY(-1000).setVelocityX(0).setInteractive();
        //this.t1.setInteractive();
        this.btn_bck2.displayWidth = 81;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 73;
        this.btn_bck2.setDepth(2000);

        this.posBtnX = this.width/2.8;

        this.t1 = this.physics.add.sprite(-85, this.height/5,'T1').setGravityY(-1000).setGravityX(6000).setInteractive();
        this.t1.setInteractive();
        this.t1.displayWidth = 600;
        this.t1.scaleY= this.t1.scaleX;

        var titleAnim1 = this.tweens.add({
            targets: this.t1,
            scaleX: 0.702,
            scaleY: 0.702,
            ease: 'Sine.easeInOut',
            duration: 1200,
            yoyo: true,
            repeat: -1
        });

        this.shuriken = this.add.image(this.width/2, this.height/2, 'shuriken');
        this.shuriken.setDepth(15000);
        this.shuriken.visible = false;
        this.shuriken.displayWidth = 120;
        this.shuriken.scaleY= this.shuriken.scaleX;

        var shurikenAnim = this.tweens.add({
            targets: this.shuriken,
            angle: 360,
            //scaleX: 0.702,
            //scaleY: 0.702,
            //ease: 'Sine.easeInOut',
            duration: 1200,
            //yoyo: true,
            repeat: -1
        });

        this.t2 = this.physics.add.sprite(this.width, this.height/2.92,'T2').setGravityY(-1000).setGravityX(-3000).setInteractive();
        this.t2.setInteractive();
        this.t2.displayWidth = 350;
        this.t2.scaleY= this.t2.scaleX;

        var titleAnim2 = this.tweens.add({
            targets: this.t2,
            
            scaleX: 0.596,
            scaleY: 0.596,
            ease: 'Sine.easeInOut',
            duration: 1200,
            yoyo: true,
            repeat: -1
        });

        this.localGameButton = this.add.sprite(this.width/2, this.height/1.70,'Local-game').setInteractive();
        this.localGameButton.displayWidth = 230;
        this.localGameButton.scaleY= this.localGameButton.scaleX;
        this.localGameButton.setDepth(2000);
        this.localGameButton.on('pointerup', function(){
            that.sound2.play();
            that.waterfallSound.volume = 0;
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('localgame');}, callbackScope:this, loop:false});
        });


        this.OnlineGameButton = this.add.sprite(this.width/2, this.height/1.5,'Online-game').setInteractive();
        this.OnlineGameButton.displayWidth = 230;
        this.OnlineGameButton.scaleY= this.localGameButton.scaleX;
        this.OnlineGameButton.setDepth(2000);
        this.OnlineGameButton.on('pointerup', function(){
            
            that.blackBackground.visible = true;
            var text = that.add.text(300, 10, 'Please enter a valid IP', { color: 'white', fontSize: '20px '});

            var input = that.add.dom(400,300).createFromCache('url');

            input.addListener('click');

            input.on('click', function (event) {

            if (event.target.name === 'find-out')
            {
                var inputText = this.getChildByName('url');

            //  Have they entered anything?
            if (inputText.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');

                //  Hide the login element
                this.setVisible(false);

                that.url = 'http://'+inputText.value.toString() + ":8080";
                game.url = that.url;
                //  Populate the text with whatever they typed in
                // text.setText('Welcome ' + inputText.value);
                // console.log('Welcome ' + inputText.value);

                
                that.shuriken.visible = true;
                that.getActiveServer();
                that.checkPlayers();

                that.scene.get("mainMenu").time.addEvent({delay: 1000, callback: function(){
                    if(that.activado){

                        if (!that.fullLobby) {

                            that.scene.start('onlineLobby');

                        }else{
                            that.sound3.play();
                            that.shuriken.visible = false;
                            that.returnButton.visible = true;
                            that.playerX_Text.visible = true; //10:10:144:80
                            that.playerX_Text.setText('The lobby is full.');
                            that.endScroll.visible =  true;
                            that.endScroll2.visible = true;
                        }

                    }else{
                        that.sound3.play();
                        that.shuriken.visible = false;
                        that.returnButton.visible = true;
                        that.playerX_Text.visible = true; //10:10:144:80
                        that.playerX_Text.setText('Server is not available at this moment.');
                        that.endScroll.visible =  true;
                        that.endScroll2.visible = true;
                    }
                    console.log(that.activado);
                }, callbackScope:this, loop:false});


            }
            
            }

            });

        });

        this.ControlsButton = this.add.sprite(this.width/2,this.height/1.35,'Controls').setInteractive();
        this.ControlsButton.displayWidth = 230;
        this.ControlsButton.scaleY= this.localGameButton.scaleX;
        this.ControlsButton.setDepth(2000);
        this.ControlsButton.on('pointerup', function(){
            that.sound2.play();
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('controlsMenu');}, callbackScope:this, loop:false});
        });

        this.CreditsButton = this.add.sprite(this.width/2,this.height/1.225,'Credits').setInteractive();
        this.CreditsButton.displayWidth = 230;
        this.CreditsButton.scaleY= this.localGameButton.scaleX;
        this.CreditsButton.setDepth(2000);
        this.CreditsButton.on('pointerup', function(){
            that.sound2.play();
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('creditsMenu');}, callbackScope:this, loop:false});
        });

        //#region creamos "animaciones" para los botones del menu
        this.anims.create({
            key: 'LocalSelected',
            frames: [ { key: 'Local-gameSelected'} ],
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: 'LocalUnselected',
            frames: [ { key: 'Local-game'} ],
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'OnlineSelected',
            frames: [ { key: 'Online-gameSelected'} ],
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: 'OnlineUnselected',
            frames: [ { key: 'Online-game'} ],
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'CreditsSelected',
            frames: [ { key: 'CreditsSelected'} ],
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: 'CreditsUnselected',
            frames: [ { key: 'Credits'} ],
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'ControlsSelected',
            frames: [ { key: 'ControlsSelected'} ],
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: 'ControlsUnselected',
            frames: [ { key: 'Controls'} ],
            frameRate: 10,
            repeat: -1
          });
        //#endregion

        this.localGameButton.on('pointerover', function() {

            that.localGameButton.anims.play('LocalSelected');
            do{  //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        this.localGameButton.on('pointerout', function() {
            that.localGameButton.anims.play('LocalUnselected');

            this.pointerOver = true;
        });

        this.OnlineGameButton.on('pointerover', function() {
            that.OnlineGameButton.anims.play('OnlineSelected');
            do{   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerOver);
        });

        this.OnlineGameButton.on('pointerout', function() {
            that.OnlineGameButton.anims.play('OnlineUnselected');
            this.pointerOver = true;
        });

        this.ControlsButton.on('pointerover', function() {
            that.ControlsButton.anims.play('ControlsSelected');
            do{   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerOver);
        });

        this.ControlsButton.on('pointerout', function() {
            // this.displayWidth=230;
            // this.scaleY = this.scaleX;
            that.ControlsButton.anims.play('ControlsUnselected');
            this.pointerOver = true;
        });

        this.CreditsButton.on('pointerover', function() {
            that.CreditsButton.anims.play('CreditsSelected');
            do{   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerOver);
        });

        this.CreditsButton.on('pointerout', function() {
            // this.displayWidth=230;
            // this.scaleY = this.scaleX;
            that.CreditsButton.anims.play('CreditsUnselected');
            this.pointerOver = true;
        });

        this.InitSubmenus();
        
    }

    // DestroyMusic(){
    //     this.waterfallSound.destroy();
    // }

    InitSubmenus(){
        var that= this;
              //#region Se crean los botones "playagain" y "return" para reiniciar la partida, o volver al menú principal, una vez la partida termina.
        this.sound1 = this.sound.add('MenuSound1');
        this.sound2 = this.sound.add('MenuSound2');


        this.returnButton = this.add.sprite(this.width/2,this.height/1.58,'Return').setInteractive();
        this.returnButton.displayWidth = 230;
        this.returnButton.scaleY= this.returnButton.scaleX;
        this.returnButton.setDepth(13000);
        this.returnButton.on('pointerup', function(){
                that.sound2.play();
                that.returnButton.visible  = false;
                that.playerX_Text.visible  = false;
                that.endScroll.visible     =  false;
                that.endScroll2.visible    = false;
                that.blackBackground.visible = false;
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

        this.returnButton.on('pointerover', function() {
            that.returnButton.anims.play('returnSelected');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.returnButton.on('pointerout', function() {
            that.returnButton.anims.play('return');
            this.pointerOver = true;
        });

        // Texto del ganador
        this.playerX_Text = this.add.text(this.width/7, this.height/2.3, 'Server is not available at this moment.', { fontFamily: '"Roboto Condensed"' , fontFamily: '"kouzan_font"',  fontSize: 30 ,color:'black' });
        this.playerX_Text.setDepth(13000);
        this.playerX_Text.visible = false;

        // Background del pergamino en la pantalla final
        this.endScroll= this.physics.add.sprite(this.width/2, this.height/1.8,'scroll-background').setGravityY(-1000).setInteractive();
        this.endScroll.displayWidth = 730;
        this.endScroll.scaleY= this.endScroll.scaleX;
        this.endScroll.setDepth(12500);
        this.endScroll.visible =  false;

        // Rollo del pergamino
        this.endScroll2= this.physics.add.sprite(this.width/13, this.height/1.8,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.endScroll2.displayWidth = 60;
        this.endScroll2.scaleY= this.endScroll2.scaleX;
        this.endScroll2.displayHeight = 250;
        this.endScroll2.setDepth(12500);
        this.endScroll2.visible = false;

        this.returnButton.visible = false;

    }

    update(){
        if(this.t1.x>=this.width/2.18){
            this.t1.setGravityX(0).setVelocityX(0);
            this.t2.setGravityX(0).setVelocityX(0);
        }
    }
}
