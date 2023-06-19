import { useState, useEffect } from 'react';
import axios from 'axios';
import WORDMAGE_ENDPOINT from '../config';

export function useWordmage() {
    const [wordPool, setWordPool] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${WORDMAGE_ENDPOINT}`);
                setWordPool(response.data);
            } catch (error) {
                console.error('Error fetching word pool:', error);
            }
        };

        if (wordPool.length === 0) {
            fetchData();
        }
    }, []);

    return wordPool;
}
