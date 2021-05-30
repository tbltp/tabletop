import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as RangerClassTraits from "./Ranger.json";
import { RangerSubclass } from "./Subclasses/RangerSubclass";

export class Ranger extends PlayerClass {
 constructor(params: ClassCreationParams) {
    super(
      "Ranger",
      [],
      params.skillProficiencies,
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

    this.characterStart(params.multiclass, params.weapons, params.armor, params.equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass){
      this.weapons = [...weapons, "LONGBOW"];
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["strength", "dexterity"];
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

  private pushRangerFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, RangerClassTraits);
  }

  private handleRangerSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ): void {
    this.handleSpellSelections(pc, params, "RANGER");
  }

  level1(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 1)
    pc.pcHelper.customizeFeature("Favored Enemy", [params.favoredEnemy])
    pc.pcHelper.customizeFeature("Natural Explorer", [params.favoredTerrain])
    this.addSpellcasting(pc, "RANGER");

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    PlayerClass.addFightingStyle(pc, params.fightingStyles[0]);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 3);
    this.subclass = new RangerSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 4);
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 5);
    this.subclassDriver(pc, "5", params);
    this.handleRangerSpellSelections(pc, params);
    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack")){
      pc.pcHelper.addEffectsToFeature("Extra Attack", {scaling: {uses: 1}})
    }
  }

  level6(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 6);
    this.subclassDriver(pc, "6", params);
    
    pc.pcHelper.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    
    pc.pcHelper.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "7", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 8);
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "9", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 10);
    this.subclassDriver(pc, "10", params);
    pc.pcHelper.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "11", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "13", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level14(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 14);
    this.subclassDriver(pc, "14", params);
    pc.pcHelper.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "17", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 18);
    this.subclassDriver(pc, "18", params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "19", params);
    this.handleRangerSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
  }
}

export class DSRanger extends Ranger {
  constructor(){
    super({ multiclass: true });
  }
}

export interface RangerLevelingParams extends LevelingParams {
  favoredEnemy?: string;
  favoredTerrain?: string;
}
