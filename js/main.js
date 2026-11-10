import { fetchMetals } from "./fetch.js";
import { endLoadingStatus, metalCard } from "./componants.js";

let cards = document.querySelector("#cards");


// fetch and render metals
(async () => {
  let fetchedmetals = await fetchMetals();
  endLoadingStatus(fetchedmetals)
  fetchedmetals.forEach((metal) => cards.append(metalCard(metal)));
})();
