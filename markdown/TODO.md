## Previous Version (pre. 24-12-2022)
* [X] ASCII Art in JSON
* [X] implements ascii art in room
* [X] auto generated text options
* [X] export system
* [X] import system
* [X] add music on / off function
* [X] Write Story:


## Final Project Version (24-12-2022 - ...)
* [ ] Adding Gameplay Systems
  * [ ] Inventory
  * [ ] Stats
  * [ ] Dialog
  * [ ] Battle
* [ ] Having different States handle through Code
  * [ ] Character Creations
  * [ ] Exploration
  * [ ] Dialog
  * [ ] Battle
* [ ] Add Sounds
* [ ] Create Item generation System
  * [ ] Armor
  * [ ] Weapons
  * [ ] Potions
* [ ] Save and Load System
* [ ] Expand Story

# Notes
## 25-12
- should split Utility in multiple Classes -> Files, Music, etc. ?
- create UtilityText Class with functions -> colorText, etc.
-  if (this.commands[Room.EVENT.Talk] !== undefined && this.commands[Room.EVENT.Talk] !== "")
  - { change to if(!this.commands[Room.EVENT.Talk])
      - //27-12 not always useful -> if 0 is an acceptable value 
- rework EXPORT and IMPORT system 

## 26-12
- Add Staging -> to the AdventureGame (Start, Char creation, Traveling, Battle, Dialog, etc.)
- change locationName to location
- Add Version number to export to prevent Bugs with different Version
- Add Paragraphs
- Animate function doesn't work as of now --> needs fixing

## 27-12
- Accidentally fucked up connected Rooms --> needs fixing 
- Restructure Game Loop:
  - Explore + Dungeon Crawler
    - 3 Dungeon each different Level at the End there is an Access-Code et.c
  - Bugs --> collectable perks that give buffs
  - There is a Shop with items / etc.
  - Rewrite Story based on new Gameplay

## 28-12
- Today Goal create Character Creation menu (can be filled with dummy data as for now)
- Also implement Player Class with different Classes
- Add Confirmation Dialog Option [Y]es or [N]o
- worry about abilities and classes later
- unfinished work on that shit tomorrow
- ADD COMMENTS (but not today, too tired :C)

## 29-12
- Tried to add Attribute window without a HTML element --> not really doable (create a hidden div)
  - couldn't access eventlisteners :C
  - On Attribute disable the inout div --> to prevent user input
  - Add key listener to div for attributes
- Add click sound on stat add / sub
- I think i am finished with the crud Character Creation
- Add comments tomorrow !!!!!!!!!!!!!!! IMPORTANT