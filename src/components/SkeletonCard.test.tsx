import { render } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

describe('SkeletonCard', () => {
  it('renders the issue skeleton with label placeholders', () => {
    const { container } = render(<SkeletonCard type="issue" />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(1);
    expect(container.querySelectorAll('.rounded-full.bg-gray-200, .rounded-full.dark\\:bg-gray-600')).not.toHaveLength(0);
  });

  it('renders the repository skeleton with contributor placeholders', () => {
    const { container } = render(<SkeletonCard type="repository" />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(1);
    // repository skeleton renders 4 action/contributor circle groups
    const circles = container.querySelectorAll('.ring-2.ring-white');
    expect(circles.length).toBe(4);
  });

  it('renders the author skeleton by default for unmatched types', () => {
    const { container } = render(<SkeletonCard type="author" />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(1);
    // author skeleton has a 16x16 avatar placeholder
    expect(container.querySelector('.w-16.h-16')).toBeTruthy();
  });
});
