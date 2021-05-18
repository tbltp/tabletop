import { CharacterSheet } from "./Base/CharacterSheet";
import { PlayerCharacter } from "./Base/PlayerCharacter";
import { Tiefling } from "./Races/Tiefling/Tiefling";
import { Cleric } from "./Classes/Cleric/Cleric";
import { Sorcerer } from "./Classes/Sorcerer/Sorcerer";
import { Criminal } from "./Backgrounds/Criminal";
import { Jsonify } from ".";

let sheet = new CharacterSheet(
    "Ebil",
    new PlayerCharacter(6, 16, 15, 13, 18, 18),
    new Tiefling(),
    new Sorcerer({multiclass: false, weapons: ["DAGGER"], skillProficiencies: ["persuasion", "insight"], arcaneFocus: "ROD", equipmentPack: "DUNGEONEER" }),
    new Criminal({gamingSet: "Playing card set"})

)

sheet.levelUp("Sorcerer", 0, {spellSelections: {add: ["FIRE BOLT", "MESSAGE", "SHOCKING GRASP", "RAY OF FROST", "BURNING HANDS", "SHIELD"]}, subclassParams: {name: "WILD MAGIC"}})

sheet.multiClass(new Cleric({multiclass: true}));
sheet.levelUp("Cleric", 8, {spellSelections: {add: ["SACRED FLAME", "SPARE THE DYING", "GUIDANCE"]}, subclassParams: {name: "TRICKERY"}})
sheet.levelUp("Cleric", 6, {})

Jsonify.dumpToJSON(sheet, "Ebil")