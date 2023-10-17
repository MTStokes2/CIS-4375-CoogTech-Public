<template>
    <div class="min-h-screen flex justify-center items-center">
        <div class=" p-20 rounded shadow-md">
            <h2 class="text-3xl text-green-900 font-bold mb-10">Contact Us</h2>

            <div class="mb-8">
                <p class="text-green-900 text-sm font-bold">Etsy: The Craft Shack by Erika</p>
            </div>

            <div class="mb-8">
                <p class="text-green-900 text-sm font-bold">Email: VargasErikaY@gmail.com </p>
            </div>

            <div class="mb-8">
                <p class="text-green-900 text-sm font-bold">Phone Number: (832)724-3673</p>
            </div>
            <div class="mb-8">
                <p class="text-green-900 text-sm font-bold">Instagram : TheCraftShack</p>
            </div>
            <div class="mb-8">
                <p class="text-green-900 text-sm font-bold">TikTok : TheCraftShack</p>
            </div>

            <div class="mb-8">
                <label class="block text-green-900 text-sm font-bold mb-2" for="message">Message</label>
                <textarea class="w-full py-2 px-3 border border-green-200 rounded focus:outline-none focus:border-green-200"
                    id="message" rows="4" placeholder="Enter your message"></textarea>
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-green-900 hover:bg-green-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Send
                </button>
            </div>
        </div>
    </div>

    <!-- FAQ Section -->
    <section id="about-us" class="py-16">
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

    </section>
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