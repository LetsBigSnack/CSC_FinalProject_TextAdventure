import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";

/**
 * This Class is used to represent the Player-Class "H4ck3r-M4n" in the game.
 */
class HackerMan extends Player{

    stats = {
        Strength : 2,
        Dexterity: 6,
        Constitution: 2,
        Intelligence: 4,
        Wisdom: 2,
        Charisma: 2
    };
    className = "H4ck3r-M4n";
    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
    }



    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a class that specializes in the use of technology and hacking in combat situations. In addition, they are highly skilled at manipulating and controlling electronic devices, including computer systems and robotics." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat,  they can use their skills to disable or manipulate enemy technology or even take control of robotic enemies to turn them against their creators. They are also skilled at using their knowledge of computer systems to gather information, hack into secure networks, and disrupt communication channels." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attributes "+ UtilityText.colorText("[Dexterity][Intelligence]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }



}

export {HackerMan};
