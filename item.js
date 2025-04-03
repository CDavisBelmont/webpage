document.addEventListener("DOMContentLoaded", function () {
    // Get the item ID from the URL query string (e.g., item-template.html?id=red-jacket)
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    fetch("collection.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Find the item in the data based on the ID from the URL
            const item = data.find(item => item.id === itemId);
            if (item) {
                // Update the page with item data
                document.getElementById("item-title").innerText = item.title;
                document.title = item.title;  // Set the browser tab title
                document.getElementById("item-image").src = `images/${item.image}`;
                document.getElementById("item-description").innerText = item.description;
                document.getElementById("item-brand").innerText = item.brand;
                document.getElementById("item-category").innerText = item.category;
            } else {
                console.error("Item not found!");
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});
