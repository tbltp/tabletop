import { SheetData, BaseCharacterData } from "./Interfaces";
import * as pv from "path-validation";
import * as fs from "fs";
import { CharacterFactory } from "./CharacterFactory";
import { searchInDictionary } from "../Utilities/General";
import { BaseCharacter } from "Character/BaseCharacter";

export class SheetFactory {
    constructor(requiredFields: string[] = ["character"]) {
        this._requiredFields = requiredFields;
        return;
    }

    private _sheetData: SheetData = null;
    private _requiredFields: string[] = [];

    public deserializeFile(path: string): BaseCharacter {
        const cfactory: CharacterFactory = new CharacterFactory();
        this._pullSheetDataFromPath(path);
        const bcdata: BaseCharacterData = searchInDictionary(
            "characterData",
            this._sheetData
        );
        cfactory.loadCharacterFromData(bcdata);
        return cfactory.character;
    }

    private _pullSheetDataFromPath(path: string): void {
    /*
    Deserializes JSON into data that can be used for sheet creation:
    - Expects an absolute path to a JSON file
    - Checks for required fields
    - Deserializes each required field
    - Returns the composition of deserialized data
    */

        if (!pv.isAbsoluteLinuxPath(path)) {
            throw Error(`Invalid path: ${path}`);
        }
        const contents = fs.readFileSync(path, "utf8");
        const jsonObj: object = JSON.parse(contents);

        const bcData = jsonObj["character"] as BaseCharacterData;
        this._sheetData = {
            characterData: bcData,
        };
    }
}
