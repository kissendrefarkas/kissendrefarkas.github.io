//import Note from "./note";

export default class KeyHolder{
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.size=(size==undefined) ? 50 : size;
        this.label=KeyHolder.labels[((this.x-KeyHolder.offset)/(KeyHolder.offsetmultiplier))/50];
    }

    static offset=30;
    static offsetmultiplier=1.6;
    static labels="sdfjk";
    static draw(kh_obj_list, ctx){
        for (let i = 0; i < kh_obj_list.length; i++) {
            //keyholder background
            ctx.fillStyle="#ffffff"
            ctx.fillRect(kh_obj_list[i].x, kh_obj_list[i].y, kh_obj_list[i].size, kh_obj_list[i].size);
            ctx.fillStyle="#000000"
            let strokeWidth=4;
            ctx.fillRect(kh_obj_list[i].x+strokeWidth/2, kh_obj_list[i].y+strokeWidth/2, kh_obj_list[i].size-strokeWidth, kh_obj_list[i].size-strokeWidth);
            //keyholder label/character
            ctx.fillStyle="#ffffff"
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText(kh_obj_list[i].label, kh_obj_list[i].x+kh_obj_list[i].size/2,
                                                kh_obj_list[i].y+kh_obj_list[i].size/2+10);
        
        }
    }
    static setlabels(){
        let newlabels="";
        let ok=false;
        while(!ok){
            newlabels= prompt("Új vezérlő gombok balról jobbra sorrendben (5db és különbözőek legyenek):",KeyHolder.labels);
            if(newlabels==null) newlabels=KeyHolder.labels;
            let diff=true;
            for (let i = 0; i < newlabels.length; i++) {
                for (let k = 0; k < newlabels.length; k++) {
                    if (i!=k && newlabels[i]==newlabels[k]) diff=false;
                }
            }
            if(diff && newlabels.length==5) ok=true;
        }
        KeyHolder.labels=newlabels;
    }
}