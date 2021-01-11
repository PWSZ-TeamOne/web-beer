<template>
  <v-container class="pb-0">
    <v-row>
      <v-card class="w-100 px-5">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="beers" :search="search">
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="p-2">
              <v-img :src="item.photo" :alt="item.name" width="75px"></v-img>
            </div>
          </template>
          <template v-slot:[`item.id`]="{ item }">
            <ItemRates v-bind:beerId="item.id" />
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import firebase from "firebase";
import ItemRates from "@/components/Rates/Item";

export default {
  name: "IndexBeers",
  data() {
    return {
      beers: [],
      search: "",
      headers: [
        { text: "", value: "avatar" },
        {
          text: "Name",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Rating", value: "id" },
      ],
    };
  },
  components: {
    ItemRates,
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
  },
  created() {
    this.getBeers();
  },
};
</script>

<style scoped>
</style>
