import  {audioBtn, audio} from "../../SetUpGame.js";

/**
 * This Class is used to house all the Function which revolve around Sound/Music, and it's representation.
 * This UtilityMusic class is used across the whole Project to make interaction with the Sound/Music more readable and streamline the process.
 */
class UtilityMusic {

    /**
     * Toggles the currently played music Track either on or off
     */
    static toggleMusic(){
        if(audio.paused){
            audio.play().then();
            audioBtn.style.color = "black";
        }else{
            audio.pause();
            audioBtn.style.color = "red";
        }
    }

}

export {UtilityMusic};