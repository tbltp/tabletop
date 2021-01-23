import { Background } from "./Background";

export class FolkHero extends Background {
    constructor(artisansToolProficiency: string, artisansTool: string) {
      super(
        "Folk Hero",
        ["animal handling", "survival"],
        [],
        ["Vehicles, land", artisansToolProficiency],
        [],
        [artisansTool],
        10,
        [
          {
            title: "Rustic Hospitality",
            description:
              "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.",
          },
        ]
      );
    }
  }