/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */



class onlineLobby extends Phaser.Scene{
    
    constructor(){
        super({key:"onlineLobby"});
      }

    preload(){
        this.load.html('texto', 'js/menus/input.html');
        this.load.html('chat', 'js/menus/input-chat.html');

        this.load.image('controls-player1','assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2','assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn','assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background','assets/controls-menu/pergamino.png');   
        this.load.image('scroll-background2','assets/controls-menu/pergamino2.png');
        this.load.image('tutorial' , 'assets/main-menu/instructions.png');
        this.load.image('return-background' , 'assets/main-menu/return-button-background.png');

        this.load.spritesheet('backgroundSheet'     , 'assets/game-elements/BackgroundSheet.png',{
            frameWidth: 800,
            frameHeight: 600
        }); 

        this.load.image('ochre-controls','assets/controls-menu/ochre-controls.png');  
        this.load.image('purple-controls','assets/controls-menu/purple-controls.png');

        //this.load.html('nameform', 'assets/text/nameform.html');

        //this.load.image('purple-addvictories-btn' , 'assets/main-menu/purple-add-victories.png');
        this.load.image('purple-addpoints-btn' , 'assets/main-menu/purple-add-points.png');
        //this.load.image('ochre-addvictories-btn' , 'assets/main-menu/ochre-add-victories.png');
        this.load.image('ochre-addpoints-btn' , 'assets/main-menu/ochre-add-points.png');

        this.load.image('ReadyUnselected'                , 'assets/main-menu/readyUnselected.png');
        this.load.image('ReadySelected'        , 'assets/main-menu/readySelected.png');

        this.load.image('box'                , 'assets/main-menu/checkbox.png');
        this.load.image('box_tick'        , 'assets/main-menu/checkbox_tick.png');

        this.load.image('play' , 'assets/main-menu/boton_play.png');
        this.load.image('play_confirmed' , 'assets/main-menu/boton_play_confirmed.png');

    }

     
    
    

    create(){
        this.width  = 800;
        this.height = 600;
        this.url = game.url;
        this.emptyPlayer1 = true;
        this.emptyPlayer2 = true;
        this.score1 = 0;
        this.score2 = 0;
        // this.ochreVictories = 3;
        // this.purpleVictories = 3;
        this.playerId = 0;
        this.line = 1;
        this.chatText1 = "";
        this.chatText2 = "";
        this.chatText3 = "";
        this.chatEnabled = false;
        this.text1 = this.add.text(this.width/5, this.height/1.4, 'line 1', { color: 'white', fontSize: '20px '});
        this.text1.setDepth(10000);
        this.text2 = this.add.text(this.width/5, this.height/1.575, 'line 2', { color: 'white', fontSize: '20px '});
        this.text2.setDepth(10000);
        this.text3 = this.add.text(this.width/5, this.height/1.8, 'line 3', { color: 'white', fontSize: '20px '});
        this.text3.setDepth(10000);
        this.gameReady = false;
        this.gameStarted = false;

        this.startedGameText = this.add.text(this.width/7, this.height/2.3, 'Game should start now.', { fontFamily: '"Roboto Condensed"' , fontFamily: '"kouzan_font"',  fontSize: 30 ,color:'black' });
        this.startedGameText.setDepth(13000);
        this.startedGameText.visible = false;

        // Background del pergamino en la pantalla final
        this.startedGameScroll= this.physics.add.sprite(this.width/2, this.height/1.8,'scroll-background').setGravityY(-1000).setInteractive();
        this.startedGameScroll.displayWidth = 730;
        this.startedGameScroll.scaleY= this.startedGameScroll.scaleX;
        this.startedGameScroll.setDepth(12500);
        this.startedGameScroll.visible =  false;

        // Rollo del pergamino
        this.startedGameScroll2= this.physics.add.sprite(this.width/13, this.height/1.8,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.startedGameScroll2.displayWidth = 60;
        this.startedGameScroll2.scaleY= this.startedGameScroll2.scaleX;
        this.startedGameScroll2.displayHeight = 250;
        this.startedGameScroll2.setDepth(12500);
        this.startedGameScroll2.visible = false;
        

        this.player2Text = this.add.text(this.width/7.5, this.height/4, "2. ", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            color: 'black',
            fontSize: 30 });
        this.player2Text.setDepth(50000);

        this.player1Text = this.add.text(this.width/7.5, this.height/5.4, "1. ", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            color: 'black',
            fontSize: 30 });
        this.player1Text.setDepth(50000);

        this.score2Text = this.add.text(this.width/2.5, this.height/3.85, "", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            color: 'black',
            fontSize: 20 });
        this.score2Text.setDepth(50000);

        this.score1Text = this.add.text(this.width/2.5, this.height/5.05, "", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            color: 'black',
            fontSize: 20 });
        this.score1Text.setDepth(50000);

        var that = this;

	    this.serverOffText = this.add.text(this.width/7, this.height/2.3, 'Server has turned off', { fontFamily: '"Roboto Condensed"' , fontFamily: '"kouzan_font"',  fontSize: 30 ,color:'black' });
        this.serverOffText.setDepth(13000);
        this.serverOffText.visible = false;

        this.returnButton1 = this.add.sprite(this.width/2,this.height/1.58,'Return').setInteractive();
        this.returnButton1.displayWidth = 230;
        this.returnButton1.scaleY= this.returnButton1.scaleX;
        this.returnButton1.setDepth(13000);

        this.returnButton1.on('pointerup', function(){
                that.sound2.play();
                
                that.returnButton1.visible  = false;
                that.serverOffText.visible  = false;
                //that.inactivityText.visible = false;
                that.endScroll.visible     =  false;
                that.endScroll2.visible    = false;
                that.blackBackground.visible = false;
                that.scene.start("mainMenu");
        });

        this.returnButton1.on('pointerover', function() {
            that.returnButton1.anims.play('returnSelected');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                that.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.returnButton1.on('pointerout', function() {
            that.returnButton1.anims.play('return');
            that.pointerOver = true;
        });

        this.returnButton1.visible = false;
        //Hasta aqui




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

        
        this.nickname = "Player";
        this.playerReady = false;
        this.player = {
            nickname : that.nickname,
            ready: that.playerReady
        }
       // this.player2Ready = false;

        this.ReadyBox1 = this.add.sprite(this.width/2.64,this.height/4.7,'box').setInteractive();
        this.ReadyBox1.displayWidth = 40;
        this.ReadyBox1.scaleY= this.ReadyBox1.scaleX;
        this.ReadyBox1.setDepth(10000);
        this.ReadyBox1.on('pointerup', function(){
            if(that.playerId === 1){
                // player 1 ready
                if(that.player.ready === false){
                    that.player.ready = true;
                    that.ReadyBox1.anims.play('ReadyBox');
                    that.updatePlayerReady(1, that.player.ready);
                }else if(that.player.ready === true){
                    that.player.ready = false;
                    that.ReadyBox1.anims.play('NotReadyBox');
                    that.updatePlayerReady(1, that.player.ready);
                }
            }
        });
        this.ReadyBox1.visible = false;

        this.ReadyBox2 = this.add.sprite(this.width/2.64,this.height/3.62,'box').setInteractive();
        this.ReadyBox2.displayWidth = 40;
        this.ReadyBox2.scaleY= this.ReadyBox2.scaleX;
        this.ReadyBox2.setDepth(10000);
        this.ReadyBox2.on('pointerup', function(){
            if(that.playerId === 2){
                // player 2 ready
                if(that.player.ready === false){
                    that.player.ready = true;
                    that.ReadyBox2.anims.play('ReadyBox');
                    that.updatePlayerReady(2, that.player.ready);
                }else if(that.player.ready === true){
                    that.player.ready = false;
                    that.ReadyBox2.anims.play('NotReadyBox');
                    that.updatePlayerReady(2, that.player.ready);
                }
            }
        });
        this.ReadyBox2.visible = false;


        this.anims.create({
            key: 'NotReadyBox',
            frames: [ { key: 'box'} ],
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: 'ReadyBox',
            frames: [ { key: 'box_tick'} ],
            frameRate: 10,
            repeat: -1
          });

          


        this.ReadyButton = this.add.sprite(this.width/1.25,this.height/2.5,'ReadyUnselected').setInteractive();
        this.ReadyButton.displayWidth = 230;
        this.ReadyButton.scaleY= this.ReadyButton.scaleX;
        this.ReadyButton.setDepth(10000);
        this.ReadyButton.on('pointerup', function(){
            if(that.playerId === 1){
                // player 1 ready
                if(that.player.ready === false){
                    that.player.ready = true;
                    that.ReadyBox1.anims.play('ReadyBox');
                    that.updatePlayerReady(1, that.player.ready);
                }else if(that.player.ready === true){
                    that.player.ready = false;
                    that.ReadyBox1.anims.play('NotReadyBox');
                    that.updatePlayerReady(1, that.player.ready);
                }
            }else if(that.playerId === 2){
                // player 2 ready
                if(that.player.ready === false){
                    that.player.ready = true;
                    that.ReadyBox2.anims.play('ReadyBox');
                    that.updatePlayerReady(2, that.player.ready);
                }else if(that.player.ready === true){
                    that.player.ready = false;
                    that.ReadyBox2.anims.play('NotReadyBox');
                    that.updatePlayerReady(2, that.player.ready);
                }
            }
        });

        this.anims.create({
            key: 'ReadyButtonSelected',
            frames: [ { key: 'ReadySelected'} ],
            frameRate: 10,
            repeat: -1
          });

        this.anims.create({
            key: 'ReadyButtonUnselected',
            frames: [ { key: 'ReadyUnselected'} ],
            frameRate: 10,
            repeat: -1
        });

        this.updateGameStarted = function(gameS) {
        
            $.ajax({
                method: "PUT",
                url: that.url + '/server/updateGameStarted',
                data: JSON.stringify(gameS),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (newText) {
                    //console.log("new text chat: " + newText);
                    //that.victoriesText2.setText("Purple victories: " + purpleVictories); 
            })
        }


        // Boton Play
        this.PlayButton = this.add.sprite(this.width/1.25, this.height/4,'play').setInteractive();
        this.PlayButton.displayWidth = 270;
        this.PlayButton.scaleY= this.PlayButton.scaleX;
        this.PlayButton.setDepth(10000);
        this.PlayButton.on('pointerup', function(){
            that.updateGameStarted(true);
        });

        this.anims.create({
            key: 'PlayButtonSelected',
            frames: [ { key: 'play_confirmed'} ],
            frameRate: 10,
            repeat: -1
          });

        this.anims.create({
            key: 'PlayButtonUnselected',
            frames: [ { key: 'play'} ],
            frameRate: 10,
            repeat: -1
        });

        this.getScore = function(scoreID){
            $.ajax({
                url: that.url + '/server/player' + scoreID + 'Stats/Jumps'
            }).done(function (items) {
                if(scoreID==1){
                    that.score1 = items;
                }else if(scoreID == 2){
                    that.score2 = items;
                }      
            })

        }

        this.getGameStarted = function(){
            $.ajax({
                url: that.url + '/server/gameStarted'
            }).done(function (items) {
                if(items==false){
                    that.gameStarted = false;
                    
                }else if(items == true){
                    that.gameStarted = true;
                    that.startedGameText.visible = true;
                    that.startedGameScroll.visible = true;
                    that.startedGameScroll2.visible = true;
                }      
            })

        }

        this.getGameReady = function(){
            $.ajax({
                url: that.url + '/server/gameReady'
            }).done(function (gameStatus) {
                if(gameStatus == false){
                    that.PlayButton.setAlpha(0.1);
                    that.gameReady = false;
                    
                    //that.score1 = items;
                }else if(gameStatus == true){
                    that.PlayButton.setAlpha(1);
                    that.gameReady = true;
                    
                    //that.score2 = items;
                }      
            })

        }

        this.deletePlayer=function(itemId) {
                
                $.ajax({
                    method: 'DELETE',
                    url: that.url + '/server/players/deletePlayer' + itemId
                }).done(function (item) {
                    
                })
                //callback(item); 
                //console.log("Deleted item " + itemId)    
        }

        this.createPlayer = function(player) {
            //that.updateTimers(that.playerId, 5);

            $.ajax({
                method: "POST",
                url: that.url + '/server/players/createPlayer',
                data: JSON.stringify(player),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (player) {
                console.log("Player created: " + JSON.stringify(player));
                that.playerId = player.id;
                //callback(item);
            })
        } 
        
        this.updateTimer1 = function(newtimer) {  
            $.ajax({
                method: "PUT",
                url: that.url + '/server/updateTimer1',
                data: JSON.stringify(newtimer),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (newtimer) {
                    //console.log("Timers actualizados.")
            })
        } 

        this.updateTimer2 = function(newtimer) {  
            $.ajax({
                method: "PUT",
                url: that.url + '/server/updateTimer2',
                data: JSON.stringify(newtimer),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (newtimer) {
                    //console.log("Timers actualizados.")
            })
        } 

        // this.updateOchreVictories = function(ochreVictories) {  
        //     $.ajax({
        //         method: "PUT",
        //         url: that.url + '/server/updateOchreVictories',
        //         data: JSON.stringify(ochreVictories),
        //         processData: false,
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //         }).done(function (ochreVictories) {
        //             //console.log("Victorias ochre actualizadas: " + ochreVictories);
        //             that.victoriesText1.setText("Ochre victories: " + ochreVictories);                    
        //     })
        // } 
        // this.updatePurpleVictories = function(purpleVictories) {
        
        //     $.ajax({
        //         method: "PUT",
        //         url: that.url + '/server/updatePurpleVictories',
        //         data: JSON.stringify(purpleVictories),
        //         processData: false,
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //         }).done(function (purpleVictories) {
        //             //console.log("Victorias purpuras actualizadas: " + purpleVictories);
        //             that.victoriesText2.setText("Purple victories: " + purpleVictories); 
        //     })
        // }

        this.updatePlayerReady = function(id ,isReady) {  
            $.ajax({
                method: "PUT",
                url: that.url + '/server/player' + id + 'Ready',
                data: JSON.stringify(isReady),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function () {
                    //console.log("PlayerReady actualizado: " + isReady);
            })
        } 

        this.updateLogs = function(id ,logs1) {  
            $.ajax({
                method: "PUT",
                url: that.url + '/server/logs' +id,
                data: JSON.stringify(logs1),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (logs1) {
                    //console.log("Troncos actualizados: " + logs1);
            })
        } 

        

        this.scene.get("onlineLobby").time.addEvent({delay: 1000, callback: function(){
            if(that.playerId == 1)
                that.updateTimer1(30);
            else if(that.playerId == 2)
                that.updateTimer2(30);
            //console.log("Se actualizan los timers");
        }, loop:true});
        //this.updateLogs(1,120);

        this.loadPlayer = function(id) {
            if(id ==1){
                that.emptyPlayer1=true;
            }else if(id==2){
                that.emptyPlayer2=true;
            }

            $.ajax({
                url: that.url + '/server/players/getPlayer' + id
            }).done(function (player) {
                if(player !=null && id==1){
                    that.player1Text.setText("1. " + player.nickname);
                    //console.log("Player1 nickname:" + player.nickname);
                    that.ReadyBox1.visible = true;
                    that.emptyPlayer1=false;
                }else if(player !=null && id==2){
                    that.player2Text.setText("2. " + player.nickname);
                    that.ReadyBox2.visible = true;
                    //onsole.log("Player2 nickname:" + player.nickname);   
                    that.emptyPlayer2=false;                
                }               
            })
            
        }

        this.checkPlayerReady = function(id) {

            $.ajax({
                url: that.url + '/server/player' + id + 'Ready'
            }).done(function (ready) {
                if(that.player != null && id==1){
                    if(that.playerId == id)
                        that.playerReady = ready;
                    that.updatePlayerReady(1, ready);
                    if(ready === false){
                        that.ReadyBox1.anims.play('NotReadyBox');
                    }else{
                        that.ReadyBox1.anims.play('ReadyBox');
                    }
                }else if(that.player != null && id==2){
                    if(that.playerId == id){
                        that.playerReady = ready;
                    }
                        
                    that.updatePlayerReady(2, ready);     
                    if(ready === false){
                        that.ReadyBox2.anims.play('NotReadyBox');
                    }else{
                        that.ReadyBox2.anims.play('ReadyBox');
                    }        
                }/*else{
                    if(that.player.ready === false){
                        that.ReadyBox2.anims.play('ReadyBox');
                    }else if(that.player.ready === true){
                        that.ReadyBox2.anims.play('NotReadyBox');
                    }
                } */              
            })
            
        }
        
        this.checkPlayers = function(){
            this.scene.get("onlineLobby").time.addEvent({delay: 800, callback: function(){
                    that.loadPlayer(1);
                    that.loadPlayer(2);
                    that.checkPlayerReady(1);
                    that.checkPlayerReady(2);
                    that.checkPlayers();
                    that.getGameReady();
                    that.getGameStarted();

                    that.scene.get("onlineLobby").time.addEvent({delay: 500, callback: function(){
                    if(that.emptyPlayer1){
                        that.player1Text.setText("1. ");
                        that.score1Text.setText("");
                        that.ReadyBox1.visible = false;
                        that.updatePlayerReady(1, false);
                        //console.log("Deberia borrarse el 1");
                    }else if(that.emptyPlayer2){
                        that.player2Text.setText("2. ");
                        that.score2Text.setText("");
                        that.ReadyBox2.visible = false;
                        that.updatePlayerReady(2, false);
                        //console.log("Deberia borrarse el 2");
                    }
                }});
                }
            });
            
        }
       this.checkPlayers();

        this.updateScore  = function(){
            this.getScore(1);
            this.getScore(2);
            that.scene.get("onlineLobby").time.addEvent({delay: 500, callback: function(){
                that.updateScore();
            }});
        }
        

        this.updateText = function(){
            if (!that.emptyPlayer1) 
            {
                that.score1Text.setText(" | Jumps: " + that.score1);
            }
            if (!that.emptyPlayer2) 
            {
                that.score2Text.setText(" | Jumps: " + that.score2);
                console.log("Puntos player 2" + that.score2);
            }
            that.scene.get("onlineLobby").time.addEvent({delay: 500, callback: function(){
                that.updateText();
            }})
        }
        this.updateText();
        this.updateScore();



        this.comprobarEstado = function(){
            that.scene.get("onlineLobby").time.addEvent({delay: 1000, callback: function(){              
        
                if(!that.activado){
                    that.returnButton1.visible  = true;
                    that.serverOffText.visible  = true;
                    //that.inactivityText.visible = false;
                    that.endScroll.visible     =  true;
                    that.endScroll2.visible    = true;
                    that.blackBackground.visible = true;
                    that.deletePlayer(that.playerId);
                }else{
                    that.scene.get("onlineLobby").time.addEvent({delay: 4000, callback: function(){
                        that.getActiveServerLobby();
            
                        that.comprobarEstado();
                        
                        //console.log("GG WP servidor en funcionamiento.");
                       
                    }, callbackScope:that, loop:false});
                }       
                
            }, callbackScope:that, loop:false});
        }

        //Servidor activo??
        this.getActiveServerLobby= function() { 
            that.activado=false;     
            $.ajax({
                url: that.url + '/server/activeServer'
            }).done(function (items) {
                console.log("Servidor activo: " + items);
                that.activado = items;
            })
        } 
        

        //Servidor activo??
        this.getActiveServerLobby= function() { 
            that.activado=false;     
            $.ajax({
                url: that.url + '/server/activeServer'
            }).done(function (items) {
                console.log("Servidor activo: " + items);
                that.activado = items;
            })
        } 

        //Cada 5 segundos se comprueba el estado del servidor. Si en algún momento este se desactiva, volvemos al menu inicial.
        this.scene.get("onlineLobby").time.addEvent({delay: 4000, callback: function(){
            that.getActiveServerLobby();

            that.comprobarEstado();
            
            //console.log("Servidor en funcionamiento.");
           
        }, callbackScope:this, loop:false});
        

        //#region inicializamos en fondo del menú, y lo animamos
        this.background = this.add.sprite(this.width/2,this.height/2,'backgroundSheet',0);

        // Animacion de la cascada
        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('backgroundSheet', { start: 0, end: 2}),
            frameRate: 8,
            repeat: -1
          });
        this.background.anims.play('backgroundAnimation');
        ////#endregion

        // Fade In del inicio
        this.cameras.main.fadeIn(500);
        
        this.InitControlsBackground();

        this.InitControls();

        // -------------------------
        // INPUT NAME
        // -------------------------

        this.blackBackground = this.add.sprite(0,0,'black-background').setInteractive();
        this.blackBackground.displayWidth = 20000;
        this.blackBackground.scaleY       = this.blackBackground.scaleX;
        this.blackBackground.setDepth(12000);
        this.blackBackground.visible = true;
        

        this.blackBackground2 = this.add.sprite(0,0,'black-background').setInteractive();
        this.blackBackground2.displayWidth = 3000;
        this.blackBackground2.scaleY       = this.blackBackground.scaleX;
        this.blackBackground2.setDepth(1000);
        this.blackBackground2.visible = true;

        var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px '});

        var input = this.add.dom(400,300).createFromCache('texto');

        input.addListener('click');

        

        input.on('click', function (event) {
            
        if (event.target.name === 'play')
        {
            var inputText = this.getChildByName('name');

            //  Have they entered anything?
            if (inputText.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');

                //  Hide the login element
                this.setVisible(false);

                that.chatEnabled = true;
                that.blackBackground.visible = false;
                that.player.nickname = inputText.value;
                that.createPlayer(that.player);

                //  Populate the text with whatever they typed in
                text.setText('Welcome ' + inputText.value);
                //console.log('Welcome ' + inputText.value);
            }
            
        }

        });

        // CHAT
        this.updateChat = function(newText) {
        
            $.ajax({
                method: "PUT",
                url: that.url + '/server/updateChat',
                data: JSON.stringify(newText),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
                }).done(function (newText) {
                    //console.log("new text chat: " + newText);
                    //that.victoriesText2.setText("Purple victories: " + purpleVictories); 
            })
        }

        this.getLine = function(line){
            $.ajax({
                url: that.url + '/server/getLine'+line
            }).done(function (item) {
                if(line==1){
                    that.line1 = item;
                }else if(line==2){
                    that.line2 = item;
                }else if(line == 3){
                    that.line3 = item;
                }   
            })

        }

        

        this.scene.get("onlineLobby").time.addEvent({delay: 500, callback: function(){
            that.getLine(1);
            that.getLine(2);
            that.getLine(3);
        }, loop:true});

        this.scene.get("onlineLobby").time.addEvent({delay: 500, callback: function(){
                that.text1.setText(that.line1);
                that.text2.setText(that.line2);
                that.text3.setText(that.line3);
        }, loop:true});


        this.addOchreScore = function (score2){
            that.score2++;
        }

        this.addPurpleScore = function (score1){
            that.score1++;
        }

        
        this.addOchrePointsButton = this.add.sprite(this.width/5.9, this.height/2.40,'ochre-addpoints-btn').setInteractive();
        this.addOchrePointsButton.displayWidth = 35;
        this.addOchrePointsButton.scaleY= this.addOchrePointsButton.scaleX;
        this.addOchrePointsButton.setDepth(6000);
        this.addOchrePointsButton.on('pointerup', function(){
            that.addOchreScore(that.score2);
            that.updateLogs(2, that.score2);
            //console.log(that.score2);
        });

        this.addPurplePointsButton = this.add.sprite(this.width/5.9, this.height/2.81,'purple-addpoints-btn').setInteractive();
        this.addPurplePointsButton.displayWidth = 35;
        this.addPurplePointsButton.scaleY= this.addPurplePointsButton.scaleX;
        this.addPurplePointsButton.setDepth(6000);
        this.addPurplePointsButton.on('pointerup', function(){
            that.addPurpleScore(that.score1);
            that.updateLogs(1, that.score1);
            //console.log(that.score1);
        });

        


        this.ReadyButton.on('pointerover', function() {
            that.ReadyButton.anims.play('ReadyButtonSelected');
            do{   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
              //  that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerOver);
        });

        this.ReadyButton.on('pointerout', function() {
            // this.displayWidth=230;
            // this.scaleY = this.scaleX;
            that.ReadyButton.anims.play('ReadyButtonUnselected');
            this.pointerOver = true;
        });



        


        this.PlayButton.on('pointerover', function() {
            if(that.gameReady){
                that.PlayButton.anims.play('PlayButtonSelected');
                
            }
                
            do{   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
              //  that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerOver);
        });

        this.PlayButton.on('pointerout', function() {
            that.PlayButton.anims.play('PlayButtonUnselected');
            this.pointerOver = true;
        });

    }

    /**
     * Inicializa los pergaminos
     */
    InitControlsBackground(){

        this.controls_background2= this.add.sprite(this.width/1.9, this.height/3.2,'scroll-background').setInteractive();
        this.controls_background2.displayWidth = 730;
        this.controls_background2.setDepth(5000)
        this.controls_background2.scaleY= this.controls_background2.scaleX;

        this.btn_bck2 = this.add.sprite(this.width/20, this.height/3.2,'buttons-background-2').setInteractive();
        this.btn_bck2.displayWidth = 80;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 65;
        this.btn_bck2.setDepth(5000);

        this.returnButtonBackground = this.add.sprite(this.width/2, this.height/1.06,'return-background').setInteractive();
        this.returnButtonBackground.displayWidth = 805;
        this.returnButtonBackground.setDepth(5000);

        var that= this;
        this.sound1 = this.sound.add('MenuSound1');
        this.sound2 = this.sound.add('MenuSound2');
        
        this.returnButton = this.add.sprite(this.width/2,this.height/1.06,'Return').setInteractive();
        this.returnButton.displayWidth = 230;
        this.returnButton.scaleY= this.returnButton.scaleX;
        this.returnButton.setDepth(13000);
        this.returnButton.on('pointerup', function(){
                that.sound2.play();
                that.cameras.main.fadeOut(200);
                that.scene.get("onlineLobby").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
                that.deletePlayer(that.playerId);
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
    }

    /**
     * Inicializa las imagenes de los pergaminos
     */
    InitControls(){

    }

    update(){
        
        if(this.chatEnabled){
            var that = this;

            var input2 = this.add.dom(400,this.height/1.2).createFromCache('chat');

            input2.addListener('click');

            

            input2.on('click', function (event) {
                
            if (event.target.name === 'post')
            {
                
                var inputText2 = this.getChildByName('chat');

                if (inputText2.value !== '')
                {

                    that.blackBackground.visible = false;

                    that.updateChat(that.player.nickname +": " +inputText2.value);

                    this.getChildByName('chat').value = "";
                    //console.log(inputText2.value);
                    inputText2.value = "";
                }
                
            }

            });
            this.chatEnabled = false;
        }
        
        
    }
}