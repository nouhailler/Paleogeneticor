import { ArrowLeft, BookOpen, CalendarDays, Dna, GitFork, Home, Landmark, Map, Menu, Search, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useLibraryStore } from '../store/libraryStore';

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/species', label: 'Especes', icon: BookOpen },
  { to: '/dna', label: 'ADN', icon: Dna },
  { to: '/map', label: 'Carte', icon: Map },
  { to: '/tree', label: 'Arbre', icon: GitFork },
  { to: '/glossary', label: 'Glossaire', icon: Search }
];

const menuItems = [
  ...navItems,
  { to: '/fossils', label: 'Fossiles', icon: Landmark },
  { to: '/discoveries', label: 'Decouvertes', icon: CalendarDays },
  { to: '/library', label: 'Favoris et historique', icon: Star }
];

export function AppLayout() {
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hydrate = useLibraryStore((state) => state.hydrate);
  const recordVisit = useLibraryStore((state) => state.recordVisit);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const current = matches.at(-1);
    const title =
      typeof current?.handle === 'object' && current.handle && 'title' in current.handle
        ? String(current.handle.title)
        : 'Paleogeneticor';
    void recordVisit(location.pathname, title);
  }, [location.pathname, matches, recordVisit]);

  const goBack = () => {
    setIsMenuOpen(false);
    if (location.key === 'default') {
      void navigate('/');
      return;
    }
    void navigate(-1);
  };

  return (
    <div className="min-h-screen bg-bone text-ink">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-black/10 bg-white text-lagoon"
              aria-label="Retour en arriere"
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to="/"
              className="flex min-w-0 items-center gap-3 font-bold text-ink transition hover:text-lagoon"
              aria-label="Retourner a l'accueil Paleogeneticor"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-lagoon text-lg text-white">PG</span>
              <span className="truncate underline-offset-4 hover:underline">Paleogeneticor</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-lagoon text-white' : 'text-ink/75 hover:bg-lagoon/10 hover:text-ink'
                  }`
                }
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/library"
              className="hidden h-10 w-10 place-items-center rounded-md border border-black/10 bg-white text-lagoon sm:grid"
              aria-label="Favoris et historique"
              onClick={() => setIsMenuOpen(false)}
            >
              <Star className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white text-lagoon"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <div id="main-menu" className="border-t border-black/10 bg-paper shadow-soft">
            <nav
              className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Toutes les fonctionnalites"
            >
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center gap-3 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'border-lagoon bg-lagoon text-white'
                        : 'border-black/10 bg-white text-ink/78 hover:border-lagoon/30 hover:bg-lagoon/10 hover:text-ink'
                    }`
                  }
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-bone text-lagoon">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <main
        key={location.pathname}
        className="mx-auto w-full max-w-[100vw] overflow-hidden px-4 pb-20 pt-6 sm:max-w-7xl sm:py-8"
      >
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-paper md:hidden" aria-label="Navigation mobile">
        <div className="grid grid-cols-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `grid min-h-14 place-items-center text-[11px] ${isActive ? 'text-lagoon' : 'text-ink/60'}`
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
