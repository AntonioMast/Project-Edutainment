//The point of this script is to create a scene that lets users play a typing game
class typingmicrofirst extends Phaser.Scene {
    constructor() {
            super({key:"typingmicrofirst"});
    }

    preload() {
        //sets background to very light gray
        this.cameras.main.setBackgroundColor('#111111')
    }

    //variable declarations & game-object creations
    create(){
        this.finishGame();

        this.checkMark = this.add.image(-850,390,'CHECKMARK');
        this.checkMark.setDepth(5);

        //variables
        input = "";
        this.haveWon = false;
        this.oldtime = new Date();
        this.solution = this.returnPhrase(Phaser.Math.Between(0, 49));
        backspaceHeld = false;
        backspacePressedOnce = false;

        //play music
        this.menumusic5 = this.sound.add("MUSIC5", volumeVariable);
        this.menumusic5.volume = volumeVariable;
        this.menumusic5.play();
      
        /****************************************************/
        /* The Following Code Is Used for Rendering Objects */
        /****************************************************/

        //creates a rectangle to represent a loading bar
        this.loadingBar = this.add.graphics({
            fillStyle: {
                color: "0x33FF33"
            }
        })

        //repositions loading bar
        this.loadingBar.x += this.game.renderer.width * 0.05;
        this.loadingBar.setDepth(3);

        //objective text
        this.objText = this.add.text(30, 30, "Type the phrase!", { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#33FF33' });
        this.objText.setDepth(3);

        //question text
        this.questionText = this.add.text(this.game.renderer.width/2, 300, this.solution, { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#33FF33' }).setOrigin(0.5);
        this.questionText.setDepth(3);

        this.answerText = this.add.text(this.game.renderer.width/2, 400, input, { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#33FF33' }).setOrigin(0.5);
        this.answerText.setDepth(3);

        lastSolution = "";
    
    }

    finishGame(){

        setTimeout(() => { //changes to a intermission/new scene after time runs out

            this.menumusic5.stop();

            if (this.haveWon == false)
            {
                this.scene.start("scorescene");
            }

            else
            {
                score += 1;
                typingscore += 1;
                this.scene.start("intermission"); 
            }

        }, (time * 1000));
    }

    returnPhrase(phraseID){

        let statesArray = ['This game rocks!', 'I wonder what is next?', 'The end.', 'Wow!', 'Cool!', 'A quick brown fox...', 'Type this.', 'Capitalize proper nouns.',
                           'Type me!', 'Is this the end!?', 'Not bad.', 'One step closer...', 'I was made in 2021!', 'Typing is pretty easy!', 'Here we go.', 'This game again?',
                           '1 is one', '2 is two', '3 is three', '4 is four', '5 is five', '6 is six', '7 is seven', '8 is eight',
                           '9 is nine', '0 is zero', 'We went to the Moon in 1969', 'You want me to type THIS MUCH!?', 'pst...', 'Just a little.', 'A bit more to go.', 'A dime a dozen.',
                           'Happy Camper', 'A dream come true!', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
                           'Sunday', 'Jump for joy!', 'Cool.', 'Who?', 'What?', 'When?', 'Where?', 'How?',
                                                                'Why?', 'Which?' ];

        return statesArray[phraseID];
    }

    //updates once per frame
    update(delta){

        //gets user keyboard input
        let keyboard = this.input.keyboard;
        if (this.haveWon == false) {

            var i;
            if (keyboard.checkDown(keyboard.addKey('SHIFT'))) { //checks letters A-Z if they are pressed
                for (i = 65 ; i < 91; i++) {
                    if (keyboard.checkDown(keyboard.addKey(i), 300)) { input += String.fromCharCode(i); }
                }
                if (keyboard.checkDown(keyboard.addKey(49), 300)) { input += "!"; } //checks if '!' is pressed
                if (keyboard.checkDown(keyboard.addKey(191), 300)) { input += "?"; } //checks if '?' is pressed
            }
            else { //checks if key is pressed without shift
                for (i = 48; i < 91; i++) {
                    if (keyboard.checkDown(keyboard.addKey(i), 300)) { input += String.fromCharCode(i).toLowerCase(); }
                }
                if (keyboard.checkDown(keyboard.addKey('PERIOD'), 300)) { input += "."; } //checks if a period is typed
            }
            if (keyboard.checkDown(keyboard.addKey('SPACE'), 300)) { 
                input += " ";
            }
            if (keyboard.checkDown(keyboard.addKey('BACKSPACE'), 300) && backspaceHeld == false) { //has added logic for if the key is held
                if (backspacePressedOnce == true) {
                    backspaceHeld = true;
                }
                else { input = input.slice(0, -1); }
                backspacePressedOnce = true; 
            }
            else if (keyboard.checkDown(keyboard.addKey('BACKSPACE'), 50)  && backspaceHeld == true) {
                input = input.slice(0, -1);
            }
            else if (!keyboard.checkDown(keyboard.addKey('BACKSPACE'))) { backspaceHeld = false; backspacePressedOnce = false; } //removes characters if too many are typed
            if (input.length > 30)
            {
                for (i = input.length; i > 30; i--) {
                    input = input.slice(0, -1);
                } 
            }
        }

        this.answerText.text = input;

        var nowtime = new Date();
        var deltaTime = (nowtime-this.oldtime)/(time * 1112);
        this.oldtime = nowtime;
        num += deltaTime;
        this.loadingBar.fillRect(0, this.game.renderer.height / 1.3, this.game.renderer.width * num, 20);

        if (this.solution == input){
            this.haveWon = true;
            this.checkMark.x = 1000;
        }

        if (this.haveWon == true) {
            
        }
    }
}

//global variables
var input;
var backspaceHeld;
var backspacePressedOnce;