class example3 extends Phaser.Scene{
    constructor(){
        super({key:"example3"});
      }

    preload(){
        this.load.image('controls-player1','assets/controls-menu/controls-player1.png');    
        this.load.image('controls-player2','assets/controls-menu/controls-player2.png');  
        this.load.image('return-btn','assets/controls-menu/return-btn.jpg');       
       
    }

    create(){
        this.width  = 800;
        this.height = 600;

        this.controlsPlayer1 = this.physics.add.sprite(-70,120,'controls-player1').setGravityY(-1000).setGravityX(5000).setInteractive();
        this.controlsPlayer1.displayWidth = 350;
        this.controlsPlayer1.scaleY= this.controlsPlayer1.scaleX;

        this.controlsPlayer2 = this.physics.add.sprite(800,this.height/1.6,'controls-player2').setGravityY(-1000).setGravityX(-5000).setInteractive();
        this.controlsPlayer2.displayWidth = 350;
        this.controlsPlayer2.scaleY= this.controlsPlayer1.scaleX;

        this.returnBtn = this.physics.add.sprite(-70,this.height/1.2,'return-btn').setGravityY(-1000).setGravityX(5000).setInteractive();
        this.returnBtn.displayWidth = 300;
        this.returnBtn.scaleY= this.returnBtn.scaleX;
        this.returnBtn.setInteractive();
        this.returnBtn.on('pointerup', () => this.scene.start('example2'));
    }

    update(){
        if(this.controlsPlayer1.x>=125){
            this.controlsPlayer1.setGravityX(0).setVelocityX(0);
            this.controlsPlayer2.setGravityX(0).setVelocityX(0);
            this.returnBtn.setGravityX(0).setVelocityX(0);
        }

        
    }
}