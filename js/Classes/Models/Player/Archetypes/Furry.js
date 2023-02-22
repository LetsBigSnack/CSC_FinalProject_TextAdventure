import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
/**
 * This Class is used to represent the Player-Class "Furry" in the game.
 */
class Furry extends Player{



    className = "Furry";

    constructor(obj = null) {
        super(obj);

        if(!obj){
            this.stats = {
                Strength : 3,
                Dexterity: 2,
                Constitution: 3,
                Intelligence: 2,
                Wisdom: 8,
                Charisma: 0
            };
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "Punch",
                "mp":0,
            },
            {
                "name" : "Meditate",
                "mp":5,
            },
            {
                "name" : "Transform",
                "mp":10,
            }
        ];
        this.transformed = false;
    }

    resetStats(){
        super.resetStats();
        this.abilities = [
            {
                "name" : "Punch",
                "mp":0,
            },
            {
                "name" : "Meditate",
                "mp":5,
            },
            {
                "name" : "Transform",
                "mp":10,
            }
        ];
        this.transformed = false;
    }

    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a type of shape-shifting class that can transform into powerful fursonas. They are highly skilled in physical combat and excel at dealing damage in close quarters. In human form, they possess heightened senses and agility, allowing them to move stealthily and track their enemies." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, they transform into their fursona form, gaining increased strength, speed, and durability, making them formidable opponents on the battlefield. They also have the ability to heal quickly from injuries, making them difficult to take down." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[Wisdom]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }

    ability_attack(){

        let returnObject = {};
        returnObject.dmg = 0;
        returnObject.text = "";

        if(this.transformed){
            returnObject.dmg = UtilityRandom.getRandomInt(1,8)+this.stats.Wisdom+this.stats.Strength;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " slashes with their claw for " + returnObject.dmg + " damage.";

        }else{
            returnObject.dmg = UtilityRandom.getRandomInt(1,6)+this.stats.Wisdom;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " punches for " + returnObject.dmg + " damage.";
        }


        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;

            returnObject.text = "";

            if(this.transformed){
                returnObject.dmg = UtilityRandom.getRandomInt(1,12)+this.stats.Strength;
                returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " bites for " + returnObject.dmg + " damage.";

            }else{
                returnObject.heal = UtilityRandom.getRandomInt(1,4)+UtilityRandom.getRandomInt(1,4)+this.stats.Wisdom;
                returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " meditates and heals " + returnObject.heal + " HP.";
            }
        }
        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;

            returnObject.text = "";

            if(this.transformed){
                returnObject.heal = UtilityRandom.getRandomInt(1,10)+UtilityRandom.getRandomInt(1,10)+this.stats.Wisdom;
                returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " reverts to their Human form and heals " + returnObject.heal + " HP.";

            }else{
                returnObject.heal = 0;
                returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " transforms into their Fursona.";
                this.transformed = true;
                this.abilities = [
                    {
                        "name" : "Claw slash",
                        "mp":0,
                    },
                    {
                        "name" : "Bite",
                        "mp":5,
                    },
                    {
                        "name" : "Revert",
                        "mp":10,
                    }
                ];
            }

        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Punch / Claw slash";
        returnObject.text = "Punches for "+
            UtilityText.colorText("1d6 + Wis (" + this.stats.Wisdom+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewEmptyLine + "Slashes with claw for "+
            UtilityText.colorText("1d8 + Wis (" + this.stats.Wisdom+") + Str (" + this.stats.Strength+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;

        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "Meditate / Bite";
        returnObject.text = "Meditates and heals "+
            UtilityText.colorText("2d4 + Wis (" + this.stats.Wisdom+")", UtilityText.TEXT_COLORS.Pink)+  " HP." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewEmptyLine + "Bites for "+
            UtilityText.colorText("1d12 + Str (" + this.stats.Strength+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;

        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "Transform / Revert";

        returnObject.text = "Transforms into their Fursona.";

        returnObject.text += UtilityText.TEXT_SYMBOL.NewEmptyLine + "Reverts back to their Human from and heals for "+
            UtilityText.colorText("2d10 + Wis (" + this.stats.Wisdom+")", UtilityText.TEXT_COLORS.Pink)+  " HP." ;


        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

}

export {Furry};
