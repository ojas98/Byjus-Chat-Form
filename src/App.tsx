
import React from 'react';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div
      style={{
        width: '428px',
        height: '841px',
        borderRadius: '20px',
        background: '#FFF',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: 'auto', 
        position: 'absolute',
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Chatbot />
    </div>
  );
};

export default App;
