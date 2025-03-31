document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json") // Make sure this file exists
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("collection");
            container.innerHTML = ""; // Clear previous content
            data.forEach(item => {
                let div = document.createElement("div");
                div.classList.add("collection-item");
                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.image}" alt="${item.title}" width="200">
                    <p>${item.description}</p>
                    <a href="${item.link}">View More</a>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
