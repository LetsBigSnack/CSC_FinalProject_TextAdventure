import {UtilityFiles} from "./UtilityFiles.js";
import {adventureGame, locationText, contentText, content, battle_error} from "../../SetUpGame.js";
import {Room} from "../Models/Room.js";
import {Bug} from "../Models/Bug.js";
import {Npc} from "../Models/Npc/Npc.js";
import {Dialog} from "../Models/Npc/Dialog/Dialog.js";
import {DialogOption} from "../Models/Npc/Dialog/DialogOption.js";
import {Player} from "../Models/Player/Player.js";
import {KeyboardWarrior} from "../Models/Player/Archetypes/KeyboardWarrior.js";
import {Furry} from "../Models/Player/Archetypes/Furry.js";
import {ArchLinuxUser} from "../Models/Player/Archetypes/ArchLinuxUser.js";
import {HackerMan} from "../Models/Player/Archetypes/HackerMan.js";
import {OnlineInfluencer} from "../Models/Player/Archetypes/OnlineInfluencer.js";
import {TwitterUser} from "../Models/Player/Archetypes/TwitterUser.js";
import {AdventureGame} from "../Models/AdventureGame.js";
import {UtilityText} from "./UtilityText.js";
import {UtilityMusic} from "./UtilityMusic.js";

/**
 * This Class is used to house all the Function which revolve around game saving, loading, exporting and importing.
 * This UtilityGame class is used across the whole Project to make interaction with the Game and it's Data more readable and streamline the process.
 */
class UtilityGame {

    /**
     * Exports the current State of the Game
     * @returns {string} Returns the current state of the Game in a JSON-Format
     */
    static exportGame(){
        adventureGame.player.setDefaultStats();
        let exportObject = {
            "currentRoom" : adventureGame.roomList.findIndex(element => element === adventureGame.currentRoom),
            "bugList" : adventureGame.bugList,
            "player": adventureGame.player
        }
        let exportObjectJSON = JSON.stringify(exportObject);
        console.log(exportObjectJSON);
        return exportObjectJSON;
    }

    /**
     * Exports and Downloads the current state of the Game as a JSON-File
     */
    static exportGameFile(){
        if(adventureGame.currentState === AdventureGame.States.Explore || adventureGame.currentState === AdventureGame.States.Dialog){
            let exportObject = UtilityGame.exportGame();
            let today = new Date().toISOString().slice(0, 10)
            UtilityFiles.download("save_"+today+".json",exportObject);
        }else{
            let paragraph = document.createElement("p");
            paragraph.innerHTML = UtilityText.colorText("Game can only be saved/exported during the exploration state", UtilityText.TEXT_COLORS.Red);
            UtilityMusic.playSoundClip(UtilityMusic.SOUND_CLIPS.ERROR[0]);
            contentText.appendChild(paragraph);
        }
    }

    /**
     * Makes a selection of a given Save possible
     */
    static importGameSelect(){
        UtilityFiles.selectFile();
    }

    /**
     * Imports the Room-Data of a JSON File and returns them.
     * @param {*} jsonData The JSON-Data, which holds all the information of the Room entities.
     * @returns {Promise<*[]>} Returns a List of Rooms
     */
    static importRooms(jsonData){
        let roomList = [];
        for (let i = 0; i < jsonData.rooms.length; i++) {
            let temporaryRoom = jsonData.rooms[i];
            roomList[i] = new Room(temporaryRoom.description, temporaryRoom.locationName, [temporaryRoom.lookAt, temporaryRoom.talkTo],temporaryRoom.ascii);
        }
        for (let i = 0; i < jsonData.connections.length; i++) {
            let temporaryConnections = jsonData.connections[i];
            for (let j = 0; j < temporaryConnections.length; j++) {
                temporaryConnections[j] = temporaryConnections[j] === -1 ? undefined : temporaryConnections[j];
            }
            roomList[i].setConnections(temporaryConnections);
        }
        return roomList;
    }

    /**
     *
     * @param jsonData
     * @param{[Room]} roomList
     */
    static importNpcs(jsonData, roomList){

        for (let i = 0; i < jsonData.npcs.length; i++) {
            let npcEntry = jsonData.npcs[i];

            //Create NPC
            let tempNPC = new Npc(npcEntry.name);

            //Iterate through all the DialogTrees
            for (const dialog of npcEntry.dialogs) {
                 let tempDialog = new Dialog(dialog.dialogText);
                for (const dialogOption of dialog.dialogOptions) {
                    let tempDialogOption = new DialogOption(dialogOption.optionText, dialogOption.optionLink, dialogOption.hasBug, dialogOption.requiredCharisma);
                    tempDialog.addDialogOption(tempDialogOption);
                }
                tempNPC.addDialogTree(tempDialog);
            }
            roomList[npcEntry.roomID].addNPC(tempNPC);
        }
    }

    /**
     * Imports the Bug-Data of a JSON File and returns them.
     * @param jsonData The JSON-Data, which holds all the information of the Bug entities.
     * @param roomList A list of Rooms
     * @returns {*[]} Returns a List of Bugs
     */
    static importBug(jsonData, roomList){
        let bugList = [];
        for (let i = 0; i < jsonData.bugs.length; i++) {
            let tmpBug = jsonData.bugs[i];
            //let tmpBug = new Bug(jsonData.bugs[i].name, jsonData.bugs[i].description, jsonData.bugs[i].event, jsonData.bugs[i].room)
            bugList[i] = new Bug(tmpBug.name, tmpBug.description, tmpBug.event, tmpBug.room);
            roomList[jsonData.bugs[i].room].setBug(bugList[i]);
        }
        return bugList;
    }

    /**
     * Creates a DeepCopy of the Bug List into a new Array
     * @param bugListJSON The JSON-Data, which holds all the information of the Bug entities.
     * @returns {*[]} Returns a List of Bugs
     */
    static copyBugList(bugListJSON){
        let tmpBugList = []
        for(let i = 0; i < bugListJSON.length; i++){
            let tmpBug = new Bug("","","",undefined,bugListJSON[i]);
            tmpBugList.push(tmpBug);
        }
        return tmpBugList;
    }

    /**
     * Imports the Game state based on a JSON-String to the AdventureGame class
     * @param jsonString The JSON-Data of a saved game
     */
    static importGameFile(jsonString){
        let importedObject = JSON.parse(jsonString)
        let currentRoomJSON = importedObject["currentRoom"];
        let bugListJSON = importedObject["bugList"];
        let playerJSON = importedObject["player"];
        adventureGame.bugList = UtilityGame.copyBugList(bugListJSON);
        for (let i = 0; i < adventureGame.bugList.length; i++) {
            adventureGame.roomList[adventureGame.bugList[i].room].setBug(adventureGame.bugList[i]);
        }
        adventureGame.player = UtilityGame.importPlayer(playerJSON);
        adventureGame.player.resetStats();
        adventureGame.battleScreen.addPlayer(adventureGame.player);
        adventureGame.currentRoom = adventureGame.roomList[currentRoomJSON];

        if(adventureGame.currentRoom){
            locationText.innerHTML = adventureGame.currentRoom.getLocation();
        }
    }

    /**
     * Imports the Player-Data of a JSON File and returns a Player.
     * @param playerJSON The JSON-Data, which holds all the information of the Player entities.
     * @returns {Player} Returns the Player
     */
    static importPlayer(playerJSON){

        let newPlayer;

        switch(playerJSON.className){

            case "Keyboard Warrior":
                newPlayer = new KeyboardWarrior(playerJSON);
                break;
            case "Arch-Linux User":
                newPlayer = new ArchLinuxUser(playerJSON);
                break;
            case "Furry":
                newPlayer = new Furry(playerJSON);
                break;
            case "H4ck3r-M4n":
                newPlayer = new HackerMan(playerJSON);
                break;
            case "Online Influencer":
                newPlayer = new OnlineInfluencer(playerJSON);
                break;
            case "Twitter-User":
                newPlayer = new TwitterUser(playerJSON);
                break;
            default:
                newPlayer = new Player(playerJSON);
        }

        return newPlayer;
    }

    /**
     * Loads the Game from the local Storage
     */
    static loadGame(){
        console.log("load");
        if(localStorage.getItem("save")){
            console.log("load 2");
            adventureGame.importGame(localStorage.getItem("save"));
        }
    }

    /**
     * Saves the Game
     */
    static saveGame() {
        let paragraph = document.createElement("p");
        if (adventureGame.currentState === AdventureGame.States.Explore || adventureGame.currentState === AdventureGame.States.Dialog) {
            localStorage.setItem("save", UtilityGame.exportGame());
            paragraph.innerHTML = UtilityText.colorText("Game saved!", UtilityText.TEXT_COLORS.Green);
        } else {
            if(adventureGame.currentState === AdventureGame.States.Battle){
                UtilityMusic.playSoundClip(UtilityMusic.SOUND_CLIPS.ERROR[0]);
                battle_error.innerHTML =  UtilityText.colorText("Game can only be saved/exported during the exploration state", UtilityText.TEXT_COLORS.Red);
            }else{
                UtilityMusic.playSoundClip(UtilityMusic.SOUND_CLIPS.ERROR[0]);
                paragraph.innerHTML = UtilityText.colorText("Game can only be saved/exported during the exploration state", UtilityText.TEXT_COLORS.Red);
                content.scrollTop = content.scrollHeight;
            }
        }
        contentText.appendChild(paragraph);
        content.scrollTop = content.scrollHeight;
    }

}
export {UtilityGame};