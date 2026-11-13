import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountriesSection } from './sections/CountriesSection';
import { MythologiesSection } from './sections/MythologiesSection';
import { CreaturesSection } from './sections/CreaturesSection';
import { DeitiesSection } from './sections/DeitiesSection';
import { LegendsSection } from './sections/LegendsSection';
import { PlacesSection } from './sections/PlacesSection';
import { ParaguaySection } from './sections/ParaguaySection';
import { ComparatorSection } from './sections/ComparatorSection';
import { StoriesSection } from './sections/StoriesSection';
import { QuizSection } from './sections/QuizSection';
import { GallerySection } from './sections/GallerySection';
import { SourcesContactSection } from './sections/SourcesContactSection';
import { CountryDetailModal } from './components/CountryDetailModal';
import { CreatureDetailModal } from './components/CreatureDetailModal';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { BackToTop, Footer } from './components/Footer';
import { useFavorites, FavoriteItem } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { CountryEntry, CreatureEntry, StoryEntry } from './types/encyclopedia';
import { ALL_COUNTRIES } from './data/countriesData';
import { CREATURES_DATA } from './data/creaturesData';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  const [selectedCountry, setSelectedCountry] = useState<CountryEntry | null>(null);
  const [selectedCreature, setSelectedCreature] = useState<CreatureEntry | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const relatedCountries = useMemo(() => {
    if (!selectedCountry) return [];
    return ALL_COUNTRIES.filter(
      (c) => c.continent === selectedCountry.continent && c.id !== selectedCountry.id
    );
  }, [selectedCountry]);

  const handleNavigateFavorite = (fav: FavoriteItem) => {
    setFavoritesOpen(false);
    if (fav.type === 'country') {
      const found = ALL_COUNTRIES.find((c) => c.id === fav.id);
      if (found) setSelectedCountry(found);
    } else if (fav.type === 'creature') {
      const found = CREATURES_DATA.find((c) => c.id === fav.id);
      if (found) setSelectedCreature(found);
    } else if (fav.type === 'story') {
      document.querySelector('#historias')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="archival-canvas parchment-grain min-h-screen bg-[#F7F4EE] text-[#1C1917] transition-colors duration-300 dark:bg-[#08090D] dark:text-white">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenFavorites={() => setFavoritesOpen(true)}
        favoritesCount={favorites.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero />
        <CountriesSection onSelectCountry={setSelectedCountry} />
        <MythologiesSection />
        <CreaturesSection onSelectCreature={setSelectedCreature} />
        <DeitiesSection />
        <LegendsSection />
        <PlacesSection />
        <ParaguaySection />
        <ComparatorSection />
        <StoriesSection
          isFavorite={(id) => isFavorite(id, 'story')}
          onToggleFavorite={(story: StoryEntry) =>
            toggleFavorite({
              id: story.id,
              type: 'story',
              title: story.title,
              subtitle: story.tradition,
            })
          }
        />
        <QuizSection />
        <GallerySection />
        <SourcesContactSection />
      </main>

      <Footer />
      <BackToTop />

      {/* Dedicated Country Dossier Page/Modal */}
      <CountryDetailModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        isFavorite={selectedCountry ? isFavorite(selectedCountry.id, 'country') : false}
        onToggleFavorite={() => {
          if (!selectedCountry) return;
          toggleFavorite({
            id: selectedCountry.id,
            type: 'country',
            title: `${selectedCountry.flag} ${selectedCountry.name}`,
            subtitle: selectedCountry.continent,
          });
        }}
        relatedCountries={relatedCountries}
        onSelectNeighbor={(neighbor) => setSelectedCountry(neighbor)}
      />

      {/* Dedicated Creature Dossier Page/Modal */}
      <CreatureDetailModal
        creature={selectedCreature}
        onClose={() => setSelectedCreature(null)}
        isFavorite={selectedCreature ? isFavorite(selectedCreature.id, 'creature') : false}
        onToggleFavorite={() => {
          if (!selectedCreature) return;
          toggleFavorite({
            id: selectedCreature.id,
            type: 'creature',
            title: selectedCreature.name,
            subtitle: selectedCreature.origin,
          });
        }}
      />

      {/* Universal Search */}
      <UniversalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCountry={(country) => setSelectedCountry(country)}
        onSelectCreature={(creature) => setSelectedCreature(creature)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemove={(fav) => toggleFavorite(fav)}
        onClearAll={clearFavorites}
        onNavigate={handleNavigateFavorite}
      />
    </div>
  );
}
