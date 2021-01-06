<template>
  <div>
    {{this.avg}} (rates: {{this.counter}})
  </div>
</template>

<script>
import store from "@/store";
import firebase from "firebase";
import calculateRate from "@/mixins/calculateRate";

export default {
  name: "ItemRates",
  mixins: [calculateRate],
  props: ["beerId"],
  data() {
    return {
      ratesArray: [],
      rate1: 0,
      rate2: 0,
      rate3: 0,
      avg: 0,
      counter: 0,
    };
  },
  methods: {
    getRatesOfTheBeer(id){
      let rates = [];
      let ratedBeer = db.collection("rates")
          .where("beerId", "==", this.beerId)
          .where("eventId", "==", this.$store.state.meetingId);

        ratedBeer.get().then((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
              rates.push(doc.data());
          });
          this.ratesArray = rates;
          this.unsetRateData();
          this.setRateData();
        });
    },
    setRateData(){
      this.ratesArray.forEach(element => {
        this.rate1 = Number(this.rate1) + Number(element.rate1);
        this.rate2 = Number(this.rate2) + Number(element.rate2);
        this.rate3 = Number(this.rate3) + Number(element.rate3);
        this.counter++;
      });
      this.rate1 = this.rate1 / this.counter;
      this.rate2 = this.rate2 / this.counter;
      this.rate3 = this.rate3 / this.counter;
      this.calc();
    },
    unsetRateData(){
      this.rate1 = 0;
      this.rate2 = 0;
      this.rate3 = 0;
      this.avg = 0;
      this.counter = 0;
    },
  },
  created() {
    this.getRatesOfTheBeer(this.id);
  },
};
</script>

<style scoped>
</style>
