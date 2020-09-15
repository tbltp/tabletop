import { PlayerCharacter, PCArmorClass, PCAttack } from "./PlayerCharacter";
import * as Gear from '../../Assets/Gear.json';
import { Item, Armor, Weapon } from "./Interfaces";

export class Inventory {
    static equipmentPacks: {[key: string]: () => Item[] } = {
        "BURGLAR": Inventory.burglar,
        "DIPLOMAT": Inventory.diplomat,
        "DUNGEONEER": Inventory.dungeoneer,
        "ENTERTAINER": Inventory.entertainer,
        "EXPLORER": Inventory.explorer,
        "PRIEST": Inventory.priest,
        "SCHOLAR": Inventory.scholar
    }

    static burglar(): Item[] {
        const backpack = Gear["BACKPACK"];
        const ballBearings = Gear["BALL BEARINGS (BAG OF 1000)"]
        const bell = Gear["BELL"]
        const crowbar = Gear["CROWBAR"]
        const hammer = Gear["HAMMER"]
        const lantern = Gear["LANTERN, HOODED"]
        const tinderbox = Gear["TINDERBOX"]
        const waterskin = Gear["WATERSKIN"]
        const rope = Gear["ROPE, HEMPEN (50 FEET)"]

        let candles = Gear["CANDLE"]
        candles.quantity = 5;

        let oil = Gear["OIL (FLASK)"]
        oil.quantity = 2;

        let pitons = Gear["PITON"]
        pitons.quantity = 10;

        let rations = Gear["RATIONS (1 DAY)"]
        rations.quantity = 5;

        return [backpack, ballBearings, bell, crowbar, hammer, lantern, tinderbox, waterskin, rope, candles, oil, pitons, rations]
    }
    static diplomat(): Item[] {
        const chest = Gear["CHEST"]
        const fineClothes = Gear["CLOTHES, FINE"]
        const ink = Gear["INK (1 OUNCE BOTTLE)"]
        const inkPen = Gear["INK PEN"]
        const lamp = Gear["LAMP"]
        const perfume = Gear["PERFUME (VIAL)"]
        const sealingWax = Gear["SEALING WAX"]
        const soap = Gear["SOAP"]

        let scrollCase = Gear["CASE, MAP OR SCROLL"]
        scrollCase.quantity = 2

        let oil = Gear["OIL (FLASK)"]
        oil.quantity = 2

        let paper = Gear["PAPER (ONE SHEET)"]
        paper.quantity = 5

        return [chest, fineClothes, ink, inkPen, lamp, perfume, sealingWax, soap, scrollCase, oil, paper]
    }
    static dungeoneer(): Item[] {
        const backpack = Gear["BACKPACK"];
        const crowbar = Gear["CROWBAR"]
        const hammer = Gear["HAMMER"]
        const tinderbox = Gear["TINDERBOX"]
        const waterskin = Gear["WATERSKIN"]
        const rope = Gear["ROPE, HEMPEN (50 FEET)"]

        let torches = Gear["TORCH"]
        torches.quantity = 10;

        let rations = Gear["RATIONS (1 DAY)"]
        rations.quantity = 10;

        return [backpack, crowbar, hammer, tinderbox, waterskin, rope, torches, rations]
    }
    static entertainer(): Item[] {
        const backpack = Gear["BACKPACK"]
        const bedroll = Gear["BEDROLL"]
        const waterskin = Gear["WATERSKIN"]

        let candles = Gear["CANDLE"]
        candles.quantity = 5;

        let costumes = Gear["CLOTHES, COSTUME"]
        costumes.quantity = 2;

        let rations = Gear["RATIONS (1 DAY)"]
        rations.quantity = 5;

        // INCLUDES DISGUISE KIT WHAT DO?

        return [backpack, bedroll, waterskin, candles, costumes, rations]
    }

    static explorer(): Item[] {
        const backpack = Gear["BACKPACK"]
        const bedroll = Gear["BEDROLL"]
        const messKit = Gear["MESS KIT"]
        const tinderbox = Gear["TINDERBOX"]
        const waterskin = Gear["WATERSKIN"]
        const rope = Gear["ROPE, HEMPEN (50 FEET)"]

        let torches = Gear["TORCH"]
        torches.quantity = 10;

        let rations = Gear["RATIONS (1 DAY)"]
        rations.quantity = 10;

        return [backpack, bedroll, messKit, tinderbox, waterskin, rope, torches, rations]
    }

    static priest(): Item[] {
        const backpack = Gear["BACKPACK"]
        const blanket = Gear["BLANKET"]
        const tinderbox = Gear["TINDERBOX"]
        const almsBox = {} // THIS IS NOT A REAL ITEM
        const incense = {} // THIS IS NOT A REAL ITEM
        const vestements = {} // THIS IS NOT A REAL ITEM
        const waterskin = Gear["WATERSKIN"]

        let rations = Gear["RATIONS (1 DAY)"]
        rations.quantity = 2

        return [backpack, blanket, tinderbox, waterskin, rations]
    }
    static scholar(): Item[] {
        const backpack = Gear["BACKPACK"]
        const book = Gear["BOOK"]
        const ink = Gear["INK (1 OUNCE BOTTLE)"]
        const inkPen = Gear["INK PEN"]

        let parchement = Gear["PARCHMENT (ONE SHEET)"]
        parchement.quantity = 10

        return [backpack, book, ink, inkPen, parchement]
    }

    static acFromArmorType: {[key: string]: (pc: PlayerCharacter, armor: Armor) => PCArmorClass} = {
        "Light": Inventory.lightArmor,
        "Medium": Inventory.mediumArmor,
        "Heavy": Inventory.heavyArmor,
        "Shield": Inventory.lightArmor
    }

    static lightArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass  {
        armor.AC.modifier = pc.abilityScores.dexterity.modifier;
        return {name: armor.name, ...armor.AC};
    }

    static mediumArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass {
        armor.AC.modifier = pc.abilityScores.dexterity.modifier.value > 2 ? {value: 2} : pc.abilityScores.dexterity.modifier;
        return {name: armor.name, ...armor.AC};
    }

    static heavyArmor(pc: PlayerCharacter, armor: Armor): PCArmorClass {
        return {name: armor.name, ...armor.AC};
    }

    // Add Shield

    static buildAttack(pc: PlayerCharacter, weapon: Weapon): PCAttack {

        const proficiencies = pc.traits.weaponProficiencies;
        const weaponType = weapon.weaponType.split(" ");

        let proficient: boolean = false;
        let ability: string;

        if(proficiencies.indexOf(weaponType[0]) || proficiencies.indexOf(weaponType[1]) || proficiencies.indexOf(weapon.name)) {
            proficient = true;
        }

        if(weapon.properties.indexOf("Finesse")!= -1) { ability = (pc.abilityScores.strength.score > pc.abilityScores.dexterity.score) ? "strength" : "dexterity"}
        else if(weaponType[1] == "Melee") { ability = "strength" }
        else if(weaponType[1] == "Ranged") { ability = "dexterity" } 

        return { 
            name: weapon.name, 
            attackBonus: {
                ability: pc.abilityScores[ability].modifier, 
                proficient: proficient, 
                itemBonus: { value: 0 }
            }, 
            dice: weapon.damage, 
            damageType: weapon.damageType, 
            damageBonus: pc.abilityScores[ability].modifier 
        };        
    }
}