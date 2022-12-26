import {UtilityFiles} from "./UtilityFiles.js";
import {adventureGame} from "../../SetUpGame.js";
import {Room} from "../Models/Room.js";
import {Bug} from "../Models/Bug.js";

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
        let exportObject = {
            "currentRoom" : adventureGame.roomList.findIndex(element => element === adventureGame.currentRoom),
            "bugList" : adventureGame.bugList
        }
        let exportObjectJSON = JSON.stringify(exportObject);
        console.log(exportObjectJSON);
        return exportObjectJSON;
    }

    /**
     * Exports and Downloads the current state of the Game as a JSON-File
     */
    static exportGameFile(){
        let exportObject = UtilityGame.exportGame();
        let today = new Date().toISOString().slice(0, 10)
        UtilityFiles.download("save_"+today+".json",exportObject);
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
        adventureGame.bugList = UtilityGame.copyBugList(bugListJSON);
        for (let i = 0; i < adventureGame.bugList.length; i++) {
            adventureGame.roomList[adventureGame.bugList[i].room].setBug(adventureGame.bugList[i]);
        }
        adventureGame.currentRoom = adventureGame.roomList[currentRoomJSON];
    }

}
export {UtilityGame};