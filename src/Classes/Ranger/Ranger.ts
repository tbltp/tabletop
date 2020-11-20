import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait } from "../../Base/Interfaces";
import * as SpellList from "../../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as RangerClassTraits from "./Ranger.json";
import { RangerSubclass } from "./Subclasses/RangerSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Ranger extends PlayerClass {
  constructor(
    multiclass: boolean,
    skillProficiencies: string[],
    rangerParams: RangerLevelingParams,
    weapons?: string[],
    armor?: string[],
    equipmentPack?: string,
  ) {
    super(
      "Ranger",
      [],
      skillProficiencies,
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      rangerParams,
      "d10",
      10,
      []
    );

    this.characterStart(multiclass, weapons, armor, equipmentPack);

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
    this.handleSpellSelections(pc, params, SpellcastingAbility["RANGER"]);
  }

  level1(pc: PlayerCharacter, params: RangerLevelingParams): void {
    PlayerClass.pushCustomizedClassFeature(
      pc, 
      1, 
      RangerClassTraits, 
      "FAVORED ENEMY", 
      [params.favoredEnemy]
    );
    PlayerClass.pushCustomizedClassFeature(
      pc,
      1,
      RangerClassTraits,
      "NATURAL EXPLORER",
      [params.favoredTerrain]
    );

    this.addSpellcasting(pc, "RANGER");

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclass = new RangerSubclass(params.subclassSelection.subclass);
    this.subclassDriver(pc, "3", params);
    this.pushRangerFeatures(pc, 3);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 4);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.pushRangerFeatures(pc, 5);
  }

  level6(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    pc.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
    this.pushRangerFeatures(pc, 6);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "7", params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 8);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 10);
    pc.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "11", params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
  }

  level14(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    this.pushRangerFeatures(pc, 14);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "15", params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 20);
  }
}

interface RangerLevelingParams extends LevelingParams {
  favoredEnemy?: string;
  favoredTerrain?: string;
}
