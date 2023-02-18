import {UtilityMusic} from "./Classes/Utility/UtilityMusic.js";
import {UtilityGame} from "./Classes/Utility/UtilityGame.js";
import {AdventureGame} from "./Classes/Models/AdventureGame.js";

//HTML ELEMENTS
const contentText = document.querySelector("#content-text");
const form = document.querySelector('#form');
const form_battle = document.querySelector("#form_battle");
const locationText = document.querySelector("#location");
const content =  document.querySelector("#content");
const audioBtn = document.querySelector("#audio");
const score = document.querySelector("#score");

const contentInput = document.querySelector("#content-input");

//Buttons
const music = document.querySelector("#audio");
const sound = document.querySelector("#sound");
const save = document.querySelector("#save");
const load = document.querySelector("#load");
const gameImport = document.querySelector("#import");
const gameExport = document.querySelector("#export");



//Attributes
const attributeDiv = document.querySelector("#attributes");
const stats = {
    Strength :  document.querySelector("#stat_str"),
    Dexterity: document.querySelector("#stat_dex"),
    Constitution: document.querySelector("#stat_con"),
    Intelligence: document.querySelector("#stat_int"),
    Wisdom: document.querySelector("#stat_wis"),
    Charisma: document.querySelector("#stat_cha")
};
const subStat = {
    Strength :  document.querySelector("#sub_stat_Strength"),
    Dexterity: document.querySelector("#sub_stat_Dexterity"),
    Constitution: document.querySelector("#sub_stat_Constitution"),
    Intelligence: document.querySelector("#sub_stat_Intelligence"),
    Wisdom: document.querySelector("#sub_stat_Wisdom"),
    Charisma: document.querySelector("#sub_stat_Charisma")
};
const addStat = {
    Strength :  document.querySelector("#add_stat_Strength"),
    Dexterity: document.querySelector("#add_stat_Dexterity"),
    Constitution: document.querySelector("#add_stat_Constitution"),
    Intelligence: document.querySelector("#add_stat_Intelligence"),
    Wisdom: document.querySelector("#add_stat_Wisdom"),
    Charisma: document.querySelector("#add_stat_Charisma")
};

const doneBtn = {button:  document.querySelector("#doneStats")};
const remainingPoints = document.querySelector("#remaining");



const audio = new Audio('../music/slow-2021-08-17_-_8_Bit_Nostalgia_-_www.FesliyanStudios.com.mp3');
audio.volume = 0.2;
audio.loop = true;
audioBtn.style.color = "red";
sound.style.color = "red";


const adventureScreen = document.querySelector("#adventureScreen");

//Battle divs
const battleScreen = document.querySelector("#battleScreen");
battleScreen.style.display = "none";

const battle_info = document.querySelector("#battle_info");
const battle_error = document.querySelector("#battle_error");


// Battle Player Info
const battle_player_info = {
    "name" : document.querySelector("#player_name"),
    "health" : document.querySelector("#player_health"),
    "healthBar" : document.querySelector("#player_health_bar"),
    "mana" : document.querySelector("#player_mana"),
    "manaBar" : document.querySelector("#player_mana_bar"),
    "actions" :  document.querySelector("#player_action")
}

const battle_enemy_info = {
    "name" : document.querySelector("#enemy_name"),
    "health" : document.querySelector("#enemy_health"),
    "healthBar" : document.querySelector("#enemy_health_bar"),
    "ascii":  document.querySelector("#battle_enemy_image"),
}


setUpEventListeners();

const adventureGame = new AdventureGame();


function userInput(){

    const formData = new FormData(form);
    let choice = formData.get("user_choice");

    interact(choice);
}

function battleInput(){
    const formData = new FormData(form_battle);
    let choice = formData.get("user_choice_battle");
    let text = adventureGame.interact(choice.toUpperCase());
    form_battle.reset();
    return false;
}

//TODO change horrible code
function interact(input){
    let temporaryTag = document.createElement("p");
    let text = adventureGame.interact(input.toUpperCase());


    if(text){
        temporaryTag.innerHTML = text;
        contentText.appendChild(temporaryTag);
    }
    content.scrollTop = content.scrollHeight;
    form.reset();
    return false;
}


function setUpEventListeners(){
    music.addEventListener("click", UtilityMusic.toggleMusic);
    sound.addEventListener("click", UtilityMusic.toggleSound);
    save.addEventListener("click", UtilityGame.saveGame);
    load.addEventListener("click", UtilityGame.loadGame);
    gameImport.addEventListener("click", UtilityGame.importGameSelect);
    gameExport.addEventListener("click", UtilityGame.exportGameFile);
    form.addEventListener("submit", userInput);
    form_battle.addEventListener("submit", battleInput);
}

export {battle_error,audio, audioBtn, adventureGame, contentText, score, locationText, content, attributeDiv, contentInput,stats,remainingPoints, subStat, addStat, interact ,doneBtn, sound, battle_info, battleScreen, adventureScreen, battle_player_info, battle_enemy_info};

