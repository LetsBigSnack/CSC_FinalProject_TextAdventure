
class Room {


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

/**
 *  This Room class is used to store everything necessary for the representation in the game
 * @param {*} location Name of the location
 * @param {*} description description of the bug
 * @param {*} commands list of events 
 * @param {*} ascii the room art
 * @param {*} obj is not empty then the object is copied in the bug
 */
    constructor(description, location, commands, ascii, obj=null) {
        this.description = description;
        this.commands = commands;
        this.location = location;
        this.connections = [];
        this.bug = {};
        this.ascii = ascii;
        if(obj){
            obj && Object.assign(this, obj);
        }
    }
/**
 * sets bug to this object
 * @param {*} bug bug in question 
 */
    setBug(bug) {
        this.bug = bug;
    }
    /**
     * sets the connection to this object
     * @param {*} rooms array of connected rooms
     */
    setConnections(rooms) {
        for (let i = 0; i < rooms.length; i++) {
            this.connections[i] = rooms[i];
        }
    }
    /**
     * 
     * @returns the current location
     */
    getLocation() {
        return this.location;
    }

    /**
     * Describes the room
     * @returns the description 
     */
    describe() {

        let desc = "";
        desc += this.description;
        desc += "<br>";
        this.hasBeenDescribed = true;
        desc += "<br>";
        desc += this.drawAscii();
        desc += this.displayOptions();
        desc += "<br>";
        return desc;
    }

    /**
     *
     * @returns {string}
     */
    drawAscii() {
        let desc = "";

        if (this.ascii) {
            for (let i = 0; i < this.ascii.length; i++) {
                desc += this.ascii[i].replaceAll(" ", "&nbsp;") + "<br>";

            }
            desc += "<br>";
        }
        return desc;
    }

    /**
     * Display all possible options
     * @returns all options 
     */
    displayOptions() {
        let options = "go ";

        for (let i = 0; i < this.connections.length; i++) {
            if(this.connections[i] !== undefined && this.connections[i] !== null){
                switch (i) {
                    case 0:
                        options += "<span class='color_blue'>[N]</span>orth";
                        break;
                    case 1:
                        options += "<span class='color_blue'>[E]</span>ast";
                        break;
                    case 2:
                        options += "<span class='color_blue'>[S]</span>outh";
                        break;
                    case 3:
                        options += "<span class='color_blue'>[W]</span>est";
                        break;
                }
                options += " | ";
            }
        }

        if (this.commands[Room.EVENT.Talk]) {
            options += "<span class='color_pink'>[T]</span>alk to | ";
        }

        if (this.commands[Room.EVENT.Look]) {
            options += "<span class='color_green'>[L]</span>ook at | ";
        }
        return options.substring(0, options.lastIndexOf("|"));
    }

    /**
     * used to interact with the object
     * @param {*} command event 
     * @returns string 
     */
    interact(command) {

        let returnText = "";

        switch (command) {
            case "L":
                returnText = this.lookAt();
                break;
            case "T":
                returnText = this.talkTo();
                break;
            default:
                returnText = "<span class='color_red'>BEEP BOOP COMMAND undefined</span>";
                break;
        }
        return returnText;

    }

    /**
     * 
     * @returns a dialog if available
     */
    talkTo() {

        let returnText = "";

        if (this.commands[Room.EVENT.Talk]){
            returnText = this.commands[Room.EVENT.Talk];
            if (this.hasBugs("T")) {
                returnText += this.unlockBug();
            }
        } else {
            returnText = "There is nobody to talk to.";
        }


        return returnText;
    }
    
    /**
     * 
     * @returns a description if available
     */

    lookAt() {

        let returnText = "";

        if (this.commands[Room.EVENT.Look]) {
            returnText = this.commands[Room.EVENT.Look];
            if (this.hasBugs("L")) {
                returnText += this.unlockBug();
            }
        } else {
            returnText = "There is nothing to look at.";
        }

        return returnText;
    }

    /**
     * 
     * @param {*} event interaction 
     * @returns if a certain event has a bug for it 
     */
    hasBugs(event) {

        return this.bug !== undefined && this.bug.event === event && !this.bug.hasBeenFound();
    }

    /**
     * unlocks a bug
     * @returns bug unlock text
     */
    unlockBug() {


        let returnText = this.bug.getDescription();
        this.bug.discover();

        return returnText;

    }

    /**
     * travles to another room 
     * @param {*} direction the travel direction 
     * @returns 
     */
    travelTo(direction) {
        switch (direction) {
            case "N":
                if (this.connections[Room.DIRECTIONS.North]) {
                    return this.connections[Room.DIRECTIONS.North];
                }
                break;
            case "E":
                if (this.connections[Room.DIRECTIONS.East]) {
                    return this.connections[Room.DIRECTIONS.East];
                }
                break;
            case "S":
                if (this.connections[Room.DIRECTIONS.South] !== undefined) {
                    return this.connections[Room.DIRECTIONS.South];
                }
                break;
            case "W":
                if (this.connections[Room.DIRECTIONS.West] !== undefined) {
                    return this.connections[Room.DIRECTIONS.West];
                }
                break;

            default:
                return "You can't go in this direction";
        }
    }

}

export {Room};
