import axios from 'axios';
import {NewPollData} from "../types/poll";

const API_BASE_URL = 'https://api-base-url.amazonaws.com';

export const submitNewPoll = async (pollData: NewPollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/poll/create`, pollData);
        return response.data; // Poll submission response from your API
    } catch (error) {
        console.error('Error submitting new poll:', error);
        throw new Error('Failed to submit the poll.');
    }
};


// Fetch a poll by its ID
export const fetchPoll = async (pollId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/poll?pollId=${pollId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching poll:', error);
        throw error;
    }
};

// Submit a vote for a poll
export const submitVote = async (optionId: string) => {
    try {
        // const response = await axios.post(`${API_BASE_URL}/poll/vote/`, {'optionId': optionId});
        // return response.data;
        // TODO Comment above and uncomment below for rendering using npm start without a backend
        return [
            {
                "optionId": "123",
                "votes": 120,
                "percentage": 30.0
            },
            {
                "optionId": "234",
                "votes": 200,
                "percentage": 50.0
            },
            {
                "optionId": "345",
                "votes": 40,
                "percentage": 20.0
            },
            {
                "optionId": "456",
                "votes": 40,
                "percentage": 10.0
            }
        ]
    } catch (error) {
        console.error('Error submitting vote:', error);
        throw error;
    }
};