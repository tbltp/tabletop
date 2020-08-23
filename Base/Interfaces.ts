export interface Inventory {
    weapons: Weapon[];
    armor: Armor[];
    toolKits: ToolKit[];
    items: Item[];

}

export interface Weapon {
    readonly weaponType: string,
    readonly cost: string,
    readonly damage: string,
    readonly damageType: string,
    readonly weight: string,
    readonly properties: string[]
}

export interface Armor {
    readonly armorType: string;
    readonly cost: string;
    readonly AC: string;
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
    readonly description: string;
}

export interface ResourceTrait extends Trait {
    resourceMax: number;
    resourceCount: number;
}