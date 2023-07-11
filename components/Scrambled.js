import { useEffect, useState } from 'react';
import { scramble } from '@/utils/scramble';
import { RxReset } from 'react-icons/rx';
import css from './Scrambled.module.scss';

function initLetters(scrambled) {
    var letterStates = [];
    var letters = scrambled.split('');
    letters.forEach(l => {
        letterStates.push({ [l]: false });
    });
    return letterStates;
}

function Scrambled(props) {
    console.log('====> Scrambled props', props);
    const [scrambled, setScrambled] = useState(scramble(props.unscrambled));
    const [letterStates, setLetterStates] = useState(initLetters(scrambled));
    const [unscrambled, setUnscrambled] = useState('');
    const [finished, setFinished] = useState(false);
    const [showWord, setShowWord] = useState(false);

    useEffect(() => {
        let newScrambled = scramble(props.unscrambled);
        setScrambled(newScrambled);
        setLetterStates(initLetters(newScrambled));
        setUnscrambled('');
        setFinished(false);
    }, [props.unscrambled]);

    const selectLetter = e => {
        var el = e.target;
        var letter = el.textContent;
        var ndx = el.dataset.ndx;
        var letterStatesClone = Object.assign({}, letterStates);
        if (letterStatesClone[ndx][letter]) {
            letterStatesClone[ndx][letter] = !letterStatesClone[ndx][letter];
            setLetterStates(letterStatesClone);
            let letterNdx = unscrambled.lastIndexOf(letter);
            setUnscrambled(unscrambled.substr(0, letterNdx) + unscrambled.substr(letterNdx + 1));
        } else {
            letterStatesClone[ndx][letter] = !letterStatesClone[ndx][letter];
            setLetterStates(letterStatesClone);
            setUnscrambled(unscrambled + letter);
            if (unscrambled + letter === props.unscrambled) {
                setFinished(true);
                setShowWord(false);
            }
        }
    };

    const handleRefresh = e => {
        setLetterStates(initLetters(props.unscrambled));
        setFinished(false);
        setUnscrambled('');
        setScrambled(scramble(props.unscrambled));
    };

    const handleHint = e => {
        const ndx = unscrambled.length;
        const nextLetter = props.unscrambled[ndx];
        const position = scrambled.split('').indexOf(nextLetter);
        const els = Array.from(document.querySelectorAll('.scrambled-word span'));
        els.forEach(el => {
            if (el.dataset.ndx == position) {
                el.classList.add(css['hinted']);
            }
        });
    }

    const handleShowWord = e => {
        setShowWord(true);
    }

    const scrambledClass = finished ? `${css['scrambled']} ${css['finished']}` : css['scrambled'];
    return (
        <div className={css["scrambled-wrapper"]}>

            <div className={css["word-scramble-buttons"]}>
                <button className={'badge badge-scramble' + (props.finished ? ' hide-section' : '')} onClick={handleRefresh}><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                <div className={css["scramble-hint"]}>
                    <button className={'badge badge-scramble' + (props.finished ? ' hide-section' : '')} onClick={handleHint}><i className="glyphicon glyphicon-question-sign"></i> Hint</button>
                    <button className={'badge badge-scramble' + (props.finished ? ' hide-section' : '')} onClick={handleShowWord}><i className="glyphicon glyphicon-info-sign"></i> Show Word</button>
                </div>
            </div>

            {showWord ? (<div className={css["show-word"]}>
                {props.unscrambled.split('').map((letter, key) => <span key={key}>{letter}</span>)}
            </div>) : null}

            <div className={'scrambled-word ' + scrambledClass}>
                {scrambled.split('').map((letter, key) => {
                    const letterClass = letterStates[key][letter] ? `${css['letter']} ${css['selected']}` : css['letter'];
                    return <span key={key} onClick={selectLetter} data-ndx={key} className={letterClass}>{letter}</span>;
                })}
            </div>
            <div className={css['unscrambled']}>
                {unscrambled.split('').map((letter, key) => <span key={key}>{letter}</span>)}
            </div>
        </div>
    );

}

export default Scrambled;
