import {battleScreen, adventureScreen, battle_player_info, battle_enemy_info} from "../../SetUpGame.js";
import {Enemy} from "./Enemy/Enemy.js";
import {UtilityText} from "../Utility/UtilityText.js";

class Battle{

    constructor() {
        this.player = undefined;
        this.enemy = new Enemy();
    }

    addPlayer(player){
        this.player = player;
    }
    addEnemy(enemy){
        this.enemy = enemy;
    }

    toggleBattleScreen(){
        if(battleScreen.style.display === "none"){
            battleScreen.style.display = "block";
            adventureScreen.style.display = "none";
        }else{
            battleScreen.style.display = "none";
            adventureScreen.style.display = "block";

        }
    }

    display(){
        this.displayPlayer();
        this.displayEnemy();
    }

    displayPlayer(){
        let currentHealth = this.player.currentHealth;
        let maxHealth = this.player.maxHealth;
        let currentMana = this.player.currentMana;
        let maxMana = this.player.maxMana;

        battle_player_info.name.innerHTML = UtilityText.colorText(this.player.name, UtilityText.TEXT_COLORS.Gold) + " [" +this.player.level+ "]:";
        battle_player_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_player_info.healthBar.innerHTML = this.createBar(currentHealth, maxHealth);
        battle_player_info.mana.innerHTML = UtilityText.colorText("[MP]", UtilityText.TEXT_COLORS.Blue) + ": " + currentHealth + "/" + maxHealth;
        battle_player_info.manaBar.innerHTML = this.createBar(currentHealth, maxHealth);
    }

    displayEnemy(){
        let currentHealth = this.enemy.currentHealth;
        let maxHealth = this.enemy.maxHealth;

        battle_enemy_info.name.innerHTML = UtilityText.colorText(this.enemy.name, UtilityText.TEXT_COLORS.Gold)+":";
        battle_enemy_info.health.innerHTML = UtilityText.colorText("[HP]", UtilityText.TEXT_COLORS.Red) + ": " + currentHealth + "/" + maxHealth;
        battle_enemy_info.healthBar.innerHTML = this.createBar(currentHealth, maxHealth);

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