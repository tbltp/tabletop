import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as ArcaneArcherArchetype from "./ArcaneArcher.json"

export class ArcaneArcher {

  static getFeature(level: string, featureName: string) {
      return ArcaneArcherArchetype["features"][level][featureName];
  }

  static getArrow(pc: PlayerCharacter, params: LevelingParams) {
    const arrowChoice = pc.pcHelper.findFeatureTraitByName("ARCANE SHOT CHOICES");
    arrowChoice.choices.push(params.subclassSelection.options[0]);
    pc.pcHelper.addFeatures(ArcaneArcher.shots[1][params.subclassSelection.options[0]])
  }

  static arcaneArcher3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE ARCHER LORE"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE SHOT"));
    const dmgShot: ScalingTrait = {
      title: "Arcane Shot (Damage)",
      description: "Damage inflicted for Beguiling, Bursting, Enfeebling, Grasping, and Shadow Arrow.",
      dice: "2d6"
    }
    const saveShot: ScalingTrait = {
      title: "Arcane Shot (Save)",
      description: "Damage inflicted for Piercing, Seeking, (and Banishing Arrow @ lvl18)",
      dice: "1d6"
    }
    pc.pcHelper.addSpells(params.spellSelections.add,"intelligence");
    pc.skills[params.proficiencySelection[0]].proficient = true;
    pc.pcHelper.addScalingTraits(dmgShot);
    pc.pcHelper.addScalingTraits(saveShot);
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE SHOT OPTIONS"));
    PlayerClass.pushCustomizedClassFeature(pc,3,ArcaneArcher.shots,"ARCANE SHOT CHOICES",params.subclassSelection.options);
    pc.pcHelper.addFeatures(ArcaneArcher.shots[1][params.subclassSelection.options[0]]);
    pc.pcHelper.addFeatures(ArcaneArcher.shots[1][params.subclassSelection.options[1]]);
  }

  static arcaneArcher7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "MAGIC ARROW"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "CURVING SHOT"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "ADDITIONAL ARCANE SHOT OPTION"));
    ArcaneArcher.getArrow(pc,params);
  }

  static arcaneArcher10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("10", "ADDITIONAL ARCANE SHOT OPTION"));
    ArcaneArcher.getArrow(pc,params);
  }

  static arcaneArcher15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("15", "EVER-READY SHOT"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("15", "ADDITIONAL ARCANE SHOT OPTION"));
    ArcaneArcher.getArrow(pc,params);
  }

  static arcaneArcher18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("18", "ADDITIONAL ARCANE SHOT OPTION"));
    ArcaneArcher.getArrow(pc,params);
    const dmgShot: ScalingTrait = pc.pcHelper.findScalingTraitByName("Arcane Shot (Damage)");
    dmgShot.dice = "4d6";
    const saveShot: ScalingTrait = pc.pcHelper.findScalingTraitByName("Arcane Shot (Save)");
    dmgShot.dice = "2d6";
  }

  static shots = {
    1: {
      "BANISHING ARROW": {
        title: "Banishing Arrow",
        description: "You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, the target's speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied. After you reach 18th level in this class, a target also takes 2d6 force damage when the arrow hits it."
      },
      "BEGUILING ARROW": {
        title: "Beguiling Arrow",
        description: "Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw. The psychic damage increases to 4d6 when you reach 18th level in this class."
      },
      "BURSTING ARROW": {
        title: "Bursting Arrow",
        description: "You imbue your arrow with force energy drawn from the school of evocation. The energy detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each. The force damage increases to 4d6 when you reach 18th level in this class."
      },
      "ENFEEBLING ARROW": {
        title: "Enfeebling Arrow",
        description: "You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn. The necrotic damage increases to 4d6 when you reach 18th level in this class."
      },
      "GRASPING ARROW": {
        title: "Grasping Arrow",
        description: "When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again. The poison damage and slashing damage both increase to 4d6 when you reach 18th level in this class."
      },
      "PIERCING ARROW": {
        title: "Piercing Arrow",
        description: "You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage. The piercing damage increases to 2d6 when you reach 18th level in this class."
      },
      "SEEKING ARROW": {
        title: "Seeking Arrow",
        description: "Using divination magic, you grant your arrow the ability to seek out a target. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. Otherwise, the arrow disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location. The force damage increases to 2d6 when you reach 18th level in this class."
      },
      "SHADOW ARROW": {
        title: "Shadow Arrow",
        description: "You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn. The psychic damage increases to 4d6 when you reach 18th level in this class."
      }
    },
    3: {
      "ARCANE SHOT CHOICES": {
        title: "Arcane Shot Choices",
        description: "These are the shots you have"
      }
    }
  }
}