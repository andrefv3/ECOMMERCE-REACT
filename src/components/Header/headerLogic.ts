import { useEffect, useState } from "react";
import { headerDTO } from "./dto/headerDTO";

const useHeader = (props: headerDTO) => {
    const [scrolled, setScrolled] = useState(false);

    if(props.type === "main"){
        useEffect(() => {
            const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
            };
    
            window.addEventListener('scroll', handleScroll);
    
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    }

    return {
        scrolled
    }
}

export default useHeader;