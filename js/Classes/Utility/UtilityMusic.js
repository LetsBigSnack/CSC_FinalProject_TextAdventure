import  {audioBtn, audio} from "../../SetUpGame.js";
class UtilityMusic {

    static toggleMusic(){

        if(audio.paused){
            audio.play();
            audioBtn.style.color = "black";
        }else{
            audio.pause();
            audioBtn.style.color = "red";
        }

    }

}

export {UtilityMusic};