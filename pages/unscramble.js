import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import Scrambled from '@/components/Scrambled';
import WordMageLib from '@/utils/words-interface'

function Unscramble(props) {
    const { wordPool, custom, unscrambleWord } = props;

    return (
        <div>
            {unscrambleWord && <Scrambled unscrambled={unscrambleWord} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { wordPool, custom } = state;
    let { unscrambleWord } = state;
    if (false && !state.unscrambleWord) {
        const WM = WordMageLib();
        const unscrambleWordObj = WM.getUnscrambleItem(custom);
        unscrambleWord = unscrambleWordObj.word;
        console.log('====> Pick word to unscramble', unscrambleWord);
    }
    return {
        wordPool,
        custom,
        unscrambleWord
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Unscramble);