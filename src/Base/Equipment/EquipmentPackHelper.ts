import { EquipmentPack } from "../Interfaces";
import * as Gear from "../../../Assets/Gear.json";
import * as Tools from "../../../Assets/Tools.json";

export class EquipmentPackHelper {
    
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
    const almsBox = Gear["ALMS BOX"]; 
    const incense = Gear["INCENSE"];
    const vestments = Gear["CLOTHES, VESTMENTS"]; 
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
    
}