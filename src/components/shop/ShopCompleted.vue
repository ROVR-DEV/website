<template>
    <div class="shop__completed">
        <h2 class="shop__completed-thanks">THANK YOU <br> mypaypalemail@rovr.live</h2>
        <h2 class="shop__completed-title">ORDER  COMPLETED!</h2>
        <span class="shop__completed-number">ORDER NUMBER #67900800</span>
        <p class="shop__completed-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.</p>
        <button class="shop__completed-download">DOWNLOAD RECEIPT</button>
    </div>
</template>

<style lang="scss" scoped>
    .shop__completed {
        text-align: center;
        color: $black;
        max-width: 90%;
        margin: 0 auto;
        padding-top: 5rem;
        &-thanks {
            @include font-size(45px);
            margin: 0 0 3rem 0;
        }
        &-title {
            @include font-size(45px);
            margin: 0 0 0.25rem 0;
            line-height: 1;
            color: rgba($color: $black, $alpha: 0.5);
        }
        &-number {
            @include font-size(20px);
            display: block;
            line-height: 1;
            font-weight: normal;
            margin: 0 0 2rem 0;
        }
        &-message {
            @include font-size(20px);
            line-height: 1.325;
            font-weight: normal;
            margin: 0 0 3.5rem 0;
        }
        &-download {
            @include flex-center;
            @include font-size(18px);
            border: 2px solid $black;
            border-radius: 5px;
            text-transform: uppercase;
            font-weight: bold;
            padding: 0.625rem 0.5rem 0.325rem 0.5rem;
            cursor: pointer;
            transition: $transition;
            background-color: $black;
            color: $white;
            width: 16rem;
            margin-left: 2rem;
            margin: 0 auto;
            &:hover {
                background-color: transparent;
                color: $black;
            }
        }
    }
</style>