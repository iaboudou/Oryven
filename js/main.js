import { fetchMetals } from "./fetch.js";
import { startLoadingStatus, endLoadingStatus, metalCard, addMetalsTitle } from "./componants.js";

let cards = document.querySelector("#cards");
let currency = document.querySelector("#currency");
let refresh = document.querySelector("#refresh");

addMetalsTitle(cards);

(async () => {
  await fetchedAndRendered();
})();

refresh.addEventListener("click", async () => {
  await fetchedAndRendered();
});

currency.addEventListener("click", async () => {
  await fetchedAndRendered();
})

// fetch and render metals
async function fetchedAndRendered() {
  startLoadingStatus();
  cards.innerHTML = "";
  let fetchedmetals = await fetchMetals(currency);
  if (!fetchedmetals) {
    endLoadingStatus(null, false);
    return false;
  } else {
    endLoadingStatus(fetchedmetals, true);
  }
  fetchedmetals.forEach((metal) => cards.append(metalCard(metal)));
  return true;
}
