import {UtilityText} from "../Utility/UtilityText.js";

/**
 * This Class is used to represent the "Bug" entities in the game.
 * This Bug class is used to store everything necessary for the representation in the game
 * Which are collectable Achievements one can discover during their play through and are needed to complete the Game
 */
class Bug {


    /**
     * The class constructor for the class "Bug"
     * @param {String} name Name of the bug
     * @param {String} description Description of the bug
     * @param {String} event Even on which the Bug is triggered
     * @param {Room} room Room connected to the bug
     * @param {Bug} obj Object which this Object will be copied to (if not empty)
     */
    constructor(name, description, event, room, obj=null) {
        this.name = name;
        this.description = description;
        this.event = event;
        this.discovered = false;
        this.room = room;
        if(obj){
            obj && Object.assign(this, obj);
        }
    }

    /**
     * Checks if the current Bug has already been discovered by the Player
     * @returns {boolean} Returns if the Bugs has already been discovered
     */
    hasBeenFound(){
        return this.discovered;
    }

    /**
     * Generates and returns a description of the Bug
     * @returns {string} Returns a full description of the Bug in an HTML-Format
     */
    getDescription(){
        let desc = UtilityText.TEXT_SYMBOL.NewEmptyLine;
        desc += UtilityText.colorText("Bug Found: "+this.name, UtilityText.TEXT_COLORS.Green) + UtilityText.TEXT_SYMBOL.NewLine;
        desc += this.description + UtilityText.TEXT_SYMBOL.NewLine;
        return desc;
    }

    /**
     * Sets the status of the Bug to discovered
     */
    discover(){
        this.discovered = true;
    }
}

export {Bug};
