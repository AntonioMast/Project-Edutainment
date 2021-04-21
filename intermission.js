//The point of this script is to create a scene that lets users create their stage
class intermission extends Phaser.Scene {
    constructor() {
            super({key:"intermission"});
    }

    preload() {
        //sets background to very light gray
        this.cameras.main.setBackgroundColor('#EEEEEE')
    }

     //variable declarations & game-object creations
     create(){
        //play music
        this.menumusic2 = this.sound.add("MUSIC2");
        this.menumusic2.volume = volumeVariable;
        this.menumusic2.play();
        this.winJingle = this.sound.add("JINGLE");
        this.winJingle.volume = volumeVariable;
        this.winJingle.play();
        this.gotoMicroGame();

        //sets the timer to a lower value every 5 rounds
        if (score > 1 && score % 2 == 0 && score < 31) {
            time -= 0.5;
        }
        

        //sets dino standing animation from the loaded spritesheet
        var dino1 = {
            key: 'dinoStand',
            frames: this.anims.generateFrameNumbers('DINO', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        };

        var dino2 = {
            key: 'dinoWalk',
            frames: this.anims.generateFrameNumbers('DINO', { start: 4, end: 9}),
            frameRate: 10,
            repeat: -1
        };

        var dino3 = {
            key: 'dinoRun',
            frames: this.anims.generateFrameNumbers('DINO', { start: 18, end: 23}),
            frameRate: 10,
            repeat: -1
        };

        this.dinoRandomizer = Phaser.Math.Between(1, 2);

        //creates dino character in scene with a random animation
        switch(this.dinoRandomizer) {
            case 0:
                this.anims.create(dino1);
                this.dinoCharacter = this.add.sprite(Phaser.Math.Between(200,  this.game.renderer.width-200), this.game.renderer.height-36, 'DINO').play('dinoStand');
                this.dinoCharacter.setScale(1.0);
                this.dinoCharacter.setDepth(4);        
            break;
            case 1:
                this.anims.create(dino2);
                this.dinoCharacter = this.add.sprite(Phaser.Math.Between(-150,  -100), this.game.renderer.height-36, 'DINO').play('dinoWalk');
                this.dinoCharacter.setScale(1.0);
                this.dinoCharacter.setDepth(4);        
            break;
            case 2:
                this.anims.create(dino3);
                this.dinoCharacter = this.add.sprite(Phaser.Math.Between(-300,  -200), this.game.renderer.height-36, 'DINO').play('dinoRun');
                this.dinoCharacter.setScale(1.0);
                this.dinoCharacter.setDepth(4);            
            break;
            default: // this shouldn't ever run
                this.anims.create(dino1);
                this.dinoCharacter = this.add.sprite(Phaser.Math.Between(200,  this.game.renderer.width-200), this.game.renderer.height-36, 'DINO').play('dinoStand');
                this.dinoCharacter.setScale(1.0);
                this.dinoCharacter.setDepth(4);
        }

        //sets text
        this.alertText = this.add.text(this.game.renderer.width / 4, this.game.renderer.height/3, 'Get Ready!', { fontSize: '128px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#666666' });
        this.alertText.setAlpha(this.textAlpha);
        var scoreText;
        scoreText = this.add.text(30, 30, 'Score: ' + score, { fontSize: '48px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' });

        //variables
        this.fullOpacity = true;
        this.textAlpha = 0.5;
        num = 0.0;
        this.oldtime = new Date();

        /****************************************************/
        /* The Following Code Is Used for Rendering Objects */
        /****************************************************/
        
        //creates a rectangle to represent a loading bar
        this.loadingBar = this.add.graphics({
            fillStyle: {
                color: "0x"+(Math.random()*0xFFFFFF<<0).toString(16) //random color
            }
        })

        //repositions loading bar
        this.loadingBar.x += this.game.renderer.width * 0.05;

    }

    gotoMicroGame(){

        setTimeout(() => { //changes to a micro game/new scene after 3 seconds
            var randomGame;
            var canPlayGame = false;
            do {
                randomGame = Phaser.Math.Between(1, 4);
                switch(randomGame) {
                    case 1: if (includeMath == true) {canPlayGame = true} break;
                    case 2: if (includeGeography == true) {canPlayGame = true} break;
                    case 3: if (includeTyping == true) {canPlayGame = true} break;
                    case 4: if (includeGeology == true) {canPlayGame = true} break;
                    default: canPlayGame = false; break;
                }
            } while (canPlayGame == false);
            
            this.menumusic2.stop(); //stops the music
            num = 0.0;

            switch(randomGame) {
                case 1:
                    this.scene.start("mathmicrofirst");// changes scene to a math addition/subtraction game
                break;
                case 2:
                    this.scene.start("geomicrofirst");// changes scene to a image-based geography game
                break;
                case 3:
                    this.scene.start("typingmicrofirst");// changes scene to a image-based geography game
                break;
                case 4:
                    this.scene.start("rockmicro");// changes scene to a image-based geography game
                break;
                default:
                    this.scene.start("testmicro");// this shouldn't ever run under normal circumstances
            }
        }, 3000);
    }

    //updates once per frame
    update(delta){
        var nowtime = new Date();
        var deltaTime = (nowtime-this.oldtime)/(100000/30);
        this.oldtime = nowtime;
        num += deltaTime;
        this.loadingBar.fillRect(0, this.game.renderer.height / 1.3, this.game.renderer.width * num, 20);

        if (this.fullOpacity == true)
        {
            this.textAlpha -= 0.005;

            if (this.textAlpha <= 0.2)
                this.fullOpacity = false;
        }

        else {
            this.textAlpha += 0.005;

            if (this.textAlpha >= 0.5)
                this.fullOpacity = true;
        }

        this.alertText.setAlpha(this.textAlpha);

        //moves the dino character depends on the animation
        if (this.dinoRandomizer == 1) {
            this.dinoCharacter.x = this.dinoCharacter.x+1
        }

        else if (this.dinoRandomizer == 2) {
            this.dinoCharacter.x = this.dinoCharacter.x+2
        }
    }
}

var num = 0.0;