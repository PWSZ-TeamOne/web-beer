import firebase from "firebase";
export default {
  methods: {
    savePhoto(e) {
      if (this.file.size > 1024 * 1024) {
        this.alert('Zdjęcie za duże! - mniejsze niż 1MB', 'error');
      } else if (this.file.type.toString().indexOf('image/') === 0) {
        this.storePhoto(e, type);
      } else {
        this.alert('To nie jest zdjęcie!', 'error');
      }
      this.file = null;
    },
    storePhoto(e) {
      var uploadTask = firebase.storage().ref(this.file.name).put(this.file);
      uploadTask.on("state_changed", null,
        err => {
          this.alert('Błąd przesyłania!', 'error');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.photo = downloadURL;
          })
        })
    },
  }
}
