# Link Randomizer

A simple web app that allows you to create a single URL that randomly redirects to one of multiple specified URLs.

## How to Use

1. Open `index.html` in your web browser.
2. Paste your URLs in the textarea, one URL per line.
3. Click "Generate Random Link" to create your randomizer link.
4. Copy the generated link and share it with others.

When someone clicks on your generated link, they will be randomly redirected to one of the URLs you provided.

## Features

- Simple, user-friendly interface
- Validates URLs to ensure they're properly formatted
- Counts the number of valid URLs added
- Easy to copy the generated link with one click
- Works entirely in the browser - no server required

## Technical Details

The app works by encoding your list of URLs as a parameter in the generated link. When someone visits that link, the app randomly selects one of those URLs and redirects the visitor to it.

## Requirements

No special requirements or installations needed. This is a purely client-side application that runs in any modern web browser. 