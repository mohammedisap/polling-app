import React from "react";
import { Vote } from "../types/poll";

interface PollOptionProps {
    option: { optionId: string; text: string };
    selectedOption: string | null;
    isSubmitted: boolean;
    vote: Vote | undefined;
    totalVotes: number;
    onSelect: (id: string) => void;
    showResults: boolean;
}

const PollOption: React.FC<PollOptionProps> =
    ({option, selectedOption, isSubmitted, vote, totalVotes, onSelect, showResults}) => {
        const percentage = vote ? (vote.votes / totalVotes) * 100 : 0;
        const fillWidth = totalVotes > 0 ? `${(vote?.votes || 0) / totalVotes * 100}%` : '0%';

        return (
            <li
                onClick={() => !isSubmitted && onSelect(option.optionId)}
                className={`option ${selectedOption === option.optionId ? 'selected' : ''} ${isSubmitted ? 'disabled' : ''}`}
            >
                <div className="d-flex flex-column align-items-center text-center">
                    <div className="option-text align-items-center text-center">{option.text}</div>
                    {showResults && isSubmitted && (
                        <span className="vote-results">
                            {vote ? `${vote.votes} votes (${percentage.toFixed(2)}%)` : '0 votes'}
                        </span>
                    )}
                </div>
                <div
                    className="option-fill"
                    style={{
                        width: isSubmitted ? fillWidth : '0%',
                        backgroundColor: selectedOption === option.optionId ? '#6a2c94' : '#3e1b63',
                    }}
                />
            </li>
        );
};

export default PollOption;
