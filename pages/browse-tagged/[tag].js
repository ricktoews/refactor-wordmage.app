import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WordMageLib from '@/utils/words-interface';
import WordBlockList from '../../components/listwords/WordBlockList';

const WM = WordMageLib();

function SearchFilterTagged(props) {
    const router = useRouter();
    const { tag } = router.query;
    const [browseList, setBrowseList] = useState([]);

    useEffect(() => {
        const fullWordObjList = WM.fullWordList(props.wordPool, props.custom);
        const filteredWordObjList = fullWordObjList.filter(obj => obj.tags && obj.tags.indexOf(tag) !== -1);
        setBrowseList(filteredWordObjList);
    }, [tag]);

    return (
        <div>
            <WordBlockList pool={browseList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterTagged);
