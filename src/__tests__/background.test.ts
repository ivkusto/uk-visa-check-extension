import * as searchOrgModule from "../db/search-org";
import "../background";
import { chrome } from "jest-chrome";
import { mockOrgDataArray } from "../types/mocks/mock-org-data";

jest.mock("../db/search-org");

describe("background.ts", () => {
  const partialOrgName = "test";

  beforeEach(() => {
    jest.resetAllMocks();
    (searchOrgModule.searchByOrgName as jest.Mock).mockResolvedValue(
      mockOrgDataArray
    );
  });

  test("searchByOrgName listener should be called and return results", async () => {
    const sendResponse = jest.fn();
    await chrome.runtime.onMessage.callListeners(
      { action: "searchByOrgName", partialOrgName },
      {},
      sendResponse
    );

    expect(searchOrgModule.searchByOrgName).toHaveBeenCalledWith(
      partialOrgName
    );
    expect(sendResponse).toHaveBeenCalledWith(mockOrgDataArray);
  });

  test("searchByOrgName listener should log error on failure", async () => {
    (searchOrgModule.searchByOrgName as jest.Mock).mockRejectedValue(
      new Error("Search error")
    );

    const sendResponse = jest.fn();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await chrome.runtime.onMessage.callListeners(
      { action: "searchByOrgName", partialOrgName },
      {},
      sendResponse
    );

    // Wait for the next tick to allow the searchByOrgName to complete
    await new Promise(setImmediate);

    expect(searchOrgModule.searchByOrgName).toHaveBeenCalledWith(
      partialOrgName
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error searching by orgName:",
      new Error("Search error")
    );

    consoleErrorSpy.mockRestore();
  });

  test("listener should not be called for unsupported actions", () => {
    const sendResponse = jest.fn();

    chrome.runtime.onMessage.callListeners(
      { action: "unsupportedAction", partialOrgName },
      {},
      sendResponse
    );

    expect(searchOrgModule.searchByOrgName).not.toHaveBeenCalled();
    expect(sendResponse).not.toHaveBeenCalled();
  });
});
