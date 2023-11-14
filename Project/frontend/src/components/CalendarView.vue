<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import axios from 'axios'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: [] // Initialize events as an empty array
      }
    }
  },
  created() {
    console.log('Component created'); // Log component creation

    // Fetch orders data from your API
    axios.get('http://localhost:8080/adminData/Orders')
      .then((ordersResponse) => {
        console.log('Orders Response:', ordersResponse.data); // Log the entire response

        const ordersData = ordersResponse.data.Orders; // Access the "Orders" property directly
        console.log('Orders Data:', ordersData); // Log the ordersData

        if (ordersData && Array.isArray(ordersData)) {
          // Transform orders data into FullCalendar events for orders
          const orderEvents = ordersData.map((order) => {
            console.log('Mapping order event for OrderID:', order.OrderID); // Log the order being processed
            return {
              id: `order-${order.OrderID}`,
              title: `OrderID: ${order.OrderID} DUE`,
              start: moment(order.DateScheduled).format('YYYY-MM-DD'),
            };
          });

          // Log the orderEvents array
          console.log('Order Events:', orderEvents);

          // Fetch custom orders data from your API
          axios.get('http://localhost:8080/adminData/CustomOrders')
            .then((customOrdersResponse) => {
              console.log('Custom Orders Response:', customOrdersResponse.data); // Log the entire response

              const customOrdersData = customOrdersResponse.data.CustomOrders; // Access the "CustomOrders" property directly
              console.log('Custom Orders Data:', customOrdersData); // Log the customOrdersData

              if (customOrdersData && Array.isArray(customOrdersData)) {
                // Transform custom orders data into FullCalendar events for custom orders
                const customOrderEvents = customOrdersData.map((customOrder) => {
                  console.log('Mapping custom order event for CustomOrderID:', customOrder.customOrderId); // Log the custom order being processed
                  return {
                    id: `customOrder-${customOrder.customOrderId}`,
                    title: `CustomOrderID: ${customOrder.CustomOrderID} DUE`,
                    start: moment(customOrder.DateScheduled).format('YYYY-MM-DD'),
                  };
                });

                // Log the customOrderEvents array
                console.log('Custom Order Events:', customOrderEvents);

                // Combine the custom order events with the order events
                const allEvents = orderEvents.concat(customOrderEvents);

                // Update the events in the calendarOptions
                this.calendarOptions.events = allEvents;

                // Debugging logs
                console.log('All Events:', allEvents);
              }
            })
            .catch((customOrdersError) => {
              console.error('Error fetching custom orders:', customOrdersError);
            });
        }
      })
      .catch((ordersError) => {
        console.error('Error fetching orders:', ordersError);
      });
  }
}
</script>

<style>
.calendar-container {
  flex: 1;
  background-color: #fff;
  padding: 10px;
  min-width: 0;
  overflow-x: auto;
}
</style>
