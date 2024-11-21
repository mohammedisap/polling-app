import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPoll, submitVote } from "../utils/api";
import { PollData, Vote } from "../types/poll";
import PollOption from "./PollOption";
import CreatePoll from './CreatePoll'; // Import the CreatePoll component

interface PollProps {
    pollId: string;
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
    const [poll, setPoll] = useState<PollData | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [voteResults, setVoteResults] = useState<Vote[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showCreatePoll, setShowCreatePoll] = useState<boolean>(false); // State to toggle CreatePoll component

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                // setPoll(await fetchPoll(pollId));
                // TODO Comment above and uncomment below for rendering using npm start without a backend
                setPoll({
                    "pollId": "1",
                    "question": "What is your favourite programming language?",
                    "options": [
                        { "optionId": "123", "text": "Java" },
                        { "optionId": "234", "text": "Python" },
                        { "optionId": "345", "text": "Scala" },
                        { "optionId": "456", "text": "Go" }
                    ]
                });
            } catch {
                setMessage('Error fetching poll.');
            } finally {
                setLoading(false);
            }
        };
        fetchPollData();
    }, [pollId]);

    const handleVote = async () => {
        if (!selectedOption) {
            setMessage('Please select an option.');
            return;
        }
        setSubmitting(true);
        try {
            const results = await submitVote(selectedOption);
            setVoteResults(results);
            setShowResults(true);
            setIsSubmitted(true);
            setMessage('Successfully submitted your vote!');
        } catch {
            setMessage('Error submitting vote.');
        } finally {
            setSubmitting(false);
        }
    };

    const totalVotes = voteResults.reduce((total, vote) => total + vote.votes, 0);

    if (loading) return <Spinner animation="border" variant="light" />;

    if (!poll) return <div>{message || 'Poll not found.'}</div>;

    return (
        <Container className="mt-7">
            <Row>
                <h1 className="text-center display-4">{poll.question}</h1>
                <Col md={9} className="mx-auto">
                    <Card className="shadow-lg rounded">
                        <Card.Body>
                            <ul className="options-list text-center">
                                {poll.options.map((option) => (
                                    <PollOption
                                        key={option.optionId}
                                        option={option}
                                        selectedOption={selectedOption}
                                        isSubmitted={isSubmitted}
                                        vote={voteResults.find((v) => v.optionId === option.optionId)}
                                        totalVotes={totalVotes}
                                        onSelect={setSelectedOption}
                                        showResults={showResults}
                                    />
                                ))}
                            </ul>
                            {!isSubmitted && (
                                <button
                                    className="vote-btn"
                                    onClick={handleVote}
                                    disabled={!selectedOption || submitting}
                                >
                                    {submitting ? 'Submitting...' : 'SUBMIT VOTE'}
                                </button>
                            )}
                            {message && <div className="mt-3 text-center text-muted">{message}</div>}
                            {/* Button to toggle CreatePoll component */}
                            <Button
                                variant="secondary"
                                onClick={() => setShowCreatePoll(!showCreatePoll)}
                                className="my-3"
                            >
                                {showCreatePoll ? 'Hide Create Poll' : 'Create a New Poll'}
                            </Button>
                            {showCreatePoll && <CreatePoll />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Poll;
