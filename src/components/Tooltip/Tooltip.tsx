import React, { useState } from 'react';
import { TooltipProps } from './dto/tooltioDTO';
import'./tooltip.css';

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className="ToolTip absolute bg-gray-800 text-white rounded-md shadow-md z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
