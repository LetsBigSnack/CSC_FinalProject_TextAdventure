import {Enemy} from "../../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Circuit in the game.
 */
class Circuit extends Enemy{

    asciiImage = [
        "              .--------.",
        "           ___|  _  _  |______________________",
        "          /   |  || ||_|___              _   /;",
        "         /.--------.      /|___    )    (/) //",
        "        / |  _  _  |     / ___ \\          //",
        "       /  |  || || |____/ ___ \\(\\)      //",
        "      /   |  || || |    | /  \\(\\)      //",
        "     /    |________|____|/   (\\)       //",
        "    / _                           __   //",
        "   / (\\)                   +(_)  -(=)//",
        "  /__________________________________//",
        "  `----------------------------------'"
    ];

    constructor() {
        super();
        this.name = "Circuit";
        this.isAlive = true;
        this.currentHealth = 256;
        this.maxHealth = this.currentHealth;
        this.dmg = 16;
        this.healAmount = 8;
        this.maxHealth = 256;
        this.xp = 16;
        this.isBoss = true;
    }


}
export {Circuit};