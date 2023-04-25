import { OrgData } from "../org-data";

export const mockOrgData: OrgData = {
  orgName: "Test Organization",
  town: "Test Town",
  industry: "Test Industry",
  mainTier: "Test Main Tier",
  subTier: "Test Sub Tier",
  dateAdded: new Date("2023-01-01T00:00:00.000Z"),
  words: ["test", "organization"],
};

export const mockOrgDataArray: OrgData[] = [mockOrgData];
