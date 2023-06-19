// WMContextProvider.js
import React, { useState } from 'react';
import WMContext from './WMContext';

const WMContextProvider = ({ children }) => {
    const initialState = {
        menuState: false,
        pool: []
    };
    const [state, setState] = useState(initialState);

    const updateState = (newState) => {
        setState(newState);
    };

    return (
        <WMContext.Provider value={{ state, updateState }}>
            {children}
        </WMContext.Provider>
    );
};

export default WMContextProvider;
