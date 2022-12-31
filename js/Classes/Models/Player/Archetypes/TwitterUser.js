import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";

/**
 * This Class is used to represent the Player-Class "Twitter-User" in the game.
 */
class TwitterUser extends Player{

    stats = {
        Strength : 1,
        Dexterity: 1,
        Constitution: 1,
        Intelligence: 1,
        Wisdom: 1,
        Charisma: 1
    }



    className = "Twitter-User";

    constructor() {
        super();
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
    }
    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" class is a unique and challenging role to play. Unfortunately, this class is characterized by its below-average skills and tendency to get easily triggered by any perceived slight or challenge." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, players who have chosen the Twitter class may struggle with social interactions and even simple tasks due to their lack of proficiency in any particular area. However, they make up for this deficiency with their unwavering determination and tendency to become highly agitated or angry when faced with adversity." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[None]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


}

export {TwitterUser};
