class example extends Phaser.Scene {
    constructor() {
            super({key:"example"});
    }

    preload() {
        this.load.image("HERO",'./assets/hero.png');
    }

    //variable declarations & game-object creations
    create(){
        this.image = this.add.image(400,300,'HERO');


        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', function(event) {
                this.image.x = event.x;
                this.image.y = event.y;
        },this)
    }

    //updates once per frame
    update(delta){

        if(this.key_A.isDown)
            this.image.x--;

        if(this.key_D.isDown)
            this.image.x++;

        if(this.key_W.isDown)
            this.image.y--;

        if(this.key_S.isDown)
            this.image.y++;

    }
}