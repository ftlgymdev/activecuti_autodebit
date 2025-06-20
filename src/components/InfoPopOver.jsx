import React, { useState, useRef, useEffect } from "react";

const InfoPopover = ({ 
  children, 
  content, 
  placement = "right", 
  className = "",
  trigger = "hover"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      setIsVisible(!isVisible);
    }
  };

  const getPlacementClasses = () => {
    switch (placement) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-3";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-3";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-3";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-3";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-3";
    }
  };

  const getArrowClasses = () => {
    switch (placement) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 border-t-gray-800";
      case "bottom":
        return "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800";
      case "left":
        return "left-full top-1/2 -translate-y-1/2 border-l-gray-800";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 border-r-gray-800";
      default:
        return "top-full left-1/2 -translate-x-1/2 border-t-gray-800";
    }
  };

  return (
    <div 
      className={`relative inline-block align-middle ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={triggerRef}
        onClick={handleClick}
        className="info-button"
      >
        {children}
      </span>
      
      {isVisible && (
        <div
          ref={popoverRef}
          className={`absolute z-50 ${getPlacementClasses()}`}
          style={{
            background: 'rgba(40, 40, 40, 0.8)',
            backdropFilter: 'blur(5px)',
            color: '#e5e7eb',
            width: 'max-content',
            maxWidth: '280px',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'left'
          }}
        >
          <div 
            className={`absolute w-0 h-0 border-8 border-transparent ${getArrowClasses()}`}
            style={{ 
              borderTopColor: placement === 'top' ? 'rgba(40, 40, 40, 0.8)' : 'transparent',
              borderBottomColor: placement === 'bottom' ? 'rgba(40, 40, 40, 0.8)' : 'transparent',
              borderLeftColor: placement === 'left' ? 'rgba(40, 40, 40, 0.8)' : 'transparent',
              borderRightColor: placement === 'right' ? 'rgba(40, 40, 40, 0.8)' : 'transparent',
            }}
          />
          <div className="relative">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPopover;
