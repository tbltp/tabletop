import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { BardSubclass } from "./Subclasses/BardSubclass";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as BardClassTraits from "./Bard.json";

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

  private pushBardFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, BardClassTraits);
  }

  private handleBardSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, "BARD");
  }

  private handleMagicalSecretsSelection(pc, params){
    pc.pcHelper.addSpells(
      params.magicalSecretsSpellSelection,
      SpellcastingAbility["BARD"]
    );
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBardFeatures(pc, 1);
    this.addSpellcasting(pc, "BARD");
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.addEffectsToFeature("Bardic Inspiration", {resource: {resourceMax: pc.abilityScores.charisma.modifier}, scaling: {dice: "1d6"}})
    
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBardFeatures(pc, 2);
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.addEffectsToFeature("Song of Rest", {scaling: {dice: "1d6"}})
    
    for (let skill of Object.keys(pc.skills)) { // Jack of All Trades
      if (!pc.skills[skill].proficient) {
        pc.skills[skill].bonus = pc.proficiency.halfBonus;
      }
    }
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBardFeatures(pc, 3)
    pc.pcHelper.customizeFeature("Expertise", params.proficiencySelection)
    this.subclass = new BardSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);
    this.handleBardSpellSelections(pc, params);

    for (let skill of params.proficiencySelection) {
      pc.skills[skill].expertise = true;
    }    
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBardFeatures(pc, 5);
    this.subclassDriver(pc, "5", params);
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Bardic Inspiration").scaling.dice = "1d8";
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {   
    this.pushBardFeatures(pc, 6);
    this.subclassDriver(pc, "6", params);
    this.handleBardSpellSelections(pc, params);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Song of Rest").scaling.dice = "1d8";
  }

  level10(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.pushBardFeatures(pc, 10)
    pc.pcHelper.customizeFeature("Magical Secrets", params.magicalSecretsSpellSelection)
    this.subclassDriver(pc, "10", params);
    this.handleBardSpellSelections(pc, params);
    this.handleMagicalSecretsSelection(pc, params);
    pc.pcHelper.findFeatureTraitByName("Bardic Inspiration").scaling.dice = "1d10";
    
    // expertise
    for (let skill of params.proficiencySelection) {
      pc.skills[skill].expertise = true;
    }
    
    pc.pcHelper.findFeatureTraitByName("Expertise").choices.push(
      ...params.proficiencySelection
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
    pc.pcHelper.findFeatureTraitByName("Song of Rest").scaling.dice = "1d10";
  }

  level14(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.subclassDriver(pc, "14", params);
    this.handleBardSpellSelections(pc, params);
    this.handleMagicalSecretsSelection(pc, params);
    pc.pcHelper.findFeatureTraitByName("Magical Secrets").choices.push(
      ...params.magicalSecretsSpellSelection
    );
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Bardic Inspiration").scaling.dice = "1d12";
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Song of Rest").scaling.dice = "1d12";
  }

  level18(pc: PlayerCharacter, params: BardLevelingParams): void {
    this.handleBardSpellSelections(pc, params);
    this.handleMagicalSecretsSelection(pc, params);
    pc.pcHelper.findFeatureTraitByName("Magical Secrets").choices.push(
      ...params.magicalSecretsSpellSelection
    );
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleBardSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBardFeatures(pc, 20);
    this.handleBardSpellSelections(pc, params);
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