import { CountryEntry } from '../types/encyclopedia';
import { COUNTRIES_AMERICAS } from './countriesAmericas';
import { COUNTRIES_EUROPE } from './countriesEurope';
import { COUNTRIES_ASIA } from './countriesAsia';
import { COUNTRIES_AFRICA } from './countriesAfrica';
import { COUNTRIES_OCEANIA } from './countriesOceania';

export const ALL_COUNTRIES: CountryEntry[] = [
  ...COUNTRIES_AMERICAS,
  ...COUNTRIES_EUROPE,
  ...COUNTRIES_ASIA,
  ...COUNTRIES_AFRICA,
  ...COUNTRIES_OCEANIA,
].sort((a, b) => a.name.localeCompare(b.name, 'es'));

export const CONTINENT_FILTERS = [
  'Todos',
  'América del Sur',
  'América del Norte',
  'Europa',
  'África',
  'Asia',
  'Oceanía',
  'Antártida',
] as const;

export const ANTARCTICA_LORE_NOTE = {
  title: 'Antártida — El séptimo continente',
  subtitle: 'Territorio sin Estados soberanos ni mitología indígena originaria',
  summary:
    'De acuerdo con el Tratado Antártico de 1959 y el consenso internacional, la Antártida no posee Estados soberanos ni población indígena originaria, por lo cual los 195 países internacionalmente reconocidos se distribuyen entre los seis continentes habitados.',
  traditions: [
    'Terra Australis Incognita: hipótesis geográfica clásica y renacentista sobre un continente austral equilibrador del planeta.',
    'Relatos polares de navegación polinesia: tradiciones orales maoríes (como el relato de Hui Te Rangiora en el siglo VII citado por S. Percy Smith, debatido por la historiografía moderna) sobre mares helados al sur.',
    'Folclore moderno y literatura de expediciones: crónicas de la Edad Heroica de la Exploración Antártica (Shackleton, Scott, Amundsen) y relatos de ficción literaria del siglo XX.',
  ],
  classification: 'Relato histórico' as const,
  sources: 'Secretaría del Tratado Antártico · Scott Polar Research Institute',
};
