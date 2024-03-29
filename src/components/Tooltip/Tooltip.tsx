import React, { useState, CSSProperties } from 'react';
import { TooltipProps } from './dto/tooltioDTO';
import'./tooltip.css';

interface ExtendedTooltipProps extends TooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  type?: 'SoldOut' 
}

const Tooltip: React.FC<ExtendedTooltipProps> = ({ text, children, position = 'bottom', type }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTooltipStyle = (): CSSProperties => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { top: '50%', right: '100%', transform: 'translateY(-50%)' };
      case 'right':
        return { top: '50%', left: '100%', transform: 'translateY(-50%)' };
      default:
        // 'top' position by default
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div className={`relative inline-block ${type ? 'tooltip__size': ''}`} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className={type ? 'TooltipBox' : ''}>
          {type && (
            <div className="triangle"></div>
          )}
          <div className={`ToolTip ${!type ? 'bg-gray-800 text-white' : 'bg-white text-dark SoldOut'} absolute rounded-md shadow-md z-10`} style={getTooltipStyle()}>
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
