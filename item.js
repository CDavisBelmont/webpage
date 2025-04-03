document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");

    fetch("collection.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const item = data.find(i => i.id === itemId);
            if (!item) {
                console.error("Item not found");
                return;
            }

            // Set the content for the page
            document.getElementById("item-title").innerText = item.title;
            document.getElementById("item-image").src = "images/" + item.image;
            document.getElementById("item-description").innerText = item.description;

            // Create JSON-LD metadata and append to head
            const jsonLd = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": item.title,
                "description": item.description,
                "brand": item.brand,
                "category": item.category,
                "image": "images/" + item.image,
                "url": window.location.href
            };

            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.innerText = JSON.stringify(jsonLd);

            // Append JSON-LD metadata to the head
            document.head.appendChild(script);
        })
        .catch(error => console.error("Error loading JSON:", error));
});
