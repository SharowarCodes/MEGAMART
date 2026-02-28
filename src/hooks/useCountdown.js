import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate) - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const getTimeString = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    
    if (days > 0) {
      return `${formatTime(days)}d ${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s`;
    } else if (hours > 0) {
      return `${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s`;
    } else {
      return `${formatTime(minutes)}m ${formatTime(seconds)}s`;
    }
  };

  return {
    timeLeft,
    isExpired,
    formatTime,
    getTimeString
  };
};
