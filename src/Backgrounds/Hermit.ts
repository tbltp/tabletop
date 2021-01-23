import { Background } from "./Background";

export class Hermit extends Background {
    constructor(language: string) {
      super(
        "Hermit",
        ["medicine", "religion"],
        [language],
        ["Herbalism Kit"],
        ["CLOTHES, COMMON", "BLANKET"],
        ["HERBALISM KIT"],
        5,
        [
          {
            title: "Discovery",
            description:
              "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a treat truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature. It could be a site that no one else has ever seen. You might have uncovered a fact that has long been forgotten, or unearthed some relic of the past that could reqrite history. It might be information that would be damaging to the people who or consigned you to exile, and hence the reason for your return to society.",
          },
        ]
      );
    }
  }