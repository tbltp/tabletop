import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../../Assets/RacialTraits.json";
import * as languages from "../../Assets/Languages.json";

abstract class Halfling extends Race {
    constructor(name: string) {
        super(
            name,
            "150 years",  // Average Lifespan
            25,  // Speed (Movement)
            "Small", // Size
            [languages["Common"], languages["Halfling"]],  // Languages
            [traits["Lucky"], traits["Brave"], traits["Halfling Nimbleness"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }

    abilitiesAtLevels = {}

}

export class Lightfoot extends Halfling {
    constructor() {
        super("Lightfoot Halfling");
        this.traits.push(traits["Naturally Stealthy"]);
    }
 
    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.dexterity.update(2);
        pc.abilityScores.charisma.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class Stout extends Halfling {
    constructor() {
        super("Stout Halfling");
        this.traits.push(traits["Stout Resilience"]);
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.dexterity.update(2);
        pc.abilityScores.constitution.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}