import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

abstract class Gnome extends Race {
    constructor() {
        super("425 years",  // Average Lifespan
            25,  // Speed (Movement)
            "Small", // Size
            [languages["Common"], languages["Gnomish"]],  // Languages
            [traits["Darkvision"], traits["Gnome Cunning"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }
}

export class ForestGnome extends Gnome {
    constructor() {
        super();
        this.traits.push(traits["Natural Illusionist"], traits["Speak With Small Beasts"]);
        // TODO: FIGURE OUT HOW TO REPRESENT SPELL LISTS IN BASECHARACTER - NATURAL ILLUSIONIST SPELLS

    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.intelligence.update(2);
        pc.abilityScores.dexterity.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class MountainGnome extends Gnome {
    constructor() {
        super();
        this.traits.push(traits["Artificer's Lore"], traits["Tinker"]);
        this.toolProficiencies.push("Tinker's tools")
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.intelligence.update(2);
        pc.abilityScores.constitution.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}