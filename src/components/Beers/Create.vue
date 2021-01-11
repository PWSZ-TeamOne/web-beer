<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12"> </v-col>
        <v-col cols="12" md="4"
          ><v-img max-height="auto" max-width="100%" :src="this.photo"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-row class="form-box">
            <v-col cols="12" md="12">
              <v-file-input
                v-model="file"
                label="Photo"
                @change="savePhoto($event)"
                required
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="name" label="Name" required></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="barcode"
                label="Barcode"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="blg"
                label="BLG"
                type="number"
                min="0"
                max="100"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="percent"
                label="Percent"
                type="number"
                min="0"
                max="100"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="country"
                label="Country"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                v-model="description"
                label="Description"
                required
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn elevation="2" @click="store" outlined>Save</v-btn>
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
import md5 from "js-md5";
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
      photo:
        "https://firebasestorage.googleapis.com/v0/b/browarapp.appspot.com/o/example_beer.jpg?alt=media&token=88798838-5ad4-4980-bae3-5c9d4f4ba714",
      id: null,
    };
  },
  methods: {
    store() {
      if (this.checkForm() === true) {
        this.id = md5(
          new Date() + "|" + this.name + "|" + this.$store.state.user.userId
        ).toString();
        firebase
          .firestore()
          .collection("beers")
          .doc(this.id)
          .set({
            userId: this.$store.state.user.userId,
            eventId: this.$store.state.meetingId,
            name: this.name,
            blg: this.blg,
            country: this.country,
            percent: this.percent,
            description: this.description,
            barcode: this.barcode,
            timestamp: new Date(),
            photo: this.photo,
            id: this.id,
          })
          .then(() => {
            this.alert("Beer added!", "success");
            this.$router.push("/meet");
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
