import { BaseAbility } from "../../src/Base/BaseCharacter";

describe('BaseAbility', () => {

    it.each([
        {
            score: 1,
            mod: -5,
        },
        {
            score: 2,
            mod: -4,
        },
        {
            score: 3,
            mod: -4,
        },
        {
            score: 14,
            mod: 2,
        },
        {
            score: 15,
            mod: 2,
        },
    ])('has a modifier of $mod when given a score of $score', ({score, mod }) => {
        const baseAb = new BaseAbility("Example", "Ex", score);
        expect(baseAb.modifier).toEqual(mod);
    });
    it("should throw a error when attempting to create a score that's too low", () => {
        expect(() => {
            new BaseAbility("Example", "Ex", -1);
        }).toThrow('Starting score cannot be less than 1');
    });
    it("should throw a error when attempting to create a score that's too high", () => {
        expect(() => {
            new BaseAbility("Example", "Ex", 21);
        }).toThrow('Starting score cannot be greater than maximum of 20');
    });
    it.each([
        {
            score: 15,
            bonus: 1,
            endScore: 16,
            mod: 3, 
        },
        {
            score: 20, 
            bonus: 1,
            endScore: 20,
            mod: 5
        },
        {
            score: 10, 
            bonus: -10,
            endScore: 1,
            mod: -5
        },

    ])('changes from $score to $endScore with a modifier of $mod after receiving a $bonus bonus', ({
        score,
        bonus,
        endScore,
        mod
    }) => {
        const ability = new BaseAbility("Example", "Ex", score);
        ability.increaseScore(bonus);
        expect(ability.score).toEqual(endScore);
        expect(ability.modifier).toEqual(mod);
    });

});