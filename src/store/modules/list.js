import  {db}  from '@/main'
export default {
    actions: {
        firestore ({ commit }) {
            return {
               list: db.collection('list').orderBy('createdAt', 'desc').onSnapshot( querySnapshot => {
                   commit('updateList', querySnapshot)
               })

            }
        },
        addCard(ctx, submit){
            db.collection('list').add(submit)
        },
        removeCard(ctx, id){
            db.collection('list').doc(id).delete()
        },
        saveEdits(ctx, editingCard) {
            db.collection("list").doc(editingCard.id).update(editingCard)
        }
    },

    mutations: {
        updateList (state, querySnapshot) {
            const cards = [];
            let index = 0;
            querySnapshot.forEach(doc => {
                index++;
                cards.push({id: doc.id, ...doc.data(), index: index })
            });
            state.toDoList = cards

        },
        changeEditingCardData(state, card){
            state.editingCard = card;
        },
        changeShowEdit(state){
            state.showEdit = !state.showEdit;
        },
        changeCurrentPage(state, page){
            state.paginationOptions.currentPage = page
        },
        setCurrentPageFirst(state){
            state.paginationOptions.currentPage = 1;
        }

    },
    state: {
        toDoList: [],
        showEdit: false,
        editingCard: {},
        paginationOptions: {
            cardsPerPage: 10,
            currentPage: 1,
            pageRange: 2,
        }
    },
    getters: {
        getAllCards(state){
            return state.toDoList
        },
        getShowEdit(state){
            return state.showEdit
        },
        getEditingCard(state){
            return state.editingCard
        },
        getPaginationOptions(state){
            return state.paginationOptions
        },
        getLimitList(state){
            const options = state.paginationOptions;
            let firstCard = null;
            let lastCard = null;
            if (options.currentPage === 1){
                firstCard = 0;
                lastCard = options.cardsPerPage
            } else {
                firstCard = (options.currentPage - 1) * options.cardsPerPage;
                lastCard = firstCard + options.cardsPerPage;
            }
            return state.toDoList.slice(firstCard, lastCard)
        },
        getCurrentPage(state){
            return state.paginationOptions.currentPage
        }

    }
}
