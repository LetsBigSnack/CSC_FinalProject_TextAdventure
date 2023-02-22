
/**
 * This Class is used to represent the Dialog Option of the Dialog Tree in the game.
 * This DialogOption class is used to store everything necessary for their representation in the game
 */
class DialogOption {


    /**
     * The class constructor for the class "DialogOption"
     * @param optionText The Text, which is shown for the Option
     * @param optionLink The Connection to the DialogTree after selection
     * @param hasBug If the DialogOption unlocks a bug
     * @param requiredCharisma The required Charisma value to select this DialogOption
     */
    constructor(optionText, optionLink, hasBug = false, requiredCharisma = 0) {
        this.optionText = optionText;
        this.optionLink = optionLink;
        this.hasBug = hasBug;
        this.requiredCharisma = requiredCharisma;
    }

}

export {DialogOption};