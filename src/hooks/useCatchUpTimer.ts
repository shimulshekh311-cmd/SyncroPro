import { useEffect, useState } from 'react';

const useCatchUpTimer = (duration: number) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const savedTime = localStorage.getItem('timeLeft');
        const savedIsRunning = localStorage.getItem('isRunning');
        const savedEndTime = localStorage.getItem('endTime');

        if (savedTime) {
            setTimeLeft(JSON.parse(savedTime));
        }
        if (savedIsRunning) {
            setIsRunning(JSON.parse(savedIsRunning));
        }

        // Calculate time left if timer was running before app closure
        if (savedEndTime) {
            const endTime = JSON.parse(savedEndTime);
            const remaining = endTime - Date.now();
            if (remaining > 0) {
                setTimeLeft(remaining);
                setIsRunning(true);
            } else {
                setTimeLeft(0);
                setIsRunning(false);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('timeLeft', JSON.stringify(timeLeft));
        localStorage.setItem('isRunning', JSON.stringify(isRunning));
        if (isRunning) {
            const endTime = Date.now() + timeLeft;
            localStorage.setItem('endTime', JSON.stringify(endTime));
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1000) {
                        clearInterval(timer);
                        setIsRunning(false);
                        localStorage.removeItem('endTime');
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    return { timeLeft, isRunning, startTimer, stopTimer };
};

export default useCatchUpTimer;
