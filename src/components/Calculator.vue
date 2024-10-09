<template>
  <div class="calculator bg-gray-800 p-5 rounded-xl shadow-lg text-white max-w-xs mx-auto  ">
    <div class="display bg-gray-900 text-4xl p-5 rounded-lg mb-5 text-right shadow-inner">
      {{ current }}
    </div>
    <div class="grid grid-cols-4 gap-3">
      <!-- Special Buttons -->
      <button @click="clear" class="special bg-yellow-500 hover:bg-yellow-600 py-2">C</button>
      <button @click="deleteLast" class="special bg-yellow-500 hover:bg-yellow-600 py-2">DEL</button>
      <button @click="append('/')" class="special bg-yellow-500 hover:bg-yellow-600 py-2">/</button>
      <button @click="append('*')" class="special bg-yellow-500 hover:bg-yellow-600 py-2">*</button>

      <!-- Numbers and Operations -->
      <button @click="append(7)" class="bg-gray-700 hover:bg-gray-600 py-2">7</button>
      <button @click="append(8)" class="bg-gray-700 hover:bg-gray-600 py-2">8</button>
      <button @click="append(9)" class="bg-gray-700 hover:bg-gray-600 py-2">9</button>
      <button @click="append('-')" class="special bg-yellow-500 hover:bg-yellow-600 py-2">-</button>

      <button @click="append(4)" class="bg-gray-700 hover:bg-gray-600 py-2">4</button>
      <button @click="append(5)" class="bg-gray-700 hover:bg-gray-600 py-2">5</button>
      <button @click="append(6)" class="bg-gray-700 hover:bg-gray-600 py-2">6</button>
      <button @click="append('+')" class="special bg-yellow-500 hover:bg-yellow-600 py-2">+</button>

      <button @click="append(1)" class="bg-gray-700 hover:bg-gray-600 py-2">1</button>
      <button @click="append(2)" class="bg-gray-700 hover:bg-gray-600 py-2">2</button>
      <button @click="append(3)" class="bg-gray-700 hover:bg-gray-600 py-2">3</button>
      <button @click="calculate" class="equals bg-red-600 hover:bg-red-700 row-span-2 py-2">=</button>

      <button @click="append(0)" class="zero bg-gray-700 hover:bg-gray-600 col-span-2 py-2">0</button>
      <button @click="append('.')" class="bg-gray-700 hover:bg-gray-600 py-2">.</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',
    };
  },
  methods: {
    append(value) {
      this.current += value;
    },
    clear() {
      this.current = '';
    },
    deleteLast() {
      this.current = this.current.slice(0, -1);
    },
    calculate() {
      try {
        this.current = eval(this.current);
      } catch (e) {
        this.current = 'Error';
      }
    },
  },
};
</script>

<style scoped>
.equals {
  grid-row: span 2;
}
.zero {
  grid-column: span 2;
}
</style>
