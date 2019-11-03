class creditsMenu extends Phaser.Scene{
    constructor(){
        super({key:"creditsMenu"});
      }

    preload(){
        this.load.image('controls-player1','assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2','assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn','assets/controls-menu/return-btn.jpg');       
        this.load.image('scroll-background','assets/controls-menu/pergamino.png');   
        this.load.image('scroll-background2','assets/controls-menu/pergamino2.png'); 
        this.load.image('credits' , 'assets/credits.png');
    }

    create(){
        this.width  = 800;
        this.height = 600;

        var that = this;

        this.background = this.add.image(400,300,'background');

        this.cameras.main.fadeIn(500);

        this.controls1= this.physics.add.sprite(this.width/2, this.height/2,'scroll-background').setGravityY(-1000).setInteractive();
        this.controls1.displayWidth = 680;
        this.controls1.scaleY= this.controls1.scaleX;
        this.controls1.displayHeight = 500;
        this.controls1.angle += 90;

        this.credits = this.physics.add.sprite(this.width/2,this.height/2,'credits').setGravityY(-1000).setInteractive();
        this.credits.displayWidth = 300;
        this.credits.scaleY= this.credits.scaleX;
        this.credits.setDepth(200);

        this.returnBtn = this.physics.add.sprite(this.width/2,this.height/1.06,'return-btn').setGravityY(-1000).setInteractive();
        this.returnBtn.displayWidth = 300;
        this.returnBtn.scaleY= this.returnBtn.scaleX;
        this.returnBtn.on('pointerup', function(){
            that.cameras.main.fadeOut(200);
            that.scene.get("creditsMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        });
    }

    update(){

    }
}