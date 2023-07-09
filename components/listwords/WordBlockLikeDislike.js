import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { FaShuffle } from 'react-icons/fa6';
import { actSetUnscrambleWord, actToggleFlag } from '@/store/actions';
import css from './WordBlockButtons.module.css'

const likeOffClass = 'badge-like-filter-off';
const likeOnClass = 'badge-like-filter-on';
const dislikeOffClass = 'badge-dislike-filter-off';
const dislikeOnClass = 'badge-dislike-filter-on';

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

function WordBlockLikeDislike({ wordObj, dispatch, router }) {
    var likeClass = wordObj.spotlight ? likeOnClass : likeOffClass;
    var dislikeClass = wordObj.dislike ? dislikeOnClass : dislikeOffClass;

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

    async function unscrambleHandler(e) {
        var el = e.currentTarget;
        if (!el.dataset.word) {
            el = el.parentNode;
        }
        const data = el.dataset;
        const unscrambleWord = data.word;
        dispatch(actSetUnscrambleWord(unscrambleWord));

        console.log('====> unscrambleHandler; just dispatched actSetUnscrambleWord()', unscrambleWord);
        /*
        await new Promise(resolve => {
            const handleRouteChange = (url) => {
                console.log('====> router change start');
                router.events.off('routeChangeStart', handleRouteChange);
            }

            router.events.on('routeChangeStart', handleRouteChange);
        })
        */
        router.push('/unscramble');

    }


    const buttons = (<div className={css['word-block-buttons']}>
        <button className={'badge ' + likeClass} data-liked={wordObj.spotlight} data-word={wordObj.word} onClick={thumbsUpHandler}><BiSolidLike /></button>
        <button className={'badge ' + dislikeClass} data-disliked={wordObj.dislike} data-word={wordObj.word} onClick={thumbsDownHandler}><BiSolidDislike /></button>
        <button className={'badge ' + dislikeClass} data-word={wordObj.word} onClick={unscrambleHandler}><FaShuffle /></button>
    </div>);

    return buttons;
}

export default WordBlockLikeDislike;