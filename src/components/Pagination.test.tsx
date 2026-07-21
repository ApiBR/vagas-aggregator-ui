import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when currentPage is 0', () => {
    const { container } = render(
      <Pagination currentPage={0} totalPages={5} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there is only a single page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders page buttons and disables previous on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    const [prevButton, nextButton] = screen.getAllByRole('button').filter(
      (btn) => !/^\d+$/.test(btn.textContent || '')
    );
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables next on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it('renders ellipsis for large page ranges', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('calls onPageChange with the clicked page number', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    await user.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with next page when clicking the next arrow', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[buttons.length - 1]);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when clicking the previous arrow', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('highlights the current page button', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />);
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton.className).toContain('bg-primary');
  });
});
