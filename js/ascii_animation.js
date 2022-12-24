

// created a delay function 
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

// splits the string in an array
let split_film = film.split('\n');
const LINES_PER_FRAME = 14;



async function ascii_animate(){
    
    //goes through every frame of the animation
    for(let j = 0; j < split_film.length/LINES_PER_FRAME; j++){
        
        let frame = "";
    
        for(let i = j*LINES_PER_FRAME; i < (j+1)*LINES_PER_FRAME; i++){
            frame += split_film[i]+"\n";
            
        }
        //Displays the images waits a delay and then deletes the frame
        console.log(frame);
        await delay(100);
        console.clear();
        
    }
}
