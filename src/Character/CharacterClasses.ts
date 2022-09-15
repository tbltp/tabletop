import { BaseCharacterData, BaseCharacterRules } from "../Factories/Interfaces";
import { isEqualIgnoreCase } from "../Utilities/General";
import { BaseCharacter, CharacterType } from "./BaseCharacter";

export class RuledCharacter extends BaseCharacter {
    /**
     * Holds common validation functionality across all characters for a
     * given set of rules.
     */
    constructor(data: BaseCharacterData, rules: BaseCharacterRules) {
        super();

        const validData = this.getValidData(data, rules);
        this.charSize = validData.size;
        this.setScores(validData.abilityScores);
        this.charHealth.linkedAbility = this.findAbilityScore(
            rules.linkedHealthAbility
        );
    }

    private getValidData(
        data: BaseCharacterData,
        rules: BaseCharacterRules
    ): BaseCharacterData {
        /**
         * Examines the ruleset for the character, and then applies corrected data to
         * a new BaseCharacterData object.
         * Returned data should not be missing required information
         * and should not include unspecified information.
         * TODO: Add logging
         */
        const validData: BaseCharacterData = {
            size: null,
            type: null,
            abilityScores: {},
        };

        // Add only the requested abilities, and then fill in the ones that are missing
        const validAbilityScores = {};
        Object.keys(data.abilityScores).forEach((s) => {
            if (rules.allowedAbilities.find((a) => isEqualIgnoreCase(a, s))) {
                validAbilityScores[s] = data.abilityScores[s];
            }
        });

        rules.allowedAbilities.forEach((ab) => {
            if (!validAbilityScores[ab]) {
                validAbilityScores[ab] = {
                    name: ab,
                    abbreviation: ab.substring(0, 3), // abbreviations are typically the first 3 characters
                    score: 1,
                };
            }
        });
        Object.assign(validData, data, { abilityScores: validAbilityScores });
        return validData;
    }
}

export class PlayerCharacter extends RuledCharacter {
    /**
     * For actual player usage
     */
    constructor(data: BaseCharacterData, rules: BaseCharacterRules) {
        super(data, rules);
        this.charType = CharacterType.PC;
    }
}

export class NonPlayerCharacter extends RuledCharacter {
    /**
     * For NPCs, Monsters, etc
     */
    constructor(data: BaseCharacterData, rules: BaseCharacterRules) {
        super(data, rules);
        this.charType = CharacterType.NPC;
    }
}
