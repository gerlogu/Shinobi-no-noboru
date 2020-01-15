/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */
"use strict";
class prueba extends Phaser.Scene{
    constructor(){
        super({key:"prueba"});
      }

      preload(){
        this.load.html('texto', 'js/menus/input.html');

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

        this.background.setDepth(-20);
        

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

                //  Populate the text with whatever they typed in
                text.setText('Welcome ' + inputText.value);
                console.log('Welcome ' + inputText.value);
            }
            
        }

    });

        // Fade In del inicio
        this.cameras.main.fadeIn(500);
        
        this.InitControlsBackground();

        this.InitControls();
    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }

    /**
     * Inicializa los pergaminos
     */
    InitControlsBackground(){
        
    }

    /**
     * Inicializa las imagenes de los pergaminos
     */
    InitControls(){
        
    }

    update(){

    }
}