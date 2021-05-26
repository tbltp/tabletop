import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as DruidClassTraits from "./Druid.json";
import { DruidSubclass } from "./Subclasses/DruidSubclass";

export class Druid extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Druid",
      [],
      [],
      [],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      "d8",
      8,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.armor, params.druidicFocus);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], druidicFocus: string){
    if(!multiclass) {  
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies.push("Club", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear");
      this.toolProficiencies.push("Herbalism Kit")
      this.weapons = weapons;
      this.armor = [...armor, "LEATHER"];
      this.equipment.push(druidicFocus);
      this.equipmentPack = "EXPLORER";
      this.savingThrowProficiencies = ["intelligence", "wisdom"];
    }
  }
  
  abilitiesAtLevels = {
    "1": this.level1,
    "2": this.level2,
    "3": this.level3,
    "4": this.level4,
    "5": this.level5,
    "6": this.level6,
    "7": this.level7,
    "8": this.level8,
    "9": this.level9,
    "10": this.level10,
    "11": this.level11,
    "12": this.level12,
    "13": this.level13,
    "14": this.level14,
    "15": this.level15,
    "16": this.level16,
    "17": this.level17,
    "18": this.level18,
    "19": this.level19,
    "20": this.level20,
  };

  private pushDruidFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, DruidClassTraits);
  }

  private handleDruidSpellSelections(pc: PlayerCharacter, params?: LevelingParams, level?: string, ){
    level ?? this.addPreparationSpells(pc, "DRUID", level);
    params ?? this.handleSpellSelections(pc, params, SpellcastingAbility["DRUID"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushDruidFeatures(pc, 1); 
    this.addSpellcasting(pc, "DRUID");
    this.handleDruidSpellSelections(pc, params, "1")
    
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushDruidFeatures(pc, 2);
    pc.pcHelper.addEffectsToClassFeature("Wild Shape", {scaling: {challengeRating: 0}});  // SPECIAL EXCEPTION TO STYLE GUIDE: Wild Shape is modified on Subclass Level.
    this.subclass = new DruidSubclass(params.subclassParams);
    this.subclassDriver(pc, "2", params);        
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "3", params); 
    this.handleDruidSpellSelections(pc, null, "2");   
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "4", params);
    this.handleDruidSpellSelections(pc, params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "5", params);    
    this.handleDruidSpellSelections(pc, null, "3")
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "6", params);    
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "7", params);    
    this.handleDruidSpellSelections(pc, null, "4")
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "9", params);    
    this.handleDruidSpellSelections(pc, null, "5")
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "10", params);    
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "11", params); 
    this.handleDruidSpellSelections(pc, null, "6")
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "12", params); 
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "13", params);
    this.handleDruidSpellSelections(pc, null, "7")
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "14", params);    
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.handleDruidSpellSelections(pc, null, "8")
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params); 
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "17", params);
    this.handleDruidSpellSelections(pc, null, "9")
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "18", params); 
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "19", params); 
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushDruidFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
    pc.pcHelper.findFeatureTraitByName("Wild Shape").resource.resourceMax.value = Infinity;
  }
}

export class DSDruid extends Druid {
  constructor(){
    super({ multiclass: true });
  }
}