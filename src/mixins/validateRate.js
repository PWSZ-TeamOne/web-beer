export default {
  methods: {
    checkForm(){
      this.errors = [];
      console.log(this.errors);

      if (this.rate1 < 0 || this.rate1 > 10 || this.rate1 == "") {
        this.errors.push('Rate 1 has incorret data.');
        this.alert("Rate 1 has incorret data!", "error");
        console.log('error');
      }
      if (this.rate2 < 0 || this.rate2 > 10 || this.rate2 == "") {
        this.errors.push('Rate 2 has incorret data.');
        this.alert("Rate 2 has incorret data!", "error");
        console.log('error');
      }
      if (this.rate3 < 0 || this.rate3 > 10 || this.rate3 == "") {
        this.errors.push('Rate 3 has incorret data.');
        this.alert("Rate 3 has incorret data!", "error");
        console.log('error');
      }

      if(this.errors.length){
        return false;
      }else{
        return true;
      }
    }
  }
}
