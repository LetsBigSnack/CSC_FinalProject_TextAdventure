import {UtilityText} from "../Utility/UtilityText.js";
import {contentText, score, locationText, content} from "../../SetUpGame.js";
import {UtilityFiles} from "../Utility/UtilityFiles.js";
import {UtilityGame} from "../Utility/UtilityGame.js";
import {CharacterCreator} from "./CharacterCreator.js";
import {Battle} from "./Battle.js";
import {CharacterSheet} from "./CharacterSheet.js";
import {UtilityMusic} from "../Utility/UtilityMusic.js";

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
        CharacterSheet: 5,
        Dungeoneering: 6
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
        Confirm : "Y",
        Cancel : "N",
        ExitDialog: "X",
        CharacterSheet: "C",
        EnterDungeon: "X"
    }

    /**
     * The class constructor for the class "AdventureGame"
     */
    constructor() {
        this.playSound = false;
        this.bugScore = 0;
        this.bugList = [];
        this.currentRoom = undefined;
        this.roomList = [];
        this.gamefinished = false;
        this.currentState = AdventureGame.States.Start;
        this.characterSheet = new CharacterSheet();
        this.setUp("../jsonData/").then();
        this.characterCreator = new CharacterCreator();
        this.battleScreen = new Battle();
        this.player = undefined;
        this.isInDungeon = false;
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
            case AdventureGame.States.Dialog:
                returnText += this.executeDialog(command);
                break;
            case AdventureGame.States.Battle:
                this.fightBattle(command);
                break;
            case AdventureGame.States.CharacterSheet:

                break;
            case AdventureGame.States.Dungeoneering:
                returnText += this.exploreDungeon(command);
                break;
        }

        if(this.currentRoom){
            if(this.currentState === AdventureGame.States.Battle){
                locationText.innerHTML = "Battle";
            }else if(this.currentState === AdventureGame.States.CharacterSheet){
                locationText.innerHTML = "Character Sheet";
            } else{
                locationText.innerHTML = this.currentRoom.getLocation();

            }
        }

        this.setScoreBoard();

        if(this.bugScore === this.bugList.length && !this.gamefinished){
            returnText += UtilityText.TEXT_SYMBOL.NewEmptyLine;
            returnText += UtilityText.colorText("You have found all the bugs in the codebase, sadly your internship is unpaid so don't expect anything as the reward. You can explore the rest of the codebase.", UtilityText.TEXT_COLORS.Gold);
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
                if(this.currentRoom){
                    returnText += UtilityText.TEXT_SYMBOL.NewEmptyLine + this.currentRoom.displayOptions();
                }
          }
        return returnText;
    }

    /**
     * Handles all user interaction in the game state "Start"
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

    /**
     * Handles all user interaction in the game state "Character Creation"
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
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
                this.currentRoom.startDialog();
                returnText = this.executeDialog();

                if(returnText !== "There is nobody to talk to."){
                    this.currentState = AdventureGame.States.Dialog;
                }
                break;
            case AdventureGame.USER_INPUT.CharacterSheet:
                returnText = "";
                this.displayCharacterSheet();
                this.currentState = AdventureGame.States.CharacterSheet;
                break;
            case AdventureGame.USER_INPUT.EnterDungeon:
                if(this.currentRoom.isDungeon){
                    this.clearScreen(false);
                    this.startDungeon();
                    returnText = UtilityText.colorText("Dungeon entered!", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewEmptyLine;
                    returnText += this.currentRoom.exploreDungeon("Start");
                }else{
                    returnText = "You can't Enter this";
                }
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
        let jsonRoomsData = await UtilityFiles.readFile(path+"rooms.json");
        let jsonNpcData = await UtilityFiles.readFile(path+"npc.json")
        this.roomList = UtilityGame.importRooms(jsonRoomsData);
        this.bugList = UtilityGame.importBug(jsonRoomsData, this.roomList);
        UtilityGame.importNpcs(jsonNpcData, this.roomList);
        this.setScoreBoard();
    }
    executeDialog(command = "Start"){
        let returnText;

        switch (command){
            case AdventureGame.USER_INPUT.ExitDialog:
                this.currentState = AdventureGame.States.Explore;
                returnText =  this.currentRoom.describe();
                break;
            default:
                returnText = this.currentRoom.talkTo(command);
        }
        return returnText;
    }

    startBattle(){

        this.battleScreen = new Battle();
        this.player.resetStats();
        this.currentState = AdventureGame.States.Battle;
        this.battleScreen.addPlayer(this.player);
        this.battleScreen.addEnemy(this.currentRoom.currentDungeonRoom.enemy);
        this.battleScreen.toggleBattleScreen();
        this.fightBattle();
    }
    fightBattle(command = "Start"){

        switch (command) {
            case "Start":
                this.battleScreen.display();
                break;
            default:
                this.battleScreen.interact(command);
                break;
        }

    }

    startDungeon(){
        this.isInDungeon = true;
        this.currentState = AdventureGame.States.Dungeoneering;
        this.currentRoom.generateDungeon();
    }

    exitDungeon(){
        this.isInDungeon = false;
        this.currentState = AdventureGame.States.Explore;
    }

    exploreDungeon(command){
        let returnText;

        switch (command){
            case AdventureGame.USER_INPUT.North:
            case AdventureGame.USER_INPUT.East:
            case AdventureGame.USER_INPUT.South:
            case AdventureGame.USER_INPUT.West:
                returnText = this.currentRoom.exploreDungeon(command);
                if(this.currentRoom.currentDungeonRoom.hasEnemy()){
                    this.startBattle();
                }
                break;
            case AdventureGame.USER_INPUT.ExitDialog:
                this.exitDungeon();
                returnText =  this.currentRoom.describe();
                break;
            case AdventureGame.USER_INPUT.CharacterSheet:
                returnText = "";
                this.displayCharacterSheet();
                this.currentState = AdventureGame.States.CharacterSheet;
                break;
            default:
                returnText = this.defaultCommands(command)
        }

        return returnText;
    }

    displayCharacterSheet(){
        this.player.resetStats();
        this.characterSheet.setPlayer(this.player);
        this.characterSheet.displayCharacterScreen();
        this.characterSheet.display();
    }

    /**
     * Imports the current game state based on information in a JSON-String
     * @param {string} jsonString The JSON-String which contains all the useful information
     */
    importGame(jsonString){
        let paragraph = document.createElement("p");

        try{
            UtilityGame.importGameFile(jsonString);
            this.isInDungeon = false;
            this.currentState = AdventureGame.States.Explore;
            this.battleScreen.hideBattleScreen();
            this.characterCreator.allocateAttributesHide();
            this.characterSheet.hideCharacterScreen();

            paragraph.innerHTML =  UtilityText.colorText("Game loaded!", UtilityText.TEXT_COLORS.Green) + UtilityText.TEXT_SYMBOL.NewLine;
            paragraph.innerHTML += this.currentRoom.describe();
            contentText.innerHTML = ""
        }catch (e){
            UtilityMusic.playSoundClip(UtilityMusic.SOUND_CLIPS.ERROR[0]);
            paragraph.innerHTML =  UtilityText.colorText("Game couldn't be loaded! Make sure you have selected the right file.", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewLine;
        }

        contentText.appendChild(paragraph);
        this.setScoreBoard();
        content.scrollTop = content.scrollHeight;
    }

    clearScreen(showDescription=true){
        let paragraph = document.createElement("p");
        contentText.innerHTML = ""
        if(showDescription){
            if(this.currentState === AdventureGame.States.Explore){
                paragraph.innerHTML = this.currentRoom.describe();
            }else if(this.currentState === AdventureGame.States.Dungeoneering){
                paragraph.innerHTML = this.currentRoom.exploreDungeon("Start");
            }
            contentText.appendChild(paragraph);
        }
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

    static restartGame() {
        location.reload();
    }
}

export {AdventureGame};
