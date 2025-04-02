// A simple balloon popping game using Phaser 3
// This game allows the player to inflate a balloon by clicking a pump button.
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let balloon, pumpButton, isFloating = false;

function preload() {
    this.load.image('balloon', 'assets/balloon.png');
    this.load.image('pump', 'assets/pump.png');
    this.load.image('background', 'assets/background.png');
    this.load.audio('inflate', 'assets/inflate.mp3');
    this.load.audio('pop', 'assets/pop.mp3');
}

function create() {
    this.add.image(600, 325, 'background'); 

    
    balloon = this.physics.add.sprite(918, 430, 'balloon');
    balloon.setScale(0.1);  
    balloon.setInteractive();

    pumpButton = this.add.image(1000, 490, 'pump').setInteractive();
    pumpButton.setScale(0.3); 
    pumpButton.on('pointerdown', inflateBalloon, this);

    balloon.on('pointerdown', burstBalloon, this);

    this.inflateSound = this.sound.add('inflate');
    this.popSound = this.sound.add('pop');
}

function inflateBalloon() {
    if (balloon.scale < 0.4 && !isFloating) {
        balloon.setScale(balloon.scale + 0.1);
        this.inflateSound.play();
    } else {
        isFloating = true;
        balloon.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-200, -50));
    }
}

function burstBalloon() {
    if (isFloating) {
        this.popSound.play();
        balloon.destroy();
        isFloating = false;
        this.time.delayedCall(1000, () => location.reload(), [], this);
    }
}

function update() {
    if (isFloating) {
        balloon.setVelocity(-70, -50);
    }
}