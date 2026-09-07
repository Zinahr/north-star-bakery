// North Star Bakery - Touchstone 4 JavaScript

const bakeryProducts = [
  { id: "bread", name: "Breads" },
  { id: "pastries", name: "Pastries" },
  { id: "cakes", name: "Cakes" }
];

const validationMessages = {
  name: "Please enter at least 2 characters for your name.",
  email: "Please enter a valid email address.",
  details: "Please enter at least 10 characters describing your request."
};

const storageKeys = {
  favorites: "bakeryFavorites",
  customerName: "customerName"
};


function getFavorites() {
  return JSON.parse(localStorage.getItem(storageKeys.favorites)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(storageKeys.favorites, JSON.stringify(favorites));
}
function updateFavoritesDisplay() {
  const favoritesList = document.getElementById("favorites-list");

  if (!favoritesList) {
    return;
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesList.textContent = "You have not saved any favorites yet.";
    return;
  }

  favoritesList.textContent = "Saved favorites: " + favorites.join(", ");
}

function toggleFavorite(productName) {
  let favorites = getFavorites();

  if (favorites.includes(productName)) {
    favorites = favorites.filter(item => item !== productName);
  } else {
    favorites.push(productName);
  }

  saveFavorites(favorites);
  updateFavoritesDisplay();
}

function setupFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-button");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      toggleFavorite(button.dataset.product);
    });
  });

  updateFavoritesDisplay();
}

function showError(field, message) {
  const errorElement = document.getElementById(field.id + "-error");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(field) {
  const errorElement = document.getElementById(field.id + "-error");

  if (errorElement) {
    errorElement.textContent = "";
  }
}

function validateContactForm(event) {
  const form = event.target;
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const details = document.getElementById("item-details");

  let isValid = true;

  clearError(name);
  clearError(email);
  clearError(details);

  if (name.value.trim().length < 2) {
    showError(name, validationMessages.name);
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value.trim())) {
    showError(email, validationMessages.email);
    isValid = false;
  }

  if (details.value.trim().length < 10) {
    showError(details, validationMessages.details);
    isValid = false;
  }

  event.preventDefault();

if (isValid) {
  clearError(name);
  clearError(email);
  clearError(details);
  form.reset();

  setTimeout(function () {
    alert("Thank you! Your request has been received.");
  }, 100);
}

function saveCustomerName() {
  const name = document.getElementById("name");

  if (name && name.value.trim() !== "") {
    localStorage.setItem(storageKeys.customerName, name.value.trim());
  }
}

function loadCustomerName() {
  const name = document.getElementById("name");

  if (!name) {
    return;
  }

  const savedName = localStorage.getItem(storageKeys.customerName);
  if (savedName) {
    name.value = savedName;
  }
}

function setupContactForm() {
  const form = document.querySelector("form");
  const name = document.getElementById("name");

  if (!form) {
    return;
  }

  form.addEventListener("submit", validateContactForm);

  if (name) {
    name.addEventListener("input", saveCustomerName);
  }

  loadCustomerName();
}

document.addEventListener("DOMContentLoaded", function () {
  setupFavoriteButtons();
  setupContactForm();
});
