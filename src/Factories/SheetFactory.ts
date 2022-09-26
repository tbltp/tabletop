import { SheetData, BaseCharacterData, BaseCharacterRules } from "./Interfaces";
import { resolve } from "path";
import * as pv from "path-validation";
import * as fs from "fs";
import { CharacterFactory } from "./CharacterFactory";
import { BaseCharacter } from "Character/BaseCharacter";


export class SheetFactory {
    constructor(requiredFields: string[] = ["character"]) {
        this._requiredFields = requiredFields;
        return;
    }

    private _sheetData: SheetData = {
        characterData: null,
        rulesData: null,
    };
    private _requiredFields: string[] = [];
    private _defaultRulesPath: string = resolve(__dirname, "../Rulesets/DefaultCharacter5e.json");

    public deserializeFile(dataPath: string, rulesPath: string = this._defaultRulesPath): BaseCharacter {
        const cfactory: CharacterFactory = new CharacterFactory();
        this._loadRulesData(rulesPath);
        this._loadSheetData(dataPath);
        const { rulesData, characterData } = this._sheetData;
        cfactory.charRuleSet = rulesData;
        cfactory.loadCharacterFromData(characterData);
        return cfactory.character;
    }

    private _pullDataFromPath(path: string): object {
        /*
        Deserializes JSON file from path into object data
        - Expects an absolute path to a JSON file
        */
        if (!pv.isAbsoluteLinuxPath(path)) {
            throw Error(`Invalid path: ${path}`);
        }
        const contents = fs.readFileSync(path, "utf8");
        return JSON.parse(contents);
    }


    private _loadSheetData(path: string): void {
        /*
        Deserializes sheet JSON into data
        - Checks for required fields
        - Deserializes each required field
        - Returns the composition of deserialized data
        */
        const jsonObj: object = this._pullDataFromPath(path);
        const bcData = jsonObj["character"] as BaseCharacterData;
        this._sheetData['characterData'] = bcData;
    }

    private _loadRulesData(path: string): void {
        /*
        Deserializes rules JSON into data
        - Provides character factory with rules that can be used 
          to build characters
        - Checks for required fields
        - Deserializes each required field
        */
        const jsonObj: object = this._pullDataFromPath(path);
        const rData = jsonObj["rules"] as BaseCharacterRules;
        this._sheetData['rulesData'] = rData;
    }
}
