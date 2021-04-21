//The point of this script is to allow the player to start the game and change settings from a menu
class mainmenu extends Phaser.Scene {
    constructor() {
            super({key:"mainmenu"});
    }

    preload() {
        //sets background to dark gray
        this.cameras.main.setBackgroundColor('#262626')
    }

    //variable declarations & game-object creations
    create(){
        this.menu = this.add.image(0,0,'MENU').setOrigin(0);
        this.menu.setScale(0.67);
        time = 10;
        lastSolution = "";

        //sets dino walking animation from the loaded spritesheet
        var dino = {
            key: 'dinoWalk',
            frames: this.anims.generateFrameNumbers('DINO', { start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        };

        //mute button functionality
        this.speakerButton;
        if (mute == false) {this.speakerButton = this.add.image(this.game.renderer.width-74,10,'SPEAKER').setOrigin(0);}
        else {this.speakerButton = this.add.image(this.game.renderer.width-74,10,'SPEAKEROFF').setOrigin(0);}

        this.speakerButton.setInteractive().on('pointerdown', () => {
            if (mute == false){
                this.speakerButton.setTexture('SPEAKEROFF');
                mute = true;
                volumeVariable = 0;
            }
            
            else {
                this.speakerButton.setTexture('SPEAKER');
                mute = false;
                volumeVariable = 1.0;
            }

            menumusic1.volume = volumeVariable;
        } );

        //creates dino in scene
        this.anims.create(dino);
        this.dinoCharacter = this.add.sprite(-800, this.game.renderer.height-36, 'DINO').play('dinoWalk');
        this.dinoCharacter.setScale(1.0);
        this.dinoCharacter.setDepth(4);

        //creates text bubble
        this.textBubble = this.add.image(-775, this.game.renderer.height-175,'TEXTBUBBLE').setOrigin(0);
        this.textBubble.setScale(0.5);
        this.dinoText = this.add.text(-740, this.game.renderer.height-135, 'Click Play!', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });

        //sets menu text
        var menuText;
        menuText = this.add.text(30, 30, 'Project Edutainment Final Prototype', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });
        menuText.setDepth(2);
        var menuTextOutline;
        menuTextOutline = this.add.text(29, 28, 'Project Edutainment Final Prototype', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#000000' });
        menuTextOutline.setDepth(1);
        var credits = this.add.text(48, this.game.renderer.height-30, 'Credits: Code: Antonio Mastroianni Music: purple-planet.com Images: Hans-Peter Gauster & Noita Digital Characters: @ScissorMarks', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });
        credits.setDepth(2);
        var creditsOutline = this.add.text(46, this.game.renderer.height-28, 'Credits: Code: Antonio Mastroianni Music: purple-planet.com Images: Hans-Peter Gauster & Noita Digital Characters: @ScissorMarks', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#000000' });
        creditsOutline.setDepth(1);

        const playButton = this.add.text(this.game.renderer.width / 2.2, this.game.renderer.height / 1.6, 'Play', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });
        playButton.setInteractive().on('pointerdown', () => {
            this.scene.start("selectscreen");
        } );

        playButton.setDepth(2);

        /*BUTTON RENDERING*/
        this.button1 = this.add.graphics({
            fillStyle: {
                color: 0x000000 //black
            }
        })

        this.buttonAlpha = 0.8;

        this.button1.setDepth(1);
        this.button1.setAlpha(this.buttonAlpha);

        //repositions button border
        this.button1.x = (this.game.renderer.width / 2.2) - 10;
        this.button1.y = (this.game.renderer.height / 1.5) - 33;
    
        //sets button to position
        this.button1.fillRect(0, 0, 145, 75 );

        //play music
        menumusic1 = this.sound.add('MUSIC1');
        menumusic1.volume = volumeVariable;
        menumusic1.play();
        menumusic1.setLoop(true);

        this.fullOpacity = true;

        score = 0;
    }
    
    //updates once per frame
    update(delta){

        let keyboard = this.input.keyboard;
        if (keyboard.checkDown(keyboard.addKey('ENTER')) || keyboard.checkDown(keyboard.addKey('SPACE'))){
            this.scene.start("selectscreen");
        }

        this.dinoCharacter.x = this.dinoCharacter.x+1;
        this.textBubble.x = this.textBubble.x+1;
        this.dinoText.x = this.dinoText.x+1;

        if (this.dinoCharacter.x >= this.game.renderer.width+800) {
            this.dinoCharacter.x = -350;
            this.textBubble.x = -305;
            this.dinoText.x = -270;
        }
        
        if (this.fullOpacity == true)
            {
                this.buttonAlpha -= 0.005;

                if (this.buttonAlpha <= 0.4)
                    this.fullOpacity = false;
            }

        else {
            this.buttonAlpha += 0.005;

            if (this.buttonAlpha >= 0.8)
                this.fullOpacity = true;
        }

        this.button1.setAlpha(this.buttonAlpha);
    }
}

var menumusic1;
var includeMath = true;
var includeGeography = true;
var includeTyping = true;
var includeGeology = true;