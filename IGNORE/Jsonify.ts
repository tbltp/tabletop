import { CharacterSheet } from "../src/Base/CharacterSheet";
import * as fs from "fs";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

export class Jsonify {
  static dumpToJSON(sheet: CharacterSheet, filename: string) {
    fs.writeFile(`./IGNORE/${filename}.json`, JSON.stringify(sheet, (key, value) => key == "pcHelper" ? value.id : value), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  }


  static dumpFromLocal(filename: string):void {

    let req = new XMLHttpRequest();
    req.open("GET", filename, false);
    req.send(null);
    const sheet: CharacterSheet = Jsonify.dumpToObject(req.responseText);
  }

  static dumpToObject(text: string): CharacterSheet {
    
    /**
     * JSON -> race, class, background
     * 1. new character using ability scores in JSON
     * 2. new race, new class, new background using names in JSON
     * 3. new Character Sheet using character, race, class, background
     * 4. copy all the rest of the shit over
     */
    const jsonSheet: object = JSON.parse(text);
    const abilityScores: number[] = Jsonify.extractAbilityScores(jsonSheet);


  }

  static extractAbilityScores(json: object): number[] {

  }
}
