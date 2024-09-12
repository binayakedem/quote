let quotes = []; 
let filteredQuotes = []; 
let currentQuoteIndex = 0;

fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data; 
        populateCategoryDropdown(); 
        filteredQuotes = quotes; 
        displayQuote(currentQuoteIndex);
    })
    .catch(error => console.error('Error loading quotes:', error));

function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById("categoryDropdown");
    const categories = new Set(quotes.map(quote => quote.category)); 

    categoryDropdown.appendChild(new Option("All", "All"));

    categories.forEach(category => {
        categoryDropdown.appendChild(new Option(category, category));
    });
}

function displayQuote(index) {
    if (filteredQuotes.length === 0) return;
    
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const authorImage = document.getElementById("authorImage");

    // Update the quote and author text
    quoteText.textContent = filteredQuotes[index].quote;
    quoteAuthor.textContent = `- ${filteredQuotes[index].author}`;
    const imageUrl = filteredQuotes[index].author_image_link;
    if (imageUrl) {
        authorImage.src = imageUrl;
        authorImage.alt = `${filteredQuotes[index].author}'s Image`; 
        authorImage.style.display = 'block'; 
        authorImage.style.display = 'none'; 
    }
}

// Event listener for the "Previous" button
document.getElementById("prevBtn").addEventListener("click", () => {
    if (filteredQuotes.length === 0) return;
    
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
    } else {
        currentQuoteIndex = filteredQuotes.length - 1; // Loop back to the last quote
    }
    displayQuote(currentQuoteIndex);
});

// Event listener for the "Next" button
document.getElementById("nextBtn").addEventListener("click", () => {
    if (filteredQuotes.length === 0) return;
    
    if (currentQuoteIndex < filteredQuotes.length - 1) {
        currentQuoteIndex++;
    } else {
        currentQuoteIndex = 0; // Loop back to the first quote
    }
    displayQuote(currentQuoteIndex);
});

// Event listener for the "Random" button
document.getElementById("randomBtn").addEventListener("click", () => {
    if (filteredQuotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length); // Get a random index
    currentQuoteIndex = randomIndex; // Update the current index to the random one
    displayQuote(currentQuoteIndex); // Display the random quote
});

// Event listener for category selection from the dropdown
document.getElementById("categoryDropdown").addEventListener("change", (event) => {
    const selectedCategory = event.target.value;

    // Filter quotes based on the selected category or show all quotes if "All" is selected
    if (selectedCategory === "All") {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    // Reset the current quote index and display the first quote from the filtered list
    currentQuoteIndex = 0;
    displayQuote(currentQuoteIndex);
});

// Function to increase font size
function increaseFontSize() {
    const quoteText = document.getElementById('quoteText'); // Corrected id
    let currentSize = window.getComputedStyle(quoteText, null).getPropertyValue('font-size');
    let newSize = parseFloat(currentSize) + 2; // Increase font size by 2px
    quoteText.style.fontSize = newSize + 'px';
}

// Function to decrease font size
function decreaseFontSize() {
    const quoteText = document.getElementById('quoteText'); // Corrected id
    let currentSize = window.getComputedStyle(quoteText, null).getPropertyValue('font-size');
    let newSize = parseFloat(currentSize) - 2; // Decrease font size by 2px
    quoteText.style.fontSize = newSize + 'px';
}


// mode changer
// Function to toggle dark mode
document.getElementById('modeToggle').addEventListener('click', () => {
    const body = document.body;
    const modeToggleIcon = document.getElementById('modeToggle');

    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Toggle between moon and sun icons
    if (body.classList.contains('dark-mode')) {
        modeToggleIcon.classList.remove('fa-moon');
        modeToggleIcon.classList.add('fa-sun');
    } else {
        modeToggleIcon.classList.remove('fa-sun');
        modeToggleIcon.classList.add('fa-moon');
    }
});

