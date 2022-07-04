export interface Inventory {
  weapons: Weapon[];
  armor: Armor[];
  toolKits: ToolKit[];
  gear: Item[];
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
  fightingStyles?: string[];
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
  fightingStyles?: string[];
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
  readonly kit: string;
  readonly cost: string;
  readonly weight: string;
  readonly description: string;
}

export interface EquipmentPack {
  gear: Item[];
  kit?: ToolKit;
}

export interface Trait {
  readonly title: string;
  description: string;
  choices?: string[];
  resource?: ResourceTrait;
  scaling?: ScalingTrait;
  spellAdded?: string; //TODO: turn this into an array
}

export interface ResourceTrait {
  resourceMax?: { value: number };
  proficiency?: boolean;
}

export interface ScalingTrait {
  bonus?: number;
  dice?: string;
  challengeRating?: number;
  points?: number;
  uses?: number;
}

export interface SpellSlot extends ResourceTrait {
  level: number;
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
  source?: AttachedFeature;
}

export interface AttachedFeature {
  readonly title: string;
  readonly description: string;
}