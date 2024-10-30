<template>
    <section class="event">
        <div class="container">
            <h1 class="event__title">ROVR x Poobah Records L.A.</h1>
            <p class="event__text"><strong>ROVR</strong>, the revolutionary music discovery platform, is excited to announce a collaboration event with <strong>Poobah Records</strong> as part of a series of events hosted in record shops around the world.</p>
            <p class="event__text">Established in 1971, <strong>Poobah Record</strong> Shop has become an iconic destination for music enthusiasts in the Los Angeles area. The independent record store has been at the forefront of the underground and alternative music scene for over five decades.</p>
            <p class="event__text">The sensational event offers free entry on Thursday, October 10th, from 6 to 10 PM. Experience a unique California-based line up featuring <strong>Ahwlee</strong>, hailing from Long Beach, CA, crafts his art by combining dissimilar elements, creating sounds that tap into the collective unconscious. <strong>Alexander Spit</strong>, a rapper and producer from LA, shares the stage with his powerful and punchy bars. <strong>Lady C</strong> rises from the underground house scene to spin her unique subterranean style with deep vibrations. <strong>Shaolin Watts</strong>, aka Mndsgn / Ringgo Ancheta, explores the evolution of self, leading listeners to question beauty and truth through the musical human condition. <strong>Mo0d</strong>, The experimental jazz band, pushes the boundaries of the genre with their avant-garde compositions and electrifying performances—"Free Jazz you wanna pay for.”</p>
            <p class="event__text"><strong>ROVR</strong> is an innovative sound exploration medium redefining the radio experience by blending cutting-edge technology with traditional crate-digging techniques. We pride ourselves on showcasing the pinnacle of sound curation, curated by some of the industry's most talented musicians and selectors, valuing human curation over AI-driven algorithms becoming overly prevalent in the industry.</p>
            <div class="event__image">
                <img src="@/assets/images/event-10-10-24.png" alt="poster">
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .event {
        height: auto;
        padding: 7rem 1rem;
        background-color: $primary;
        .container {
            max-width: 1200px;
            @media screen and (max-width: 1660px) {
                max-width: 1000px;
            }
        }
        @media screen and (max-width: 480px) {
            padding: 3rem 1rem;
        }
        &__title {
            font-weight: bold;
            font-size: 5rem;
            line-height: 1;
            margin: 0 0 4rem 0;
            @media screen and (max-width: 1660px) {
                font-size: 4rem;
            }
            @media screen and (max-width: 480px) {
                font-size: 3rem;
                margin-bottom: 3.5rem;
            }
        }
        &__text {
            font-size: 2rem;
            line-height: 1.25;
            margin-top: 0;
            padding-left: 2.5rem;
            @media screen and (max-width: 1660px) {
                font-size: 1.75rem;
                padding-left: 2rem;
            }
            @media screen and (max-width: 480px) {
                padding-left: 0;
            }
            &:not(:last-child) {
                margin-bottom: 2rem;
            }
        }
    }
</style>