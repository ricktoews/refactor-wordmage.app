import css from './WordBlock.module.css';
import WordBlockButtons from '@/components/listwords/WordBlockButtons';

function WordBlock({ wordObj }) {
    console.log('====> WordBlock wordObj', wordObj);
    const { word, def, source } = wordObj;
    return (
        <div className={css['word-block']}>
            <div className={css['word-item-word']}>{word}</div>
            <div className={css['word-item-def-container']}>
                <div className={css['source-def-container']}>
                    <div className={css['word-item-def']}>{def}</div>
                    <span className={css['word-item-source']}>{source}</span>
                </div>
                <WordBlockButtons wordObj={wordObj} />
            </div>
        </div>
    );
}

export default WordBlock;
