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
            @click="$router.push('meetings/create')"
          >Add metting</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="meetings" :search="search">
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="p-2">
              <v-img :src="item.avatar" :alt="item.name" width="75px"></v-img>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "MeetingsIndex",
  data() {
    return {
      meetings: [],
      search: "",
      headers: [
        { text: "", value: "avatar" },
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Code", value: "code" },
        { text: "Date", value: "date" },
        { text: "Address", value: "address" },
      ],
    };
  },
  methods: {
    getMettings() {
      db.collection("events")
      .where("userId", "==", this.$store.state.user.userId)
      .onSnapshot((querySnapshot) => {
        let allMeetings = [];
        querySnapshot.forEach((doc) => {
          allMeetings.push(doc.data());
        });
        this.meetings = allMeetings;
      });
    },
  },
  created() {
    this.getMettings();
  },
};
</script>

<style scoped>
</style>
