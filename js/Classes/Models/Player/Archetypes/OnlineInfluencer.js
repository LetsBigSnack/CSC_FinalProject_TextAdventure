import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";

/**
 * This Class is used to represent the Player-Class "Online Influencer" in the game.
 */
class OnlineInfluencer extends Player{

    stats = {
        Strength : 3,
        Dexterity: 4,
        Constitution: 2,
        Intelligence: 2,
        Wisdom: 1,
        Charisma: 8
    };



    className = "Online Influencer";

    constructor() {
        super();
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
    }

    describe(){
        let description;
        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +", you have built a large following on social media and other online platforms through your charisma, creativity, and ability to connect with others. You are skilled at using the internet and social media to share your message, promote your brand, engage with your audience and defeat your haters." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, they use their quick wit and charm to distract and disarm their opponents while using their social media savvy to gather information and intelligence. They can also use your online presence to rally allies to your cause and either gain support for your actions or use them to damage enemies." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attributes "+ UtilityText.colorText("[Charisma]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


}

export {OnlineInfluencer};
