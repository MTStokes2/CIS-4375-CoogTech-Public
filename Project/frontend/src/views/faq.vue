<template>
    <!-- FAQ Section -->
    <div class="container mx-auto text-center">
        <h2 class="text-3xl text-green-900 font-bold mb-4">FAQ</h2>
        <div class="text-left text-green-900 text-sm mb-4">
            <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
                <div class="flex items-center cursor-pointer" @click="toggleAnswer(index)">
                    <div class="w-6 h-6 mr-2 text-green-700">+</div>
                    <div>{{ faq.question }}</div>
                </div>
                <div v-if="faq.isOpen" class="ml-8">{{ faq.answer }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            faqs: [
                {
                    question: 'What is the turnaround time?',
                    answer: 'Depends on the design, I give an estimate after the design is agreed upon.',
                    isOpen: false,
                },
                {
                    question: 'Do you do priority shipping?',
                    answer: 'Yes',
                    isOpen: false,
                },
                {
                    question: 'What material shirts do you offer?',
                    answer: '100% Cotton, 50/50 Polyester/ Cotton, Dri-Fit',
                    isOpen: false,
                },
                {
                    question: 'What is the fastest I can get the shirt?',
                    answer: 'Local: 1-2 Days, Outside: 4-5 Days',
                    isOpen: false,
                },
                {
                    question: 'Can I pay extra to prioritize my order?',
                    answer: 'Yes, depending on my schedule',
                    isOpen: false,
                },
                {
                    question: 'Can I get a discount for a group order?',
                    answer: 'Over 15 shirts, yes.',
                    isOpen: false,
                },
            ],
        };
    },
    methods: {
        toggleAnswer(index) {
            this.faqs[index].isOpen = !this.faqs[index].isOpen;
        },
    },
};
</script>
<style></style>