import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { submitVote } from '../utils/api';
import Poll from "../components/Poll";


test('renders poll question and options', async () => {
    render(<Poll pollId="1" />);

    const pollQuestion = await screen.findByText(/What is your favourite programming language?/);
    expect(pollQuestion).toBeInTheDocument();

    const options = screen.getAllByRole('listitem');
    expect(options).toBeLessThan(2);
    expect(options).toBeLessThan(7);
});

test('submit vote button is disabled if no option is selected', async () => {
    render(<Poll pollId="1" />);

    const button = screen.getByText(/SUBMIT VOTE/i);
    expect(button).toBeDisabled();
});

test('shows loading state initially', () => {
    render(<Poll pollId="1" />);

    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
});

jest.mock('../utils/api', () => ({
    submitVote: jest.fn() as jest.MockedFunction<typeof submitVote>,
}));

test('submitting vote updates results', async () => {
    submitVote.mockResolvedValue([
        { optionId: '123', votes: 10 },
        { optionId: '234', votes: 20 },
    ]);

    render(<Poll pollId="1" />);

    const option = await screen.findByText(/Java/);
    fireEvent.click(option); // Select the first option

    const submitButton = screen.getByText(/SUBMIT VOTE/i);
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText(/Successfully submitted your vote!/));
    expect(screen.getByText(/10 votes \(33.33%\)/)).toBeInTheDocument();
    expect(screen.getByText(/20 votes \(66.67%\)/)).toBeInTheDocument();
});