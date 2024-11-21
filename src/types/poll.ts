export interface PollData {
    pollId: string;
    question: string;
    options: PollOption[];
}

export interface PollOption {
    optionId: string;
    text: string;
}

export interface Vote {
    optionId: string;
    votes: number;
    percentage: number;
}

export interface NewPollData {
    question: string;
    options: string[];
}