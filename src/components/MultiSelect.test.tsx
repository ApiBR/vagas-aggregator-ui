import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'a', label: 'Option A', count: 3 },
  { value: 'b', label: 'Option B', count: 1, avatar: 'https://example.com/b.png' },
];

describe('MultiSelect', () => {
  it('shows the placeholder when nothing is selected', () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('renders a chip for each selected value', () => {
    render(<MultiSelect options={options} value={['a']} onChange={() => {}} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.queryByText('Option B')).not.toBeInTheDocument();
  });

  it('opens the options list on click and shows counts', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={[]} onChange={() => {}} />);

    await user.click(screen.getByText('Select options...'));

    expect(screen.getByText('(3)')).toBeInTheDocument();
    expect(screen.getByText('(1)')).toBeInTheDocument();
  });

  it('calls onChange adding a value when an unselected option is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);

    await user.click(screen.getByText('Select options...'));
    await user.click(screen.getByText('Option A'));

    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('calls onChange removing a value when an already-selected option is clicked again', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={['a']} onChange={onChange} />);

    // "Option A" already renders as a selected chip, so open the list and
    // click the option row inside the listbox specifically to avoid matching the chip.
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    await user.click(within(listbox).getByText('Option A'));

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('removes a value when the chip remove button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<MultiSelect options={options} value={['a', 'b']} onChange={onChange} />);

    const removeButtons = container.querySelectorAll('button');
    await user.click(removeButtons[0]);

    expect(onChange).toHaveBeenCalledWith(['b']);
  });

  it('renders avatars for selected and listed options when showAvatars is set', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={['b']} onChange={() => {}} showAvatars />);

    const avatars = screen.getAllByAltText('Option B');
    expect(avatars.length).toBeGreaterThan(0);

    await user.click(screen.getByText('Option B'));
    expect(screen.getAllByAltText('Option B').length).toBeGreaterThan(1);
  });
});
