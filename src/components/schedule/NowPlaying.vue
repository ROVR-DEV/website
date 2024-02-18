<template>
    <div class="schedule-program" v-if="program">
        <img :src="program.curator.photo" class="schedule-program__photo" alt="cover">
        <span class="schedule-program__nowplaying">now playing</span>
        <h2 class="schedule-program__time">
            <strong v-text="getTime('hours', program.start_time)"/>
            {{ getTime('format', program.start_time) }}
        </h2>
        <h3 class="schedule-program__title" v-text="program.show.title"/>
        <span class="schedule-program__author">
            BY
            <em
                v-text="program.curator.name"
                v-press="{ time: 250, scale: 0.97 }"
                @click="showCuratorInfoHandler(program.curator, 500)"/>
        </span>
        <p class="schedule-program__description" v-text="program.show.description"/>
        <play-button/>
    </div>
</template>

<script setup>
    import PlayButton from '../PlayButton.vue';

    defineProps({
        program: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['show-curator-info']);

    const getTime = (part, time) => {
        const parts = time.split(/[/ :]/);
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        const hour = parseInt(parts[3]);
        const minute = parseInt(parts[4]);
        const dateObj = new Date(year, month - 1, day, hour, minute);
        const format = dateObj.toLocaleString('en-US', { hour12: true }).slice(-2);

        if (part === 'hours') {
            let hours = dateObj.toLocaleString('en-US', { hour: '2-digit', hour12: true }).replace(/(am|pm)/i, '');
            if (+hours == 12 && format == 'AM') {
                hours = '00';
            }
            return hours;
        }
        if (part === 'format') return format;
    }

    const showCuratorInfoHandler = (curator, delay) => {
        setTimeout(() => emit('show-curator-info', curator), delay);
    }
</script>

<style lang="scss" scoped>
    .schedule-program {
        @include flex(column, flex-start, center);
        text-align: left;
        position: relative;
        color: $primary;
        flex: auto;
        padding: 2.5rem 3.625rem;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: 0.3);
            z-index: 2;
        }
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 80%;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.98) 76.04%);
            z-index: 3;
        }
        & > *:not(img) {
            position: relative;
            z-index: 4;
        }
        &__photo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            z-index: 1;
        }
        &__nowplaying {
            @include font-size(18px);
            display: block;
            text-transform: uppercase;
        }
        &__time {
            @include flex(row, flex-end, flex-start);
            @include font-size(38px);
            text-transform: uppercase;
            line-height: 1;
            margin: 3rem 0;
            strong {
                @include font-size(152px);
                display: block;
                line-height: 6rem;
            }
        }
        &__title {
            @include font-size(54px);
            text-transform: uppercase;
            font-weight: bold;
            -webkit-text-stroke: 0.6px $black;
            margin: 0 0 0.5rem 0;
            max-width: 35rem;
        }
        &__author {
            @include font-size(26px);
            display: block;
            margin-bottom: 2rem;
            em {
                @include font-size(48px);
                display: inline-block;
                line-height: 1;
                cursor: pointer;
            }
        }
        &__description {
            @include font-size(18px);
            font-weight: bold;
            margin: 0 0 2.25rem 0;
            line-height: 1.2;
            max-width: 35rem;
        }
    }
</style>