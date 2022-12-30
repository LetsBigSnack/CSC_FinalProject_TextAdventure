import {UtilityText} from "../Utility/UtilityText.js";
import {contentText, score, locationText} from "../../SetUpGame.js";
import {UtilityFiles} from "../Utility/UtilityFiles.js";
import {UtilityGame} from "../Utility/UtilityGame.js";
import {CharacterCreator} from "./CharacterCreator.js";

/**
 * This Class is used to represent the "AdventureGame" and it's GameLoop.
 * This AdventureGame class is used to store everything necessary for the game.
 * AdventureGame handles user input and the entities within the game.
 */
class AdventureGame {

    // STATIC CONSTANT
    static DIRECTIONS = {
        North: 0,
        East: 1,
        South: 2,
        West: 3
    }
    static EVENT = {
        Look : 0,
        Talk : 1
    }

    static States = {
        Start : 0,
        CharacterCreation : 1,
        Explore : 2,
        Dialog: 3,
        Battle: 4,
        Inventory: 5
    }
    static USER_INPUT = {
        StartGame : "S",
        North : "N",
        East: "E",
        South: "S",
        West: "W",
        Talk: "T",
        Look: "L",
        Quit: "Q",
        Clear: "CLEAR",
        Star_Wars: "STAR WARS",
        Confirm : "Y",
        Cancel : "N"
    }

    /**
     * The class constructor for the class "AdventureGame"
     */
    constructor() {
        this.bugScore = 0;
        this.bugList = [];
        this.currentRoom = undefined;
        this.roomList = [];
        this.gamefinished = false;
        this.currentState = AdventureGame.States.Start;
        this.setUp("../jsonData/rooms.json").then();
        this.characterCreator = new CharacterCreator();
        this.player = undefined;
    }

    /**
     * Handles user interaction based on the current game State
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
    interact(command) {
        let returnText = UtilityText.TEXT_SYMBOL.TerminalArrow + UtilityText.colorText(command, UtilityText.TEXT_COLORS.Blue) + UtilityText.TEXT_SYMBOL.NewEmptyLine;

        switch (this.currentState) {
            case AdventureGame.States.Start:
                returnText += this.startGame(command);
                break;
            case AdventureGame.States.CharacterCreation:
                returnText += this.createChar(command);
                break;
            case AdventureGame.States.Explore:
                returnText += this.exploreGame(command);
                break;
        }

        if(this.currentRoom){
            locationText.innerHTML = this.currentRoom.getLocation();
        }

        this.setScoreBoard();

        if(this.bugScore === this.bugList.length && !this.gamefinished){
            returnText += UtilityText.TEXT_SYMBOL.NewEmptyLine;
            returnText += UtilityText.colorText("You have found all the bugs in the codebase, sadly your internship is unpaid so don't expect anything as the reward. You can explore the rest of the codebase or if you want to have some fun type in 'Star Wars' as a command", UtilityText.TEXT_COLORS.Gold);
            this.gamefinished = true
        }

        return returnText;
    }

    /**
     * Handles all user interaction which isn't specified in the other game states
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
    defaultCommands(command){
        let returnText;
        switch (command){
            case AdventureGame.USER_INPUT.Clear:
                contentText.innerHTML = "";
                if(this.currentRoom){
                    returnText = this.currentRoom.describe();
                }else{
                    returnText = UtilityText.PREDEFINED_TEXT.Start;
                }
                break;
            case AdventureGame.USER_INPUT.Quit:
                // QUIT
                break;
            default:
                returnText = UtilityText.colorText("BEEP BOOP COMMAND undefined", UtilityText.TEXT_COLORS.Red);
        }
        return returnText;
    }

    /**
     * Handles all user in the game state "Start"
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
    startGame(command){
        let returnText;
        switch (command){
            case AdventureGame.USER_INPUT.StartGame:
                // StartGame
                this.currentState = AdventureGame.States.CharacterCreation;
                returnText = UtilityText.colorText("Create your Character!", UtilityText.TEXT_COLORS.Gold) + UtilityText.TEXT_SYMBOL.NewEmptyLine;
                returnText += this.characterCreator.describe();
                break;
            default:
                returnText = this.defaultCommands(command)
        }
        return returnText;
    }

    createChar(command){
        let returnText;

        returnText = this.characterCreator.createCharacter(command);

        if(this.characterCreator.currentStep === CharacterCreator.CREATION_STEPS.Done){
            this.currentState = AdventureGame.States.Explore;
            this.currentRoom = this.roomList[0];
            this.player = this.characterCreator.selectedClass;
            returnText += UtilityText.TEXT_SYMBOL.NewEmptyLine + this.currentRoom.describe();
        }

        return returnText;
    }

    /**
     * Handles all user in the game state "Explore"
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
    exploreGame(command){
        let returnText;

        switch (command){
            case AdventureGame.USER_INPUT.North:
            case AdventureGame.USER_INPUT.East:
            case AdventureGame.USER_INPUT.South:
            case AdventureGame.USER_INPUT.West:
                let newRoomID = this.currentRoom.travelTo(command);
                let newRoom = this.roomList[newRoomID];
                if (newRoom) {
                    this.currentRoom = newRoom;
                    returnText = this.currentRoom.describe();
                } else {
                    returnText = "You can't go in this direction";
                }
                break;
            case AdventureGame.USER_INPUT.Look:
                returnText = this.currentRoom.lookAt();
                break;
            case AdventureGame.USER_INPUT.Talk:
                returnText = this.currentRoom.talkTo();
                break;
            default:
                returnText = this.defaultCommands(command)
        }
        return returnText;
    }
    /**
     * Sets up the Game based on information, which is contained in a JSON-File
     * @param {string} path The Path to the JSON-File
     */
    async setUp(path) {
        let jsonRoomsData = await UtilityFiles.readFile(path);
        this.roomList = UtilityGame.importRooms(jsonRoomsData);
        this.bugList = UtilityGame.importBug(jsonRoomsData, this.roomList);
        this.setScoreBoard();
    }

    /**
     * Imports the current game state based on information in a JSON-String
     * @param {string} jsonString The JSON-String which contains all the useful information
     */
    importGame(jsonString){

        UtilityGame.importGameFile(jsonString);

        contentText.innerHTML = "";
        contentText.innerHTML += this.currentRoom.describe();
        this.setScoreBoard();
    }

    /**
     * Updates the Scoreboard
     */
    setScoreBoard(){
        let foundBugs = this.bugList.filter(element => element.discovered);
        if(foundBugs){
            this.bugScore = foundBugs.length;
        }
        score.innerHTML = this.bugScore + " / " + this.bugList.length + " Bugs";
    }

}

export {AdventureGame};
