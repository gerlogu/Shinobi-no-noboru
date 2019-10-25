class example2 extends Phaser.Scene{
    constructor(){
        super({key:"example2"});
      }

    preload(){  
        // #region se cargar los sonidos para el menu
        this.load.audio('MenuSound1','assets/Menu sounds/MenuSound1.mp3');
        this.load.audio('MenuSound2','assets/Menu sounds/MenuSound2.mp3');
        this.pointerOver = false; // Booleano que se activa y desactiva al pasar por encima de los botones, con el objetivo de que los sonidos se reproduzcan una sola vez , y no se bugee
        // //#endregion

        this.load.image('Local-game', 'assets/main-menu/local-game-btn.jpg');
        this.load.image('Online-game', 'assets/main-menu/online-game-btn.jpg');
        this.load.image('Controls', 'assets/main-menu/controls-btn.jpg');
        this.load.image('T1','assets/main-menu/tit-1.png');
        this.load.image('T2','assets/main-menu/tit-2.png');
        //  for (var i = 0; i < 200; i++) {
        //      this.load.image('File nº'+i, 'assets/main-menu/local-game-btn.jpg');
        // }

        // #region Loading Bar Mal
        // //if(!this.load.on('complete'))

        // var loaded = false;

        

        // this.load.on('complete', function () {
        //     console.log('complete');
        //     loaded = true;
        // });

        // if(loaded === false){
        //     var progressBar = this.add.graphics();
        //     var progressBox = this.add.graphics();
        //     progressBox.fillStyle(0x222222, 0.8).setDepth(6000);
        //     progressBox.fillRect(240, 270, 320, 50).setDepth(5000);
            
        //     this.load.on('progress', function (value) {
        //         console.log(value);
        //         progressBar.clear();
        //         progressBar.fillStyle(0xffffff, 1);
        //         progressBar.fillRect(250, 280, 300 * value, 30);
        //         });
            
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
        //     this.load.on('progress', function (value) {
        //         console.log(value);
        //         if(value >= 0.99){
        //             progressBar.destroy();
        //             progressBox.destroy();
        //             loadingText.destroy();
        //             percentText.destroy();
        //         }
    
                
        //     });
        //     percentText.setOrigin(0.5, 0.5);
        // }
        

        
                    
        // this.load.on('fileprogress', function (file) {
        //     console.log(file.src);
        // });        

        // // Destructor
        
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

    create(){
        //Variable auxiliar que guarda la escena actual en ella. Es importante porque en los eventos, si ponemos this, no devuelve la escena,
        //sino el objeto que ha llamado al evento (eso objeto puede ser un botón, por ejemplo)
        var that = this;
        this.cameras.main.fadeIn(1000);
        //Se crean los objetos para los sonidos
        this.sound1 = this.sound.add('MenuSound1');
        this.sound2 = this.sound.add('MenuSound2');
        

        this.width  = 800;
        this.height = 600;

        this.posBtnX = this.width/2.8;
        
        this.t1 = this.physics.add.sprite(-85, this.height/5,'T1').setGravityY(-1000).setGravityX(6000).setInteractive();
        this.t1.setInteractive();
        this.t1.displayWidth = 600;
        this.t1.scaleY= this.t1.scaleX;

        this.t2 = this.physics.add.sprite(this.width, this.height/2.92,'T2').setGravityY(-1000).setGravityX(-3000).setInteractive();
        this.t2.setInteractive();
        this.t2.displayWidth = 350;
        this.t2.scaleY= this.t2.scaleX;

        this.Empezar = this.physics.add.sprite(-85, this.height/2,'Local-game').setGravityY(-1000).setGravityX(5000).setInteractive();
        this.Empezar.setInteractive();
        this.Empezar.displayWidth = 400;
        this.Empezar.scaleY= this.Empezar.scaleX;
        this.Empezar.on('pointerup', function(){
            that.sound2.play();
            that.scene.start('localgame');
        });

        this.OnlineGameButton = this.physics.add.sprite(this.width, this.height/1.70,'Online-game').setGravityY(-1000).setGravityX(-6380).setInteractive();
        this.OnlineGameButton.setInteractive();
        this.OnlineGameButton.displayWidth = 400;
        this.OnlineGameButton.scaleY= this.Empezar.scaleX;
        this.OnlineGameButton.on('pointerup', function(){
            that.sound2.play();
            that.scene.start('localgame');
        });

        this.ControlsButton = this.physics.add.sprite(-85,this.height/1.481,'Controls').setGravityY(-1000).setGravityX(5000).setInteractive();
        this.ControlsButton.setInteractive();
        this.ControlsButton.displayWidth = 400;
        this.ControlsButton.scaleY= this.Empezar.scaleX;
        this.ControlsButton.on('pointerup', function(){
            that.sound2.play();
            that.scene.start('example3');
        });
        
        

        this.Empezar.on('pointerover', function() {
            this.displayWidth=500; //Con this accedemos al botón Empezar, porque ese botón ha desencadenado el evento.
            this.scaleY=this.scaleX;

            if(this.pointerOver == true){   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }
        });
  
        // When moves away
        this.Empezar.on('pointerout', function() {
            this.displayWidth=400;
            this.scaleY = this.scaleX;
            this.pointerOver = true;           
        });

        this.OnlineGameButton.on('pointerover', function() {
            this.displayWidth=500;  //Con this accedemos al botón OnlineGameButton, porque ese botón ha desencadenado el evento.
            this.scaleY = this.scaleX;

            if(this.pointerOver == true){   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }
        });
  
        // When moves away
        this.OnlineGameButton.on('pointerout', function() {
            this.displayWidth=400;  //Con this accedemos al botón Empezar, porque ese botón ha desencadenado el evento.
            this.scaleY = this.scaleX;

            this.pointerOver = true;  
        });

        this.ControlsButton.on('pointerover', function() {
            this.displayWidth=500;
            this.scaleY = this.scaleX;

            if(this.pointerOver == true){   //Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play();         //el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }
        });
  
        // When moves away
        this.ControlsButton.on('pointerout', function() {
            this.displayWidth=400;
            this.scaleY = this.scaleX;

            this.pointerOver = true;  
        });
        
    }

    update(){
        if(this.Empezar.x>=this.posBtnX){
            this.Empezar.setGravityX(0).setVelocityX(0);
            this.OnlineGameButton.setGravityX(0).setVelocityX(0);
            this.ControlsButton.setGravityX(0).setVelocityX(0);
            this.t1.setGravityX(0).setVelocityX(0);
            this.t2.setGravityX(0).setVelocityX(0);
        }

        
    }
}