class UtilityText{

    static TEXT_SYMBOL = {
        NewLine : "<br>",
        NewEmptyLine : "<br><br>",
        Space : "&nbsp;",
        Separator : " | "
    }

    static TEXT_COLORS = {
        Green : "color_green",
        Blue : "color_blue",
        Pink : "color_pink",
        Red : "color_red"
    }

    static colorText(text, color){
        return "<span class='" + color + "'>" + text + "</span>";
    }

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