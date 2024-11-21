import React, { useState } from 'react';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import {submitNewPoll} from "../utils/api";

const CreatePoll: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '']); // Initialize with two empty options
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddOption = () => {
        if (options.length < 7) {
            setOptions([...options, '']);
        }
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 2) {
            const updatedOptions = options.filter((_, i) => i !== index);
            setOptions(updatedOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = options.map((option, i) => i === index ? value : option);
        setOptions(updatedOptions);
    };

    const handleSubmit = async () => {
        if (!question.trim()) {
            setError('Poll question cannot be empty.');
            return;
        }
        if (options.filter(option => option.trim()).length < 2) {
            setError('Poll must have at least 2 options.');
            return;
        }
        if (options.filter(option => option.trim()).length > 7) {
            setError('Poll can only have max 7 options.');
            return;
        }
        setError('');

        const newPollData = {
            question,
            options
        };

        setLoading(true);
        try {
            await submitNewPoll(newPollData); // Submit poll data using the helper method
            alert('Poll created successfully!');
        } catch (error) {
            setError('Failed to create the poll. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-2">
            <h1 className="text-center display-6">Create a New Poll</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group controlId="pollQuestion">
                    <Form.Label className={"text-white"}>Poll Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter poll question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </Form.Group>
                <Form.Label className={"text-white mt-4"}>Options</Form.Label>
                {options.map((option, index) => (
                    <div className="d-flex justify-content-between align-items-center mb-2" key={index}>
                        <Form.Control
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <Button
                            variant="danger"
                            onClick={() => handleRemoveOption(index)}
                            disabled={options.length <= 2}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <div className="d-flex justify-content-between">
                    <Button
                        variant="secondary"
                        onClick={handleAddOption}
                        disabled={options.length >= 7}
                    >
                        Add Option
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="ml-2"
                        disabled={loading}
                    >
                        {loading ? 'Creating Poll...' : 'Create Poll'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CreatePoll;
