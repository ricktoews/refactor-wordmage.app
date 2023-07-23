import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import WordBlockList from '../components/listwords/WordBlockList';
import WordMageLib from '@/utils/words-interface'

const CUSTOM_FLAG = 'custom';
function CustomWords(props) {
    const { wordPool, custom } = props;
    const [customPool, setCustomPool] = useState([]);
    const WM = WordMageLib();

    useEffect(() => {
        const _customPool = custom.filter(item => item.def);
        setCustomPool(_customPool);
    }, [])

    return (
        <div>
            {customPool.length > 0 ? (<WordBlockList pool={customPool} />) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomWords);