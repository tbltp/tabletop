import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as SpellList from "../../../Assets/SpellList.json";
import * as FightingStyle from "../../../Assets/FightingStyles.json";
import * as PaladinClassTraits from "./Paladin.json";
import { PaladinSubclass } from "./Subclasses/PaladinSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";
import { ResourceTrait } from "Base/Interfaces";

export class Paladin extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: LevelingParams,
    skillProficiencies?: string[],    
    weapons?: string[],
    armor?: string[],
    equipmentPack?: string
  ) {
    super(
      "Paladin",
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
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.armorProficiencies.push("Heavy");
      this.weapons = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["wisdom", "charisma"];
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

  private pushPaladinFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, PaladinClassTraits);
  }

  private upgradeLayOnHands(pc: PlayerCharacter): void {
    pc.pcHelper.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
  }

  private handlePaladinSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["PALADIN"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 1);
    pc.pcHelper.addResourceTraits({
      title: "Lay on Hands",
      description: "Number of hit points you can restore with Lay on Hands",
      resourceMax: { value: 5 },
    });

    this.addSpellcasting(pc, "PALADIN");

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 2);
    pc.pcHelper.addFeatures(FightingStyle[params.fightingStyle[0]]);
    pc.pcHelper.addSpells([...SpellList["Paladin"][1]], SpellcastingAbility["PALADIN"]);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new PaladinSubclass(params.subclassSelection);
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "3", params);

    if(PlayerClass.multiClassCheck(pc, "Channel Divinity")){
      const channelDivinity: ResourceTrait = {
        title: "Channel Divinity",
        description: "Number of times you can use a Channel Divinity ability.",
        resourceMax: { value: 1 },
      };
      pc.pcHelper.addResourceTraits(channelDivinity);
    }

    this.pushPaladinFeatures(pc, 3);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 4);
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 5);
    if(!pc.pcHelper.findResourceTraitByName("Extra Attack")){
      pc.pcHelper.addResourceTraits({
        title: "Extra Attack",
        description: "Number of Extra Attacks you can make.",
        resourceMax: { value: 1 },
      });
    }
    pc.pcHelper.addSpells([...SpellList["Paladin"][2]], SpellcastingAbility["PALADIN"]);
    this.subclassDriver(pc, "5", params);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 6);
    this.subclassDriver(pc, "6", params);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "7", params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][3]], SpellcastingAbility["PALADIN"]);
    this.subclassDriver(pc, "9", params);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 10);
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 11);
    this.subclassDriver(pc, "11", params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][4]], SpellcastingAbility["PALADIN"]);
    this.subclassDriver(pc, "13", params);
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 14);
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.upgradeLayOnHands(pc);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][5]], SpellcastingAbility["PALADIN"]);
    this.subclassDriver(pc, "17", params);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "18", params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "19", params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "20", params);
  }
}

export class DSPaladin extends Paladin {
  constructor(){
    super(true, {isNoInput: true});
  }
}