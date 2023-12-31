import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import WordBlockList from '../components/listwords/WordBlockList';
import WordMageLib from '@/utils/words-interface'

function Random(props) {
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