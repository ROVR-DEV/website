<template>
    <section class="archive">
        <div class="archive__header">
            <search-input :date="date ? formatDate('full', date) : ''" :isConfirmed="isDateConfirmed"
                @search="query => searchShow(query)" :query="queryCurator" @clear="clearFilter()" />

            <div class="archive__calendar-open archive__calendar-open--desktop" :class="{ active: isCalendarOpen }">
                <button @click="openCalendar('desktop')">
                    <img src="@/assets/images/icons/calendar.svg" alt="calendar">
                </button>
                <span :class="{ 'visible': date }" v-text="formatDate('short', date)" />
            </div>

            <div class="archive__calendar-open archive__calendar-open--mobile" :class="{ active: isCalendarOpen }">
                <button @click="openCalendar('mobile')">
                    <img src="@/assets/images/icons/calendar.svg" alt="calendar">
                </button>
                <span :class="{ 'visible': date && isDateConfirmed }" v-text="formatDate('short', date)" />
            </div>
        </div>

        <div v-if="!isCalendarVisible && isCalendarOpen" :class="{ active: desktopCalendarActive }" class="archive__calendar--desktop" ref="calendar">
            <date-picker v-model="date" @update:modelValue="searchShow(searchQuery)"
                    borderless transparent locale="en" expanded :first-day-of-week="2"
                :masks="{ weekdays: 'WWW' }" :disabled-dates="disableFutureDates" :max-date="new Date()"/>

            <button class="archive__calendar-close" @click="isCalendarOpen = false; desktopCalendarActive = false;">
                close 
                <img src="@/assets/images/icons/calendar-close.svg" alt="close">
            </button>
        </div>

        <div v-if="isCalendarVisible && isCalendarOpen" class="archive__calendar--mobile" :class="{ active: isCalendarVisible || isCalendarOpen }">
            <date-picker v-model="date" borderless transparent locale="en" expanded
                :first-day-of-week="2" :masks="{ weekdays: 'WWW' }" :disabled-dates="disableFutureDates" :max-date="new Date()"/>

            <div class="archive__calendar--mobile-controls">
                <button class="archive__calendar--mobile-cancel" @click="cancelDateFilter()">cancel</button>
                <button class="archive__calendar--mobile-confirm" @click="confirmDateFilter()">confirm</button>
            </div>
        </div>

        <div class="archive__scroller">
            <VirtualList v-show="filteredArchive.length" :items="filteredArchive" :itemHeight="showHeight">
                <template #default="{ item }">
                    <show-preview :show="item" @share="data => shareArchive(data)" />
                </template>
            </VirtualList>

            <!-- <p v-show="!filteredArchive.length" class="archive__empty">Could not find any shows with this data</p> -->
            <div v-if="!filteredArchive.length" class="archive__preloader">
                <div class="ball-beat">
                    <div></div><div></div><div></div>
                </div>
            </div>
        </div>
    </section>

    <share-popup v-if="isShareOpen" :metadata="sharingMetadata" :id="sharingId" @close="isShareOpen = false"/>
</template>

<script setup>
    import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue';
    import { DatePicker } from 'v-calendar';
    import { useArchiveStore } from '@/stores/archive';
    import { useRoute, useRouter } from 'vue-router';
    import { isMobile } from '@/utils/isMobile';
    import { onClickOutside } from '@vueuse/core';
    import { slugifyIgnoreSpecialChars } from '@/utils/slugify';
    import { setComputedSizes } from "@/helpers/setComputedSizes";
    import axios from 'axios';
    import VirtualList from '@/components/archive/VirtualList.vue';
    import SearchInput from '@/components/archive/SearchInput.vue';
    import ShowPreview from '@/components/archive/ShowPreview.vue';
    import SharePopup from '@/components/popups/SharePopup.vue';
    import 'v-calendar/style.css';

    const archiveStore = useArchiveStore();
    const filteredArchive = ref([]);
    const date = ref('');
    const searchQuery = ref('');
    const isCalendarOpen = ref(false);
    const isCalendarVisible = ref(false);
    const isDateConfirmed = ref(false);
    const isShareOpen = ref(false);
    const sharingMetadata = ref(null);
    const sharingId = ref(null);
    const showHeight = ref(0);
    const route = useRoute();
    const router = useRouter();
    const queryCurator = ref(null);
    const calendar = ref(null);
    const desktopCalendarActive = ref(false);
    const y = window.innerHeight / 1080;
    const x = window.innerWidth / 1920;

    defineProps({
        curator: {
            type: String,
            required: false
        }
    });

    onClickOutside(calendar, () => { isCalendarOpen.value = false; isCalendarVisible.value = false });

    onMounted(() => {
        if (archiveStore.archive) {
            filteredArchive.value = archiveStore.archive;

            if (route.query.curator) {
                queryCurator.value = route.query.curator;
                filterArchive(route.query.curator);
            }
        }

        updateShowHeight();
        window.addEventListener('resize', updateShowHeight);

        const addArrowClickListeners = () => {
            document.querySelectorAll('.vc-arrow').forEach(item => {
                item.addEventListener('click', function () {
                    if( isMobile() ) setComputedSizes();

                    const prevArrow = document.querySelector('.vc-prev');
                    prevArrow.style.pointerEvents = 'none';
                    setTimeout(() => {
                        prevArrow.style.pointerEvents = 'auto';
                        const month = document.querySelector('.vc-title span').textContent;
                        if(month === 'March 2024') {
                            prevArrow.disabled = true;
                        } else {
                            prevArrow.disabled = false;
                        }
                    }, 200);
                });
            });
        }

        addArrowClickListeners();

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    addArrowClickListeners();
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
    
    onUnmounted(() => {
        window.removeEventListener('resize', updateShowHeight);
    });

    watch(() => archiveStore.archive, async (newArchive) => {
        if (newArchive) {
            filteredArchive.value = newArchive;

            if (route.query.curator) {
                queryCurator.value = route.query.curator;
                filterArchive(route.query.curator);
            }

            if( isMobile() ) {
                await nextTick();
                setComputedSizes();
            }
        }
    }, { immediate: true });

    const searchShow = (query) => {
        searchQuery.value = query.toLowerCase();
        queryCurator.value ? filterArchive(queryCurator.value) : filterArchive();
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

    const shareArchive = async (data) => {
        const show_data = data;
        if(isMobile() && navigator.share) {
            let share_url;
            const sharingLink = `https://share.rovr.live/showarchive.html?release_date=${encodeURIComponent(show_data.release_date)}&title=${encodeURIComponent(show_data.publisher_metadata.release_title)}&curator=${encodeURIComponent(show_data.publisher_metadata.artist)}&description=${encodeURIComponent(show_data.publisher_metadata.description)}&image=${encodeURIComponent(show_data.publisher_metadata.cover)}&publisher=${encodeURIComponent(show_data.publisher_metadata.publisher)}`;
            const params = {
                url: sharingLink
            };

            await axios.post('https://go.rovr.live/shortlink', params)
                .then(response => {
                    if (response.data && response.data.short_url) {
                        share_url = response.data.short_url;
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

            const data = {
                title: 'Radio Reinvented',
                url: share_url,
            }

            window.navigator.share(data);
        } else {
            isShareOpen.value = true;
            sharingId.value = data.publisher_metadata.publisher;

            sharingMetadata.value = {
                cover: data.publisher_metadata.cover,
                source: 'archive',
                title: data.publisher_metadata.release_title,
                artist: data.publisher_metadata.artist,
                description: data.publisher_metadata.description,
                date: data.release_date,
                publisher: data.publisher_metadata.publisher
            }
        }
    }

    const filterArchive = (curator) => {
        const formattedDate = date.value ? formatDate('full', date.value) : '';
        let filteredShows = archiveStore.archive;

        if (curator) {
            filteredShows = filteredShows.filter(show => show.publisher_metadata.artist === curator);
        }

        filteredArchive.value = filteredShows.filter(show => {
            const showDate = formatDate('full', new Date(show.release_date));
            const matchesDate = formattedDate ? showDate === formattedDate : true;

            const searchQuerySlugified = slugifyIgnoreSpecialChars(searchQuery.value.toLowerCase());
            const searchQueryOriginal = searchQuery.value.toLowerCase();

            const artistSlugified = show.publisher_metadata.artist ? slugifyIgnoreSpecialChars(show.publisher_metadata.artist.toLowerCase()) : '';
            const titleSlugified = show.publisher_metadata.release_title ? slugifyIgnoreSpecialChars(show.publisher_metadata.release_title.toLowerCase()) : '';

            const matchesSearch =
                (show.publisher_metadata.artist &&
                    (artistSlugified.includes(searchQuerySlugified) || artistSlugified.includes(searchQueryOriginal))) ||
                (show.publisher_metadata.release_title &&
                    (titleSlugified.includes(searchQuerySlugified) || titleSlugified.includes(searchQueryOriginal)));

            return matchesDate && matchesSearch;
        });
    }

    watch(() => route.query.curator, (newQuery) => {
        if (newQuery) {
            queryCurator.value = newQuery;
            filterArchive(route.query.curator);
            setComputedSizes();
        }
    }, { immediate: true });


    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const generateDisabledDates = (startDate) => {
        const dates = [];
        const endDate = new Date(startDate.getFullYear() + 10, 11, 31);
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const disableFutureDatesArray = generateDisabledDates(tomorrow);
    disableFutureDatesArray.push(today);
    const disableFutureDates = ref(disableFutureDatesArray);

    const updateShowHeight = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) {
            showHeight.value = 350 * y;
        } else {
            showHeight.value = 290 * y;
        }
    }

    const clearFilter = () => {
        searchQuery.value = '';
        isDateConfirmed.value = false;
        isCalendarOpen.value = false;
        date.value = '';
        if(route.query.curator) {
            queryCurator.value = '';
            router.push({ name: 'archive' });
        }
        searchShow('');
        setTimeout(() => {
            document.querySelector('.virtual-grid-container').scrollTop = 0;
        }, 100);
    }

    const openCalendar = async (type) => {
        if(filteredArchive.value.length) {
            if (type === 'desktop') {
                isCalendarOpen.value = true;
                setTimeout(() => {
                    desktopCalendarActive.value = true;
                }, 20);

                if (!isMobile()) {
                    setTimeout(() => {
                        document.querySelector('.archive__calendar--desktop').style.width = `${450 * x}px`;
                        document.querySelector('.archive__calendar--desktop').style.height = `${500 * x}px`;
                        document.querySelector('.archive__calendar--desktop').style.padding = `${46 * y}px ${35 * x}px`;
                        document.querySelectorAll('.archive__calendar--desktop .vc-header .vc-arrow').forEach(el => {
                            el.style.width = `${34 * x}px`;
                            el.style.height = `${34 * x}px`;
                        });
                        document.querySelectorAll('.archive__calendar--desktop .vc-header .vc-arrow svg').forEach(el => {
                            el.style.height = `${26 * y}px`;
                            el.style.width = `${30 * x}px`;
                        });
                        document.querySelectorAll('.archive__calendar--desktop .vc-weeks .vc-weekdays .vc-weekday').forEach(el => {
                            el.style.fontSize = `${11.7 * x}px`;
                        });
                        document.querySelectorAll('.archive__calendar--desktop .vc-day').forEach(el => {
                            el.style.height = `${40 * x}px`;
                            el.style.width = `${40 * x}px`;
                        });
                        document.querySelectorAll('.archive__calendar--desktop .vc-day .vc-day-content').forEach(el => {
                            el.style.fontSize = `${20 * x}px`;
                        });
                        document.querySelector('.archive__calendar--desktop .vc-title-wrapper span').style.fontSize = `${15.4 * x}px`;
                        document.querySelector('.archive__calendar-close').style.fontSize = `${10 * x}px`;
                        document.querySelector('.archive__calendar-close').style.right = `${53 * x}px`;
                        document.querySelector('.archive__calendar-close').style.bottom = `${47 * x}px`;
                        document.querySelector('.archive__calendar-close img').style.width = `${15 * x}px`;
                    }, 10);
                }
            } else {
                isCalendarOpen.value = true;
                isCalendarVisible.value = true;

                await nextTick();
                setComputedSizes();
            }

            setTimeout(() => {
                formatCalendarDates();
            }, 10);
        }
    }

    const confirmDateFilter = () => {
        searchShow(searchQuery.value);
        isCalendarVisible.value = false;
        isCalendarOpen.value = false;
        isDateConfirmed.value = true;
    }

    const cancelDateFilter = () => {
        date.value = '';
        searchShow(searchQuery.value);
        isCalendarOpen.value = false;
        isCalendarVisible.value = false;
        isDateConfirmed.value = false;
    }

    const formatCalendarDates = () => {
        const dayElements = document.querySelectorAll('.vc-day-content');

        dayElements.forEach(element => {
            const day = element.textContent.trim();
            if (day.length === 1) {
                element.textContent = `0${day}`;
            }
        });
    }
</script>

<style lang="scss" scoped>
    .archive {
        border-top: 2px solid $primary;
        padding: 2rem 3rem 0 3rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: sticky;
            top: 0;
            left: 0;
            margin-bottom: 0.25rem;
        }
        &__scroller {
            flex: auto;
            overflow-y: auto;
            ::-webkit-scrollbar {
                width: 0.1px;
                opacity: 0;
            }
        }
        &__calendar {
            &--mobile {
                display: none;        
            }
            &-open {
                display: block;
                text-align: center;
                margin-left: 1rem;
                position: relative;
                top: -4px;
                &--mobile {
                    display: none;
                }
                button {
                    @include flex-center;
                    width: 2.5rem;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    border: 1px solid $primary;
                    cursor: pointer;
                    margin-left: auto;
                    transition: $transition;
                    img {
                        display: block;
                        width: 1.125rem;
                        transition: $transition;
                        position: relative;
                        top: -1px;
                    }
                    @media(hover: hover) {
                        &:hover {
                            background-color: $primary;
                            img {
                                filter: brightness(0);
                            }
                        }
                    }
                }
                span {
                    display: block;
                    color: $primary;
                    font-size: 0.75rem;
                    font-weight: normal;
                    margin-top: 5px;
                    opacity: 0;
                    &.visible {
                        opacity: 1;
                    }
                }
            }
        }
        &__empty {
            color: rgba($color: $primary, $alpha: 0.25);
            margin: 0;
            line-height: 1;
        }
        &__preloader {
            @include flex-center-column;
            height: 100%;
            .ball-beat > div {
                background-color: $primary;
            }
        }
    }
</style>