import { CharacterSheet } from "../Base/CharacterSheet";
import * as fs from "fs";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Race } from "../Races/Race";
import { PlayerClass } from "../Classes/PlayerClass";
import { Background, DSBackground } from "../Backgrounds/Background";
import { BarbarianSubclass } from "../Classes/Barbarian/Subclasses/BarbarianSubclass";
import { Deserialize } from "./Deserialize";

export class Jsonify {
  static dumpToJSON(sheet: CharacterSheet, filename: string) {
    fs.writeFileSync(
      `./${filename}.json`,
      JSON.stringify(
        sheet,

        (key, value) => {
          if (value === undefined) {
            return null;
          }
          if (key == "pcHelper") {
            return value.id;
          }
          return value;
        }
      )
    );
    console.log("File has been created");
    return;
  }

  static dumpFromLocal(filename: string): CharacterSheet {
    return Jsonify.dumpToObject(fs.readFileSync(filename, "utf8"));
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
    const abilityScores: [
      number,
      number,
      number,
      number,
      number,
      number
    ] = Jsonify.extractAbilityScores(jsonSheet);
    const name: string = jsonSheet["name"];

    let pc: PlayerCharacter = new PlayerCharacter(...abilityScores);
    pc = this.buildCharacter(pc, jsonSheet);

    let race: Race = Deserialize.deserializeRace(jsonSheet["race"]["name"]);
    race = this.buildRace(race, jsonSheet);

    let bg: Background = new DSBackground();
    bg = this.buildBackground(bg, jsonSheet);

    const pclassesEmpty: PlayerClass[] = Deserialize.deserializePlayerClasses(
      Object.keys(jsonSheet["playerClasses"])
    );
    const pclasses: PlayerClass[] = Jsonify.buildClasses(
      pclassesEmpty,
      jsonSheet
    );
    const pclass: PlayerClass = pclasses[0];

    const charSheet = new CharacterSheet(name, pc, race, pclass, bg, true);

    for (const pclass of pclasses) {
      charSheet.playerClasses[pclass.name] = pclass;
      charSheet.levels[pclass.name] = pclass["level"];
    }

    console.log("Object has been created from file");
    return charSheet;
  }

  static buildCharacter(
    emptyCharacter: PlayerCharacter,
    jsonSheet: object
  ): PlayerCharacter {
    for (const property of Object.getOwnPropertyNames(jsonSheet["character"])) {
      if (property === "abilityScores") {
        for (const ability in jsonSheet["character"][property]) {
          emptyCharacter.abilityScores[ability].savingThrowProficiency =
            jsonSheet["character"][property][ability]["savingThrowProficiency"];
        }
      }

      if (["abilityScores", "proficiency", "pcHelper"].includes(property)) {
        continue;
      }

      emptyCharacter[property] = jsonSheet["character"][property];
    }

    emptyCharacter.proficiency.levelUp(emptyCharacter.level.totalLevel);

    return emptyCharacter;
  }

  static buildRace(dsRace: Race, jsonSheet: object): Race {
    for (const property of Object.getOwnPropertyNames(dsRace)) {
      dsRace[property] = jsonSheet["race"][property];
    }
    return dsRace;
  }

  static buildClasses(
    dsClasses: PlayerClass[],
    jsonSheet: object
  ): PlayerClass[] {
    for (const dsClass of dsClasses) {
      for (const property of Object.getOwnPropertyNames(dsClass)) {
        if (property === "abilitiesAtLevels") {
          continue;
        }
        dsClass[property] = jsonSheet["playerClasses"][dsClass.name][property];
      }

      // Fucking Druid Terrains Death to Circle of Land
      if (jsonSheet["playerClasses"][dsClass.name]["subclass"]) {
        if (
          jsonSheet["playerClasses"][dsClass.name]["subclass"]["title"] ==
          "LAND"
        ) {
          dsClass.subclass = Deserialize.deserializeSubclass(
            jsonSheet["playerClasses"][dsClass.name],
            jsonSheet["playerClasses"][dsClass.name]["subclass"]["title"],
            jsonSheet["playerClasses"][dsClass.name]["subclass"]["terrain"]
          );
        } else {
          dsClass.subclass = Deserialize.deserializeSubclass(
            dsClass.name,
            jsonSheet["playerClasses"][dsClass.name]["subclass"]["title"]
          );
        }
      }
    }

    return dsClasses;
  }

  static buildBackground(dsBg: Background, jsonSheet: object): Background {
    for (const property of Object.getOwnPropertyNames(dsBg)) {
      dsBg[property] = jsonSheet["background"][property];
    }
    return dsBg;
  }

  static extractAbilityScores(
    jsonSheet: object
  ): [number, number, number, number, number, number] {
    const abilityScores: object[] = Object.values(
      jsonSheet["character"]["abilityScores"]
    );
    let outputScores: [number, number, number, number, number, number] = [
      0,
      0,
      0,
      0,
      0,
      0,
    ];
    for (let i = 0; i < abilityScores.length; i++) {
      outputScores[i] = abilityScores[i]["score"];
    }
    return outputScores;
  }
}
