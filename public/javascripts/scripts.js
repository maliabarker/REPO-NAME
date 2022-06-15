// console.log('SCRIPTS LOADED')

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
};


if (document.querySelector('#edit-pet')) {
    document.querySelector('#edit-pet').addEventListener('submit', (e) => {
        console.log('TESTING EDIT')
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("edit-pet");
        var pet = new FormData(form);
        
        for (const [key, value] of pet) {
            // console.log(`${key}: ${value}\n`);
            if (key == 'id'){
                // console.log('FOUND')
                // console.log(value)
                petId = value
            }
          }
        console.log(petId)

        // Assign the multipart/form-data headers to axios does a proper post
        axios.put(`/pets/${petId}`, pet, {
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
};