import React, { useEffect, useMemo, useState } from 'react';

const useLazyLoad = (options, targetRef) => {
    const [isVisible, setIsVisible] = useState(false);

    const callbackIO = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackIO, optionsMemo);
        const currentTarget = targetRef.current;

        if (currentTarget) observer.observe(currentTarget);
        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);

    return isVisible;
};

export default useLazyLoad;
