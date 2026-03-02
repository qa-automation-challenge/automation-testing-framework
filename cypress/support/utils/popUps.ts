import { campaignButtons } from "../configuration/locators/campaign";

export function closeCampaignPopup() {
  cy.get("body").then(($body) => {
    if ($body.find(campaignButtons.closeCampaignPopup).length > 0) {
      cy.get(campaignButtons.closeCampaignPopup).click();
    }
  });
}
