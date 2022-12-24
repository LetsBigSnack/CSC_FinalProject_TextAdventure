class Room {


    // STATIC CONSTANT

    static get NORTH() {
        return 0;
    }

    static get EAST() {
        return 1;
    }

    static get SOUTH() {
        return 2;
    }

    static get WEST() {
        return 3;
    }

    static get LOOK() {
        return 0;
    }

    static get TALK() {
        return 1;
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
        this.bug;
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
     * Draws ASCII-Art
     * @returns ASCII-Art
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

        if (this.commands[Room.TALK] !== undefined && this.commands[Room.TALK] !== "") {
            options += "<span class='color_pink'>[T]</span>alk to | ";
        }

        if (this.commands[Room.LOOK] !== undefined && this.commands[Room.LOOK] !== "") {
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

        if (this.commands[Room.TALK] !== undefined && this.commands[Room.TALK] !== "") {
            returnText = this.commands[Room.TALK];
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

        if (this.commands[Room.LOOK] !== undefined && this.commands[Room.LOOK] !== "") {
            returnText = this.commands[Room.LOOK];
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

        if (this.bug !== undefined && this.bug.event === event && !this.bug.hasBeenFound()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * unlocks a bug
     * @returns bug unlock text
     */
    unlockBug() {

        let returnText = "";

        returnText = this.bug.getDescription();
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
                if (this.connections[Room.NORTH] !== undefined) {
                    return this.connections[Room.NORTH];
                }
                break;
            case "E":
                if (this.connections[Room.EAST] !== undefined) {
                    return this.connections[Room.EAST];
                }
                break;
            case "S":
                if (this.connections[Room.SOUTH] !== undefined) {
                    return this.connections[Room.SOUTH];
                }
                break;
            case "W":
                if (this.connections[Room.WEST] !== undefined) {
                    return this.connections[Room.WEST];
                }
                break;

            default:
                return "You can't go in this direction";
                break;
        }
    }

}