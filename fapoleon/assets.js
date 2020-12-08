var Assets ={
    imgA: [
        "img/sodika2.png",
        "img/back1.png",
        "img/back2.png"
    ],
    sndA: [
        "snd/sod1.mp3",
        "snd/sod2.mp3",
    ],
    images: new Array(),
    sounds: new Array(),
    counter: 0, //img counter
    loadAssets : function(){
        console.log("Loading assets...");
        //Filling up asset arrays.
        for(var i=0;i<this.imgA.length;i++){
            tempImg=new Image(); tempImg.src = this.imgA[i];
            this.images.push(tempImg);
        }
        for(var i=0;i<this.sndA.length;i++){
            tempSnd=new Audio(this.sndA[i]);
            this.sounds.push(tempSnd);
        }
    } 
};