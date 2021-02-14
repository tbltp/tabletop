import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Trait, EquipmentPack, AttachedFeature } from "../Base/Interfaces";
import * as Spells from "../../Assets/Spells.json";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";
import * as FightingStyle from "../../Assets/FightingStyles.json";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";
import * as Armor from "../../Assets/Armor.json";
import * as Weapons from "../../Assets/Weapons.json";
import { Inventory } from "../Base/Inventory";
import { Subclass } from "./Subclass";
import { Feat } from "../Feats/Feat";

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
    lvlOneParams: LevelingParams,
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
    this.lvlOneParams = lvlOneParams;
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
  lvlOneParams: LevelingParams;
  hitDie: string;
  hpBase: number;
  savingThrowProficiencies: string[];
  features: Trait[];
  level: { value: number } = { value: 1 };

  abstract abilitiesAtLevels: {
    [key: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
  };

  protected addLanguages(pc: PlayerCharacter): void {
    for (let language of this.languages) {
      pc.traits.languages.push(Languages[language]);
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
    this.abilitiesAtLevels["1"](pc, this.lvlOneParams);

    pc.hitDie = this.hitDie;

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
    ability: string,
    src?: AttachedFeature
  ) {
    if(params.spellSelections) {
      if (params.spellSelections.add) {
        pc.pcHelper.addSpells(params.spellSelections.add, ability, src);
      }
      if (params.spellSelections.remove) {
        pc.pcHelper.removeSpells(params.spellSelections.remove);
      }
    }
  }

  public static pushCustomizedClassFeature(
    pc: PlayerCharacter,
    level: number,
    classTraits: object,
    feature: string,
    choices: string[]
  ) {
    const customFeature: Trait = {
      ...classTraits[level][feature],
      choices: choices,
    };
    pc.pcHelper.addFeatures(customFeature);
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
      ? pc.spellcasting.push(spellcasting)
      : (pc.spellcasting = [spellcasting]);
  }

  subclassDriver(pc: PlayerCharacter, level: string, params: LevelingParams){
    this.subclass.subclassDriver(pc, level, this.subclass.title, params);
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
      "Channel Divinity": pc.pcHelper.findResourceTraitByName("Channel Divinity") === null ? true : false,
      "Unarmored Defense": pc.pcHelper.findFeatureTraitByName("Unarmored Defense") === null ? true : false
    }
    
    if (riskTraits[trait]) { return false; }

    return true;
  }
}


export interface LevelingParams {
  isNoInput: boolean;
  abilityScoreImprovement?: {
    ability: string;
    improvement: number;
  }[];
  spellSelections?: {
    add: string[];
    remove?: string;
  };
  proficiencySelection?: string[];
  toolProficiency?: string;
  fightingStyle?: string[];
  subclassSelection?: {
    subclass: string; //school/oath/patron/etc
    options?: string[]; //totems/maneuvers/elements/beast companions/etc
  };
  featChoice?: Feat;
}

export interface NewCharacterParams {
  skillProficiencies?: string[]; 
  toolProficiencies?: string[];
  weapons?: string[];
  armor?: string[];
  equipmentPack?: string;
  instrument?: string;
  holySymbol?: string;
  arcaneFocus?: string;
  druidicFocus?: string;
}