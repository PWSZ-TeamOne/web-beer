export default {
  methods: {
    checkForm(){
      this.errors = [];
      console.log(this.errors);

      if (!this.name) {
        this.errors.push('Name required.');
        this.alert("Name required!", "error");
        console.log('error');
      }
      if (!this.percent) {
        this.errors.push('Percent required.');
        this.alert("Percent required!", "error");
        console.log('error');
      }
      if (!this.country) {
        this.errors.push('Country required.');
        this.alert("Country required!", "error");
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
