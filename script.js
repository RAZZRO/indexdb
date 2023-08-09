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
        console.log(db);


    }

    request.onupgradeneeded = (e) => {

        let db = e.target.result;
        console.log(db);


        let objectStore = db.createObjectStore("contacts", {
            keyPath: 'id',
            autoIncrement: true
        });


        objectStore.createIndex('firstname', 'firstname', {
            unique: false
        });
        objectStore.createIndex('lastname', 'lastname', {
            unique: false
        });

        console.log("Database setup Successfuly");

    }

    

}

const addData = (e) => {

    e.preventDefault();

    let newItem = {
        firstname: firstnameInput,
        lastname: lastnameInput
    }

    // let transaction = db.transaction(['contacts'],'readwrite').objectStore('contacts');
    // console.log(transaction +"trrr");
    // let transaction = db.transaction(['contacts'], 'readwrite').objectStore('contacts');
    // console.log(transaction);
    // let transaction = db.transaction(['contacts'],'readwrite').objectStore('contacts').add(newItem);
    // console.log(transaction);

    let transaction = db.transaction(['contacts'], 'readwrite').objectStore('contacts').add(newItem);


    transaction.onsuccess = () => {
        firstnameInput.value = "";
        lastnameInput.value = "";
    }


    transaction.oncomplete = () => {
        console.log("transaction completed on Database");
    }


    transaction.onerror = () => {
        console.log("Error transaction on Database");
    }


}
form.addEventListener('submit',addData);

