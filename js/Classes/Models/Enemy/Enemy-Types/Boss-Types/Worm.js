import {Enemy} from "../../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Worm in the game.
 */
class Worm extends Enemy{

    asciiImage = [
        "        @@@@@@@@                  ",
        "      @@--------@@                ",
        "    @@####--####--@@          ",
        "  @@--##@@--@@##--@@              ",
        "  @@--##@@--@@##--@@              ",
        "  @@--------------@@              ",
        "  @@--##------##--@@              ",
        "    @@--######--@@                ",
        "      @@------@@                  ",
        "      @@------@@                  ",
        "        @@--------@@           ",
        "          @@--------@@@@@@@@@@@@@             ",
        "        @@-----------------------@@           ",
        "        @@-------------------------@@@@       ",
        "        @@----@@@@@@@@@@@@@------------@@     ",
        "          @@@@             @@@@@@------@@     "
    ];

    constructor() {
        super();
        this.name = "Worm";
        this.isAlive = true;
        this.currentHealth = 412;
        this.maxHealth = this.currentHealth;
        this.dmg = 10;
        this.healAmount = 10;
        this.maxHealth = 412;
        this.xp = 12;
        this.isBoss = true;
    }


}
export {Worm}