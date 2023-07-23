import css from './WordBlock.module.css';
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

function WordBlock({ wordObj, dispatch, router, customState }) {
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
