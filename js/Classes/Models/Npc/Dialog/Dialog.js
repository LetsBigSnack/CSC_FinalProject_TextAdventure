import {DialogOption} from "./DialogOption.js";
import {UtilityText} from "../../../Utility/UtilityText.js";
import {adventureGame} from "../../../../SetUpGame.js";

/**
 * This Class is used to represent the Dialog Tree in the game.
 * This Dialog class is used to store everything necessary for their representation in the game
 * A Dialog is an abstract representation of all the different option that are displayed when initiating a dialog.
 */
class Dialog {

    /**
     * The class constructor for the class "Dialog"
     */
    constructor(dialogText) {
        this.dialogText = dialogText;
        this.dialogOptions = [];
    }

    /**
     *
     * @param{DialogOption} dialogOption
     */
    addDialogOption(dialogOption){
        this.dialogOptions.push(dialogOption);
    }

    displayDialogOptions(){
        let returnText;
        returnText = this.dialogText + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        this.dialogOptions.forEach((value,index) => {
            if(value.requiredCharisma >  adventureGame.player.stats["Charisma"]){
                returnText += UtilityText.emphasizeFirstLetter(index+"", "[", "]", UtilityText.TEXT_COLORS.Blue) + " [Requires Charisma of "+ value.requiredCharisma+"]" + UtilityText.TEXT_SYMBOL.NewLine;
            }else{
                returnText += UtilityText.emphasizeFirstLetter(index+"", "[", "]", UtilityText.TEXT_COLORS.Blue) + " "+value.optionText + UtilityText.TEXT_SYMBOL.NewLine;
            }
        })
        returnText +=UtilityText.emphasizeFirstLetter("X", "[", "]", UtilityText.TEXT_COLORS.Red) + " Exit Dialog" + UtilityText.TEXT_SYMBOL.NewLine;

        return returnText;
    }

    choiceDialogOption(command){
        try {
            if(this.dialogOptions[Number(command)].requiredCharisma <=  adventureGame.player.stats["Charisma"]){
                return this.dialogOptions[Number(command)].optionLink;
            }else{
                return -1;
            }
        }catch (e) {
            return undefined
        }
    }

    hasBug(command){
        try{
            if(this.dialogOptions[Number(command)].requiredCharisma <=  adventureGame.player.stats["Charisma"]){
                return this.dialogOptions[Number(command)].hasBug;
            }else{
                return false;
            }
        }catch (e) {
            return false;
        }

    }

}

export {Dialog};