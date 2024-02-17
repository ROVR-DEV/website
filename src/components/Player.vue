<script setup>
    import { ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import jingleTrack from '@/assets/media/jingle.mp3';

    const player = ref();
    const playerStore = usePlayerStore();
    const playerTime = ref(0);
    const jingle = new Audio(jingleTrack);

    watch(() => playerStore.stream_url, (state) => {
        if (state) createPlayer();
    });

    watch(() => playerStore.isPlaying, (state) => {
        state ? play() : pause();
    });

    watch(() => playerStore.isFinished, (state) => {
        if (state) finish();
    });

    const createPlayer = () => {
        player.value = new Audio(playerStore.stream_url);
        player.value.addEventListener('canplaythrough', () => playerStore.setReady());
        setInterval(() => playerTime.value++, 1000);
    }

    const play = () => {
        player.value.play();
        player.value.currentTime = playerTime.value;
    }

    const pause = () => {
        player.value.pause();
    }

    const finish = () => {
        if (!player.value.paused) {
            startFadeOut();
            playerStore.setFinished(true);
            setTimeout(() => jingle.play(), 2000);

            jingle.onended = () => {
                jingle.pause();
                player.value.load(playerStore.stream_url);
                player.value.play();
                player.value.volume = 1;
                playerTime.value = 0;
                playerStore.setFinished(false);
            }
        }
    }

    const fadeOutInterval = ref(null);

    const startFadeOut = () => {
        fadeOutInterval.value = setInterval(() => {
            player.value.volume -= 0.01;
            if (player.value.volume <= 0.01) {
                player.value.pause();
                player.value.volume = 0;
                clearInterval(fadeOutInterval.value);
            }
        }, 20);
    }
</script>