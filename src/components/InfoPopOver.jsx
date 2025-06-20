import React, { useState, useRef, useEffect } from "react";

const InfoPopover = ({ 
  children, 
  content, 
  placement = "top", 
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
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (placement) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-gray-800";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-r-gray-800";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800";
    }
  };

  return (
    <div 
      className={`info-popover-container ${className}`}
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
        >
          <div className="bg-gray-800 text-white text-sm rounded-lg p-3 max-w-xs shadow-lg">
            <div className="relative">
              <div className={`absolute w-0 h-0 border-4 border-transparent ${getArrowClasses()}`}></div>
              <div className="whitespace-pre-wrap">
                {content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPopover;
