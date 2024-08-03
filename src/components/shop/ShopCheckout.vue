<template>
    <div class="shop__checkout">
        <table class="shop__checkout-table">
            <tbody>
                <template v-for="product in cart_products" :key="product.id">
                    <tr>
                        <td v-text="product.title"/>
                        <td>QT</td>
                        <td>SIZE</td>
                    </tr>
                    <tr>
                        <td v-text="product.price" />
                        <td v-text="product.quantity" />
                        <td v-text="product.size" />
                    </tr>
                </template>
            </tbody>
        </table>

        <div class="shop__checkout-total">
            <h3>TOTAL AMOUNT</h3>
            <div class="shop__checkout-price">
                <p>Shipping to Germany</p>
                <div>
                    <p>Total value of goods: <strong v-text="`$${totalPrice}`"/></p>
                    <p>Total value of goods: <strong v-text="`$${totalPriceIncludingVAT}`"/></p>
                </div>
            </div>
        </div>

        <div class="shop__checkout-pay" @click="emit('pay')">
            <img src="@/assets/images/paypal.svg" alt="paypal">
            <button>PURCHASE</button>
        </div>
    </div>
</template>

<script setup>
    import { computed, toRefs } from 'vue';

    const props = defineProps({
        cart_products: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(['pay']);

    const { cart_products } = toRefs(props);

    const totalPrice = computed(() => {
        return cart_products.value.reduce((total, product) => {
            const price = parseFloat(product.price.replace('$', ''));
            return total + price * product.quantity;
        }, 0).toFixed(2);
    });

    const totalPriceIncludingVAT = computed(() => {
        const total = parseFloat(totalPrice.value);
        return (total + total * 0.23).toFixed(2);
    });
</script>

<style lang="scss" scoped>
    .shop__checkout {
        color: $black;
        &-table {
            width: 100%;
            border-collapse: collapse;
            tr {
                &:nth-child(even) {
                    background-color: rgba($color: #191818, $alpha: 0.15);
                    border-top: 1px solid $black;
                    border-bottom: 1px solid $black;
                    td {
                        font-weight: bold;
                    }
                }
            }
            td {
                padding: 0.75rem 1rem 0.5rem 1rem;
                line-height: 1;
                text-transform: uppercase;
                &:first-child {
                    width: 70%;
                }
                &:last-child {
                    text-align: center;
                    width: 10%;
                }
            }
        }
        &-total {
            margin-bottom: 4rem;
            h3 {
                @include font-size(20px);
                font-weight: bold;
                line-height: 1;
                color: $black;
                margin: 4rem 0 1.5rem 0;
                padding-bottom: 1.75rem;
                border-bottom: 1px solid $black;
            }
        }
        &-price {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            p {
                @include font-size(20px);
                font-weight: normal;
                line-height: 1;
                color: $black;
                margin: 0;
                strong {
                    margin-left: 0.75rem;
                }
            }
            div > p:first-child {
                margin-bottom: 1rem;
            }
        }
        &-pay {
            @include flex-center-vert;
            justify-content: flex-end;
            button {
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
                width: 15rem;
                margin-left: 2rem;
                &:hover {
                    background-color: transparent;
                    color: $black;
                }
            }
        }
    }
</style>
