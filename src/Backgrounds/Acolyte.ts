import { Background } from "./Background";

export class Acolyte extends Background {
    constructor(languages: string[], holySymbol: string) {
      super(
        "Acolyte",
        ["insight", "religion"],
        languages,
        [],
        ["CLOTHES, COMMON", holySymbol],
        [],
        15,
        [
          {
            title: "Shelter of the Faithful",
            description:
              "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can except to receive free healing and care at a temple, shrine, or other establishd presence of your faith, though you must provide any material components for spells.  Those who share your religion will support you (but only you) at a modest lifestyle. \n You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be at the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While newar your temple, you can call upon the priests for assistance, provided the assisatance you ask for is not hazardous and you remain in good standing with your temple.",
          },
        ]
      );
    }
  }