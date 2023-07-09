import css from './WordBlock.module.css';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import WordBlockButtons from '@/components/listwords/WordBlockButtons';
import WordBlockLikeDislike from './WordBlockLikeDislike';
import { actSetWordFormState } from '@/store/actions';

function Word({ wordObj, dispatch }) {
    const { word, myown } = wordObj;

    function handleEditClick(event) {
        dispatch(actSetWordFormState(true));
    }
    return (
        <div className={css['word-item-word']}>
            {word}
            {myown && <BsFillPencilFill onClick={handleEditClick} className={css['icon']} />}
        </div>
    )
}


const likeOffClass = 'badge-like-filter-off';
const likeOnClass = 'badge-like-filter-on';
const dislikeOffClass = 'badge-dislike-filter-off';
const dislikeOnClass = 'badge-dislike-filter-on';

function WordBlock({ wordObj, dispatch, router }) {
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


    const { def, source } = wordObj;
    return (
        <div className={css['word-block']}>
            <Word wordObj={wordObj} dispatch={dispatch} />
            <div className={css['word-item-def-container']}>
                <div className={css['source-def-container']}>
                    <div className={css['word-item-def']}>{def}</div>
                    <span className={css['word-item-source']}>{source}</span>
                </div>
                <div className="flex justify-between">
                    <WordBlockLikeDislike wordObj={wordObj} dispatch={dispatch} router={router} />
                    <WordBlockButtons wordObj={wordObj} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
}

export default WordBlock;
