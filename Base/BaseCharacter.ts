export abstract class BaseCharacter {
    
    // Base Abiility Scores 
    strength: BaseAbility;
    dexterity: BaseAbility;
    constitution: BaseAbility;
    intelligence: BaseAbility;
    wisdom: BaseAbility;
    charisma: BaseAbility;

    // Skill Check Modifiers
    skills: {[key: string]: Skill} = {
        "acrobatics": {ability: this.dexterity, modifier: this.dexterity.modifier}, //--> f(dex), + proficiency (Class Dependent);
        "animalHandling": {ability: this.wisdom, modifier: this.wisdom.modifier}, //--> f(wis), + proficiency (Class Dependent);
        "arcana": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
        "athletics": {ability: this.strength, modifier: this.strength.modifier},  //--> f(str), + proficiency (Class Dependent);
        "deception": {ability: this.charisma, modifier: this.charisma.modifier}, //--> f(cha), + proficiency (Class Dependent);
        "history": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
        "insight": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
        "intimidation": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
        "investigation":{ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
        "medicine": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
        "nature": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
        "perception": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
        "performance": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
        "persuasion": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
        "religion": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
        "sleightOfHand": {ability: this.dexterity, modifier: this.dexterity.modifier},  //--> f(dex), + proficiency (Class Dependent);
        "stealth": {ability: this.dexterity, modifier: this.dexterity.modifier}, //--> f(dex), + proficiency (Class Dependent);
        "survival": {ability: this.wisdom, modifier: this.wisdom.modifier}  //--> f(dex), + proficiency (Class Dependent);
    }

    inventory: Inventory;

}

interface BaseAbility {
    score: number;
    modifier: number;
}

interface Skill {
    readonly ability: BaseAbility;
    modifier: number;
}

interface Inventory {
    weapons: Weapon[];
    armor: Armor[];
    items: Item[];

}

interface Weapon {
    readonly weaponType: string,
    readonly cost: string,
    readonly damage: string,
    readonly damageType: string,
    readonly weight: string,
    readonly properties: string[]
}

interface Armor {
    readonly armorType: string;
    readonly cost: string;
    readonly AC: string;
    readonly strengthPrerequisite: number;
    readonly stealthDisadvantage: boolean;
    readonly weight: string;
}

interface Item {
    readonly itemType: string;
    readonly quantity: number;
    readonly cost: string;
    readonly weight: string;
    readonly description: string;
}