import { CharacterSheet } from "../src/Base/CharacterSheet";
import * as fs from "fs";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { Race } from "../src/Races/Race";
import { PlayerClass } from "../src/Classes/PlayerClass";
import { Background, DSSage } from "../src/Backgrounds/Background";
import { DSFireGenasi } from "../src/Races/Genasi/Subrace/FireGenasi";
import { DSBarbarian } from "../src/Classes/Barbarian/Barbarian";
import { BarbarianSubclass } from "../src/Classes/Barbarian/Subclasses/BarbarianSubclass";

export class Jsonify {
  static dumpToJSON(sheet: CharacterSheet, filename: string) {
    if(filename === 'NewBunsen') {
      console.log(sheet.character);
      console.log(sheet);
    }
    fs.writeFileSync(`./IGNORE/${filename}.json`, JSON.stringify(sheet, 
    
    (key, value) => {
      if(value === undefined) {
        return null;
      }
      if(key == "pcHelper") {
        return value.id;
      }
      return value;
    }));
    console.log("File has been created");
    return;
  }


  static dumpFromLocal(filename: string): CharacterSheet {

    return Jsonify.dumpToObject(fs.readFileSync(filename, 'utf8'));
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
    const abilityScores: [ number, number, number, number, number, number] = Jsonify.extractAbilityScores(jsonSheet);
    const name: string = jsonSheet['name'];

    let pc: PlayerCharacter = new PlayerCharacter(...abilityScores);
    pc = this.buildCharacter(pc, jsonSheet);

    let race: Race = Jsonify.deserializeRace(jsonSheet['race']['name'])
    race = this.buildRace(race, jsonSheet);

    const pclasses: PlayerClass[] = Jsonify.deserializePlayerClasses(Object.keys(jsonSheet['playerClasses']));
    const barbClass: PlayerClass = Jsonify.buildClass(pclasses[0], jsonSheet);

    let bg: Background = Jsonify.deserializeBackground(jsonSheet['background']['name']);
    bg = this.buildBackground(bg, jsonSheet);

    const charSheet = new CharacterSheet(name, pc, race, barbClass, bg, true);
    console.log("Object has been created from file");
    return charSheet;
  }
 
  static deserializePlayerClasses(classNames: string[]): PlayerClass[] {
    
    let classes = []
    
    for( const className of classNames) {
      switch(className) {
        case "Barbarian":
          classes.push(new DSBarbarian());
      }
    }
    
    return classes;
  }

  static deserializeRace(race: string): Race {
    switch(race) {
      case "Fire Genasi":
        return new DSFireGenasi();
    }
  }

  static deserializeBackground(background: string): Background {
    switch(background) {
      case "Sage":
        return new DSSage();
    }
  }

  static buildCharacter(emptyCharacter: PlayerCharacter, jsonSheet: object): PlayerCharacter {
    for(const property of Object.getOwnPropertyNames(jsonSheet['character'])){
      
      if(property === "abilityScores"){
        console.log("!")
        for( const ability in jsonSheet['character'][property]){ 
          console.log(ability)
          emptyCharacter.abilityScores[ability].savingThrowProficiency = jsonSheet['character'][property][ability]["savingThrowProficiency"]
        }
      }

      if(["abilityScores", "proficiency", "pcHelper"].includes(property)) {
        continue;
      }

      emptyCharacter[property] = jsonSheet['character'][property];
    }

    return emptyCharacter;
  }

  static buildRace(dsRace: Race, jsonSheet: object): Race {
    for(const property of Object.getOwnPropertyNames(dsRace)){
      dsRace[property] = jsonSheet['race'][property];
    }
    return dsRace;
  }
  
  static buildClass(dsClass: PlayerClass, jsonSheet: object): PlayerClass {
    
    for(const property of Object.getOwnPropertyNames(dsClass)){
      if(property === 'abilitiesAtLevels') { continue; }
      dsClass[property] = jsonSheet['playerClasses'][dsClass.name][property];
      
    }

    if(jsonSheet['playerClasses'][dsClass.name]["subclass"]){
      dsClass.subclass = new BarbarianSubclass(jsonSheet['playerClasses'][dsClass.name]["subclass"]["title"])
    }
    return dsClass;
  }

  static buildBackground(dsBg: Background, jsonSheet: object): Background {
    for(const property of Object.getOwnPropertyNames(dsBg)){
      dsBg[property] = jsonSheet['background'][property];
    }
    return dsBg;
  }




  static extractAbilityScores(jsonSheet: object): [ number, number, number, number, number, number ] {
    
    const abilityScores: object[] = Object.values(jsonSheet['character']['abilityScores']);
    let outputScores: [ number, number, number, number, number, number ] = [0, 0, 0, 0, 0, 0];
    for(let i = 0; i < abilityScores.length; i++ ) {
      outputScores[i] = abilityScores[i]['score']
    }
    return outputScores;
  }



  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
