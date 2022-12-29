import {Player} from "../Player.js";

class TwitterUser extends Player{

    className = "Twitter-User";
    describe(){
        return "I am a Twitter";
    }

    setStats(name, health, strength, dexterity, constitution, intelligence, wisdom, charisma){
        this.name = name
        this.health = health;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        this.level = 0;
    }


}

export {TwitterUser};
