export default {
  methods: {
    calc() {
      this.avg = parseFloat(((this.rate2 * 1) + (this.rate1 * 3) + (this.rate3 * 2)) / (1 + 2 + 3)).toFixed(2);
      this.checkAvg();
    },
    checkAvg() {
      if (isNaN(this.avg)) {
        this.avg = 0;
      }
    },
  }
}
