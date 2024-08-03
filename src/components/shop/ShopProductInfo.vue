<template>
    <div class="shop__product">
        <div class="shop__product-images">
            <div class="shop__product-image--main">
                <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
                <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
            </div>
            <div class="shop__product-image--small">
                <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
                <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
            </div>
            <div class="shop__product-image--small">
                <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
                <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
            </div>
            <div class="shop__product-image--small">
                <img v-if="product.image === 'hoodie'" src="@/assets/images/products/hoodie.png" alt="hoodie">
                <img v-else src="@/assets/images/products/vinyls.png" alt="vinyls">
            </div>
        </div>
        <div class="shop__product-info">
            <p class="shop__product-title" v-text="product.title"/>
            <span class="shop__product-price" v-text="product.price"/>
            <div class="shop__product-sizes">
                <button
                    v-for="size in sizes"
                    :key="size.id"
                    class="shop__product-size"
                    :class="{ 'shop__product-size--active' : size.is_active }"
                    v-text="size.name"
                    @click="setSize(size.id); emit('product-changed', { id: product.id, size: size.name })"/>
            </div>
            <p class="shop__product-description" v-text="product.description"/>
            <p class="shop__product-shipping"><strong>In Stock</strong> Standard shipping 1-3 business days</p>
        </div>
    </div>

    <div class="shop__product-buttons">
        <button class="shop__product-share">SHARE</button>
        <button class="shop__product-add" @click="emit('added', { product: product, size: sizes.find(s => s.is_active).name })">ADD TO CART</button>
    </div>

    <button class="shop__product-cart" @click="emit('open-cart')">YOUR CART <span v-if="cart_count > 0" v-text="`(${cart_count})`"/></button>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        product: {
            type: Object,
            required: true,
        },
        cart_count: {
            type: Number,
            required: true,
        },
    });

    const emit = defineEmits(['open-cart', 'added', 'product-changed']);

    const sizes = ref([
        { id: 0, name: 's', is_active: false },
        { id: 1, name: 'm', is_active: false },
        { id: 2, name: 'l', is_active: false },
        { id: 3, name: 'xl', is_active: false },
        { id: 4, name: 'xxl', is_active: true },
    ]);

    onMounted(() => {
        const sz = sizes.value.find(s => s.name === props.product.size);
        if(sz) {
            sizes.value.forEach(s => s.is_active = false);
            sz.is_active = true;
        }
    });

    const setSize = (id) => {
        sizes.value.forEach(s => s.is_active = false);
        sizes.value.find(s => s.id === id).is_active = true;
    }
</script>

<style lang="scss" scoped>
    .shop__product {
        display: flex;
        &-images {
            @include grid(3, 0.325rem);
            margin-right: 1.75rem;
            flex: 1 0 320px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &-image--main {
            grid-column: 1/4;
        }
        &-title {
            @include font-size(20px);
            font-weight: normal;
            line-height: 1;
            color: $black;
            margin: 0 0 1rem 0;
        }
        &-info {
            display: flex;
            flex-direction: column;
            padding-top: 1rem;
        }
        &-price {
            @include font-size(20px);
            font-weight: bold;
            line-height: 1;
            color: $black;
            margin: 0;
        }
        &-sizes {
            @include flex-center-vert;
            margin: 2.5rem 0;
        }
        &-size {
            @include flex-center;
            @include font-size(18px);
            font-weight: bold;
            padding: 0.5rem 0.5rem 0.25rem 0.5rem;
            width: 3.5rem;
            border-radius: 5px;
            border: 1.5px solid $black;
            color: $black;
            line-height: 1;
            cursor: pointer;
            text-transform: uppercase;
            transition: $transition;
            &:hover,
            &--active {
                background-color: $black;
                color: $white;
            }
            &:not(:last-child) {
                margin-right: 0.325rem;
            }
        }
        &-description {
            @include font-size(20px);
            font-weight: normal;
            line-height: 1.325;
            color: $black;
            margin: 0;
        }
        &-shipping {
            @include font-size(20px);
            font-weight: normal;
            line-height: 1;
            color: $black;
            margin: auto 0 0 0;
        }
        &-buttons {
            @include flex-center-vert;
            justify-content: flex-end;
            margin-top: 4rem;
            button {
                @include flex-center;
                @include font-size(18px);
                border: 2px solid $black;
                border-radius: 5px;
                text-transform: uppercase;
                font-weight: bold;
                padding: 0.75rem 0.5rem 0.5rem 0.5rem;
                cursor: pointer;
                transition: $transition;
            }
        }
        &-share {
            color: $black;
            width: 10rem;
            margin-right: 0.5rem;
            &:hover {
                box-shadow: 1px 1px 10px rgba($color: $black, $alpha: 0.325);
            }
        }
        &-add {
            background-color: $black;
            color: $white;
            width: 12rem;
            &:hover {
                box-shadow: 3px 3px 20px rgba($color: $black, $alpha: 0.325);
            }
        }
        &-cart {
            @include flex-center;
            @include font-size(18px);
            border: 2px solid $black;
            border-radius: 5px;
            text-transform: uppercase;
            font-weight: bold;
            padding: 0.75rem 0.5rem 0.5rem 0.5rem;
            cursor: pointer;
            transition: $transition;
            color: $black;
            width: 18rem;
            margin-left: auto;
            margin-top: auto;
            &:hover {
                background-color: $black;
                color: $white;
            }
        }
    }
</style>