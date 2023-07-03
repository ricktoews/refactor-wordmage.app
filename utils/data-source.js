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

const starter = JSON.stringify({
    "custom": []
});

//localStorage.removeItem('my-words');

/**
 * Get user data from local storage. Return it in original format.
 */
function retrieveUserLocalData() {
    var myWords = localStorage.getItem('my-words') || starter;
    try {
        var userData = JSON.parse(myWords);
    } catch (e) {
        console.log('Oops', myWords, e);
        userData = JSON.parse(starter);
    }

    return userData;
}

function retrieveUserData() {
    var myWords = localStorage.getItem('my-words') || starter;
    try {
        var userData = JSON.parse(myWords);
    } catch (e) {
        console.log('Oops', myWords, e);
        userData = { custom: [] };
    }

    return userData;
}

function cleanCustomWords(custom) {
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

async function saveUserData(custom) {
    var custom = cleanCustomWords(custom);
    localStorage.setItem('my-words', JSON.stringify(custom));
    /*
        // If logged in profile, save custom list to database.
        const profile_user_id = localStorage.getItem('wordmage-profile-user_id');
        if (profile_user_id) {
            try {
                const data = {
                    user_id: profile_user_id,
                    custom
                };
                console.log('====> saveUserData', data);
                //            axios.post(`${CONFIG.domain}/savecustom`, data);
            } catch (e) {
                console.log('Problem saving', userData, e);
            }
        }
        */
}

const DataSource = { retrieveUserLocalData, retrieveUserData, saveUserData };

export default DataSource;