import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";
import * as feats from "../Assets/Feats.json";
import { Trait } from '../Base/Interfaces';

abstract class Human extends Race {
    constructor(language: string) {
        super("100 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages[language]],  // Languages
            [],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }
}

export class BaseHuman extends Human {
    constructor(language: string) {
        super(language);
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.strength.update(1);
        pc.abilityScores.dexterity.update(1);
        pc.abilityScores.constitution.update(1);
        pc.abilityScores.intelligence.update(1);
        pc.abilityScores.wisdom.update(1);
        pc.abilityScores.charisma.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}

export class VariantHuman extends Human {
    constructor(language: string, feat: string, proficiency: string, abilityScores: string[]) {
        super(language);
        this.traits.push(
            feats[feat],
            {"title": "Extra Language", "description": `You can speak, read, and write one extra language of your chotce. - ${language}`},
            {"title": "Proficiency", "description": `You gain proficiency in a skill of your choice . - ${proficiency}`}
        );
        
        this.chosenAbilityScores = abilityScores;
        this.chosenProficiency = proficiency;
    }

    chosenAbilityScores: string[];
    chosenProficiency: string;

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores[this.chosenAbilityScores[0]].update(1);
        pc.abilityScores[this.chosenAbilityScores[1]].update(1);
        
    }

    proficiencies(pc: PlayerCharacter): void {
       // TODO: RESTRUCTURE + FIGURE OUT SKILLS - PROFICIENCY IN [this.chosenProficiency]
        return;
    }
}