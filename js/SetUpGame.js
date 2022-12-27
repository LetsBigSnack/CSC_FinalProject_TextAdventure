import {UtilityMusic} from "./Classes/Utility/UtilityMusic.js";
import {UtilityGame} from "./Classes/Utility/UtilityGame.js";
import {AdventureGame} from "./Classes/Models/AdventureGame.js";

//HTML ELEMENTS
const contentText = document.querySelector("#content-text");
const form = document.querySelector('#form');
const locationText = document.querySelector("#location");
const content =  document.querySelector("#content");
const audioBtn = document.querySelector("#audio");
const score = document.querySelector("#score");

//Buttons
const music = document.querySelector("#audio");
const gameImport = document.querySelector("#import");
const gameExport = document.querySelector("#export");


const audio = new Audio('../music/slow-2021-08-17_-_8_Bit_Nostalgia_-_www.FesliyanStudios.com.mp3');
audio.volume = 0.2;
audio.loop = true;
audioBtn.style.color = "red";

setUpEventListeners();

const adventureGame = new AdventureGame();


function userInput(){
    let temporaryTag = document.createElement("p");
    const formData = new FormData(form);
    let choice = formData.get("user_choice");
    let text = adventureGame.interact(choice.toUpperCase());

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
    gameImport.addEventListener("click", UtilityGame.importGameSelect);
    gameExport.addEventListener("click", UtilityGame.exportGameFile);
    form.addEventListener("submit", userInput);
}

export {audio, audioBtn, adventureGame, contentText, score, locationText};

