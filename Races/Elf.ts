import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as traits from "../Assets/RacialTraits.json";
import * as languages from "../Assets/Languages.json";

abstract class Elf extends Race {
    constructor() {
        super("750 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Elvish"]],  // Languages
            [traits["Darkvision"], traits["Keen Senses"], traits["Fey Ancestry"], traits["Trance"]],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
    }
}

export class HighElf extends Elf {
    constructor(cantrip: string, language: string) {
        super();
        this.traits.push(
            {"title": "Cantrip", "description": `You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it - ${cantrip}`},
            {"title": "Extra Language", "description": `You can speak, read, and write one extra language of your chotce. - ${language}`}
        );
        this.weaponProficiencies.push("Longsword", "Shortsword", "Shortbow", "Longbow");
        this.languages.push(languages[language]);
        // TODO: FIGURE OUT HOW TO REPRESENT SPELL LISTS IN BASECHARACTER - GAINS ONE WIZARD CANTRIP (INT)
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.dexterity.update(2);
        pc.abilityScores.intelligence.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        // TODO: RESTRUCTURE + FIGURE OUT SKILLS - PROFICIENCY IN PERCEPTION
    }
}

export class WoodElf extends Elf {
    constructor(language: string) {
        super();
        this.traits.push(
            traits["Fleet of Foot"],
            traits["Mask of Wild"]
        );
        this.speed += 5;
        this.languages.push(languages[language]);
        this.weaponProficiencies.push("Longsword", "Shortsword", "Shortbow", "Longbow");
     }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.dexterity.update(2);
        pc.abilityScores.wisdom.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        // TODO: RESTRUCTURE + FIGURE OUT SKILLS - PROFICIENCY IN PERCEPTION
    }
}

export class DarkElf extends Elf {
    constructor(language: string) {
        super();
        this.traits.push(
            traits["Superior Darkvision"], 
            traits["Sunlight Sensitivity"],
            traits["Drow Magic"]
        );
        this.languages.push(languages[language]);
        this.weaponProficiencies.push("Rapier", "Shortsword", "Crossbow, hand");
        // TODO: FIGURE OUT HOW TO REPRESENT SPELL LISTS IN BASECHARACTER - GAINS DANCING LIGHTS LVL 1, FAERIE FIRE LVL 3, DARKNESS LVL 5 (CHA)
    }

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.dexterity.update(2);
        pc.abilityScores.charisma.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        // TODO: RESTRUCTURE + FIGURE OUT SKILLS - PROFICIENCY IN PERCEPTION
    }
}