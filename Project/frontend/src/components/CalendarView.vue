<template>
  <div class="calendar-container">
    <FullCalendar :options='calendarOptions' />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      }
    }
  }
}
</script>

<style>
.calendar-container {
  flex: 1; /* take up only necessary space */
  padding: 30px; /* for spacing, adjust as needed */
  /* Add more styles as needed for your specific layout */
}
</style>