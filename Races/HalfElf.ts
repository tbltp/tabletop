import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

export class HalfElf extends Race {
    constructor(language: string, abilityScores: string[], proficiencies: string[]) {
        super("180 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages[language]],  // Languages
            [traits["Darkvision"], traits["Fey Ancestry"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
        this.chosenAbilityScores = abilityScores;
        this.chosenProficiencies = proficiencies;
        this.traits.push(
            {"title": "Skill Versatility", "description": `You gain proficiency in two skills of your choice. - ${proficiencies[0]}, ${proficiencies[1]}`},
            {"title": "Extra Language", "description": `You can speak, read, and write one extra language of your chotce. - ${language}`}
        );
    };

    chosenAbilityScores: string[];
    chosenProficiencies: string[];

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.charisma.update(2);
        pc.abilityScores[this.chosenAbilityScores[0]].update(1);
        pc.abilityScores[this.chosenAbilityScores[1]].update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        // TODO: RESTRUCTURE + FIGURE OUT SKILLS - PROFICIENCY IN [this.chosenProficiencies]
        return;
    }
}

