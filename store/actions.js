import { SET_UNSCRAMBLE_WORD } from './types';
import {
    LOAD_INITIAL_POOL,
    LOAD_INITIAL_CUSTOM,
    SET_HAMBURGER_MENU_STATE,
    SET_TAG_POPUP_STATE,
    TOGGLE_FLAG,
    UPDATE_TAGS,
    SET_UNSRAMBLE_WORD,
    SET_WORD_FORM_STATE
} from './types';

export const actLoadWordPool = (words) => {
    return { type: LOAD_INITIAL_POOL, payload: words };
}

export const actLoadCustom = (custom) => {
    return { type: LOAD_INITIAL_CUSTOM, payload: custom };
}

export const actSetMenuState = (newState) => {
    return { type: SET_HAMBURGER_MENU_STATE, payload: newState };
}

export const actSetTagPopupState = (newState) => {
    return { type: SET_TAG_POPUP_STATE, payload: newState };
}

export const actSetWordFormState = (newState) => {
    return { type: SET_WORD_FORM_STATE, payload: newState };
}

export const actUpdateTags = (wordObj) => {
    return { type: UPDATE_TAGS, payload: wordObj }
}

export const actToggleFlag = (flag, word) => {
    console.log('====> ACTION', TOGGLE_FLAG, 'word', word, 'flag', flag);
    return { type: TOGGLE_FLAG, payload: { flag, word } }
}

export const actSetUnscrambleWord = (word) => {
    return { type: SET_UNSCRAMBLE_WORD, payload: word }
}