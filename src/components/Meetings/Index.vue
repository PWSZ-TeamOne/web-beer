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
            >Add metting</v-btn
          >
          <v-text-field
            v-model="meetingCode"
            label="Meeting code"
          ></v-text-field>
          <v-btn elevation="2" class="mx-3" @click="searchEventByTheCode"
            >Join metting</v-btn
          >
        </v-card-title>
        <v-data-table :headers="headers" :items="meetings" :search="search">
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="p-2">
              <v-img :src="item.avatar" :alt="item.name" width="75px"></v-img>
            </div>
          </template>
          <template v-slot:[`item.id`]="{ item }">
            <v-icon small @click="seeItem(item.id, item.userId)">
              mdi-eye
            </v-icon>
            <v-icon small @click="editItem(item.id)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
            <v-icon small @click="seeStats(item.id)"> mdi-star </v-icon>
          </template>
          <template v-slot:[`item.active`]="{ item }">
            <v-simple-checkbox
              @click="setActive(item)"
              v-model="item.active"
            ></v-simple-checkbox>
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
      meetingCode: null,
      search: "",
      headers: [
        { text: "", value: "avatar", filterable: false },
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Code", value: "code" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "id" },
        { text: "Active", value: "active" },
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
    deleteItem(id) {
      if (confirm("Are you sure you want to delete event?")) {
        let eventsToDelete = db.collection("events").where("id", "==", id);
        eventsToDelete.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
      }
    },
    seeItem(id, userId) {
      store.dispatch("setMeetingId", id);
      store.dispatch("setMeetingUserId", userId).then(() => {
        this.$router.push("/meet");
      });
    },
    editItem(id) {
      store.dispatch("setEditedMeetingId", id).then(() => {
        this.$router.push("/meetings/edit");
      });
    },
    seeStats(id) {
      store.dispatch("setMeetingId", id).then(() => {
        this.$router.push("/stats");
      });
    },
    searchEventByTheCode() {
      let eventByCode = db
        .collection("events")
        .where("code", "==", this.meetingCode)
        .where("active", "==", true)
        .where("adminActive", "==", true);

      eventByCode.get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          eventByCode = doc.data();
        });
        this.joinToEvent(eventByCode);
      });
    },
    joinToEvent(eventByCode) {
      if (eventByCode.id != null) {
        this.seeItem(eventByCode.id, eventByCode.userId);
        this.meetingCode = null;
      } else {
        this.alert("No event with that code or no active! Try again!", "error");
      }
    },
    setActive(item) {
      db.collection("events")
        .where("id", "==", item.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("events").doc(doc.id).update({
              active: item.active,
            });
          });
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
