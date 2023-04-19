import { searchByOrgName } from "./db/search-org";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "searchByOrgName") {
    searchByOrgName(request.partialOrgName)
      .then((results) => {
        sendResponse(results);
      })
      .catch((error) => {
        console.error("Error searching by orgName:", error);
      });
    return true;
  }
});
