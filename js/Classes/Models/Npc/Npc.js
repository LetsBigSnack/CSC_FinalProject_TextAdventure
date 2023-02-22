import {UtilityText} from "../../Utility/UtilityText.js";
import {Dialog} from "./Dialog/Dialog.js";
/**
 * This Class is used to represent the "NPC" entity in the game.
 * This NPC class is used to store everything necessary for their representation in the game
 * An NPC is an abstract representation of a non player character (NPC) that is used in the Game.
 */
class Npc {


    /**
     * The class constructor for the class "NPC"
     * @param{String} name The name of the NPC
     */
    constructor(name) {
        this.name = name;
        this.dialogTree = [];
        this.currentDialogIndex = 0;
    }

    /**
     * Adds and DialogTree to the NPC
     * @param{Dialog} dialog The DialogTree, which will be added to the NPC
     */
    addDialogTree(dialog){
        this.dialogTree.push(dialog);
    }

    /**
     * Displays the current DialogTree with all available DialogOptions
     * @returns {string} The HTML representation of the current DialogTree with all the DialogOptions
     */
    displayDialog(){
        let returnText;
        returnText = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Green)+ ": " + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        returnText += this.dialogTree[this.currentDialogIndex].displayDialogOptions();

        return returnText;
    }

    /**
     * Selects an DialogOption in the current DialogTree and returns if the option was valid
     * @param{String} command The option, which was selected
     * @returns {boolean} Returns if the chosen options exists
     */
    selectDialogOption(command){
        let chosenOption = this.dialogTree[this.currentDialogIndex].choiceDialogOption(command);
        if(this.dialogTree[chosenOption]){
            this.currentDialogIndex = chosenOption;
            return true;
        }else{
            return chosenOption === -1;
        }
    }

    /**
     * Checks if the selected DialogOption has a Bug associated with it.
     * @param{String} command The DialogOption, which was selected
     * @returns {*|boolean} Returns if the chosen option has a bug or is not defined
     */
    hasBug(command){
        return this.dialogTree[this.currentDialogIndex].hasBug(command);
    }

}

export {Npc};
