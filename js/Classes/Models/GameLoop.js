import {Room} from "./Room.js";
import {Bug} from "./Bug.js";

class AdventureGame {

    /**
     *  This AdventureGame class is used to store everything necessary for the representation in the game

     */

    constructor() {

        this.bugScore = 0;
        this.bugList = [];
        this.currentRoom;
        this.roomList = [];
        this.gamefinished = false;
        this.importRooms("../jsonData/rooms.json");

    }
    /**
     * sets the current room
     * @param {*} room the new current room
     */
    setCurrentRoom(room) {
        this.currentRoom = room;
    }

    /**
     * used to interact with the game / user interface
     * @param {*} command the interaction event
     * @returns the string after the interaction
     */
    interact(command) {

        //TODO Interact with States

        let returnText = "";

        returnText += "<span class='color_blue'>\> " + command + "</span><br>";

        switch (command) {
            case "N":
            case "E":
            case "S":
            case "W":
                let newRoom = this.roomList[this.currentRoom.travelTo(command)];
                if (newRoom !== undefined) {
                    this.currentRoom = newRoom;
                    returnText += this.currentRoom.describe();
                } else {
                    returnText += "You can't go in this direction";
                }
                break;
            case "Q":
                //TODO: make work
                alert("Bye Bye");
                self.close();
                break;
            case "CLEAR":
                //TODO: make work
                contentText.innerHTML = "";
                returnText += this.currentRoom.describe();
                break;
            case "STAR WARS":
                //TODO: make work
                ascii_animate();
                returnText += "Look at the console"
                break;
            default:
                returnText += this.currentRoom.interact(command);
                break;
        }

        this.setScoreBoard();

        if(this.bugScore === this.bugList.length && !this.gamefinished){
            returnText += "<br><br><span class='color_gold'>You have found all the bugs in the codebase, sadly your intership is unpaid so don't expect anything as the reward. You can explore the rest of the codebase or if you want to have some fun type in 'Star Wars' as a command </span>"
            this.gamefinished = true
        }


        return returnText;
    }

    /**
     * Imports the data based on a json file
     * @param {*} path path to the json file
     */
    async importRooms(path) {

        let jsonRoomsData = {};
        await fetch(path)
            .then(response => response.json())
            .then(data => jsonRoomsData = data)
            .catch(error => console.log(error));

        for (let i = 0; i < jsonRoomsData.rooms.length; i++) {
            let temporaryRoom = jsonRoomsData.rooms[i];

            this.roomList[i] = new Room(temporaryRoom.description, temporaryRoom.locationName, [temporaryRoom.lookAt, temporaryRoom.talkTo],temporaryRoom.ascii);
        }

        for (let i = 0; i < jsonRoomsData.connections.length; i++) {

            let temporaryConnections = jsonRoomsData.connections[i];

            for (let j = 0; j < temporaryConnections.length; j++) {
                temporaryConnections[j] = temporaryConnections[j] === -1 ? undefined : temporaryConnections[j];

            }

            this.roomList[i].setConnections(temporaryConnections);
        }

        for (let i = 0; i < jsonRoomsData.bugs.length; i++) {

            let tmpBug = new Bug(jsonRoomsData.bugs[i].name, jsonRoomsData.bugs[i].description, jsonRoomsData.bugs[i].event, jsonRoomsData.bugs[i].room)
            this.bugList[i] = tmpBug;
            this.roomList[jsonRoomsData.bugs[i].room].setBug(tmpBug);
        }


        this.currentRoom = this.roomList[0];

        this.setScoreBoard();
    }
    /**
     * updates scoreboard
     */
    setScoreBoard(){

        let foundBugs = this.bugList.filter(element => element.discovered === true);


        if(foundBugs !== undefined){
            this.bugScore = foundBugs.length;
        }

        console.log(this.bugScore);

        score.innerHTML = this.bugScore + " / " + this.bugList.length + " Bugs";


    }
    /**
     * exports the current game file as a json object
     * @returns exported json object as a string
     */
    exportBugs(){
        let exportObject = {
            "currentRoom" : this.currentRoom,
            "bugList" : this.bugList
        }
        // var result = JSON.stringify(exportObject, function(key, val) {
        //     if (key !== "private")
        //         return val;
        // });
        let exportObjectJSON = JSON.stringify(exportObject);
        console.log(exportObjectJSON);
        return exportObjectJSON;
    }
    /**
     * Imports the current game file based on a json string
     * @param {*} jsonString json string in question
     */
    importGame(jsonString){

        let importedObject = JSON.parse(jsonString)
        let currentRoomJSON = importedObject["currentRoom"];
        let bugListJSON = importedObject["bugList"];

        let tmpCurrentRoom = new Room("","","","",currentRoomJSON);
        let tmpBugList = []

        for(let i = 0; i < bugListJSON.length; i++){
            let tmpBug = new Bug("","","","",bugListJSON[i]);
            tmpBugList.push(tmpBug);
        }

        this.currentRoom = tmpCurrentRoom;
        this.bugList = tmpBugList;

        for (let i = 0; i < this.bugList.length; i++) {

            let tmpBug = new Bug(this.bugList[i].name, this.bugList[i].description, this.bugList[i].event, this.bugList[i].room)
            if(this.bugList[i].discovered){
                tmpBug.discover();
                tmpBug.hasBeenFound();

            }
            this.roomList[this.bugList[i].room].setBug(tmpBug);
            const isCurrentRoomId = this.roomList.findIndex((obj) => {

                if(obj.name === this.currentRoom.name){
                    return true;
                }

            });

            if(this.bugList[i].room === isCurrentRoomId){
                this.currentRoom.setBug(tmpBug)
            }

            this.currentRoom.setBug()
        }

        contentText.innerHTML = "";
        contentText.innerHTML += this.currentRoom.describe();
        this.setScoreBoard();

    }

}

export {AdventureGame};
