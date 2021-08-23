import Note from './note.js';
import KeyHolder from './keyHolder.js';
import PlayHandle from './playHandle.js';

export default class MyGame{
    constructor(fps){
        //gameSpecs
        this.fps= fps!=undefined ? fps : 25;
        this.gamestate=0; //0 loading and start, 1 ingame, 2 endscreen
        this.canvas=document.getElementById('c');
        this.ctx=document.getElementById('c').getContext("2d");
        this.c_size=[this.canvas.clientWidth, this.canvas.clientHeight];
        this.ecount=0; //element counter for preload
        this.playHandle=new PlayHandle(this);
        this.pageloaded=false;
        this.keypressed=false;
        this.timestamp=[new Date().getTime(), 0];// [older, newest]
        window.onload=()=>{this.pageloaded=true;};
        this.init();
        
    }

    scorehandle(value, addORsub){
        if(addORsub=="sub") {
            if(this.score-value<0) this.score=0;
            else this.score-=value;
            this.scoreinrow=0;
            this.score_odds=1;
            if(this.playHandle.a_animation!=0){this.playHandle.a_animation=0; this.playHandle.a_direction=1; this.playHandle.a_frameIdx=0;}
            this.playHandle.playsound();
        } else {
            this.score+=value*this.score_odds;
            this.scoreinrow+=1;
            let scorelimit=25;
            if(this.scoreinrow>=scorelimit){
                this.score_odds+=(this.score_odds<5) ? 1 : 0;
                this.playHandle.a_animation+=(this.playHandle.a_animation<4) ? 1 : 0;
                this.playHandle.a_direction=1; this.playHandle.a_frameIdx=0;
                this.scoreinrow=0;
            }
        }
    }
    scoredraw(){
        this.ctx.fillStyle="#ffffff";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("fütyi -> "+this.score_odds+"x", this.c_size[0]/4, 20); 
        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.score, this.c_size[0]/4, 50); 
    }
    init(){
        this.score=0;
        this.score_odds=1;
        this.scoreinrow=0;
        this.playHandle.a_animation=0;
        this.playHandle.a_direction=1;
        this.playHandle.a_frameIdx=0;
        this.playHandle.stopmusic();

        this.keyHolders=[];
        for (let i = 0; i < 5; i++) {
            this.keyHolders.push(new KeyHolder((KeyHolder.offset+(i*50)*KeyHolder.offsetmultiplier),410,50));
        }
        this.notelist = Note.notefillup();

        this.update();
    }

    update=()=>{
        this.timestamp[1]=new Date().getTime();
        
        if(this.timestamp[1]-this.timestamp[0]>=this.fps/* && !this.keypressed*/){
            //console.log(nowtime-this.timestamp);
            
            
            this.ctx.clearRect(0,0,854,480);
            this.ctx.fillStyle="#000000"; this.ctx.fillRect(0,0,854,480);
            switch (this.gamestate) {
                case 0:
                    this.ctx.fillStyle="#ffffff";
                    this.ctx.font = "30px Arial";
                    var listslen=this.playHandle.getlistslen();
                    if(this.ecount==listslen && this.pageloaded){
                        this.ctx.textAlign = "left";
                        this.ctx.fillText("JusztDensz betöltve! Kezdéshez nyomj Entert!",10,100);
                        this.ctx.fillText("Irányítás: '"+KeyHolder.labels+"' billentyűgombok",10,150);
                        this.ctx.fillText("Vezérlő gombok beállítása (alert box NE legyen tiltva): '1'",10,190);
                    } else {
                        this.ctx.textAlign = "center";
                        this.ctx.fillText("Óhelló! Ez itt egy betöltőképernyő! Szerintem ez érthető!",this.c_size[0]/2,100);
                        this.ctx.fillText((Math.floor(this.ecount/listslen*100))+"%",this.c_size[0]/2,150);
                    }
                    break;
                case 1:
                    //update

                    if(this.playHandle.music[0].currentTime==0) {this.playHandle.playmusic(this.notelist);}
                    
                    Note.move(this.notelist, this);
                    
                    //draw
                    KeyHolder.draw(this.keyHolders, this.ctx);
                    Note.draw(this.notelist,this.ctx);
                    this.playHandle.playanimation(this);
                    this.scoredraw();
                    this.ctx.font="15px Arial";
                    this.ctx.textAlign="left";
                    this.ctx.fillText("Újrakezdés: Enter",(854/2)+10,450);
                    this.ctx.fillText("Főképernyő: Backspace",(854/2)+10,465);
                    if(this.playHandle.music[0].ended || this.playHandle.music[0].paused){
                        this.playHandle.stopmusic(); this.gamestate=2;
                        this.playHandle.a_direction=1; this.playHandle.a_frameIdx=0; this.playHandle.a_animation=5;
                        this.playHandle.soundeffects[5].currentTime=0; this.playHandle.soundeffects[5].play();
                    }
                    break;
                case 2:
                    this.playHandle.playanimation(this);
                    this.ctx.fillStyle="#000000";
                    this.ctx.textAlign="left";
                    this.ctx.font="40px Arial";

                    this.ctx.fillText(this.score,854/2,70);
                    this.ctx.fillText("+ fütyi. Piszony.",(854/2)+30,115);
                    this.ctx.font="30px Arial";
                    this.ctx.fillText("Újrakezdés: Enter",(854/2)+80,240);
                    this.ctx.fillText("Főképernyő: Backspace",(854/2)+80,280);
                    this.ctx.fillText("Vezérlés beállítás: 1",(854/2)+80,320);
                    break;
                default:
                    break;
            }
            this.timestamp[0]=this.timestamp[1];
        }
        requestAnimationFrame(this.update);
    }

    
    setKeyEvent(){
        document.onkeydown=(e)=>{
            //alert(e.key); DEBUG
            if (this.gamestate==0 || this.gamestate==2){
                switch (e.key) {
                    case "Backspace":
                        this.gamestate=0;
                        break;
                    case "Enter":
                        this.init();
                        this.gamestate=1;
                        break;
                    case "1":
                        KeyHolder.setlabels();
                        break;
                    default:
                        break;
                }
            }
            if(this.gamestate==1){
                if(e.key=="Enter") this.init();
                if(e.key=="Backspace") {this.gamestate=0; this.playHandle.stopmusic();}
                for (let i = 0; i < KeyHolder.labels.length; i++) {
                    if(KeyHolder.labels[i]==e.key){
                        let collide=false;
                        for (let k = 0; k < this.notelist.length; k++) {
                            if(this.keyHolders[i].x!=this.notelist[k].x) continue;
                            else {
                                if(((this.keyHolders[i].y<=this.notelist[k].y+this.notelist[k].size) &&
                                this.keyHolders[i].y+this.keyHolders[i].size>=this.notelist[k].y)){
                                    //console.log(this.notelist[k].musicts-this.playHandle.music[0].currentTime);
                                    collide=true; Note.notedestroy(this.notelist, k, this);
                                    break;
                                }
                            }
                        }
                        if (collide) this.scorehandle(500);
                        else this.scorehandle(500,"sub");
                    }
                }
            }
            
        };
    }
}
