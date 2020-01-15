/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */



class settingsMenu extends Phaser.Scene{
    
    constructor(){
        super({key:"settingsMenu"});
      }

      preload(){
        this.load.html('slider', 'js/menus/slide-bar.html');
        this.load.html('sfx-slider', 'js/menus/sfx-slider.html');

        this.load.image('controls-player1'  , 'assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2'  , 'assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn'        , 'assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background-credits' , 'assets/main-menu/pergamino-vertical.png');  
        this.load.image('return-background' , 'assets/main-menu/return-button-background.png'); 
        //this.load.image('scroll-background2', 'assets/controls-menu/pergamino2.png'); 
        this.load.image('credits'           , 'assets/credits.png');
        this.load.spritesheet('backgroundSheet'     , 'assets/game-elements/BackgroundSheet.png',{
            frameWidth: 800,
            frameHeight: 600
        }); 
    }

    create(){
        this.width  = 800;
        this.height = 600;

        var that = this;



        this.background = this.add.sprite(this.width/2,this.height/2,'backgroundSheet',0);

        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('backgroundSheet', { start: 0, end: 2}),
            frameRate: 8,
            repeat: -1
          });
        this.background.anims.play('backgroundAnimation');

        this.cameras.main.fadeIn(500);

        this.musicText = this.add.text(this.width/5,this.height/2.39, "Music Volume", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.musicText.setDepth(11000);

        this.sfxText = this.add.text(this.width/5,this.height/1.99, "Sfx Volume", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.sfxText.setDepth(11000);

        var that= this;
        this.sound1 = this.sound.add('MenuSound1');
        this.sound1.volume = game.sfxVolume;
        this.sound2 = this.sound.add('MenuSound2');
        this.sound2.volume = game.sfxVolume;
        
        this.returnButton = this.add.sprite(this.width/2, this.height/1.065, 'Return').setInteractive();
        this.returnButton.displayWidth = 230;
        this.returnButton.scaleY= this.returnButton.scaleX;
        this.returnButton.setDepth(13000);
        this.returnButton.on('pointerup', function(){
                that.sound2.play();
                that.cameras.main.fadeOut(200);
                that.scene.get("settingsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
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

        this.volumeSlider = this.add.dom(this.width/1.5,this.height/2.2).createFromCache('slider').getChildByName('musicVolumeSlider');
        //this.volumeSliderChild = this.volumeSlider.getChildByName('musicVolumeSlider');

        if(game.musicVolume)
            this.volumeSlider.value=game.musicVolume;

        this.sfxSlider = this.add.dom(this.width/1.5,this.height/1.85).createFromCache('sfx-slider').getChildByName('sfxVolumeSlider');

        if(game.sfxVolume)
            this.sfxSlider.value = game.sfxVolume;

        this.InitControlsBackground();
    }
/**
     * Inicializa los pergaminos
     */
    InitControlsBackground(){

        this.controls_background2= this.add.sprite(this.width/1.9, this.height/2,'scroll-background').setInteractive();
        this.controls_background2.displayWidth = 730;
        this.controls_background2.setDepth(5000)
        this.controls_background2.scaleY= this.controls_background2.scaleX;

        this.btn_bck2 = this.add.sprite(this.width/20, this.height/2,'buttons-background-2').setInteractive();
        this.btn_bck2.displayWidth = 80;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 65;
        this.btn_bck2.setDepth(5000);

        this.returnButtonBackground = this.add.sprite(this.width/2, this.height/1.06,'return-background').setInteractive();
        this.returnButtonBackground.displayWidth = 805;
        this.returnButtonBackground.setDepth(5000);

        
    }
    update(){
        if(game.musicVolume !== this.volumeSlider.value){
            game.musicVolume = this.volumeSlider.value;
            //console.log("this.volumeSlider.value: " + this.volumeSlider);
            console.log("Music Volume: " + game.musicVolume);
        }
        if(game.sfxVolume !== this.sfxSlider.value){
            game.sfxVolume = this.sfxSlider.value;
            //console.log("this.volumeSlider.value: " + this.volumeSlider);
            this.sound1.volume = game.sfxVolume;
            this.sound2.volume = game.sfxVolume;
            game.waterfallSound.volume = game.sfxVolume/5;
            console.log("Sfx Volume: " + game.sfxVolume);
        }
    }
}