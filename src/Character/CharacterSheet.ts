import { LevelingParams, PlayerClass } from "../Classes/PlayerClass";

import { Background } from "../Backgrounds/Background";
import { Feat } from "../Feats/Feat";
import { PlayerCharacter } from "./PlayerCharacter";
import { Race } from "../Races/Race";
import { SpellSlotFactory } from "./SpellSlotFactory";
import { VariantHuman } from "Races/Human/Subrace/VariantHuman";
import { featDict } from "../Utilities/ConstructorDefinitions";

class SheetClasses {
  [key: string]: PlayerClass
}

export class CharacterSheet {

  //temp
  constructor(name: string, pc: PlayerCharacter, race: Race, playerClass: PlayerClass, background: Background, DS?: boolean) {
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

      if(this.race.name === "Variant Human") {
        const varHuman = this.race as VariantHuman
        const featParams = varHuman.chosenFeat
        
        const feat = new featDict[featParams.name](featParams.params)
        this.feats.push(feat)
        feat.apply(pc)
      }

    }

  }
  
  /*
  constructor(name: string) {
    this.name = name;
    this.character = null;
    this.race = null;
    this.background = null;
  }

  fillSheet(pc: PlayerCharacter, race: Race, playerClass: PlayerClass, background: Background, DS?: boolean) {
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
  */
  
  name: string;
  character: PlayerCharacter;
  race: Race;
  playerClasses: SheetClasses = {};
  levels: { [key: string]: PlayerClass["level"] } = {};
  feats: Feat[] = [];
  background: Background;

  //exposed responsibilities: level up, add/remove stuff to inventory, serialize to JSON, deserialize to JSON

    
  //this is dumb but it's ok
  multiClass(newClass: PlayerClass): void {
    this.playerClasses[newClass.name] = newClass;
    this.levels[newClass.name] = newClass["level"];
    newClass.apply(this.character);

  }

  levelUp(levelingClass: string, hpAdd: number, params: LevelingParams): void {
    const tLevel = ++this.character.level;
    const cLevel = ++this.playerClasses[levelingClass].level.value;

    //hp
    this.character.baseStats.hpMax.bonus.value += hpAdd;

    //level up proficiency according to total level
    this.character.charProficiency.levelUp(tLevel);

    // hit die (don't add between level 0 and level 1)
    cLevel > 1 ? this.character.hitDie[this.playerClasses[levelingClass].hitDie]++ : null
    
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
    if(params.featParams && params.featParams.name != "") {
      const newFeat: Feat = new featDict[params.featParams.name](params.featParams);    
      this.feats.push(newFeat);
      newFeat.apply(this.character);
    } 
    if(params.abilityScoreImprovement && params.abilityScoreImprovement.abilities.length > 0) {
      this.character.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    }
    
    //apply spell slots based on selected classes
    this.applySpellSlotsAtLevelUp();
  }

  private applySpellSlotsAtLevelUp(){
    
    if(Object.keys(this.levels).length == 1) { // IF NOT MULTICLASSING...

      const playerClass = Object.keys(this.levels)[0];

      // Are they in a Spellcasting Subclass (i.e. Arcane Trickster / Eldritch Knight)? Run Tertiary.
      if(this.playerClasses[playerClass].subclass && SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass.name]) { 
        SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "TERTIARY", this.character.level);
      }  
      
      // Otherwise add spell slots as they need.
      else {
        SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, SpellSlotFactory.spellcastingClassRanks[playerClass], this.character.level);
      }
    }
    
    else {  // IF MULTICLASSING...
      let multiclassSpellcasterLevel = 0;
      
      // Run through and sum the weighted class levels for spell slots.
      for(let playerClass of Object.keys(this.levels)){
        if(SpellSlotFactory.spellcastingClassRanks[playerClass]=="NONE"){}
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "PRIMARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value }
        else if(SpellSlotFactory.spellcastingClassRanks[playerClass] == "SECONDARY"){ multiclassSpellcasterLevel += this.levels[playerClass].value / 2 }  
        else if(SpellSlotFactory.spellcastingSubclasses[this.playerClasses[playerClass].subclass.name]) { multiclassSpellcasterLevel += this.levels[playerClass].value / 3 }  
      }

      SpellSlotFactory.applyClassSpellSlotsAtLevel(this.character, "PRIMARY", Math.floor(multiclassSpellcasterLevel))
    } 
    
  }

}