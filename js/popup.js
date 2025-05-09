// get the buttons by id
//let getTabs = document.getElementById('GetTabs');

//function onError(error) {
//    //console.log(`Error: ${error}`);
//}

function switchToTab(windowId, tabId) {
    //alert(windowId + ":" + tabId);
    browser.tabs.update(tabId, { active: true });

    browser.windows.update(windowId, { focused: true });
}

let urlToSearch = document.getElementById('urlToSearch');

// Find the tabs
urlToSearch.onfocus = function () {

    //document.getElementById('UrlList').innerText = "Querying";

    if (urlToSearch.value == "") {
        browser.tabs.query({}, function (tabs) {
            document.getElementById('UrlList').innerHTML = "";
            for (let tab of tabs) {
                // tab.url requires the `tabs` permission
                document.getElementById('UrlList').innerHTML +=
                    '<li class="urls" data-windowId="'
                    + tab.windowId
                    + '" data-tabId="' + tab.id + '">'
                    //+ tab.windowId
                    //+ ":"
                    //+ tab.id
                    //+ "  "
                    + '<img class="urlIcon" src="' + (tab.favIconUrl == null ? "images/unknown.png" : tab.favIconUrl) + '"/>'
                    + tab.title
                    //+ "  "
                    //+ tab.url
                    + "</li>";

                //console.log(tab.url);
            }

            let urls = document.getElementsByClassName("urls");
            for (i = 0; i < urls.length; i++) {
                let url = urls[i];
                url.onclick = function () {
                    switchToTab(parseInt(url.getAttribute("data-windowId")), parseInt(url.getAttribute("data-tabId")));
                }
               
            }
        });
    }
    //querying.then( );
}

function updateResults() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('urlToSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById('UrlList');
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

urlToSearch.oninput = updateResults;
urlToSearch.onemptied = updateResults;
urlToSearch.onended = updateResults;
urlToSearch.onprogress = updateResults;
urlToSearch.onreset = updateResults;
urlToSearch.onsubmit = updateResults;
urlToSearch.onblur = updateResults;
urlToSearch.oninvalid = updateResults;
urlToSearch.onabort = updateResults;
urlToSearch.onchange = updateResults;
