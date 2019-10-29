<template>
    <div class="pagination">
        <div class="pagination__left">
            <a href="#"
               v-show="hasPrev()"
               @click="changePage(prevPage)">Назад</a></div>
            <ul class="pagination__mid">
                <li v-if="hasFirst()" class="pagination__mid__el">
                    <a href="#" @click="changePage(1)">1</a>
                </li>
                <li v-if="hasFirst()" class="pagination__mid__el">...</li>
                <li v-for="page in pages" :key="page" class="pagination__mid__el">
                    <a href="#"
                    @click="changePage(page)"
                    :class="{ current: options.currentPage === page }">{{ page }}</a>
                </li>
                <li v-if="hasLast()" class="pagination__mid__el">...</li>
                <li v-if="hasLast()" class="pagination__mid__el">
                    <a href="#" @click="changePage(totalPages)">{{ totalPages }}</a>
                </li>
            </ul>
        <div class="pagination__right">
            <a href="#"
               v-if="hasNext()"
               @click="changePage(nextPage)">Вперед</a></div>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['options', 'total'],

        computed: {
            pages(){
                const pages = [];
              for(let i = this.rangeStart; i <= this.rangeEnd; i++){
                  pages.push(i);
              }
              return pages
            },
            rangeStart(){
                let start = this.options.currentPage - this.options.pageRange;

                return (start > 0) ? start : 1
            },
            rangeEnd(){
                let end = this.options.currentPage + this.options.pageRange;

                return (end < this.totalPages) ? end : this.totalPages
            },
            // всего страниц
            totalPages(){
                return Math.ceil(this.total / this.options.cardsPerPage)
            },
            // следующая страница
            nextPage(){
                return this.options.currentPage + 1
            },
            // предыдущая страница
            prevPage(){
                return this.options.currentPage - 1
            }
        },
        methods: {
            hasFirst(){
              return this.rangeStart !== 1;
            },
            hasLast(){
              return this.rangeEnd < this.totalPages
            },
            hasPrev(){
                return this.options.currentPage > 1
            },
            hasNext(){
                return this.options.currentPage < this.total
            },
            changePage(page) {
                this.$emit('pageChanged', page);
            }
        },
    }
</script>

<style lang="sass">
    .pagination
        display: flex
        justify-content: space-between
        margin: 30px 0
        & a
            text-decoration: none
            color: #808d97
        &__right, &__left
            width: 90px
            height: 25px
            & a
                border: 1px solid #808d97
                padding: 10px 19px
                border-radius: 7px
                &:hover
                    border-color: #ccc
        &__mid
            list-style: none
            display: flex
            justify-content: space-around
            &__el
                margin-right: 10px
                & a:hover
                    color: #084908
                &:last-child
                    margin-right: 0
        .current
            color: #0A7E0A
</style>