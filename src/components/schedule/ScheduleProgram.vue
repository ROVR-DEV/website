<template>
    <div class="schedule-program">
        <div class="schedule-program__preview">
            <h3 class="schedule-program__time">
                <strong v-text="getTime('hours', program.start_time)"/>
                {{ getTime('format', program.start_time) }}
            </h3>
            <img :src="program.show.cover_app_schedule_s" class="schedule-program__photo" alt="cover">
        </div>
        <div class="schedule-program__info">
            <h2 class="schedule-program__title" v-text="program.show.title"/>
            <span class="schedule-program__author">
                BY
                <em
                    v-text="program.curator.name"
                    v-press="{ time: 250, scale: 0.97 }"
                    @click="showCuratorInfoHandler(program.curator, 500)"/>
            </span>
            <p class="schedule-program__description" v-text="program.show.description"/>
        </div>
    </div>
</template>

<script setup>
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
        @include flex(row, flex-start, flex-start);
        &:not(:last-child) {
            margin-bottom: 3.5rem;
        }
        &__preview {
            min-width: 14rem;
            max-width: 14rem;
            aspect-ratio: 1;
            margin-right: 1.25rem;
            position: relative;
            overflow: hidden;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba($color: $black, $alpha: 0.1);
                z-index: 2;
            }
        }
        &__photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            z-index: 1;
            transform: scale(1.0625);
        }
        &__time {
            @include flex(row, flex-end, flex-start);
            @include font-size(24px);
            margin: 0;
            position: absolute;
            z-index: 3;
            top: 2rem;
            left: 1rem;
            color: $primary;
            line-height: 1;
            strong {
                @include font-size(62px);
                display: block;
                line-height: 2.5rem;
                margin-right: 0.25rem;
                
            }
            @media screen and (max-width: 1600px) {
                @include font-size(20px);
                strong {
                    @include font-size(46px);
                    line-height: 2rem;
                }
            }
        }
        &__info {
            padding-top: 0.75rem;
        }
        &__title {
            @include font-size(32px);
            text-transform: uppercase;
            font-weight: bold;
            margin: 0 0 0.5rem;
            line-height: 1;
            -webkit-text-stroke: 0.5px $black;
            @media screen and (max-width: 1600px) {
                @include font-size(32px);
            }
        }
        &__author {
            @include font-size(20px);
            display: block;
            font-weight: bold;
            margin-bottom: 1rem;
            em {
                @include font-size(30px);
                display: inline-block;
                margin-left: 0.25rem;
                cursor: pointer;
            }
            @media screen and (max-width: 1600px) {
                @include font-size(20px);
                em {
                    @include font-size(32px);
                }
            }
        }
        &__description {
            @include font-size(16px);
            margin: 0;
            line-height: 1.2;
            font-weight: bold;
            max-width: 80%;
            @media screen and (max-width: 1600px) {
                @include font-size(18px);
            }
        }
    }
</style>