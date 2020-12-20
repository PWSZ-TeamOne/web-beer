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
          <v-text-field
            v-model="meetingCode"
            label="Meeting code"
          ></v-text-field>
          <v-btn
            elevation="2"
            class="mx-3"
            @click="$router.push('meetings/create')"
          >Join metting</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="meetings" :search="search">
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="p-2">
              <v-img :src="item.avatar" :alt="item.name" width="75px"></v-img>
            </div>
          </template>
          <template v-slot:[`item.id`]="{ item }">
            <v-icon
              small
              @click="seeItem(item.id)"
            >
              mdi-eye
            </v-icon>
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
  name: "MeetingsIndex",
  data() {
    return {
      meetings: [],
      meetingCode:null,
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
        { text: "Actions", value: "id"},
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
    deleteItem(id){
      if (confirm('Are you sure you want to delete event?')) {
        let eventsToDelete = db.collection("events")
          .where("id", "==", id);
        eventsToDelete.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
      }
    },
    seeItem(id){
      store.dispatch("setMeetingId", id).
      then(()=>{
        this.$router.push("/meet");
      });;
    }
  },
  created() {
    this.getMettings();
  },
};
</script>

<style scoped>
</style>
