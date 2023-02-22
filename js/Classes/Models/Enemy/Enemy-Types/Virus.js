import {Enemy} from "../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Virus in the game.
 */
class Virus extends Enemy{

    asciiImage = [
        "              .",
        "           ,'/ \\`.",
        "          |\\/___\\/|",
        "          \\'\\   /`/",
        "           `.\\ /,'",
        "              |",
        "              |",
        "             |=|",
        "        /\\  ,|=|.  /\\",
        "    ,'`.  \\/ |=| \\/  ,'`.",
        "  ,'    `.|\\ `-' /|,'    `.",
        ",'   .-._ \\ `---' / _,-.   `.",
        "   ,'    `-`-._,-'-'    `."
    ];

    constructor() {
        super();
        this.name = "Virus";
        this.isAlive = true;
        this.currentHealth = 64;
        this.maxHealth = this.currentHealth;
        this.dmg = 12;
        this.healAmount = 6;
        this.maxHealth = 64;
        this.xp = 4;
        this.isBoss = false;
    }


}
export {Virus}