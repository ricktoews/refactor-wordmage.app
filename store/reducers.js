import { TOGGLE_FLAG } from './types';
import {
    LOAD_INITIAL_CUSTOM,
    LOAD_INITIAL_POOL,
    SET_HAMBURGER_MENU_STATE,
    SET_TAG_FILTER_STATE,
    SET_TAG_POPUP_STATE,
    UPDATE_TAGS,
    SET_UNSCRAMBLE_WORD,
    SET_WORD_FORM_STATE,
    LAYOUT_CLICKED,
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
            const menuState = action.payload;
            return {
                ...state,
                menuState
            }

        case SET_TAG_FILTER_STATE:
            const tagFilterState = action.payload;
            return {
                ...state,
                tagFilterState
            }

        case SET_TAG_POPUP_STATE:
            const togglePopupState = !state.tagPopupState;
            const wordToBeTagged = action.payload?.word;
            const tagButton = action.payload?.tagButton;
            console.log('====> SET_TAG_POPUP_STATE', action.payload);
            if (togglePopupState) {
                return {
                    ...state,
                    tagPopupState: togglePopupState,
                    tagButton,
                    wordToBeTagged
                }
            } else {
                return {
                    ...state,
                    tagPopupState: togglePopupState,
                    wordToBeTagged
                }
            }

        case SET_WORD_FORM_STATE:
            const toggleWordFormState = !state.wordFormState;
            return {
                ...state,
                wordFormState: toggleWordFormState
            }

        case UPDATE_TAGS:
            const updatedCustom = WM.updateTags(action.payload, state);
            return {
                ...state,
                custom: updatedCustom
            }

        case TOGGLE_FLAG:
            const { flag, word } = action.payload;
            const newCustom = WM.toggleFlag(flag, word, state);
            return {
                ...state,
                custom: newCustom
            }

        case SET_UNSCRAMBLE_WORD:
            const unscrambleWord = action.payload;
            return {
                ...state,
                unscrambleWord
            };

        case LAYOUT_CLICKED:
            console.log('====> LAYOUT_CLICKED');
            return {
                ...state,
                menuState: false,
                tagFilterState: false,
                tagPopupState: false
            };

        default:
            console.log('====> Reducer, default case', action);
            return state;
    }
};
