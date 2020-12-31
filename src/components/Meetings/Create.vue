<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <p v-if="errors.length" class="text-left">
            <b>Please correct the following error(s):</b><br>
              <span class="text-danger" v-for="error in errors" v-bind:key="error">{{ error }}<br></span>
          </p>
        </v-col>
        <v-col
          cols="12"
          md="4"
        ><v-img
          max-height="auto"
          max-width="100%"
          :src="this.photo"
        ></v-img>
          <v-file-input
            v-model="file"
            @change="storePhoto($event);"
          ></v-file-input>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="address"
            label="Address"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-date-picker
            locale="en-in"
            :min="moment(new Date()).format('YYYY-MM-DD')"
            v-model="date"
            no-title
          ></v-date-picker>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-time-picker
          v-model="time"
          format="24hr"
         ></v-time-picker>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            elevation="2"
            @click="store"
            outlined
          >Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import store from "@/store";
import storePhoto from "@/mixins/storePhoto";
import md5 from 'js-md5'
import firebase from "firebase";

export default {
  name: "MeetingsCreate",
  mixins: [storePhoto],
  data() {
    return {
      name: null,
      address: null,
      date: null,
      time: null,
      file: [],
      photo: "https://firebasestorage.googleapis.com/v0/b/browarapp.appspot.com/o/example_beer.jpg?alt=media&token=88798838-5ad4-4980-bae3-5c9d4f4ba714",
      minDate: "",
      id: null,
      randomCode:null,
      errors: []
    };
  },
  methods: {
    store(){
      if(this.checkForm() === true){
        console.log('true');
        this.id = md5(new Date() + '|' + this.name + '|' + this.$store.state.user.userId).toString();
        this.randomCode = Math.floor(Math.random() * 99999999 + 10000000).toString();
        firebase
            .firestore()
              .collection("events")
              .doc(this.id)
              .set({
                active: true,
                userId: this.$store.state.user.userId,
                name: this.name,
                address: this.address,
                date: this.date,
                time: this.time,
                code:this.randomCode,
                timestamp:new Date(),
                avatar: this.photo,
                id:this.id
              }).then(()=>{
                this.alert("Meeting added!", "success");
                this.$router.push("/meetings");
              });
      }else{}
    },
    checkForm(){
      this.errors = [];
      console.log(this.errors);

      if (!this.name) {
        this.errors.push('Name required.');
        console.log('error');
      }
      if (!this.address) {
        this.errors.push('Age required.');
        console.log('error');
      }
      if (!this.date) {
        this.errors.push('Date date.');
        console.log('error');
      }
      if (!this.time) {
        this.errors.push('Time required.');
        console.log('error');
      }

      if(this.errors.length){
        return false;
      }else{
        return true;
      }
    }
  },
};
</script>

<style scoped>
.v-picker__title{
  background-color: cornflowerblue!important;
}
</style>
