export class BaseCharacterRules {

    allowedAbilities: string[] = [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
    ];

    linkedHealthAbility: string = "constitution";

}