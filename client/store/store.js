import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    sectionList: [], 
    favouriteSectionList: [],
    details: []
};

const mutations = {
    setSections (state, data) {
        state.sectionList = data;
    },
    setDetails (state, data) {
        state.details = data;
    },
    addToFavourite (state, {id, exercises}) {
    },
    setFavouriteSections (state, data) {
        state.favouriteSectionList = data;
        
    },
};

const actions = {
    getSections ({commit}) {
        api.get((res) => {
            commit('setSections', res.data);
        }, () => commit('setNotFound'));
    },
    getDetails ({commit}, id) {
        api.details(id, (res) => {
            commit('setDetails', res.data);
        }, () => commit('setNotFound'));
    },
    addToFavourite ({commit}, {id, exercises}) {
        exercises.is_fav = !exercises.is_fav;

        api.update (id, exercises, (res) => {
            commit('addToFavourite', res.data);
        })
    },
    getFavouriteSections ({commit}) {
        api.getFavouriteSections ((res) => {
            console.log( res.data);
            commit('setFavouriteSections', res.data);
        })
    }
};

const api = {
    get: (resolve, reject) => {
        axios
            .get(`https://protected-oasis-66007.herokuapp.com/sections`)
            .then(resolve)
            .catch(reject);
    },
    details: (id, resolve, reject) => {
        axios
            .get(`https://protected-oasis-66007.herokuapp.com/sections/${id}/exercises`)
            .then(resolve)
            .catch(reject);
    },
    update: (id, exercises, resolve, reject) => {
        axios
            .put(`https://protected-oasis-66007.herokuapp.com/exercises/${exercises.id}`, exercises)
            .then(resolve)
            .catch(reject);
    },
    getFavouriteSections: (resolve, reject) => {
        axios
            .get(`https://protected-oasis-66007.herokuapp.com/exercises?is_fav=true`)
            .then(resolve)
            .catch(reject);
    },
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store