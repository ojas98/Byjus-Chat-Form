import React, { useState } from 'react';


import sendButtonImage from '../assets/Send.png';
import logo1 from '../assets/Logo.png';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
   
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

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
     
      <div
        style={{
          padding: '20px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
           <div style={{ textAlign: 'center', padding: '20px', zIndex: '0',}}>
        <img src={logo1} alt="Logo 1" style={{ width: '303px', height: '51.42px' }} />
      </div>

        <div style={{ overflowY: 'auto', flex: 1, color: 'black' }}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here..."
            style={{
              display: 'flex',
              width: '306px',
              height: '60px',
              padding: '0px 200px 0px 16px',
              alignItems: 'center',
              flexShrink: 0,
              borderRadius: '17px',
              background: '#FAFAFA',
              boxShadow: '3.766px 3.766px 7.532px 0px rgba(212, 192, 192, 0.25)',
              border: '1px solid #ccc', 
              boxSizing: 'border-box',
              color: 'black', 
              outline: 'none', 
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '17px',
              background: `url(${sendButtonImage}) center/cover no-repeat`,
              marginLeft: '10px',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
            }}
          />
        </div>
     
      </div>

    </div>
  );
};

export default Chatbot;
