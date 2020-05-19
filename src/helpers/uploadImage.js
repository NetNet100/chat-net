import firebase from "../firebase/firebase";

export default (image) => {
    const storage = firebase.storage();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {
            // progress function ...

        }, (error) => {
            console.log(error);
        },() => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    return url;
                });
        }
    );
};
