import { ResourceTrait } from "../Base/Interfaces";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { CharacterSheet } from "../Base/CharacterSheet";
import { PlayerClass } from "./PlayerClass";

export class SpellSlotFactory {
  private static levelStringDict: { [key: string]: string } = {
    "1": "first",
    "2": "second",
    "3": "third",
    "4": "fourth",
    "5": "fifth",
    "6": "sixth",
    "7": "seventh",
    "8": "eighth",
    "9": "ninth",
  };

  private static spellSlotsByLevel = {
    PRIMARY: {
      "1": [2, 0, 0, 0, 0, 0, 0, 0, 0],
      "2": [3, 0, 0, 0, 0, 0, 0, 0, 0],
      "3": [4, 2, 0, 0, 0, 0, 0, 0, 0],
      "4": [4, 3, 0, 0, 0, 0, 0, 0, 0],
      "5": [4, 3, 2, 0, 0, 0, 0, 0, 0],
      "6": [4, 3, 3, 0, 0, 0, 0, 0, 0],
      "7": [4, 3, 3, 1, 0, 0, 0, 0, 0],
      "8": [4, 3, 3, 2, 0, 0, 0, 0, 0],
      "9": [4, 3, 3, 3, 1, 0, 0, 0, 0],
      "10": [4, 3, 3, 3, 2, 0, 0, 0, 0],
      "11": [4, 3, 3, 3, 2, 1, 0, 0, 0],
      "13": [4, 3, 3, 3, 2, 1, 1, 0, 0],
      "15": [4, 3, 3, 3, 2, 1, 1, 1, 0],
      "17": [4, 3, 3, 3, 2, 1, 1, 1, 1],
      "18": [4, 3, 3, 3, 3, 1, 1, 1, 1],
      "19": [4, 3, 3, 3, 3, 2, 1, 1, 1],
      "20": [4, 3, 3, 3, 3, 2, 2, 1, 1],
    },
    SECONDARY: {
      "2": [2, 0, 0, 0, 0],
      "3": [3, 0, 0, 0, 0],
      "5": [4, 2, 0, 0, 0],
      "7": [4, 3, 0, 0, 0],
      "9": [4, 3, 2, 0, 0],
      "11": [4, 3, 3, 0, 0],
      "13": [4, 3, 3, 1, 0],
      "15": [4, 3, 3, 2, 0],
      "19": [4, 3, 3, 3, 2],
    },
    TERTIARY: {
      "3": [2, 0, 0, 0],
      "4": [3, 0, 0, 0],
      "7": [4, 2, 0, 0],
      "10": [4, 3, 0, 0],
      "13": [4, 3, 2, 0],
      "16": [4, 3, 3, 0],
      "19": [4, 3, 3, 1],
    },
  };

  public static spellcastingClassRanks: { [key: string]: string } = {
    "Artificer": "SECONDARY",
    "Barbarian": "NONE",
    "Bard": "PRIMARY",
    "Cleric": "PRIMARY",
    "Druid": "PRIMARY",
    "Fighter": "NONE",
    "Monk": "NONE",
    "Paladin": "SECONDARY",
    "Ranger": "SECONDARY",
    "Sorcerer": "PRIMARY",
    "Warlock": "NONE",
    "Wizard": "PRIMARY"
  }

  public static spellcastingSubclasses: { [key: string]: string } = {
    "Eldritch Knight": "TERTIARY",
    "Arcane Trickster": "TERTIARY"
  }

  private static getLevelString(level: number): string {
    return SpellSlotFactory.levelStringDict[String(level)];
  }

  private static generateSpellSlots(level: number, max: number): ResourceTrait {
    const slotLevelString: string = SpellSlotFactory.getLevelString(level);
    return {
      title:
        slotLevelString.charAt(0).toUpperCase() +
        slotLevelString.slice(1) +
        " Level Spell Slots",
      description:
        "Number of " + slotLevelString + " level spells you can cast",
      resourceMax: { value: max },
    };
  }

  private static findPlayerSpellSlots(
    pc: PlayerCharacter,
    level: number
  ): ResourceTrait {
    const slotLevelString: string = SpellSlotFactory.getLevelString(level);
    const resourceTitle: string =
      slotLevelString.charAt(0).toUpperCase() +
      slotLevelString.slice(1) +
      " Level Spell Slots";
    return pc.pcHelper.findResourceTraitByName(resourceTitle);
  }

  public static applyClassSpellSlotsAtLevel(
    pc: PlayerCharacter,
    rank: string,
    level: number
  ): void {

    if(rank == "NONE"){ return; }

    if (
      !Object.keys(SpellSlotFactory.spellSlotsByLevel[rank]).includes(
        String(level)
      )
    ) {
      return;
    }
    const slotArray = SpellSlotFactory.spellSlotsByLevel[rank][String(level)];
    for (let i = 0; i < slotArray.length; i++) {
      const slotLevel = i + 1;
      const slotMax = slotArray[i];

      if (slotMax == 0) break;
      else {
        const existingSlot: ResourceTrait | null = this.findPlayerSpellSlots(
          pc,
          slotLevel
        );
        if (!existingSlot) {
          const slot: ResourceTrait = SpellSlotFactory.generateSpellSlots(
            i + 1,
            slotMax
          );
          pc.pcHelper.addResourceTraits(slot);
        } else {
          existingSlot.resourceMax.value = slotMax;
        }
      }
    }
  }

  public static countAllPlayerSpellSlots(pc: PlayerCharacter): number[] {
    const result: number[] = [];
    for (let level of Object.keys(SpellSlotFactory.levelStringDict).map((l) =>
      Number(l)
    )) {
      const slots = SpellSlotFactory.findPlayerSpellSlots(pc, level);
      if (slots) {
        result[level - 1] = slots.resourceMax.value;
      } else {
        result[level - 1] = 0;
      }
    }
    return result;
  }
}
