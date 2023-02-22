import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
import {adventureGame} from "../../../../SetUpGame.js";

/**
 * This Class is used to represent the Player-Class "Twitter-User" in the game.
 */
class TwitterUser extends Player{





    className = "Twitter-User";

    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        if(!obj){
            this.stats = {
                Strength : 1,
                Dexterity: 1,
                Constitution: 1,
                Intelligence: 1,
                Wisdom: 1,
                Charisma: 1
            }
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "Send Threats",
                "mp":0,
            },
            {
                "name" : "Bubble-Protection",
                "mp":5,
            },
            {
                "name" : "Canceling",
                "mp":10,
            }
        ];
        this.protection = 0;
    }
    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" class is a unique and challenging role to play. Unfortunately, this class is characterized by its below-average skills and tendency to get easily triggered by any perceived slight or challenge." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, players who have chosen the Twitter class may struggle with social interactions and even simple tasks due to their lack of proficiency in any particular area. However, they make up for this deficiency with their unwavering determination and tendency to become highly agitated or angry when faced with adversity." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[None]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


    resetStats(){
        super.resetStats();
        this.protection = 0;
    }


    ability_attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,4)+this.stats.Strength;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " send Threat via a DM for " + returnObject.dmg + " damage."+ UtilityText.TEXT_SYMBOL.NewLine +
            "Bubble-Protection remaining "+UtilityText.colorText("["+this.protection+"]", UtilityText.TEXT_COLORS.Pink);

        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = 0
            this.protection += 2;
            adventureGame.battleScreen.enemy.receiveDmg(returnObject.heal);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " surrounds themselves in a bubble and negates the next 2 attacks." + UtilityText.TEXT_SYMBOL.NewLine +
                "Bubble-Protection remaining "+UtilityText.colorText("["+this.protection+"]", UtilityText.TEXT_COLORS.Pink);
        }

        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;
            returnObject.dmg = (UtilityRandom.getRandomInt(1,12))+this.stats.Charisma;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " tries to cancel the Enemy for " + returnObject.dmg+ " damage." + UtilityText.TEXT_SYMBOL.NewLine +
            "Bubble-Protection remaining "+UtilityText.colorText("["+this.protection+"]", UtilityText.TEXT_COLORS.Pink);
        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Send Threats";
        returnObject.text = "Sends Threats to the Enemy and does "+
            UtilityText.colorText("1d4 + Str (" + this.stats.Strength+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "Bubble-Protection";
        returnObject.text = "Negates the next 2 Attacks.";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "Canceling";
        returnObject.text = "Cancels the Enemy via Twitter and does "+
            UtilityText.colorText("1d12 + Cha (" + this.stats.Charisma+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }


    receiveDmg(dmg){
        if(this.protection <= 0){
           super.receiveDmg(dmg);
        }else{
            this.protection--;
        }
    }

}

export {TwitterUser};
