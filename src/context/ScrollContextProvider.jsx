import { createContext, useContext, useState, useEffect } from "react";

const ScrollContext = createContext();

export const ScrollContextProvider = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ScrollContext.Provider value={{ isScrolled }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useSearchBar = () => useContext(ScrollContext);
