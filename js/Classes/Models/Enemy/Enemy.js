import {UtilityText} from "../../Utility/UtilityText.js";
import {UtilityRandom} from "../../Utility/UtilityRandom.js";

/**
 * This Class is used to represent the BaseClass for the "Enemy" entity in the game.
 * This Enemy class is used to store everything necessary for their representation in the game
 * A Enemy is an abstract representation of a possible opponent that the Player faces in the Game.
 */
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

    /**
     * The class constructor for the class "Enemy"
     */
    constructor() {
        this.name = "Enemy";
        this.isAlive = true;
        this.currentHealth = 50;
        this.maxHealth = this.currentHealth;
        this.dmg = 6;
        this.healAmount = 5;
        this.maxHealth = 50;
        this.xp = 3;
        this.isBoss = false;
    }

    /**
     * Makes a random move to execute in Battle
     * Takes Health into consideration
     *
     * @returns {{}} Returns an Object of the Enemy's Action
     */
    makeBattleMove(){
        let returnObject;

        let rngChoice = Math.random();

        if(rngChoice < 0.75){
            returnObject = this.attack();
        }else if(rngChoice < 0.9){
            if(this.currentHealth >= this.maxHealth){
                let tmpRng = Math.random();
                if(tmpRng < 0.8){
                    returnObject = this.attack();
                }else{
                    returnObject = this.ability();
                }
            }else{
                returnObject = this.heal();
            }
        }else{
            returnObject = this.ability();
        }

        return returnObject;
    }

    /**
     * Performance an Attack and deals a random amount of damage, based on the enemy's dmg attribute
     * @returns {{}} Returns an Object of the Enemy's Attack
     */
    attack(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,this.dmg);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " dealt " + returnObject.dmg + " damage.";

        return returnObject;

    }

    /**
     * Performance an Ability and deals a random amount of damage, based on the enemy's dmg attribute
     * @returns {{}} Returns an Object of the Enemy's Ability
     */
    ability(){

        let returnObject = {};

        returnObject.dmg = UtilityRandom.getRandomInt(1,this.dmg) +  UtilityRandom.getRandomInt(1,this.dmg);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " dealt " + returnObject.dmg + " damage with their Ultimate.";

        return returnObject;

    }

    /**
     * Performance a Heal and heals a random amount of health, based on the enemy's heal attribute
     * @returns {{}} Returns an Object of the Enemy's Ability
     */
    heal(){

        let returnObject = {};

        returnObject.heal =  UtilityRandom.getRandomInt(1,this.healAmount);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Red) + " healed " + returnObject.heal + " HP.";


        return returnObject;

    }

    /**
     * Heals a certain amount of Health
     * @param{Number} heal The Heal-Value, which is added to the enemy's current health
     */
    healDmg(heal){
        if(this.currentHealth+heal >= this.maxHealth){
            this.currentHealth = this.maxHealth;
        }else{
            this.currentHealth += heal;
        }
    }

    /**
     * Receives Damage
     * @param dmg The Damage received
     */
    receiveDmg(dmg){

        this.currentHealth  -= dmg;
        if(this.currentHealth <= 0){
            this.currentHealth = 0;
            this.isAlive = false;
        }

    }
}
export {Enemy}