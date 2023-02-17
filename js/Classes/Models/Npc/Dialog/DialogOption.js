
/**
 * This Class is used to represent the Dialog Option of the Dialog Tree in the game.
 * This DialogOption class is used to store everything necessary for their representation in the game
 * A Dialog is an abstract representation of a specific option that is contained inside a Dialog Tree.
 */
class DialogOption {


    /**
     * The class constructor for the class "DialogOption"
     */
    constructor(optionText, optionLink, hasBug = false, requiredCharisma = 0) {
        this.optionText = optionText;
        this.optionLink = optionLink;
        this.hasBug = hasBug;
        this.requiredCharisma = requiredCharisma;
    }

}

export {DialogOption};