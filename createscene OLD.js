//The point of this script is to create a scene that lets users create their stage
class createscene extends Phaser.Scene {
    constructor() {
            super({key:"createscene"});
    }

    preload() {
        //sets background to dark gray
        this.cameras.main.setBackgroundColor('#2B2B2B')
    }

     //variable declarations & game-object creations
     create(){
        //play music
        this.menumusic2 = this.sound.add("MUSIC2");
        this.menumusic2.play();

        //User Keytboard Input
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Create hero object and it's properties
        this.hero = this.physics.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2,'HERO');
        this.hero.setScale(0.1);
        this.hero.setBounce(0.3, 0.3);
        this.hero.setCollideWorldBounds(true);

        //Create spawn area
        this.spawn = this.physics.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2,'STAGEDEFAULT');
        this.spawn.setScale(1);
        this.spawn.body.immovable = true;

        /****************************************************/
        /* The Following Code Is Used for Rendering Objects */
        /****************************************************/

        //Create refresh icon
        const refresh = this.add.image(this.game.renderer.width/2 + 382,this.game.renderer.height/2 - 233,'REFRESHICON');
        refresh.setScale(0.2);
        refresh.setDepth(2);
        refresh.setInteractive().on('pointerdown', () => {
            this.menumusic2.stop();
            this.scene.start("createscene");
        });

        const returnButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Return To Menu', { fontSize: '26px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#232323' });
        returnButton.setDepth(2);
        returnButton.x += 415;
        returnButton.y -= 250;
        returnButton.setInteractive().on('pointerdown', () => {
            this.menumusic2.stop();
            this.scene.start("mainmenu");
        });

        const playButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Play This Dungeon', { fontSize: '26px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: '#323232' });
        playButton.setDepth(2);
        playButton.x += 370;
        playButton.y += 250;
        playButton.setInteractive().on('pointerdown', () => {
            this.menumusic2.stop();
            this.scene.start("playscene");
        });

        //creates blue side panel
        let sidePanel = this.add.graphics({
            fillStyle: {
                color: 0x2B2B30 //Dark Blue
            }
        })

        //repositions side panel
        sidePanel.x += this.game.renderer.width * 0.75;
    
        //sets side panel to position
        sidePanel.fillRect(0, 0, this.game.renderer.width, this.game.renderer.height);

        //creates black side panel border
        let sidePanelBorder = this.add.graphics({
            fillStyle: {
                color: 0x000000 //Black
            }
        })

        //repositions side panel border
        sidePanelBorder.x += this.game.renderer.width * 0.75;
    
        //sets side panel border to position
        sidePanelBorder.fillRect(0, 0, 5, this.game.renderer.height);


        /*BUTTON RENDERING*/
        let button1 = this.add.graphics({
            fillStyle: {
                color: 0x505050 //light gray
            }
        })

        //repositions button border
        button1.x = (this.game.renderer.width / 2) + 414;
        button1.y = (this.game.renderer.height / 2) - 250;
    
        //sets button to position
        button1.fillRect(0, 0, 192, 35 );

        /*BUTTON RENDERING*/
        let buttonrefresh = this.add.graphics({
            fillStyle: {
                color: 0x505050 //light gray
            }
        })

        //repositions button border
        buttonrefresh.x = (this.game.renderer.width / 2) + 364;
        buttonrefresh.y = (this.game.renderer.height / 2) - 250;
    
        //sets button to position
        buttonrefresh.fillRect(0, 0, 35, 35 );

        let button2 = this.add.graphics({
            fillStyle: {
                color: 0x6E6E6E //light gray
            }
        })

        //repositions button border
        button2.x = (this.game.renderer.width / 2) + 365;
        button2.y = (this.game.renderer.height / 2) + 245;
    
        //sets button to position
        button2.fillRect(0, 0, 230, 45 );


    }

    //updates once per frame
    update(delta){
        //collision
        this.physics.add.collider(this.hero, this.spawn);

        if(this.key_A.isDown && this.hero.body.speed <= 50)
            hspeed-=2;

        if(this.key_D.isDown && this.hero.body.speed <= 50)
            hspeed+=2;

        if(this.key_W.isDown && this.hero.body.speed <= 50)
            vspeed-=2;

        if(this.key_S.isDown & this.hero.body.speed <= 50)
            vspeed+=2;


        //friction
        if(vspeed > 0.9){
            vspeed -=1;
        }

        else if(vspeed < -0.9){
            vspeed +=1;
        }

        else {
            vspeed = 0;
        }

        if(hspeed > 0.9){
            hspeed -=1;
        }

        else if(hspeed < -0.9){
            hspeed +=1;
        }

        else {
            hspeed = 0;
        }

        //final movement
        this.hero.setVelocity(hspeed, vspeed);

    }
}