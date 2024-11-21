import React from "react";
import Poll from "./components/Poll";
import './App.css'


const App: React.FC = () => {
    const pollId1 = 'poll-1'; // Get this via a variable somewhere

    return (
        <div className="App">
            <Poll pollId={pollId1} />
        </div>
    );
};

export default App;