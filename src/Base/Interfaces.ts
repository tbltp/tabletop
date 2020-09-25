export interface Inventory {
  weapons: Weapon[];
  armor: Armor[];
  toolKits: ToolKit[];
  items: Item[];
  gp: number;
}

export interface Weapon {
  readonly name: string;
  readonly weaponType: string;
  readonly cost: string;
  readonly damage: string;
  readonly damageType: string;
  readonly weight: string;
  readonly properties: string[];
}

export interface Armor {
  readonly name: string;
  readonly armorType: string;
  readonly cost: string;
  readonly AC: {
    base: number;
    modifier: { value: number };
    bonus: { value: number };
  };
  readonly strengthPrerequisite: number;
  readonly stealthDisadvantage: boolean;
  readonly weight: string;
}

export interface Item {
  readonly itemType: string;
  readonly quantity: number;
  readonly cost: string;
  readonly weight: string;
  readonly description: string;
}

export interface ToolKit {
  readonly name: string;
  readonly type: string;
  readonly cost: string;
  readonly weight: string;
}

export interface Trait {
  readonly title: string;
  description: string;
  choices?: string[];
}

export interface ResourceTrait extends Trait {
  /**Spell slots are just special resource traits with no additional properties */
  resourceMax?: { value: number };
  proficiency?: boolean;
  bonus?: number;
  dice?: string;
}

export interface ScalingTrait extends Trait {
  bonus?: number;
  dice?: string;
  challengeRating?: number;
}

export interface ISpell {
  readonly name: string;
  readonly description: string;
  readonly school: string;
  readonly castTime: string;
  readonly range: string;
  readonly concentration: boolean;
  readonly duration: string;
  readonly components: string[];
  readonly material: string;
  readonly minimumLevel: string;
  readonly ritual: boolean;
  readonly spellAttack: boolean;
}

export interface Spell extends ISpell {
  spellcastingAbility: string;
}
