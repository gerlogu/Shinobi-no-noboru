/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */



class localGameSettings extends Phaser.Scene{
    
    constructor(){
        super({key:"localGameSettings"});
      }

      preload(){
        this.load.image('controls-player1'  , 'assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2'  , 'assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn'        , 'assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background-credits' , 'assets/main-menu/pergamino-vertical.png');  
        this.load.image('return-background' , 'assets/main-menu/return-button-background.png'); 
        this.load.image('plus-btn'        , 'assets/local-game-menu/plus.png');       
        this.load.image('minus-btn'        , 'assets/local-game-menu/minus.png');       
        this.load.image('start' , 'assets/main-menu/boton_start.png');
        this.load.image('start_confirmed' , 'assets/main-menu/boton_start_confirmed_.png');
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

        this.state = 1;

        if(!game.playerLifes){
            game.playerLifes = 5;
        }

        if(!game.logSpeed){
            game.logSpeed = 1;
        }

        this.background = this.add.sprite(this.width/2,this.height/2,'backgroundSheet',0);

        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('backgroundSheet', { start: 0, end: 2}),
            frameRate: 8,
            repeat: -1
          });
        this.background.anims.play('backgroundAnimation');

        this.cameras.main.fadeIn(500);

        this.lifesText = this.add.text(this.width/3.5,this.height/2.575, "Ninjas HP", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.lifesText.setDepth(11000);

        this.lifesValueText = this.add.text(this.width/1.578,this.height/2.62, "5", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.lifesValueText.setDepth(11000);

        this.speedText = this.add.text(this.width/3.5,this.height/2.15, "Logs Speed", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 32 });
        this.speedText.setDepth(11000);

        this.speedValueText = this.add.text(this.width/1.6,this.height/2.16, "x1", {
            fontFamily: '"Roboto Condensed"',
            fontFamily: '"kouzan_font"',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align:'center',
            color: 'black',
            fontSize: 28 });
        this.speedValueText.setDepth(11000);

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
                that.scene.get("localGameSettings").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        });

        this.playButton = this.add.sprite(this.width/2, this.height/1.725, 'start').setInteractive();
        this.playButton.displayWidth = 250;
        this.playButton.scaleY= this.playButton.scaleX;
        this.playButton.setDepth(13000);
        this.playButton.on('pointerup', function(){
                that.sound2.play();
                that.cameras.main.fadeOut(200);
                game.waterfallSound.volume = 0;
                that.scene.get("localGameSettings").time.addEvent({delay: 210, callback: function(){that.scene.start('localgame');}, callbackScope:this, loop:false});
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

        this.anims.create({
            key: 'start',
            frames: [ { key: 'start'} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'start_confirmed',
            frames: [ { key: 'start_confirmed'} ],
            frameRate: 10,
            repeat: -1
        });

        this.playButton.on('pointerover', function() {
            that.playButton.anims.play('start_confirmed');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
                that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.playButton.on('pointerout', function() {
            that.playButton.anims.play('start');
            this.pointerOver = true;
        });


        // Plus

        this.plusButton = this.add.sprite(this.width/1.405, this.height/2.45, 'plus-btn').setInteractive();
        this.plusButton.displayWidth = 25;
        this.plusButton.scaleY= this.plusButton.scaleX;
        this.plusButton.setDepth(13000);
        this.plusButton.on('pointerup', function(){
            if(game.playerLifes < 9)
                game.playerLifes++;
        });

        this.anims.create({
            key: 'plus',
            frames: [ { key: 'Plus'} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'plusSelected',
            frames: [ { key: 'PlusSelected'} ],
            frameRate: 10,
            repeat: -1
        });
        
        this.plusButton.on('pointerover', function() {
            that.plusButton.anims.play('PlusSelected');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
               // that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.plusButton.on('pointerout', function() {
            that.plusButton.anims.play('Plus');
            this.pointerOver = true;
        });



        // Minus

        this.minusButton = this.add.sprite(this.width/1.75, this.height/2.45, 'minus-btn').setInteractive();
        this.minusButton.displayWidth = 25;
        this.minusButton.scaleY= this.minusButton.scaleX;
        this.minusButton.setDepth(13000);
        this.minusButton.on('pointerup', function(){
            if(game.playerLifes > 1)
                game.playerLifes--;
        });

        this.anims.create({
            key: 'plus',
            frames: [ { key: 'Minus'} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'plusSelected',
            frames: [ { key: 'MinusSelected'} ],
            frameRate: 10,
            repeat: -1
        });
        
        this.minusButton.on('pointerover', function() {
            that.minusButton.anims.play('MinusSelected');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
               // that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.minusButton.on('pointerout', function() {
            that.minusButton.anims.play('Minus');
            this.pointerOver = true;
        });


        // ------------
        // LOG SPEED
        // ------------

        // Plus

        this.logPlusButton = this.add.sprite(this.width/1.405, this.height/2.05, 'plus-btn').setInteractive();
        this.logPlusButton.displayWidth = 25;
        this.logPlusButton.scaleY= this.logPlusButton.scaleX;
        this.logPlusButton.setDepth(13000);
        this.logPlusButton.on('pointerup', function(){
            if(that.state < 5){
                game.logSpeed = game.logSpeed + 0.075;
                that.state++;
            }
                
        });

        this.anims.create({
            key: 'plus',
            frames: [ { key: 'Plus'} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'plusSelected',
            frames: [ { key: 'PlusSelected'} ],
            frameRate: 10,
            repeat: -1
        });
        
        this.logPlusButton.on('pointerover', function() {
            that.logPlusButton.anims.play('PlusSelected');
            do{                     // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
               // that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.logPlusButton.on('pointerout', function() {
            that.logPlusButton.anims.play('Plus');
            this.pointerOver = true;
        });



        // Minus

        this.logMinusButton = this.add.sprite(this.width/1.75, this.height/2.05, 'minus-btn').setInteractive();
        this.logMinusButton.displayWidth = 25;
        this.logMinusButton.scaleY= this.logMinusButton.scaleX;
        this.logMinusButton.setDepth(13000);
        this.logMinusButton.on('pointerup', function(){
            if(that.state > 1){
                game.logSpeed = game.logSpeed - 0.075;
                that.state--;
            }
                
        });

        this.anims.create({
            key: 'plus',
            frames: [ { key: 'Minus'} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'plusSelected',
            frames: [ { key: 'MinusSelected'} ],
            frameRate: 10,
            repeat: -1
        });
        
        this.logMinusButton.on('pointerover', function() {
            that.logMinusButton.anims.play('MinusSelected');
            do{                       // Reproducimos el sonido unicamente si no se ha reproducido antes, es decir, si acabamos de entrar con el raton al botón. Si ya llevamos un rato
               // that.sound1.play(); // el sonido no se reproducirá gracias al booleano. El booleano vuelve a true, al sacar el ratón del botón.
                this.pointerOver = false;
            }while(this.pointerover);
        });

        // Cuando apartas el raton
        this.logMinusButton.on('pointerout', function() {
            that.logMinusButton.anims.play('Minus');
            this.pointerOver = true;
        });




        
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
        //this.controls_background2.displayHeight = 200;

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
        this.lifesValueText.setText(game.playerLifes);
        this.speedValueText.setText("+" + this.state.toString());
        if(game.logSpeed === 1.25){
            //this.speedValueText;
        }
    }
}