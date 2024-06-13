<template>
    <play-button archive/>

    <div class="archive-player">
        <img src="@/assets/images/icons/soundcloud.svg" class="archive-player__icon" alt="soundcloud">

        <div class="archive-player__timeline">
            <span class="archive-player__range"/>
        </div>
    </div>
</template>

<script setup>
    import PlayButton from '../ui/PlayButton.vue';
</script>

<style lang="scss" scoped>
    .archive-player {
        @include flex-center;
        position: relative;
        flex: auto;
        margin-left: 2.5rem;
        &__icon {
            position: absolute;
            top: -4.5rem;
            right: 0;
        }
        &__timeline {
            position: relative;
            width: 100%;
            height: 4px;
            border-top: 4px dotted $primary;
        }
        &__range {
            display: block;
            position: absolute;
            width: 5rem;
            height: 0.875rem;
            background-color: $primary;
            top: -9px;
            left: 0;
        }
    }
</style>