<template>
    <div class="shop__screen">
        <div class="shop__screen-header">
            <div class="shop__screen-logo">
                <img src="@/assets/images/logo/logo.svg" alt="logo">
            </div>
            <button class="shop__screen-close" @click="emit('close')">
                <img src="@/assets/images/icons/close-small-thin.svg" alt="close">
            </button>
        </div>

        <div class="shop__screen-body">
            <shop-cart
                v-if="type === 'cart'"
                :cart_products="cart_products"
                @remove-product="product => emit('remove-product', product)"
                @quantity-change="emit('quantity-change', $event)"
                @checkout="emit('checkout')"/>

            <shop-product-info
                v-else-if="type === 'info'"
                :product="product"
                :cart_count="cart_count"
                @open-cart="emit('open-cart')"
                @added="emit('added', $event)"
                @product-changed="emit('size-change', $event)"/>

            <shop-checkout
                v-else-if="type === 'checkout'"
                :cart_products="cart_products"
                @pay="emit('pay')"/>

            <shop-completed v-else-if="type === 'completed'"/>
        </div>
    </div>
</template>

<script setup>
    import ShopCart from '@/components/shop/ShopCart.vue';
    import ShopProductInfo from '@/components/shop/ShopProductInfo.vue';
    import ShopCheckout from '@/components/shop/ShopCheckout.vue';
    import ShopCompleted from '@/components/shop/ShopCompleted.vue';
    const emit = defineEmits(['close', 'remove-product', 'quantity-change', 'open-cart', 'added', 'size-change', 'checkout', 'pay']);

    const props = defineProps({
        cart_products: {
            type: Array,
            required: true
        },
        product: {
            type: Object,
            required: false
        },
        cart_count: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .shop__screen {
        position: fixed;
        width: 50%;
        height: 100%;
        top: 0;
        right: -100%;
        z-index: 9;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
        &--open {
            right: 0;
        }
        &-header {
            @include flex-center-sb;
            background-color: #242323;
            padding: 1.5rem 1.75rem;
        }
        &-close {
            @include flex-center;
            width: 3rem;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 1.5px solid $primary;
            cursor: pointer;
            transition: $transition;
            img {
                transition: $transition;
            }
            &:hover {
                background-color: $primary;
                img {
                    filter: brightness(0);
                }
            }
        }
        &-body {
            padding: 2.5rem 1.75rem;
            background-color: $primary;
            flex: auto;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
    }
</style>