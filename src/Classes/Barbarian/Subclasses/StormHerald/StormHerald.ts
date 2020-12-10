import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as StormHeraldDict from "./StormHerald.json";

export class StormHerald {

  static getFeature(level: string, featureName: string) {
      return StormHeraldDict["features"][level][featureName];
  }

  static getAuraEffect(pc: PlayerCharacter,params: LevelingParams, level: string) {
    pc.pcHelper.addFeatures(StormHerald.auraEffect[params.subclassSelection.options[0]][level])
  }

  static improveAura(pc: PlayerCharacter,params: LevelingParams, level: string) {
    const auraScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm Aura");
    if(auraScale.bonus) {
      auraScale.bonus++;
    }
    else {
      let x = parseInt(level)/5
      auraScale.dice = `${x}d6`
    }
  }
  static stormHerald3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("3", "STORM AURA"));
    StormHerald.getAuraEffect(pc,params,"3");
    const auraScale: ScalingTrait = {
      title: "Storm Aura",
      description: ""
    }
    if(params.subclassSelection.options[0] == "DESERT") {
      auraScale.description = "How much damage your Desert Aura does.",
      auraScale.bonus = 2;
    }
    else if(params.subclassSelection.options[0] == "SEA") {
      auraScale.description = "How much damage your Sea Aura does.",
      auraScale.dice = "1d6";
    }
    else {
      auraScale.description = "How many temporary hit points your Tundra Aura provides.",
      auraScale.bonus = 2;
    }
    pc.pcHelper.addScalingTraits(auraScale);
  }
  static stormHerald5(pc: PlayerCharacter, params: LevelingParams) {
    StormHerald.improveAura(pc,params,"5");
  }
  static stormHerald6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("6", "STORM SOUL"));
    StormHerald.getAuraEffect(pc,params,"6");
  }

  static stormHerald10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("10", "SHIELDING STORM"));
    StormHerald.improveAura(pc,params,"10");
  }

  static stormHerald14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("14", "RAGING STORM"));
    StormHerald.getAuraEffect(pc,params,"14");
  }

  static stormHerald15(pc: PlayerCharacter, params: LevelingParams) {
    StormHerald.improveAura(pc,params,"15");
  }

  static stormHerald20(pc: PlayerCharacter, params: LevelingParams) {
    StormHerald.improveAura(pc,params,"20");
  }

  static auraEffect = {
    DESERT: {
      "3": {
        title: "Desert Aura",
        description: "When this effect is activated, all other creatures in your aura take 2 fire damage each. The damage increases when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level."
      },
      "6": {
        title: "Desert Soul",
        description: "You gain resistance to fire damage, and you don't suffer the effects of extreme heat, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch a flammable object that isn't being worn or carried by anyone else and set it on fire."
      },
      "14": {
        title: "Raging Desert",
        description: "Immediately after a creature in your aura hits you with an attack, you can use your reaction to force that creature to make a Dexterity saving throw. On a failed save, the creature takes fire damage equal to half your barbarian level."
      }
    },
    SEA: {
      "3": {
        title: "Sea Aura",
        description: "When this effect is activated, you can choose one other creature you can see in your aura. The target must make a Dexterity saving throw. The target takes 1d6 lightning damage on a failed save, or half as much damage on a successful one. The damage increases when you reach certain levels in this class, increasing to 2d6 at 10th level, 3d6 at 15th level, and 4d6 at 20th level."
      },
      "6": {
        title: "Sea Soul",
        description: "You gain resistance to lightning damage, and you can breathe underwater. You also gain a swimming speed of 30 feet."
      },
      "14": {
        title: "Raging Sea",
        description: "When you hit a creature in your aura with an attack, you can use your reaction to force that creature to make a Strength saving throw. On a failed save, the creature is knocked prone, as if struck by a wave."
      }
    },
    TUNDRA: {
      "3": {
        title: "Tundra Aura",
        description: "When this effect is activated, each creature of your choice in your aura gains 2 temporary hit points, as icy spirits inure it to suffering. The temporary hit points increase when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level."
      },
      "6": {
        title: "Tundra Soul",
        description: "You gain resistance to cold damage, and you don't suffer the effects of extreme cold, as described in the Dungeon Master's Guide. Moreover, as an action, you can touch water and turn a 5-foot cube of it into ice, which melts after 1 minute. This action fails if a creature is in the cube."
      },
      "14": {
        title: "Raging Tundra",
        description: "Whenever the effect of your Storm Aura is activated, you can choose one creature you can see in the aura. That creature must succeed on a Strength saving throw, or its speed is reduced to 0 until the start of your next turn, as magical frost covers it."
      }
    }
  }
}