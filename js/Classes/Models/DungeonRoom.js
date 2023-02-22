import {UtilityText} from "../Utility/UtilityText.js";
import {AdventureGame} from "./AdventureGame.js";
import {adventureGame} from "../../SetUpGame.js";
import {Enemy} from "./Enemy/Enemy.js";


class DungeonRoom {


    static oppositeDirections = {
        0 : AdventureGame.DIRECTIONS.South,
        1 : AdventureGame.DIRECTIONS.West,
        2 : AdventureGame.DIRECTIONS.North,
        3 : AdventureGame.DIRECTIONS.East
    }

    static generatorDirections = {
        0 : [0,1],
        1 : [1,0],
        2 : [0,-1],
        3 : [-1,0]
    }


    constructor(x_pos,y_pos) {
        this.y_pos = y_pos;
        this.x_pos = x_pos;
        this.type = "";
        this.numberConnections = 0;
        this.connections = [];
        this.visited = false;
        this.enemy = undefined;
    }

    addEnemy(enemy){
        this.enemy = enemy;
    }

    addConnection(directions, room, call = true){
        this.numberConnections++;
        this.connections[directions] = room;
        if(call){
            room.addConnection(DungeonRoom.oppositeDirections[directions],this,false);
        }
    }


    /**
     * Generates and returns all Options the User can Take for the Room
     * @returns {string} Returns all the Options of the available Room
     */
    displayOptions() {
        let options = "go ";

        for (let i = 0; i < this.connections.length; i++) {
            //cant use if(this.connection[i]) because 0 is a valid value
            if(this.connections[i] !== undefined){
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

        options +=  UtilityText.emphasizeFirstLetter("XExit Dungeon","[", "]", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.Separator;



        if(adventureGame.player.statPoints > 0){
            options +=  UtilityText.emphasizeFirstLetter("Character Sheet","[", "]", UtilityText.TEXT_COLORS.DarkBlue) +" <span class='blink_me'>["+adventureGame.player.statPoints+"]</span>"+ UtilityText.TEXT_SYMBOL.Separator;

        }else{
            options +=  UtilityText.emphasizeFirstLetter("Character Sheet","[", "]", UtilityText.TEXT_COLORS.DarkBlue) + UtilityText.TEXT_SYMBOL.Separator;
        }

        return options.substring(0, options.lastIndexOf("|"));
    }

    hasEnemy(){
        return this.enemy && this.enemy.isAlive;
    }


    /**
     * Tries to change the current Room based on the Direction
     * @param direction The direction the user tries to travel to
     * @returns {Room} Returns the new Room if the travel there is possible otherwise returns undefined
     */
    travelTo(direction) {
        switch (direction) {
            //cant use if(this.connection[XYZ]) because 0 is a valid value
            case AdventureGame.USER_INPUT.North:
                if (this.connections[AdventureGame.DIRECTIONS.North] !== undefined) {
                    return this.connections[AdventureGame.DIRECTIONS.North];
                }
                break;
            case AdventureGame.USER_INPUT.East:
                if (this.connections[AdventureGame.DIRECTIONS.East] !== undefined) {
                    return this.connections[AdventureGame.DIRECTIONS.East];
                }
                break;
            case AdventureGame.USER_INPUT.South:
                if (this.connections[AdventureGame.DIRECTIONS.South] !== undefined) {
                    return this.connections[AdventureGame.DIRECTIONS.South];
                }
                break;
            case AdventureGame.USER_INPUT.West:
                if (this.connections[AdventureGame.DIRECTIONS.West] !== undefined) {
                    return this.connections[AdventureGame.DIRECTIONS.West];
                }
                break;
        }
        return undefined;
    }

}

export {DungeonRoom};
