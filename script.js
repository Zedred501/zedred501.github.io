// Load existing users from local storage
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

// Function to save users to local storage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to check if a user exists
function userExists(username) {
  return existingUsers.some(user => user.username === username);
}

// Function to get the current date in "YYYY-MM-DD" format
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to handle admin text upload
function adminUploadText() {
  // Get the admin's text from the input field
  const adminText = document.getElementById("adminText").value;

  // Save the admin's text to local storage
  localStorage.setItem("adminText", adminText);

  alert("Admin text uploaded successfully!");
}

// Function to handle member text upload
function uploadText() {
  const adminUsername = "decencyawowo2021@gmail.com"; // Use the correct admin username

  // Check if the admin exists
  if (!userExists(adminUsername)) {
    alert("Admin not found. Please check the username.");
    return;
  }

  // Check if the admin has already uploaded text today
  const adminData = JSON.parse(localStorage.getItem(adminUsername)) || {};
  const currentDate = getCurrentDate();

  if (adminData.lastUploadDate === currentDate) {
    alert("Admin has already uploaded text today. Please try again tomorrow.");
    return;
  }

  // Get the admin's text from local storage
  const adminText = localStorage.getItem("adminText");

  // Get the member's text from the input field
  const memberText = document.getElementById("adminText").value;

  // Check if the admin's text matches the member's text
  if (memberText === adminText) {
    alert("Text uploaded successfully!");

    // Update admin's last upload date
    adminData.lastUploadDate = currentDate;

    // Save updated admin data
    localStorage.setItem(adminUsername, JSON.stringify(adminData));
  } else {
    alert("Invalid text. Please try again with the correct text.");
  }
}

// Function to handle login
function login() {
  const adminUsername = "decencyawowo2021@gmail.com"; // Replace with the correct admin username
  const adminPassword = "08055445013"; // Replace with the correct admin password

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  // Check if the entered credentials match the admin's credentials
  if (usernameInput === adminUsername && passwordInput === adminPassword) {
    // Store login status in local storage
    localStorage.setItem("isLoggedIn", true);

    // Redirect to admin dashboard
    window.location.href = "admin.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

// Function to handle signup
function signup() {
  const signupUsername = document.getElementById("signupUsername").value;
  const signupPassword = document.getElementById("signupPassword").value;

  // Check if the user already exists
  if (userExists(signupUsername)) {
    alert("Username already exists. Please choose another one.");
  } else {
    // Save the new user to local storage
    const newUser = { username: signupUsername, password: signupPassword };
    existingUsers.push(newUser);
    saveUsers(existingUsers);

    // Store login status in local storage
    localStorage.setItem("isLoggedIn", true);

    alert("Signup successful! You can now login.");
  }
}

// ... existing code ...

// Function to load member statistics on the admin dashboard
function loadMemberStats() {
  const memberListContainer = document.getElementById("memberList");
  memberListContainer.innerHTML = "";

  existingUsers.forEach(user => {
    const memberData = JSON.parse(localStorage.getItem(user.username)) || {};
    const lastUploadDate = memberData.lastUploadDate || "Not uploaded yet";

    memberListContainer.innerHTML += `
      <li>
        <strong>${user.username}</strong> - Last Upload: ${lastUploadDate}
      </li>
    `;
  });
}

// Function to search for members by username
function searchMembers() {
  const searchInput = document.getElementById("searchMember").value.toLowerCase();
  const memberListContainer = document.getElementById("memberList");
  memberListContainer.innerHTML = "";

  existingUsers.forEach(user => {
    if (user.username.toLowerCase().includes(searchInput)) {
      const memberData = JSON.parse(localStorage.getItem(user.username)) || {};
      const lastUploadDate = memberData.lastUploadDate || "Not uploaded yet";

      memberListContainer.innerHTML += `
        <li>
          <strong>${user.username}</strong> - Last Upload: ${lastUploadDate}
        </li>
      `;
    }
  });

  if (memberListContainer.innerHTML === "") {
    alert("No matching members found.");
  }
}

// ... existing code ...
