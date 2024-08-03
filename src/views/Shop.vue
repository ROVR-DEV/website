<template>
    <section class="shop">
        <div class="shop__controls">
            <button class="shop__currency">£</button>
            <button class="shop__cart-count" @click="shop_screen_type = 'cart'; is_show_cart_open = true">
                <span v-if="cart_count > 0" v-text="cart_count"/>
                <img src="@/assets/images/icons/cart.svg" alt="cart">
            </button>
        </div>
        <div class="shop__container">
            <h1 class="shop__title">CELEBRATING <br> THE MUSICAL JOURNEY </h1>
            <p class="shop__caption">In an ever-evolving world of music, curators are essential in shaping our listening experiences. These dedicated individuals and teams sift through countless tracks, uncover hidden gems, and create perfect playlists that become the soundtrack of our lives.</p>
            <ul class="shop__filters">
                <li class="shop__filter" v-for="filter in filters" :key="filter.id">
                    {{ filter.name }}
                    <button class="shop__filter-close">
                        <img src="@/assets/images/icons/close-black.svg" alt="filter close">
                    </button>
                </li>
            </ul>
        </div>
        <div class="shop__products">
            <shop-product
                v-for="product in products"
                :key="product.id"
                :product="product"
                @added="addProductToCart"
                @show-description="product => showProductDescription(product)"/>
        </div>

        <shop-screen
            :cart_products="cart_products"
            :product="product_info"
            :type="shop_screen_type"
            :cart_count="cart_count"
            @close="is_show_cart_open = false; shop_screen_type = '';"
            @remove-product="product => removeProductFromCart(product)"
            @quantity-change="changeProductQuantity"
            @size-change="changeProductSize"
            @open-cart="shop_screen_type = 'cart'"
            @added="addProductToCart"
            @checkout="shop_screen_type = 'checkout'"
            @pay="shop_screen_type = 'completed'"
            :class="{ 'shop__screen--open': is_show_cart_open }"/>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import ShopProduct from '@/components/shop/ShopProduct.vue';
    import ShopScreen from '@/components/shop/ShopScreen.vue';

    const cart_count = ref(0);
    const is_show_cart_open = ref(false);
    const cart_products = ref([]);
    const shop_screen_type = ref('');
    const product_info = ref(null);

    const addProductToCart = ({ product, size }) => {
        const existingProduct = cart_products.value.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            if(size) product.size = size;
            cart_products.value.push(product);
            cart_count.value++;
        }
    }

    const showProductDescription = (product) => {
        product_info.value = product;
        shop_screen_type.value = 'info';
        is_show_cart_open.value = true;
    }

    const removeProductFromCart = (product) => {
        const index = cart_products.value.findIndex(n => n.id === product.id);
        if (index !== -1) {
            cart_count.value -= cart_products.value[index].quantity;
            cart_products.value.splice(index, 1);
        }
    }

    const changeProductQuantity = ({ id, quantity }) => {
        const product = cart_products.value.find(p => p.id === id);
        if (product) {
            cart_count.value += quantity - product.quantity;
            product.quantity = quantity;
        }
    }

    const changeProductSize = ({ id, size }) => {
        const product = products.value.find(p => p.id === id);
        if (product) {
            product.size = size;
        }
    }

    const filters = ref([
        { id: 0, name: 'NEW ARRIVALS' },
        { id: 1, name: 'APPAREL' },
        { id: 2, name: 'MUSIC' },
        { id: 3, name: 'ACCESSORIES' }
    ]);

    const products = ref([
        { id: 0, title: 'ROVR - HOODIE BLACK CLASSIC', price: '$35.00', image: 'hoodie', size: 'xxl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.' },
        { id: 1, title: 'ROVR - VINYLS', price: '$35.00', image: 'vinyls', size: 'xxl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.' },
        { id: 2, title: 'ROVR - HOODIE BLACK CLASSIC', price: '$37.00', image: 'hoodie', size: 'xxl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.' },
        { id: 3, title: 'ROVR - VINYLS', price: '$35.00', image: 'vinyls', size: 'xxl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.' },
        { id: 4, title: 'ROVR - VINYLS', price: '$35.00', image: 'vinyls', size: 'xxl', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante ipsum, blandit id ultricies vitae, posuere vel mi. Aliquam in nibh et nulla bibendum viverra. Aenean nulla nunc, porta id condimentum sit amet, convallis non nisl. Nullam semper purus id diam auctor.' }
    ]);
</script>

<style lang="scss" scoped>
    .shop {
        color: $primary;
        padding: 2rem 3rem;
        height: auto;
        position: relative;
        &__controls {
            @include flex-center;
            position: absolute;
            top: 2rem;
            right: 3rem;
        }
        &__currency {
            @include flex-center;
            @include font-size(24px);
            border-radius: 50%;
            width: 2.625rem;
            aspect-ratio: 1;
            color: $primary;
            background-color: transparent;
            border: 1.84px solid $primary;
            font-weight: bold;
            cursor: pointer;
            margin-right: 1rem;
            transition: $transition;
            line-height: 1;
            &:hover {
                background-color: $primary;
                color: $black;
            }
        }
        &__cart-count {
            position: relative;
            cursor: pointer;
            span {
                @include flex-center;
                position: absolute;
                top: 9px;
                width: 15px;
                left: 26px;
                color: $primary;
                font-size: 0.825rem;
                font-weight: bold;
                line-height: 1;
                text-align: center;
                @media screen and (max-width: 1660px) {
                    top: 11px;
                }
            }
            img {
                width: 56px;
            }
        }
        &__container {
            max-width: 1350px;
        }
        &__title {
            @include font-size(80px);
            font-weight: bold;
            line-height: 1;
            margin: 0 0 0.75rem 0;
        }
        &__caption {
            @include font-size(20px);
            font-weight: normal;
            line-height: 1;
            margin: 0;
        }
        &__filters {
            @include flex-center-vert;
            margin: 1.5rem 0;
        }
        &__filter {
            @include flex-center-vert;
            @include font-size(16px);
            border-radius: 5px;
            background-color: $primary;
            color: $black;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            padding: 0.625rem 1.5rem 0.5rem 1.5rem;
            line-height: 1;
            &-close {
                margin-left: 0.625rem;
                position: relative;
                top: -1px;
                cursor: pointer;
            }
            &:not(:last-child) {
                margin-right: 1.25rem;
            }
        }
        &__products {
            @include grid(5, 2.5rem);
        }
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: opacity 0.3s ease;
    }
</style>