<template>
  <v-form>
    <v-container>
      <v-row>
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
              <v-text-field
                v-model="name"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="address"
                label="Address"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
            <v-menu
                v-model="fromDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="Date"
                    readonly
                    :value="fromDateDisp"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="en-in"
                  v-model="date"
                  no-title
                  @input="fromDateMenu = false"
                  :min="moment(new Date()).format('YYYY-MM-DD')"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-file-input
                v-model="file"
                label="Photo"
                @change="storePhoto($event);"
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              md="6"
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
import validateMeeting from "@/mixins/validateMeeting";
import firebase from "firebase";

export default {
  name: "MeetingsEdit",
  mixins: [storePhoto, validateMeeting],
  data() {
    return {
      name: null,
      address: null,
      date: null,
      time: null,
      file: [],
      photo: null,
      id: null,
      errors: [],
      fromDateMenu: false,
      editedMeeting: {}
    };
  },
  computed: {
      fromDateDisp() {
        return this.date;
      },
  },
  methods: {
    getMeeting(){
      db.collection("events")
        .doc(this.$store.state.editedMeetingId)
        .get()
        .then((doc) => {
          this.editedMeeting = doc.data();
          this.setMeetingData();
        }).catch(function(error) {
          console.log("Error getting cached document:", error);
        });
    },
    setMeetingData(){
      this.id = this.editedMeeting.id;
      this.name = this.editedMeeting.name;
      this.address = this.editedMeeting.address;
      this.date = this.editedMeeting.date;
      this.time = this.editedMeeting.time;
      this.photo = this.editedMeeting.avatar;
    },
    store(){
      if(this.checkForm() === true){
        firebase
            .firestore()
              .collection("events")
              .doc(this.id)
              .update({
                name: this.name,
                address: this.address,
                date: this.date,
                time: this.date,
                avatar: this.photo,
              }).then(()=>{
                store.dispatch("setEditedMeetingId", null);
                this.alert("Meeting updated!", "success");
                this.$router.push("/meetings");
              });
      }else{}
    },
  },
  created() {
    this.getMeeting();
  },
}
</script>

<style scoped>
.v-picker__title{
  background-color: cornflowerblue!important;
}
</style>
