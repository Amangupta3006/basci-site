const inputName = document.getElementById('inputName');
const inputName2 = document.getElementById('inputName2');
const inputEmail = document.getElementById('inputEmail');
const inputAddress = document.getElementById('inputAddress');
const inputCity = document.getElementById('inputCity');
const inputState = document.getElementById('inputState');
const form = document.getElementById('myform');


//If you skip JSON.parse(...), you'll lose old form submissions. Use it to preserve and extend stored data.
let arr = JSON.parse(localStorage.getItem("myEntries")) || [];
let editingIndex = null;

function switchToFormTab() {
    const triggerEl = document.querySelector('#v-pills-home-tab');
    const tab = new bootstrap.Tab(triggerEl);
    tab.show();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const confirmed = confirm("Are you sure you want to submit?");
    if (!confirmed) return; 

    //now get the data by making a object

    const formdata = {
        firstName: inputName.value,
        lastName: inputName2.value,
        email: inputEmail.value,
        address: inputAddress.value,
        city: inputCity.value,
        state: inputState.value,
    };

    if (editingIndex !== null) {
        // We're editing an existing entry
        arr[editingIndex] = formdata;
        editingIndex = null; // Reset
    } else {
        // Add new entry
        arr.push(formdata);
    }
    //putting the arr into local storage    
    localStorage.setItem("myEntries", JSON.stringify(arr));

    form.reset();
    displayTable();
});

function displayTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear existing table rows

    const entries = JSON.parse(localStorage.getItem("myEntries")) || [];

    entries.forEach((entry, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.firstName}</td>
            <td>${entry.lastName}</td>
            <td>${entry.email}</td>
            <td>${entry.address}</td>
            <td>${entry.city}</td>
            <td>${entry.state}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editEntry(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("myEntries")) || [];

    // Confirm before deleting
    const confirmed = confirm("Do you really want to delete this entry?");
    if (!confirmed) return;

    // Remove from array
    entries.splice(index, 1);

    // Update localStorage
    localStorage.setItem("myEntries", JSON.stringify(entries));

    // Refresh table
    displayTable();     
}

function editEntry(index) {
    console.log(index)
    const entries = JSON.parse(localStorage.getItem("myEntries")) || [];
    const entry = entries[index];

    
    // Fill the form with existing data
    inputName.value = entry.firstName || "";
    inputName2.value = entry.lastName || "";
    inputEmail.value = entry.email || "";
    inputAddress.value = entry.address || "";
    inputCity.value = entry.city || "";
    inputState.value = entry.state || "";

    // Set editing index
    editingIndex = index;

    // Optionally scroll to form
    switchToFormTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.editEntry = editEntry;
window.deleteEntry = deleteEntry;

displayTable();

document.querySelectorAll('.nav-link').forEach(tab => {
  tab.addEventListener('click', function () {
    const tabText = this.textContent.trim();

    // Get the breadcrumb item that should update
    const activeCrumb = document.querySelector('#breadcrumb .breadcrumb-item.active');

    if (activeCrumb) {
      activeCrumb.textContent = tabText;
    }
  });
});
