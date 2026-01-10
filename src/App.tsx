import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { IssuesPage } from './pages/IssuesPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { AuthorDetailsPage } from './pages/AuthorDetailsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/ui/vagas">
        <div className="min-h-screen bg-white dark:bg-[#060606] transition-colors flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<IssuesPage />} />
              <Route path="/repositories" element={<RepositoriesPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/authors/:owner/:repo" element={<AuthorDetailsPage />} />
            </Routes>
          </div>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;