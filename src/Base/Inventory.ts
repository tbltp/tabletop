import { PlayerCharacter, PCArmorClass, PCAttack } from "./PlayerCharacter";
import * as Gear from "../../Assets/Gear.json";
import * as Tools from "../../Assets/Tools.json";
import { Armor, Weapon, EquipmentPack } from "./Interfaces";

export class Inventory {
  static equipmentPacks: { [key: string]: () => EquipmentPack } = {
    BURGLAR: Inventory.burglar,
    DIPLOMAT: Inventory.diplomat,
    DUNGEONEER: Inventory.dungeoneer,
    ENTERTAINER: Inventory.entertainer,
    EXPLORER: Inventory.explorer,
    PRIEST: Inventory.priest,
    SCHOLAR: Inventory.scholar,
    NONE: Inventory.none,
  };

  static burglar(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const ballBearings = Gear["BALL BEARINGS (BAG OF 1000)"];
    const bell = Gear["BELL"];
    const crowbar = Gear["CROWBAR"];
    const hammer = Gear["HAMMER"];
    const lantern = Gear["LANTERN, HOODED"];
    const tinderbox = Gear["TINDERBOX"];
    const waterskin = Gear["WATERSKIN"];
    const rope = Gear["ROPE, HEMPEN (50 FEET)"];

    let candles = Gear["CANDLE"];
    candles.quantity = 5;

    let oil = Gear["OIL (FLASK)"];
    oil.quantity = 2;

    let pitons = Gear["PITON"];
    pitons.quantity = 10;

    let rations = Gear["RATIONS (1 DAY)"];
    rations.quantity = 5;

    return {
      gear: [
        backpack,
        ballBearings,
        bell,
        crowbar,
        hammer,
        lantern,
        tinderbox,
        waterskin,
        rope,
        candles,
        oil,
        pitons,
        rations,
      ],
    };
  }
  static diplomat(): EquipmentPack {
    const chest = Gear["CHEST"];
    const fineClothes = Gear["CLOTHES, FINE"];
    const ink = Gear["INK (1 OUNCE BOTTLE)"];
    const inkPen = Gear["INK PEN"];
    const lamp = Gear["LAMP"];
    const perfume = Gear["PERFUME (VIAL)"];
    const sealingWax = Gear["SEALING WAX"];
    const soap = Gear["SOAP"];

    let scrollCase = Gear["CASE, MAP OR SCROLL"];
    scrollCase.quantity = 2;

    let oil = Gear["OIL (FLASK)"];
    oil.quantity = 2;

    let paper = Gear["PAPER (ONE SHEET)"];
    paper.quantity = 5;

    return {
      gear: [
        chest,
        fineClothes,
        ink,
        inkPen,
        lamp,
        perfume,
        sealingWax,
        soap,
        scrollCase,
        oil,
        paper,
      ],
    };
  }
  static dungeoneer(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const crowbar = Gear["CROWBAR"];
    const hammer = Gear["HAMMER"];
    const tinderbox = Gear["TINDERBOX"];
    const waterskin = Gear["WATERSKIN"];
    const rope = Gear["ROPE, HEMPEN (50 FEET)"];

    let torches = Gear["TORCH"];
    torches.quantity = 10;

    let rations = Gear["RATIONS (1 DAY)"];
    rations.quantity = 10;

    return {
      gear: [
        backpack,
        crowbar,
        hammer,
        tinderbox,
        waterskin,
        rope,
        torches,
        rations,
      ],
    };
  }
  static entertainer(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const bedroll = Gear["BEDROLL"];
    const waterskin = Gear["WATERSKIN"];

    let candles = Gear["CANDLE"];
    candles.quantity = 5;

    let costumes = Gear["CLOTHES, COSTUME"];
    costumes.quantity = 2;

    let rations = Gear["RATIONS (1 DAY)"];
    rations.quantity = 5;

    const disguiseKit = Tools["DISGUISE KIT"];

    return {
      gear: [backpack, bedroll, waterskin, candles, costumes, rations],
      kit: disguiseKit,
    };
  }

  static explorer(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const bedroll = Gear["BEDROLL"];
    const messKit = Gear["MESS KIT"];
    const tinderbox = Gear["TINDERBOX"];
    const waterskin = Gear["WATERSKIN"];
    const rope = Gear["ROPE, HEMPEN (50 FEET)"];

    let torches = Gear["TORCH"];
    torches.quantity = 10;

    let rations = Gear["RATIONS (1 DAY)"];
    rations.quantity = 10;

    return {
      gear: [
        backpack,
        bedroll,
        messKit,
        tinderbox,
        waterskin,
        rope,
        torches,
        rations,
      ],
    };
  }

  static priest(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const blanket = Gear["BLANKET"];
    const tinderbox = Gear["TINDERBOX"];
    const almsBox = Gear["ALMS BOX"]; // THIS IS NOT A REAL ITEM
    const incense = Gear["INCENSE"]; // THIS IS NOT A REAL ITEM
    const vestments = Gear["CLOTHES, COMMON, VESTMENTS"]; // THIS IS NOT A REAL ITEM
    const waterskin = Gear["WATERSKIN"];

    let rations = Gear["RATIONS (1 DAY)"];
    rations.quantity = 2;

    return {
      gear: [
        backpack,
        blanket,
        tinderbox,
        almsBox,
        incense,
        vestments,
        waterskin,
        rations,
      ],
    };
  }

  static scholar(): EquipmentPack {
    const backpack = Gear["BACKPACK"];
    const book = Gear["BOOK"];
    const ink = Gear["INK (1 OUNCE BOTTLE)"];
    const inkPen = Gear["INK PEN"];

    let parchement = Gear["PARCHMENT (ONE SHEET)"];
    parchement.quantity = 10;

    return {
      gear: [backpack, book, ink, inkPen, parchement],
    };
  }

  static none(): EquipmentPack {
    return { gear: [] };
  }

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
      modifier: [armor.AC.modifier],
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

