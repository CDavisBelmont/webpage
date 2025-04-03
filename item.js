document.addEventListener("DOMContentLoaded", function () {
    // Get the item ID from the URL (the part after "item-")
    const itemId = window.location.pathname.split('/').pop().replace('.html', '');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            // Find the item by matching the ID from the URL
            const item = data.find(i => i.id === itemId);

            if (item) {
                // Update the page with the item data
                document.getElementById("item-title").textContent = item.title;
                document.getElementById("item-image").src = "images/" + item.image;
                document.getElementById("item-image").alt = item.title;
                document.getElementById("item-description").textContent = item.description;

                // Optionally: Add metadata box
                const metadataBox = document.createElement('div');
                metadataBox.classList.add('metadata-box');
                metadataBox.innerHTML = `
                    <h3>Product Details</h3>
                    <p><strong>Brand:</strong> ${item.brand}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                `;
                document.body.appendChild(metadataBox);
            } else {
                // If the item is not found, show an error
                document.getElementById("item-title").textContent = "Item not found";
                document.getElementById("item-description").textContent = "Sorry, this item is not available.";
            }
        })
        .catch(error => {
            console.error("Error loading item data:", error);
            document.getElementById("item-title").textContent = "Error loading item";
            document.getElementById("item-description").textContent = "There was an error retrieving the item data.";
        });
});
