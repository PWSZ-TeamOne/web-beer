<template>
  <v-form>{{this.editedBeer.name}}
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
        </v-col>
        <v-col
          cols="12"
          md="4"
        ><v-img
          max-height="auto"
          max-width="100%"
          :src="this.photo"
        ></v-img>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-file-input
                v-model="file"
                label="Photo"
                @change="storePhoto($event);"
                required
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              md="6"
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
                v-model="barcode"
                label="Barcode"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="blg"
                label="BLG"
                type="number"
                min="0"
                max="100"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="percent"
                label="Percent"
                type="number"
                min="0"
                max="100"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="country"
                label="Country"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="8"
            >
              <v-textarea
                v-model="description"
                label="Description"
                required
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="text-left"
            >
              <v-btn
                elevation="2"
                @click="store"
                outlined
              >Save</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import store from "@/store";
import storePhoto from "@/mixins/storePhoto";
import validateBeer from "@/mixins/validateBeer";
import md5 from 'js-md5'
import firebase from "firebase";

export default {
  name: "BeersCreate",
  mixins: [storePhoto, validateBeer],
  data() {
    return {
      errors: [],
        name: null,
        country: null,
        blg: null,
        percent: null,
        barcode: null,
        description: null,
        file: [],
        photo: null,
        id: null,
        editedBeer: {}
    };
  },
  methods: {
    getBeer(){
      let beerFounded = [];
      db.collection("beers")
        .doc(this.$store.state.editedBeerId)
        .get()
        .then((doc) => {
          this.editedBeer = doc.data();
          this.setBeerData();
        }).catch(function(error) {
          console.log("Error getting cached document:", error);
        });
    },
    setBeerData(){
      this.id = this.editedBeer.id;
      this.name = this.editedBeer.name;
      this.country = this.editedBeer.country;
      this.percent = this.editedBeer.percent;
      this.blg = this.editedBeer.blg;
      this.barcode = this.editedBeer.barcode;
      this.description = this.editedBeer.description;
      this.photo = this.editedBeer.photo;
    },
    store(){
      if(this.checkForm() === true){
        firebase
            .firestore()
              .collection("beers")
              .doc(this.id)
              .update({
                name: this.name,
                blg: this.blg,
                country: this.country,
                percent: this.percent,
                description:this.description,
                barcode:this.barcode,
                photo: this.photo,
              }).then(()=>{
                store.dispatch("setEditedBeerId", null);
                this.alert("Beer edited!", "success");
                this.$router.push("/meet");
              });
      }
    },
  },
  created() {
    this.getBeer();
  },
};
</script>

<style scoped>
</style>
