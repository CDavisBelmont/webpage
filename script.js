document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("collection");
            container.innerHTML = ""; // Clear previous content

            // Loop through each item in JSON
            data.forEach(item => {
                let div = document.createElement("div");
                div.classList.add("collection-item");

                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.image}" alt="${item.title}" width="200">
                    <p>${item.description}</p>
                    <a href="${item.page}" class="view-more">View More</a>
                `;

                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            document.getElementById("collection").innerHTML = "<p>Error loading collection.</p>";
        });
});
