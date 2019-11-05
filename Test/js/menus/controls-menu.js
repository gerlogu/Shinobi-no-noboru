class controlsMenu extends Phaser.Scene{
    constructor(){
        super({key:"controlsMenu"});
      }

    preload(){
        this.load.image('controls-player1','assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2','assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn','assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background','assets/controls-menu/pergamino.png');   
        this.load.image('scroll-background2','assets/controls-menu/pergamino2.png');


        this.load.spritesheet('backgroundSheet'     , 'assets/game-elements/BackgroundSheet.png',{
            frameWidth: 800,
            frameHeight: 600
        }); 

        this.load.image('ochre-controls','assets/controls-menu/ochre-controls.png');  
        this.load.image('purple-controls','assets/controls-menu/purple-controls.png');
    }

    create(){
        this.width  = 800;
        this.height = 600;

        var that = this;

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

        this.returnBtn = this.physics.add.sprite(this.width/2,this.height/1.06,'return-btn').setGravityY(-1000).setInteractive();
        this.returnBtn.displayWidth = 300;
        this.returnBtn.scaleY= this.returnBtn.scaleX;
        this.returnBtn.on('pointerup', function(){
            that.cameras.main.fadeOut(200);
            that.scene.get("controlsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        } );
    }

    /**
     * Inicializa los pergaminos
     */
    InitControlsBackground(){
        this.controls_background= this.physics.add.sprite(this.width/2.1, this.height/4.3,'scroll-background2').setGravityY(-1000).setInteractive();
        this.controls_background.displayWidth = 730;
        this.controls_background.scaleY= this.controls_background.scaleX;

        this.btn_bck1 = this.physics.add.sprite(this.width/1.05, this.height/4.3,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.btn_bck1.displayWidth = 80;
        this.btn_bck1.scaleY= this.btn_bck1.scaleX;
        this.btn_bck1.displayWidth = 65;
        this.btn_bck1.setDepth(2000);

        

        this.controls_background2= this.physics.add.sprite(this.width/1.9, this.height/1.5,'scroll-background').setGravityY(-1000).setInteractive();
        this.controls_background2.displayWidth = 730;
        this.controls_background2.scaleY= this.controls_background2.scaleX;

        this.btn_bck2 = this.physics.add.sprite(this.width/20, this.height/1.5,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.btn_bck2.displayWidth = 80;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 65;
        this.btn_bck2.setDepth(2000);
    }

    /**
     * Inicializa las imagenes de los pergaminos
     */
    InitControls(){
        this.ochre= this.physics.add.sprite(this.width/3.9, this.height/4.3,'ochre-controls').setGravityY(-1000).setInteractive();
        this.ochre.displayWidth = 190;
        this.ochre.scaleY= this.ochre.scaleX;

        this.purple= this.physics.add.sprite(this.width/1.35, this.height/1.5,'purple-controls').setGravityY(-1000).setInteractive();
        this.purple.displayWidth = 190;
        this.purple.scaleY= this.purple.scaleX;
    }

    update(){

    }
}