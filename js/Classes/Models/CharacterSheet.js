import {
    adventureGame,
    adventureScreen,
    content
} from "../../SetUpGame.js";
import {UtilityText} from "../Utility/UtilityText.js";
import {AdventureGame} from "./AdventureGame.js";

/**
 * This Class is used to represent the "CharacterSheet" and it's Logic.
 * This CharacterSheet class is used to display the Player and it's abilities in a short and understandable form.
 */
class CharacterSheet {

    /**
     * The class constructor for the class "CharacterSheet"
     */
    constructor() {
        this.characterScreen = document.querySelector("#characterScreen");
        this.playerInfo = {
            "name": document.querySelector("#sheet_player_name"),
            "class": document.querySelector("#sheet_player_class"),
            "health": document.querySelector("#sheet_player_health"),
            "healthBar": document.querySelector("#sheet_player_health_bar"),
            "mana": document.querySelector("#sheet_player_mana"),
            "manaBar": document.querySelector("#sheet_player_mana_bar"),
            "xp": document.querySelector("#sheet_player_xp"),
            "xpBar": document.querySelector("#sheet_player_xp_bar")
        }
        this.playerStats = {
            "Strength" : document.querySelector("#sheet_stat_str"),
            "Dexterity" :document.querySelector("#sheet_stat_dex"),
            "Constitution" : document.querySelector("#sheet_stat_con"),
            "Intelligence" :  document.querySelector("#sheet_stat_int"),
            "Wisdom" : document.querySelector("#sheet_stat_wis"),
            "Charisma" : document.querySelector("#sheet_stat_cha")
        }

        this.remaingPoints = document.querySelector("#sheet_remaining");
        this.abilities = document.querySelector("#sheet_abilities");
        this.player = undefined;
    }

    /**
     * Sets the player for the CharacterSheet
     * @param{Player} player
     */
    setPlayer(player){
        this.player = player;
        this.addActionListenerStats();
    }

    /**
     * Displays the CharacterSheet and hides the AdventureScreen
     */
    displayCharacterScreen(){
        this.characterScreen.style.display = "grid";
        adventureScreen.style.display = "none";
    }

    /**
     * Displays the Character in HTML-Form
     */
    display(){
        this.player.resetStats();
        this.displayPlayerInfo();
        this.displayAttributes();
        this.displayAbilities();
    }

    /**
     * Displays the basic Player Info
     */
    displayPlayerInfo(){

        let currentHealth = this.player.currentHealth;
        let maxHealth = this.player.maxHealth;
        let currentMana = this.player.currentMana;
        let maxMana = this.player.maxMana;
        let currentXp = this.player.xp;
        let maxXP = this.player.xpThreshhold;

        this.playerInfo.name.innerHTML = UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Pink) + " " +
            UtilityText.colorText("["+this.player.level+"]", UtilityText.TEXT_COLORS.Gold);
        this.playerInfo.class.innerHTML = "Class: "+ UtilityText.colorText(this.player.className, UtilityText.TEXT_COLORS.Green);
        this.playerInfo.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        this.playerInfo.healthBar.innerHTML = UtilityText.createBar(currentHealth, maxHealth,20);
        this.playerInfo.mana.innerHTML = UtilityText.colorText("[MP]", UtilityText.TEXT_COLORS.DarkBlue) + ": " + currentMana + "/" + maxMana;
        this.playerInfo.manaBar.innerHTML = UtilityText.createBar(currentMana, maxMana,20);
        this.playerInfo.xp.innerHTML = UtilityText.colorText("[XP]", UtilityText.TEXT_COLORS.Green) + ": " + currentXp + "/" + maxXP;
        this.playerInfo.xpBar.innerHTML = UtilityText.createBar(currentXp, maxXP,20);

    }

    /**
     * Displays the Player Stats
     */
    displayAttributes(){
        for (const [key, value] of Object.entries(this.playerStats)) {
            value.innerHTML = UtilityText.createBar(this.player.stats[key],10,10);
        }
        this.remaingPoints.innerHTML = UtilityText.colorText("["+this.player.statPoints+"]", UtilityText.TEXT_COLORS.Red);
    }

    /**
     * Hides the Character Screen and displays the adventure game
     */
    hideCharacterScreen(){

        this.characterScreen.style.display = "none";
        adventureScreen.style.display = "block";
        if(adventureGame.isInDungeon){
            adventureGame.currentState = AdventureGame.States.Dungeoneering;
        }else{
            adventureGame.currentState = AdventureGame.States.Explore;
        }
        content.scrollTop = content.scrollHeight;
        adventureGame.clearScreen();
    }

    /**
     * Adds EventListeners to the buttons
     */
    addActionListenerStats(){
        let keys = Array.from(Object.keys(this.playerStats));

        for (const statName in keys) {
            let tmpAddButton = document.querySelector("#sheet_add_stat_"+keys[statName]);
            let tmpSubButton = document.querySelector("#sheet_sub_stat_"+keys[statName]);
            //to prevent multiple actions listeners for the same object
            tmpAddButton.replaceWith(tmpAddButton.cloneNode(true));
            tmpSubButton.replaceWith(tmpSubButton.cloneNode(true));

            document.querySelector("#sheet_add_stat_"+keys[statName]).addEventListener("click", () => {
                this.player.addStat(keys[statName]);
                this.display();
            });

            document.querySelector("#sheet_sub_stat_"+keys[statName]).addEventListener("click", () => {
                this.player.subStat(keys[statName]);
                this.display();
            });
        }

        let tmpButton = document.querySelector("#characterScreen_exit");
        //to prevent multiple actions listeners for the same object
        tmpButton.replaceWith(tmpButton.cloneNode(true));
        document.querySelector("#characterScreen_exit").addEventListener("click", () => {
            this.player.setDefaultStats();
            this.hideCharacterScreen();
        });

    }

    /**
     * Displays the Player Abilities
     */
    displayAbilities() {

        let abilityObject = [
            this.player.describe_Attack(),
            this.player.describe_Heal(),
            this.player.describe_Ult()
        ];

        this.abilities.innerHTML = "";
        for(let i = 0; i < abilityObject.length; i++){
            let tempLi = document.createElement("li");
            let tempTitle = document.createElement("p");
            let tempText = document.createElement("p");

            tempTitle.innerHTML = UtilityText.colorText(abilityObject[i].name, UtilityText.TEXT_COLORS.Blue);
            tempText.innerHTML = abilityObject[i].text;
            tempLi.appendChild(tempTitle);
            tempLi.appendChild(tempText);

            this.abilities.appendChild(tempLi);
        }

    }
}
export {CharacterSheet}