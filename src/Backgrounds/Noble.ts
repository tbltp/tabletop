import { Background, BackgroundParams } from "./Background";

export class Noble extends Background {
    constructor(params: BackgroundParams) {
      super(
        "Noble",
        ["history", "persuasion"],
        [...params.languages],
        [params.gamingSet],
        ["CLOTHES, FINE", "SIGNET RING"],
        [],
        25,
        [
          {
            title: "Position of Privilege",
            description:
              "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wwherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere, You can secure an audience with a local noble if you need to.",
          },
        ]
      );
    }
  }