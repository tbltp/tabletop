import { CharacterSheet} from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "Base/PlayerCharacter";

import { Tiefling } from "Races/Tiefling/Tiefling";
import { Barbarian } from "Classes/Barbarian/Barbarian";
import { Charlatan } from "Backgrounds/Background";

let pc: CharacterSheet = new CharacterSheet(
    "?",
    new PlayerCharacter(0, 0, 0, 0, 0, 0),
    new Tiefling(),
    new Barbarian(false),
    new Charlatan()
)

pc.levelUp("Barbarian", {isNoInput: true});