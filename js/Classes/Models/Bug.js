
class Bug {

    /**
     *  This Bug class is used to store everything necessary for the representation in the game
     * @param {String} name Name of the bug
     * @param {String} description description of the bug
     * @param {String} event on which event the bug is triggered on
     * @param {Room} room the room connected to the bug
     * @param {Bug} obj if not empty then the object is copied in the bug
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

export {Bug};
