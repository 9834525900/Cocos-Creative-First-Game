// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // the random scale of disappearing time for stars
        maxStarDuration: 0,
        minStarDuration: 0,
        //ground node for confirming the height of the generated star's position
        ground:{
            default: null,
            type: cc.Node
        },
        //Player node for obtaining the jump height of the main character and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        this.groundY=this.ground.y + this.ground.height/2;
        this.timer=0;
        this.StarDuration=0;
        this.spawnNewStar();
        this.score=0;
    },

    spawnNewStar: function(){
        var newStar= cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game=this;
        this.starDuration=this.minStarDuration+Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer=0;
    },

    getNewStarPosition(){
        var randX=0;
        var randY=this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX=this.node.width/2;
        randX=(Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    update: function(dt){
        if(this.timer > this.starDuration){
            this.gameOver();
            return;
        }
        this.timer+=dt;
    },

    start () {

    },

    gainScore: function(){
        this.score+=1;
        this.scoreDisplay.string='Score: '+this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function(){
        this.player.stopAllActions();
        cc.director.loadScene('game');
    },
});
