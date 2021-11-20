import * as Metamagic from "../../../Assets/Metamagic.json";
import * as SorcererClassTraits from "./Sorcerer.json";

import { ClassCreationParams, LevelingParams, PlayerClass } from "../PlayerClass";

import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { SorcererSubclass } from "./Subclasses/SorcererSubclass";

export class Sorcerer extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Sorcerer",
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      "d6",
      6,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.equipmentPack, params.arcaneFocus);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], equipmentPack: string, arcaneFocus: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this. weaponProficiencies = ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, light"];
      this.weapons = [...weapons, "DAGGER", "DAGGER"];
      this.equipmentPack = equipmentPack;
      this.equipment = [arcaneFocus]; //POUCH is also a focus
      this.savingThrowProficiencies = ["constitution", "charisma"]
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

  pushSorcererFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, SorcererClassTraits);
  }

  private handleSorcererSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ): void {
    this.handleSpellSelections(pc, params, "SORCERER");
  }

  private addMetaMagic(pc: PlayerCharacter, metaMagicSelection: string[]) {
    for (const metaMagic of metaMagicSelection) {
      pc.pcHelper.addFeatures(Metamagic[metaMagic]);
    }
  }

  level1(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    // spell replacements can happen at any level
    this.subclass = new SorcererSubclass(params.subclassParams)
    this.subclassDriver(pc, "1", params);
    this.addSpellcasting(pc, "SORCERER");
    this.handleSorcererSpellSelections(pc, params);
  }

  level2(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.pushSorcererFeatures(pc, 2)
    this.subclassDriver(pc, "2", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.addEffectsToFeature("Font of Magic", {resource: {resourceMax: {value: 2}}})
  }

  level3(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.pushSorcererFeatures(pc, 3)
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level4(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "4", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level5(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "5", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level6(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "6", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "7", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level8(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "8", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level9(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "9", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level10(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "10", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level11(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "11", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level12(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "12", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level13(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "13", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level14(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "14", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level15(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level16(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "16", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level17(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "17", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level18(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "18", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.subclassDriver(pc, "19", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }

  level20(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.pushSorcererFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findFeatureTraitByName("Font of Magic").resource.resourceMax.value++;
  }
}

export class DSSorcerer extends Sorcerer {
  constructor(){
    super({ multiclass: true });
  }
}

export interface SorcererLevelingParams extends LevelingParams {
  metaMagic?: string[];
}
