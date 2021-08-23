export default class PlayHandle{
    constructor(gObj){

        this.a_animation=0;
        this.a_direction=1;//-1 back, 1 forward
        this.a_frameIdx=0;

        this.sf_selected=0;

        this.l_music=["./assets/bs.ogg"];
        this.l_soundeffect=["./assets/a_sodi00.ogg","./assets/a_sodi01.ogg","./assets/a_sodi02.ogg","./assets/a_sodi03.ogg", "./assets/a_sodi04.ogg", "./assets/imadom.ogg"];
        this.l_animation=[
            ["./assets/sodi00_", 1, 75, ".jpg"],
            ["./assets/sodi01_", 1, 208, ".jpg"],
            ["./assets/sodi02_", 1, 128, ".jpg"],
            ["./assets/sodi03_", 1, 125, ".jpg"],
            ["./assets/sodi04_", 1, 112, ".jpg"],
            ["./assets/sodi05_", 1, 82, ".jpg"]
        ]; // [imgBaseName, startIdx, endIdx, .ext]
        this.l_image=[];

        this.music=[];        this.preload(this.l_music,"sound",this.music,gObj);
        this.soundeffects=[]; this.preload(this.l_soundeffect,"sound",this.soundeffects,gObj);
        this.animations=[];   this.preload(this.l_animation,"animation",this.animations,gObj);
        this.images=[];       this.preload(this.l_image,"image",this.images,gObj);
    }
    playmusic(n_obj_list){
        this.music[0].currentTime=0.00001;
        for (let i = n_obj_list.length-1; i >= 0; i--) {
            if(n_obj_list[i].musicts+0.5<this.music[0].currentTime) n_obj_list.splice(i,1);
        }
        this.music[0].volume=0.5;
        this.music[0].play();
    }
    stopmusic(){
        this.music[0].pause();
        this.music[0].currentTime=0;
    }
    playsound(){
        if (!this.soundeffects[this.sf_selected].ended && !this.soundeffects[this.sf_selected].paused) return;
        this.sf_selected = Math.floor(Math.random()*5);
        this.soundeffects[this.sf_selected].currentTime=0;
        this.soundeffects[this.sf_selected].play();
    }

    playanimation(gObj){
        let acta=this.animations[this.a_animation]

        if(this.a_animation<5) gObj.ctx.drawImage(acta[this.a_frameIdx], 854/2, 0, 854/2, 480);
        else gObj.ctx.drawImage(acta[this.a_frameIdx], 0, 0, 854, 480);

        if(this.a_direction>0){
            if(acta.length>this.a_frameIdx+1){
                this.a_frameIdx++;
            } else this.a_direction=-1;
        }
        else {
            if(0<this.a_frameIdx-1){
                this.a_frameIdx--;
            } else this.a_direction=1;
        }
    }

    preload(list, type, out, gameObj){
        if(type=="sound"){
            for (let i = 0; i < list.length; i++) {
                let sound=new Audio(list[i]);
                out.push(sound);
                sound.oncanplaythrough=() =>{
                    gameObj.ecount+=(this.getlistslen()>gameObj.ecount)?1:0;
                    this.checkcounter(gameObj);
                };
            }
        }
        else if(type=="animation"){
            for (let i = 0; i < list.length; i++) {
                let imgarr=[];
                for (let k = list[i][1]; k <= list[i][2]; k++) {
                    let imgsrc=list[i][0];
                    for (let j = (k.toString().length); j < 4; j++) {
                        imgsrc+="0";
                    }
                    imgsrc+=k.toString()+list[i][3];
                    let img=new Image();
                    img.src=imgsrc;
                    imgarr.push(img);
                    img.onload= () => {
                        gameObj.ecount+=(this.getlistslen()>gameObj.ecount)?1:0;
                        this.checkcounter(gameObj);
                    }
                }
               out.push(imgarr);
            }
        }
        else if(type=="image"){
            for (let i = 0; i < list.length; i++) {
                let img=new Image();
                img.src=list[i];
                out.push(img);
                img.onload= () => {
                    gameObj.ecount+=(this.getlistslen()>gameObj.ecount)?1:0;
                    this.checkcounter(gameObj);
                }
            }
        }
    }
    getlistslen(){
        let sum = this.l_music.length + this.l_soundeffect.length + this.l_image.length;
        for (let i = 0; i < this.l_animation.length; i++) {
            sum+=(this.l_animation[i][2]-this.l_animation[i][1]+1)
        }
        return sum;
    }
    checkcounter(gameObj){
        let sumOfElements=this.getlistslen();
        if(document.onclick==undefined && sumOfElements==gameObj.ecount) {
            gameObj.setKeyEvent();
        }
    }
}