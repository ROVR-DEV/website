<template>
    <section class="show show--radio" v-if="radioStore.radio">
        <div class="show__info">
            <div class="show__details">
                <h1 class="show__title" v-text="radioStore.radio.show.title"/>

                <h3 class="show__author">
                    BY
                    <curator-link :artist="radioStore.radio.curator.name"/>
                </h3>

                <p class="show__description" v-text="radioStore.radio.show.description ?? radioStore.radio.show.about"/>
                
                <div class="show__player">
                    <play-button/>
                    <radio-timer/>
                </div>
            </div>
            
            <current-track type="radio"/>
        </div>

        <show-image is-radio :curator="radioStore.radio.curator.name"/>
    </section>
</template>

<script setup>
    import { useRadioStore } from "@/stores/radio";
    import PlayButton   from '@/components/ui/PlayButton.vue';
    import RadioTimer   from '@/components/RadioTimer.vue';
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import ShowImage    from '@/components/ShowImage.vue';
    import CuratorLink  from "@/components/curators/CuratorLink.vue";

    const radioStore = useRadioStore();
</script>