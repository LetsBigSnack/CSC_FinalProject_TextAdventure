class UtilityFiles {
    /**
     * creates a downloadable file
     * @param {*} filename filename
     * @param {*} text content of the file
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
     * enables user to select file
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
     * reads the file
     * @param {*} element the file
     */
    static async handleFiles(element){

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
}

export {UtilityFiles};
