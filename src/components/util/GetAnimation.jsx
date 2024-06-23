import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

const GetAnimation = ({animateIn, animateOnce=true, duration=0.5, children}) => {
    return <ScrollAnimation
        animateIn={animateIn}
        animateOnce={animateOnce}
        duration={duration}
    >
        {children}
    </ScrollAnimation>
}

export default GetAnimation;
