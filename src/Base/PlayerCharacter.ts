import { BaseCharacter } from "./BaseCharacter";
import { AttachedFeature, SpellSlot } from "./Interfaces";
import { PlayerCharacterHelper } from "./PlayerCharacterHelper";

export class PlayerCharacter extends BaseCharacter {
  constructor(
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
  ) {
    super(str, dex, con, int, wis, cha);
  }

  hitDie: {[key: string]: number} = {};
  fightingStyles?: string[];

  attacks: PCAttack[] = [];

  armorClasses: PCArmorClass[] = [
    {
      name: "Base",
      base: 10,
      modifier: [this.abilityScores["dexterity"].modifier],
      bonus: {value: 0},
    },
  ];

  speeds: PCSpeed[] = [
    { name: "Base Speed", base: {value: 0}, bonus: { value: 0 } },
  ];

  spellcasting?: {spellSlots: SpellSlot[], abilities: PCSpellcastingAbility[]};

  notes: Note[] = [];

  pcHelper: PlayerCharacterHelper = new PlayerCharacterHelper(this);
}

export interface PCArmorClass {
  name: string;
  base: number;
  modifier: { value: number }[];
  bonus: { value: number };
}

export interface PCAttack {
  name: string;
  attackBonus: {
    ability: { value: number };
    proficient: boolean;
    itemBonus: { value: number };
  };
  dice: string;
  damageType: string;
  damageBonus: { value: number };
  fightingStyles?: AttachedFeature[];
}

export interface PCSpeed {
  name: string;
  base: { value: number };
  bonus: { value: number };
}
export interface Note {
  title: string;
  description: string;
  date: string;
}

export interface PCSpellcastingAbility {
  title: string,
  preparedSpells?: {
    level: { value: number };
    modifier: { value: number };
  },
  spellSave: {
    base: number;
    proficiency: { value: number };
    modifier: { value: number };
  },
  spellAttack: {
    proficiency: { value: number };
    modifier: { value: number };
  }
}