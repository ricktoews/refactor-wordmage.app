import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WordMageLib from '@/utils/words-interface';
import WordBlockList from '../../components/listwords/WordBlockList';

const WM = WordMageLib();

function SearchFilterBrowse(props) {
    const router = useRouter();
    const { start } = router.query;
    const [browseList, setBrowseList] = useState([]);

    useEffect(() => {
        const fullWordObjList = WM.fullWordList(props.wordPool, props.custom);
        const startingPoint = getStartingPoint(fullWordObjList);
        setBrowseList(fullWordObjList.slice(startingPoint));
    }, [start]);

    const getStartingPoint = (wordList) => {
        const { start } = router.query;
        let ndx = -1;
        for (let i = 0; i < wordList.length && ndx === -1; i++) {
            if (wordList[i].word.toLowerCase().localeCompare(start) >= 0) {
                ndx = i;
            }
        }
        return ndx;
    }

    return (
        <div>
            <WordBlockList pool={browseList} start={start} />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        wordPool: state.wordPool,
        custom: state.custom
    }
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterBrowse);
