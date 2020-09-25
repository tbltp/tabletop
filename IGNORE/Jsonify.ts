import * as fs from "fs";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

export class Jsonify {
  static dumpToJSON(pc: PlayerCharacter, filename: string) {
    fs.writeFile(`./IGNORE/${filename}.json`, JSON.stringify(pc), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  }
}
