.then(data => {
    console.log("Data loaded:", data); // Debugging line
    const container = document.getElementById("collection");
    container.innerHTML = ""; // Clear previous content
    data.forEach(item => {
        console.log("Item:", item); // Debugging line
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
