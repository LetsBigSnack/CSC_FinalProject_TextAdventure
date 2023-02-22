import {
    battleScreen,
    adventureScreen,
    battle_player_info,
    battle_enemy_info,
    battle_info,
    battle_error, content, adventureGame
} from "../../SetUpGame.js";
import {Enemy} from "./Enemy/Enemy.js";
import {UtilityText} from "../Utility/UtilityText.js";
import {AdventureGame} from "./AdventureGame.js";
import {UtilityMusic} from "../Utility/UtilityMusic.js";

/**
 * This Class is used to represent the "Battle" and it's Logic.
 * This Battle class is used to store everything necessary for a battle and handle the player's actions.
 */
class Battle{

    /**
     * The class constructor for the class "Battle"
     */
    constructor() {
        this.player = undefined;
        this.enemy = undefined;
        this.info_text = "";
        this.playerLVL = undefined;
        this.xpReceived = false;
    }

    /**
     * Adds a Player to the battle scene
     * @param{Player} player The Player, which will be added
     */
    addPlayer(player){
        this.player = player;
        this.playerLVL = this.player.level;
    }

    /**
     * Adds an Enemy to the battle scene
     * @param{Enemy} enemy The Enemy, which will be added
     */
    addEnemy(enemy){
        this.enemy = enemy;
        this.info_text = "Enemy encountered: "+ UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Red);
    }

    /**
     * Toggles the Scene to either display or hide the Battle Screen
     */
    toggleBattleScreen(){
        if(battleScreen.style.display === "none"){
            this.displayBattleScreen();
        }else{
           this.hideBattleScreen();
        }
    }

    /**
     * Displays the Battle Screen and hides all other screens
     */
    displayBattleScreen(){
        battle_error.innerHTML = "";
        battleScreen.style.display = "block";
        adventureScreen.style.display = "none";
    }

    /**
     * Hides the Battle Screen and displays the AdventureScreen
     */
    hideBattleScreen(){
        adventureGame.clearScreen();
        battleScreen.style.display = "none";
        adventureScreen.style.display = "block";
    }

    /**
     * Displays all the necessary Information for the Battle Screen
     */
    display(){

        battle_info.innerHTML = this.info_text;
        this.displayPlayer();
        this.displayPlayerActions();
        this.displayEnemy();
        this.displayEnemyASCIIImage();
    }

    /**
     * Displays the Player-Stats
     */
    displayPlayer(){
        let currentHealth = this.player.currentHealth;
        let maxHealth = this.player.maxHealth;
        let currentMana = this.player.currentMana;
        let maxMana = this.player.maxMana;

        battle_player_info.name.innerHTML = UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Gold) + " [" +this.player.level+ "]:";
        battle_player_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_player_info.healthBar.innerHTML = UtilityText.createBar(currentHealth, maxHealth,20);
        battle_player_info.mana.innerHTML = UtilityText.colorText("[MP]", UtilityText.TEXT_COLORS.DarkBlue) + ": " + currentMana + "/" + maxMana;
        battle_player_info.manaBar.innerHTML = UtilityText.createBar(currentMana, maxMana,20);
    }

    /**
     * Displays all available Player Actions
     */
    displayPlayerActions(){
        let playerActions = this.player.abilities;
        battle_player_info.actions.innerHTML = "";

        if(this.player.isAlive){

            if(this.enemy.isAlive){
                for(let i = 0; i < playerActions.length; i++){
                    let tmpListItem = document.createElement("li");
                    tmpListItem.innerHTML = UtilityText.emphasizeFirstLetter(i+"", "[","]", UtilityText.TEXT_COLORS.Blue) +
                        " " + playerActions[i].name + " "+ UtilityText.colorText("["+playerActions[i].mp+"]", UtilityText.TEXT_COLORS.DarkBlue);

                    battle_player_info.actions.appendChild(tmpListItem);
                }
                let tmpListItem = document.createElement("li");
                tmpListItem.innerHTML = UtilityText.emphasizeFirstLetter("X", "[","]", UtilityText.TEXT_COLORS.Red) +
                    "Try to run";
                battle_player_info.actions.appendChild(tmpListItem);
            }else{
                let tmpListItem = document.createElement("li");
                tmpListItem.innerHTML = UtilityText.emphasizeFirstLetter("X", "[","]", UtilityText.TEXT_COLORS.Red) +
                    "Leave Battle";
                battle_player_info.actions.appendChild(tmpListItem);
            }
        }else{
            let tmpListItem = document.createElement("li");
            tmpListItem.innerHTML = UtilityText.emphasizeFirstLetter("X", "[","]", UtilityText.TEXT_COLORS.Red) +
                "Restart Game";
            battle_player_info.actions.appendChild(tmpListItem);
        }
    }

    /**
     * Displays the Enemy-Stats
     */
    displayEnemy(){
        let currentHealth = this.enemy.currentHealth;
        let maxHealth = this.enemy.maxHealth;

        battle_enemy_info.name.innerHTML = UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Red)+":";
        battle_enemy_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_enemy_info.healthBar.innerHTML = UtilityText.createBar(currentHealth, maxHealth,20);

    }

    /**
     * Displays the Enemy's Visual Representation
     */
    displayEnemyASCIIImage(){
        let enemyASCII = this.enemy.asciiImage;
        battle_enemy_info.ascii.innerHTML = "";
        for (let i = 0; i < enemyASCII.length; i++){
            battle_enemy_info.ascii.innerHTML += enemyASCII[i].replaceAll(" ", UtilityText.TEXT_SYMBOL.Space) + UtilityText.TEXT_SYMBOL.NewLine;
        }
    }

    /**
     * Handles the user input
     * @param{string} command The user input
     */
    interact(command){
        battle_error.innerHTML = "";
        this.info_text = "";

        switch (command){
            case "X":
                if(this.player.isAlive){
                    if(this.enemy.isAlive){
                        this.run();
                    }else{
                        this.escape();
                    }
                }else{
                    AdventureGame.restartGame();
                }
                break;
            default:
                if(this.player.isAlive){
                    this.fight(command);
                }
        }

        if(this.enemy.isAlive && this.player.isAlive){
            this.enemyFight();
        }else{
            this.info_text += UtilityText.TEXT_SYMBOL.NewLine +  UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Red) + " has been defeated!";
            this.info_text += UtilityText.TEXT_SYMBOL.NewLine +  UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Blue) + " gained "+
                UtilityText.colorText(this.enemy.xp, UtilityText.TEXT_COLORS.Green)+" XP!";
            if(!this.xpReceived){
                this.player.receiveXP(this.enemy.xp);
                this.xpReceived = true;
                UtilityMusic.playRandomSound(UtilityMusic.SOUND_CLIPS.POSITIVE);
            }
            if(this.player.level > this.playerLVL){
                this.info_text += UtilityText.TEXT_SYMBOL.NewLine +  UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Blue) + "  "+
                    UtilityText.colorText("Leveled Up", UtilityText.TEXT_COLORS.Gold)+"!";
            }

        }

        if(!this.player.isAlive){
            this.info_text += UtilityText.TEXT_SYMBOL.NewLine + UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Blue) + " has been defeated!";
        }
        this.playerHeal=undefined;
        this.display();

    }

    /**
     * Executes the User Input for the Battle
     * @param{string} command The user input
     */
    fight(command) {

        if (this.player.abilities[(Number(command))]) {
            let returnObject;
            switch (Number(command)) {
                case 0:
                    returnObject = this.player.ability_attack();
                    break;
                case 1:
                    returnObject = this.player.ability_heal();
                    break;
                case 2:
                    returnObject = this.player.ability_ult();
                    break;

            }

            if (returnObject.text) {
                if (returnObject.dmg) {
                    UtilityMusic.playRandomSound(UtilityMusic.SOUND_CLIPS.ATTACK);
                    this.enemy.receiveDmg(returnObject.dmg);
                }
                if (returnObject.heal) {
                    UtilityMusic.playRandomSound(UtilityMusic.SOUND_CLIPS.ABILITIES);
                    console.log("heal"+returnObject.heal);
                    this.playerHeal = returnObject.heal;
                    this.player.heal(returnObject.heal);
                }
                this.info_text += returnObject.text;


                } else {
                    battle_error.innerHTML = UtilityText.colorText("Not enough Mana to use the ability", UtilityText.TEXT_COLORS.Red)
                }
            } else {
                battle_error.innerHTML = UtilityText.colorText("BEEP BOOP undefined choice", UtilityText.TEXT_COLORS.Red);
            }
        }

    /**
     * Executes the Enemies Actions
     */
    enemyFight(){
        let returnObjectEnemy = this.enemy.makeBattleMove();

        if(returnObjectEnemy.dmg){
            UtilityMusic.playRandomSound(UtilityMusic.SOUND_CLIPS.ATTACK);
            if(this.playerHeal){
                this.player.receiveDmg(returnObjectEnemy.dmg-this.playerHeal);
            }else{
                this.player.receiveDmg(returnObjectEnemy.dmg);
            }
        }
        if(returnObjectEnemy.heal){
            UtilityMusic.playRandomSound(UtilityMusic.SOUND_CLIPS.ABILITIES);
            this.enemy.healDmg(returnObjectEnemy.heal);
        }
        this.info_text += UtilityText.TEXT_SYMBOL.NewLine + returnObjectEnemy.text;


    }

    /**
     * Tries to run away from the encounter
     */
    run(){
        let isEscaped = false;

        for(let i = 0; i < this.player.stats.Dexterity; i++){
            let rng = Math.random();

            if(rng >= 0.9){
                isEscaped = true;
                break;
            }
        }

        if(isEscaped){
            this.player.isAlive = true;
            this.escape();
        }else{
            UtilityMusic.playSoundClip(UtilityMusic.SOUND_CLIPS.ERROR[0]);
            battle_error.innerHTML = UtilityText.colorText("Failed to run away!", UtilityText.TEXT_COLORS.Red);
        }
    }

    /**
     * Escapes the encounter
     */
    escape(){
        if(adventureGame.isInDungeon){
            adventureGame.currentState = AdventureGame.States.Dungeoneering;
        }else{
            adventureGame.currentState = AdventureGame.States.Explore;
        }
        this.toggleBattleScreen();
        content.scrollTop = content.scrollHeight;
    }

}
export {Battle};