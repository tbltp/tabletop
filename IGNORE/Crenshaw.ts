import { CharacterSheet} from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

import { Tiefling } from "../src/Races/Tiefling/Tiefling";
import { Barbarian } from "../src/Classes/Barbarian/Barbarian";
import { Charlatan } from "../src/Backgrounds/Background";

import { Jsonify } from "./Jsonify";


let pc: CharacterSheet = new CharacterSheet(
    new PlayerCharacter(14, 14, 14, 14, 14, 14),
    new Tiefling(),
    new Barbarian(
        false,
        ["athletics", "nature"],
        ["GREATAXE", "HANDAXE", "HANDAXE"]
    ),
    new Charlatan()
);

pc.levelUp("Barbarian", {isNoInput: true});

Jsonify.dumpToJSON(pc.character, "Crenshaw");
