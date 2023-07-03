import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import WordBlockList from '../components/listwords/WordBlockList';
import WordMageLib from '@/utils/words-interface'

const LIKE_FLAG = 'spotlight';
function Liked(props) {
    const { wordPool, custom } = props;
    const [likedPool, setLikedPool] = useState([]);
    const WM = WordMageLib();

    useEffect(() => {
        const _likedPool = WM.getFlag(LIKE_FLAG, wordPool, custom);
        setLikedPool(_likedPool);
    }, [])

    return (
        <div>
            {likedPool.length > 0 ? (<WordBlockList pool={likedPool} />) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Liked);