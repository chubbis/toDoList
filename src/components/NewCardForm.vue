<template>
    <div class="add-card">
        <form>
            <label>
                <textarea v-model="body"
                          placeholder="Enter a title for this card..."
                          class="add-card__text-area"></textarea>
            </label>
            <div class="add-card__actions">
                <button class="add-card__actions_add" @click.prevent="submit">Add Card</button>
                <div class="add-card__actions_cancel" @click="clearData"><i class="fas fa-times"></i></div>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'ListForm',
        data() {
            return {
                body: '',
            }
        },
        methods: {
            ...mapActions(["addCard"]),
            /**
             * Отправляет не пустую запись на сервер
             */
            submit() {
                if(this.body){
                    const submit = { body: this.body, createdAt: Date.now(), isDone: false};
                    this.addCard(submit);
                    this.body = '';
                }
            },
            /**
             * стирает введенные данные
             */
            clearData(){
                this.body = ''
            }
        }
    }
</script>
<style lang="sass">
    .add-card
        &__text-area
            width: 100%
            border-radius: 5px
            height: 50px
        &__actions
            display: flex
            justify-content: flex-start
            margin-top: 10px
            &_add
                background-color: #7ca65c
                color: #ffffff
                padding: 10px 15px
                margin-right: 10px
                border-radius: 5px
            &_cancel
                line-height: 38px
                color: #808d97
                cursor: pointer
</style>

