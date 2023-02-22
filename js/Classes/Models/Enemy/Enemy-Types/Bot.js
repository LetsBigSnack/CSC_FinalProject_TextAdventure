import {Enemy} from "../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Bot in the game.
 */
class Bot extends Enemy{

    asciiImage = [
        "   _______________   ",
        "  |  ___________  |  ",
        "  | |   \\   /   | |  ",
        "  | |   0   0   | |  ",
        "  | |     -     | |  ",
        "  | |   ^^^^^   | |  ",
        "  | |___^^^^^___| |  ",
        "  |_____|\\_/|_____|  ",
        "    _|__|/ \\|_|_.",
        " /  ************  \\   ",
        "-------------------- "
    ];

    constructor() {
        super();
        this.name = "Bot";
        this.isAlive = true;
        this.currentHealth = 128;
        this.maxHealth = this.currentHealth;
        this.dmg = 6;
        this.healAmount = 12;
        this.maxHealth = 128;
        this.xp = 4;
        this.isBoss = false;
    }


}
export {Bot}