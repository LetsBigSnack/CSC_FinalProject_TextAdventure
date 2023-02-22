import {UtilityText} from "../../Utility/UtilityText.js";

/**
 * This Class is used to represent the "Player" entity in the game.
 * This Player class is used to store everything necessary for their representation in the game
 * A Player is an abstract representation of the character the user plays as in the Game.
 */
class Player {

    className = "Player";
    maxHealth;
    currentHealth;
    maxMana;
    currentMana;
    maxStat = 10;
    statPoints = 6;


    /**
     * The class constructor for the class "Player"
     * @param {Player}  obj Object which this Object will be copied to (if not empty)
     */
    constructor(obj = null) {

        this.name = "Player";
        this.maxHealth = undefined;
        this.currentHealth = undefined;
        this.maxMana = undefined;
        this.currentMana = undefined;
        this.level = 1;
        this.xp = 0;
        this.xpThreshhold = 5 + Math.round((4 * (this.level**3)) / 5);
        this.isAlive = true;
        if(obj){
            obj && Object.assign(this, obj);
        }else{
            this.stats = {
                Strength : 3,
                Dexterity: 3,
                Constitution: 3,
                Intelligence: 3,
                Wisdom: 3,
                Charisma: 3
            };
            this.default_stats = Object.assign({}, this.stats);
        }

        this.abilities = [
            {
                "name" : "Basic Attack",
                "mp":0,
            },
            {
                "name" : "Basic Heal",
                "mp":4,
            },
            {
                "name" : "Basic Ultimate",
                "mp":10,
            }
        ];
    }

    /**
     * Reset the Player Health and Mana to their original state after battle
     */
    resetStats(){
        this.currentHealth = Math.round(((this.level) * 1.5) *  (10+this.stats.Constitution));
        this.maxHealth = this.currentHealth;

        this.currentMana = Math.round(((this.level) * 1.5) * (10+this.stats.Intelligence));
        this.maxMana = this.currentMana;
    }

    /**
     * Returns a short description of the Player-Class
     * @returns {string} Returns the Class Description
     */
    describe(){
        return "I am a Player-Class";
    }

    /**
     * Adds a point to a specific Stat / Attribute if possible and spends a statPoint
     * @param {string} statName The stat name in question.
     */
    addStat(statName){
        if(this.stats[statName] < this.maxStat && this.statPoints > 0){
            this.stats[statName]++;
            this.statPoints--;
        }
    }

    /**
     * Subtracts a point to a specific Stat / Attribute if possible and gains a statPoint
     * @param {string} statName The stat name in question.
     */
    subStat(statName){
        //TODO Check default value [maybe]
        if(this.stats[statName] > this.default_stats[statName]){
            this.stats[statName]--;
            this.statPoints++;
        }
    }

    /**
     * Gives a short Overview of the Character / Player
     * @returns {string} Returns an HTML-String representation of the Player and their Stats.
     */
    overview(){
        let returnText;
        returnText = UtilityText.colorText("Overview", UtilityText.TEXT_COLORS.Blue) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Name: " + UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Pink) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Class: " + UtilityText.colorText(this.className, UtilityText.TEXT_COLORS.Green) + UtilityText.TEXT_SYMBOL.NewLine;
        returnText += "Character Attributes: " + UtilityText.TEXT_SYMBOL.NewLine;
        for (const statName in this.stats) {
            returnText += UtilityText.TEXT_SYMBOL.Tab + "- "+ UtilityText.colorText(statName, UtilityText.TEXT_COLORS.Gold) + " : " + this.stats[statName] + UtilityText.TEXT_SYMBOL.NewLine;
        }
        return returnText;
    }

    /**
     * Displays all the Stats and their Value
     * @returns {string} Returns their Stats / Attributes and their value in an HTML-Format
     */
    displayStats(){
        let returnText = "";

        for (const statName in this.stats) {
            returnText += UtilityText.colorText(statName, UtilityText.TEXT_COLORS.Gold) + " : " + this.stats[statName] + UtilityText.TEXT_SYMBOL.NewLine;
        }

        return returnText
    }


    /**
     * Performance an Attack, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Attack
     */
    ability_attack(){

        let returnObject = {};

        returnObject.dmg = Math.round(Math.random() * this.stats.Strength);
        returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " dealt " + returnObject.dmg + " damage.";

        return returnObject;
    }

    /**
     * Describes the Player Attack, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Attack Description
     */
    describe_Attack(){
        let returnObject = {};
        returnObject.name = "Basic Attack";
        returnObject.text = "Basic Attack does some DMG";
        return returnObject;
    }

    /**
     * Performance a Heal, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Heal
     */
    ability_heal(){
        let returnObject = {};

        if(this.currentMana-this.abilities[1].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[1].mp;
            returnObject.heal = Math.round(Math.random() * this.stats.Wisdom);
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " healed " + returnObject.heal + " HP.";
        }

        return returnObject;

    }

    /**
     * Describes the Player Heal, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Heal Description
     */
    describe_Heal(){
        let returnObject = {};
        returnObject.name = "Basic Heal";
        returnObject.text = "Basic Heal heals some HP";
        return returnObject;
    }

    /**
     * Performance an Ultimate Ability, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Ultimate
     */
    ability_ult(){
        let returnObject = {};
        if(this.currentMana-this.abilities[2].mp >= 0){
            this.currentMana = this.currentMana-this.abilities[2].mp;
            returnObject.dmg = Math.round(Math.random() * this.stats.Strength)*2;
            returnObject.text = UtilityText.colorText(this.name, UtilityText.TEXT_COLORS.Blue) + " dealt " + returnObject.dmg + " damage with their Ultimate.";
        }
        return returnObject;
    }

    /**
     * Describes the Player Heal, based on behaviour of the class
     * @returns {{}} Returns an Object of the Player's Heal Description
     */
    describe_Ult(){
        let returnObject = {};
        returnObject.name = "Ultimate Attack";
        returnObject.text = "Ultimate Attack does massive DMG";
        return returnObject;
    }

    /**
     * Heals a certain amount of Health
     * @param{Number} heal The Heal-Value, which is added to the enemy's current health
     */
    heal(heal){
        this.currentHealth += heal;
        if(this.currentHealth >= this.maxHealth){
            this.currentHealth = this.maxHealth;
        }

    }

    /**
     * Receives Damage
     * @param dmg The Damage received
     */
    receiveDmg(dmg){
        if(dmg > 0){
            this.currentHealth  -= dmg;
            if(this.currentHealth <= 0){
                this.currentHealth = 0;
                this.isAlive = false;
            }
        }
    }

    /**
     * Receives XP
     * @param xp The XP received
     */
    receiveXP(xp){
        console.log("XP");
        this.xp += xp;
        if(this.xp >= this.xpThreshhold){
            this.xp = 0;
            this.statPoints++;
            this.level++;
            this.calcNextLvl();
        }
    }

    /**
     * Calculates the xp Threshold,which is needed for the next level
     */
    calcNextLvl(){
        this.xpThreshhold =5 + Math.round((4 * (this.level**3)) / 5);
    }

    /**
     * Sets the Default Stats to the value of current Stats
     */
    setDefaultStats(){
        this.default_stats = Object.assign({}, this.stats);
    }

}

export {Player};
