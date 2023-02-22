import {UtilityText} from "../Utility/UtilityText.js";

class DungeonMap{



    static drawMap(dungeonRoomList, currentRoom){
        let returnText = "Map: " + UtilityText.TEXT_SYMBOL.NewEmptyLine;
        let rooms = new Set();
        let displayedRooms = new Set();

        for(let i = 0; i < 5; i++){
            let tempRow = "";
            for(let j = 0; j < 5; j++){
                let tempColumn = "";
                console.log("t");
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

        return returnText+UtilityText.TEXT_SYMBOL.NewEmptyLine;
    }
}
export {DungeonMap};
