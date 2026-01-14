import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  shortcut: string;
  children: React.ReactNode;
}

function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-[#009c3b] text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      aria-current={isActive ? 'page' : undefined}
      role="menuitem"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Add keyboard shortcuts for navigation
  React.useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            window.location.href = '/';
            break;
          case '2':
            e.preventDefault();
            window.location.href = '/repositories';
            break;
          case '3':
            e.preventDefault();
            window.location.href = '/authors';
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow" role="banner">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center"
              aria-label="Home"
            >
              <img 
                src="https://apibr.com/ui/vagas/static/media/ApiBRLogo.27df95a5fe4328221157.png"
                alt="ApiBR Logo"
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-h4 font-bold text-gray-900 dark:text-white">Vagas Aggregator</h1>
            </Link>
            <nav 
              className="hidden md:flex space-x-4" 
              role="navigation" 
              aria-label="Main navigation"
            >
              <NavLink
                to="/"
                isActive={location.pathname === '/'}
                shortcut="Alt + 1"
              >
                {t('nav.issues')}
              </NavLink>
              <NavLink
                to="/repositories"
                isActive={location.pathname === '/repositories'}
                shortcut="Alt + 2"
              >
                {t('nav.repositories')}
              </NavLink>
              <NavLink
                to="/authors"
                isActive={location.pathname.startsWith('/authors')}
                shortcut="Alt + 3"
              >
                {t('nav.authors')}
              </NavLink>
            </nav>
          </div>
          <div 
            className="flex items-center space-x-4"
            role="group"
            aria-label="Site settings"
          >
            <div className="language-selector">
              <LanguageSelector />
            </div>
            <div className="theme-controls">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}