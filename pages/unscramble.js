import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import Scrambled from '@/components/Scrambled';
import WordMageLib from '@/utils/words-interface'

function Unscramble(props) {
    const { wordPool, custom, unscrambleWord } = props;
    const WM = WordMageLib();

    return (
        <div>
            {unscrambleWord && <Scrambled unscrambled={unscrambleWord} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { wordPool, custom, unscrambleWord } = state;
    return {
        wordPool,
        custom,
        unscrambleWord
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Unscramble);