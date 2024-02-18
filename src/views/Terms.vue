<template>
    <section class="terms">
        <img src="@/assets/images/logo.svg" alt="logo">
        <p>Working on it!</p>
    </section>
</template>

<style lang="scss" scoped>
    .terms {
        @include flex-center-column;
        p {
            @include font-size(24px);
            color: $primary;
            margin: 2rem 0;
            font-style: italic;
            position: relative;
            left: -5px;
        }
    }
</style>