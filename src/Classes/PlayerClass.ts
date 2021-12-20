import * as Armor from "../../Assets/Armor.json";
import * as FightingStyle from "../../Assets/FightingStyles.json";
import * as Gear from "../../Assets/Gear.json";
import * as Languages from "../../Assets/Languages.json";
import * as SpellList from "../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";
import * as ToolKits from "../../Assets/Tools.json";
import * as Weapons from "../../Assets/Weapons.json";

import { AttachedFeature, EquipmentPack, ResourceTrait, ScalingTrait, Trait } from "../Base/Interfaces";
import { Feat, FeatParams } from "../Feats/Feat";
import { Subclass, SubclassParams } from "./Subclass";

import { Inventory } from "../Base/Equipment/Inventory";
import { PlayerCharacter } from "../Base/PlayerCharacter";

export abstract class PlayerClass {
  constructor(
    name: string,
    languages: string[],
    skillProficiencies: string[],
    weaponProficiencies: string[],
    armorProficiencies: string[],
    toolProficiencies: string[],
    weapons: string[],
    armor: string[],
    equipment: string[],
    toolKits: string[],
    hitDie: string,
    hpBase: number,
    savingThrowProficiencies: string[]
  ) {
    this.name = name;
    this.languages = languages;
    this.skillProficiencies = skillProficiencies;
    this.weaponProficiencies = weaponProficiencies;
    this.armorProficiencies = armorProficiencies;
    this.toolProficiencies = toolProficiencies;
    this.weapons = weapons;
    this.armor = armor;
    this.equipment = equipment;
    this.toolKits = toolKits;
    this.hitDie = hitDie;
    this.savingThrowProficiencies = savingThrowProficiencies;
    this.features = [];
    this.hpBase = hpBase;
  }


  name: string;
  subclass: Subclass;
  languages: string[];
  skillProficiencies: string[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  weapons: string[];
  armor: string[];
  equipment: string[];
  equipmentPack: string = "";
  toolKits: string[];
  hitDie: string;
  hpBase: number;
  savingThrowProficiencies: string[];
  features: Trait[];
  level: { value: number } = { value: 0 };

  abstract abilitiesAtLevels: {
    [key: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
  };

  protected addLanguages(pc: PlayerCharacter): void {
    for (let language of this.languages) {
      pc.traits.languages.add(Languages[language]);
    }
  }

  protected addSkillProficiencies(pc: PlayerCharacter): void {
    for (let skill of this.skillProficiencies) {
      pc.skills[skill].proficient = true;
    }
  }

  protected addWeaponProficiencies(pc: PlayerCharacter): void {
    for (let weapon of this.weaponProficiencies) {
      pc.traits.weaponProficiencies.add(weapon);
    }
  }

  protected addArmorProficiencies(pc: PlayerCharacter): void {
    for (let armor of this.armorProficiencies) {
      pc.traits.armorProficiencies.add(armor);
    }
  }

  protected addToolProficiencies(pc: PlayerCharacter): void {
    for (let tool of this.toolProficiencies) {
      pc.traits.toolProficiencies.add(tool);
    }
  }

  protected addFeatures(pc: PlayerCharacter): void {
    for (let trait of this.features) {
      pc.traits.features.push(trait);
    }
  }

  protected addWeapons(pc: PlayerCharacter): void {
    for (const weapon of this.weapons) {
      pc.inventory.weapons.push(Weapons[weapon]);
      if (
        pc.attacks.filter((attack) => attack.name == Weapons[weapon].name)
          .length == 0
      ) {
        pc.attacks.push(Inventory.buildAttack(pc, Weapons[weapon]));
      }
    }
  }

  protected addArmor(pc: PlayerCharacter): void {
    for (const a of this.armor) {
      const AC = Inventory.acFromArmorType[Armor[a].armorType](pc, Armor[a])
      let armor  = Armor[a];
      armor.AC = AC;
      pc.inventory.armor.push(armor);
      pc.armorClasses.push(
        AC
      );
    }
  }

  protected addEquipment(pc: PlayerCharacter): void {
    for (const item of this.equipment) {
      if(!item) { continue }
      pc.inventory.gear.push(Gear[item]);
    }
  }

  protected addEquipmentPack(pc: PlayerCharacter): void {
    if(this.equipmentPack){
      const pack: EquipmentPack = Inventory.equipmentPacks[this.equipmentPack]();

      if(pack.kit) {
        pc.inventory.toolKits.push(pack.kit);
      }
      for (const item of pack.gear) {
        pc.inventory.gear.push(item);
      }
    }
  }

  protected addToolkits(pc: PlayerCharacter): void {
    for (const tool of this.toolKits) {
      if(!tool) { continue }
      pc.inventory.toolKits.push(ToolKits[tool]);
    }
  }

  protected addSavingThrowProficiencies(pc: PlayerCharacter): void {
    for (const savingThrowProficiency of this.savingThrowProficiencies) {
      pc.abilityScores[savingThrowProficiency].savingThrowProficiency = true;
    }
  }

  public apply(pc: PlayerCharacter): void {
    this.addLanguages(pc);
    this.addSkillProficiencies(pc);
    this.addWeaponProficiencies(pc);
    this.addArmorProficiencies(pc);
    this.addToolProficiencies(pc);
    this.addWeapons(pc);
    this.addArmor(pc);
    this.addEquipment(pc);
    this.addEquipmentPack(pc);
    this.addToolkits(pc);
    this.addSavingThrowProficiencies(pc);

    pc.hitDie[this.hitDie] ? pc.hitDie[this.hitDie]++ : pc.hitDie[this.hitDie] = 1;

    pc.baseStats.hpMax.base = this.hpBase;
  }

  protected pushClassFeatures(
    pc: PlayerCharacter,
    level: number,
    classTraits: object
  ) {

    let riskTraits = {
      "Extra Attack": pc.pcHelper.findFeatureTraitByName("Extra Attack") === null ? false : true,
      "Unarmored Defense": pc.pcHelper.findFeatureTraitByName("Unarmored Defense") === null ? false : true
    }

    for (let key in classTraits[level]) {
      let feature: Trait = classTraits[level][key]
      if(Object.keys(riskTraits).includes(feature["title"]) && riskTraits[feature["title"]]) { continue; }
      pc.pcHelper.addFeatures(feature);
    }
  }

  protected handleSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams,
    className: string,
    src?: AttachedFeature
  ) {
    if(params.spellSelections) {
      if (params.spellSelections.add) {
        pc.pcHelper.addSpells(params.spellSelections.add, SpellcastingAbility[className], src);
      }
      if (params.spellSelections.remove) {
        pc.pcHelper.removeSpells(params.spellSelections.remove);
      }
    }
  }

  addSpellcasting(pc: PlayerCharacter, className: string){
    
    const preparedSpells = {
      level: this.level,
      modifier: pc.abilityScores[SpellcastingAbility[className]].modifier
    }
    
    const spellAttack = {
      proficiency: pc.proficiency.baseBonus,
      modifier: pc.abilityScores[SpellcastingAbility[className]].modifier
    }

    const spellSave = {
      base: 8,
      proficiency: pc.proficiency.baseBonus,
      modifier: pc.abilityScores[SpellcastingAbility[className]].modifier
    }

    let spellcasting = ["ARTIFICER", "CLERIC", "DRUID", "PALADIN", "WIZARD"].includes(className) ? 
    {
      title: className,
      preparedSpells: preparedSpells,
      spellSave: spellSave,
      spellAttack : spellAttack
    } :
    {
      title: className,
      spellSave: spellSave,
      spellAttack : spellAttack
    }

    pc.spellcasting
      ? pc.spellcasting.abilities.push(spellcasting)
      : (pc.spellcasting = {spellSlots: [], abilities: [spellcasting]});
  }

  addPreparationSpells(pc: PlayerCharacter, className: string, level: string){ 
    pc.pcHelper.addSpells(SpellList[className][level], SpellcastingAbility[className]);
  }

  subclassDriver(pc: PlayerCharacter, level: string, params: LevelingParams){
    this.subclass.subclassDriver(pc, level, this.subclass.name, params);
  }
  
  public static addFightingStyle(
      pc: PlayerCharacter,
      fightingStyle: string
    ): void {
        pc.pcHelper.addFeatures(FightingStyle[fightingStyle]);
        /* FIGHTING STYLE TAGS / EFFECTS: SHOULD BE DONE, PROBABLY IN OWN FILE FOR EXTENSIBILITY / HOMEBREW.
        switch(fightingStyle){
            case 'ARCHERY':
            case 'DEFENSE':
            case 'DUELING':
            case 'GREAT WEAPON FIGHTING':
            case 'PROTECTION':
            case 'TWO-WEAPON FIGHTING':
        }
        */
  }
  
  public static multiClassCheck(pc: PlayerCharacter, trait: string){
    
    let riskTraits = {
      "Channel Divinity": pc.pcHelper.findFeatureTraitByName("Channel Divinity") === null ? false : true,
      "Unarmored Defense": pc.pcHelper.findFeatureTraitByName("Unarmored Defense") === null ? false : true
    }
    if (riskTraits[trait]) { return true; }

    return false;
  }
}

// Used only for Live Render Character - each Class has its own props it tracks and subsequently its own DS class based on the original to get overwritten.
export class DSClass extends PlayerClass {
  constructor(){
    super("", [], [], [], [], [], [], [], [], [], "", 0, [])
  }

  abilitiesAtLevels = {
    "1": (pc: PlayerCharacter, params: LevelingParams) => { return }
  }
}

export interface ClassCreationParams {
	multiclass: boolean
	skillProficiencies?: string[],
	instrumentProficiencies?: string[],
	weapons?: string[],
	armor?: string[],
	toolProficiencies?: string[],
	equipmentPack?: string,
	instrument?: string,
	holySymbol?: string,
  arcaneFocus?: string,
  druidicFocus?: string
}
export interface LevelingParams {
  abilityScoreImprovement?: {
    abilities: string[];
    value: string;
  };
  spellSelections?: {
    add: string[];
    remove?: string;
  };
  proficiencySelection?: string[];
  toolProficiency?: string;
  fightingStyles?: string[];
  subclassParams?: SubclassParams;
  featParams?: FeatParams;
}


