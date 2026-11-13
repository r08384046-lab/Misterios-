import heroWorldMyths from './images/hero_world_myths_1794609292379.jpg';
import creatureDragonObsidian from './images/creature_dragon_obsidian_1794609292660.jpg';
import paraguayGuaraniForest from './images/paraguay_guarani_forest_1794609293884.jpg';
import deityCelestialPantheon from './images/deity_celestial_pantheon_1794609294027.jpg';
import placeAncientSanctuary from './images/place_ancient_sanctuary_1794609294407.jpg';
import creatureAbyssalKraken from './images/creature_abyssal_kraken_1794609294691.jpg';
import { ImageAssetKey } from '../types/encyclopedia';

export const IMAGE_ASSETS: Record<ImageAssetKey, string> = {
  hero: heroWorldMyths,
  dragon: creatureDragonObsidian,
  paraguay: paraguayGuaraniForest,
  deity: deityCelestialPantheon,
  sanctuary: placeAncientSanctuary,
  kraken: creatureAbyssalKraken,
};

export const IMAGE_ACCENT_GRADIENTS: Record<ImageAssetKey, string> = {
  hero: 'from-[#24143B] via-[#08090D] to-[#641E2B]/40',
  dragon: 'from-[#641E2B]/50 via-[#08090D] to-[#24143B]',
  paraguay: 'from-[#0F2A24] via-[#08090D] to-[#24143B]',
  deity: 'from-[#C9A45C]/25 via-[#24143B]/80 to-[#08090D]',
  sanctuary: 'from-[#24143B]/80 via-[#08090D] to-[#C9A45C]/20',
  kraken: 'from-[#0D1B2A] via-[#08090D] to-[#641E2B]/45',
};
