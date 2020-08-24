import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

abstract class Halfling extends Race {
    constructor() {
        super("150 years",  // Average Lifespan
            25,  // Speed (Movement)
            "Small", // Size
            [languages["Common"], languages["Halfling"]],  // Languages
            [traits["Lucky"], traits["Brave"], traits["Halfling Nimbleness"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }
}

export class Lightfoot extends Halfling {
    constructor() {
        super();
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

export class MountainDwarf extends Halfling {
    constructor() {
        super();
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