export default {
  methods: {
    checkForm() {
      this.errors = [];

      if (this.rate1 < 0 || this.rate1 > 10 || this.rate1 == null) {
        this.errors.push('Rate 1 has incorret data.');
        this.alert("Rate 1 has incorret data!", "error");
      }
      if (this.rate2 < 0 || this.rate2 > 10 || this.rate2 == null) {
        this.errors.push('Rate 2 has incorret data.');
        this.alert("Rate 2 has incorret data!", "error");
      }
      if (this.rate3 < 0 || this.rate3 > 10 || this.rate3 == null) {
        this.errors.push('Rate 3 has incorret data.');
        this.alert("Rate 3 has incorret data!", "error");
      }

      if (this.errors.length) {
        return false;
      } else {
        return true;
      }
    }
  }
}
