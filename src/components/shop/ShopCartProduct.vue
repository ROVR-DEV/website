<template>
    <div class="shop__cart-product">
        <div class="shop__cart-product-image">
            <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
            <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
        </div>

        <div class="shop__cart-product-info">
            <p class="shop__cart-product-title" v-text="product.title"/>
            <span class="shop__cart-product-price" v-text="product.price"/>
            <div class="shop__cart-product-row">
                <div class="shop__cart-product-size">
                    <div>size</div>
                    <div v-text="product.size"/>
                </div>

                <div class="shop__cart-product-counter">
                    <div class="shop__cart-product-counter-minus" @click="decreaseQuantity">-</div>
                    <span class="shop__cart-product-counter-quantity" v-text="product.quantity"/>
                    <div class="shop__cart-product-counter-plus" @click="increaseQuantity">+</div>
                </div>

                <div class="shop__cart-product-remove" @click="emit('remove-product', product)">
                    <img src="@/assets/images/icons/close-black.svg" alt="delete">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        product: {
            type: Object,
            required: true,
            default: {}
        }
    });

    const emit = defineEmits(['remove-product', 'quantity-change']);

    const increaseQuantity = () => {
        props.product.quantity += 1;
        emit('quantity-change', { id: props.product.id, quantity: props.product.quantity });
    }

    const decreaseQuantity = () => {
        if (props.product.quantity > 1) {
            props.product.quantity -= 1;
            emit('quantity-change', { id: props.product.id, quantity: props.product.quantity });
        }
    }
</script>

<style lang="scss" scoped>
    .shop__cart-product {
        display: flex;
        &-image {
            margin-right: 2.5rem;
            width: 9.5rem;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &-info {
            display: flex;
            flex-direction: column;
            flex: auto;
            padding-top: 0.25rem;
        }
        &-title {
            @include font-size(20px);
            color: $black;
            line-height: 1;
            font-weight: normal;
            margin: 0 0 0.75rem 0;
        }
        &-price {
            @include font-size(20px);
            color: $black;
            line-height: 1;
            font-weight: bold;
            margin: 0;
        }
        &-row {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
        }
        &-size {
            @include flex-center;
            & > div:first-child {
                @include flex-center;
                @include font-size(18px);
                font-weight: bold;
                line-height: 1;
                padding: 0.625rem 0.5rem 0.5rem 0.5rem;
                color: $black;
                border: 1.64px solid $black;
                border-radius: 5px;
                text-align: center;
                margin-right: 0.75rem;
                width: 6rem;
                text-transform: uppercase;
            }
            & > div:last-child {
                @include flex-center;
                @include font-size(18px);
                font-weight: bold;
                line-height: 1;
                padding: 0.625rem 0.75rem 0.5rem 0.75rem;
                color: $white;
                background-color: $black;
                border: 1.64px solid $black;
                border-radius: 5px;
                text-align: center;
                text-transform: uppercase;
            }
        }
        &-counter {
            @include flex-center-sb;
            width: 10rem;
            padding: 0 0.5rem;
            border-radius: 5px;
            border: 1.64px solid $black;
            margin-right: 5px;
            margin-left: auto;
            &-minus,
            &-plus {
                @include flex-center;
                @include font-size(24px);
                width: 1.5rem;
                aspect-ratio: 1;
                font-weight: normal;
                margin: 0;
                cursor: pointer;
                line-height: 1;
                color: $black;
            }
            &-minus {
                @include font-size(28px);
            }
            &-quantity {
                @include font-size(18px);
                color: $black;
                font-weight: bold;
                margin: 0;
                line-height: 1;
                padding: 0.625rem 0 0.5rem 0;
            }
        }
        &-remove {
            @include flex-center;
            border-radius: 5px;
            border: 1.64px solid $black;
            width: 2.25rem;
            cursor: pointer;
            transition: $transition;
            img {
                transition: $transition;
            }
            &:hover {
                background-color: $black;
                img {
                    filter: invert(1);
                }
            }
        }
    }
</style>