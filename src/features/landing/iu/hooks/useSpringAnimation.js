export const springConfig = {
    gentle: {
        type: 'spring',
        stiffness: 60,
        damping: 15,
        mass: 1
    },
    normal: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1
    },
    snappy: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 1
    },
    bounce: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 1
    }
};

export const useSpringAnimation = (config = 'normal') => {
    return springConfig[config] || springConfig.normal;
};
