import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../Base/Interfaces";
import { BardSubclass } from "./Subclasses/BardSubclass";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as BardClassTraits from "./Bard.json";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Bard extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Bard",
      [],
      params.skillProficiencies,
      [],
      ["Light"],
      params.toolProficiencies,
      [],
      [],
      [],
      [],
      "d8",
      8,
      []
    );

    this.characterStart(params.multiclass, params.weapons, params.instrument, params.equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, weapons: string[], instrument: string, equipmentPack: string){
    if(!multiclass){
      this.weaponProficiencies.push("Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword");
      this.weapons.push(...weapons, "DAGGER");
      this.armor.push("LEATHER");
      this.toolKits.push(instrument)
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["dexterity", "charisma"];
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

  private pushBardFeaturesWithChoices(
    pc: PlayerCharacter,
    level: number,
    choices: string[]
  ) {}

  private pushBardFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, BardClassTraits);
  }

  private handleBardSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["BARD"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    // spell additions at most levels, replacements can be done at every level
    this.handleBardSpellSelections(pc, params);
    // bardic inspiration
    const bardicInspiration: ResourceTrait = {
      title: "Bardic Inspiration",
      description:
        "Number of times you can give Bardic Inspiration per long rest. Dice is Bardic Inspiration die.",
      resourceMax: pc.abilityScores.charisma.modifier,
      dice: "1d6",
    };
    pc.pcHelper.addResourceTraits(bardicInspiration);
    this.addSpellcasting(pc, "BARD");
    this.pushBardFeatures(pc, 1);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // song of rest
    const songOfRest: ScalingTrait = {
      title: "Song of Rest",
      description: "Dice used for Song of Rest.",
      dice: "1d6",
    };
    pc.pcHelper.addScalingTraits(songOfRest);
    // jack of all trades
    for (let skill of Object.keys(pc.skills)) {
      if (!pc.skills[skill].proficient) {
        pc.skills[skill].bonus = pc.proficiency.halfBonus;
      }
    }
    this.pushBardFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // college
    this.subclass = new BardSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);
    // expertise
    for (let skill of params.skillProficiencies) {
      pc.skills[skill].expertise = true;
    }
    PlayerClass.pushCustomizedClassFeature(
      pc,
      3,
      BardClassTraits,
      "EXPERTISE",
      params.skillProficiencies
    );
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    this.subclassDriver(pc, "5", params);
    // bardic inspiration
    pc.pcHelper.findResourceTraitByName("Bardic Inspiration").dice = "1d8";
    this.pushBardFeatures(pc, 5);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // college
    this.subclassDriver(pc, "6", params);
    this.pushBardFeatures(pc, 6);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // song of rest
    pc.pcHelper.findScalingTraitByName("Song of Rest").dice = "1d8";
  }

  level10(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    this.subclassDriver(pc, "10", params);
    // expertise
    for (let skill of params.skillProficiencies) {
      pc.skills[skill].expertise = true;
    }
    pc.pcHelper.findFeatureTraitByName("Expertise").choices.push(
      ...params.skillProficiencies
    );
    // bardic inspiration
    pc.pcHelper.findResourceTraitByName("Bardic Inspiration").dice = "1d10";
    // magical secrets
    pc.pcHelper.addSpells(
      params.magicalSecretsSpellSelection,
      SpellcastingAbility["BARD"]
    );
    PlayerClass.pushCustomizedClassFeature(
      pc,
      10,
      BardClassTraits,
      "MAGICAL SECRETS",
      params.magicalSecretsSpellSelection
    );
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // song of rest
    pc.pcHelper.findScalingTraitByName("Song of Rest").dice = "1d10";
  }

  level14(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // magical secrets
    pc.pcHelper.addSpells(
      params.magicalSecretsSpellSelection,
      SpellcastingAbility["BARD"]
    );
    pc.pcHelper.findFeatureTraitByName("Magical Secrets").choices.push(
      ...params.magicalSecretsSpellSelection
    );
    // college
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    this.subclassDriver(pc, "15", params);
    // bardic inspiration
    pc.pcHelper.findResourceTraitByName("Bardic Inspiration").dice = "1d12";
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // song of rest
    pc.pcHelper.findScalingTraitByName("Song of Rest").dice = "1d12";
  }

  level18(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    // magical secrets
    pc.pcHelper.addSpells(
      params.magicalSecretsSpellSelection,
      SpellcastingAbility["BARD"]
    );
    pc.pcHelper.findFeatureTraitByName("Magical Secrets").choices.push(
      ...params.magicalSecretsSpellSelection
    );
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    this.pushBardFeatures(pc, 20);
  }
}

export interface BardLevelingParams extends LevelingParams {
  magicalSecretsSpellSelection?: string[];
}

export class DSBard extends Bard {
  constructor(){
    super({multiclass: true});
  }
}