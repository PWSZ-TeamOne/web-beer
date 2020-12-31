<template>
  <v-container>
    <v-row>
      <v-card class="w-100">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn
            v-if="this.$store.state.meetingUserId == this.$store.state.user.userId"
            elevation="2"
            class="mx-3"
            @click="$router.push('beer/create')"
          >Add beer</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="beers" :search="search">
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="p-2">
              <v-img :src="item.photo" :alt="item.name" width="75px"></v-img>
            </div>
          </template>
          <template v-slot:[`item.id`]="{ item }" v-if="this.$store.state.meetingUserId == this.$store.state.user.userId">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item.id)"
              >
                mdi-delete
              </v-icon>
            <v-btn
              color="dark"
              @click="getRateOfTheBeer(item.id, item.name)"
            >
              Rate
            </v-btn>
          </template>
          <template v-slot:[`item.id`]="{ item }"  v-else>
            <v-btn
              color="dark"
              @click="getRateOfTheBeer(item.id, item.name)"
            >
              Rate
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Rate the beer: <strong>{{this.beerName}}</strong></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Smak (0-10)"
                  type="number"
                  v-model="rate1"
                  min="0"
                  max="10"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Moc (0-10)"
                  type="number"
                  v-model="rate2"
                  min="0"
                  max="10"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Aromat (0-10)"
                  type="number"
                  v-model="rate3"
                  min="0"
                  max="10"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            class="ml-2"
            @click="storeRateTheBeer"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import firebase from "firebase";
import md5 from 'js-md5'
import validateRate from "@/mixins/validateRate";

export default {
  name: "IndexBeers",
  mixins: [validateRate],
  data() {
    return {
      beers: [],
      search: "",
      dialog: false,
      rate1: null,
      rate2: null,
      rate3: null,
      beerId: null,
      beerName: null,
      id:null,
      headers: [
        { text: "", value: "avatar" },
        {
          text: "Name",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Percent of alcohol", value: "percent"},
        { text: "Actions", value: "id"},
      ],
    };
  },
  methods: {
    getBeers() {
      db.collection("beers")
      .where("eventId", "==", this.$store.state.meetingId)
      .onSnapshot((querySnapshot) => {
        let allBeers = [];
        querySnapshot.forEach((doc) => {
          allBeers.push(doc.data());
        });
        this.beers = allBeers;
      });
    },
    deleteItem(id){
      if (confirm('Are you sure you want to delete event?')) {
        let eventsToDelete = db.collection("beers")
          .where("id", "==", id);
        eventsToDelete.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        this.deleteRatesAfterDeletedBeer(id);
        this.alert("Beer deleted!", "success");
      }
    },
    deleteRatesAfterDeletedBeer(id){
      let ratesToDelete = db.collection("rates")
        .where("beerId", "==", id)
        .where("eventId", "==", this.$store.state.meetingId);
              ratesToDelete.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                });
              });
    },
    getRateOfTheBeer(id, name){
      let docId = null;
      let ratedBeer = db.collection("rates")
          .where("beerId", "==", id)
          .where("userId", "==", this.$store.state.user.userId)
          .where("eventId", "==", this.$store.state.meetingId);

        ratedBeer.get().then((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
              ratedBeer = doc.data();
              docId = doc.id;
          });
          this.id = docId;
          this.setRateData(ratedBeer);
          this.beerId = id;
          this.beerName = name;
          this.dialog = true;
        });
    },
    storeRateTheBeer(){
      if(this.checkForm() === true){
        firebase
          .firestore()
            .collection("rates")
            .doc(this.checkId())
              .set({
                userId: this.$store.state.user.userId,
                eventId: this.$store.state.meetingId,
                beerId: this.beerId,
                rate1: this.rate1,
                rate2: this.rate2,
                rate3: this.rate3,
              }).then(()=>{
                this.dialog = false;
                this.alert("Rate added!", "success");
              });
      }
    },
    setRateData(data){
      console.log(data);
      this.rate1 = data.rate1;
      this.rate2 = data.rate2;
      this.rate3 = data.rate3;
    },
    checkId(){
      if(this.id != null){
        return this.id;
      }else{
        return this.generateId();
      }
    },
    generateId(){
      this.id = md5(new Date() + '|' + this.rate1 + '|' + this.rate2 + '|' + this.rate3 + '|' + this.$store.state.user.userId).toString();
      return this.id;
    },
  },
  created() {
    this.getBeers();
  },
};
</script>

<style scoped>
</style>
