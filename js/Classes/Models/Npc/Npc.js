import {UtilityText} from "../../Utility/UtilityText.js";
import {DialogOption} from "./Dialog/DialogOption.js";
import {Dialog} from "./Dialog/Dialog.js";

/**
 * This Class is used to represent the "NPC" entity in the game.
 * This NPC class is used to store everything necessary for their representation in the game
 * An NPC is an abstract representation of a non player character that is used in the Game.
 */
class Npc {


    /**
     *     dialogTree = {
     *         0: new Dialog("Dialog 1"),
     *         1: new Dialog("Dialog 2"),
     *         2: new Dialog("Dialog 3")
     *     }
     *     currentDialogIndex = 0;
     */
    /**
     * The class constructor for the class "Player"
     */
    constructor(name) {
        this.name = name;
        // changed map to array
        //TODO see if it will work
        this.dialogTree = [];
        this.currentDialogIndex = 0;
    }

    addDialogTree(dialog){
        this.dialogTree.push(dialog);
    }

    displayDialog(){
        let returnText;
        returnText = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Green)+ ": " + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        returnText += this.dialogTree[this.currentDialogIndex].displayDialogOptions();

        return returnText;
    }

    selectDialogOption(command){
        let chosenOption = this.dialogTree[this.currentDialogIndex].choiceDialogOption(command);
        if(this.dialogTree[chosenOption]){
            this.currentDialogIndex = chosenOption;
            return true;
        }else{
            return chosenOption === -1;
        }
    }

    hasBug(command){
        return this.dialogTree[this.currentDialogIndex].hasBug(command);
    }

}

export {Npc};
