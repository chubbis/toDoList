<template>
    <div id="app" class="container">
        <div class="container__data">
            <!-- отображение страницы с задачами и добавлением новой задачи-->
            <div v-if="!getShowEdit">
                <!-- Форма для добавления новой задачи-->
                <list-form/>
                <h3 class="cards__h">Задачи</h3>
                <!-- Пагинация. Выбор страницы. Передаваемые данные: текущая страница,
                все задачи, количество задач на странице-->
                <pagination
                        @pageChanged="changeCurrentPage"
                        :options="getPaginationOptions"
                        :total="getAllCards.length"
                ></pagination>
                <!-- Получение массива задач, в соответствии с текущей страницей
                и количеством отображения на странице.
                События: удаления и перехода на страницу редактирования.-->
                <ul class="cards__list">
                    <render-list v-for="card in getLimitList"
                                 :key="card.id"
                                 :card="card"
                                 @remove="removeCard"
                                 @goToEdit="goToEditCard"
                    >
                    </render-list>
                </ul>
            </div>
            <!-- Отображение страницы редактирования.-->
            <edit-card v-else
                       @saveEditedChanges="saveEdited"
            ></edit-card>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import ListForm from './components/NewCardForm'
    import RenderList from './components/RenderList'
    import EditCard from './components/EditCard'
    import Pagination from './components/Pagination'


    export default {
        name: 'app',
        computed: mapGetters(['getAllCards',
            'getShowEdit',
            'getCurrentPage',
            'getLimitList',
            'getPaginationOptions']),
        methods: {
            ...mapActions(['firestore', 'removeCard', 'saveEdits']),
            ...mapMutations(['changeEditingCardData',
                'changeShowEdit',
                'changeCurrentPage',
                'setCurrentPageFirst']),
            goToEditCard(card){
                this.changeEditingCardData(card);
                this.changeShowEdit();
            },
            saveEdited(card){
                this.saveEdits(card);
                this.setCurrentPageFirst();
                this.changeShowEdit();
            },
        },
        components: { ListForm, RenderList, EditCard, Pagination },
        async mounted() {
            await this.firestore();

        }
    }
</script>

<style lang="sass">
    .container
        background-color: #e0e3e6
        margin: 20px auto
        border-radius: 5px
        max-width: 999px
        min-width: 320px
        &__data
            padding: 10px
    .cards__h
        color: #2f4252
        margin-top: 15px


</style>
