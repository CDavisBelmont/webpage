fetch("items.json")
    .then(response => response.json())
    .then(items => {
        const container = document.getElementById("items-container");
        items.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.innerHTML = `
                <a href="item.html?name=${encodeURIComponent(item.name)}">
                    <img src="${item.image}" alt="${item.name}" width="150">
                    <h2>${item.name}</h2>
                </a>
            `;
            container.appendChild(itemElement);
        });
    });
