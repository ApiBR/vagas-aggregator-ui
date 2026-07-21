import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../i18n';
import { ShareButton } from './ShareButton';

describe('ShareButton', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the default share label', () => {
    render(<ShareButton />);
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('uses navigator.share when available and shows no copied state on success', async () => {
    // userEvent.setup() installs its own navigator.clipboard stub, so it must
    // run before we stub navigator ourselves or it clobbers our mock.
    const user = userEvent.setup();
    const shareMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, share: shareMock, clipboard: { writeText: vi.fn() } });

    render(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(shareMock).toHaveBeenCalledWith(
      expect.objectContaining({ url: window.location.href })
    );
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  });

  it('falls back to clipboard copy when navigator.share rejects with a non-abort error', async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockRejectedValue(new Error('boom'));
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      ...navigator,
      share: shareMock,
      clipboard: { writeText: writeTextMock },
    });

    render(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(window.location.href);
    });
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });

  it('does not fall back to clipboard when the share is aborted by the user', async () => {
    const user = userEvent.setup();
    const abortError = Object.assign(new Error('aborted'), { name: 'AbortError' });
    const shareMock = vi.fn().mockRejectedValue(abortError);
    const writeTextMock = vi.fn();
    vi.stubGlobal('navigator', {
      ...navigator,
      share: shareMock,
      clipboard: { writeText: writeTextMock },
    });

    render(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => {
      expect(shareMock).toHaveBeenCalled();
    });
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  });

  it('copies to clipboard directly when navigator.share is unavailable', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, share: undefined, clipboard: { writeText: writeTextMock } });

    render(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(writeTextMock).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });

  it('logs an error when clipboard copy fails', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const writeTextMock = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { ...navigator, share: undefined, clipboard: { writeText: writeTextMock } });

    render(<ShareButton />);

    await user.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy:', expect.any(Error));
    });
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  });

  it('applies the passed className to the wrapping button', () => {
    render(<ShareButton className="extra-class" />);
    expect(screen.getByRole('button', { name: 'Share' }).className).toContain('extra-class');
  });
});
