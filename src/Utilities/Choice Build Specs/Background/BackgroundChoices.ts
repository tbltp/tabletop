import * as AcolyteChoices from './Acolyte.json'
import * as CriminalChoices from './Criminal.json'
import * as EntertainerChoices from './Entertainer.json'
import * as FolkHeroChoices from './FolkHero.json'
import * as GuildArtisanChoices from './GuildArtisan.json'
import * as HermitChoices from './Hermit.json'
import * as KnightChoices from './Knight.json'
import * as NobleChoices from './Noble.json'
import * as OutlanderChoices from './Outlander.json'
import * as SageChoices from './Sage.json'
import * as SoldierChoices from './Soldier.json'

const  NONE = {}

export const BackgroundChoices = {
    Acolyte: AcolyteChoices,
    Charlatan: NONE,
    Criminal: CriminalChoices,
    Entertainer: EntertainerChoices,
    "Folk Hero": FolkHeroChoices,
    "Guild Artisan": GuildArtisanChoices,
    Hermit: HermitChoices,
    Knight: KnightChoices,
    Noble: NobleChoices,
    Outlander: OutlanderChoices,
    Pirate: NONE,
    Sage: SageChoices,
    Sailor: NONE,
    Soldier: SoldierChoices,
    Urchin: NONE
}