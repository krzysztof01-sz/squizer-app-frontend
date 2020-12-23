import { useEffect, useState } from 'react';
import './styles.scss';

const Slider = ({ imagesLength, children }) => {
  const [imageID, setImageID] = useState(0);
  const intervalTime = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageID(imageID + 1);
      if (imageID === imagesLength - 1) setImageID(0);
    }, intervalTime);
    return () => clearInterval(interval);
  });

  return children(imageID, setImageID);
};

export default Slider;
