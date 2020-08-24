import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

export class Tiefling extends Race {
    constructor() {
        super("100 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Infernal"]],  // Languages
            [traits["Darkvision"], traits["Hellish Resistance"], traits["Infernal Legacy"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
        // TODO: FIGURE OUT HOW TO REPRESENT SPELL LISTS IN BASECHARACTER - INFERNAL LEGACY SPELLS
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.charisma.update(2);
        pc.abilityScores.intelligence.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}