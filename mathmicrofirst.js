//The point of this script is to create a scene that lets users play an algebra game
class mathmicrofirst extends Phaser.Scene {
    constructor() {
            super({key:"mathmicrofirst"});
    }

    preload() {
        //sets background to very light gray
        this.cameras.main.setBackgroundColor('#E0DBD1')
    }

    //variable declarations & game-object creations
    create(){
        //this function handles what should happen when the game ends
        this.finishGame();

        //creates the checkmark object off-screen
        this.checkMark = this.add.image(850,340,'CHECKMARK');
        this.checkMark.setDepth(1);

        //variables
        input = "";
        this.menu = this.add.image(0,0,'MENU2').setOrigin(0);
        this.menu.setScale(0.67);
        this.menu.setDepth(2);
        this.randomOperator = Phaser.Math.Between(0, 1);
        this.haveWon = false;
        this.oldtime = new Date();
        this.firstNum;
        this.secondNum;
        this.solution;

        //makes the solution which is the user's input is checked against
        if (this.randomOperator == 0) {
            this.firstNum = Phaser.Math.Between(0, 39);
            this.secondNum = Phaser.Math.Between(0, 39);
            this.solution = (this.firstNum + this.secondNum).toString();
        }
        else if (this.randomOperator == 1) {
            this.firstNum = Phaser.Math.Between(3, 32);
            this.secondNum = Phaser.Math.Between(0, this.firstNum);
            this.solution = (this.firstNum - this.secondNum).toString();
        }

        //plays music
        this.menumusic3 = this.sound.add("MUSIC3", volumeVariable);
        this.menumusic3.volume = volumeVariable;
        this.menumusic3.play();
      
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
        this.objText = this.add.text(30, 30, "Type the solution!", { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' });
        this.objText.setDepth(3);

        //question text
        this.questionText;

        //creates the display text for the problem given to the user
        if (this.randomOperator == 0) {
            this.questionText = this.add.text(this.game.renderer.width/2, 350, this.firstNum.toString() + " + " + this.secondNum.toString() + " = " + input, { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
            this.questionText.setDepth(3);
        }
        else if (this.randomOperator == 1) {
            this.questionText = this.add.text(this.game.renderer.width/2, 350, this.firstNum.toString() + " - " + this.secondNum.toString() + " = " + input, { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#E0DBD1' }).setOrigin(0.5);
            this.questionText.setDepth(3);
        }
        lastSolution = this.solution;
    }

    //this function handles what should happen when the game ends
    finishGame(){

        setTimeout(() => { //changes to a intermission/new scene after time runs out

            this.menumusic3.stop();

            if (this.haveWon == false)
            {
                this.scene.start("scorescene");
            }

            else
            {
                score += 1;
                mathscore += 1;
                this.scene.start("intermission"); 
            }

        }, (time * 1000));
    }

    //updates once per frame
    update(delta){

        //gets user keyboard input
        let keyboard = this.input.keyboard;
        if (this.haveWon == false) {
            var i;
            let numPadArray = [45,35,40,34,37,12,39,36,38,33];
            for (i = 48 ; i < 58; i++) { //normal number keys
                if (keyboard.checkDown(keyboard.addKey(i), 300)) { input += String.fromCharCode(i); }
            }
            for (i = 96 ; i < 106; i++) { //numpad number keys with num lock on
                if (keyboard.checkDown(keyboard.addKey(i), 300)) { input += String.fromCharCode(i-48); }
            }
            for (i = 0 ; i < 10; i++) { //numpad number keys with num lock off
                if (keyboard.checkDown(keyboard.addKey(numPadArray[i]), 300)) { input += i.toString(); }
            }
            if (keyboard.checkDown(keyboard.addKey('BACKSPACE'), 300)) { //lets the user delete characters with backspace
                input = input.slice(0, -1);
            }
            for (i = input.length; i > 2; i--) {
                input = input.slice(0, -1);
            }
        }

        //updates the text on the screen according to the user's input
        if (this.randomOperator == 0) {
            this.questionText.text = this.firstNum.toString() + " + " + this.secondNum.toString() + " = " + input;
            this.questionText.setOrigin(0.5);
        }
        else if (this.randomOperator == 1) {
            this.questionText.text = this.firstNum.toString() + " - " + this.secondNum.toString() + " = " + input;
            this.questionText.setOrigin(0.5);
        }

        //handles the math for the loading bar
        var nowtime = new Date();
        var deltaTime = (nowtime-this.oldtime)/(time * 1112);
        this.oldtime = nowtime;
        num += deltaTime;
        this.loadingBar.fillRect(0, this.game.renderer.height / 1.3, this.game.renderer.width * num, 20);

        //sets the game state to won if the user's input is equal to the solution
        if (this.solution == input){
            this.haveWon = true;
            this.checkMark.setDepth(3);
        }
    }
}

//script-global variables
var input;