import { useContext, useEffect, useState } from 'react'
import WordBlockList from '../components/listwords/WordBlockList';
import { useWMContext } from '@/context/WMContext';
import WordMageLib from '@/utils/words-interface'

export default function Random() {
    const { getWordPool } = useWMContext();
    const pool = getWordPool();
    const [randPool, setRandPool] = useState([]);
    const WM = WordMageLib();

    useEffect(() => {
        const _randPool = WM.getRandomPool(pool);
        setRandPool(_randPool);
    }, [pool])

    return (
        <div>
            {randPool.length > 0 ? (<WordBlockList pool={randPool} />) : null}
        </div>
    )
}

