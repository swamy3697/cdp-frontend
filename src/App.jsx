import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './components/Message';
import PlatformSelector from './components/PlatformSelector';
import LoadingIndicator from './components/LoadingIndicator';
import ComparisonSelector from './components/ComparisonSelector';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareOptions, setCompareOptions] = useState({
    cdp1: 'segment',
    cdp2: 'mparticle',
  });
  const [docsStatus, setDocsStatus] = useState({});
  const [isInitializing, setIsInitializing] = useState(true);
  
  const messagesEndRef = useRef(null);

  // Check backend status on initial load
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/status');
        const data = await response.json();
        
        setDocsStatus(data.data);
        
        // Check if any platform hasn't been indexed
        const needsScraping = Object.values(data.data).some(status => !status);
        
        if (needsScraping) {
          setMessages([
            {
              type: 'system',
              text: 'Initializing the knowledge base. This may take a few minutes...'
            }
          ]);
          
          // Trigger scraping
          await fetch('http://localhost:5000/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          setMessages(prev => [...prev, {
            type: 'system',
            text: 'Knowledge base initialized! You can now ask questions about Segment, mParticle, Lytics, and Zeotap.'
          }]);
        } else {
          setMessages([
            {
              type: 'system',
              text: 'Welcome to the CDP Support Agent! Ask me how-to questions about Segment, mParticle, Lytics, or Zeotap.'
            }
          ]);
        }
        
        setIsInitializing(false);
      } catch (error) {
        console.error('Error checking status:', error);
        setMessages([
          {
            type: 'system',
            text: 'Unable to connect to the backend service. Please make sure the server is running.'
          }
        ]);
        setIsInitializing(false);
      }
    };
    
    checkStatus();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);
    
    try {
      let endpoint = 'search';
      let payload = {
        query: userMessage,
        platform: selectedPlatform
      };
      
      if (isCompareMode) {
        endpoint = 'compare';
        payload = {
          query: userMessage,
          cdp1: compareOptions.cdp1,
          cdp2: compareOptions.cdp2
        };
      }
      
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.response,
          platform: selectedPlatform !== 'all' ? selectedPlatform : null
        }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: 'Sorry, I encountered an error while processing your request. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I encountered an error connecting to the server. Please check your connection and try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CDP Support Agent</h1>
        <div className="mode-selector">
          <button 
            className={`mode-button ${!isCompareMode ? 'active' : ''}`}
            onClick={() => setIsCompareMode(false)}
          >
            Single Platform
          </button>
          <button 
            className={`mode-button ${isCompareMode ? 'active' : ''}`}
            onClick={() => setIsCompareMode(true)}
          >
            Compare Platforms
          </button>
        </div>
      </header>
      
      <div className="platform-selector-container">
        {isCompareMode ? (
          <ComparisonSelector
            options={compareOptions}
            setOptions={setCompareOptions}
          />
        ) : (
          <PlatformSelector
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        )}
      </div>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="input-container" onSubmit={handleSendMessage}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isInitializing ? "Initializing knowledge base..." : "Ask a question about CDP platforms..."}
            disabled={isInitializing}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading || isInitializing}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;