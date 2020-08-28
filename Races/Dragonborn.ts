import { Race } from './Race';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as DraconicAncestry from "../Assets/DraconicAncestry.json";
import * as languages from "../Assets/Languages.json";

export class Dragonborn extends Race {
    constructor(draconicAncestry: string) {
        super(
            `Dragonborn - ${draconicAncestry}`,
            "80 years",  // Average Lifespan
            30,  // Speed (Movement)
            "Medium", // Size
            [languages["Common"], languages["Draconic"]],  // Languages
            [],  // Racial Traits
            [],  // Weapon Proficiencies
            [],  // Armor Proficiencies
            []  // Tool Proficiences
        );
        
        this.draconicAncestry = DraconicAncestry[draconicAncestry];
        this.traits.push(
            {"title": "Draconic Ancestry", "description": `You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table - ${draconicAncestry}`},
            {"title": "Breath Weapon", "description": `You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. [The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can't use it again until you complete a short or long rest - ${this.draconicAncestry["Breath Weapon"]}, ${this.draconicAncestry["Damage Type"]} Damage.`},
            {"title": "Damage Resistance", "description": `You have resistance to the damage type associated with your draconic ancestry - ${this.draconicAncestry["Damage Type"]}`},
        );

    }

    abilitiesAtLevels = {}

    draconicAncestry: {}

    abilityIncrease(pc: PlayerCharacter): void {
        pc.abilityScores.strength.update(2);
        pc.abilityScores.charisma.update(1);
    }

    proficiencies(pc: PlayerCharacter): void {
        return;
    }
}