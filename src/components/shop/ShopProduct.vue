<template>
    <div class="shop__product">
        <div class="shop__product-image" @click="emit('show-description', product)">
            <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
            <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
        </div>
        <div class="shop__product-info" @click="emit('show-description', product)">
            <p class="shop__product-title" v-text="product.title"/>
            <span class="shop__product-price">
                {{ product.price }} + shipping costs
            </span>
        </div>
        <button class="shop__product-add" @click="emit('added', { product: product })">
            <img src="@/assets/images/icons/plus.svg" alt="add">
        </button>
    </div>
</template>

<script setup>
    defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['added', 'show-description']);
</script>

<style lang="scss" scoped>
    .shop__product {
        &-image {
            border: 0.25rem solid $primary;
            margin-bottom: 1.25rem;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover
            }
        }
        &-info {
            cursor: pointer;
        }
        &-title {
            @include font-size(15px);
            font-weight: normal;
            margin-bottom: 0.125rem;
            line-height: 1;
        }
        &-price {
            @include font-size(15px);
            display: block; 
            font-weight: bold;
            line-height: 1;
        }
        &-add {
            @include flex-center;
            @include font-size(16px);
            line-height: 1;
            padding: 0.5rem;
            cursor: pointer;
            margin-top: 1rem;
            border: 1.65px solid $primary;
            border-radius: 5px;
            &,
            img {
                transition: $transition;
            }
            &:hover {
                background-color: $primary;
                color: $black;
                img {
                    filter: brightness(0);
                }
            }
        }
    }
</style>