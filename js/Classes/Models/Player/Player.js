import {UtilityText} from "../../Utility/UtilityText.js";

class Player {

    className = "Player";
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

    default_stats = {
        Strength : 3,
        Dexterity: 3,
        Constitution: 3,
        Intelligence: 3,
        Wisdom: 3,
        Charisma: 3
    };

    constructor() {
        this.name = "Player";
        this.health;
        this.level = 1;
    }

    describe(){
        return "I am a player";
    }


    addStat(statName){
        if(this.stats[statName] < this.maxStat && this.statPoints > 0){
            this.stats[statName]++;
            this.statPoints--;
        }
    }

    subStat(statName){
        //TODO Check default value [maybe]
        if(this.stats[statName] > this.default_stats[statName]){
            this.stats[statName]--;
            this.statPoints++;
        }
    }

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
