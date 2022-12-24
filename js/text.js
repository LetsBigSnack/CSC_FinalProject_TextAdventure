//HTML ELEMENTS
const contentText = document.querySelector("#content-text");
const form = document.querySelector('#form');
const locationText = document.querySelector("#location");
const content =  document.querySelector("#content");
const score =  document.querySelector("#score");
const audioBtn = document.querySelector("#audio");

const audio = new Audio('../music/slow-2021-08-17_-_8_Bit_Nostalgia_-_www.FesliyanStudios.com.mp3');
audio.volume = 0.2;
audio.loop = true;

audioBtn.style.color = "red";


const adventureGame = new AdventureGame();



/**
 * Handel user input
 * @returns false so the site isn't reloaded
 */
function userInput(){


    let temporaryTag = document.createElement("p");
    
    const formData = new FormData(form);
    let choice = formData.get("user_choice");

    let text = adventureGame.interact(choice.toUpperCase());
    let location = adventureGame.currentRoom.getLocation()

    locationText.innerHTML = adventureGame.currentRoom.getLocation();

    if(text !== "" || text !== undefined){
        temporaryTag.innerHTML = text;
        contentText.appendChild(temporaryTag);
    }

    content.scrollTop = content.scrollHeight;
    form.reset();

    return false;


}
