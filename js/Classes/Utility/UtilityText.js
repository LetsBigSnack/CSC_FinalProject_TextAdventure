/**
 * This Class is used to house all the Function which revolve around Text, and it's representation.
 * This UtilityText class is used across the whole Project to make interaction with the Text more readable and streamline the process.
 * This also includes useful constant.
 */
class UtilityText{

    static TEXT_SYMBOL = {
        NewLine : "<br>",
        NewEmptyLine : "<br><br>",
        Space : "&nbsp;",
        Separator : " | ",
        TerminalArrow : "&#62;"
    }

    static TEXT_COLORS = {
        Green : "color_green",
        Blue : "color_blue",
        Pink : "color_pink",
        Red : "color_red",
        Gold: "color_gold"
    }

    /**
     * Changes the colors of a given Text in an HTML representation.
     * @param {string} text The text which is to be changed
     * @param {UtilityText.TEXT_COLORS} color The color which the text will be changed to
     * @returns {string} Returns an HTML string where the text is changed into a color
     */
    static colorText(text, color){
        return "<span class='" + color + "'>" + text + "</span>";
    }

    /**
     * Empathizes the first Letter of a given String with color and if provided a String before and after in an HTML representation
     * @param {string} text The Text which is going to be empathized
     * @param {string} before The String, which is to be put before the first letter of the string
     * @param {string} after The String, which is to be put after the first letter of the string
     * @param {UtilityText.TEXT_COLORS} color The color which the first letter of the text will be changed to
     * @returns {string} Returns an HTML string where the text is changed
     */
    static emphasizeFirstLetter(text, before, after, color){
        let returnText = "";
        for(let i = 0; i < text.length; i++){
            if(i === 0){
                returnText = "<span class='"+color+"'>"+before + text[i] + after+"</span>";
            }else{
                returnText += text[i];
            }
        }
        return returnText;
    }
}

export {UtilityText};