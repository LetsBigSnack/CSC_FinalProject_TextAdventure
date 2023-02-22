import {DungeonRoom} from "./DungeonRoom.js";
import {UtilityRandom} from "../Utility/UtilityRandom.js";
import {Worm} from "./Enemy/Enemy-Types/Boss-Types/Worm.js";
import {Bot} from "./Enemy/Enemy-Types/Bot.js";
import {Virus} from "./Enemy/Enemy-Types/Virus.js";
import {Electrode} from "./Enemy/Enemy-Types/Electrode.js";
import {Resistor} from "./Enemy/Enemy-Types/Resistor.js";
import {Circuit} from "./Enemy/Enemy-Types/Boss-Types/Circuit.js";

/**
 * This Class is used primarily for the generation of a Dungeon
 */
class DungeonGen{

    /**
     * Generates a random Dungeon filled with Enemies and a Boss based on given Parameters
     * @param{number} minNumberOfRooms The minimum number of Dungeon rooms which are going to be created
     * @param{number} maxNumberRooms The minimum number of Dungeon rooms which are going to be created
     * @returns {DungeonRoom[]} Returns the Array of the Generated Dungeon
     */
    static generateLevel(minNumberOfRooms = 10, maxNumberRooms = 20 ){

        let roomList;
        let finishedGeneration = false;

        do{

            roomList = [];

            //Starting Room
            let startingRoom = new DungeonRoom(0,0);
            roomList.push(startingRoom);

            //Random
            let roomNumber = UtilityRandom.getRandomInt(minNumberOfRooms,maxNumberRooms);

            let currentRoom = startingRoom;

            for (let i = 0; i < roomNumber;){

                currentRoom = roomList.filter(room => room.visitedByGenerator === false)[0];

                if(!currentRoom){
                    //reset visited Rooms
                    roomList.forEach(value => value.visitedByGenerator = false);
                }else{
                    for (const [key, value] of Object.entries(DungeonRoom.generatorDirections)) {

                        //Fail Save
                        if(i >= roomNumber){
                            continue;
                        }


                        let rng = Math.random();
                        let roomRng = currentRoom.numberConnections / 4;

                        if(rng > (roomRng * 1.2)){

                            if(roomList.filter(room => room.x_pos === currentRoom.x_pos+value[0] &&  room.y_pos === currentRoom.y_pos+value[1]).length < 1) {
                                let tmpRoom = new DungeonRoom(currentRoom.x_pos+value[0],currentRoom.y_pos+value[1]);


                                roomList.push(tmpRoom);
                                currentRoom.addConnection(key,tmpRoom);

                                //Add Connection to connected Rooms
                                for (const [key_2, value_2] of Object.entries(DungeonRoom.generatorDirections)) {

                                    let adjacentRoom = roomList.filter(room => room.x_pos === tmpRoom.x_pos+value_2[0] &&  room.y_pos === tmpRoom.y_pos+value_2[1])[0];

                                    if(adjacentRoom){

                                        let isAlreadyConnected = false;
                                        for (const [dir, dirRoom] of Object.entries(tmpRoom.connections)) {
                                            if(adjacentRoom === dirRoom){
                                                isAlreadyConnected = true;
                                            }
                                        }

                                        if(!isAlreadyConnected){
                                            tmpRoom.addConnection(key_2,adjacentRoom);
                                        }
                                    }
                                }
                                i++;
                            }
                        }
                    }
                    currentRoom.visitedByGenerator = true;
                }
            }

            roomList.forEach(value => {

                let enemyArray = [
                    new Virus(),
                    new Bot(),
                    new Electrode(),
                    new Resistor(),
                ];

                if(Math.random() < 0.75){
                    value.addEnemy(enemyArray[UtilityRandom.getRandomInt(0,enemyArray.length-1)]);
                }

            });

            try {
                let roomWithOneConnection = roomList.filter(room => room.numberConnections === 1 && room.x_pos !== 0 && room.y_pos !== 0);
                if(roomWithOneConnection){
                    if(roomWithOneConnection.length >= 4){
                        roomWithOneConnection[roomWithOneConnection.length-1].type = "boss";

                        let bossArray = [
                            new Worm(),
                            new Circuit(),
                        ];

                        roomWithOneConnection[roomWithOneConnection.length-1].addEnemy(bossArray[UtilityRandom.getRandomInt(0,bossArray.length-1)]);

                        finishedGeneration = true;
                    }
                }
            }catch (e) {

            }
        }while(!finishedGeneration)

        return roomList;

    }
}
export {DungeonGen};