import { PlayerClass, LevelingParams } from "../PlayerClass";
import { ResourceTrait, Trait, ScalingTrait } from "../../Base/Interfaces";
import * as BarbarianClassTraits from "./Barbarian.json"
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { BarbarianSubclass } from "./Subclasses/BarbarianSubclass";

export class Barbarian extends PlayerClass {
  constructor(multiclass: boolean, skillProficiencies?: string[], weapons?: string[]) {
    super(
      "Barbarian",
      [],
      [],
      ["Simple", "Martial"],
      ["Shield"],
      [],
      [],
      [],
      [],
      [],
      { isNoInput: true },
      "d12",
      12,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[]){
    if(!multiclass){
      this.skillProficiencies.push(...skillProficiencies)
      this.armorProficiencies.push("Light", "Medium");
      this.weapons.push(...weapons, "JAVELIN", "JAVELIN", "JAVELIN", "JAVELIN");
      this.equipmentPack = "EXPLORER";
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

  private pushBarbarianFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, BarbarianClassTraits);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    const rage: ResourceTrait = {
      title: "Rage",
      description:
        "Number of times you can go into a Rage.  Bonus applies to attack damage while in a rage.",
      resourceMax: { value: 2 },
    };
    const rageDamage: ScalingTrait = {
      title: "Rage Damage",
      description:
        "Amount of damage added to an attack while you're in a Rage.",
      bonus: 2,
    };
    pc.pcHelper.addResourceTraits(rage);
    pc.pcHelper.addScalingTraits(rageDamage);

    if(PlayerClass.multiClassCheck(pc, "Unarmored Defense")){
      pc.armorClasses.push({
        name: "Unarmored Defense",
        base: 10,
        modifier: [
          pc.abilityScores.dexterity.modifier,
          pc.abilityScores.constitution.modifier,
        ],
        bonus: { value: 0 },
      });
    }
    this.pushBarbarianFeatures(pc, 1);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new BarbarianSubclass(params.subclassSelection.subclass);
    this.subclassDriver(pc, "3", params);
    pc.pcHelper.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 5);
    pc.speeds.push(
      {
        name: "Fast Movement",
        base: pc.speed,
        bonus: {value: 10}
      }
    )
    this.subclassDriver(pc,"5",params);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "6", params);
    pc.pcHelper.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 7);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    const brutalCritical: ScalingTrait = {
      title: "Brutal Critical",
      description: "Number of extra damage dice on a critical hit.",
      dice: "1dx",
    };
    pc.pcHelper.addScalingTraits(brutalCritical);
    pc.pcHelper.findScalingTraitByName("Rage Damage").bonus = 3;
    this.pushBarbarianFeatures(pc, 9);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    pc.pcHelper.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findScalingTraitByName("Brutal Critical").dice = "2dx";
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 15);
    this.subclassDriver(pc,"15",params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    pc.pcHelper.findScalingTraitByName("Rage Damage").bonus = 4;
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findScalingTraitByName("Brutal Critical").dice = "3dx";
    pc.pcHelper.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 20);
    this.subclassDriver(pc,"20",params);
    pc.pcHelper.changeAbilityScoreMaxes(["strength", "constitution"], 24);
    pc.pcHelper.improveAbilityScores([
      {
        ability: "strength",
        improvement: 4,
      },
      {
        ability: "constitution",
        improvement: 4,
      },
    ]);
    pc.pcHelper.findResourceTraitByName("Rage").resourceMax.value = Infinity;
  }
}

export class DSBarbarian extends Barbarian {
  constructor(){
    super(true);
  }
}
