import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait } from "../../Base/Interfaces";
import * as FightingStyles from "../../../Assets/FightingStyles.json";
import * as FighterClassTraits from "./Fighter.json";
import { FighterSubclass } from "./Subclasses/FighterSubclass";

export class Fighter extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: LevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    armor?: string[],
    equipmentPack?: string
  ) {
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
      params,
      "d10",
      10,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, armor, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass) {
      this.armorProficiencies.push( "Heavy");
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["strength", "constitution"];
    }
  }

  /** TODO
   * ELDRITCH KNIGHT SPELLS LEARNED AT LEVELS 3, 4, 7, 8, 10, 11, 13, 14, 16, 19, 20, ADD TERTIARY SPELL SLOTS
   */


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
    //fighting style
    PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);
    //second wind
    pc.addResourceTraits({
      title: "Second Wind",
      description: "Number of times you can Second Wind.",
      resourceMax: { value: 1 },
    });
    this.pushFighterFeatures(pc, 1);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    //action surge
    pc.addResourceTraits({
      title: "Action Surge",
      description: "Number of times you can Action Surge.",
      resourceMax: { value: 1 },
    });
    this.pushFighterFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: FighterLevelingParams): void {
    //martial archetype
    this.subclass = params.subclassSelection.subclass;
    FighterSubclass.subclassDictionary[this.subclass]["3"](pc, params);
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
    FighterSubclass.subclassDictionary[this.subclass]["7"](pc, params);
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
    FighterSubclass.subclassDictionary[this.subclass]["10"](pc, params);
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
    FighterSubclass.subclassDictionary[this.subclass]["15"](pc, params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Action Surge").resourceMax.value++;
    pc.findResourceTraitByName("Indomitable").resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    FighterSubclass.subclassDictionary[this.subclass]["18"](pc, params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findResourceTraitByName("Extra Attack").resourceMax.value++;
  }
}

export interface FighterLevelingParams extends LevelingParams {
  artisanToolProficiency?: string
}