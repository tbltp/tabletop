import {
    Lucky,
    InspiringLeader,
    KeenMind,
    LightlyArmored,
    Linguist,
    MageSlayer,
    MagicInitiate,
    MediumArmorMaster,
    Mobile,
    ModeratelyArmored,
    MountedCombatant,
    Observant,
} from "../../src/Feats/Feat";
import { Feat } from "../../src/Feats/Feat";
import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import * as Languages from "../../Assets/Languages.json";
import * as Feats from "../../Assets/Feats.json";
import * as Spells from "../../Assets/Spells.json";

describe("Feats", () => {
    let pc: PlayerCharacter;

    beforeEach(() => {
        pc = new PlayerCharacter(13, 13, 13, 13, 13, 13);
    });

    test("Inspiring Leader feat fails to apply when the Charisma < 13", () => {
        pc.abilityScores.charisma.update(-1);
        let ft: Feat = new InspiringLeader();
        expect(() => ft.apply(pc)).toThrowError("Requirement Not Met: 13 Cha");
    });

    test("Inspiring Leader feat applies when the Charisma >= 13", () => {
        let ft: Feat = new InspiringLeader();
        ft.apply(pc);
        expect(pc.traits.features).toContain(Feats["INSPIRING LEADER"]);
    });

    test("Keen Mind feat increases intelligence by 1", () => {
        let ft: Feat = new KeenMind();
        ft.apply(pc);
        expect(pc.abilityScores.intelligence.score).toBe(14);
    });

    test("Lightly Armored feat increases strength or dexterity by 1", () => {
        let pc2: PlayerCharacter = new PlayerCharacter(13, 13, 13, 13, 13, 13);
        let ft1: Feat = new LightlyArmored("strength");
        let ft2: Feat = new LightlyArmored("dexterity");
        ft1.apply(pc);
        ft2.apply(pc2);
        expect(
            pc.abilityScores.strength.score === 14 &&
                pc2.abilityScores.dexterity.score === 14
        ).toBeTruthy();
    });

    test("Lightly Armored feat introduces light armor proficiency", () => {
        let ft: Feat = new LightlyArmored("strength");
        ft.apply(pc);
        expect(pc.traits.armorProficiencies).toContain("Light");
    });

    test("Linguist feat increases intelligence by 1", () => {
        let ft: Feat = new Linguist(["Common", "Dwarvish", "Elvish"]);
        ft.apply(pc);
        expect(pc.abilityScores.intelligence.score).toBe(14);
    });

    test("Linguist feat introduces 3 language proficiencies", () => {
        let ft: Feat = new Linguist(["Common", "Dwarvish", "Elvish"]);
        ft.apply(pc);
        expect(
            pc.traits.languages.includes(Languages["Common"]) &&
                pc.traits.languages.includes(Languages["Dwarvish"]) &&
                pc.traits.languages.includes(Languages["Elvish"])
        ).toBeTruthy();
    });

    test("Lucky feat has a resource trait with max of 3", () => {
        let ft: Feat = new Lucky();
        ft.apply(pc);
        expect(pc.traits.resources[0].resourceMax.value).toBe(3);
    });

    test("Mage Slayer feat introduces combat changes", () => {
        let ft: Feat = new MageSlayer();
        ft.apply(pc);
        expect(pc.traits.features).toContain(Feats["MAGE SLAYER"]);
    });

    test("Magic Initiate feat introduces 2 cantrips", () => {
        let ft: Feat = new MagicInitiate(
            "DRUID",
            ["DRUIDCRAFT", "GUIDANCE"],
            "ANIMAL FRIENDSHIP"
        );
        ft.apply(pc);
        expect(
            pc.spells[0][0].spellcastingAbility === "wisdom" &&
                pc.spells[0][1].spellcastingAbility === "wisdom"
        ).toBeTruthy();
    });

    test("Magic Initiate feat introduces 1 first level spell", () => {
        let ft: Feat = new MagicInitiate(
            "DRUID",
            ["DRUIDCRAFT", "GUIDANCE"],
            "ANIMAL FRIENDSHIP"
        );
        ft.apply(pc);
        expect(pc.spells[1][0].spellcastingAbility == "wisdom").toBeTruthy();
    });

    test.skip("Martial Adept feat is not testable yet", () => {});

    test.skip("Medium Armor Master feat is not fully testable yet", () => {});

    test("Mobile feat increases speed by 10", () => {
        let ft: Feat = new Mobile();
        let initialSpeed = pc.speed.value;
        ft.apply(pc);
        expect(pc.speed.value).toBe(initialSpeed + 10);
    });

    test("Moderately Armored feat fails to apply without light armor proficiency", () => {
        let ft: Feat = new ModeratelyArmored("dexterity");
        expect(() => ft.apply(pc)).toThrowError(
            "Requirement Not Met: Light Armor Proficiency"
        );
    });

    test("Moderately Armored feat applies when proficient in light armor", () => {
        pc.traits.armorProficiencies.push("Light");
        let ft: Feat = new ModeratelyArmored("dexterity");
        ft.apply(pc);
        expect(pc.traits.features).toContain(Feats["MODERATELY ARMORED"]);
    });

    test("Moderately Armored feat increases strengh or dexterity by 1", () => {
        let pc2: PlayerCharacter = new PlayerCharacter(13, 13, 13, 13, 13, 13);
        pc.traits.armorProficiencies.push("Light");
        pc2.traits.armorProficiencies.push("Light");
        let ft1: Feat = new ModeratelyArmored("strength");
        let ft2: Feat = new ModeratelyArmored("dexterity");
        ft1.apply(pc);
        ft2.apply(pc2);
        expect(
            pc.abilityScores.strength.score === 14 &&
                pc2.abilityScores.dexterity.score === 14
        ).toBeTruthy();
    });

    test("Moderately Armored feat introduces medium and shield armor proficiencies", () => {
        pc.traits.armorProficiencies.push("Light");
        let ft: Feat = new ModeratelyArmored("strength");
        ft.apply(pc);
        expect(
            pc.traits.armorProficiencies.includes("Medium") &&
                pc.traits.armorProficiencies.includes("Shield")
        ).toBeTruthy();
    });

    test("Mounted Combatant feat introduces combat changes", () => {
        let ft: Feat = new MountedCombatant();
        ft.apply(pc);
        expect(pc.traits.features).toContain(Feats["MOUNTED COMBATANT"]);
    });

    test("Observant feat increases intelligence or wisdom by 1", () => {
        let pc2: PlayerCharacter = new PlayerCharacter(13, 13, 13, 13, 13, 13);
        let ft1: Feat = new Observant("wisdom");
        let ft2: Feat = new Observant("intelligence");
        ft1.apply(pc);
        ft2.apply(pc2);
        expect(
            pc.abilityScores.wisdom.score === 14 &&
                pc2.abilityScores.intelligence.score === 14
        ).toBeTruthy();
    });

    test("Observant feat increases passive perception and investigation score by 5", () => {
        let pc1: PlayerCharacter = new PlayerCharacter(14, 14, 14, 14, 14, 14);
        let ft: Feat = new Observant("wisdom");
        let initialPerc = pc1.baseStats["passivePerception"].bonus.value;
        let initialInv = pc1.baseStats["passiveInvestigation"].bonus.value;
        ft.apply(pc1);
        expect(
            pc1.baseStats["passivePerception"].bonus.value ===
                initialPerc + 5 &&
                pc1.baseStats["passiveInvestigation"].bonus.value ===
                    initialPerc + 5
        ).toBeTruthy();
    });
});
