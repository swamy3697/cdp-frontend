import React from 'react';

function LoadingIndicator() {
  return (
    <div className="message bot-message">
      <div className="message-avatar">🤖</div>
      <div className="message-content loading-content">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;