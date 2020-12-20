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
          <template v-slot:[`item.id`]="{ item }">
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
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
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
      }
    },
  },
  created() {
    this.getBeers();
  },
};
</script>

<style scoped>
</style>
