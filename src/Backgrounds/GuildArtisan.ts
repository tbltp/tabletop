import { Background } from "./Background";

export class GuildArtisan extends Background {
    constructor(
      artisansToolProficiency: string,
      artisansTool: string,
      language: string
    ) {
      super(
        "Guild Artisan",
        ["insight", "persuasion"],
        [language],
        [artisansToolProficiency],
        ["CLOTHES, TRAVELER'S"],
        [artisansTool],
        15,
        [
          {
            title: "Guild Membership",
            description:
              "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings. Guilds often wield tremendous political power. If you are accused of a crime, your guild will support you if a good case can be made for your innocence or the crime is justifiable. You can also gain access to powerful political figures through the guild, if you are a member in good standing. Such connections might require the donation of money or magic items to the guild's coffers. You must pay dues of 5 gp per month to the guild. If you miss payments, you must make up back dues to remain in the guild's good graces.",
          },
        ]
      );
    }
  }