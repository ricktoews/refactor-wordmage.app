import { createContext, useContext, useState, useEffect } from "react";
import { useWordmage } from '@/utils/useWordmage';
import { useWordsCustom } from "@/utils/useWordMageCustom";

const WMContext = createContext();

export const WMContextProvider = ({ children }) => {
    const [appState, setAppState] = useState({ pool: [], menuState: false });
    const pool = useWordmage();
    const custom = useWordsCustom(4);

    useEffect(() => {
        const initialState = {
            menuState: false,
            pool,
            custom
        };
        setAppState(initialState);
    }, [pool, custom]);

    const toggleMenu = () => {
        appState.menuState = !appState.menuState;
        setAppState(appState);
        return appState.menuState;
    }

    const getWordPool = () => {
        return appState.pool;
    }

    const getCustom = () => {
        return appState.custom;
    }

    if (appState.pool.length > 0) {
        return (
            <WMContext.Provider value={{ appState, setAppState, toggleMenu, getCustom, getWordPool }}>
                {children}
            </WMContext.Provider>
        );
    }
    else {
        return null;
    }
};

export const useWMContext = () => useContext(WMContext);