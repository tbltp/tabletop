import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

abstract class Dwarf extends Race {
    constructor(toolProficiency: string) {
        super("350 years",  // Average Lifespan
            25,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Dwarvish"]],  // Languages
            [traits["Darkvision"], traits["Dwarven Resilience"], traits["Stonecunning"]],  // Racial Traits
            ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            [toolProficiency]  // Tool Proficiences
        );
    }
}

export class HillDwarf extends Dwarf {
    constructor(toolProficiency: string) {
        super(toolProficiency);
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.constitution.update(2);
        pc.wisdom.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class MountainDwarf extends Dwarf {
    constructor(toolProficiency: string) {
        super(toolProficiency);
        this.traits.push(traits["Dwarven Toughness"]);
        this.armorProficiencies.push("Light", "Medium");
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.strength.update(2);
        pc.constitution.update(2);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}