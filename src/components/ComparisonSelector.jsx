import React from 'react';

function ComparisonSelector({ options, setOptions }) {
  const platforms = [
    { id: 'segment', name: 'Segment' },
    { id: 'mparticle', name: 'mParticle' },
    { id: 'lytics', name: 'Lytics' },
    { id: 'zeotap', name: 'Zeotap' }
  ];
  
  const handleChange = (cdpKey, value) => {
    setOptions({
      ...options,
      [cdpKey]: value
    });
  };
  
  return (
    <div className="comparison-selector">
      <div className="comparison-item">
        <label>First Platform:</label>
        <select 
          value={options.cdp1}
          onChange={(e) => handleChange('cdp1', e.target.value)}
        >
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
              </option>
          ))}
        </select>
      </div>
      
      <div className="vs-indicator">VS</div>
      
      <div className="comparison-item">
        <label>Second Platform:</label>
        <select 
          value={options.cdp2}
          onChange={(e) => handleChange('cdp2', e.target.value)}
        >
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ComparisonSelector;