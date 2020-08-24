import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

export class HalfOrc extends Race {
    constructor() {
        super(
            "75 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Orc"]],  // Languages
            [traits["Darkvision"], traits["Menacing"], traits["Relentless Endurance"], traits["Savage Attacks"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }

    abilitiesAtLevels = {}

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.strength.update(2);
        pc.abilityScores.constitution.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        pc.skills["Intimidation"].proficient = true;
    }
}