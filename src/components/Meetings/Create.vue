<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4"
          ><v-img max-height="auto" max-width="100%" :src="this.photo"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="address"
                label="Address"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
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
            <v-col cols="12" md="6">
              <v-file-input
                v-model="file"
                label="Photo"
                @change="savePhoto($event)"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="6">
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
import validateMeeting from "@/mixins/validateMeeting";
import md5 from "js-md5";
import firebase from "firebase";

export default {
  name: "MeetingsCreate",
  mixins: [storePhoto, validateMeeting],
  data() {
    return {
      name: null,
      address: null,
      date: null,
      time: null,
      file: [],
      photo:
        "https://firebasestorage.googleapis.com/v0/b/browarapp.appspot.com/o/example_beer.jpg?alt=media&token=88798838-5ad4-4980-bae3-5c9d4f4ba714",
      id: null,
      randomCode: null,
      errors: [],
      fromDateMenu: false,
    };
  },
  computed: {
    fromDateDisp() {
      return this.date;
    },
  },
  methods: {
    store() {
      if (this.checkForm() === true) {
        console.log("true");
        this.id = md5(
          new Date() + "|" + this.name + "|" + this.$store.state.user.userId
        ).toString();
        this.randomCode = Math.floor(
          Math.random() * 99999999 + 10000000
        ).toString();
        firebase
          .firestore()
          .collection("events")
          .doc(this.id)
          .set({
            active: true,
            adminActive: true,
            userId: this.$store.state.user.userId,
            name: this.name,
            address: this.address,
            date: this.date,
            time: this.date,
            code: this.randomCode,
            timestamp: new Date(),
            avatar: this.photo,
            id: this.id,
          })
          .then(() => {
            this.alert("Meeting added!", "success");
            this.$router.push("/meetings");
          });
      } else {
      }
    },
  },
};
</script>

<style scoped>
.v-picker__title {
  background-color: cornflowerblue !important;
}
</style>
