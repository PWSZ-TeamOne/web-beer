export default {
  methods: {
    checkForm(){
      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
        this.alert('Name required!', 'error');
      }
      if (!this.address) {
        this.errors.push('Age required.');
        this.alert('Age required!', 'error');
      }
      if (!this.date) {
        this.errors.push('Date required.');
        this.alert("Date required!", "error");
      }

      if(this.errors.length){
        return false;
      }else{
        return true;
      }
    }
  }
}
