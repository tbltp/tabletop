import { BaseCharacter, BaseAbility } from "./BaseCharacter";
import { ResourceTrait, Spell, Trait, ScalingTrait, AttachedFeature } from "./Interfaces";
import * as Spells from "../../Assets/Spells.json";
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

  hitDie: string;
  fightingStyles?: string[];

  attacks: PCAttack[] = [];

  armorClasses: PCArmorClass[] = [
    {
      name: "Base",
      base: this.baseStats.baseArmorClass.base,
      modifier: [this.baseStats.baseArmorClass.modifier],
      bonus: this.baseStats.baseArmorClass.bonus,
    },
  ];

  speeds: PCSpeed[] = [
    { name: "Base Speed", base: this.speed, bonus: { value: 0 } },
  ];

  spellcasting?: {
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
  }[]

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
