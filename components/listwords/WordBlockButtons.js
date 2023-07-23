import { ImLeaf } from "react-icons/im";
import { BsTagFill } from 'react-icons/bs';
import { actToggleFlag, actSetTagPopupState } from '@/store/actions';
import BespokeButton from "../BespokeButton";

import css from './WordBlockButtons.module.css'

const learnOffClass = 'badge-learn-filter-off';
const learnOnClass = 'badge-learn-filter-on';
const taggedOnClass = 'badge-tag-filter-on';
const taggedOffClass = 'badge-tag-filter-off';

function toggleClass(el, toggleClasses) {
    console.log('====> Called the toggleClass function', el, toggleClasses);
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

function tagButtonOn(tagButtonEl) {
    tagButtonEl.classList.remove(taggedOffClass)
    tagButtonEl.classList.add(taggedOnClass)
}

function tagButtonOff(tagButtonEl) {
    tagButtonEl.classList.remove(taggedOnClass);
    tagButtonEl.classList.add(taggedOffClass)
}

function WordBlockButtons({ wordObj, dispatch }) {
    var learnClass = wordObj.learn ? learnOnClass : learnOffClass;
    var tagClass = wordObj.tags && wordObj.tags.length > 0 ? taggedOnClass : taggedOffClass;

    function learnHandler(e) {
        const LEARN_FLAG = 'learn';
        let el = e.currentTarget;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        const data = el.dataset;
        const { learn, word } = data;
        dispatch(actToggleFlag(LEARN_FLAG, word));
        toggleClass(el, [learnOnClass, learnOffClass]);
    }

    function tagPopupHandler(e) {
        var el = e.currentTarget;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        const data = {
            word: el.dataset.word,
            tagButton: {
                on: tagButtonOn,
                off: tagButtonOff,
                el: el
            }
        };
        dispatch(actSetTagPopupState(data));
        //        toggleClass(el, [taggedOnClass, taggedOffClass]);
        e.stopPropagation();
    }

    const buttons = (<div className={css['word-block-buttons']}>
        <button className={'badge ' + learnClass} data-learn={wordObj.learn} data-word={wordObj.word} onClick={learnHandler}><BespokeButton buttonIcon={<ImLeaf />} label={'Learn'} /></button>
        <button className={'badge ' + tagClass} data-tagged={wordObj.tagged} data-word={wordObj.word} onClick={tagPopupHandler}><BespokeButton buttonIcon={<BsTagFill />} label={'Tag'} /></button>
    </div>);

    return buttons;
}

export default WordBlockButtons;
