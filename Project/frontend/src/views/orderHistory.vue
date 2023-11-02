<template>
    <div>
        <v-btn @click="router.push({ name: 'Catalog' })" color="#F5F5DC" variant="elevated">
            Back to catalog
        </v-btn>

        <div v-if="!orderHistory.length" style="text-align: center">
            <h1>No order history available.</h1>
        </div>

        <div class="order-items" v-else>
            <div class="order-item" v-for="order in orderHistory" :key="order.id">
                <div class="order-details">
                    <!-- Display order details such as order date, order number, etc. -->
                    <h2>Order Date: {{ order.date }}</h2>
                    <h3>Order Number: {{ order.orderNumber }}</h3>

                    <!-- Display ordered items -->
                    <div v-for="item in order.items" :key="item.id">
                        <div class="item-details">
                            <img :src="item.thumbnail" alt="">
                            <span>Brand: {{ item.brand }}</span>
                            <span>Category: {{ item.category }}</span>
                            <span>Price: ${{ item.price }}</span>
                        </div>
                    </div>

                    <!-- Display the total price for the order -->
                    <p class="bold">Total Price: <span>${{ order.totalCost }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
    name: 'OrderHistory'
})
</script>
  
<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const orderHistory = ref([
    {
        id: 1,
        date: '2023-01-15',
        orderNumber: 'ORD12345',
        totalCost: 250.00,
        items: [
            {
                id: 1,
                thumbnail: 'item1.jpg',
                brand: 'Brand A',
                category: 'Category X',
                price: 100.00
            },
            {
                id: 2,
                thumbnail: 'item2.jpg',
                brand: 'Brand B',
                category: 'Category Y',
                price: 150.00
            }
        ]
    },
    {
        id: 2,
        date: '2023-02-20',
        orderNumber: 'ORD54321',
        totalCost: 180.00,
        items: [
            {
                id: 3,
                thumbnail: 'item3.jpg',
                brand: 'Brand C',
                category: 'Category Z',
                price: 80.00
            },
            {
                id: 4,
                thumbnail: 'item4.jpg',
                brand: 'Brand D',
                category: 'Category W',
                price: 100.00
            }
        ]
    }
]);

</script>
  
<style scoped>
.order-details {
    margin: 20px;
    padding: 16px;
    box-shadow: 0 0 17px 6px #e2dddd;
    border-radius: 8px;
}

.item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 10px;
}

.bold {
    font-weight: bold;
}
</style>