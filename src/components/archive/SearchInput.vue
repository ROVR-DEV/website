<template>
    <div class="archive__search">
        <input
            type="text"
            v-model="input"
            @input="emit('search', input)"
            class="archive__search-input"
            placeholder="Search by Curator or by Show">

        <transition name="fade">
            <div class="archive__search-clear archive__search-clear--desktop" v-if="input !== '' || date !== ''" @click="clear()">
                Clear
                <img src="@/assets/images/icons/close-small.svg" alt="close">
            </div>
        </transition>

        <transition name="fade">
            <div class="archive__search-clear archive__search-clear--mobile" v-if="input !== '' || (isConfirmed && date !== '')" @click="clear()">
                Clear
                <img src="@/assets/images/icons/close-small.svg" alt="close">
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const input = ref('');
    const emit  = defineEmits(['search', 'clear']);

    defineProps({
        date: {
            type: String,
            required: false
        },
        isConfirmed: {
            type: Boolean,
            required: false
        }
    });

    const clear = () => {
        input.value = '';
        emit('clear');
    }
</script>

<style lang="scss" scoped>
    .archive__search {
        position: relative;
        margin-bottom: 3rem;
        flex: auto;
        &-input {
            font-family: 'Kern Standard', sans-serif;
            display: block;
            width: 100%;
            background-color: $black;
            color: $primary;
            font-weight: bold;
            @include font-size(20px);
            border: none;
            border-bottom: 1.75px solid $primary;
            padding: 0 0 1.125rem 0;
            outline: none;
            position: relative;
            line-height: 1;
            -webkit-appearance: none;
            appearance: none;
            border-radius: 0;
            &::placeholder {
                color: $primary;
                font-weight: normal;
            }
        }
        &-clear {
            @include flex-center;
            @include font-size(20px);
            color: $primary;
            font-weight: normal;
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            img {
                display: block;
                margin-left: 0.75rem;
                width: 1rem;
            }
            &--mobile {
                display: none;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease-in;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
