/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */

class creditsMenu extends Phaser.Scene{
    constructor(){
        super({key:"creditsMenu"});
      }

    preload(){
        this.load.image('controls-player1'  , 'assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2'  , 'assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn'        , 'assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background-credits' , 'assets/main-menu/pergamino-vertical.png');   
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

        this.credits_background= this.physics.add.sprite(this.width/2, this.height/2,'scroll-background-credits').setGravityY(-1000).setInteractive();
        this.credits_background.displayWidth = 700;


        this.creditsDevText = this.add.text(this.width/2.85, this.height/16, "CREDITS", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 72 });
        this.creditsDevText.setDepth(11000);

        this.creditsDevText = this.add.text(this.width/3, this.height/3.6, "GAME DEVELOPED BY", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.creditsDevText.setDepth(11000);

        this.creditsText = this.add.text(this.width/2.71, this.height/3, "German Lopez Gutierrez\nJorge Sanchez Sanchez\nIgnacio Atance Loras\nAlberto Romero Abarca", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 20 });
        this.creditsText.setDepth(11000);

        this.otherText = this.add.text(this.width/2.2, this.height/1.75, "OTHER", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.otherText.setDepth(11000);

        this.otherContentText = this.add.text(this.width/2.92, this.height/1.6, "Additional sound effects from\nhttps://www.zapsplat.com", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 18 });
        this.otherContentText.setDepth(11000);

        var that= this;
        this.sound1 = this.sound.add('MenuSound1');
        this.sound1.volume = game.sfxVolume;
        this.sound2 = this.sound.add('MenuSound2');
        this.sound2.volume = game.sfxVolume;
        
        this.sound1.volume = game.sfxVolume;
        this.sound2.volume = game.sfxVolume;

        this.returnButton = this.add.sprite(this.width/2,this.height/1.08,'Return').setInteractive();
        this.returnButton.displayWidth = 230;
        this.returnButton.scaleY= this.returnButton.scaleX;
        this.returnButton.setDepth(13000);
        this.returnButton.on('pointerup', function(){
                that.sound2.play();
                that.cameras.main.fadeOut(200);
                that.scene.get("creditsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
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

    update(){

    }
}