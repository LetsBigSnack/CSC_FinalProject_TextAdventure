import {UtilityText} from "../../Utility/UtilityText.js";

class Enemy{
    
    asciiImage = [
        "          @@@@@@@@@@          ",
        "      @@@@||||||||||@@@@      ",
        "    @@------------------@@    ",
        "  @@----------------------@@  ",
        "  @@----@@----------@@----@@  ",
        "@@------@@----------@@------@@",
        "@@------@@----------@@------@@",
        "@@--------------------------@@",
        "@@--------------------------@@",
        "@@--------------------------@@",
        "@@--------@@------@@--------@@",
        "@@..--------@@@@@@--------..@@",
        "  @@......................@@  ",
        "    @@@@@@@@@@@@@@@@@@@@@@    "
    ];

    constructor() {
        this.name = "Enemy";
        this.isAlive = true;
        this.currentHealth = 10;
        this.maxHealth = this.currentHealth;
        this.dmg = 6;
        this.healAmount = 5;
        this.maxHealth = 10;
        this.resistance = 1;
    }

    makeBattleMove(){
        let returnObject;

        let rngChoice = Math.floor(Math.random() * 3);
        switch (rngChoice){
            case 0:
                returnObject = this.attack();
                break;
            case 1:
                returnObject = this.heal();
                break;
            case 2:
                returnObject = this.ability();
                break;
        }


        return returnObject;
    }

    attack(){

        let returnObject = {};

        returnObject.dmg = Math.round(Math.random() * this.dmg);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " dealt " + returnObject.dmg + " damage.";

        return returnObject;

    }

    ability(){

        let returnObject = {};

        returnObject.dmg = Math.round(Math.random() * this.dmg)*2;
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " dealt " + returnObject.dmg + " damage with their Ultimate.";

        return returnObject;

    }

    heal(){

        let returnObject = {};

        returnObject.heal = Math.round(Math.random() * this.healAmount);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " healed " + returnObject.heal + " HP.";


        return returnObject;

    }

    healDmg(heal){
        if(this.currentHealth+heal >= this.maxHealth){
            this.currentHealth = this.maxHealth;
        }else{
            this.currentHealth += heal;
        }
    }

    receiveDmg(dmg){

        this.currentHealth  -= dmg;
        if(this.currentHealth <= 0){
            this.currentHealth = 0;
            this.isAlive = false;
        }

    }
}
export {Enemy}