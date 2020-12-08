var Game = {
    c : document.getElementById("can"),
    ctx : document.getElementById("can").getContext("2d"),
    assets: Assets,
    cooming: 0,
    pressednow:"",
    pluscharge:5,
    inter: this.update,
    dTime:0,
    sizeOdds:1.2, grow:true,
    init : function(){
        this.assets.loadAssets();
        //Load stuff to be ready before doin anything.
        for(var i=0;i<this.assets.images.length;i++){
            this.assets.images[i].onload=this.cp;
        }
        for(var i=0;i<this.assets.sounds.length;i++){
            this.assets.sounds[i].oncanplay=this.cp;
        }
    },
    cp: function(){ //called by onload/oncanplay, here 'this' means the IMG/AUDIO obj
        var suma=Game.assets.imgA.length+Game.assets.sndA.length;
        if(Game.assets.counter>=suma){return;}
        Game.assets.counter+=1;
        console.log((Game.assets.counter/suma)*100 + "%");
        console.log(this);
        if(Game.assets.counter<(suma)){
            
            return;
        }
        console.log("All assets are loaded.");
        Game.run();
    },
    update : function(){ //'this' cannot be use here
        Game.ctx.clearRect(0, 0, Game.c.width, Game.c.height); //clearCanvas
        Game.dTime+=(1000/30);

        //head animation
        var incdec=1.005;
        if (Game.sizeOdds>=1.4) Game.grow=false; else if (Game.sizeOdds<=1.2){Game.grow=true}
        if (Game.grow==true){Game.sizeOdds*=incdec;} else Game.sizeOdds/=incdec;

        //decrease cooming
        if(Game.cooming>0 && Game.dTime>=1000/10)
        {
            if(Game.cooming>=100){
                Game.win();
            }
            if(Game.cooming-3>=0)Game.cooming-=3; else Game.cooming=0;
            Game.dTime=0;
            
        }
        if(Game.cooming>66){
            Game.draw(2);
        } else if(Game.cooming>33){
            Game.draw(1);
        } else Game.draw(0);
        
    },
    draw : function(num){
        if(Game.pressednow=="d") this.ctx.drawImage(this.assets.images[2],0,0,Game.c.width,Game.c.height);
        else this.ctx.drawImage(this.assets.images[1],0,0,Game.c.width,Game.c.height);
        var center=[620,195];
        this.ctx.drawImage( this.assets.images[0],
            0,this.assets.images[0].height/3*num,
            this.assets.images[0].width, (this.assets.images[0].height/3 -10),
            center[0]-(this.assets.images[0].width*Game.sizeOdds/2), center[1]-(this.assets.images[0].height*Game.sizeOdds/6),
            this.assets.images[0].width*Game.sizeOdds, (this.assets.images[0].height/3)*Game.sizeOdds);
        
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle="white";
        this.ctx.fillText("Piton charge" , 30, 50);
        this.ctx.fillText(Game.cooming +" %" , 60, 100); 
        if (Game.pluscharge==5){
            this.ctx.fillText("Difficulty: Easy" , 50, 400); 
        } else if (Game.pluscharge==4){
            this.ctx.fillText("Difficulty: Medium" , 50, 400); 
        } else this.ctx.fillText("Difficulty: Hard" , 50, 400); 
    },
    run:function(){
        Game.inter=setInterval(this.update, 1000/30);
    },
    win:function(){
        alert("You have succesfully piton'd !!4!!");
        Game.cooming=0;
    }
};



