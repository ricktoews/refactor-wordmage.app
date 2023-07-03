import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { actUpdateTags } from '@/store/actions';
import WordMageLib from '@/utils/words-interface';
import css from './TagList.module.scss'

const WM = WordMageLib();

function Tag(props) {
    const checkBoxRef = useRef(null);

    useEffect(() => {
        var checked = false;
        if (Array.isArray(props.wordTags)) {
            checked = props.wordTags.indexOf(props.label) !== -1 ? true : false;
        }

        checkBoxRef.current.checked = checked;
    });

    function handleCheckboxClick(e) {
        var el = e.target;
        props.tagClick(el, props.label);
    }

    return (
        <div><input ref={checkBoxRef} type="checkbox" onClick={handleCheckboxClick} data-tag={props.label} /> {props.label}</div>
    );
}

function TagList(props) {
    const [wordObj, setWordObj] = useState({});
    const [tags, setTags] = useState([]);
    const tagPopupState = useSelector(state => state.tagPopupState);
    const wordToBeTagged = useSelector(state => state.wordToBeTagged);
    const wordPool = useSelector(state => state.wordPool);
    const custom = useSelector(state => state.custom);
    const dispatch = useDispatch();

    useEffect(() => {
        const tagList = WM.getTagList(custom)
        setTags(tagList);
    }, [])

    useEffect(() => {
        if (wordToBeTagged) {
            const _wordObj = WM.getWordObj(wordToBeTagged, wordPool, custom);
            setWordObj(_wordObj);
        }
    }, [wordToBeTagged]);

    const [isAddTag, setIsAddTag] = useState(!!wordObj?.word);
    const newTagRef = useRef(null);
    const tagListRef = useRef(null);

    // Meant to focus on New Tag field.
    /*
    useEffect(() => {
        if (newTagRef.current) {
            newTagRef.current.focus();
        }
        if (newTagRef.current) {
            newTagRef.current.value = '';
        }
    }, [tagPopupState]);

    // Show tag list
    useEffect(() => {
        const tagList = WM.getTagList(custom)

        toggleTagPopup(props.showTags);
        setTags(tagList);
        setIsAddTag(!!wordObj?.word);
    }, [tagPopupState]);


    useEffect(() => {
        props.tagListEl(tagListRef);
    }, []);

    function toggleTagPopup(showPopup) {
        if (tagListRef.current) {
            if (showPopup) {
                tagListRef.current.classList.remove('element-hide');
                tagListRef.current.classList.add('element-show');
            }
            else {
                tagListRef.current.classList.remove('element-show');
                tagListRef.current.classList.add('element-hide');
            }
        }
    }
*/
    function tagWord(wordObj, tag, add, closeTagList) {
        if (Array.isArray(wordObj.tags) === false) { wordObj.tags = []; }
        if (tag) {
            let ndx = wordObj.tags.indexOf(tag);
            if (add) {
                if (ndx === -1) {
                    wordObj.tags.push(tag);
                    // highlight Tag button
                    //                tagToggle.classList.remove(taggedOffClass);
                    //                tagToggle.classList.add(taggedOnClass);
                }
            }
            else {
                wordObj.tags.splice(ndx, 1);
                // unhighlight Tag button
                console.log('wordObj.tags', wordObj.tags);
                if (wordObj.tags.length === 0) {
                    //                tagToggle.classList.remove(taggedOnClass);
                    //                tagToggle.classList.add(taggedOffClass);
                }
            }
        }
        dispatch(actUpdateTags(wordObj));
        /*
        WM.updateTags(wordObj, custom);
        if (closeTagList) {
            setShowTags(false);
            console.log('getTagList', WordsInterface.getTagList());
            setTagList(WordsInterface.getTagList());
        }
        */
    }

    function handleCheckClick(e) {
        if (newTagRef.current) {
            var newTag = newTagRef.current.value;
            props.tagWord(wordObj, newTag, true, true);
        }
        else {
            props.tagWord(wordObj, '', false, true);
        }
    }

    function handleClickCancel(e) {
        props.closeTagPopup();
    }

    function handleTagClick(el, tag) {
        tagWord(wordObj, tag, el.checked, !isAddTag);
    }

    let popupClasses = css['clicked-word-container'];
    popupClasses += ` ${css['tag-list-popup']}`;
    if (tagPopupState) {
        popupClasses += ` ${css['element-show']}`;
    } else {
        popupClasses += ` ${css['element-hide']}`;
    }

    return (
        <div ref={tagListRef} className={popupClasses}>
            <div className="word-item-word">{wordToBeTagged}</div>
            <div className="tag-list">
                <div className="instructions">Select one or more tags to associate with this word.</div>
                <div className="tag-wrapper">
                    {tags ? tags.map((item, ndx) => {
                        return <Tag key={ndx} label={item} wordTags={wordObj.tags} tagClick={handleTagClick} />
                    }) : null}
                </div>

                <div className="instructions">To use a new tag, enter it here.</div>
                {isAddTag ? (<div className="tag-wrapper">
                    <div><input ref={newTagRef} type="text" placeholder="New Tag" /></div>
                    <hr />
                </div>) : null}

            </div>

            {isAddTag ? (
                <div className="tag-list-button-wrapper">
                    <div className="badge tag-button tag-button-cancel" onClick={handleClickCancel}><i className="glyphicon glyphicon-remove"></i> Cancel</div>
                    <div className="badge tag-button" onClick={handleCheckClick}><i className="glyphicon glyphicon-ok"></i> Save</div>
                </div>
            ) : null}

        </div>
    );
}

export default TagList;
