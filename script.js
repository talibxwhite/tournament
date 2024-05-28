document.addEventListener('DOMContentLoaded', () => {
    showLogin();
    loadTournaments();
    loadUsers();
    loadPayments();
});

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
}

function showLogin() {
    hideAllPages();
    document.getElementById('loginPage').classList.add('active');
}

function showRegister() {
    hideAllPages();
    document.getElementById('registerPage').classList.add('active');
}

function showHomePage() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
    displayTournaments();
}

function showPaymentsPage() {
    hideAllPages();
    document.getElementById('paymentsPage').classList.add('active');
}

function showAdminPopup() {
    document.getElementById('adminPopup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('adminPopup').classList.add('hidden');
}

function showAdminPanel() {
    hideAllPages();
    document.getElementById('adminPanel').classList.add('active');
}

function verifyAdminPassword(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === 'talib') {
        closePopup();
        showAdminPanel();
    } else {
        alert('PASSWORD KEY 🔑 ADMIN ONLY');
    }
}

document.getElementById('adminLoginForm').addEventListener('submit', verifyAdminPassword);

// Admin Panel Functions
function showUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const content = `
        <h3>User Data</h3>
        <div id="userDataList">${users.map(user => `<p>${user.username}</p>`).join('')}</div>
    `;
    showAdminContent(content);
}

function showNewTournamentForm() {
    const content = `
        <h3>New Tournament</h3>
        <form id="newTournamentForm">
            <label>Game Mode:</label>
            <select id="gameMode">
                <option value="solo">Solo</option>
                <option value="duo">Duo</option>
                <option value="squad">Squad</option>
                <option value="all">All</option>
            </select>
            <label>Minimum Level:</label>
            <input type="number" id="minLevel" required>
            <label>Maximum Level:</label>
            <input type="number" id="maxLevel" required>
            <label>Mode:</label>
            <select id="mode">
                <option value="Battle Royal">Battle Royal</option>
                <option value="Clash Squad">Clash Squad</option>
            </select>
            <label>Name:</label>
            <input type="text" id="tournamentName" required>
            <label>Price:</label>
            <input type="text" id="price" required>
            <label>Entry Fee (Solo):</label>
            <input type="number" id="entryFeeSolo" required>
            <label>Entry Fee (Duo):</label>
            <input type="number" id="entryFeeDuo" required>
            <label>Entry Fee (Squad):</label>
            <input type="number" id="entryFeeSquad" required>
            <label>Device:</label>
            <select id="device">
                <option value="mobile">Mobile</option>
                <option value="pc">PC</option>
                <option value="both">Both</option>
            </select>
            <button type="submit">Publish Tournament</button>
        </form>
    `;
    showAdminContent(content);
    document.getElementById('newTournamentForm').addEventListener('submit', createTournament);
}

function showDeleteTournamentForm() {
    const content = `
        <h3>Delete Tournament</h3>
        <form id="deleteTournamentForm">
            <label>Tournament Name:</label>
            <input type="text" id="deleteTournamentName" required>
            <button type="submit">Delete Tournament</button>
        </form>
    `;
    showAdminContent(content);
    document.getElementById('deleteTournamentForm').addEventListener('submit', deleteTournament);
}

function showPayments() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const content = `
        <h3>Payments</h3>
        <div id="paymentList">${payments.map(payment => `
            <p>${payment.username}: ${payment.tournament}</p>
            <input type="file" accept="image/*" onchange="handlePaymentImage(event, '${payment.username}', '${payment.tournament}')">
        `).join('')}</div>
    `;
    showAdminContent(content);
}

function showBlockUserForm() {
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    const content = `
        <h3>Block User</h3>
        <form id="blockUserForm">
            <label>Username:</label>
            <input type="text" id="blockUsername" required>
            <button type="submit">Block</button>
        </form>
        <div id="blockedUsersList">${blockedUsers.map(user => `<p>${user}</p>`).join('')}</div>
    `;
    showAdminContent(content);
    document.getElementById('blockUserForm').addEventListener('submit', blockUser);
}

function showChangePasswordForm() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const content = `
        <h3>Change Password</h3>
        <div id="userList">${users.map(user => `
            <p>${user.username} <button onclick="showChangePasswordPopup('${user.username}')">Change</button></p>
        `).join('')}</div>
    `;
    showAdminContent(content);
}

function showUpdateRoomIDForm() {
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    const content = `
        <h3>Update Room ID and Password</h3>
        <form id="updateRoomIDForm">
            <label>Tournament:</label>
            <select id="tournamentList">
                ${tournaments.map(tournament => `<option value="${tournament.name}">${tournament.name}</option>`).join('')}
            </select>
            <label>Room ID:</label>
            <input type="text" id="roomID" required>
            <label>Password:</label>
            <input type="text" id="roomPassword" required>
            <button type="submit">Update</button>
        </form>
    `;
    showAdminContent(content);
    document.getElementById('updateRoomIDForm').addEventListener('submit', updateRoomIDAndPassword);
}

function showUsersJoined() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const content = `
        <h3>Users Joined</h3>
        <div id="usersJoinedList">${users.map(user => `<p>${user.username}</p>`).join('')}</div>
    `;
    showAdminContent(content);
}

function showAdminContent(content) {
    document.getElementById('adminContent').innerHTML = content;
}

function createTournament(event) {
    event.preventDefault();
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    const newTournament = {
        gameMode: document.getElementById('gameMode').value,
        minLevel: document.getElementById('minLevel').value,
        maxLevel: document.getElementById('maxLevel').value,
        mode: document.getElementById('mode').value,
        name: document.getElementById('tournamentName').value,
        price: document.getElementById('price').value,
        entryFeeSolo: document.getElementById('entryFeeSolo').value,
        entryFeeDuo: document.getElementById('entryFeeDuo').value,
        entryFeeSquad: document.getElementById('entryFeeSquad').value,
        device: document.getElementById('device').value
    };
    tournaments.push(newTournament);
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
    alert('Tournament Published');
    displayTournaments();
    showHomePage();
}

function deleteTournament(event) {
    event.preventDefault();
    const tournamentName = document.getElementById('deleteTournamentName').value;
    let tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    tournaments = tournaments.filter(tournament => tournament.name !== tournamentName);
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
    alert('Tournament Deleted');
    displayTournaments();
    showHomePage();
}

function updateRoomIDAndPassword(event) {
    event.preventDefault();
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    const tournamentName = document.getElementById('tournamentList').value;
    const roomID = document.getElementById('roomID').value;
    const roomPassword = document.getElementById('roomPassword').value;
    const updatedTournaments = tournaments.map(tournament => 
        tournament.name === tournamentName ? {...tournament, roomID, roomPassword} : tournament
    );
    localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
    alert('Room ID and Password Updated');
    showUpdateRoomIDForm();
}

function handlePaymentImage(event, username, tournament) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const payments = JSON.parse(localStorage.getItem('payments')) || [];
            payments.push({ username, tournament, image: e.target.result, status: 'Pending' });
            localStorage.setItem('payments', JSON.stringify(payments));
            alert('WAIT FOR APPROVAL, COME AFTER 12 HOUR\'S');
            showPayments();
        };
        reader.readAsDataURL(file);
    }
}

function blockUser(event) {
    event.preventDefault();
    const username = document.getElementById('blockUsername').value;
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    blockedUsers.push(username);
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    alert('User Blocked');
    showBlockUserForm();
}

function showChangePasswordPopup(username) {
    const newPassword = prompt(`Change Password for ${username}:`);
    if (newPassword) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(user => 
            user.username === username ? {...user, password: newPassword} : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Password Updated');
        showChangePasswordForm();
    }
}

function displayTournaments() {
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    const tournamentList = document.getElementById('tournamentList');
    tournamentList.innerHTML = tournaments.length > 0
        ? tournaments.map(tournament => `
            <div>
                <h3>${tournament.name}</h3>
                <p>Game Mode: ${tournament.gameMode}</p>
                <p>Minimum Level: ${tournament.minLevel}</p>
                <p>Maximum Level: ${tournament.maxLevel}</p>
                <p>Mode: ${tournament.mode}</p>
                <p>Price: ${tournament.price}</p>
                <p>Entry Fee (Solo): ${tournament.entryFeeSolo}</p>
                <p>Entry Fee (Duo): ${tournament.entryFeeDuo}</p>
                <p>Entry Fee (Squad): ${tournament.entryFeeSquad}</p>
                <p>Device: ${tournament.device}</p>
                <button onclick="joinTournament('${tournament.name}')">Join</button>
            </div>
        `).join('')
        : '<p>No tournaments are available</p>';
}

function joinTournament(tournamentName) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === currentUserUsername);
    const tournament = (JSON.parse(localStorage.getItem('tournaments')) || []).find(t => t.name === tournamentName);
    if (tournament) {
        currentUser.joinedTournaments = currentUser.joinedTournaments || [];
        currentUser.joinedTournaments.push(tournament);
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Joined ${tournamentName}`);
        displayTournaments();
    }
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUserUsername = username;
        showHomePage();
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account Created');
    showLogin();
});

function loadTournaments() {
    // Load tournaments from localStorage or initialize if not found
    const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
}

function loadUsers() {
    // Load users from localStorage or initialize if not found
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify(users));
}

function loadPayments() {
    // Load payments from localStorage or initialize if not found
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    localStorage.setItem('payments', JSON.stringify(payments));
}
