document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://localhost:5000/api/photos";

    // Fetch and display photos by category
    function fetchPhotos(category, photoListId) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const photoList = document.getElementById(photoListId);
                photoList.innerHTML = "";
                data.filter(photo => photo.category === category).forEach(photo => {
                    const photoDiv = document.createElement("div");
                    photoDiv.classList.add("photo");
                    photoDiv.innerHTML = `
                        <h3>${photo.title}</h3>
                        <img src="${photo.url}" alt="${photo.title}">
                        <p>${photo.description}</p>
                        <button onclick="deletePhoto(${photo.id}, '${category}')">Delete</button>
                    `;
                    photoList.appendChild(photoDiv);
                });
            });
    }

    // Delete photo
    window.deletePhoto = function(id, category) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            fetchPhotos(category, category + "-photo-list");
        });
    }

    // Navigate to add-photo.html
    window.navigateToAddPhoto = function(category) {
        window.location.href = "add-photo.html?category=" + category;
    }

    // Load photos on page load
    const categories = ["animals", "plants", "other"];
    categories.forEach(category => {
        fetchPhotos(category, category + "-photo-list");
    });
});
