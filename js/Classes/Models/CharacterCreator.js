import {UtilityText} from "../Utility/UtilityText.js";
import {AdventureGame} from "./AdventureGame.js";
import {KeyboardWarrior} from "./Player/Archetypes/KeyboardWarrior.js";
import {OnlineInfluencer} from "./Player/Archetypes/OnlineInfluencer.js";
import {HackerMan} from "./Player/Archetypes/HackerMan.js";
import {ArchLinuxUser} from "./Player/Archetypes/ArchLinuxUser.js";
import {TwitterUser} from "./Player/Archetypes/TwitterUser.js";
import {Furry} from "./Player/Archetypes/Furry.js";
import {
    attributeDiv,
    contentInput,
    stats,
    remainingPoints,
    addStat,
    subStat,
    doneBtn,
    test
} from "../../SetUpGame.js";


class CharacterCreator{


    static CREATION_STEPS = {
        Name : "Give your Character a Name:",
        NameConfirm : "Do you want to name your character.",
        Class: "Select a Class:",
        ClassConfirm: "Class Confirm",
        Attributes : "Spend your attribute points:",
        AttributesConfirm : "Are you sure?",
        Finished : "Character Created!!",
        Done : "Created Created"
    };

    static CLASS_SELECTION = [
        new KeyboardWarrior(),
        new OnlineInfluencer(),
        new HackerMan(),
        new ArchLinuxUser(),
        new Furry(),
        new TwitterUser()
    ];


    constructor() {
        this.currentStep = CharacterCreator.CREATION_STEPS.Name;
        this.name = "";
        this.selectedClass = undefined;
    }

    describe(){
        let returnText;
        switch (this.currentStep){
            case CharacterCreator.CREATION_STEPS.Name:
                returnText = "Give your Character a Name:";
                break;
            case CharacterCreator.CREATION_STEPS.NameConfirm:
                returnText =  "You have selected '" + this.name + "' as your character name." + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += "Are you happy with your choice?" + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += UtilityText.emphasizeFirstLetter("Yes", "[", "]", UtilityText.TEXT_COLORS.Green) + " ";
                returnText += UtilityText.emphasizeFirstLetter("No", "[", "]", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewLine;
                break;
            case CharacterCreator.CREATION_STEPS.Class:
                returnText = "Select Your Class:"+ UtilityText.TEXT_SYMBOL.NewLine;
                CharacterCreator.CLASS_SELECTION.forEach((value, index) => {
                    returnText +=UtilityText.colorText("["+index+"]", UtilityText.TEXT_COLORS.Blue) + " " + value.className + UtilityText.TEXT_SYMBOL.NewLine;
                });
                break;
            case CharacterCreator.CREATION_STEPS.ClassConfirm:
                returnText = this.selectedClass.describe()+ UtilityText.TEXT_SYMBOL.NewLine;
                returnText +=  "You have selected '" + this.selectedClass.className+ "' as your character class." + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += "Are you happy with your choice?" + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += UtilityText.emphasizeFirstLetter("Yes", "[", "]", UtilityText.TEXT_COLORS.Green) + " ";
                returnText += UtilityText.emphasizeFirstLetter("No", "[", "]", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewLine;
                break;
            case CharacterCreator.CREATION_STEPS.Attributes:
                this.allocateAttributesDisplay();
                returnText = "Allocate your " + UtilityText.colorText("Attributes", UtilityText.TEXT_COLORS.Gold) + ":" + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += "Click on " + UtilityText.colorText("[Done]", UtilityText.TEXT_COLORS.Green) + ", when finished" + UtilityText.TEXT_SYMBOL.NewLine;
                break;
            case CharacterCreator.CREATION_STEPS.AttributesConfirm:
                returnText =  "You have selected the following stats:" + UtilityText.TEXT_SYMBOL.NewLine;
                //TODO add in Player.js to eleminate DRY
                for (const statName in this.selectedClass.stats) {
                    returnText += UtilityText.colorText(statName, UtilityText.TEXT_COLORS.Gold) + " : " + this.selectedClass.stats[statName] + UtilityText.TEXT_SYMBOL.NewLine;
                }
                returnText += UtilityText.TEXT_SYMBOL.NewLine;
                returnText +=  "Are you happy with your choice?" + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += UtilityText.emphasizeFirstLetter("Yes", "[", "]", UtilityText.TEXT_COLORS.Green) + " ";
                returnText += UtilityText.emphasizeFirstLetter("No", "[", "]", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewLine;
                break;
            case CharacterCreator.CREATION_STEPS.Finished:
                returnText = this.selectedClass.overview() + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += "Are you happy with the Character? " + UtilityText.TEXT_SYMBOL.NewLine;
                returnText +=  "By choosing "+ UtilityText.emphasizeFirstLetter("No", "[", "]", UtilityText.TEXT_COLORS.Red)+" the creation process can be started again." + UtilityText.TEXT_SYMBOL.NewLine;
                returnText += UtilityText.emphasizeFirstLetter("Yes", "[", "]", UtilityText.TEXT_COLORS.Green) + " ";
                returnText += UtilityText.emphasizeFirstLetter("No", "[", "]", UtilityText.TEXT_COLORS.Red) + UtilityText.TEXT_SYMBOL.NewLine;
                break;
            case CharacterCreator.CREATION_STEPS.Done:
                returnText =  UtilityText.colorText("Character Created!!", UtilityText.TEXT_COLORS.Gold) + UtilityText.TEXT_SYMBOL.NewLine;

        }
        return returnText;
    }


    createCharacter(command){
        let returnText;
        let confirm;
        switch (this.currentStep){
            case CharacterCreator.CREATION_STEPS.Name:
                //DO Something
                this.name = command;
                this.currentStep = CharacterCreator.CREATION_STEPS.NameConfirm;
                returnText = this.describe();
                break;
            case CharacterCreator.CREATION_STEPS.NameConfirm:
                confirm = this.confirmDialog(command, CharacterCreator.CREATION_STEPS.Name, CharacterCreator.CREATION_STEPS.Class);
                if(confirm){
                    returnText = confirm;
                }else{
                    returnText = this.describe();
                }
                break;
            case CharacterCreator.CREATION_STEPS.Class:
                let classSelect = this.selectClass(command);
                if(classSelect){
                    returnText = classSelect;
                }else{
                    this.currentStep = CharacterCreator.CREATION_STEPS.ClassConfirm;
                    returnText = this.describe();
                }
                break;
            case CharacterCreator.CREATION_STEPS.ClassConfirm:
                confirm = this.confirmDialog(command, CharacterCreator.CREATION_STEPS.Class, CharacterCreator.CREATION_STEPS.Attributes);
                if(confirm){
                    returnText = confirm;
                }else{
                    returnText = this.describe();
                    this.addActionListenerStats();
                }
                break;
            case CharacterCreator.CREATION_STEPS.Attributes:
                this.currentStep = CharacterCreator.CREATION_STEPS.AttributesConfirm;
                returnText = this.describe();
                break;
            case CharacterCreator.CREATION_STEPS.AttributesConfirm:
                confirm = this.confirmDialog(command, CharacterCreator.CREATION_STEPS.Attributes, CharacterCreator.CREATION_STEPS.Finished);
                if(confirm){
                    returnText = confirm;
                }else{
                    this.selectedClass.name = this.name;
                    returnText = this.describe();
                    this.addActionListenerStats();
                }
                break;
            case CharacterCreator.CREATION_STEPS.Finished:
                confirm = this.confirmDialog(command, CharacterCreator.CREATION_STEPS.Name, CharacterCreator.CREATION_STEPS.Done);
                if(confirm){
                    returnText = confirm;
                }else{
                    returnText = this.describe();
                    this.addActionListenerStats();
                }
                break;
            case CharacterCreator.CREATION_STEPS.Done:

                break;
        }
        return returnText;
    }

    confirmDialog(command, previousStep, nextStep){
        let returnText = "";

        switch (command){
            case AdventureGame.USER_INPUT.Confirm:
                this.currentStep = nextStep;
                break;
            case AdventureGame.USER_INPUT.Cancel:
                this.currentStep = previousStep;
                break;
            default:
                returnText = UtilityText.colorText("BEEP BOOP undefined choice", UtilityText.TEXT_COLORS.Red);
        }
        return returnText;
    }

    selectClass(command){
        let returnText = undefined;

        let commandInt = parseInt(command);

        if(CharacterCreator.CLASS_SELECTION[commandInt]){
            this.selectedClass = CharacterCreator.CLASS_SELECTION[commandInt];
        }else{
            returnText = UtilityText.colorText("BEEP BOOP undefined choice", UtilityText.TEXT_COLORS.Red);
        }

        return returnText;
    }

    allocateAttributesDisplay(){

        this.showStats();
        attributeDiv.style.display = "block";
        contentInput.style.display = "none";
    }

    allocateAttributesHide(){
        attributeDiv.style.display = "none";
        contentInput.style.display = "";
    }


    showStats(){

        for (const statName in this.selectedClass.stats) {
            let tmpText = "[";

            for (let i = 0; i < this.selectedClass.stats[statName]; i++) {
                tmpText += "=";
            }
            for (let i = this.selectedClass.stats[statName]; i < this.selectedClass.maxStat; i++) {
                tmpText += "·";
            }
            tmpText += "]";
            stats[statName].innerHTML = tmpText;
        }

        remainingPoints.innerHTML = UtilityText.colorText("["+this.selectedClass.statPoints +"]", UtilityText.TEXT_COLORS.Red);
    }

    addActionListenerStats(){
        for (const statName in this.selectedClass.stats) {
            // ✅ Remove event listeners from Element
            addStat[statName].replaceWith(addStat[statName].cloneNode(true));
            addStat[statName] = document.querySelector("#add_stat_"+statName);
            addStat[statName].addEventListener("click", () => {
                this.selectedClass.addStat(statName);
                this.showStats();
            });
            subStat[statName].replaceWith(subStat[statName].cloneNode(true));
            subStat[statName] = document.querySelector("#sub_stat_"+statName);
            subStat[statName].addEventListener("click", () => {
                this.selectedClass.subStat(statName);
                this.showStats();
            });
        }

        doneBtn.button.replaceWith(doneBtn.button.cloneNode(true));
        doneBtn.button = document.querySelector("#doneStats");
        doneBtn.button.addEventListener("click", () => {
            this.allocateAttributesHide();
            //TODO change terrible code
            test("Done");
        });


    }


}

export {CharacterCreator}
