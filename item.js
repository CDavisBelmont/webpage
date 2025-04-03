document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    if (!itemId) {
        document.body.innerHTML = "<h1>Item not found</h1><a href='index.html'>Back to Collection</a>";
        return;
    }

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
                document.body.innerHTML = "<h1>Item not found</h1><a href='index.html'>Back to Collection</a>";
                return;
            }

            // ✅ Fill in item details
            document.title = item.title;
            document.getElementById("item-title").textContent = item.title;
            document.getElementById("item-description").textContent = item.description;
            document.getElementById("item-image").src = `images/${item.image}`;
            document.getElementById("item-image").alt = item.title;

            // ✅ Create JSON-LD metadata
            const jsonLd = {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": item.title,
                "description": item.description,
                "image": `images/${item.image}`,
                "brand": {
                    "@type": "Brand",
                    "name": item.brand || "Unknown"
                },
                "category": item.category || "Uncategorized"
            };

            // ✅ Insert JSON-LD into the <head>
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(jsonLd, null, 2);
            document.head.appendChild(script);
        })
        .catch(error => {
            console.error("Error loading item data:", error);
            document.body.innerHTML = "<h1>Error loading item</h1><a href='index.html'>Back to Collection</a>";
        });
});
