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

class Battle{

    constructor() {
        this.player = undefined;
        this.enemy = undefined;
        this.info_text = "Enemy encountered: "+ UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Red);
    }

    addPlayer(player){
        this.player = player;
    }
    addEnemy(enemy){
        this.enemy = enemy;
    }

    toggleBattleScreen(){
        if(battleScreen.style.display === "none"){
            battle_error.innerHTML = "";
            battleScreen.style.display = "block";
            adventureScreen.style.display = "none";
        }else{
            battleScreen.style.display = "none";
            adventureScreen.style.display = "block";

        }
    }

    display(){

        battle_info.innerHTML = this.info_text;
        this.displayPlayer();
        this.displayPlayerActions();
        this.displayEnemy();
        this.displayEnemyASCIIImage();
    }

    displayPlayer(){
        let currentHealth = this.player.currentHealth;
        let maxHealth = this.player.maxHealth;
        let currentMana = this.player.currentMana;
        let maxMana = this.player.maxMana;

        battle_player_info.name.innerHTML = UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Gold) + " [" +this.player.level+ "]:";
        battle_player_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_player_info.healthBar.innerHTML = this.createBar(currentHealth, maxHealth);
        battle_player_info.mana.innerHTML = UtilityText.colorText("[MP]", UtilityText.TEXT_COLORS.DarkBlue) + ": " + currentMana + "/" + maxMana;
        battle_player_info.manaBar.innerHTML = this.createBar(currentMana, maxMana);
    }

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

    displayEnemy(){
        let currentHealth = this.enemy.currentHealth;
        let maxHealth = this.enemy.maxHealth;

        battle_enemy_info.name.innerHTML = UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Red)+":";
        battle_enemy_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_enemy_info.healthBar.innerHTML = this.createBar(currentHealth, maxHealth);

    }

    displayEnemyASCIIImage(){
        let enemyASCII = this.enemy.asciiImage;
        battle_enemy_info.ascii.innerHTML = "";
        for (let i = 0; i < enemyASCII.length; i++){
            battle_enemy_info.ascii.innerHTML += enemyASCII[i].replaceAll(" ", UtilityText.TEXT_SYMBOL.Space) + UtilityText.TEXT_SYMBOL.NewLine;
        }
    }

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
        }

        if(!this.player.isAlive){
            this.info_text += UtilityText.TEXT_SYMBOL.NewLine + UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Blue) + " has been defeated!";
        }

        this.display();

    }

    fight(command) {
        //TODO change 02:00 am code to many if-statements

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
                    this.enemy.receiveDmg(returnObject.dmg);
                }
                if (returnObject.heal) {
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

    enemyFight(){
        let returnObjectEnemy = this.enemy.makeBattleMove();

        if(returnObjectEnemy.dmg){
            this.player.receiveDmg(returnObjectEnemy.dmg);
        }
        if(returnObjectEnemy.heal){
            this.enemy.healDmg(returnObjectEnemy.heal);
        }
        this.info_text += UtilityText.TEXT_SYMBOL.NewLine + returnObjectEnemy.text;


    }

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
            battle_error.innerHTML = UtilityText.colorText("Failed to run away!", UtilityText.TEXT_COLORS.Red);
        }
    }

    escape(){
        adventureGame.currentState = AdventureGame.States.Explore;
        this.toggleBattleScreen();
        content.scrollTop = content.scrollHeight;
    }

    createBar(currentValue, maxValue){
        let returnText = "[";

        let valuePercentage =  currentValue/maxValue;

        let valueSteps = Math.round(20 * valuePercentage);

        for (let i = 0; i < valueSteps; i++){
            returnText += "|";
        }
        for (let i = valueSteps; i < 20; i++){
            returnText += "-";
        }
        returnText += "]";
        return returnText;
    }




}
export {Battle};