import { PlayerClass, LevelingParams } from "./PlayerClass";
import { ResourceTrait, Trait, ScalingTrait } from "../Base/Interfaces";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { BarbarianArchetype } from "./Archetypes/BarbarianArchetype";

export class Barbarian extends PlayerClass {
  constructor(skillProficiencies: string[], weapons: string[]) {
    super(
      "Barbarian",
      [],
      skillProficiencies,
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [...weapons, "JAVELIN", "JAVELIN", "JAVELIN", "JAVELIN"],
      [],
      [],
      [],
      { isNoInput: true },
      "d12",
      12,
      ["strength", "constitution"]
    );

    this.equipmentPack = "EXPLORER";

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }
  /** TODO
   * FAST MOVEMENT depends on equipped armor.
   * EXTRA ATTACK should be represented in action economy.
   */

  primalPath: string = "";

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
    this.pushClassFeatures(pc, level, "BARBARIAN");
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
    pc.addResourceTraits(rage);
    pc.addScalingTraits(rageDamage);
    this.pushBarbarianFeatures(pc, 1);
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

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.primalPath = params.archetypeSelection[0].archetype;
    BarbarianArchetype.archetypeHelper[this.primalPath][3](pc, params);
    pc.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 5);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    BarbarianArchetype.archetypeHelper[this.primalPath][6](pc, params);
    pc.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 7);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    const brutalCritical: ScalingTrait = {
      title: "Brutal Critical",
      description: "Number of extra damage dice on a critical hit.",
      dice: "1dx",
    };
    pc.addScalingTraits(brutalCritical);
    pc.findScalingTraitByName("Rage Damage").bonus = 3;
    this.pushBarbarianFeatures(pc, 9);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    BarbarianArchetype.archetypeHelper[this.primalPath][10](pc, params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findScalingTraitByName("Brutal Critical").dice = "2dx";
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    BarbarianArchetype.archetypeHelper[this.primalPath][14](pc, params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 15);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findScalingTraitByName("Rage Damage").bonus = 4;
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.findScalingTraitByName("Brutal Critical").dice = "3dx";
    pc.findResourceTraitByName("Rage").resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 20);
    pc.changeAbilityScoreMaxes(["strength", "constitution"], 24);
    pc.improveAbilityScores([
      {
        ability: "strength",
        improvement: 4,
      },
      {
        ability: "constitution",
        improvement: 4,
      },
    ]);
    pc.findResourceTraitByName("Rage").resourceMax.value = Infinity;
  }
}
