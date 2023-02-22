/**
 * This Class is used to house all the Function which revolve around RandomNumber.
 * This UtilityMusic class is used across the whole Project to make interaction with the Dice-rolls more comfortable.
 */
class UtilityRandom{

    /**
     * Generates a Random Integer based on given parameters
     * @param{number} min The minimum Value for the Generation
     * @param{number} max The maximum Value for the Generation
     * @returns {number} Returns the generated Integer
     */
    static getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

}
export {UtilityRandom}