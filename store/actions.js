import {
    LOAD_INITIAL_POOL,
    LOAD_INITIAL_CUSTOM,
    SET_HAMBURGER_MENU_STATE,
    SET_TAG_POPUP_STATE,
    TOGGLE_FLAG,
    UPDATE_TAGS
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
    console.log('====> ACTION', newState);
    return { type: SET_TAG_POPUP_STATE, payload: newState };
}

export const actUpdateTags = (wordObj) => {
    return { type: UPDATE_TAGS, payload: wordObj }
}

export const actToggleFlag = (flag, word) => {
    console.log('====> ACTION', TOGGLE_FLAG, 'word', word, 'flag', flag);
    return { type: TOGGLE_FLAG, payload: { flag, word } }
}