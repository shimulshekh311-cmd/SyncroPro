import { useEffect, useState } from 'react';

const useTimer = (mode: 'stopwatch' | 'pomodoro', duration: number = 25) => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    const hapticFeedback = () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }
    };

    const resetTimer = () => {
        setTime(0);
        setIsActive(false);
        setIsPaused(false);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (mode === 'pomodoro' && prevTime >= duration * 60) {
                        hapticFeedback();
                        resetTimer();
                        return 0; // Reset after duration
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused, duration, mode]);

    return {
        time,
        isActive,
        isPaused,
        start: () => setIsActive(true),
        pause: () => setIsPaused(true),
        resume: () => setIsPaused(false),
        reset: resetTimer,
    };
};

export default useTimer;