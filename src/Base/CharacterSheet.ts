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
  asiLevels: number[] = [4, 8, 12, 16, 19];
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
    const tLevel = ++this.character.level.totalLevel;
    const cLevel = ++this.playerClasses[levelingClass].level.value;

    //hp
    this.character.baseStats.hpMax.bonus.value += hpAdd;

    //level up proficiency according to total level
    this.character.proficiency.levelUp(tLevel);
    
    //level up race according to total level
    if(this.race.abilitiesAtLevels[tLevel.toString()]) {
      this.race.abilitiesAtLevels[tLevel.toString()](this.character);
    }

    //level up Tough feat according to total level
    const tough = this.feats.find(ft => ft.name == "Tough");
    if(tough) {
      tough.abilitiesAtLevels[tLevel.toString()](this.character);
    }

    //level up class according to class level
    this.playerClasses[levelingClass].abilitiesAtLevels[cLevel.toString()](
      this.character,
      params
    );

    //get feat or ability score improvement according to class level
    if(this.asiLevels.includes(cLevel)) {
      if(params.featChoice) {
        this.feats.push(params.featChoice);
        params.featChoice.apply(this.character);
      } else {
        this.character.pcHelper.improveAbilityScores(params.abilityScoreImprovement) ;
      }
    }

    //apply spell slots based on selected classes
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
        if(SpellSlotFactory.spellcastingClassRanks[playerClass]=="NONE"){}
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "PRIMARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value }
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "SECONDARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value / 2 }  
        else if(SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass.title]) { multiclassSpellcasterLevel += this.levels[playerClass].value / 3 }  
      }

      SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "PRIMARY", Math.floor(multiclassSpellcasterLevel))
    } 
    
  }

}