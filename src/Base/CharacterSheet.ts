import { Race } from "../Races/Race";
import { PlayerClass, LevelingParams } from "../Classes/PlayerClass";
import { PlayerCharacter } from "./PlayerCharacter";
import { Background } from "../Backgrounds/Background";
import { Feat } from "../Feats/Feat";
import { SpellSlotFactory } from "../Classes/SpellSlotFactory";


class SheetClasses {
  [key: string]: PlayerClass
}

export class CharacterSheet {
  
  constructor(name: string, pc: PlayerCharacter, race: Race, playerClass: PlayerClass, background: Background, DS?: boolean){
    this.name = name;
    this.character = pc;
    this.race = race;
    this.background = background;
    
    this.playerClasses[playerClass.name] = playerClass;
    this.levels[playerClass.name] = playerClass["level"];

    if(!DS) {
      this.race.apply(this.character);
      playerClass.apply(this.character);
      this.background.apply(this.character);
    }

  }
  
  name: string;
  character: PlayerCharacter;
  race: Race;
  playerClasses: SheetClasses = {};
  levels: { [key: string]: PlayerClass["level"] } = {};
  featLevels: number[] = [4, 8, 12, 16, 19];
  feats: Feat[];
  background: Background;

  //exposed responsibilities: level up, add/remove stuff to inventory, serialize to JSON, deserialize to JSON



    
  //this is dumb but it's ok
  multiClass(newClass: PlayerClass): void {
    this.playerClasses[newClass.name] = newClass;
    this.levels[newClass.name] = newClass["level"];
    this.character.level.totalLevel++;
    newClass.apply(this.character);

  }

  levelUp(levelingClass: string, hpAdd: number, params: LevelingParams): void {
    this.character.level.totalLevel++;
    const level = ++this.playerClasses[levelingClass].level.value;

    this.character.proficiency.levelUp(level);
    
    //level up race
    if(this.race.abilitiesAtLevels[level.toString()]) {
      this.race.abilitiesAtLevels[level.toString()](this.character);
    }
    //level up every class
    this.playerClasses[levelingClass].abilitiesAtLevels[level.toString()](
      this.character,
      params
    );

    //feat logic vs ability score improvement?
    if(this.featLevels.includes(level) && params.featChoice) {
      this.feats.push(params.featChoice);
    } else {
      
    }
    this.character.baseStats.hpMax.bonus.value += hpAdd;

    this.applySpellSlotsAtLevelUp();
  }

  applySpellSlotsAtLevelUp(){
    
    if(Object.keys(this.levels).length == 1) { // IF NOT MULTICLASSING...

      const playerClass = Object.keys(this.levels)[0];

      // Are they in a Spellcasting Subclass (i.e. Arcane Trickster / Eldritch Knight)? Run Tertiary.
      if(this.playerClasses[playerClass].subclass && SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass.title]) { 
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
        if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "PRIMARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value }
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "SECONDARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value / 2 }  
        else if(SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass.title]) { multiclassSpellcasterLevel += this.levels[playerClass].value / 3 }  
      }

      SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "PRIMARY", Math.floor(multiclassSpellcasterLevel))
    } 
    
  }

}