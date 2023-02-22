import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {UtilityRandom} from "../../../Utility/UtilityRandom.js";
import {adventureGame} from "../../../../SetUpGame.js";

/**
 * This Class is used to represent the Player-Class "Online Influencer" in the game.
 */
class OnlineInfluencer extends Player{




    className = "Online Influencer";

    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        if(!obj){
            this.stats = {
                Strength : 3,
                Dexterity: 4,
                Constitution: 2,
                Intelligence: 2,
                Wisdom: 1,
                Charisma: 8
            };
            this.default_stats = Object.assign({}, this.stats);
        }
        this.abilities = [
            {
                "name" : "Crypto Scam",
                "mp":0,
            },
            {
                "name" : "Buy Followers",
                "mp":5,
            },
            {
                "name" : "Call Followers",
                "mp":10,
            }
        ];
        this.followers = 1;
    }

    resetStats(){
        super.resetStats();
        this.followers = this.level;
    }


    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +", you have built a large following on social media and other online platforms through your charisma, creativity, and ability to connect with others. You are skilled at using the internet and social media to share your message, promote your brand, engage with your audience and defeat your haters." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, they use their quick wit and charm to distract and disarm their opponents while using their social media savvy to gather information and intelligence. They can also use your online presence to rally allies to your cause and either gain support for your actions or use them to damage enemies." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attributes "+ UtilityText.colorText("[Charisma]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


    ability_attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,8)+this.stats.Charisma+this.followers;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " advertises a Crypto Scam for " + returnObject.dmg + " damage."+ UtilityText.TEXT_SYMBOL.NewLine +
            "Followers "+UtilityText.colorText("["+this.followers+"]", UtilityText.TEXT_COLORS.Pink);

        return returnObject;
    }

    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = UtilityRandom.getRandomInt(1,6)+this.stats.Wisdom+this.followers;
            this.followers += 2;
            adventureGame.battleScreen.enemy.receiveDmg(returnObject.heal);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " buys 2 Followers and heals for " + returnObject.heal + " HP."+ UtilityText.TEXT_SYMBOL.NewLine +
                "Followers "+UtilityText.colorText("["+this.followers+"]", UtilityText.TEXT_COLORS.Pink);
        }

        return returnObject;

    }

    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;
            returnObject.dmg = (UtilityRandom.getRandomInt(1,8))+(UtilityRandom.getRandomInt(1,8))+this.stats.Charisma+this.followers;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " mobilizes their Followers for " + returnObject.dmg+ " damage."+ UtilityText.TEXT_SYMBOL.NewLine +
                "Followers "+UtilityText.colorText("["+this.followers+"]", UtilityText.TEXT_COLORS.Pink);
        }
        return returnObject;
    }

    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Crypto Scam";
        returnObject.text = "Advertises a Crypto Scam and deals "+
            UtilityText.colorText("1d8 + Cha (" + this.stats.Charisma+") + Followers", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[0]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Heal(){
        let returnObject = {};
        returnObject.name = "Buy Followers";
        returnObject.text = "Buys 2 Followers and heals for "+
            UtilityText.colorText("1d6 + Wis (" + this.stats.Wisdom+") + Followers", UtilityText.TEXT_COLORS.Pink)+  " HP.";
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[5]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }

    describe_Ult(){
        let returnObject = {};
        returnObject.name = "Call Followers";
        returnObject.text = "Mobilizes their Followers and deals "+
            UtilityText.colorText("2d8 + Cha (" + this.stats.Charisma+") + Followers", UtilityText.TEXT_COLORS.Pink)+  " damage." ;
        returnObject.text += UtilityText.TEXT_SYMBOL.NewLine + "Costs: "+ UtilityText.colorText("[10]", UtilityText.TEXT_COLORS.DarkBlue) + " MP";
        return returnObject;
    }


}

export {OnlineInfluencer};
