import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../i18n';
import { Navbar } from './Navbar';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders the navigation links', () => {
    renderAt('/');
    expect(screen.getByRole('menuitem', { name: 'Issues' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Repositories' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Authors' })).toBeInTheDocument();
  });

  it('marks the Issues link as the current page on "/"', () => {
    renderAt('/');
    expect(screen.getByRole('menuitem', { name: 'Issues' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('menuitem', { name: 'Repositories' })).not.toHaveAttribute('aria-current');
  });

  it('marks the Repositories link as current on "/repositories"', () => {
    renderAt('/repositories');
    expect(screen.getByRole('menuitem', { name: 'Repositories' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks the Authors link as current for any /authors/* route', () => {
    renderAt('/authors/org/repo');
    expect(screen.getByRole('menuitem', { name: 'Authors' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders the theme toggle and language selector', () => {
    renderAt('/');
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Select language')).toBeInTheDocument();
  });
});
