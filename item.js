document.addEventListener("DOMContentLoaded", function () {
    // Get the item ID from the URL (the part after "item-")
    const itemId = window.location.pathname.split('/').pop().replace('.html', '');

    fetch("collection.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Find the item in the JSON data by matching the ID
            const item = data.find(item => item.id === itemId);

            // If the item is found, update the page with its data
            if (item) {
                document.getElementById("item-title").textContent = item.title;
                document.getElementById("item-image").src = "images/" + item.image;
                document.getElementById("item-image").alt = item.title;
                document.getElementById("item-description").textContent = item.description;

                // Optionally: You can also add metadata directly on the page if needed
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
