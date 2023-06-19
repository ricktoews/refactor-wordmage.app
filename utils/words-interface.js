import { cloneJSON } from './helpers';
import { useWMContext } from '@/context/WMContext';
import DataSource from './data-source';
import { CONFIG } from '@/config';

function WordMageLib() {
    const { getCustom, getWordPool } = useWMContext();
    const userData = { custom: [] };

    const WORD_POOL = [];

    function initializeCustom(custom) {
        userData.custom = custom;
    }

    function initialize(pool = []) {
        WORD_POOL.push(...pool);
    }


    /**
     * Sort word objects by word
     */
    function sortWordObj(a, b) {
        var result = 0;
        var aWord = a.word.toLowerCase();
        var bWord = b.word.toLowerCase();
        // localeCompare() takes care of accents.
        return a.word.localeCompare(b.word);
    }


    function separateDisliked(list) {
        var dislikedList = list.filter(wordObj => wordObj.dislike);
        var notDislikedList = list.filter(wordObj => !wordObj.dislike);
        return [notDislikedList, dislikedList];
    }


    /**
     * Full List is in { word: def } format.
     * We might want to return array instead.
     */
    function fullWordList(wordPool) {
        var universal = cloneJSON(wordPool);
        var custom = getCustom();
        var revisedCustom = [];
        custom.forEach(wordObj => {
            let ndx = universal.findIndex(item => item.word === wordObj.word);
            if (ndx === -1) {
                wordObj.myown = true;
                revisedCustom.push(wordObj);
            } else {
                universal[ndx]._id = wordObj._id;
                // Check for customized definition. Flag Word obj.
                if (wordObj.def !== universal[ndx].def) {
                    wordObj.def = universal[ndx].def;
                }
                // Fill in source.
                if (!wordObj.source) {
                    wordObj.source = universal[ndx].source;
                }
                universal[ndx].tags = wordObj.tags;
                universal[ndx].spotlight = wordObj.spotlight;
                universal[ndx].dislike = wordObj.dislike;
                universal[ndx].learn = wordObj.learn;
            }
        });
        var [notDislikedList, dislikedList] = separateDisliked(universal);
        universal = notDislikedList;
        var fullList = [...revisedCustom, ...notDislikedList].sort(sortWordObj);
        fullList = [...fullList, { divider: true }, ...dislikedList];
        return fullList;
    }

    /**
     *
     */
    const POOL_SIZE = 20;
    function getRandomPool(wordPool = []) {
        const randomPool = [];
        if (wordPool.length === 0) return randomPool;

        var wordList = fullWordList(wordPool);
        var fullListClone = wordList.slice(0);
        var [notDislikedList, dislikedList] = separateDisliked(fullListClone);
        fullListClone = notDislikedList;
        for (let i = 0; i < POOL_SIZE; i++) {
            let ndx = Math.floor(Math.random() * fullListClone.length);
            randomPool.push(fullListClone[ndx]);
            fullListClone = fullListClone.filter((item, n) => n !== ndx);
        }
        return randomPool;
    }

    return {
        initialize,
        fullWordList,
        getRandomPool
    }

}

export default WordMageLib;