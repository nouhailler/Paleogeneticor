import { BookOpen, Dna, GitFork, Home, Map, Search, Star } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useMatches } from 'react-router-dom';
import { useLibraryStore } from '../store/libraryStore';

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/species', label: 'Especes', icon: BookOpen },
  { to: '/dna', label: 'ADN', icon: Dna },
  { to: '/map', label: 'Carte', icon: Map },
  { to: '/tree', label: 'Arbre', icon: GitFork },
  { to: '/glossary', label: 'Glossaire', icon: Search }
];

export function AppLayout() {
  const location = useLocation();
  const matches = useMatches();
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

  return (
    <div className="min-h-screen bg-bone text-ink">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3 font-bold text-ink">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-lagoon text-lg text-white">PG</span>
            <span className="truncate">Paleogeneticor</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
          <Link
            to="/library"
            className="grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white text-lagoon"
            aria-label="Favoris et historique"
          >
            <Star className="h-5 w-5" />
          </Link>
        </div>
      </header>
      <main key={location.pathname} className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
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
