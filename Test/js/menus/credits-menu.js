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

        this.credits_background= this.physics.add.sprite(this.width/2, this.height/2,'scroll-background').setGravityY(-1000).setInteractive();
        this.credits_background.displayWidth = 680;
        this.credits_background.scaleY= this.credits_background.scaleX;
        this.credits_background.displayHeight = 500;
        this.credits_background.angle += 90;

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