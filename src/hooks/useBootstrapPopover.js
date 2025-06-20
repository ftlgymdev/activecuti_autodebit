import { useEffect, useRef } from 'react';

const useBootstrapPopover = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && window.bootstrap) {
      const popover = new window.bootstrap.Popover(elementRef.current, {
        trigger: 'hover',
        placement: 'top',
        html: true,
        ...options
      });

      return () => {
        if (popover) {
          popover.dispose();
        }
      };
    }
  }, [options]);

  return elementRef;
};

export default useBootstrapPopover; 