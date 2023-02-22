import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
import {adventureGame} from "../../../../SetUpGame.js";
/**
 * This Class is used to represent the Player-Class "Arch-Linux User" in the game.
 */
class ArchLinuxUser extends Player{




    className = "Arch-Linux User";

    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        if(!obj){
            this.stats = {
                Strength : 2,
                Dexterity: 2,
                Constitution: 3,
                Intelligence: 8,
                Wisdom: 3,
                Charisma: 0
            };
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "Git Push",
                "mp":0,
            },
            {
                "name" : "sudo pacman -Syu",
                "mp":5,
            },
            {
                "name" : "StackOverFlow",
                "mp":10,
            }
        ];
    }

    describe(){
        let description;

        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a class that combines technical expertise with a love of all things mechanical and technological. As an "+UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue)+", you are highly skilled in using and repairing a wide range of technological devices and systems. You are always on the lookout for ways to improve and optimize these devices, and you have a knack for finding creative solutions to complex problems." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, you use your technical skills to create and deploy a variety of gadgets and devices to support your allies and hinder your enemies. You have a wide range of tools and devices at your disposal to aid you in your battles." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[Intelligence]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }

    ability_attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,6)+this.stats.Intelligence;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " Push to Main-Repository for " + returnObject.dmg + " damage.";

        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = UtilityRandom.getRandomInt(1,4)+UtilityRandom.getRandomInt(1,4)+this.stats.Wisdom;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " upgraded the System for " + returnObject.heal + " HP.";
        }

        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            let enemy = adventureGame.battleScreen.enemy;
            this.currentMana = this.currentMana-this.abilities[2].mp;
            returnObject.dmg = UtilityRandom.getRandomInt(1,enemy.maxHealth);
            let overflow = enemy.currentHealth+returnObject.dmg;
            if(overflow > enemy.maxHealth){
                overflow -= enemy.maxHealth;
            }else{
                overflow = returnObject.dmg;
            }
            enemy.currentHealth = overflow;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " overflows Enemies life and sets is to " + overflow + " HP.";
            returnObject.dmg = 0;
        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Git Push";
        returnObject.text = "Pushes to Main Repository and does "+
            UtilityText.colorText("1d6 + Int (" + this.stats.Intelligence+")", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "sudo pacman -Syu";
        returnObject.text = "Upgrades the System and heals "+
            UtilityText.colorText("2d4 + Wis (" + this.stats.Wisdom+")", UtilityText.TEXT_COLORS.Pink)+  " HP.";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "StackOverFlow";
        returnObject.text = "Adds random Value to Enemy-Health, if it would overflow set it to the overflow value.";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }


}

export {ArchLinuxUser};
