import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as Traits from "../../Assets/RacialTraits.json";
import * as languages from "../../Assets/Languages.json";
import * as Spells from '../../Assets/Spells.json';
import { Trait, ISpell } from '../Base/Interfaces';

abstract class Genasi extends Race {
    constructor(name: string, racialTraits: Trait[]) {
        super(
            name,
            "120 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Primordial"]],  // Languages
            racialTraits,  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }
    
    abilityIncrease(pc: PlayerCharacter){
        pc.abilityScores.constitution.update(2);
    }

    abilitiesAtLevels = {}

}

export class FireGenasi extends Genasi {
    constructor() {
        super("Fire Genasi", [Traits["DARKVISION"], Traits["FIRE RESISTANCE"], Traits["REACH TO THE BLAZE"]]);
    }

    
    abilityIncrease(pc: PlayerCharacter): void {
        super.abilityIncrease(pc);
        pc.abilityScores.intelligence.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }

    abilitiesAtLevels = {
        "1": this.level1,
        "3": this.level3
    }

    level1(pc: PlayerCharacter) { 
        let ispell: ISpell = Spells["PRODUCE FLAME"];
        const spell = {...ispell, spellcastingAbility: "consitution"};
        pc.spells["0"].push(spell);
    }

    level3(pc: PlayerCharacter) { 
        let ispell: ISpell = Spells["BURNING HANDS"];
        const spell = {...ispell, spellcastingAbility: "constitution"};
        pc.spells["0"].push(spell);
    }
}

export class EarthGenasi extends Genasi {
    constructor() {
        super("Earth Genasi", []);
    }

    
    abilityIncrease(pc: PlayerCharacter): void {
        super.abilityIncrease(pc);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class AirGenasi extends Genasi {
    constructor() {
        super("Air Genasi", []);
    }

    
    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.constitution.update(2);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class WaterGenasi extends Genasi {
    constructor() {
        super("Water Genasi", []);
    }

    
    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.constitution.update(2);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}