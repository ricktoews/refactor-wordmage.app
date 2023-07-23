import { cloneJSON } from './helpers';
import DataSource from './data-source';

function WordMageLib() {
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
    function fullWordList(wordPool, custom) {
        var universal = cloneJSON(wordPool);
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
    function getRandomPool(wordPool, custom) {
        const randomPool = [];

        var wordList = fullWordList(wordPool, custom);
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

    function addCustomWord(newWordObj, newCustomList) {
        const idList = newCustomList.map(item => item._id);
        const maxId = idList.length ? Math.max(...idList) : 0;
        const newId = maxId + 1;
        const wordObj = {
            _id: newId,
            word: newWordObj.word,
            def: newWordObj.def,
            source: newWordObj.source,
            spotlight: newWordObj.spotlight,
            dislike: newWordObj.dislike,
            learn: newWordObj.learn
        };
        if (newWordObj.myown) {
            wordObj.myown = true;
        }
        newCustomList.push(wordObj);
    }


    function getFlag(flag, wordPool, custom) {
        const wordList = fullWordList(wordPool, custom);
        const [notDislikedList, dislikedList] = separateDisliked(wordList.slice(0));
        const flagSubset = notDislikedList.filter(item => item[flag]);
        return flagSubset;

    }
    /**
     * Toggle flag status for specified word.
     */
    function toggleFlag(flag, word, state) {
        const { wordPool, custom } = state;
        const newCustomList = [...custom];
        var wordObjIndex = newCustomList.findIndex(item => item.word === word);
        if (wordObjIndex === -1) {
            const builtInWord = cloneJSON(wordPool.find(item => item.word === word));
            addCustomWord(builtInWord, newCustomList);
            wordObjIndex = newCustomList.findIndex(item => item.word === word);
        }
        const wordObj = newCustomList[wordObjIndex];
        wordObj[flag] = !wordObj[flag];
        DataSource.saveUserData(newCustomList);
        return newCustomList;
    }

    /**
     * Make list of tags by compiling from word list.
     */
    function getTagList(custom) {
        const taggedWords = custom.filter(item => item.tags && Array.isArray(item.tags));
        let tags = taggedWords.map(item => item.tags);
        tags = [].concat(...tags);
        tags = Array.from(new Set(tags));
        return tags;
    }


    function getWordObj(word, wordPool, custom) {
        // Make copy of custom list, and search for the word in it.
        const newCustomList = [...custom];
        var wordObjIndex = newCustomList.findIndex(item => item.word === word);
        // If word not in custom list, find it in built-in list, and add it to custom list.
        if (wordObjIndex === -1) {
            const builtInWord = cloneJSON(wordPool.find(item => item.word === word));
            addCustomWord(builtInWord, newCustomList);
            wordObjIndex = newCustomList.findIndex(item => item.word === word);
        }
        // wordObjIndex is now index of wordObj in new custom list.
        const wordObj = newCustomList[wordObjIndex];
        return wordObj;
    }


    /**
     * Get list of Spotlight words.
     */
    function getLearnList(custom) {
        const learnList = custom.filter(item => item.learn);
        return learnList;
    }


    /**
     * Get random spotlight item.
     */
    function getUnscrambleItem(custom) {
        let unscrambleItem = { word: '', def: '' };
        const learnList = getLearnList(custom);
        if (learnList.length > 0) {
            const ndx = Math.floor(Math.random() * learnList.length);
            unscrambleItem = learnList[ndx];
        }
        console.log('====> getSpotlightItem', unscrambleItem);
        return unscrambleItem;
    }


    function updateTags(wordObj, state) {
        const { custom } = state;
        const newCustomList = [...custom];
        var wordObjIndex = newCustomList.findIndex(item => item.word === wordObj.word);
        if (wordObjIndex === -1) {
            newCustomList.push(wordObj);
        }
        else {
            newCustomList[wordObjIndex].tags = wordObj.tags;
        }
        DataSource.saveUserData(newCustomList);
        return newCustomList;
    }

    /**
     * Save custom word.
     * If custom word isn't already listed, add it.
     * Maybe this needs to include the _id, to allow for modification of the word itself.
     */
    function saveCustomWord(wordPool, custom, id, word, def, source, spotlight = true) {
        const newCustomList = [...custom];
        const wordObjIndex = custom.findIndex(item => item._id === id);

        // Word not found in custom list; add
        if (wordObjIndex === -1) {
            const newWordObj = { word, def, source, spotlight };
            addCustomWord(newWordObj, newCustomList);
        }

        // Word found in custom list; modify
        else {
            const wordObj = newCustomList[wordObjIndex];
            wordObj.word = word;
            wordObj.def = def;
            wordObj.source = source;
            wordObj.spotlight = spotlight;
        }
        DataSource.saveUserData(newCustomList);
    }


    return {
        fullWordList,
        getRandomPool,
        toggleFlag,
        getFlag,
        getTagList,
        getWordObj,
        getUnscrambleItem,
        updateTags,
        saveCustomWord
    }

}

export default WordMageLib;