import {UtilityFiles} from "./UtilityFiles.js";
class UtilityGame {

    static exportGame(){

        let exportObject = adventureGame.exportBugs();
        let today = new Date().toISOString().slice(0, 10)
        UtilityFiles.download("save_"+today+".json",exportObject);

    }

    static importGame(){
        console.log("import");
        UtilityFiles.selectFile();
    }
}
export {UtilityGame};