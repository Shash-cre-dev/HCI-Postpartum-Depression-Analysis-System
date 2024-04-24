document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("signup-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        signUp();
      });
  });
  
  function signUp() {
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
  
    // Client-side validation
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
  
    // Send data to server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../backend/controller/server.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          alert(response.message);
          console.log("token: ", response.token)
          localStorage.setItem("token", response.token);
          // Redirect user to login page
          window.location.href = "index.html";
        } else {
          if (response.message === "Username or email already exists") {
            document.getElementById("signup-message").classList.remove("hidden");
          } else if (
            response.message === "Password should be at least 4 characters long"
          ) {
            document
              .getElementById("password-requirements")
              .classList.remove("hidden");
          } else {
            alert("Error occurred while signing up: " + response.message);
          }
        }
      } else {
        alert("Error occurred while signing up");
      }
    };
    xhr.onerror = function () {
      alert("Error occurred while signing up");
    };
    xhr.send(
      `username=${encodeURIComponent(username)}&name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}`
    );
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        login();
      });
  });
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Send data to server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../backend/controller/server.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
    // Add a parameter to indicate that this is a login request
    const params = `login=true&username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText); // Log the response
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            // alert("token : ", response.token);
            localStorage.setItem("token", response.token);
            window.location.href = "index.html";
          } else {
            document.getElementById("login-message").classList.remove("hidden");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        alert("Error occurred while logging in");
      }
    };
    xhr.onerror = function () {
      alert("Error occurred while logging in");
    };
    xhr.send(params);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout-text").addEventListener("click", function () {
      logout();
    });
  });
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("token")) {
      document.getElementById("profile-text").classList.add("block");
      document.getElementById("logout-text").classList.add("block");
      document.getElementById("login-text").classList.add("hidden");
      document.getElementById("signup-text").classList.add("hidden");
    }
  });
  
  // event listener for when the user is logged in then don't show the login button
  document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("token")) {
      document.getElementById("login-text").classList.add("block");
      document.getElementById("signup-text").classList.add("block");
      document.getElementById("profile-text").classList.add("hidden");
      document.getElementById("logout-text").classList.add("hidden");
    }
  });
  
  // // Event listener for fetching and displaying user name after login
  // document.addEventListener("DOMContentLoaded", function () {
  //   if (localStorage.getItem("token")) {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(
  //       "GET",
  //       "http://localhost/vitcevents/backend/controller/get-user.php",
  //       true
  //     );
  //     xhr.setRequestHeader(
  //       "Authorization",
  //       `Bearer ${localStorage.getItem("token")}`
  //     );
  //     xhr.onload = function () {
  //       if (xhr.status === 200) {
  //         const response = JSON.parse(xhr.responseText);
  //         if (response.status === "success") {
  //           console.log(response.name);
  //           document.getElementById("user-text").textContent = response.name;
  //         }
  //       }
  //     };
  //     xhr.send();
  //   }
  // });
  
  // document.addEventListener("DOMContentLoaded", function () {
  //   document
  //     .getElementById("change-password-form")
  //     .addEventListener("submit", function (event) {
  //       event.preventDefault();
  //       changePassword();
  //     });
  // });
  
  // function changePassword() {
  //   const old_password = document.getElementById("old_password").value;
  //   const new_password = document.getElementById("new_password").value;
  //   const confirm_new_password = document.getElementById(
  //     "confirm_new_password"
  //   ).value;
  
  //   // Client-side validation
  //   if (new_password !== confirm_new_password) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  
  //   // Send data to server using AJAX
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", "../backend/controller/change-password.php", true);
  //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //   xhr.setRequestHeader(
  //     "Authorization",
  //     `Bearer ${localStorage.getItem("token")}`
  //   );
  //   xhr.onload = function () {
  //     if (xhr.status === 200) {
  //       const response = JSON.parse(xhr.responseText);
  //       if (response.status === "success") {
  //         alert(response.message);
  //         window.location.href = "login.html";
  //       } else {
  //         alert("Error occurred while changing password: " + response.message);
  //       }
  //     } else {
  //       alert("Error occurred while changing password");
  //     }
  //   };
  //   xhr.onerror = function () {
  //     alert("Error occurred while changing password");
  //   };
  //   xhr.send(
  //     `old_password=${encodeURIComponent(
  //       old_password
  //     )}&new_password=${encodeURIComponent(new_password)}`
  //   );
  // }
  
  // document.addEventListener("DOMContentLoaded", function () {
  //   // Call fetchEvents initially to load all events
  //   fetchEvents();
  
  //   // Event listener for search input
  //   document
  //     .getElementById("search-input")
  //     .addEventListener("input", function () {
  //       const searchValue = this.value.toLowerCase();
  //       filterEvents(searchValue);
  //     });
  
  //   // Event listener for filter selection
  //   document
  //     .getElementById("filter-select")
  //     .addEventListener("change", function () {
  //       const filterValue = this.value.toLowerCase();
  //       filterEvents(filterValue);
  //     });
  // });
  
  // function filterEvents(filterValue) {
  //   const eventsContainer = document.getElementById("events-container");
  //   const eventCards = eventsContainer.getElementsByClassName("event-card");
  
  //   // Loop through each event card and check if it matches the filter value
  //   for (let i = 0; i < eventCards.length; i++) {
  //     const title = eventCards[i]
  //       .querySelector(".event-title")
  //       .textContent.toLowerCase();
  //     if (title.includes(filterValue)) {
  //       eventCards[i].style.display = "block"; // Show the event card
  //     } else {
  //       eventCards[i].style.display = "none"; // Hide the event card
  //     }
  //   }
  // }
  
  // function fetchEvents() {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open(
  //     "GET",
  //     "http://localhost/vitcevents/backend/controller/get-events.php",
  //     true
  //   );
  //   xhr.onload = function () {
  //     if (xhr.status === 200) {
  //       const response = JSON.parse(xhr.responseText);
  //       if (response.status === "success") {
  //         const events = response.events;
  //         const eventsContainer = document.getElementById("events-container");
  //         events.forEach((event) => {
  //           createEventCard(event, eventsContainer);
  //         });
  //       } else {
  //         console.error("Error fetching events:", response.message);
  //       }
  //     } else {
  //       console.error("Error fetching events");
  //     }
  //   };
  //   xhr.onerror = function () {
  //     console.error("Error fetching events");
  //   };
  //   xhr.send();
  // }
  
  // function createEventCard(event, container) {
  //   const eventCard = document.createElement("div");
  //   eventCard.classList.add(
  //     "p-4",
  //     "w-80",
  //     "flex",
  //     "items-start",
  //     "justify-center",
  //     "flex-col",
  //     "gap-4",
  //     "rounded-2xl",
  //     "bg-white",
  //     "shadow-xl"
  //   );
  
  //   // Event image
  //   const img = document.createElement("img");
  //   img.src = event.image_url || "https://via.placeholder.com/300";
  //   img.classList.add("rounded-xl");
  //   eventCard.appendChild(img);
  
  //   // Event title
  //   const title = document.createElement("h1");
  //   title.textContent = event.title || "Event Name";
  //   title.classList.add("text-4xl", "font-bold", "primary-text", "text-left");
  //   eventCard.appendChild(title);
  
  //   // Event description
  //   const description = document.createElement("h2");
  //   description.textContent = event.description || "Event Description";
  //   description.classList.add("text-2xl", "font-light", "secondary-text");
  //   eventCard.appendChild(description);
  
  //   // Event date
  //   const date = document.createElement("div");
  //   date.innerHTML = `
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
  //         <span>${event.event_date || "Event Date"}</span>`;
  //   date.classList.add("flex", "items-center", "mt-2", "gap-2");
  //   eventCard.appendChild(date);
  
  //   // Event time
  //   const time = document.createElement("div");
  //   time.innerHTML = `
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
  //         <span>${event.time || "Event Time"}</span>`;
  //   time.classList.add("flex", "items-center", "mt-2", "gap-2");
  //   eventCard.appendChild(time);
  
  //   // Event location
  //   const location = document.createElement("div");
  //   location.innerHTML = `
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
  //         <span>${event.location || "Event Location"}</span>`;
  //   location.classList.add("flex", "items-center", "mt-2", "gap-2");
  //   eventCard.appendChild(location);
  
  //   // Register button
  //   const registerBtn = document.createElement("a");
  //   registerBtn.href = "#";
  //   registerBtn.textContent = "Register Now";
  //   registerBtn.classList.add(
  //     "rounded-full",
  //     "group",
  //     "flex",
  //     "items-center",
  //     "justify-center",
  //     "gap-4",
  //     "secondary-text",
  //     "font-light",
  //     "w-full",
  //     "bg-black/80",
  //     "text-center",
  //     "text-white",
  //     "py-3"
  //   );
  //   registerBtn.innerHTML += `
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:relative group-hover:left-2 transition-all duration-300">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
  //         </svg>`;
  //   eventCard.appendChild(registerBtn);
  
  //   // Append the event card to the container
  //   container.appendChild(eventCard);
  // }