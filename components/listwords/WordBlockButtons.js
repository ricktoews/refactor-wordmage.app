import { useDispatch } from 'react-redux';
import WordMageLib from '../../utils/words-interface';
import { actToggleFlag, actSetTagPopupState } from '@/store/actions';

import css from './WordBlockButtons.module.css'

const likeOffClass = 'badge-like-filter-off';
const likeOnClass = 'badge-like-filter-on';
const dislikeOffClass = 'badge-dislike-filter-off';
const dislikeOnClass = 'badge-dislike-filter-on';
const learnOffClass = 'badge-learn-filter-off';
const learnOnClass = 'badge-learn-filter-on';
const taggedOnClass = 'badge-tag-filter-on';
const taggedOffClass = 'badge-tag-filter-off';

function toggleClass(el, toggleClasses) {
    let classes = Array.from(el.classList);
    if (classes.indexOf(toggleClasses[0]) !== -1) {
        el.classList.remove(toggleClasses[0])
        el.classList.add(toggleClasses[1])
    }
    else {
        el.classList.remove(toggleClasses[1])
        el.classList.add(toggleClasses[0])
    }
}

function WordBlockButtons(props) {
    //    const dispatch = useDispatch();
    const { wordObj, listType, popupTags, dispatch } = props;
    var buttons;
    var learnClass = wordObj.learn ? learnOnClass : learnOffClass;
    var likeClass = wordObj.spotlight ? likeOnClass : likeOffClass;
    var dislikeClass = wordObj.dislike ? dislikeOnClass : dislikeOffClass;
    var tagClass = wordObj.tags && wordObj.tags.length > 0 ? taggedOnClass : taggedOffClass;

    function thumbsUpHandler(e) {
        const LIKE_FLAG = 'spotlight';
        var el = e.target;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        var data = el.dataset;
        var { liked, word } = data;
        dispatch(actToggleFlag(LIKE_FLAG, word));
        toggleClass(el, [likeOnClass, likeOffClass]);
    }

    function learnHandler(e) {
        const LEARN_FLAG = 'learn';
        var el = e.target;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        var data = el.dataset;
        var { learn, word } = data;
        dispatch(actToggleFlag(LEARN_FLAG, word));
        toggleClass(el, [learnOnClass, learnOffClass]);
    }

    function thumbsDownHandler(e) {
        const MEH_FLAG = 'dislike';
        var el = e.target;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        var data = el.dataset;
        var { disliked, word } = data;
        dispatch(actToggleFlag(MEH_FLAG, word));
        toggleClass(el, [dislikeOnClass, dislikeOffClass]);
    }

    function tagPopupHandler(e) {
        var el = e.target;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        var data = el.dataset;
        dispatch(actSetTagPopupState(data));
        toggleClass(el, [taggedOnClass, taggedOffClass]);

        //        popupTags(wordObj, el);
        // Popup tag list.
    }

    switch (listType) {
        case 'liked':
            buttons = (<div className={css['word-block-buttons']}>
                <button className={'badge ' + learnClass} data-liked={wordObj.learn} data-word={wordObj.word} onClick={learnHandler}><i className="glyphicon glyphicon-leaf"></i> &nbsp;Learn</button>
                <button className={'badge ' + likeOnClass} data-liked={wordObj.spotlight} data-word={wordObj.word} onClick={thumbsUpHandler}><i className="glyphicon glyphicon-thumbs-up"></i> &nbsp;Like</button>
                <button className={'badge ' + tagClass} data-tagged={wordObj.tagged} data-word={wordObj.word} onClick={tagPopupHandler}><i className="glyphicon glyphicon-tag"></i> &nbsp;Tag</button>
            </div>);
            break;
        case 'learn':
            buttons = (<div className={css['word-block-buttons']}>
                <button className={'badge ' + learnClass} data-liked={wordObj.learn} data-word={wordObj.word} onClick={learnHandler}><i className="glyphicon glyphicon-leaf"></i> &nbsp;Learn</button>
                <button className={'badge ' + likeClass} data-liked={wordObj.spotlight} data-word={wordObj.word} onClick={thumbsUpHandler}><i className="glyphicon glyphicon-thumbs-up"></i> &nbsp;Like</button>
                <button className={'badge ' + dislikeClass} data-disliked={wordObj.dislike} data-word={wordObj.word} onClick={thumbsDownHandler}><i className="glyphicon glyphicon-thumbs-down"></i> &nbsp;Meh</button>
                <button className={'badge ' + tagClass} data-tagged={wordObj.tagged} data-word={wordObj.word} onClick={tagPopupHandler}><i className="glyphicon glyphicon-tag"></i> &nbsp;Tag</button>
            </div>);
            break;
        default:
            buttons = (<div className={css['word-block-buttons']}>
                <button className={'badge ' + learnClass} data-liked={wordObj.learn} data-word={wordObj.word} onClick={learnHandler}><i className="glyphicon glyphicon-leaf"></i> &nbsp;Learn</button>
                <button className={'badge ' + likeClass} data-liked={wordObj.spotlight} data-word={wordObj.word} onClick={thumbsUpHandler}><i className="glyphicon glyphicon-thumbs-up"></i> &nbsp;Like</button>
                <button className={'badge ' + dislikeClass} data-disliked={wordObj.dislike} data-word={wordObj.word} onClick={thumbsDownHandler}><i className="glyphicon glyphicon-thumbs-down"></i> &nbsp;Meh</button>
                <button className={'badge ' + tagClass} data-tagged={wordObj.tagged} data-word={wordObj.word} onClick={tagPopupHandler}><i className="glyphicon glyphicon-tag"></i> &nbsp;Tag</button>
            </div>);
    }

    return buttons;
}

export default WordBlockButtons;
