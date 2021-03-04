import { useEffect, useState } from 'react';

const useDisableBodyScroll = () => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [disabled]);

  const modalChanges = (show) => {
    if (show) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return modalChanges;
};

export default useDisableBodyScroll;
