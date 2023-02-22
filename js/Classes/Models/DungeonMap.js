import {UtilityText} from "../Utility/UtilityText.js";

/**
 * This Class is used primarily for the generation of the Dungeon Map
 */
class DungeonMap{


    /**
     * Generates a Dungeon Map with the size 5x5 with the current Room as it's middle point
     * @param{DungeonRoom[]} dungeonRoomList The list of all DungeonRoom in the Dungeon
     * @param{DungeonRoom} currentRoom The DungeonRoom, which the player currently inhabits
     * @returns {string} Returns the HTML representation of the Dungeon Map
     */
    static drawMap(dungeonRoomList, currentRoom){
        let returnText = "Map: " + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        let rooms = new Set();

        for(let i = 0; i < 5; i++){
            let tempRow = "";
            for(let j = 0; j < 5; j++){
                let tempColumn = "";
                console.log("t");
                //(3-(5-j))
                //+((5-i)-3))
                //To get the 5x5 Rooms with the current DungeonRoom in the middle

                let room = dungeonRoomList.filter(room => room.x_pos === currentRoom.x_pos+ (3-(5-j)) &&  room.y_pos === currentRoom.y_pos+((5-i)-3))[0];

                if(room){
                    if(room === currentRoom){
                        tempColumn += "["+UtilityText.colorText("@", UtilityText.TEXT_COLORS.Gold)+"]";
                    }
                    else if(room.visited){
                        tempColumn += "["+UtilityText.colorText("-", UtilityText.TEXT_COLORS.Green)+"]";
                    }else{
                        tempColumn += "["+UtilityText.colorText("?", UtilityText.TEXT_COLORS.Pink)+"]";
                    }
                    rooms.add(room);

                }else{
                    tempColumn +=  "["+UtilityText.colorText("/", UtilityText.TEXT_COLORS.DarkBlue)+"]";
                }
                tempRow +=  tempColumn;
            }
            returnText += tempRow + UtilityText.TEXT_SYMBOL.NewLine;
        }

        returnText += UtilityText.TEXT_SYMBOL.NewEmptyLine;
        returnText +=  UtilityText.colorText("@", UtilityText.TEXT_COLORS.Gold) + "...Player Position" +  UtilityText.TEXT_SYMBOL.NewLine;
        returnText +=  UtilityText.colorText("-", UtilityText.TEXT_COLORS.Green) + "...Visited Room" + UtilityText.TEXT_SYMBOL.NewLine;
        returnText +=  UtilityText.colorText("?", UtilityText.TEXT_COLORS.Pink) + "...Unvisited Room" + UtilityText.TEXT_SYMBOL.NewLine;
        returnText +=  UtilityText.colorText("/", UtilityText.TEXT_COLORS.DarkBlue) + "...Empty Cell" + UtilityText.TEXT_SYMBOL.NewLine;
        return returnText+UtilityText.TEXT_SYMBOL.NewEmptyLine;
    }
}
export {DungeonMap};
