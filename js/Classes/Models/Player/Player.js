import {UtilityText} from "../../Utility/UtilityText.js";

/**
 * This Class is used to represent the "Player" entity in the game.
 * This Player class is used to store everything necessary for their representation in the game
 * A Player is an abstract representation of the character the user plays as in the Game.
 */
class Player {

    className = "Player";
    maxHealth;
    currentHealth;
    maxStat = 10;
    statPoints = 12;

    stats = {
        Strength : 3,
        Dexterity: 3,
        Constitution: 3,
        Intelligence: 3,
        Wisdom: 3,
        Charisma: 3
    };

    /**
     * The class constructor for the class "Player"
     */
    constructor() {
        this.name = "Player";
        this.default_stats = Object.assign({}, this.stats);
        this.maxHealth = undefined;
        this.currentHealth = undefined;
        this.level = 1;
    }

    /**
     * Returns a short description of the Player-Class
     * @returns {string} Returns the Class Description
     */
    describe(){
        return "I am a Player-Class";
    }

    /**
     * Adds a point to a specific Stat / Attribute if possible and spends a statPoint
     * @param {string} statName The stat name in question.
     */
    addStat(statName){
        if(this.stats[statName] < this.maxStat && this.statPoints > 0){
            this.stats[statName]++;
            this.statPoints--;
        }
    }

    /**
     * Subtracts a point to a specific Stat / Attribute if possible and gains a statPoint
     * @param {string} statName The stat name in question.
     */
    subStat(statName){
        //TODO Check default value [maybe]
        if(this.stats[statName] > this.default_stats[statName]){
            this.stats[statName]--;
            this.statPoints++;
        }
    }

    /**
     * Gives a short Overview of the Character / Player
     * @returns {string} Returns an HTML-String representation of the Player and their Stats.
     */
    overview(){
        let returnText;
        returnText = UtilityText.colorText("Overview", UtilityText.TEXT_COLORS.Blue) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Name: " + UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Pink) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Class: " + UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Green) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Attributes: " + UtilityText.TEXT_SYMBOL.NewLine;
        for (const statName in this.stats) {
            returnText += UtilityText.TEXT_SYMBOL.Tab + "- "+ UtilityText.colorText(statName, UtilityText.TEXT_COLORS.Gold) + " : " + this.stats[statName] + UtilityText.TEXT_SYMBOL.NewLine;
        }
        return returnText;
    }

    //TODO worry about abilities and classes later
}

export {Player};
