import {UtilityText} from "../Utility/UtilityText.js";
import {AdventureGame} from "./AdventureGame.js";

/**
 * This Class is used to represent the "Room" entities in the game.
 * This Room class is used to store everything necessary for the representation in the game
 * A Room is an abstract representation of a space within the Game
 * Rooms can be connected to another and contain information about other entities or events inside of them
 */
class Room {

    /**
     * The class constructor for the class "Room"
     * @param {string} description Description of the Room
     * @param {string}  location Name of the Room Location
     * @param {[string]}  commands List of all the Events the Room possess
     * @param {[string]}  ascii ASCII Art which represents the current Room
     * @param {Room}  obj Object which this Object will be copied to (if not empty)
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
     * Sets the "Bug" which is connected to the Room
     * @param {Bug} bug The Bug which is connected to the Room
     */
    setBug(bug) {
        this.bug = bug;
    }

    /**
     * Sets the connected Rooms to this Room-Object
     * @param{[Room]} rooms The connected Rooms to this Object
     */
    setConnections(rooms) {
        for (let i = 0; i < rooms.length; i++) {
            this.connections[i] = rooms[i];
        }
    }

    /**
     * Gets the location name associated to the Room
     * @returns {string} Returns the location name of the Room
     */
    getLocation() {
        return this.location;
    }

    /**
     * Generates and returns a description of the Room
     * @returns {string} Returns a full description of the Room in an HTML-Format
     */
    describe() {
        let desc = this.description + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        desc += this.drawAscii() + UtilityText.TEXT_SYMBOL.NewLine;
        desc += this.displayOptions() + UtilityText.TEXT_SYMBOL.NewLine;
        return desc;
    }

    /**
     * Generates and returns the ASCII-Art in a format that can be viewed in the Game
     * @returns {string} Returns the prepared ASCII-Art string
     */
    drawAscii() {
        let desc = "";

        if (this.ascii) {
            for (let i = 0; i < this.ascii.length; i++) {
                desc += this.ascii[i].replaceAll(" ", UtilityText.TEXT_SYMBOL.Space) + UtilityText.TEXT_SYMBOL.NewLine;
            }
        }
        return desc;
    }

    /**
     * Generates and returns all Options the User can Take for the Room
     * @returns {string} Returns all the Options of the available Room
     */
    displayOptions() {
        let options = "go ";

        for (let i = 0; i < this.connections.length; i++) {
            if(this.connections[i]){
                switch (i) {
                    case AdventureGame.DIRECTIONS.North:
                        options += UtilityText.emphasizeFirstLetter("North","[", "]", UtilityText.TEXT_COLORS.Blue);
                        break;
                    case AdventureGame.DIRECTIONS.East:
                        options +=  UtilityText.emphasizeFirstLetter("East","[", "]", UtilityText.TEXT_COLORS.Blue);
                        break;
                    case AdventureGame.DIRECTIONS.South:
                        options +=  UtilityText.emphasizeFirstLetter("South","[", "]", UtilityText.TEXT_COLORS.Blue);
                        break;
                    case AdventureGame.DIRECTIONS.West:
                        options +=  UtilityText.emphasizeFirstLetter("West","[", "]", UtilityText.TEXT_COLORS.Blue);
                        break;
                }
                options += UtilityText.TEXT_SYMBOL.Separator;
            }
        }

        if (this.commands[AdventureGame.EVENT.Talk]) {
            options += UtilityText.emphasizeFirstLetter("Talk to","[", "]", UtilityText.TEXT_COLORS.Pink) + UtilityText.TEXT_SYMBOL.Separator;
        }

        if (this.commands[AdventureGame.EVENT.Look]) {
            options +=  UtilityText.emphasizeFirstLetter("Look at","[", "]", UtilityText.TEXT_COLORS.Green) + UtilityText.TEXT_SYMBOL.Separator;
        }
        return options.substring(0, options.lastIndexOf("|"));
    }

    /**
     * Handles user interaction that can be done with a Room
     * @param {string} command Represents the action of the user
     * @returns {string} Returns a string which represent the state of the Game after the user has done the action
     */
    interact(command) {
        let returnText;

        switch (command) {
            case AdventureGame.USER_INPUT.Look:
                returnText = this.lookAt();
                break;
            case AdventureGame.USER_INPUT.Talk:
                returnText = this.talkTo();
                break;
            default:
                returnText = UtilityText.colorText("BEEP BOOP COMMAND undefined", UtilityText.TEXT_COLORS.Red);
                break;
        }
        return returnText;

    }

    //TODO add Dialog System
    /**
     * Generates and returns the Text which represents the Talk to Event
     * @returns {string}  Returns the Talk to Description in an HTML-Format
     */
    talkTo() {
        let returnText;

        if (this.commands[AdventureGame.EVENT.Talk]){
            returnText = this.commands[AdventureGame.EVENT.Talk];
            if (this.hasBugs("T")) {
                returnText += this.unlockBug();
            }
        } else {
            returnText = "There is nobody to talk to.";
        }


        return returnText;
    }


    /**
     * Generates and returns the Text which represents the Look at Event
     * @returns {string}  Returns the Look at Description in an HTML-Format
     */
    lookAt() {
        let returnText;

        if (this.commands[AdventureGame.EVENT.Look]) {
            returnText = this.commands[AdventureGame.EVENT.Look];
            if (this.hasBugs("L")) {
                returnText += this.unlockBug();
            }
        } else {
            returnText = "There is nothing to look at.";
        }

        return returnText;
    }

    /**
     * Checks if an event has a Bug associated Bug for the current Room
     * @param{string} event The Event / Action to be checked
     * @returns {boolean} Returns if a specific Event / Action has gives the User a Bug in the current Room
     */
    hasBugs(event) {
        return this.bug !== undefined && this.bug.event === event && !this.bug.hasBeenFound();
    }

    /**
     * Unlocks and describes a Bug
     * @returns {string} Returns the description of the Bug after it has been found in an HTML-Format
     */
    unlockBug() {
        let returnText = this.bug.getDescription();
        this.bug.discover();

        return returnText;

    }

    /**
     * Tries to change the current Room based on the Direction
     * @param direction The direction the user tries to travel to
     * @returns {Room} Returns the new Room if the travel there is possible otherwise returns undefined
     */
    travelTo(direction) {
        switch (direction) {
            case AdventureGame.USER_INPUT.North:
                if (this.connections[AdventureGame.DIRECTIONS.North]) {
                    return this.connections[AdventureGame.DIRECTIONS.North];
                }
                break;
            case AdventureGame.USER_INPUT.East:
                if (this.connections[AdventureGame.DIRECTIONS.East]) {
                    return this.connections[AdventureGame.DIRECTIONS.East];
                }
                break;
            case AdventureGame.USER_INPUT.South:
                if (this.connections[AdventureGame.DIRECTIONS.South]) {
                    return this.connections[AdventureGame.DIRECTIONS.South];
                }
                break;
            case AdventureGame.USER_INPUT.West:
                if (this.connections[AdventureGame.DIRECTIONS.West]) {
                    return this.connections[AdventureGame.DIRECTIONS.West];
                }
                break;
        }
        return undefined;
    }

}

export {Room};
