document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check the data in the console
            const container = document.getElementById("collection");
            container.innerHTML = ""; // Clear previous content
            data.forEach(item => {
                let div = document.createElement("div");
                div.classList.add("collection-item");
                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.image}" alt="${item.title}" width="200">
                    <p>${item.description}</p>
                    <button class="view-more" data-item="${item.title}">View More</button>
                `;
                container.appendChild(div);

                // Add click event for the "View More" button
                div.querySelector('.view-more').addEventListener('click', function() {
                    showModal(item);
                });
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});

// Function to display a modal with item details
function showModal(item) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}" width="300">
            <p>${item.description}</p>
            <a href="/" class="back-to-collection">Back to Collection</a>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
}
