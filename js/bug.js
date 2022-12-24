
class Bug {
/**
 *  This Bug class is used to store everything necessary for the representation in the game
 * @param {*} name Name of the bug
 * @param {*} description description of the bug
 * @param {*} event on which event the bug is triggered on 
 * @param {*} room the room connected to the bug
 * @param {*} obj is not empty then the object is copied in the bug
 */
    constructor(name, description, event, room, obj=null) {

        this.name = name;
        this.description = description;
        this.event = event;
        this.discovered = false;
        this.room = room;
        if(obj){
            obj && Object.assign(this, obj);
        }
    }

    get getEvent(){
        return this.event;
    }
    set setEvent(event){
        this.event = event
    }
/**
 * checks if the bug has already been found
 * @returns if the bug has been found
 */
    hasBeenFound(){
        return this.discovered;
    }
/**
 * 
 * @returns the Bug description
 */
    getDescription(){
        let desc = "<br>";
        desc += "<br>";
        desc += "<span class='color_green'>Bug Found: "+this.name+"</span>";
        desc += "<br>";
        desc += this.description;
        desc += "<br>";
        return desc;
    }
    /**
     * discovers the bug
     */
    discover(){
        this.discovered = true;
    }

}