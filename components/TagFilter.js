import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Tag(props) {

    const handleTagClick = e => {
        props.tagClick(props.tag);
    }

    return (
        <div className="badge badge-tag" onClick={handleTagClick}>{props.tag}</div>
    );
}

function TagFilter(props) {
    const tagFilterState = useSelector(state => state.tagFilterState);
    const [tags, setTags] = useState(props.tagList);
    const tagListRef = useRef(null);

    // Show tag list
    useEffect(() => {
        toggleTagPopup(tagFilterState);
        setTags(props.tagList);
    }, [tagFilterState]);

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

    function tagClick(tag) {
        props.tagWord(props.wordObj, tag, true, true);
    }

    const handleTagFilterContainer = event => {
        event.stopPropagation();
    }

    return (
        <div ref={tagListRef} onClick={handleTagFilterContainer} className="clicked-word-container tag-list-popup element-hide">
            <div className="tag-list">
                <div className="instructions">Select tag for filtering.</div>
                <div className="tag-wrapper">
                    {tags.map((item, ndx) => {
                        return <Tag key={ndx} tag={item} tagClick={tagClick} />
                    })}
                </div>

            </div>
        </div>
    );
}

export default TagFilter;
