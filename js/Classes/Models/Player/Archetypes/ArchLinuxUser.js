import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
/**
 * This Class is used to represent the Player-Class "Arch-Linux User" in the game.
 */
class ArchLinuxUser extends Player{

    stats = {
        Strength : 2,
        Dexterity: 2,
        Constitution: 3,
        Intelligence: 8,
        Wisdom: 3,
        Charisma: 0
    };


    className = "Arch-Linux User";

    constructor() {
        super();
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
    }

    describe(){
        let description;

        description = "The "+ UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue) +" is a class that combines technical expertise with a love of all things mechanical and technological. As an "+UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Blue)+", you are highly skilled in using and repairing a wide range of technological devices and systems. You are always on the lookout for ways to improve and optimize these devices, and you have a knack for finding creative solutions to complex problems." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "In combat, you use your technical skills to create and deploy a variety of gadgets and devices to support your allies and hinder your enemies. You have a wide range of tools and devices at your disposal to aid you in your battles." + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        description += "Favored attribute "+ UtilityText.colorText("[Intelligence]", UtilityText.TEXT_COLORS.Blue);
        description += UtilityText.TEXT_SYMBOL.NewLine;
        return description;
    }


}

export {ArchLinuxUser};
