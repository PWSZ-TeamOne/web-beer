<template>
  <v-container>
    <v-row>
        <v-card class="w-100">
          <h3>Meeting name: {{this.meet[0].name}}</h3>
          <v-tabs >
            <v-tab>Beers
            </v-tab>
            <v-tab>
              Users
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <IndexBeers />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <!-- <IndexUsers /> -->
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import IndexBeers from "@/components/Beers/Index";
export default {
  name: "MeetIndex",
  data() {
    return {
      meet:{
        name:null
      }
    };
  },
  components: {
    IndexBeers
  },
  methods: {
    getMeet() {
      let meetFounded = [];
      db.collection("events")
      .doc(this.$store.state.meetingId)
      .get()
      .then(function(doc) {
        meetFounded.push(doc.data());
      }).catch(function(error) {
          console.log("Error getting cached document:", error);
      });
      this.meet = meetFounded;
    },
  },
  created() {
    this.getMeet();
  },
};
</script>

<style scoped>
</style>
