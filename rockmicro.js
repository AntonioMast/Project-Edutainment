//The point of this script is to create a scene that lets users play a geology game
class rockmicro extends Phaser.Scene {
    constructor() {
            super({key:"rockmicro"});
    }

    preload() {
        //sets background to very light gray
        this.cameras.main.setBackgroundColor('#E0DBD1')
    }

    //variable declarations & game-object creations
    create(){
        //this function handles what should happen when the game ends
        this.finishGame();

        //sets the background image
        this.menu = this.add.image(0,0,'MENU2').setOrigin(0);
        this.menu.setScale(0.67);
        this.menu.setDepth(2);

        //creates the checkmark and Xmark object off-screen
        this.checkMark = this.add.image(875,340,'CHECKMARK');
        this.checkMark.setDepth(1);
        this.checkMark.setScale(0.6);
        this.xMark = this.add.image(875,340,'XMARK');
        this.xMark.setDepth(1);
        this.xMark.setScale(0.5);

        // sets the rock shown to a random rock from the spritesheet
        var currentAnim = "rockAnim"+(new Date()).toString(); //Creates a new 'animation' for each rock based off of the current time when the game loads
        rockNum = Phaser.Math.Between(0, 26); // randomly generates the rock choosen on game load
        var rock = {
            key: currentAnim,
            frames: this.anims.generateFrameNumbers('ROCKS', { start: rockNum, end: rockNum  }),
            frameRate: 1,
        };
        this.anims.create(rock);
        this.currentrock = this.add.sprite(this.game.renderer.width/2, 250, 'ROCKS').setOrigin(0.5);
        this.currentrock.play(currentAnim);
        this.currentrock.setScale(0.8);
        this.currentrock.setDepth(4);

        //sets the solution to the correct solution -- this gets shown on the score scene if the game is failed 
        lastSolution = this.returnRock(rockNum);

        //variables
        this.guessPlaced = -1;
        this.oldtime = new Date();
        this.correctRock = Phaser.Math.Between(1, 3);
        var rockText1;
        var rockText2;
        var rockText3;
        this.correcty;

        //play music
        this.menumusic7 = this.sound.add("MUSIC7", volumeVariable);
        this.menumusic7.volume = volumeVariable;
        this.menumusic7.play();

        //sets the text for each choice
        switch(this.correctRock) {
            case 1:
                rockText1 = this.returnRock(rockNum);
                this.correcty = 400;
                do {
                    rockText2 = this.returnRock(Phaser.Math.Between(0, 26));
                  } while (rockText2 == rockText1);
                do {
                    rockText3 = this.returnRock(Phaser.Math.Between(0, 26));
                } while (rockText3 == rockText1 || rockText3 == rockText2);
            break;
            case 2:
                rockText2 = this.returnRock(rockNum);
                this.correcty = 450;
                do {
                    rockText1 = this.returnRock(Phaser.Math.Between(0, 26));
                  } while (rockText1 == rockText2);
                do {
                    rockText3 = this.returnRock(Phaser.Math.Between(0, 26));
                } while (rockText3 == rockText1 || rockText3 == rockText2);
            break;
            case 3:
                rockText3 = this.returnRock(rockNum);
                this.correcty = 500;
                do {
                    rockText1 = this.returnRock(Phaser.Math.Between(0, 26));
                  } while (rockText1 == rockText3);
                do {
                    rockText2 = this.returnRock(Phaser.Math.Between(0, 26));
                } while (rockText2 == rockText3 || rockText2 == rockText1);
            break;
            default:
                this.menumusic7.stop();
                this.scene.start("intermission");// this shouldn't ever run, prematuraly ends the microgame if it does
        }
      
        /****************************************************/
        /* The Following Code Is Used for Rendering Objects */
        /****************************************************/

        //creates a rectangle to represent a loading bar
        this.loadingBar = this.add.graphics({
            fillStyle: {
                color: "0xE0DBD1"
            }
        })

        //repositions loading bar
        this.loadingBar.x += this.game.renderer.width * 0.05;
        this.loadingBar.setDepth(3);

        //objective text
        this.objText = this.add.text(30, 30, "Choose the correct rock!", { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' });
        this.objText.setDepth(3);

        //questions text
        this.question1Text = this.add.text(this.game.renderer.width/2, 400, "1) " + rockText1, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question1Text.setDepth(3);
        this.question2Text = this.add.text(this.game.renderer.width/2, 450, "2) " + rockText2, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question2Text.setDepth(3);
        this.question3Text = this.add.text(this.game.renderer.width/2, 500, "3) " + rockText3, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question3Text.setDepth(3);

        //sets logic for game interaction
        this.question1Text.setInteractive().on('pointerdown', () => {
            this.checkWinState(1);
        } );
        this.question2Text.setInteractive().on('pointerdown', () => {
            this.checkWinState(2);
        } );
        this.question3Text.setInteractive().on('pointerdown', () => {
            this.checkWinState(3);
        } );
    
    }

    //this function handles what happens once the user has guessed
    checkWinState(guessNum){

        if (this.guessPlaced == -1) {

            switch(guessNum) {
                case 1:
                    this.guessPlaced = 1;
                    if (this.correctRock == 1){
                        this.checkMark.y = 400; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 400;
                        this.checkMark.y = this.correcty;
                    }
                break;
                case 2:
                    this.guessPlaced = 2;
                    if (this.correctRock == 2){
                        this.checkMark.y = 450; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 450;
                        this.checkMark.y = this.correcty;
                    }
                break;
                case 3:
                    this.guessPlaced = 3;
                    if (this.correctRock == 3){
                        this.checkMark.y = 500; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 500;
                        this.checkMark.y = this.correcty;
                    }
                break;
            }
        }
    }
    
    //this function takes in a number and it return a string for a rock name according to the number given
    returnRock(rockID){
        let rocksArray = ['Igneous - Andesite', 'Igneous - Basalt', 'Igneous - Dacite', 'Igneous - Diabase', 'Igneous - Gabbro', 'Igneous - Granite', 'Igneous - Obsidian', 'Igneous - Pegmatite',
                           'Igneous - Diorite', 'Metamorphic - Mariposite', 'Metamorphic - Anthracite', 'Metamorphic - Gneiss', 'Metamorphic - Lapis Lazuli', 'Metamorphic - Marble', 'Metamorphic - Quartzite', 'Metamorphic - Novaculite',
                           'Metamorphic - Slate', 'Metamorphic - Soapstone', 'Sedimentary - Breccia', 'Sedimentary - Coal', 'Sedimentary - Coquina', 'Sedimentary - Flint', 'Sedimentary - Limestone', 'Sedimentary - Chalk',
                           'Sedimentary - Sandstone', 'Sedimentary - Shale', 'Sedimentary - Siltstone', ];
        return rocksArray[rockID];
    }

    //this function handles what should happen when the game ends
    finishGame(){
        setTimeout(() => { //changes to a intermission/new scene after 7.5 seconds
            this.menumusic7.stop();
            if (this.guessPlaced != this.correctRock)
            {
                this.scene.start("scorescene");
            }
            else
            {
                score += 1;
                rockscore += 1;
                this.scene.start("intermission");
            }
        }, (time * 1000));
    }

    //updates once per frame
    update(delta){

        //gets user keyboard input
        let keyboard = this.input.keyboard;
        if (keyboard.checkDown(keyboard.addKey('ONE')) || keyboard.checkDown(keyboard.addKey('NUMPAD_ONE')) || keyboard.checkDown(keyboard.addKey(35))) {
            this.checkWinState(1);
        }
        if (keyboard.checkDown(keyboard.addKey('TWO')) || keyboard.checkDown(keyboard.addKey('NUMPAD_TWO')) || keyboard.checkDown(keyboard.addKey(40))) {
            this.checkWinState(2);
        }
        if (keyboard.checkDown(keyboard.addKey('THREE')) || keyboard.checkDown(keyboard.addKey('NUMPAD_THREE')) || keyboard.checkDown(keyboard.addKey(34))) {
            this.checkWinState(3);
        }   

        //handles the math for the loading bar
        var nowtime = new Date();
        var deltaTime = (nowtime-this.oldtime)/(time * 1112);
        this.oldtime = nowtime;
        num += deltaTime;
        this.loadingBar.fillRect(0, this.game.renderer.height / 1.3, this.game.renderer.width * num, 20);

        //helps place the checkmark if the user guessed
        if (this.guessPlaced > 0){
            this.checkMark.setDepth(3);
        }
    }
}

//script-global variables
var rockNum;