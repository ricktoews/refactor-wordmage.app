import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import WordBlockList from '../components/listwords/WordBlockList';
import { useWMContext } from '@/context/WMContext';
import WordMageLib from '@/utils/words-interface'

const LEARN_FLAG = 'learn';
function Learn(props) {
    const { wordPool, custom } = props;
    const [learnPool, setLearnPool] = useState([]);
    const WM = WordMageLib();

    useEffect(() => {
        const _learnPool = WM.getFlag(LEARN_FLAG, wordPool, custom);
        setLearnPool(_learnPool);
    }, [])


    return (
        <div>
            {learnPool.length > 0 ? (<WordBlockList pool={learnPool} />) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Learn);