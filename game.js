
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
let balloons = [];
let pumpButton;
let balloonColors = ['balloon_red', 'balloon_blue', 'balloon_green'];
let currentColorIndex = 0;
let score = 0;
let scoreText;

function preload() {
    this.load.image('balloon_red', 'assets/balloon_red.png');
    this.load.image('balloon_blue', 'assets/balloon_blue.png');
    this.load.image('balloon_green', 'assets/balloon_green.png');
    this.load.image('pump', 'assets/pump.png');
    this.load.image('background', 'assets/background.png');
    this.load.audio('inflate', 'assets/inflate.mp3');
    this.load.audio('pop', 'assets/pop.mp3');
}

function create() {
    this.add.image(600, 325, 'background');
    
    scoreText = this.add.text(20, 20, 'Score: 0', {
        fontSize: '32px',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#ff0000' 
    });

    pumpButton = this.add.image(1000, 490, 'pump').setInteractive();
    pumpButton.setScale(0.3);
    pumpButton.on('pointerdown', () => {
        pumpButton.setScale(0.27); 
        inflateBalloon.call(this);
    });
    pumpButton.on('pointerup', () => {
        pumpButton.setScale(0.3); 
    });

    this.inflateSound = this.sound.add('inflate');
    this.popSound = this.sound.add('pop');

    createNewBalloon.call(this);
}

function createNewBalloon() {
    let color = balloonColors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % balloonColors.length;

    let newBalloon = this.physics.add.sprite(918, 430, color);
    newBalloon.setScale(0.1);
    newBalloon.setInteractive();
    newBalloon.isFloating = false; 

    newBalloon.on('pointerdown', function () {
        burstBalloon.call(this, newBalloon);
    }, this);

    balloons.push(newBalloon);
}

function inflateBalloon() {
    let currentBalloon = balloons[balloons.length - 1]; 

    if (currentBalloon.scale < 0.3 && !currentBalloon.isFloating) {
        currentBalloon.setScale(currentBalloon.scale + 0.1);
        this.inflateSound.play();
    } else if (!currentBalloon.isFloating) {
        currentBalloon.isFloating = true;
        currentBalloon.setVelocity(-70, -50);

       
        createNewBalloon.call(this);
    }
}

function burstBalloon(balloon) {
    if (balloon.isFloating) { 
        this.popSound.play();
        score += 10;
        scoreText.setText('Score: ' + score);
        this.tweens.add({
            targets: balloon,
            scale: 0.5,
            duration: 200,
            yoyo: true,
            onComplete: () => balloon.destroy()
        });
        balloons = balloons.filter(b => b !== balloon);
    }
}

function update() {
    balloons.forEach(balloon => {
        if (balloon.isFloating) {
            balloon.setVelocity(-100, -50);
        }
    });
}
