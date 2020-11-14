import { Race } from "../Races/Race";
import { PlayerClass, LevelingParams } from "../Classes/PlayerClass";
import { PlayerCharacter } from "./PlayerCharacter";
import { Background } from "../Backgrounds/Background";
import { Feat } from "../Feats/Feat";
import { SpellSlotFactory } from "../Classes/SpellSlotFactory";

export class CharacterSheet {
  
  constructor(pc: PlayerCharacter, race: Race, playerClass: PlayerClass, background: Background){
    this.character = pc;
    this.race = race;
    this.background = background;
    this.race.apply(this.character);
    //apply class
    this.playerClasses[playerClass.name] = playerClass;
    this.levels[playerClass.name] = 1;
    playerClass.apply(this.character);
    this.background.apply(this.character);
  }
  
  character: PlayerCharacter;
  race: Race;
  playerClasses: { [key: string]: PlayerClass } = {};
  levels: { [key: string]: number } = {};
  feats: Feat[];
  background: Background;

  //exposed responsibilities: level up, add/remove stuff to inventory, serialize to JSON, deserialize to JSON



  //this is dumb but it's ok.
  multiClass(newClass: PlayerClass): void {
    this.playerClasses[newClass.name] = newClass;
    this.levels[newClass.name] = 1;
    this.character.level.totalLevel++;
    newClass.apply(this.character);

  }

  levelUp(levelingClass: string, params: LevelingParams): void {
    this.character.level.totalLevel++;
    const level = ++this.levels[levelingClass];

    
    //level up race
    if(this.race.abilitiesAtLevels[level.toString()]) {
      this.race.abilitiesAtLevels[level.toString()](this.character);
    }
    //same for every class
    this.playerClasses[levelingClass].abilitiesAtLevels[level.toString()](
      this.character,
      params
    );

    this.applySpellSlotsAtLevelUp();
    //logic for levels 4, 8, 12, 16, 19 - either level as normal or pick a feat
  }

  applySpellSlotsAtLevelUp(){
    
    if(Object.keys(this.levels).length == 1) { // IF NOT MULTICLASSING...

      const playerClass = Object.keys(this.levels)[0];

      // Are they in a Spellcasting Subclass (i.e. Arcane Trickster / Eldritch Knight)? Run Tertiary.
      if(SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass]) { 
        SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "TERTIARY", this.character.level.totalLevel);
      }  
      
      // Otherwise add spell slots as they need.
      else {
        SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, SpellSlotFactory.spellcastingClassRanks[playerClass], this.character.level.totalLevel);
      }
    }
    
    else {  // IF MULTICLASSING...
      let multiclassSpellcasterLevel = 0;
      
      // Run through and sum the weighted class levels for spell slots.
      for(let playerClass of Object.keys(this.levels)){
        if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "PRIMARY"){ multiclassSpellcasterLevel += this.levels[playerClass] }
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "SECONDARY"){ multiclassSpellcasterLevel += this.levels[playerClass] / 2 }  
        else if(SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass]) { multiclassSpellcasterLevel += this.levels[playerClass] / 3 }  
      }

      SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "PRIMARY", Math.floor(multiclassSpellcasterLevel))
    } 
    
  }

}