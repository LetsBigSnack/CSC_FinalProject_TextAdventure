import {audioBtn, audio, adventureGame, sound, canPlaySound} from "../../SetUpGame.js";
import {UtilityRandom} from "./UtilityRandom.js";

/**
 * This Class is used to house all the Function which revolve around Sound/Music, and it's representation.
 * This UtilityMusic class is used across the whole Project to make interaction with the Sound/Music more readable and streamline the process.
 */
class UtilityMusic {

    static SOUND_CLIPS = {
        "ATTACK" : [
            new Audio("../sounds/Hit_01.mp3"),
            new Audio("../sounds/Hit_02.mp3"),
            new Audio("../sounds/Hit_03.mp3"),
            new Audio("../sounds/Explosion_02.mp3"),
            new Audio("../sounds/Explosion_03.mp3"),
            new Audio("../sounds/Explosion_04.mp3")
        ],
        "ABILITIES":[
            new Audio("../sounds/sfx_sounds_powerup15.wav"),
            new Audio("../sounds/sfx_sounds_powerup16.wav"),
            new Audio("../sounds/sfx_sounds_powerup17.wav"),
            new Audio("../sounds/sfx_sounds_powerup18.wav"),
        ],
        "POSITIVE":[
            new Audio("../sounds/sfx_coin_cluster3.wav"),
            new Audio("../sounds/sfx_coin_cluster6.wav"),
        ],
        "ERROR":[
            new Audio("../sounds/19_cantdo2.wav")
        ]
    };

    /**
     * Toggles the currently played music Track either on or off
     */
    static toggleMusic(){
        console.log("music");
        if(canPlaySound){
            if(audio.paused){
                audio.play().then();
                audioBtn.style.color = "black";
            }else{
                audio.pause();
                audioBtn.style.color = "red";
            }
        }
    }

    /**
     * Toggles is sound are allowed to play either on or off
     */
    static toggleSound(){
        console.log("sound");
        if(canPlaySound){
            if(!adventureGame.playSound){
                sound.style.color = "black";
                adventureGame.playSound = !adventureGame.playSound;
            }else{
                sound.style.color = "red";
                adventureGame.playSound = !adventureGame.playSound;
            }
        }
    }

    /**
     * Plays a specific sound clip
     * @param soundClip The specified sound clip
     */
    static playSoundClip(soundClip){
        if(canPlaySound && adventureGame.playSound){
            soundClip.play();
        }
    }

    /**
     * Plays a random sound clip based on a given category
     * @param soundCategory The category of the sound clips
     */
    static playRandomSound(soundCategory){
        if(canPlaySound && adventureGame.playSound){
            let rngClip = UtilityRandom.getRandomInt(0, soundCategory.length-1);
            soundCategory[rngClip].play();
        }
    }

}

export {UtilityMusic};