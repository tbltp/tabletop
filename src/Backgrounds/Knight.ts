import { Noble } from "./Noble";

export class Knight extends Noble {
    constructor(gamingSet: string, language: string) {
      super(gamingSet, language);
      this.name = "Knight";
      this.features = [
        {
          title: "Retainers",
          description:
            "You have the service of three retainers loyal to your family. These retainers can be attendants or messengers, and one might be a majordomo. Your retainers are commoners who can perform mundane tasks for you, but they do not fight for you, will not follow you into obviously dangerous areas (such as dungeons), and will leave if they are frequently endangered or abused.",
        },
      ];
    }
  }