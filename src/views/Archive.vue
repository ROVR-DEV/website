<template>
    <section class="archive">
        <div class="archive__filters">
            <div class="archive__nav">
                <search-input :date="date ? formatDate('full', date) : ''" :isConfirmed="isDateConfirmed"
                    @search="query => searchShow(query)" @clear="clearFilter()" />

                <div class="archive__calendar-open">
                    <button @click="isCalendarVisible = !isCalendarVisible">
                        <img src="@/assets/images/icons/calendar.svg" alt="calendar">
                    </button>
                    <span v-if="date && isDateConfirmed" v-text="formatDate('short', date)" />
                </div>
            </div>

            <date-picker v-if="!isCalendarVisible" v-model="date" @update:modelValue="searchShow(searchQuery)"
                class="archive__calendar--desktop" borderless transparent locale="en" expanded :first-day-of-week="2"
                :masks="{ weekdays: 'WWW' }" />

            <div class="archive__calendar--mobile" :class="{ active: isCalendarVisible }">
                <date-picker v-if="isCalendarVisible" v-model="date" borderless transparent locale="en" expanded
                    :first-day-of-week="2" :masks="{ weekdays: 'WWW' }" />

                <div class="archive__calendar--mobile-controls">
                    <button class="archive__calendar--mobile-cancel" @click="cancelDateFilter()">cancel</button>
                    <button class="archive__calendar--mobile-confirm" @click="confirmDateFilter()">confirm</button>
                </div>
            </div>
        </div>

        <div class="archive__scroller">
            <Grid
                :key="gridKey"
                :length="filteredArchive.length"
                :pageSize="30"
                :pageProvider="pageProvider"
                scrollBehavior="smooth"
                class="archive__shows">
                <!-- When the item is not loaded, a placeholder is rendered -->
                <template v-slot:placeholder="{ style }">
                    <div class="archive__preview-placeholder" :style="style">...</div>
                </template>

                <!-- Render a loaded item -->
                <template v-slot:default="{ item, style }">
                    <show-preview :style="style" :show="item" @share="data => shareArchive(data)"/>
                </template>
            </Grid>
        </div>
    </section>

    <share-popup v-if="isShareOpen" :metadata="sharingMetadata" :id="sharingId" @close="isShareOpen = false"/>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { DatePicker } from 'v-calendar';
    import Grid from "vue-virtual-scroll-grid";
    import { useArchiveStore } from '@/stores/archive';
    import SearchInput from '@/components/archive/SearchInput.vue';
    import ShowPreview from '@/components/archive/ShowPreview.vue';
    import SharePopup from '@/components/popups/SharePopup.vue';
    import 'v-calendar/style.css';
    import 'loaders.css';

    const archiveStore = useArchiveStore();
    const filteredArchive = ref([]);
    const date = ref('');
    const searchQuery = ref('');
    const isCalendarVisible = ref(false);
    const isDateConfirmed = ref(false);
    const gridKey = ref(0);
    const isShareOpen = ref(false);
    const sharingMetadata = ref(null);
    const sharingId = ref(null);

    const pageProvider = (pageNumber, pageSize) =>
    new Promise((resolve) => {
        const start = pageNumber * pageSize;
        const end = start + pageSize;
        const pageItems = filteredArchive.value.slice(start, end);
        resolve(pageItems);
    });


    onMounted(() => {
        if (archiveStore.archive) {
            filteredArchive.value = archiveStore.archive;
        }
    });

    watch(() => archiveStore.archive, (newArchive) => {
        if (newArchive) {
            filteredArchive.value = newArchive;
        }
    });

    watch(filteredArchive, () => gridKey.value++);

    const searchShow = (query) => {
        searchQuery.value = query.toLowerCase();
        filterArchive();
    }

    const formatDate = (type, date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear());

        if (type === 'full') {
            return `${day}.${month}.${year}`;
        } else if (type === 'short') {
            return `${month}.${day}.${year.slice(-2)}`;
        } else {
            return 'error';
        }
    }

    const shareArchive = (data) => {
        isShareOpen.value = true;
        sharingId.value = data.publisher_metadata.publisher;

        sharingMetadata.value = {
            cover: data.publisher_metadata.cover,
            source: 'archive',
            title: data.publisher_metadata.release_title,
            artist: data.publisher_metadata.artist
        }
    }

    const filterArchive = () => {
        const formattedDate = date.value ? formatDate('full', date.value) : '';
        filteredArchive.value = archiveStore.archive.filter(show => {
            const showDate = formatDate('full', new Date(show.release_date));
            const matchesDate = formattedDate ? showDate === formattedDate : true;
            const matchesSearch = (show.publisher_metadata.artist && show.publisher_metadata.artist.toLowerCase().includes(searchQuery.value)) ||
                (show.publisher_metadata.release_title && show.publisher_metadata.release_title.toLowerCase().includes(searchQuery.value));
            return matchesDate && matchesSearch;
        });
    }

    const clearFilter = () => {
        searchShow('');
        searchQuery.value = '';
        date.value = '';
        isDateConfirmed.value = false;
    }

    const confirmDateFilter = () => {
        searchShow(searchQuery.value);
        isCalendarVisible.value = false;
        isDateConfirmed.value = true;
    }

    const cancelDateFilter = () => {
        date.value = '';
        isCalendarVisible.value = false;
        isDateConfirmed.value = false;
    }
</script>

<style lang="scss" scoped>
    .archive {
        display: flex;
        overflow: hidden;
        border-top: 2px solid $primary;
        &__filters {
            flex: 1 0 40%;
            padding: 3rem;
            border-right: 2px solid $primary;
        }
        &__nav {
            display: flex;
        }
        &__scroller {
            flex: 1 0 60%;
            padding: 3rem;
            overflow-y: auto;
        }
        &__shows {
            @include grid(2, 3rem);
        }
        &__calendar--mobile,
        &__calendar-open {
            display: none;        
        }
        &__preview-placeholder {
            @include flex-center;
            font-size: 2rem;
            font-weight: bold;
            color: $primary;
        }
    }
</style>