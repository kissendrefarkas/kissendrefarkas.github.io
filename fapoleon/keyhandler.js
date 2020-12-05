 $("button").click(function(){
    Game.pluscharge=6-this.value;
 });
function game_check(){
    if(Game.cooming+Game.pluscharge>=33 && Game.cooming<33){
        if(Game.assets.sounds[0].currentTime==0 || Game.assets.sounds[0].currentTime==Game.assets.sounds[0].duration){
            Game.assets.sounds[1].pause(); Game.assets.sounds[1].currentTime=0;
            Game.assets.sounds[0].currentTime=0;
            Game.assets.sounds[0].play();
        }
    }
    if(Game.cooming+Game.pluscharge>=66 && Game.cooming<66){
        if(Game.assets.sounds[1].currentTime==0 || Game.assets.sounds[1].currentTime==Game.assets.sounds[1].duration){
            Game.assets.sounds[0].pause(); Game.assets.sounds[0].currentTime=0;
            Game.assets.sounds[1].currentTime=0;
            Game.assets.sounds[1].play();
        }
    }
    Game.cooming+=Game.pluscharge;
}
$(document).keydown(function(e){
    if(e.key=="a" && Game.pressednow!="a"){
        game_check();
        Game.pressednow=e.key;
    }
    if(e.key=="d" && Game.pressednow!="d"){
        game_check();
        Game.pressednow=e.key;
    }
});


