import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
/**
 * This Class is used to represent the Player-Class "Furry" in the game.
 */
class Furry extends Player{

    stats = {
        Strength : 3,
        Dexterity: 2,
        Constitution: 3,
        Intelligence: 2,
        Wisdom: 8,
        Charisma: 0
    };

    className = "Furry";

    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
    }
    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a type of shape-shifting class that can transform into powerful fursonas. They are highly skilled in physical combat and excel at dealing damage in close quarters. In human form, they possess heightened senses and agility, allowing them to move stealthily and track their enemies." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, they transform into their fursona form, gaining increased strength, speed, and durability, making them formidable opponents on the battlefield. They also have the ability to heal quickly from injuries, making them difficult to take down." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[Wisdom]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


}

export {Furry};
