import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as SorcererClassTraits from "./Sorcerer.json";
import * as Metamagic from "../../../Assets/Metamagic.json";
import { SorcererSubclass } from "./Subclasses/SorcererSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

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
    this.handleSpellSelections(pc, params, SpellcastingAbility["SORCERER"]);
  }

  private addMetaMagic(pc: PlayerCharacter, metaMagicSelection: string[]) {
    for (const metaMagic of metaMagicSelection) {
      pc.pcHelper.addFeatures(Metamagic[metaMagic]);
    }
  }

  level1(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    // spell replacements can happen at any level
    this.handleSorcererSpellSelections(pc, params);
    this.addSpellcasting(pc, "SORCERER");
    this.subclass = new SorcererSubclass(params.subclassParams)
    this.subclassDriver(pc, "1", params);

  }

  level2(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.addResourceTraits({
      title: "Sorcery Points",
      description: "Number of Sorcery Points you have.",
      resourceMax: { value: 2 },
    });
    this.subclassDriver(pc, "2", params);
  }

  level3(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
    this.subclassDriver(pc, "3", params);

  }

  level4(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "5", params);
  }

  level6(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.subclassDriver(pc, "6", params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "7", params);
  }

  level8(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "9", params);
  }

  level10(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "11", params);
  }

  level12(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "13", params);
  }

  level14(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.subclassDriver(pc, "14", params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level15(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "15", params);
  }

  level16(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
    this.subclassDriver(pc, "17", params);
  }

  level18(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.subclassDriver(pc, "18", params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.subclassDriver(pc, "19", params);
  }

  level20(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.pushSorcererFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
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
