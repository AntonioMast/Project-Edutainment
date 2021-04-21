//The point of this script is to create a scene that lets users play the game
class testmicro extends Phaser.Scene {
    constructor() {
            super({key:"testmicro"});
    }

    preload() {
        //sets background to very light gray
        this.cameras.main.setBackgroundColor('#EEEEEE')
    }

    //variable declarations & game-object creations
    create(){
        this.finishGame();

        //variables
        this.haveWon = false;
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

        const winButton = this.add.text(this.game.renderer.width / 3.5, this.game.renderer.height / 2.1, 'Force a win-state', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#222222' });
        const descriptionText = this.add.text(this.game.renderer.width / 3.8, this.game.renderer.height / 1.8, '(Doing nothing will cause a lose-state)', { fontSize: '32px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#AAAAAA' });
        winButton.setInteractive().on('pointerdown', () => {
            this.cameras.main.setBackgroundColor('#CCCCCC')
            this.haveWon = true;
        } );
    
    }

    finishGame(){

        setTimeout(() => { //changes to a intermission/new scene after 5 seconds
            if (this.haveWon == false)
            {
                this.scene.start("scorescene");
            }

            else
            {
                score += 1;
                this.scene.start("intermission"); 
            }

        }, 5000);
    }

    //updates once per frame
    update(delta){
        var nowtime = new Date();
        var deltaTime = (nowtime-this.oldtime)/(100000/18);
        this.oldtime = nowtime;
        num += deltaTime;
        this.loadingBar.fillRect(0, this.game.renderer.height / 1.3, this.game.renderer.width * num, 20);
    }

}