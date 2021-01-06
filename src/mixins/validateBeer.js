export default {
  methods: {
    checkForm(){
      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
        this.alert("Name required!", "error");
      }
      if (!this.percent) {
        this.errors.push('Percent required.');
        this.alert("Percent required!", "error");
      }
      if (!this.country) {
        this.errors.push('Country required.');
        this.alert("Country required!", "error");
      }

      if(this.errors.length){
        return false;
      }else{
        return true;
      }
    }
  }
}
