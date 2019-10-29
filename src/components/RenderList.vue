<template>
        <li class="cards__list__el" :class="{done: card.isDone}">
            <p >{{ card.index }}) {{ card.body }}</p>
            <div class="cards__list__buttons">
                <div class="cards__list__buttons_button check"
                     :class="{done: card.isDone}"
                     @click="card.isDone = !card.isDone"
                     v-if="!card.isDone"><i class="fas fa-check "></i></div>
                <div class="cards__list__buttons_button ban"
                     @click="card.isDone = !card.isDone"
                     v-else><i class="fas fa-ban"></i></div>
                <div @click="goToEditCard" class="cards__list__buttons_button"><i class="fas fa-pencil-alt"></i></div>
                <div @click="removeCard" class="cards__list__buttons_button"><i class="fas fa-times"></i></div>
            </div>
        </li>
</template>

<script>
    export default {
        name: "RenderList",
        props: ['card'],
        methods: {
            removeCard(){
                this.$emit('remove', this.card.id)
            },
            goToEditCard(){
                this.$emit('goToEdit', this.card)
            }
        }
    }
</script>

<style lang="sass">
    .cards
        margin-top: 10px
        &__list__el
            margin-top: 10px
            padding: 5px
            background-color: #ffffff
            display: flex
            justify-content: space-between
            color: #334655
            border-radius: 5px
        &__list__buttons
            display: flex
            justify-content: flex-end
            align-items: center
            &_button
                display: inline-block
                width: 16px
                height: 18px
                margin: 0 5px
                line-height: 20px
                color: #808d97
                cursor: pointer
    .done
        background-color: #a3a3a3
    .check
        color: #7ca65c
    .ban
        color: #D70000
</style>