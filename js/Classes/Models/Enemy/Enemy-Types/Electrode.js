import {Enemy} from "../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Electrode in the game.
 */
class Electrode extends Enemy{

    asciiImage = [
        "          .--.",
        "         | .-.|",
        "         |T  ||",
        "        [_|__|_]",
        "          |  |",
        "          |  |",
        "          |  |"
    ];

    constructor() {
        super();
        this.name = "Electrode";
        this.isAlive = true;
        this.currentHealth = 32;
        this.maxHealth = this.currentHealth;
        this.dmg = 10;
        this.healAmount = 4;
        this.maxHealth = 32;
        this.xp = 2;
        this.isBoss = false;
    }


}
export {Electrode}