import { TOGGLE_FLAG } from './types';
import {
    LOAD_INITIAL_CUSTOM,
    LOAD_INITIAL_POOL,
    SET_HAMBURGER_MENU_STATE,
    SET_TAG_POPUP_STATE,
    UPDATE_TAGS
} from './types'
import WordMageLib from '@/utils/words-interface';
const WM = WordMageLib();

export const reducer = (state = { wordPool: [], custom: [], menuState: false }, action) => {
    switch (action.type) {
        case LOAD_INITIAL_POOL:
            return {
                ...state,
                wordPool: action.payload
            };

        case LOAD_INITIAL_CUSTOM:
            return {
                ...state,
                custom: action.payload
            };

        case SET_HAMBURGER_MENU_STATE:
            return {
                ...state,
                menuState: action.payload
            }

        case SET_TAG_POPUP_STATE:
            const togglePopupState = !state.tagPopupState;
            console.log('====> SET_TAG_POPUP_STATE', togglePopupState, action.payload);
            return {
                ...state,
                tagPopupState: togglePopupState,
                wordToBeTagged: action.payload.word
            }

        case UPDATE_TAGS:
            console.log('====> UPDATE_TAGS', action.payload);
            const updatedCustom = WM.updateTags(action.payload, state);
            return {
                ...state,
                custom: updatedCustom
            }

        case TOGGLE_FLAG:
            console.log(`====> reducer`, TOGGLE_FLAG, action, state);
            const { flag, word } = action.payload;
            const newCustom = WM.toggleFlag(flag, word, state);
            return {
                ...state,
                custom: newCustom
            }

        default:
            return state;
    }
};
