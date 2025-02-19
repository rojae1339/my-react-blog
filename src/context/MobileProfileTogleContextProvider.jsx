import {createContext, useContext, useState} from "react";

export const MenuTogleContext = createContext();

export const MobileProfileTogleContextProvider = ({children}) => {

    const [isMenuOpen, setIsMenuOpen] = useState()

    return (
        <MenuTogleContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
            {children}
        </MenuTogleContext.Provider>
    )
}

export const useMenuTogle = () => useContext(MenuTogleContext);