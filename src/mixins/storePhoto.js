import firebase from "firebase";
export default {
    methods: {
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
