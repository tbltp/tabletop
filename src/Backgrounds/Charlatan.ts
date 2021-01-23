import { Background } from "./Background";

export class Charlatan extends Background {
    constructor() {
      super(
        "Charlatan",
        ["deception", "sleight of hand"],
        [],
        ["Disguise Kit", "Forgery Kit"],
        ["CLOTHES, FINE"],
        ["DISGUISE KIT"],
        15,
        [
          {
            title: "False Identity",
            description:
              "You have created a second identity that includes documentation, established acquintances, and disguises that allow you to assume that persona, Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
          },
          {
            title: "Con of Your Choice",
            description:
              "Ten stoppered bottles filled colored liquid, a set of weighted diece, or a signet ring of an imaginary duke.)",
          },
        ]
      );
    }
  }