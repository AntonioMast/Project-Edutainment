//The point of this script is to create a scene that lets users play a geography game
class geomicrofirst extends Phaser.Scene {
    constructor() {
            super({key:"geomicrofirst"});
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
        this.checkMark = this.add.image(775,340,'CHECKMARK');
        this.checkMark.setDepth(1);
        this.checkMark.setScale(0.6);
        this.xMark = this.add.image(775,340,'XMARK');
        this.xMark.setDepth(1);
        this.xMark.setScale(0.5);

        // sets the state shown to a random state from the spritesheet
        var currentAnim = "stateAnim"+(new Date()).toString(); //Creates a new 'animation' for each state based off of the current time when the game loads
        stateNum = Phaser.Math.Between(0, 49); // randomly generates the state on game load
        lastSolution = this.returnState(stateNum);
        var state = {
            key: currentAnim,
            frames: this.anims.generateFrameNumbers('STATES', { start: stateNum, end: stateNum  }),
            frameRate: 1,
        };
        this.anims.create(state);
        this.currentState = this.add.sprite(this.game.renderer.width/2, 250, 'STATES').setOrigin(0.5);
        this.currentState.play(currentAnim);
        this.currentState.setScale(1);
        this.currentState.setDepth(4);

        //variables
        this.guessPlaced = -1;
        this.oldtime = new Date();
        this.correctState = Phaser.Math.Between(1, 4);
        var stateText1;
        var stateText2;
        var stateText3;
        var stateText4;
        this.correcty;

        //play music
        this.menumusic6 = this.sound.add("MUSIC6", volumeVariable);
        this.menumusic6.volume = volumeVariable;
        this.menumusic6.play();

        //sets the text for each choice
        switch(this.correctState) {
            case 1:
                stateText1 = this.returnState(stateNum);
                this.correcty = 350;
                do {
                    stateText2 = this.returnState(Phaser.Math.Between(0, 49));
                  } while (stateText2 == stateText1);
                do {
                    stateText3 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText3 == stateText1 || stateText3 == stateText2);
                do {
                    stateText4 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText4 == stateText1 || stateText4 == stateText2 || stateText4 == stateText3);
            break;
            case 2:
                stateText2 = this.returnState(stateNum);
                this.correcty = 400;
                do {
                    stateText1 = this.returnState(Phaser.Math.Between(0, 49));
                  } while (stateText1 == stateText2);
                do {
                    stateText3 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText3 == stateText1 || stateText3 == stateText2);
                do {
                    stateText4 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText4 == stateText1 || stateText4 == stateText2 || stateText4 == stateText3);
            break;
            case 3:
                stateText3 = this.returnState(stateNum);
                this.correcty = 450;
                do {
                    stateText1 = this.returnState(Phaser.Math.Between(0, 49));
                  } while (stateText1 == stateText3);
                do {
                    stateText2 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText2 == stateText3 || stateText2 == stateText1);
                do {
                    stateText4 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText4 == stateText1 || stateText4 == stateText2 || stateText4 == stateText3);
            break;
            case 4:
                stateText4 = this.returnState(stateNum);
                this.correcty = 500;
                do {
                    stateText1 = this.returnState(Phaser.Math.Between(0, 49));
                  } while (stateText1 == stateText4);
                do {
                    stateText2 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText2 == stateText4 || stateText2 == stateText1);
                do {
                    stateText3 = this.returnState(Phaser.Math.Between(0, 49));
                } while (stateText3 == stateText4 || stateText3 == stateText1 || stateText3 == stateText2);
            break;
            default:
                this.menumusic6.stop();
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
        this.objText = this.add.text(30, 30, "Choose the correct state!", { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' });
        this.objText.setDepth(3);

        //questions text
        this.question1Text = this.add.text(this.game.renderer.width/2, 350, "1) " + stateText1, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question1Text.setDepth(3);
        this.question2Text = this.add.text(this.game.renderer.width/2, 400, "2) " + stateText2, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question2Text.setDepth(3);
        this.question3Text = this.add.text(this.game.renderer.width/2, 450, "3) " + stateText3, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question3Text.setDepth(3);
        this.question4Text = this.add.text(this.game.renderer.width/2, 500, "4) " + stateText4, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
        this.question4Text.setDepth(3);

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
        this.question4Text.setInteractive().on('pointerdown', () => {
            this.checkWinState(4);
        } );
    }

    //this script handles all actions needed once the user selects an options
    checkWinState(guessNum){
        if (this.guessPlaced == -1) {
            switch(guessNum) {
                case 1:
                    this.guessPlaced = 1;
                    if (this.correctState == 1){
                        this.checkMark.y = 350; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 350;
                        this.checkMark.y = this.correcty;
                    }
                break;
                case 2:
                    this.guessPlaced = 2;
                    if (this.correctState == 2){
                        this.checkMark.y = 400; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 400;
                        this.checkMark.y = this.correcty;
                    }
                break;
                case 3:
                    this.guessPlaced = 3;
                    if (this.correctState == 3){
                        this.checkMark.y = 450; 
                    }
                    else {
                        this.xMark.setDepth(3);
                        this.xMark.y = 450;
                        this.checkMark.y = this.correcty;
                    }
                break;
                case 4:
                    this.guessPlaced = 4;
                    if (this.correctState == 4){
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
    
    //this function takes in a number and it return a string for a state according to the number given
    returnState(stateID){
        let statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
                           'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
                           'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                           'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                           'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
                           'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
                                                                'Wisconsin', 'Wyoming' ];
        return statesArray[stateID];
    }

    //this function handles what should happen when the game ends
    finishGame(){
        setTimeout(() => { //changes to a intermission/new scene after 7.5 seconds
            this.menumusic6.stop();
            if (this.guessPlaced != this.correctState)
            {
                this.scene.start("scorescene");
            }
            else
            {
                score += 1;
                geographyscore += 1;
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
        if (keyboard.checkDown(keyboard.addKey('FOUR')) || keyboard.checkDown(keyboard.addKey('NUMPAD_FOUR')) || keyboard.checkDown(keyboard.addKey(37))) {
            this.checkWinState(4);
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
var stateNum;