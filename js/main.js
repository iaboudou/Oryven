import { fetchMetals } from "./fetch.js";
import { startLoadingStatus, endLoadingStatus, metalCard, addMetalsTitle, chartbase } from "./componants.js";

let container = document.querySelector(".container");
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
  container.innerHTML = ""
  let fetchedmetals = await fetchMetals(currency);
  if (!fetchedmetals) {
    endLoadingStatus(null, false);
    return false;
  } else {
    endLoadingStatus(fetchedmetals, true);
    container.append(chartbase())

  }
  fetchedmetals.forEach((metal) => cards.append(metalCard(metal)));
  return true;
}
