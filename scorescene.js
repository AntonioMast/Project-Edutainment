//The point of this script is to create a scene that shows the user their final score
class scorescene extends Phaser.Scene {
    constructor() {
            super({key:"scorescene"});
    }

    preload() {
        this.cameras.main.setBackgroundColor('#EEEEEE')
    }

    //variable declarations & game-object creations
    create(){

        //dino animation
        var dino1 = {
            key: 'dinoStand',
            frames: this.anims.generateFrameNumbers('DINO', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        }

        this.menumusic4 = this.sound.add("MUSIC4", volumeVariable);
        this.menumusic4.volume = volumeVariable;
        this.menumusic4.play();
        this.menumusic4.setLoop(true);

        this.anims.create(dino1);
        this.dinoCharacter = this.add.sprite(90, this.game.renderer.height-36, 'DINO').play('dinoStand');
        this.dinoCharacter.setScale(1.0);
        this.dinoCharacter.setDepth(4);        

        //corrects the grammar in case the player only wins a single round
        if (score == 1) { this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 1.8, 'You made it through ' + score + ' round!', { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5); }
        else { this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 1.8, 'You made it through ' + score + ' rounds!', { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5);}

        //tells the player the correct answer if the last game was a math or geography game
        if (lastSolution != "") { this.add.text(30, 30, 'The correct answer was: ' + lastSolution, { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }); }

        //adds variance to the congratulatory text
        if (score > 4) { this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2.05, 'Good Job!', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#222222' }).setOrigin(0.5); }
        else { this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2.05, 'Nice Try!', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#222222' }).setOrigin(0.5);}
        
        const playButton = this.add.text(this.game.renderer.width / 2, 500, 'Return', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' }).setOrigin(0.5);
        playButton.setInteractive().on('pointerdown', () => {
            this.menumusic4.stop();
            score = 0;
            this.scene.start("mainmenu");
        } );

        //adds text to tell the player their best subject after so many rounds
        if (mathscore > 9 && mathscore > geographyscore + 4 && mathscore > typingscore + 4 && mathscore > rockscore + 4) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height - 15, 'You\'ve made a lot of progress in Algrebra. You should try the other subjects next time.', { fontSize: '24px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5);
        }
        else if (geographyscore > 9 && geographyscore > mathscore + 4 && geographyscore > typingscore + 4 && geographyscore > rockscore + 4) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height - 15, 'You\'ve made a lot of progress in Geography. You should try the other subjects next time.', { fontSize: '24px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5);
        }
        else if (typingscore > 9 && typingscore > geographyscore + 4 && typingscore > mathscore + 4 && typingscore > rockscore + 4) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height - 15, 'You\'ve made a lot of progress in Typing. You should try the other subjects next time.', { fontSize: '24px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5);
        }
        else if (rockscore > 9 && rockscore > geographyscore + 4 && rockscore > typingscore + 4 && rockscore > mathscore + 4) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height - 15, 'You\'ve made a lot of progress in Geology. You should try the other subjects next time.', { fontSize: '24px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' }).setOrigin(0.5);
        }
        this.add.text(40, 300, 'Progress\nAlgebra: ' + mathscore + '\nGeography: ' + geographyscore + '\nTyping: ' + typingscore + '\nGeology: ' + rockscore, { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' });
        

        let keyboard = this.input.keyboard;
        if (keyboard.checkDown(keyboard.addKey('ENTER'))){
            this.menumusic4.stop();
            this.scene.start("mainmenu");
        }

        playButton.setDepth(2);

        this.textBubble = this.add.image(135, this.game.renderer.height-175,'TEXTBUBBLE').setOrigin(0);
        this.textBubble.setScale(0.5);
        this.dinoText = this.add.text(172, this.game.renderer.height-150, ' Why not\ntry again?', { fontSize: '20px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });

        /*BUTTON RENDERING*/
        this.button1 = this.add.graphics({
            fillStyle: {
                color: 0x000000 //black
            }
        })

        this.buttonAlpha = 0.8;
        this.button1.setDepth(1);
        this.button1.setAlpha(this.buttonAlpha);
        this.fullOpacity = true;

        //repositions button border
        this.button1.x = (550) - 15;
        this.button1.y = (465) - 2;
    
        //sets button to position
        this.button1.fillRect(0, 0, 213, 75 );
    }

        //updates once per frame
        update(delta){

            let keyboard = this.input.keyboard;
            if (keyboard.checkDown(keyboard.addKey('ENTER')) || keyboard.checkDown(keyboard.addKey('SPACE'))){
                this.menumusic4.stop();
                this.scene.start("intermission");
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