import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
import {adventureGame} from "../../../../SetUpGame.js";
/**
 * This Class is used to represent the Player-Class "Keyboard Warrior" in the game.
 */
class KeyboardWarrior extends Player{



    className = "Keyboard Warrior";

    /**
     * The class constructor for the class "Player"
     */
    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        if(!obj){
            this.stats = {
                Strength : 8,
                Dexterity: 3,
                Constitution: 4,
                Intelligence: 0,
                Wisdom: 1,
                Charisma: 2
            };
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "CTRL + ALT + DEL",
                "mp":0,
            },
            {
                "name" : "F5",
                "mp":5,
            },
            {
                "name" : "ALT + F4",
                "mp":10,
            }
        ];
        this.tantrum = this.level;
    }

    resetStats(){
        super.resetStats();
        this.tantrum = this.level;
    }

    /**
     * Returns a short description of the Player-Class
     * @returns {string} Returns the Class Description
     */
    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a fierce and formidable class, skilled in the art of bashing and smashing through their enemies with unrelenting ferocity. They are masters of keyboard-based combat, using their quick typing skills and ability to navigate complex menus to outmaneuver and defeat their foes." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat,  they use their tantrum skill to gain a bonus for their damage. They are also skilled in the use of various emoticons and text-based attacks, allowing them to unleash a barrage of insults and taunts upon their enemies, distracting and demoralizing them in the heat of battle." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[Strength]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }

    ability_attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,12)+this.stats.Strength+this.tantrum;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " presses CTRL + ALT + DEL and deals " + returnObject.dmg + " damage."+ UtilityText.TEXT_SYMBOL.NewLine +
            " Tantrum-Bonus "+UtilityText.colorText("["+this.tantrum+"]", UtilityText.TEXT_COLORS.Pink);

        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = 0;
            this.tantrum += 2;
            adventureGame.battleScreen.enemy.receiveDmg(returnObject.heal);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " adds 2 points to his Tantrum." + UtilityText.TEXT_SYMBOL.NewLine +
                "Tantrum-Bonus "+UtilityText.colorText("["+this.tantrum+"]", UtilityText.TEXT_COLORS.Pink);
        }

        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;
            let percentDMG = (UtilityRandom.getRandomInt(50,90))*0.01;
            returnObject.dmg = Math.round(adventureGame.battleScreen.enemy.currentHealth * percentDMG);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " deals " + Math.round(percentDMG*100)+ "% of the Enemy's health as damage."+ UtilityText.TEXT_SYMBOL.NewLine +
                "Tantrum-Bonus "+UtilityText.colorText("["+this.tantrum+"]", UtilityText.TEXT_COLORS.Pink);
            console.log(returnObject.dmg);
        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "CTRL + ALT + DEL";
        returnObject.text = "Presses CTRL + ALT + DEL and deals "+
            UtilityText.colorText("1d12 + Str (" + this.stats.Strength+") + Tantrum", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "F5";
        returnObject.text = "Adds  2 points to the Tantrum";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "ALT + F4";
        returnObject.text = "Presses Alt + F4 and deals "+
            UtilityText.colorText("50-90%", UtilityText.TEXT_COLORS.Pink)+  " of Enemy health as damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }
}

export {KeyboardWarrior};
