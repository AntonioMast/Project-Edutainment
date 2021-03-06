//The point of this script is to allow the player to choose which micro games to allow in their session
class selectscreen extends Phaser.Scene {
    constructor() {
            super({key:"selectscreen"});
    }

    preload() {
        //sets background to dark gray
        this.cameras.main.setBackgroundColor('#262626')
    }

    //variable declarations & game-object creations
    create(){

        //sets menu text
        var menuText;
        menuText = this.add.text(this.game.renderer.width / 2, 100, 'Please select which subjects you would like to include.', { fontSize: '40px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' }).setOrigin(0.5);
        menuText.setDepth(2);
        var menuTextOutline;
        menuTextOutline = this.add.text(this.game.renderer.width / 2 - 1, 98, 'Please select which subjects you would like to include.', { fontSize: '40px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#000000' }).setOrigin(0.5);
        menuTextOutline.setDepth(1);

        //sets the play button and adds the functionality to let it switch scenes when clicked
        const playButton = this.add.text(this.game.renderer.width / 2.2, this.game.renderer.height / 1.3, 'Play', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFFFFF' });
        playButton.setInteractive().on('pointerdown', () => {
            menumusic1.stop();
            this.scene.start("intermission");
        } );
        playButton.setDepth(2);

        //creates the click sound that plays when an option changes
        this.click = this.sound.add("CLICK");
        this.click.volume = volumeVariable;

        //creates each of the selectable menu options
        var mathButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 120, 'Arithmetic', { fontSize: '50px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#86D98A' }).setOrigin(0.5).setDepth(2);
        if (includeMath == false) {mathButton.setColor('#FF696C')}
        mathButton.setInteractive().on('pointerdown', () => {
            if (includeMath == true && (includeTyping == true || includeGeography == true || includeGeology == true)) {mathButton.setColor('#FF696C'); includeMath = false; this.click.play(); numSelected -= 1;}
            else if (includeMath == false) {mathButton.setColor('#86D98A'); includeMath = true; this.click.play(); numSelected += 1;}
        } );
        var geographyButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 60, 'Geography', { fontSize: '50px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#86D98A' }).setOrigin(0.5).setDepth(2);
        if (includeGeography == false) {geographyButton.setColor('#FF696C')}
        geographyButton.setInteractive().on('pointerdown', () => {
            if (includeGeography == true && (includeTyping == true || includeGeology == true || includeMath == true)) {geographyButton.setColor('#FF696C'); includeGeography = false; this.click.play(); numSelected -= 1;}
            else if (includeGeography == false) {geographyButton.setColor('#86D98A'); includeGeography = true; this.click.play(); numSelected += 1;}
        } );
        var typingButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 , 'Typing', { fontSize: '50px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#86D98A' }).setOrigin(0.5).setDepth(2);
        if (includeTyping == false) {typingButton.setColor('#FF696C')}
        typingButton.setInteractive().on('pointerdown', () => {
            if (includeTyping == true && (includeGeology == true || includeGeography == true || includeMath == true)) {typingButton.setColor('#FF696C'); includeTyping = false; this.click.play(); numSelected -= 1;}
            else if (includeTyping == false) {typingButton.setColor('#86D98A'); includeTyping = true; this.click.play(); numSelected += 1;}
        } );
        //                                 NOTE
        //The geology game is disabled for the published version because it uses copyrighted material
        //The code that is commented below can be un-commented in order to re-enable this game
        //additionaly, the global variable "includeGeology" would need to be set to true 
        var geologyButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 60, 'Geology - Unavailable in this version!', { fontSize: '50px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#86D98A' }).setOrigin(0.5).setDepth(2);
        if (includeGeology == false) {geologyButton.setColor('#FF696C')}
        geologyButton.setInteractive().on('pointerdown', () => {
            //if (includeGeology == true && (includeTyping == true || includeGeography == true || includeMath == true)) {geologyButton.setColor('#FF696C'); includeGeology = false; this.click.play(); numSelected -= 1;}
            //else if (includeGeology == false){geologyButton.setColor('#86D98A'); includeGeology = true; this.click.play(); numSelected += 1;}
        } );

        //BUTTON RENDERING
        this.button1 = this.add.graphics({
            fillStyle: {
                color: 0x000000 //black
            }
        })
        this.mainButton = this.add.graphics({
            fillStyle: {
                color: 0x000000 //black
            }
        })
        this.buttonAlpha = 0.8;
        this.button1.setDepth(1);
        this.button1.setAlpha(this.buttonAlpha);
        this.mainButton.setDepth(1);
        this.mainButton.setAlpha(0.5);

        //Randomly generates the puzzle piece background image
        for (var i = 0; i < 25; i++) {
            this.add.image(Phaser.Math.Between(50, this.game.renderer.width-50),Phaser.Math.Between(50, this.game.renderer.height-50),'PUZZLEPIECE').setOrigin(0).setScale(Math.random() * (1.0 - 0.2) + 0.2).angle = Phaser.Math.Between(0,359);
          }

        //repositions button border
        this.button1.x = (this.game.renderer.width / 2.2) - 10;
        this.button1.y = (this.game.renderer.height / 1.2) - 49;
        this.mainButton.x = 75;
        this.mainButton.y = 50;
    
        //sets each button to the correct screen position
        this.button1.fillRect(0, 0, 145, 75 );
        this.mainButton.fillRect(0, 0, this.game.renderer.width-150, this.game.renderer.height-100 );
    }
    
    //updates once per frame
    update(delta){

        //lets the user press space or enter in order to advance
        let keyboard = this.input.keyboard;
        if (keyboard.checkDown(keyboard.addKey('ENTER')) || keyboard.checkDown(keyboard.addKey('SPACE'))){
            menumusic1.stop();
            this.scene.start("intermission");
        }
        
        //makes the button flash
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