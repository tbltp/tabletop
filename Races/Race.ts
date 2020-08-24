import { Trait } from '../Base/Interfaces';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { FunctionDeclaration } from 'typescript';

export abstract class Race {
    
    constructor(age: string, speed: number, size: string, languages: Trait[], traits: Trait[], weaponProficiencies: string[], armorProficiencies: string[], toolProficiencies: string[]) {
        this.age = age;
        this.speed = speed;
        this.size = size;
        this.languages = languages;
        this.traits = traits;
        this.weaponProficiencies = weaponProficiencies;
        this.armorProficiencies = armorProficiencies;
        this.toolProficiencies = toolProficiencies;
    }
    
    age: string;
    speed: number;
    size: string;
    languages: Trait[];
    traits: Trait[];
    weaponProficiencies: string[];
    armorProficiencies: string[];
    toolProficiencies: string[];
    
    abstract abilitiesAtLevels: {[key: number]: FunctionDeclaration };

    abstract abilityIncrease(PlayerCharacter): void;

    abstract proficiencies(pc): void;

    addLanguages(pc: PlayerCharacter): void {
        for(let language of this.languages) { pc.traits.languages.push(language) };
    }

    addFeatures(pc: PlayerCharacter): void {
        for(let trait of this.traits) { pc.traits.features.push(trait) };
    }

    addWeaponProficiencies(pc: PlayerCharacter): void {
        for(let weapon of this.weaponProficiencies) { pc.traits.weaponProficiencies.push(weapon) };
    }

    addArmorProficiencies(pc: PlayerCharacter): void {
        for(let armor of this.armorProficiencies) { pc.traits.armorProficiencies.push(armor) };
    }

    addToolProficiencies(pc: PlayerCharacter): void {
        for(let tool of this.toolProficiencies) { pc.traits.toolProficiencies.push(tool) };
    }

    apply(pc: PlayerCharacter): void {
        this.abilityIncrease(pc);
        this.proficiencies(pc);
        this.addLanguages(pc);
        this.addFeatures(pc);
        this.addWeaponProficiencies(pc);
        this.addArmorProficiencies(pc);
        this.addToolProficiencies(pc);
        pc.speed = this.speed;
        pc.size = this.size;
    }
}