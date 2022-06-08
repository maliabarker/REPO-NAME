// alert('hello');
// console.log('SCRIPTS LOADED')
// const Pet = require('../models/pet');

if (document.querySelector('#new-pet')) {
    document.querySelector('#new-pet').addEventListener('submit', (e) => {
        console.log('TESTING NEW')
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("new-pet");
        var pet = new FormData(form);
        // for (const [key, value] of pet) {
        //     console.log(`${key}: ${value}\n`);
        //   }
        // Assign the multipart/form-data headers to axios does a proper post
        axios.post('/pets', pet, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                window.location.replace(`/pets/${response.data.pet._id}`);

            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                console.log('ERROR ERROR')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000)
            });
    });
}


/// EDITING PET

if (document.querySelector('#edit-pet')) {
    document.querySelector('#edit-pet').addEventListener('submit', (e) => {
        console.log('TESTING EDIT PET')
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("edit-pet");
        
        var pet = new FormData(form);
        for (const [key, value] of pet) {
            console.log(`${key}: ${value}\n`);
          }

        // var pet = Pet.findOne({name: pet_data.name})
        // console.log(pet)
        // Assign the multipart/form-data headers to axios does a proper post
        axios.put(`/pets/${pet._id}`, pet, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response)
                window.location.replace(`/pets/${response.data.pet._id}`);
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                console.log('ERROR ERROR')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000)
            });
    });
}


// if (document.querySelector('#new-pet')) {
//     document.querySelector('#new-pet').addEventListener('submit', (e) => {
//         e.preventDefault();

//         let pet = {};
//         const inputs = document.querySelectorAll('.form-control');
//         for (const input of inputs) {
//             pet[input.name] = input.value;
//         }

//         axios.post('/pets', pet)
//             .then(function (response) {
//                 window.location.replace(`/pets/${response.data.pet._id}`);
//             })
//             // New Catch Code
//             .catch(function (error) {
//                 const alert = document.getElementById('alert')
//                 alert.classList.add('alert-warning');
//                 alert.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.';
//                 alert.style.display = 'block';
//                 window.setTimeout(function(){
//                     alert.style.display = 'none';
//                     alert.classList.remove('alert-warning');
//                 }
//                 , 5000);
//             });
//     });
// }