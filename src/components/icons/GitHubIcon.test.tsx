import { render } from '@testing-library/react';
import { GitHubIcon } from './GitHubIcon';

describe('GitHubIcon', () => {
  it('renders an svg marked as decorative', () => {
    const { container } = render(<GitHubIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards extra props such as className to the svg element', () => {
    const { container } = render(<GitHubIcon className="w-5 h-5" data-testid="gh-icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-5', 'h-5');
    expect(svg).toHaveAttribute('data-testid', 'gh-icon');
  });
});
