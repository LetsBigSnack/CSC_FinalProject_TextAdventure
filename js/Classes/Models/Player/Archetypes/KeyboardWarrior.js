import {Player} from "../Player.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
/**
 * This Class is used to represent the Player-Class "Keyboard Warrior" in the game.
 */
class KeyboardWarrior extends Player{

    stats = {
        Strength : 8,
        Dexterity: 3,
        Constitution: 4,
        Intelligence: 0,
        Wisdom: 1,
        Charisma: 2
    };

    className = "Keyboard Warrior";

    /**
     * The class constructor for the class "Player"
     */
    constructor(obj = null) {
        super(obj);
        //If it's just in the super-constructor it will not work :C
        this.default_stats = Object.assign({}, this.stats);
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


}

export {KeyboardWarrior};
