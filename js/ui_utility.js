/**
 * enables or disables music
 */
function music(){
   if(audio.paused){
    audio.play();
    audioBtn.style.color = "black";
   }else{
    audio.pause();
    audioBtn.style.color = "red";
   }
   
}

/**
 * exports game 
 */
function exportGame(){

    let exportObject = adventureGame.exportBugs();
    let today = new Date().toISOString().slice(0, 10)
    download("save_"+today+".json",exportObject);

}

/**
 * imports game 
 */
function importGame(){
    console.log("import");
    selectFile();
}

/**
 * creates a downloadable file 
 * @param {*} filename filename 
 * @param {*} text content of the file
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

/**
 * enables user to select file
 */
function selectFile(){

    var element = document.createElement('input');
    element.setAttribute('type', "file");
    element.setAttribute('id', "file");
    element.onchange = function() {
        handleFiles(element);
    }
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

}

/**
 * reads the file
 * @param {*} element the file 
 */
async function handleFiles(element){

    const fileList = element.files;

    if(fileList){

        const file = fileList[0]
        console.log(file);

        const reader = new FileReader();
        reader.readAsText(file)

        reader.addEventListener('load', () => {
            adventureGame.importGame(reader.result);
        })
        
        
    }

}
