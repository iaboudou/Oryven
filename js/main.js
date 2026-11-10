import { fetchMetals } from "./fetch.js";
import { metalCard } from "./componants.js";

let cards = document.querySelector("#cards");

// fetch and render metals
(async () => {
  let fetchedmetals = await fetchMetals();
  fetchedmetals.forEach((metal) => cards.append(metalCard(metal)));
})();
