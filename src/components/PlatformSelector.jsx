// File: /src/components/PlatformSelector.js
import React from 'react';

function PlatformSelector({ selectedPlatform, setSelectedPlatform }) {
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'segment', name: 'Segment' },
    { id: 'mparticle', name: 'mParticle' },
    { id: 'lytics', name: 'Lytics' },
    { id: 'zeotap', name: 'Zeotap' }
  ];
  
  return (
    <div className="platform-selector">
      <span>Select platform:</span>
      <div className="platform-buttons">
        {platforms.map(platform => (
          <button
            key={platform.id}
            className={`platform-button ${selectedPlatform === platform.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlatform(platform.id)}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlatformSelector;