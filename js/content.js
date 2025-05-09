// get the URL of the page
var url = document.location.href;

// if not on a docs.microsoft.com domain
if (url.indexOf("//docs.microsoft.com") <= -1) {
    // send inactive icons
    browser.runtime.sendMessage({
        "iconPath20": "images/inactive20.png",
        "iconPath40": "images/inactive40.png"
    });
}

//,
"content_scripts": [
    {
        "matches": [
            "<all_urls>"
        ],
        "js": ["js/content.js"],
        "run_at": "document_end"
    }
],
    "background": {
    "scripts": ["js/background.js"],
        "persistent": true
}