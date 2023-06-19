import { useState, useEffect } from 'react';
import axios from 'axios';
import WORDMAGE_ENDPOINT from '../config';

export function useWordsCustom(user_id) {
    const [wordsCustom, setWordsCustom] = useState([]);

    useEffect(() => {
        const initCustom = async () => {
            const data = {
                user_id
            };

            try {
                const custom = await axios.post(`${WORDMAGE_ENDPOINT}/loadcustom`, data);
                setWordsCustom(custom.data);
            } catch (error) {
                console.error('Error fetching custom data', error);
            }

        }

        initCustom();
    }, []);

    return wordsCustom;
}
