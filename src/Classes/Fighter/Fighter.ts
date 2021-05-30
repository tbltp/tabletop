import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as FighterClassTraits from "./Fighter.json";
import { FighterSubclass } from "./Subclasses/FighterSubclass";

export class Fighter extends PlayerClass {
  constructor(params: ClassCreationParams)
 {
    super(
      "Fighter",
      [],
      [],
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      "d10",
      10,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.armor, params.equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass) {
      this.armorProficiencies.push( "Heavy");
      this.skillProficiencies = skillProficiencies;
      this.weapons = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["strength", "constitution"];
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

  private pushFighterFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, FighterClassTraits);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushFighterFeatures(pc, 1);
    PlayerClass.addFightingStyle(pc, params.fightingStyles[0]);
    pc.pcHelper.addEffectsToFeature("Second Wind", {resource: {resourceMax: {value: 1}}})
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushFighterFeatures(pc, 2);
    pc.pcHelper.addEffectsToFeature("Action Surge", {resource: {resourceMax: {value: 1}}})
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new FighterSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);    
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "4", params);    
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushFighterFeatures(pc, 5);
    //check for extra attack already
    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack")){
     pc.pcHelper.addEffectsToFeature("Extra Attack", {scaling: {uses: 1}})
    }
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "6", params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "7", params);    
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addEffectsToFeature("Indomitable", {resource: {resourceMax: { value: 1 }}})
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "10", params);    
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "11", params);
    pc.pcHelper.findFeatureTraitByName("Extra Attack").scaling.uses++;
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "13", params);
    pc.pcHelper.findFeatureTraitByName("Indomitable").resource.resourceMax.value++;
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "14", params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);    
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Action Surge").resource.resourceMax.value++;
    pc.pcHelper.findFeatureTraitByName("Indomitable").resource.resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "18", params);    
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "19", params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "20", params);
    pc.pcHelper.findFeatureTraitByName("Extra Attack").scaling.uses++;
  }
}

export class DSFighter extends Fighter {
  constructor(){
    super({ multiclass: true });
  }
}

