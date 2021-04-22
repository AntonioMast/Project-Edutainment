var config = {
    type:Phaser.AUTO,
    width:1280,
    height:720,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y : 0},
            debug: false
        }
    },
    scene: [ 
        loadscreen,
        mainmenu,
        selectscreen,
        intermission,
        mathmicrofirst,
        geomicrofirst,
        typingmicrofirst,
        rockmicro,
        scorescene,
     ]
}

//global variables
var game = new Phaser.Game(config);
var score = 0;
var time;
var lastSolution = "";
var mute = false;
var volumeVariable = 1.0;
var mathscore = 0; geographyscore = 0; typingscore = 0; rockscore = 0;
var menumusic1;
var numSelected = 3;
var lastGame = 0;
var includeMath = true;
var includeGeography = true;
var includeTyping = true;
var includeGeology = false;