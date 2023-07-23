import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useContext } from 'react';
import { BsTagFill } from 'react-icons/bs';
import { MdRemoveCircle } from 'react-icons/md';
import { actSetTagFilterState } from '@/store/actions';
import BespokeButton from './BespokeButton';
//import { WordMageContext } from '../WordMageContext';
import WordMageLib from '../utils/words-interface';
import TagFilter from './TagFilter';

const WM = WordMageLib();
function SearchFilter(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const tagFilterState = useSelector(state => state.tagFilterState);
    //const { contextValue, setContextValue } = useContext(WordMageContext);

    const [startingLetters, setStartingLetters] = useState('');
    const [startingNdx, setStartingNdx] = useState(0);
    const [browseMode, setBrowseMode] = useState('built-in');
    const [tagList, setTagList] = useState([]);
    const [tagFilter, setTagFilter] = useState('');
    const tagFilterRef = useRef(null);

    useEffect(() => {
        setTagList(WM.getTagList(props.custom));
    }, []);

    function tagSelection(discard, tag, checked, closeTagList) {
        console.log('tagSelection', tag, checked, closeTagList);
        setTagFilter(tag);
        window.scrollTo(0, 0);
        router.push(`/browse-tagged/${tag}`);

        if (closeTagList) {
            dispatch(actSetTagFilterState(false));
        }
    }

    var partialWordTimer;
    const handlePartialWord = e => {
        var el = e.target;
        var partial = el.value.toLowerCase();
        if (partialWordTimer) {
            clearTimeout(partialWordTimer);
        }
        partialWordTimer = setTimeout(() => {
            window.scrollTo(0, 0);
            router.push(`/browse/${partial}`);
        }, 1000);
    };

    const handleCancelTagFilter = e => {
        setTagFilter('');
        router.push('/');
        //        setWordObjList(fullWordObjList);
    }

    const handleTagFilter = e => {
        dispatch(actSetTagFilterState(!tagFilterState));
        e.stopPropagation();
    }

    const customFilterClass = browseMode === 'custom' ? 'badge-custom-filter' : 'badge-custom-filter-off';

    const tagListEl = ref => {
        let el = ref.current;
        let classes = Array.from(el.classList);
        let isPopupActive = classes.indexOf('element-hide') === -1;
        if (isPopupActive) {
            console.log('Should hide popup');
        }
    }

    return (
        <div className="browse-container">
            <div className="search-filter-tools">
                <div style={{ display: 'none', background: 'gray' }}>Hello, world!</div>

                {/* Word search field */}
                <input type="text" autoCapitalize="off" className="partial-word" onChange={handlePartialWord} placeholder="Jump to" />

                {/* Tag filtering UI: Selected tag, tag selection button */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {tagFilter ? (<div style={{ margin: '0 5px' }}>
                        <div onClick={handleCancelTagFilter} className='badge-like-filter-off'><BespokeButton buttonIcon={<MdRemoveCircle />} /></div>
                    </div>) : <div></div>}
                    <div className='tag-filter-word'>{tagFilter}</div>
                    <div style={{ margin: '0 5px' }}><button className={'badge ' + customFilterClass} onClick={handleTagFilter}><BespokeButton buttonIcon={<BsTagFill />} /></button></div>
                </div>
            </div>

            <div ref={tagFilterRef}> {/* Wrap Tag Filter in a div, for checking document click outside. */}
                <TagFilter tagListEl={tagListEl} tagList={tagList} tagWord={tagSelection} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { wordPool, custom } = state;
    return {
        custom
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);