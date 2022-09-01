import {
    IAbilityScore,
    ILevelContainer,
    IProficiency,
    ISkill,
} from "../../src/Character/Interfaces";
import {
    BaseCharacter,
    SkillProficiency,
    PassiveSkill,
} from "../../src/Character/BaseCharacter";
import {
    AbilityScore,
    LevelContainer,
    Proficiency,
    HealthContainer,
    Skill,
} from "../../src/Character/BaseCharacter";

describe("AbilityScore", () => {
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
    ])("has a modifier of $mod when its score is $score", ({ score, mod }) => {
        const baseAb = new AbilityScore("Example", "Ex", score);
        expect(baseAb.modifier).toEqual(mod);
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
            mod: 5,
        },
        {
            score: 10,
            bonus: -10,
            endScore: 1,
            mod: -5,
        },
    ])(
        "changes its score from $score to $endScore after receiving a bonus of $bonus",
        ({ score, bonus, endScore, mod }) => {
            const ability = new AbilityScore("Example", "Ex", score);
            ability.increaseScore(bonus);
            expect(ability.score).toEqual(endScore);
            expect(ability.modifier).toEqual(mod);
        }
    );
    it("can increase its maximum score limit", () => {
        const ability = new AbilityScore("Example", "Ex", 19);
        expect(ability.score).toEqual(19);
        expect(ability.modifier).toEqual(4);
        ability.scoreMax = 23;
        ability.increaseScore(3);
        expect(ability.score).toEqual(22);
        expect(ability.modifier).toEqual(6);
    });
    it("can decrease its maximum score limit", () => {
        const ability = new AbilityScore("Example", "Ex", 19);
        expect(ability.score).toEqual(19);
        expect(ability.modifier).toEqual(4);
        ability.scoreMax = 10;
        expect(ability.score).toEqual(10);
        expect(ability.modifier).toEqual(0);
    });
    it("throws a error when attempting to create a score that's too low", () => {
        expect(() => {
            new AbilityScore("Example", "Ex", -1);
        }).toThrow("Starting score cannot be less than 1");
    });
    it("throws a error when attempting to create a score that's too high", () => {
        expect(() => {
            new AbilityScore("Example", "Ex", 21);
        }).toThrow("Starting score cannot be greater than maximum of 20");
    });
});

describe("LevelContainer", () => {
    let lc: LevelContainer;
    beforeEach(() => {
        lc = new LevelContainer();
    });

    it("is initializes at level 0", () => {
        expect(lc.totalLevel).toEqual(0);
    });
    it("can add levels for a class", () => {
        lc.increaseLevel("wizard");
        lc.increaseLevel("barbarian");
        lc.increaseLevel("barbarian");
        expect(lc.getClassLevel("wizard")).toEqual(1);
        expect(lc.getClassLevel("barbarian")).toEqual(2);
    });
    it("can set the maximum amount of levels", () => {
        lc.maxLevel = 25;
        lc.setClassLevel("barbarian", 2);
        lc.setClassLevel("wizard", 21);
        expect(lc.totalLevel).toEqual(23);
    });
    it("can set levels for a class", () => {
        lc.setClassLevel("gunslinger", 10);
        expect(lc.getClassLevel("gunslinger")).toEqual(10);
    });
    it("throws an error when accessing a non-existent class", () => {
        expect(lc.getClassLevel("fighter")).toBeUndefined();
    });
    it("throws an error when levels are increased beyond the maximum", () => {
        lc.setClassLevel("paladin", 20);
        expect(() => {
            lc.increaseLevel("paladin");
        }).toThrow("Total levels cannot exceed max level 20");
        expect(() => {
            lc.setClassLevel("warlock", 1);
        }).toThrow("Total levels cannot exceed max level 20");
    });
});

describe("Proficiency", () => {
    let lc: ILevelContainer;
    let bp: Proficiency;

    beforeEach(() => {
        lc = {
            totalLevel: 0,
        };
        bp = new Proficiency(lc);
    });

    it.each([
        {
            level: 1,
            bonus: 2,
        },
        {
            level: 2,
            bonus: 2,
        },
        {
            level: 5,
            bonus: 3,
        },
        {
            level: 10,
            bonus: 4,
        },
        {
            level: 15,
            bonus: 5,
        },
        {
            level: 20,
            bonus: 6,
        },
    ])("applies a bonus of $bonus at level $level", ({ level, bonus }) => {
        lc.totalLevel = level;
        expect(bp.bonus).toEqual(bonus);
    });
    it("can apply an additional bonus", () => {
        lc.totalLevel = 5;
        expect(bp.bonus).toEqual(3);
        bp.extraBonus = 2;
        expect(bp.bonus).toEqual(5);
    });
});

describe("HealthContainer", () => {
    let ab: IAbilityScore;
    let hc: HealthContainer;
    let lc: ILevelContainer;

    beforeEach(() => {
        ab = {
            name: "Excellence",
            abbr: "Exc",
            score: 10,
            modifier: 0,
        };
        lc = {
            totalLevel: 2
        };
        hc = new HealthContainer(lc);
    });

    it("initializes with a 0 hit point max", () => {
        expect(hc.hitPointMax).toEqual(0);
    });
    it("uses the linked ability score modifier to calculate a max health increase", () => {
        ab.modifier = 1;
        hc.linkedAbility = ab;
        hc.setHPIncreaseForLevel(1, 5);
        hc.setHPIncreaseForLevel(2, 7);
        expect(hc.hitPointMax).toEqual(14);
    });
    it("applies a minimum health increase of 1, regardless of ability modifier", () => {
        ab.modifier = -2;
        hc.linkedAbility = ab;
        console.log(hc);
        hc.setHPIncreaseForLevel(1, 1);
        hc.setHPIncreaseForLevel(2, 2);
        expect(hc.hitPointMax).toEqual(2);
    });
    it("can apply an extra bonus on top of the ability modifier for each max health increase", () => {
        ab.modifier = 2;
        hc.linkedAbility = ab;
        hc.extraBonus = 2;
        hc.setHPIncreaseForLevel(1, 4);
        hc.setHPIncreaseForLevel(2, 6);
        expect(hc.hitPointMax).toEqual(18);
    });
    it("retroactively applies a changing ability modifier", () => {
        ab.modifier = 1;
        hc.linkedAbility = ab;
        hc.setHPIncreaseForLevel(1, 2);
        hc.setHPIncreaseForLevel(2, 5);
        expect(hc.hitPointMax).toEqual(9);
        ab.modifier = 3;
        expect(hc.hitPointMax).toEqual(13);
    });
});

describe("Skills", () => {
    let ab: IAbilityScore;
    let pf: IProficiency;
    let sk: Skill;
    beforeEach(() => {
        ab = {
            name: "Tenacity",
            abbr: "Ten",
            score: 10,
            modifier: 0,
        };
        pf = {
            bonus: 2,
        };
        sk = new Skill("Hunting", ab, pf);
    });
    it.each([
        {
            skill: SkillProficiency.NONE,
            bonus: 0,
        },
        {
            skill: SkillProficiency.HALF,
            bonus: 1,
        },
        {
            skill: SkillProficiency.FULL,
            bonus: 2,
        },
        {
            skill: SkillProficiency.DOUBLE,
            bonus: 4,
        },
    ])(
        "has a total bonus of $bonus when proficiency bonus 2 is applied with $skill multiplier",
        ({ skill, bonus }) => {
            sk.skillProficiency = skill;
            expect(sk.bonus).toEqual(bonus);
        }
    );
    it("can apply an extra bonus independent of proficiency", () => {
        ab = {
            name: "Sensibility",
            abbr: "Sen",
            score: 16,
            modifier: 3,
        };
        sk = new Skill("Hunting", ab, pf);
        sk.skillProficiency = SkillProficiency.NONE;
        sk.extraBonus = 2;
        expect(sk.bonus).toEqual(5);
    });
});
describe("PassiveSkills", () => {
    it("Creates a passive value based on the linked skill", () => {
        const sk: ISkill = {
            name: "Acrobatics",
            bonus: 2,
        };
        const ps = new PassiveSkill("Passive Acrobatics", 10, sk);
        expect(ps.passiveValue).toEqual(12);
        sk.bonus = 4;
        expect(ps.passiveValue).toEqual(14);
    });
});
