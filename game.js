// // A simple balloon popping game using Phaser 3
// // This game allows the player to inflate a balloon by clicking a pump button.
// const config = {
//     type: Phaser.AUTO,
//     width: 1200,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 0 },
//             debug: false
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// const game = new Phaser.Game(config);
// let balloon, pumpButton, isFloating = false;

// function preload() {
//     this.load.image('balloon', 'assets/balloon.png');
//     this.load.image('pump', 'assets/pump.png');
//     this.load.image('background', 'assets/background.png');
//     this.load.audio('inflate', 'assets/inflate.mp3');
//     this.load.audio('pop', 'assets/pop.mp3');
// }

// function create() {
//     this.add.image(600, 325, 'background'); 

    
//     balloon = this.physics.add.sprite(918, 430, 'balloon');
//     balloon.setScale(0.1);  
//     balloon.setInteractive();

//     pumpButton = this.add.image(1000, 490, 'pump').setInteractive();
//     pumpButton.setScale(0.3); 
//     pumpButton.on('pointerdown', inflateBalloon, this);

//     balloon.on('pointerdown', burstBalloon, this);

//     this.inflateSound = this.sound.add('inflate');
//     this.popSound = this.sound.add('pop');
// }

// function inflateBalloon() {
//     if (balloon.scale < 0.4 && !isFloating) {
//         balloon.setScale(balloon.scale + 0.1);
//         this.inflateSound.play();
//     } else {
//         isFloating = true;
//         balloon.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-200, -50));
//     }
// }

// function burstBalloon() {
//     if (isFloating) {
//         this.popSound.play();
//         balloon.destroy();
//         isFloating = false;
//         this.time.delayedCall(1000, () => location.reload(), [], this);
//     }
// }

// function update() {
//     if (isFloating) {
//         balloon.setVelocity(-70, -50);
//     }
// }

// A simple balloon popping game using Phaser 3
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

    pumpButton = this.add.image(1000, 490, 'pump').setInteractive();
    pumpButton.setScale(0.3);
    pumpButton.on('pointerdown', inflateBalloon, this);

    this.inflateSound = this.sound.add('inflate');
    this.popSound = this.sound.add('pop');

    createNewBalloon.call(this); // Spawn the first balloon
}

function createNewBalloon() {
    let color = balloonColors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % balloonColors.length;

    let newBalloon = this.physics.add.sprite(918, 430, color);
    newBalloon.setScale(0.1);
    newBalloon.setInteractive();
    newBalloon.isFloating = false; // Track individual floating state

    newBalloon.on('pointerdown', function () {
        burstBalloon.call(this, newBalloon);
    }, this);

    balloons.push(newBalloon);
}

function inflateBalloon() {
    let currentBalloon = balloons[balloons.length - 1]; // Get the latest balloon

    if (currentBalloon.scale < 0.3 && !currentBalloon.isFloating) {
        currentBalloon.setScale(currentBalloon.scale + 0.1);
        this.inflateSound.play();
    } else if (!currentBalloon.isFloating) {
        currentBalloon.isFloating = true;
        currentBalloon.setVelocity(-70, -50);

        // Spawn the next balloon
        createNewBalloon.call(this);
    }
}

function burstBalloon(balloon) {
    if (balloon.isFloating) { // Only allow popping if it's floating
        this.popSound.play();
        balloon.destroy();

        // Remove the balloon from the array
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
