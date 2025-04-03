document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    if (!itemId) {
        document.body.innerHTML = "<h1>Item not found</h1><a href='index.html'>Back to Collection</a>";
        return;
    }

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const item = data.find(i => i.id === itemId);

            if (!item) {
                document.body.innerHTML = "<h1>Item not found</h1><a href='index.html'>Back to Collection</a>";
                return;
            }

            // ✅ Update the page with item details
            document.title = item.title;
            document.getElementById("item-title").textContent = item.title;
            document.getElementById("item-description").textContent = item.description;
            document.getElementById("item-image").src = `images/${item.image}`;
            document.getElementById("item-image").alt = item.title;
        })
        .catch(error => {
            console.error("Error loading item data:", error);
            document.body.innerHTML = "<h1>Error loading item</h1><a href='index.html'>Back to Collection</a>";
        });
});
