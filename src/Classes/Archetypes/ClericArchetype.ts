import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { ResourceTrait, ScalingTrait } from "../../Base/Interfaces";
import * as Languages from "../../../Assets/Languages.json";
import { Archetype } from "../Archetypes";

export class ClericArchetype extends Archetype {
    static archetypeHelper = {
      KNOWLEDGE: {
        "1": ClericArchetype.knowledge1,
        "2": ClericArchetype.knowledge2,
        "3": ClericArchetype.knowledge3,
        "5": ClericArchetype.knowledge5,
        "6": ClericArchetype.knowledge6,
        "7": ClericArchetype.knowledge7,
        "8": ClericArchetype.knowledge8,
        "9": ClericArchetype.knowledge9,
        "17": ClericArchetype.knowledge17,
      },
      LIFE: {
        "1": ClericArchetype.life1,
        "2": ClericArchetype.life2,
        "3": ClericArchetype.life3,
        "5": ClericArchetype.life5,
        "6": ClericArchetype.life6,
        "7": ClericArchetype.life7,
        "8": ClericArchetype.life8,
        "9": ClericArchetype.life9,
        "17": ClericArchetype.life17,
      },
      LIGHT: {
        "1": ClericArchetype.light1,
        "2": ClericArchetype.light2,
        "3": ClericArchetype.light3,
        "5": ClericArchetype.light5,
        "6": ClericArchetype.light6,
        "7": ClericArchetype.light7,
        "8": ClericArchetype.light8,
        "9": ClericArchetype.light9,
        "17": ClericArchetype.light17,
      },
      NATURE: {
        "1": ClericArchetype.nature1,
        "2": ClericArchetype.nature2,
        "3": ClericArchetype.nature3,
        "5": ClericArchetype.nature5,
        "6": ClericArchetype.nature6,
        "7": ClericArchetype.nature7,
        "8": ClericArchetype.nature8,
        "9": ClericArchetype.nature9,
        "17": ClericArchetype.nature17,
      },
      TEMPEST: {
        "1": ClericArchetype.tempest1,
        "2": ClericArchetype.tempest2,
        "3": ClericArchetype.tempest3,
        "5": ClericArchetype.tempest5,
        "6": ClericArchetype.tempest6,
        "7": ClericArchetype.tempest7,
        "8": ClericArchetype.tempest8,
        "9": ClericArchetype.tempest9,
        "17": ClericArchetype.tempest17,
      },
      TRICKERY: {
        "1": ClericArchetype.trickery1,
        "2": ClericArchetype.trickery2,
        "3": ClericArchetype.trickery3,
        "5": ClericArchetype.trickery5,
        "6": ClericArchetype.trickery6,
        "7": ClericArchetype.trickery7,
        "8": ClericArchetype.trickery8,
        "9": ClericArchetype.trickery9,
        "17": ClericArchetype.trickery17,
      },
      WAR: {
        "1": ClericArchetype.war1,
        "2": ClericArchetype.war2,
        "3": ClericArchetype.war3,
        "5": ClericArchetype.war5,
        "6": ClericArchetype.war6,
        "7": ClericArchetype.war7,
        "8": ClericArchetype.war8,
        "9": ClericArchetype.war9,
        "17": ClericArchetype.war17,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("CLERIC", archetypeName, level, featureName);
    }
  
    static knowledge1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["COMMAND", "IDENTIFY"], "wisdom");
  
      // Languages
      pc.traits.languages.push(
        Languages[params.archetypeSelection[0].options[0]],
        Languages[params.archetypeSelection[0].options[1]]
      ); // Languages, How do we pass this?
      for (const skill of params.proficiencySelection) {
        // Skill Proficiencies / Expertise
        pc.skills[skill].proficient = true;
        pc.skills[skill].expertise = true;
      }
      pc.addFeatures({
        ...ClericArchetype.getFeature("KNOWLEDGE", "1", "BLESSINGS OF KNOWLEDGE"),
        choices: [
          ...params.archetypeSelection[0].options,
          ...params.proficiencySelection,
        ],
      });
    }
  
    static knowledge2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "KNOWLEDGE",
          "2",
          "CHANNEL DIVINITY: THE KNOWLEDGE OF THE AGES"
        )
      );
    }
  
    static knowledge3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["AUGURY", "SUGGESTION"], "wisdom");
    }
  
    static knowledge5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["NONDETECTION", "SPEAK WITH DEAD"], "wisdom");
    }
  
    static knowledge6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "KNOWLEDGE",
          "6",
          "CHANNEL DIVINITY: READ THOUGHTS"
        )
      );
    }
  
    static knowledge7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["ARCANE EYE", "CONFUSION"], "wisdom");
    }
  
    static knowledge8(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("KNOWLEDGE", "8", "POTENT SPELLCASTING")
      );
    }
  
    static knowledge9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["LEGEND LORE", "SCRYING"], "wisdom");
    }
  
    static knowledge17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("KNOWLEDGE", "17", "VISION OF THE PAST")
      );
    }
  
    static life1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BLESS", "CURE WOUNDS"], "wisdom");
      pc.traits.armorProficiencies.push("Heavy");
      pc.addFeatures(
        ClericArchetype.getFeature("LIFE", "1", "DISCIPLE OF LIFE"),
        ClericArchetype.getFeature("LIFE", "1", "BONUS PROFICIENCY")
      );
    }
  
    static life2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("LIFE", "2", "CHANNEL DIVINITY: PRESERVE LIFE")
      );
    }
  
    static life3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["LESSER RESTORATION", "SPIRITUAL WEAPON"], "wisdom");
    }
  
    static life5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BEACON OF HOPE", "REVIVIFY"], "wisdom");
    }
  
    static life6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(ClericArchetype.getFeature("LIFE", "6", "BLESSED HEALER"));
    }
  
    static life7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DEATH WARD", "GUARDIAN OF FAITH"], "wisdom");
    }
  
    static life8(pc: PlayerCharacter, params: LevelingParams) {
      const divineStrike: ScalingTrait = {
        title: "Divine Strike",
        description: "Dice used for Divine Strike (radiant damage).",
        dice: "1d8",
      };
      pc.addScalingTraits(divineStrike);
      pc.addFeatures(ClericArchetype.getFeature("LIFE", "8", "DIVINE STRIKE"));
    }
  
    static life9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["MASS CURE WOUNDS", "RAISE DEAD"], "wisdom");
    }
  
    static life17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(ClericArchetype.getFeature("LIFE", "17", "SUPREME HEALING"));
    }
  
    static light1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BURNING HANDS", "FAERIE FIRE", "LIGHT"], "wisdom");
      // warding flare needs to have a minimum of one use available
      const wardingFlare: ResourceTrait = {
        title: "Warding Flare",
        description: "Number of times you can use Warding Flare per long rest.",
        resourceMax: pc.abilityScores.wisdom.modifier,
      };
      pc.addResourceTraits(wardingFlare);
      pc.addFeatures(
        ClericArchetype.getFeature("LIGHT", "1", "WARDING FLARE"),
        ClericArchetype.getFeature("LIGHT", "1", "BONUS CANTRIP")
      );
    }
  
    static light2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "LIGHT",
          "2",
          "CHANNEL DIVINITY: RADIANCE OF THE DAWN"
        )
      );
    }
  
    static light3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["FLAMING SPHERE", "SCORCHING RAY"], "wisdom");
    }
  
    static light5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DAYLIGHT", "FIREBALL"], "wisdom");
    }
  
    static light6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(ClericArchetype.getFeature("LIGHT", "6", "IMPROVED FLARE"));
    }
  
    static light7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["GUARDIAN OF FAITH", "WALL OF FIRE"], "wisdom");
    }
  
    static light8(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("LIGHT", "8", "POTENT SPELLCASTING")
      );
    }
  
    static light9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["FLAME STRIKE", "SCRYING"], "wisdom");
    }
  
    static light17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("LIGHT", "17", "CORONA OF LIGHT")
      );
    }
  
    static nature1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(
        [...params.spellSelection, "ANIMAL FRIENDSHIP", "SPEAK WITH ANIMALS"],
        "wisdom"
      );
      pc.traits.armorProficiencies.push("Heavy");
      pc.addFeatures(
        {
          ...ClericArchetype.getFeature("NATURE", "1", "ACOLYTE OF NATURE"),
          choices: params.spellSelection,
        },
        ClericArchetype.getFeature("NATURE", "1", "BONUS PROFICIENCY")
      );
    }
  
    static nature2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "NATURE",
          "2",
          "CHANNEL DIVINITY: CHARM ANIMALS AND PLANTS"
        )
      );
    }
  
    static nature3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BARKSKIN", "SPIKE GROWTH"], "wisdom");
    }
  
    static nature5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["PLANT GROWTH", "WIND WALL"], "wisdom");
    }
  
    static nature6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("NATURE", "6", "DAMPEN ELEMENTS")
      );
    }
  
    static nature7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DOMINATE BEAST", "GRASPING VINE"], "wisdom");
    }
  
    static nature8(pc: PlayerCharacter, params: LevelingParams) {
      const divineStrike: ScalingTrait = {
        title: "Divine Strike",
        description:
          "Dice used for Divine Strike (cold, fire, or lightning damage).",
        dice: "1d8",
      };
      pc.addScalingTraits(divineStrike);
      pc.addFeatures(ClericArchetype.getFeature("NATURE", "8", "DIVINE STRIKE"));
    }
  
    static nature9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["INSECT PLAGUE", "TREE STRIDE"], "wisdom");
    }
  
    static nature17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("NATURE", "17", "MASTER OF NATURE")
      );
    }
  
    static tempest1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["FOG CLOUD", "THUNDERWAVE"], "wisdom");
      // wrath of the storm needs to have a minimum of one use available
      const wrathOfTheStorm: ResourceTrait = {
        title: "Wrath of the Storm",
        description:
          "Number of times you can use Wrath of the Storm per long rest.",
        resourceMax: pc.abilityScores.wisdom.modifier,
      };
      pc.addResourceTraits(wrathOfTheStorm);
      pc.traits.armorProficiencies.push("Heavy");
      pc.addFeatures(
        ClericArchetype.getFeature("TEMPEST", "1", "WRATH OF THE STORM"),
        ClericArchetype.getFeature("TEMPEST", "1", "BONUS PROFICIENCY")
      );
    }
  
    static tempest2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "TEMPEST",
          "2",
          "CHANNEL DIVINITY: DESTRUCTIVE WRATH"
        )
      );
    }
  
    static tempest3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["GUST OF WIND", "SHATTER"], "wisdom");
    }
  
    static tempest5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["CALL LIGHTNING", "SLEET STORM"], "wisdom");
    }
  
    static tempest6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("TEMPEST", "6", "THUNDERBOLT STRIKE")
      );
    }
  
    static tempest7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["CONTROL WATER", "ICE STORM"], "wisdom");
    }
  
    static tempest8(pc: PlayerCharacter, params: LevelingParams) {
      const divineStrike: ScalingTrait = {
        title: "Divine Strike",
        description: "Dice used for Divine Strike (thunder damage).",
        dice: "1d8",
      };
      pc.addScalingTraits(divineStrike);
      pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "8", "DIVINE STRIKE"));
    }
  
    static tempest9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DESTRUCTIVE WAVE", "INSECT PLAGUE"], "wisdom");
    }
  
    static tempest17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "17", "STORMBORN"));
    }
  
    static trickery1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["CHARM PERSON", "DISGUISE SELF"], "wisdom");
      pc.addFeatures(
        ClericArchetype.getFeature("TRICKERY", "1", "BLESSING OF THE TRICKSTER")
      );
    }
  
    static trickery2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "TRICKERY",
          "2",
          "CHANNEL DIVINITY: INVOKE DUPLICITY"
        )
      );
    }
  
    static trickery3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["MIRROR IMAGE", "PASS WITHOUT TRACE"], "wisdom");
    }
  
    static trickery5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BLINK", "DISPEL MAGIC"], "wisdom");
    }
  
    static trickery6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "TRICKERY",
          "6",
          "CHANNEL DIVINITY: CLOAK OF SHADOWS"
        )
      );
    }
  
    static trickery7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DIMENSION DOOR", "POLYMOPRH"], "wisdom");
    }
  
    static trickery8(pc: PlayerCharacter, params: LevelingParams) {
      const divineStrike: ScalingTrait = {
        title: "Divine Strike",
        description: "Dice used for Divine Strike (poison damage).",
        dice: "1d8",
      };
      pc.addScalingTraits(divineStrike);
      pc.addFeatures(
        ClericArchetype.getFeature("TRICKERY", "8", "DIVINE STRIKE")
      );
    }
  
    static trickery9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DOMINATE PERSON", "MODIFY MEMORY"], "wisdom");
    }
  
    static trickery17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("TRICKERY", "17", "IMPROVED DUPLICITY")
      );
    }
  
    static war1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["DIVINE FAVOR", "SHIELD OF FAITH"], "wisdom");
      // war priest needs to have a minimum of one use available
      const warPriest: ResourceTrait = {
        title: "War Priest",
        description: "Number of times you can use War Priest per long rest.",
        resourceMax: pc.abilityScores.wisdom.modifier,
      };
      pc.addResourceTraits(warPriest);
      pc.traits.weaponProficiencies.push("Martial");
      pc.traits.armorProficiencies.push("Heavy");
      pc.addFeatures(
        ClericArchetype.getFeature("WAR", "1", "WAR PRIEST"),
        ClericArchetype.getFeature("WAR", "1", "BONUS PROFICIENCIES")
      );
    }
  
    static war2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature("WAR", "2", "CHANNEL DIVINITY: GUIDED STRIKE")
      );
    }
  
    static war3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["MAGIC WEAPON", "SPIRITUAL WEAPON"], "wisdom");
    }
  
    static war5(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["CRUSADER'S MANTLE", "SPIRIT GUARDIAN"], "wisdom");
    }
  
    static war6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        ClericArchetype.getFeature(
          "WAR",
          "6",
          "CHANNEL DIVINITY: WAR GOD'S BLESSING"
        )
      );
    }
  
    static war7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["FREEDOM OF MOVEMENT", "STONESKIN"], "wisdom");
    }
  
    static war8(pc: PlayerCharacter, params: LevelingParams) {
      const divineStrike: ScalingTrait = {
        title: "Divine Strike",
        description: "Dice used for Divine Strike (extra weapon damage).",
        dice: "1d8",
      };
      pc.addScalingTraits(divineStrike);
      pc.addFeatures(ClericArchetype.getFeature("WAR", "8", "DIVINE STRIKE"));
    }
  
    static war9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["FLAME STRIKE", "HOLD MONSTER"], "wisdom");
    }
  
    static war17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(ClericArchetype.getFeature("WAR", "17", "AVATAR OF BATTLE"));
    }
  }
  