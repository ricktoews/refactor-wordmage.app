import { connect } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WordBlockList from '../components/listwords/WordBlockList';
import WordMageLib from '@/utils/words-interface'

function Random(props) {
    const router = useRouter();
    console.log("====> Random", router.query);
    const { wordPool, custom } = props;
    const [randPool, setRandPool] = useState([]);
    const WM = WordMageLib();

    useEffect(() => {
        const _randPool = WM.getRandomPool(wordPool, custom);
        setRandPool(_randPool);
    }, [])

    return (
        <div>
            {randPool.length > 0 ? (<WordBlockList pool={randPool} />) : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { wordPool, custom } = state;

    return {
        wordPool,
        custom
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Random);