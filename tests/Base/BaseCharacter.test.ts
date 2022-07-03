import { BaseAbility, LevelContainer } from "../../src/Base/BaseCharacter";

describe("BaseAbility", () => {
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
  ])(
    "has a modifier of $mod when its score is $score",
    ({ score, mod }) => {
      const baseAb = new BaseAbility("Example", "Ex", score);
      expect(baseAb.modifier).toEqual(mod);
    }
  );
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
      const ability = new BaseAbility("Example", "Ex", score);
      ability.increaseScore(bonus);
      expect(ability.score).toEqual(endScore);
      expect(ability.modifier).toEqual(mod);
    }
  );
  it("can increase its maximum score limit", () => {
    const ability = new BaseAbility("Example", "Ex", 19);
    expect(ability.score).toEqual(19);
    expect(ability.modifier).toEqual(4);
    ability.scoreMax = 23;
    ability.increaseScore(3);
    expect(ability.score).toEqual(22);
    expect(ability.modifier).toEqual(6);
  });
  it("can decrease its maximum score limit", () => {
    const ability = new BaseAbility("Example", "Ex", 19);
    expect(ability.score).toEqual(19);
    expect(ability.modifier).toEqual(4);
    ability.scoreMax = 10;
    expect(ability.score).toEqual(10);
    expect(ability.modifier).toEqual(0);
  });
  it("throws a error when attempting to create a score that's too low", () => {
    expect(() => {
      new BaseAbility("Example", "Ex", -1);
    }).toThrow("Starting score cannot be less than 1");
  });
  it("throws a error when attempting to create a score that's too high", () => {
    expect(() => {
      new BaseAbility("Example", "Ex", 21);
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
    expect(() => {
      lc.getClassLevel("fighter");
    }).toThrow("Class fighter not found");
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
