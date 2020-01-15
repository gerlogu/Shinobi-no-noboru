/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */

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
        this.load.image('tutorial' , 'assets/main-menu/instructions.png');
        this.load.image('return-background' , 'assets/main-menu/return-button-background.png');

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
    }

    /**
     * Inicializa los pergaminos
     */
    InitControlsBackground(){
        this.controls_background= this.add.sprite(this.width/2.1, this.height/4.3,'scroll-background2').setInteractive();
        this.controls_background.displayWidth = 730;
        this.controls_background.scaleY= this.controls_background.scaleX;

        this.btn_bck1 = this.add.sprite(this.width/1.05, this.height/4.3,'buttons-background-2').setInteractive();
        this.btn_bck1.displayWidth = 80;
        this.btn_bck1.scaleY= this.btn_bck1.scaleX;
        this.btn_bck1.displayWidth = 65;
        this.btn_bck1.setDepth(2000);

        this.controls_background2= this.add.sprite(this.width/1.9, this.height/1.5,'scroll-background').setInteractive();
        this.controls_background2.displayWidth = 730;
        this.controls_background2.scaleY= this.controls_background2.scaleX;

        this.btn_bck2 = this.add.sprite(this.width/20, this.height/1.5,'buttons-background-2').setInteractive();
        this.btn_bck2.displayWidth = 80;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 65;
        this.btn_bck2.setDepth(2000);

        this.tutorialText = this.add.text(this.width/2, this.height/1.88, "- Jump from log to log to keep\n  your ninja from falling.\n\n- Press the jump key at the\n  right moment to do it.\n\n- The ninja that stays in the\n  fall the longer wins.", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            color: 'black',
            fontSize: 20 });
        this.tutorialText.setDepth(11000);

        this.returnButtonBackground = this.add.sprite(this.width/2, this.height/1.06,'return-background').setInteractive();
        this.returnButtonBackground.displayWidth = 805;
        this.returnButtonBackground.setDepth(2000);

        var that= this;
        this.sound1 = this.sound.add('MenuSound1');
        this.sound1.volume = game.sfxVolume;
        this.sound2 = this.sound.add('MenuSound2');
        this.sound2.volume = game.sfxVolume;
        
        this.returnButton = this.add.sprite(this.width/2,this.height/1.06,'Return').setInteractive();
        this.returnButton.displayWidth = 230;
        this.returnButton.scaleY= this.returnButton.scaleX;
        this.returnButton.setDepth(13000);
        this.returnButton.on('pointerup', function(){
                that.sound2.play();
                that.cameras.main.fadeOut(200);
                that.scene.get("controlsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
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

        this.tutorial = this.add.sprite(this.width/3, this.height/1.55,'tutorial').setInteractive();
        this.tutorial.setDepth(2000);
    }

    /**
     * Inicializa las imagenes de los pergaminos
     */
    InitControls(){
        this.ochre= this.add.sprite(this.width/3.5, this.height/4.3,'ochre-controls').setInteractive();
        this.ochre.displayWidth = 190;
        this.ochre.scaleY= this.ochre.scaleX;

        this.purple= this.add.sprite(this.width/1.4, this.height/4.25,'purple-controls').setInteractive();
        this.purple.displayWidth = 190;
        this.purple.scaleY= this.purple.scaleX;
    }

    update(){

    }
}