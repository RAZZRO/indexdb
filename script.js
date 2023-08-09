let db;
const firstnameInput = document.getElementById("firstName");
const lastnameInput = document.getElementById("lastName");
const form = document.querySelector("form");

window.onload = () => {
    let request = window.indexedDB.open("contacts", 1);

    request.onerror = () => {
        console.log("Database failed to open");
    }

    request.onsuccess = () => {
        console.log("Dataase opend Successfuly");

        db = request.result;


    }

    request.onupgradeneeded = (e) => {

        let db = e.target.result;

        let ObjectStore = db.createObjectStore("contacts", {
            keyPath: 'id',
            autoIncrement: true
        });


        ObjectStore.createIndex('firstname', 'firstname', {
            unique: false
        });
        ObjectStore.createIndex('lastname' ,'lastname',{
            unique: false
        });

        console.log("Database setup Successfuly");

    }
}

