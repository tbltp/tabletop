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
    this.subclass = new PaladinSubclass(params.subclassSelection.subclass);
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
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 4);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 5);
    pc.pcHelper.addSpells([...SpellList["Paladin"][2]], SpellcastingAbility["PALADIN"]);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 6);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "7", params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][3]], SpellcastingAbility["PALADIN"]);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 10);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][4]], SpellcastingAbility["PALADIN"]);
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.pushPaladinFeatures(pc, 15);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.upgradeLayOnHands(pc);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.upgradeLayOnHands(pc);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addSpells([...SpellList["Paladin"][5]], SpellcastingAbility["PALADIN"]);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.upgradeLayOnHands(pc);
    this.subclassDriver(pc, "20", params);
  }
}
