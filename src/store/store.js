import Vue from 'vue';
import Vueex from 'vuex';

Vue.use(Vueex);

export const store = new Vueex.Store({
    state:{
        positions: {},
        activeDetail: {}
    },
    getters:
    {
        getPositions: state =>
        {
            return state.positions;
        },
        activeDetail: state =>
        {
            return state.activeDetail;
        }
    },
    mutations:
    {
        setPositions: (state, val) =>
        {
            state.positions = val;
        },
        setDetails (state, val) {
            state.activeDetail = val;
        }

    },
    actions:
    {
        setPositions: ({commit}, val) =>
        {
            commit('setPositions', val);
        },
        setDetails: ({commit}, val) =>
        {
            commit('setDetails', val);
        }

    }
});
