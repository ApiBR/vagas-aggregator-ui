import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../i18n';
import { NewIssueModal } from './NewIssueModal';

describe('NewIssueModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<NewIssueModal isOpen={false} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the modal content when open', () => {
    render(<NewIssueModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('How to Create a New Issue')).toBeInTheDocument();
    expect(
      screen.getByText(/To post a new job, create a GitHub account/)
    ).toBeInTheDocument();
  });

  it('calls onClose when the close (X) button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NewIssueModal isOpen={true} onClose={onClose} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the footer Close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NewIssueModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<NewIssueModal isOpen={true} onClose={onClose} />);

    const backdrop = container.querySelector('.bg-opacity-75');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
