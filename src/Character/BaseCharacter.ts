import { searchInDictionary } from "../Utilities/General";
import { AbilityData } from "../Factories/Interfaces";
import {
    IAbilityScore,
    ILevelContainer,
    IProficiency,
    ISkill,
} from "./Interfaces";

export abstract class BaseCharacter {
    /**
     * Abstract class representing any DnD character
     */
    constructor() {
        this.charSize = "";
        this.charType = CharacterType.NPC;
        this.charLevels = new LevelContainer();
        this.charProficiency = new Proficiency(this.charLevels);
        this.charAbilityScores = {};
        this.charSkills = {};
        this.charHealth = new HealthContainer(this.charLevels);
    }

    // Base Ability Scores
    protected charAbilityScores: {
        [key: string]: AbilityScore;
    };
    // Base Stats
    protected charSize: string;
    protected charType: CharacterType;
    protected charLevels: LevelContainer;
    protected charProficiency: Proficiency;
    protected charHealth: HealthContainer;

    // Skill
    protected charSkills: { [key: string]: Skill };

    // Passives
    protected passiveSkills: { [key: string]: PassiveSkill };

    // Inventory

    // Features (Class Features, Racial Traits, Feats)

    // Known Spells

    // Spell Slots

    // Accessors
    get type(): CharacterType {
        return this.charType;
    }

    get size(): string {
        return this.charSize;
    }

    //Exposed Methods
    findAbilityScore(ability: string): AbilityScore | undefined {
        return searchInDictionary(ability, this.charAbilityScores);
    }

    findSkill(skillName: string): Skill | undefined {
        return searchInDictionary(skillName, this.charSkills);
    }

    findPassive(passiveName: string): PassiveSkill | undefined {
        return searchInDictionary(passiveName, this.passiveSkills);
    }

    //Descriptor Methods
    listAbilityScores(): string[] {
        return Object.keys(this.charAbilityScores);
    }

    //Data loading methods
    setScores(scores: { [key: string]: AbilityData }): void {
        for (let sc of Object.values(scores)) {
            const { name, abbreviation, score } = sc;
            this.charAbilityScores[name] = new AbilityScore(
                name,
                abbreviation,
                score
            );
        }
    }
}

export class AbilityScore implements IAbilityScore {
    /**
     * Handles the creation and update of an ability score
     */
    constructor(name: string, abbr: string, score: number) {
        this.name = name;
        this.abbr = abbr;
        this._scoreMax = 20;
        if (score < 1) {
            throw TypeError("Starting score cannot be less than 1");
        }
        if (score > this._scoreMax) {
            throw TypeError(
                `Starting score cannot be greater than maximum of ${this._scoreMax}`
            );
        }
        this._score = score;
    }

    name: string;
    abbr: string;
    private _score: number;
    private _scoreMax: number;
    private _getModifier: () => number = () =>
        Math.floor((this._score - 10) / 2);

    savingThrowProficiency: boolean = false;
    halfProficiency: boolean = false;

    increaseScore(bonus: number): void {
        /**
         * Changes the score value;
         * allows negative values
         */
        if (this._score + bonus > this._scoreMax) {
            this._score = this._scoreMax;
            return;
        }
        if (this._score + bonus < 1) {
            this._score = 1;
            return;
        }
        this._score = this._score + bonus;
    }

    get score(): number {
        return this._score;
    }

    get modifier(): number {
        return this._getModifier();
    }

    set scoreMax(newmax: number) {
        /**
         * Sets the score maximum;
         * If the score exceeds the new maximum,
         * the score adjust to the new maximum
         */
        this._scoreMax = newmax;
        if (this._score > this._scoreMax) {
            this._score = this._scoreMax;
        }
    }
}

export class LevelContainer implements ILevelContainer {
    /**
     * Represents all the levels a character has;
     * characters may have levels in multiple classes
     */
    constructor() {
        this._levelDictionary = {};
        this._maxLevel = 20;
    }

    private _maxLevel: number;
    private _levelDictionary: {
        [className: string]: number;
    };

    set maxLevel(newmax: number) {
        this._maxLevel = newmax;
    }

    increaseLevel(className: string): void {
        /**
         * Increments the level of a specific class;
         * a new entry at level 1 is created if it does not exist
         */
        if (this.totalLevel < this._maxLevel) {
            if (this._levelDictionary[className]) {
                this._levelDictionary[className]++;
            } else {
                this._levelDictionary[className] = 1;
            }
        } else {
            throw Error(
                `Total levels cannot exceed max level ${this._maxLevel}`
            );
        }
    }

    setClassLevel(className: string, newLevel: number): void {
        /**
         * Explicitly sets the level of a specific class;
         * a new entry at level 1 is created if it does not exist
         */
        const currentLevel = this._levelDictionary[className];
        this._levelDictionary[className] = newLevel;
        if (this.totalLevel > this._maxLevel) {
            this._levelDictionary[className] = currentLevel;
            throw Error(
                `Total levels cannot exceed max level ${this._maxLevel}`
            );
        }
    }

    getClassLevel(className: string): number | undefined {
        return searchInDictionary(className, this._levelDictionary);
    }

    get totalLevel(): number {
        /**
         * Summed up across all classes
         */
        return Object.values(this._levelDictionary).reduce((s, v) => s + v, 0);
    }
}

export class Proficiency implements IProficiency {
    /**
     * Proficiency is treated as its own stand-alone stat;
     * it scales with character level and isn't influenced by other
     * built-in mechanics
     */
    constructor(level: ILevelContainer) {
        this._level = level;
        this._extraBonus = 0;
    }

    private _level: ILevelContainer;
    private _extraBonus: number;

    private _calculateLevelBonus: () => number = () =>
        // See https://roll20.net/compendium/dnd5e/Character%20Advancement#content
        Math.floor((this._level.totalLevel + 7) / 4);

    set extraBonus(value: number) {
        this._extraBonus = value;
    }

    get bonus(): number {
        return this._calculateLevelBonus() + this._extraBonus;
    }
}

export class HealthContainer {
    /**
     * Contains all the calculations for max HP;
     * this is partially influenced by a linked ability modifer,
     * but it also increaases with level
     */
    constructor(level: ILevelContainer) {
        this._extraBonus = 0;
        this._playerValues = {};
        this._ability = {
            name: "",
            abbr: "",
            score: 0,
            modifier: 0,
        };
        this._playerLevels = level;
    }

    private _ability: IAbilityScore;
    private _extraBonus: number;
    private _playerValues: {
        [level: string]: number;
    };
    private _playerLevels: ILevelContainer;

    set linkedAbility(ability: IAbilityScore) {
        this._ability = ability;
    }

    set extraBonus(value: number) {
        this._extraBonus = value;
    }

    get hitPointMax(): number {
        /**
         * For each level's value:
         * - Add the correct ability modifier
         * - Add any additonal bonus
         * - Use 1 if the result is less than 1 (per Mike Mearls)
         * Return the toal of these
         */

        return (
            Object.values(this._playerValues).reduce((s, v) => (
                s + Math.max(this._ability.modifier + this._extraBonus + v, 1)
            ), 0)
        );
    }

    setHPIncreaseForLevel(level: number, increase: number): void {
        /**
         * Set a value for HP increase if the total level allows
         */
        if(level > this._playerLevels.totalLevel) {
            throw TypeError("Cannot set increase for a level that doesn't exist.");
        }
        this._playerValues[level] = increase;
    }

}

export class Skill implements ISkill {
    /**
     * Handles calculations for skill bonuses
     * based on proficiency and linked abilities
     */
    constructor(
        name: string,
        ability: IAbilityScore,
        proficiency: IProficiency
    ) {
        this.name = name;
        this._ability = ability;
        this._proficiency = proficiency;
        this._skillProficiency = SkillProficiency.NONE;
        this._extraBonus = 0;
    }
    name: string;
    private _ability: IAbilityScore;
    private _proficiency: IProficiency;
    private _skillProficiency: SkillProficiency;
    private _extraBonus: number;

    set skillProficiency(proficiency: SkillProficiency) {
        this._skillProficiency = proficiency;
    }

    set extraBonus(value: number) {
        this._extraBonus = value;
    }

    get bonus(): number {
        /**
         *  Skill check bonuses come from:
         * - The ability modifier
         * - The proficiency level
         * - Any other bonuses
         */

        return (
            this._ability.modifier +
            this._proficiency.bonus * this._skillProficiency +
            this._extraBonus
        );
    }
}

export class PassiveSkill {
    /**
     * Represents passive skills that have
     * a flat value or DC 
     */
    constructor(name: string, base: number, skill: ISkill) {
        this.name = name;
        this._base = base;
        this._skill = skill;
    }

    name: string;
    private _base: number;
    private _skill: ISkill;

    get passiveValue(): number {
        // Generally the base value is 10
        return this._base + this._skill.bonus;
    }
}

export enum CharacterType {
    NPC = "NPC",
    PC = "PC",
}

export enum SkillProficiency {
    NONE = 0,
    HALF = 0.5,
    FULL = 1,
    DOUBLE = 2,
}
