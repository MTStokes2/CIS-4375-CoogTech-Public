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
        weekends: true,
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
  padding: 10px; /* for spacing, adjust as needed */
  min-width: 0; /* Allow the calendar to shrink with the container */
  overflow-x: auto; /* Allow horizontal scrolling */
}
</style>