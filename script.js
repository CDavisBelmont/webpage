document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("collection");
            data.forEach(item => {
                let div = document.createElement("div");
                div.classList.add("collection-item");
                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.image}" alt="${item.title}">
                    <p>${item.description}</p>
                    <a href="${item.link}">View More</a>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
