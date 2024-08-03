<template>
    <h2 class="shop__cart-title">HELLO!</h2>
    <h3 class="shop__cart-subtitle">YOUR CART:</h3>

    <ul class="shop__cart-products" v-if="cart_products.length">
        <li v-for="product in cart_products" :key="product.key">
            <shop-cart-product
                :product="product"
                @remove-product="product => emit('remove-product', product)"
                @quantity-change="emit('quantity-change', $event)"/>
        </li>
    </ul>

    <div v-else class="shop__cart-empty">Cart is empty.</div>

    <div class="shop__cart-buying">
        <div class="shop__cart-total">
            <h3 class="shop__cart-subtitle">TOTAL:</h3>
            <span v-text="`$${totalPrice}`"/>
        </div>

        <p class="shop__cart-thanks">Thank you for your purchase! <br> Please complete your order...</p>

        <button class="shop__cart-checkout" @click="emit('checkout')">CHECK OUT</button>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import ShopCartProduct from '@/components/shop/ShopCartProduct.vue';

    const emit = defineEmits(['close', 'remove-product', 'quantity-change', 'checkout']);

    const props = defineProps({
        cart_products: {
            type: Array,
            required: true
        }
    });

    const totalPrice = computed(() => {
        return props.cart_products.reduce((total, product) => {
            const price = parseFloat(product.price.replace('$', ''));
            return total + price * product.quantity;
        }, 0).toFixed(2);
    });
</script>

<style lang="scss" scoped>
    .shop__cart {
        &-title {
            @include font-size(45px);
            color: $black;
            line-height: 1;
            font-weight: bold;
            margin: 0 0 1.5rem 0;
        }
        &-subtitle {
            @include font-size(25px);
            color: $black;
            line-height: 1;
            font-weight: bold;
            margin: 0;
        }
        &-products {
            margin: 2rem 0;
            padding-bottom: 3rem;
            border-bottom: 1px solid $black;
            max-height: 480px;
            overflow-y: auto;
            li:not(:last-child) {
                margin-bottom: 2rem;
            }
            &::-webkit-scrollbar-track {
                background: rgba($color: $black, $alpha: 0.325);
            }
            &::-webkit-scrollbar-thumb {
                background: $black;
            }
        }
        &-total {
            @include flex-center-sb;
            margin-bottom: 1.5rem;
            span {
                @include font-size(20px);
                color: $black;
                line-height: 1;
                font-weight: bold;
                margin: 0;
            }
        }
        &-buying {
            margin-top: auto;
        }
        &-thanks {
            @include font-size(23px);
            color: $black;
            line-height: 1.25;
            font-weight: normal;
            margin: 0;
        }
        &-checkout {
            @include flex-center;
            @include font-size(18px);
            width: 15rem;
            background-color: $black;
            margin-left: auto;
            cursor: pointer;
            color: $white;
            line-height: 1;
            font-weight: bold;
            border: 1.64px solid $black;
            border-radius: 5px;
            padding: 0.75rem 0.5rem 0.5rem 0.5rem;
            margin-top: 1.5rem;
            transition: $transition;
            &:hover {
                background-color: transparent;
                color: $black;
            }
        }
        &-empty {
            @include font-size(18px);
            line-height: 1;
            font-weight: normal;
            margin-top: 1rem;
            color: $black;
        }
    }
</style>