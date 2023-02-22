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
     * @param dialogText The Text, which is displayed for the dialog
     */
    constructor(dialogText) {
        this.dialogText = dialogText;
        this.dialogOptions = [];
    }

    /**
     * Adds DialogOption to the current Dialog
     * @param{DialogOption} dialogOption
     */
    addDialogOption(dialogOption){
        this.dialogOptions.push(dialogOption);
    }

    /**
     * Displays the current DialogTree with all available DialogOptions
     * @returns {string} The HTML representation of the current DialogTree with all the DialogOptions
     */
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

    /**
     * Selects an DialogOption in the current DialogTree and returns if the option was valid
     * @param{String} command The option, which was selected
     * @returns {boolean|-1} Returns if the chosen options exists
     */
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

    /**
     * Checks if the selected DialogOption has a Bug associated with it.
     * @param{String} command The DialogOption, which was selected
     * @returns {boolean|(function(*): (*|boolean|undefined))|*|(function(String): (*|boolean))|boolean}
     */
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