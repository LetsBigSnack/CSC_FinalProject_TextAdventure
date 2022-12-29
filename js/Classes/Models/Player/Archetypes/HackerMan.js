import {Player} from "../Player.js";

class HackerMan extends Player{

    className = "H4ck3r-M4n";

    describe(){
        return "I am a Hacker";
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

export {HackerMan};
