import {adventureGame} from "../../SetUpGame.js";

/**
 * This Class is used to house all the Function which revolve around handling and processing Files.
 * This UtilityFiles class is used across the whole Project to make interaction with Files more readable and to streamline the process.
 */
class UtilityFiles {

    /**
     * Creates and Downloads a File
     * @param {string} filename The name of the file, which is to be downloaded
     * @param {string} text The content of the file
     */
    static download(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:json;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    /**
     * Enables user to select file
     */
    static selectFile(){
        let element = document.createElement('input');
        element.setAttribute('type', "file");
        element.setAttribute('id', "file");
        element.onchange = function() {
            UtilityFiles.handleFiles(element).then();
        }
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
    }

    /**
     * Reads the file and sends it to a importGame function
     * @param {HTMLInputElement} element The HTML-Element associated to the File
     */
    static async handleFiles(element){
        const fileList = element.files;
        if(fileList){
            const file = fileList[0]
            const reader = new FileReader();
            reader.readAsText(file)
            reader.addEventListener('load', () => {
                adventureGame.importGame(reader.result);
            })
        }
    }

    /**
     * Reads a File and returns its Content
     * @param {string} path The Path to the File
     * @returns {Promise<{}>} Returns the Content of a File based on a given Path
     */
    static async readFile(path){
        let fileData = {};
        await fetch(path)
            .then(response => response.json())
            .then(data => fileData = data)
            .catch(error => console.log(error));
        return fileData;
    }

}

export {UtilityFiles};
