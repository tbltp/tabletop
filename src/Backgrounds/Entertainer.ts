import { Background, BackgroundParams } from "./Background";

export class Entertainer extends Background {
    constructor(params: BackgroundParams) {
      super(
        "Entertainer",
        ["acrobatics", "performance"],
        [],
        ["Disguise Kit", ...params.toolProficiencies],
        ["CLOTHES, COSTUME"],
        [params.instrument],
        15,
        [
          {
            title: "By Popular Demand",
            description:
              "You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending onthe quality of the establishment), as long as you perform each night. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.",
          },
        ]
      );
    }
  }