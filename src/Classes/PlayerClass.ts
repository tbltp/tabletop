import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Trait } from "../Base/Interfaces";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";


export abstract class PlayerClass {

    constructor(
        name: string,
        languages: string[], 
        skillProficiencies: string[], 
        weaponProficiencies: string[], 
        armorProficiencies: string[], 
        toolProficiencies: string[],
        features: Trait[], 
        equipment: string[],
        toolKits: string[],
        ) {

        this.name = name;
        this.languages = languages;
        this.skillProficiencies = skillProficiencies;
        this.weaponProficiencies = weaponProficiencies;
        this.armorProficiencies = armorProficiencies;
        this.toolProficiencies = toolProficiencies;
        this.features = features;
        this.equipment = equipment;
        this.toolKits = toolKits;
    }

    name: string;
    languages: string[];
    skillProficiencies: string[];
    weaponProficiencies: string[];
    armorProficiencies: string[];
    toolProficiencies: string[];
    features: Trait[];
    equipment: string[];
    toolKits: string[];
    //TODO: wtf is a Path
    //path: Path;

    abstract abilitiesAtLevels: {[key: string]: (pc: PlayerCharacter) => void; };

    abstract proficiencies(pc): void;

    addLanguages(pc: PlayerCharacter): void {
        for(let language of this.languages) { pc.traits.languages.push(Languages[language]); };
    }

    addSkillProficiencies(pc: PlayerCharacter): void {
        for(let skill of this.skillProficiencies) { pc.skills[skill].proficient = true; }
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

    addFeatures(pc: PlayerCharacter): void {
        for(let trait of this.features) { pc.traits.features.push(trait) };
    }

    addEquipment(pc: PlayerCharacter): void {
        for(const item of this.equipment) { pc.inventory.items.push(Gear[item]); }
    }

    addToolkits(pc: PlayerCharacter): void {
        for(const tool of this.toolKits) { pc.inventory.toolKits.push(ToolKits[tool]); }
    }

    abstract apply(pc: PlayerCharacter): void;
}

/*
export class Barbarian extends PlayerClass {

}

export class Bard extends PlayerClass {

}

export class Cleric extends PlayerClass {

}

export class Druid extends PlayerClass {
    
}

export class Fighter extends PlayerClass {
    
}

export class Monk extends PlayerClass {
    
}

export class Paladin extends PlayerClass {
    
}

export class Ranger extends PlayerClass {
    
}

export class Rogue extends PlayerClass {
    
}

export class Sorcerer extends PlayerClass {
    
}

export class Warlock extends PlayerClass {
    
}

export class Wizard extends PlayerClass {
    
}
*/