<template>
    <em v-text="artist" @click="navigateToCurator" class="curator-link" />
</template>

<script setup>
    import { slugify } from '@/utils/slugify';
    import { useRouter } from 'vue-router';
    import { computed } from 'vue';

    const props = defineProps({
        artist: {
            type: String,
            required: true
        }
    });

    const router = useRouter();

    const mainCurator = computed(() => {
        const curators = props.artist.split(' w/ ');
        return curators[0].trim();
    });

    const navigateToCurator = () => {
        router.push(`/curator/${slugify(mainCurator.value)}`);
    }
</script>
