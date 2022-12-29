import {Player} from "../Player.js";

class OnlineInfluencer extends Player{

    className = "Online Influencer";
    describe(){
        return "I am a Online";
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

export {OnlineInfluencer};
