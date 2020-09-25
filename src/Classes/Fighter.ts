import { PlayerClass, LevelingParams } from "./PlayerClass";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { ResourceTrait } from "../Base/Interfaces";
import * as FightingStyles from "../../Assets/FightingStyles.json";
import { FighterArchetype } from "./Archetypes";

export class Fighter extends PlayerClass {
  constructor(
    skillProficiencies: string[],
    weapons: string[],
    armor: string[],
    params: LevelingParams,
    equipmentPack: string
  ) {
    super(
      "Fighter",
      [],
      skillProficiencies,
      ["Simple", "Martial"],
      ["Light", "Medium", "Heavy", "Shield"],
      [],
      weapons,
      armor,
      [],
      [],
      params,
      "d10",
      10,
      ["strength", "constitution"]
    );

    this.equipmentPack = equipmentPack;

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  /** TODO
   * FIGHTING STYLE
   */

  fighterArchetype: string;

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
    this.pushClassFeatures(pc, level, "FIGHTER");
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    pc.addFeatures(FightingStyles[params.fightingStyle[0]]);
    this.pushFighterFeatures(pc, 1);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushFighterFeatures(pc, 2);
    pc.addResourceTraits({
      title: "Action Surge",
      description: "Number of times you can Action Surge.",
      resourceMax: { value: 1 },
    });
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.fighterArchetype = params.archetypeSelection[0].archetype;
    FighterArchetype.archetypeHelper[this.fighterArchetype]["3"](pc, params);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushFighterFeatures(pc, 5);
    pc.addResourceTraits({
      title: "Extra Attack",
      description: "Number of Extra Attacks you can make.",
      resourceMax: { value: 1 },
    });
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    FighterArchetype.archetypeHelper[this.fighterArchetype]["7"](pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    pc.addResourceTraits({
      title: "Indomitable",
      description: "Number of times you can use the Indomitable trait.",
      resourceMax: { value: 1 },
    });
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    FighterArchetype.archetypeHelper[this.fighterArchetype]["10"](pc, params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Extra Attack").resourceMax.value++;
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Indomitable").resourceMax.value++;
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    FighterArchetype.archetypeHelper[this.fighterArchetype]["15"](pc, params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Action Surge").resourceMax.value++;
    pc.findResourceTraitByName("Indomitable").resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    FighterArchetype.archetypeHelper[this.fighterArchetype]["18"](pc, params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Extra Attack").resourceMax.value++;
  }
}
