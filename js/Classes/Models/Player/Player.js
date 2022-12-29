class Player {

    className = "Player";
    maxStat = 10;
    statPoints = 10;
    constructor() {
        this.name;
        this.health;
        this.stats = {
            Strength : 3,
            Dexterity: 3,
            Constitution: 3,
            Intelligence: 3,
            Wisdom: 3,
            Charisma: 3
        }

        this.level = 0;
    }

    describe(){
        return "I am a player";
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
    }

    addStat(statName){
        if(this.stats[statName] < this.maxStat && this.statPoints > 0){
            this.stats[statName]++;
            this.statPoints--;
        }
    }

    subStat(statName){
        //TODO Check default value [maybe]
        if(this.stats[statName] > 0){
            this.stats[statName]--;
            this.statPoints++;
        }
    }

    //TODO worry about abilities and classes later
}

export {Player};
