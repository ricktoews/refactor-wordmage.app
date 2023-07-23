/*
 * This schema for custom is way out of date.
{ 
    custom: [
        _id: <int>,
        word: <string>,
        def: <string>,
        notes: <string>,
        spotlight: <boolean>
    ]
}
 */
import axios from 'axios';
import { CONFIG } from '@/config';

//const starter = JSON.stringify({"custom": []});
const starter = '[]';

const STORAGE_KEY = 'my-words';
const LOCAL_ONLY = true;

//localStorage.removeItem(STORAGE_KEY);

/**
 * Get user data from local storage. Return it in original format.
 */
function retrieveUserData() {
    let myWords;
    const lsMyWords = localStorage.getItem(STORAGE_KEY) || starter;
    try {
        myWords = JSON.parse(lsMyWords);
    } catch (e) {
        console.log('Oops', lsMyWords, e);
        myWords = JSON.parse(starter);
    }
    return myWords;
}

function cleanCustomWords(custom = []) {
    custom = custom.map(item => {
        if (!item.myown) {
            delete item.def;
            delete item.source;
        }
        if (item.tags && item.tags.length === 0) {
            delete item.tags;
        }
        return item;
    });
    custom = custom.filter(item => {
        if (item.myown || item.tags || item.spotlight || item.learn || item.dislike) {
            return true;
        }
    });
    return custom;
}

async function saveUserData(newCustom) {
    //    console.log('====> saveUserData', newCustom);
    const custom = cleanCustomWords(newCustom);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));

    if (LOCAL_ONLY === false) {
        // If logged in profile, save custom list to database.
        const profile_user_id = localStorage.getItem('wordmage-profile-user_id');
        if (profile_user_id) {
            try {
                const data = {
                    user_id: profile_user_id,
                    custom
                };
                console.log('====> saveUserData', data);
                axios.post(`${CONFIG.domain}/savecustom`, data);
            } catch (e) {
                console.log('Problem saving', userData, e);
            }
        }

    }
}

const DataSource = { retrieveUserData, saveUserData };

export default DataSource;