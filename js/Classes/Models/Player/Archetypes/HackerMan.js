import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
import {adventureGame} from "../../../../SetUpGame.js";

/**
 * This Class is used to represent the Player-Class "H4ck3r-M4n" in the game.
 */
class HackerMan extends Player{


    className = "H4ck3r-M4n";
    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        if(!obj){
            this.stats = {
                Strength : 2,
                Dexterity: 6,
                Constitution: 2,
                Intelligence: 4,
                Wisdom: 2,
                Charisma: 2
            };
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "Brute Force",
                "mp":0,
            },
            {
                "name" : "Trojan",
                "mp":5,
            },
            {
                "name" : "Ping",
                "mp":10,
            }
        ];
    }



    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a class that specializes in the use of technology and hacking in combat situations. In addition, they are highly skilled at manipulating and controlling electronic devices, including computer systems and robotics." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat,  they can use their skills to disable or manipulate enemy technology or even take control of robotic enemies to turn them against their creators. They are also skilled at using their knowledge of computer systems to gather information, hack into secure networks, and disrupt communication channels." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attributes "+ UtilityText.colorText("[Dexterity][Intelligence]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }

    ability_attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,8)+this.stats.Dexterity;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " brute forced their Password for " + returnObject.dmg + " damage.";

        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = UtilityRandom.getRandomInt(1,8)+this.stats.Intelligence;
            adventureGame.battleScreen.enemy.receiveDmg(returnObject.heal);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " stolen " + returnObject.heal + " HP from the Enemy.";
        }

        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;
            returnObject.dmg = (UtilityRandom.getRandomInt(1,6))+(UtilityRandom.getRandomInt(1,6))+(UtilityRandom.getRandomInt(1,6))+(UtilityRandom.getRandomInt(1,6))+this.stats.Intelligence;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " 4* ping 127.0.0.1/Enemy.js bytes=32 time=16ms TTL=118 dmg=" + returnObject.dmg+ " damage.";
        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Brute Force";
        returnObject.text = "Brute forces the Enemy's Password and does "+
            UtilityText.colorText("1d8 + Dex (" + this.stats.Dexterity+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "Trojan";
        returnObject.text = "Steals Enemy's health using a Trojan and heals "+
            UtilityText.colorText("1d8 + Int (" + this.stats.Intelligence+")", UtilityText.TEXT_COLORS.Pink)+  " HP.";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "Ping";
        returnObject.text = "Pings the Enemy 4 times and deals "+
            UtilityText.colorText("4d6 + Int (" + this.stats.Intelligence+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

}

export {HackerMan};
