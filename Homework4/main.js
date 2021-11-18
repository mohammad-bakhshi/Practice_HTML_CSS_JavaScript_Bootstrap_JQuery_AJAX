let targetUser = null;
const userModal = $('#myModal');

const createTable = function(sortArg = undefined) {
    if (sortArg) {
        userData.sort((a, b) => {
            // numbers
            if (!isNaN(Number(a[sortArg]))) return b[sortArg] - a[sortArg];

            // strings
            return a[sortArg].toLowerCase() < b[sortArg].toLowerCase() ? 1 : -1;
        });
    }
    // reset table body
    $('tbody').html('');

    for (const userInfo of userData) {
        $('tbody').append(`
        <tr id="${userInfo.uid}" onclick="displayUser(this)">
            <td>${userInfo.uid}</td>
            <td>${userInfo.firstName}</td>
            <td>${userInfo.lastName}</td>
            <td>${userInfo.city}</td>
            <td>${userInfo.personalCode}</td>
            <td>${userInfo.phoneNumber}</td>
            <td>${userInfo.position}</td>
        </tr>`);
    }
};
createTable();

// READ
const displayUser = function(userRow) {
    targetUser = userData.find(user => Number(user.uid) === Number(userRow.id));

    $('#myModal').css('display', 'block');
    $('#modal-info').html(`
    <ul>
        <li>UID: ${targetUser.uid}</li>
        <li>Firstname: ${targetUser.firstName}</li>
        <li>Lastname: ${targetUser.lastName}</li>
        <li>City: ${targetUser.city}</li>
        <li>Personal code: ${targetUser.personalCode}</li>
        <li>Phone number: ${targetUser.phoneNumber}</li>
        <li>Position: ${targetUser.position}</li>
    </ul>`);

    $('#modal-buttons').html(`
    <button onclick="updateUser()">update</button>
    <button onclick="deleteUser()">delete</button>`);
};

// DELETE
const deleteUser = function() {
    userData = userData.filter(user => Number(user.uid) !== Number(targetUser.uid));

    $('#myModal').css('display', 'none');
    createTable();
};

// UPDATE
const updateUser = function() {
    $('#modal-info').html(`
    <input disabled type="number" class="update-input uid" placeholder="UID" value="${targetUser.uid}">
    <input type="text" class="update-input firstName" placeholder="firstname" value="${targetUser.firstName}">
    <input type="text" class="update-input lastName" placeholder="lastname" value="${targetUser.lastName}">
    <input type="text" class="update-input city" placeholder="city" value="${targetUser.city}">
    <input type="number" class="update-input personalCode" placeholder="personal code" value="${targetUser.personalCode}">
    <input type="number" class="update-input phoneNumber" placeholder="phone number" value="${targetUser.phoneNumber}">
    <input type="text" class="update-input position" placeholder="position" value="${targetUser.position}">`);

    $('#modal-buttons').html(`
    <button onclick="saveUpdate()">save</button>`);
};

// update event
const saveUpdate = function() {
    const updateInputs = $('.update-input');

    for (const input of updateInputs) {
        if (input.value.trim === '') return alert(input.classList[1] + 'empty input');

        targetUser[input.classList[1]] = input.value;
    }

    $('#myModal').css('display', 'none');
    createTable();
};

// CREATE
const createUser = function() {
    const newUser = {};
    const createInputs = $('.create-input');

    for (const input of createInputs) {
        if (input.value.trim() === '') return alert('empty input');

        if (input.classList[1] === 'create-uid' && userData.findIndex(user => Number(user.uid) === Number(input.value)) !== -1) return alert('duplicate uid');

        newUser[input.classList[1]] = input.value;
    }

    // convert uid to number
    newUser.uid = Number(newUser.uid);

    userData.push(newUser);

    $('#myModal').css('display', 'none');
    createTable();
};

// create event
$('#create-user').click(function (e) { 
    e.preventDefault();
    
    userModal.css('display', 'block');

    $('#modal-info').html(`
    <input type="number" class="create-input uid" placeholder="UID">
    <input type="text" class="create-input firstName" placeholder="firstname">
    <input type="text" class="create-input lastName" placeholder="lastname">
    <input type="text" class="create-input city" placeholder="city">
    <input type="number" class="create-input personalCode" placeholder="personal code">
    <input type="number" class="create-input phoneNumber" placeholder="phone number">
    <input type="text" class="create-input position" placeholder="position">`);

    $('#modal-buttons').html(`
    <button onclick="createUser()">create</button>`);
});