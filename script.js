 // Function to add data to local storage
 function addData() {
    // Get form values
    var name = document.getElementById("name").value;
    var fatherName = document.getElementById("fatherName").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;

    // Create data object
    var data = {
        name: name,
        fatherName: fatherName,
        age: age,
        city: city,
        country: country
    };

    // Check if the form is in edit mode
    var editModeIndex = document.getElementById("crudForm").getAttribute("data-edit-index");

    if (editModeIndex !== null) {
        // Editing existing data
        var storedData = JSON.parse(localStorage.getItem("crudData")) || [];

        // Replace the existing data at the specified index
        storedData[editModeIndex] = data;

        // Save the updated array back to local storage
        localStorage.setItem("crudData", JSON.stringify(storedData));

        // Reset edit mode
        document.getElementById("crudForm").removeAttribute("data-edit-index");
    } else {
        // Adding new data to local storage
        var storedData = JSON.parse(localStorage.getItem("crudData")) || [];
        storedData.push(data);
        localStorage.setItem("crudData", JSON.stringify(storedData));
    }

    // Clear form inputs
    document.getElementById("crudForm").reset();

    // Update the displayed data
    displayData();
}

// Function to display stored data
function displayData() {
    var dataList = document.getElementById("dataList");
    dataList.innerHTML = ""; // Clear previous data

    // Retrieve data from local storage
    var storedData = JSON.parse(localStorage.getItem("crudData")) || [];

    // Display each data item in a list
    storedData.forEach(function (data, index) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `<strong>${data.name}</strong> (Father: ${data.fatherName}, Age: ${data.age}, City: ${data.city}, Country: ${data.country}) 
            <button class="btn btn-success btn-sm float-end" onclick="editData(${index})">Edit</button>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteData(${index})">Delete</button>`;

        dataList.appendChild(listItem);
    });
}

// Function to delete data
function deleteData(index) {
    // Retrieve data from local storage
    var storedData = JSON.parse(localStorage.getItem("crudData")) || [];

    // Remove the selected item from the array
    storedData.splice(index, 1);

    // Save the updated array back to local storage
    localStorage.setItem("crudData", JSON.stringify(storedData));

    // Update the displayed data
    displayData();
}

// Function to edit data
function editData(index) {
    // Retrieve data from local storage
    var storedData = JSON.parse(localStorage.getItem("crudData")) || [];

    // Get the data object to edit
    var dataToEdit = storedData[index];

    // Populate the form with the data
    document.getElementById("name").value = dataToEdit.name;
    document.getElementById("fatherName").value = dataToEdit.fatherName;
    document.getElementById("age").value = dataToEdit.age;
    document.getElementById("city").value = dataToEdit.city;
    document.getElementById("country").value = dataToEdit.country;

    // Set the form in edit mode
    document.getElementById("crudForm").setAttribute("data-edit-index", index);
}

// Display stored data on page load
displayData();