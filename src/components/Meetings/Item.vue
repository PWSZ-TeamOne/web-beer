<template>
  <v-container>
    <v-row>
      <v-card class="w-100 border-0 px-5">
        <h3 class="pt-2">Meeting name: {{ this.meet.name }}</h3>
        <v-tabs>
          <v-tab>Beers </v-tab>
          <v-tab-item>
            <v-card flat>
              <IndexBeers />
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
      meet: {
        name: null,
      },
    };
  },
  components: {
    IndexBeers,
  },
  methods: {
    getMeet() {
      let meetFounded = [];
      db.collection("events")
        .doc(this.$store.state.meetingId)
        .get()
        .then((doc) => {
          this.meet = doc.data();
        })
        .catch(function (error) {
          console.log("Error getting cached document:", error);
        });
    },
  },
  created() {
    this.getMeet();
  },
};
</script>

<style scoped>
</style>
