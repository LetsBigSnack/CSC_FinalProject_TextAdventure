import {Enemy} from "../Enemy.js";

/**
 * This Class is used for a specific Variant of the Enemy-Class called Resistor in the game.
 */
class Resistor extends Enemy{

    asciiImage = [
        "",
        "     .--.......--.",
        "  .-(   |||| ||   )-.",
        "/   '--'''''''--'   \\"
    ];

    constructor() {
        super();
        this.name = "Resistor";
        this.isAlive = true;
        this.currentHealth = 24;
        this.maxHealth = this.currentHealth;
        this.dmg = 12;
        this.healAmount = 4;
        this.maxHealth = 24;
        this.xp = 5;
        this.isBoss = false;
    }


}
export {Resistor}