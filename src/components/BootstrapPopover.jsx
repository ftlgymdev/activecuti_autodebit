import React from 'react';
import useBootstrapPopover from '../hooks/useBootstrapPopover';

const BootstrapPopover = ({ 
  children, 
  content, 
  placement = "top", 
  trigger = "hover",
  className = "",
  ...props 
}) => {
  const popoverRef = useBootstrapPopover({
    content: content,
    placement: placement,
    trigger: trigger,
    html: true
  });

  return (
    <span
      ref={popoverRef}
      className={`info-icon ${className} `}
      data-bs-toggle="popover"
      data-bs-content={content}
      data-bs-placement={placement}
      data-bs-trigger={trigger}
      {...props}
    >
      {children}
    </span>
  );
};

export default BootstrapPopover; 