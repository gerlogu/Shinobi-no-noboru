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
        this.load.image('ochre-controls','assets/controls-menu/ochre-controls.png');  
        this.load.image('purple-controls','assets/controls-menu/purple-controls.png');
    }

    create(){
        this.width  = 800;
        this.height = 600;

        var that = this;

        this.background = this.add.image(400,300,'background');

        this.cameras.main.fadeIn(500);

        this.controls2= this.physics.add.sprite(this.width/2.1, this.height/4.3,'scroll-background2').setGravityY(-1000).setInteractive();
        this.controls2.displayWidth = 730;
        this.controls2.scaleY= this.controls2.scaleX;

        this.btn_bck2 = this.physics.add.sprite(this.width/20, this.height/1.5,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.btn_bck2.displayWidth = 80;
        this.btn_bck2.scaleY= this.btn_bck2.scaleX;
        this.btn_bck2.displayWidth = 65;
        this.btn_bck2.setDepth(2000);

        this.ochre= this.physics.add.sprite(this.width/3.9, this.height/4.3,'ochre-controls').setGravityY(-1000).setInteractive();
        this.ochre.displayWidth = 190;
        this.ochre.scaleY= this.ochre.scaleX;

        this.controls1= this.physics.add.sprite(this.width/1.9, this.height/1.5,'scroll-background').setGravityY(-1000).setInteractive();
        this.controls1.displayWidth = 730;
        this.controls1.scaleY= this.controls1.scaleX;

        this.btn_bck1 = this.physics.add.sprite(this.width/1.05, this.height/4.3,'buttons-background-2').setGravityY(-1000).setInteractive();
        this.btn_bck1.displayWidth = 80;
        this.btn_bck1.scaleY= this.btn_bck1.scaleX;
        this.btn_bck1.displayWidth = 65;
        this.btn_bck1.setDepth(2000);

        this.purple= this.physics.add.sprite(this.width/1.35, this.height/1.5,'purple-controls').setGravityY(-1000).setInteractive();
        this.purple.displayWidth = 190;
        this.purple.scaleY= this.purple.scaleX;
        
        this.returnBtn = this.physics.add.sprite(this.width/2,this.height/1.06,'return-btn').setGravityY(-1000).setInteractive();
        this.returnBtn.displayWidth = 300;
        this.returnBtn.scaleY= this.returnBtn.scaleX;
        this.returnBtn.on('pointerup', function(){
            that.cameras.main.fadeOut(200);
            that.scene.get("controlsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        } );
    }

    update(){

    }
}