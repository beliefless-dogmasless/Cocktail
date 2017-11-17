if (typeof browser == "undefined")
    var browser = chrome;

browser.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        details.requestHeaders.push({
            name: "X-Molotov-Agent",
            value: "{\"app_id\":\"electron_app\",\"app_build\":3,\"app_version_name\":\"1.8.0\",\"type\":\"desktop\",\"electron_version\":\"1.7.9\",\"os\":\"Unknown\",\"os_version\":\"Unknown\",\"manufacturer\":\"MoloChrome\",\"serial\":\"Unknown\",\"model\":\"MoloChrome\",\"brand\":\"MoloChrome\"}"
        });
        
        return {requestHeaders: details.requestHeaders};
    },
    {
        urls: [
            "https://fapi.molotov.tv/v3/auth/login",
            "https://fapi.molotov.tv/v3/auth/refresh/*",
            "https://fapi.molotov.tv/v2/me/assets*",
            "https://multi-screen.molotov.tv/v3/ping*",
            "https://jessica.molotov.tv/video/preroll*"
        ],
        types: ["xmlhttprequest"]
    },
    ["blocking", "requestHeaders"]
);

browser.webRequest.onCompleted.addListener(
    function(details) {
        // User successfully logged in.
        if (details.method == "POST"
            && details.url == "https://fapi.molotov.tv/v3/auth/login"
            && details.statusCode == "200") {
                browser.tabs.reload();
        }
    },
    {
        urls: [
            "https://fapi.molotov.tv/v3/auth/login"
        ],
        types: ["xmlhttprequest"]
    }
);

browser.browserAction.onClicked.addListener(
    function(details) {
        browser.tabs.create({url: "https://app.molotov.tv/"});
    }
);