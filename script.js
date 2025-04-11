document.addEventListener('DOMContentLoaded', () => {
    const urlListTextarea = document.getElementById('urlList');
    const generateBtn = document.getElementById('generateBtn');
    const resultSection = document.getElementById('resultSection');
    const randomUrlInput = document.getElementById('randomUrl');
    const copyBtn = document.getElementById('copyBtn');
    const urlCountElement = document.getElementById('urlCount');
    
    // Base URL of our application
    const baseUrl = window.location.href.split('?')[0];
    
    // Generate random link when button is clicked
    generateBtn.addEventListener('click', () => {
        // Get the URLs from the textarea
        const urlsText = urlListTextarea.value.trim();
        
        if (!urlsText) {
            alert('Please enter at least one URL');
            return;
        }
        
        // Split by newline and filter out empty lines
        const urls = urlsText.split('\n')
            .map(url => url.trim())
            .filter(url => url !== '');
        
        if (urls.length === 0) {
            alert('Please enter at least one valid URL');
            return;
        }
        
        // Validate URLs
        const validUrls = urls.filter(url => {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        });
        
        if (validUrls.length === 0) {
            alert('None of the entered URLs are valid. Please check your input.');
            return;
        }
        
        if (validUrls.length !== urls.length) {
            const invalidCount = urls.length - validUrls.length;
            alert(`${invalidCount} invalid URL(s) were removed. Please check your input.`);
        }
        
        // Encode the URLs
        const encodedUrls = encodeURIComponent(JSON.stringify(validUrls));
        
        // Create the random link
        const randomLink = `${baseUrl}?urls=${encodedUrls}`;
        
        // Display the result
        randomUrlInput.value = randomLink;
        urlCountElement.textContent = `URLs added: ${validUrls.length}`;
        resultSection.style.display = 'block';
    });
    
    // Copy link to clipboard
    copyBtn.addEventListener('click', () => {
        randomUrlInput.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
    
    // Check if we should redirect (when someone uses the generated link)
    const urlParams = new URLSearchParams(window.location.search);
    const urlsParam = urlParams.get('urls');
    
    if (urlsParam) {
        try {
            const urls = JSON.parse(decodeURIComponent(urlsParam));
            
            if (Array.isArray(urls) && urls.length > 0) {
                // Pick a random URL from the list
                const randomIndex = Math.floor(Math.random() * urls.length);
                const randomUrl = urls[randomIndex];
                
                // Redirect to the random URL
                window.location.href = randomUrl;
            }
        } catch (e) {
            console.error('Error parsing URLs parameter:', e);
        }
    }
}); 