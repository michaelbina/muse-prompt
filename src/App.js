import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [output, setOutput] = useState(null);
  const [mood, setMood] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePromptClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_GPT_API_DOMAIN}/creative-writing-prompt?mood=${mood}&topic=${topic}`
      );
      const data = response.data;
      setOutput(data);
    } catch (error) {
      console.error(error);
      setOutput(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Muse Prompt</h1>
      <div>
        <label htmlFor="mood">Mood:</label>
        <select
          id="mood"
          value={mood || ''}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Select mood...</option>
          <option value="Joyful">Joyful</option>
          <option value="Melancholic">Melancholic</option>
          <option value="Romantic">Romantic</option>
          <option value="Humorous">Humorous</option>
          <option value="Calm">Calm</option>
          <option value="Cheerful">Cheerful</option>
          <option value="Anxious">Anxious</option>
          <option value="Optimistic">Optimistic</option>
          <option value="Ominous">Ominous</option>
          <option value="Sentimental">Sentimental</option>
          <option value="Peaceful">Peaceful</option>
          <option value="Light-hearted">Light-hearted</option>
          <option value="Festive">Festive</option>
          <option value="Eerie">Eerie</option>
        </select>
      </div>
      <div>
        <label htmlFor="topic">Topic:</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <button onClick={handlePromptClick}>Give me a prompt</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : output ? (
        <div>
          <h2>Prompt:</h2>
          <div>
            <strong>Mood:</strong> {output.mood}
          </div>
          <div>
            <strong>Topic:</strong> {output.topic}
          </div>
          <div>
            <strong>Prompt:</strong> {output.prompt}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;