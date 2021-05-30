import { PlayerCharacter, PCArmorClass, PCAttack } from "../PlayerCharacter";
import { Armor, Weapon, EquipmentPack } from "../Interfaces";
import {EquipmentPackHelper} from "./EquipmentPackHelper";

export class Inventory {
  static equipmentPacks: { [key: string]: () => EquipmentPack } = {
    BURGLAR: EquipmentPackHelper.burglar,
    DIPLOMAT: EquipmentPackHelper.diplomat,
    DUNGEONEER: EquipmentPackHelper.dungeoneer,
    ENTERTAINER: EquipmentPackHelper.entertainer,
    EXPLORER: EquipmentPackHelper.explorer,
    PRIEST: EquipmentPackHelper.priest,
    SCHOLAR: EquipmentPackHelper.scholar,
    NONE: EquipmentPackHelper.none,
  };

  static acFromArmorType: {
    [key: string]: (pc: PlayerCharacter, armor: Armor) => PCArmorClass;
  } = {
    Light: Inventory.lightArmor,
    Medium: Inventory.mediumArmor,
    Heavy: Inventory.heavyArmor,
    Shield: Inventory.lightArmor,
  };

  static lightArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass {
    armor.AC.modifier = pc.abilityScores.dexterity.modifier;
    return {
      name: armor.name,
      base: armor.AC.base,
      modifier: [armor.AC.modifier],
      bonus: armor.AC.bonus,
    };
  }

  static mediumArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass {
    armor.AC.modifier =
      pc.abilityScores.dexterity.modifier.value > 2
        ? { value: 2 }
        : pc.abilityScores.dexterity.modifier;

    return {
      name: armor.name,
      base: armor.AC.base,
      modifier: [armor.AC.modifier],
      bonus: armor.AC.bonus,
    };
  }

  static heavyArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass {
    return {
      name: armor.name,
      base: armor.AC.base,
      modifier: [{value: 0}],
      bonus: armor.AC.bonus,
    };
  }

  // Add Shield

  static buildAttack(pc: PlayerCharacter, weapon: Weapon): PCAttack {
    const proficiencies = pc.traits.weaponProficiencies;
    const weaponType = weapon.weaponType.split(" ");

    let proficient: boolean = false;
    let ability: string;

    if (
      proficiencies.has(weaponType[0]) ||
      proficiencies.has(weaponType[1]) ||
      proficiencies.has(weapon.name)
    ) {
      proficient = true;
    }

    if (weapon.properties.indexOf("Finesse") != -1) {
      ability =
        pc.abilityScores.strength.score > pc.abilityScores.dexterity.score
          ? "strength"
          : "dexterity";
    } else if (weaponType[1] == "Melee") {
      ability = "strength";
    } else if (weaponType[1] == "Ranged") {
      ability = "dexterity";
    }

    let weaponAttack = {
      name: weapon.name,
      attackBonus: {
        ability: pc.abilityScores[ability].modifier,
        proficient: proficient,
        itemBonus: { value: 0 },
      },
      dice: weapon.damage,
      damageType: weapon.damageType,
      damageBonus: pc.abilityScores[ability].modifier,
    };

    return weaponAttack;
  }
}

