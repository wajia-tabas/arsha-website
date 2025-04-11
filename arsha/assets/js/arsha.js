document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".navtab");
    const underline = document.querySelector(".navtabs .underline");

    function updateUnderline(tab) {
        // Get the position and width of the clicked tab
        const tabPosition = tab.getBoundingClientRect();
        const containerPosition = tab.parentElement.getBoundingClientRect();

        // Set the underline position and width based on the clicked tab
        underline.style.width = `${tabPosition.width}px`;
        underline.style.left = `${tabPosition.left - containerPosition.left}px`;
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));

            // Add active class to the clicked tab
            this.classList.add("active");

            // Update the underline position
            updateUnderline(this);
        });
    });

    // Initialize the underline position on page load
    const activeTab = document.querySelector(".navtab.active");
    if (activeTab) {
        updateUnderline(activeTab);
    }
});
// gallery images a nd tabbing 
document.querySelectorAll('.navtab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs and content
        document.querySelectorAll('.navtab').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
        
        // Add active class to the clicked tab and corresponding content
        this.classList.add('active');
        const targetContent = document.getElementById(this.getAttribute('data-target'));
        targetContent.classList.add('active');
        
        // Move underline
        const underline = document.querySelector('.navtabs .underline');
        underline.style.left = this.offsetLeft + 'px';
        underline.style.width = this.offsetWidth + 'px';

        // If the "All" tab is clicked, combine all images
        if (this.getAttribute('data-target') === 'home') {
            const homeContent = document.getElementById('home-content');
            homeContent.innerHTML = ''; // Clear the existing content

            // Gather images from all other tabs and append them to the 'All' tab content
            document.querySelectorAll('.content:not(#home) img').forEach(img => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-4';
                const clonedImg = img.cloneNode(true);
                colDiv.appendChild(clonedImg);
                homeContent.appendChild(colDiv);
            });
        }
    });
});

// Trigger the "All" tab click on page load to populate the content
document.getElementById('home').click();
