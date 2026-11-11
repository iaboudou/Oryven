import { fetchHistory, fetchMetals } from "./fetch.js";
import { startLoadingStatus, endLoadingStatus, metalCard, addMetalsTitle, chartbase, renderHistoryChart } from "./componants.js";

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
});

// 
let triggerListeners = (()=> {
  let historyMetal = document.querySelector(".history-metal");
  let history7d = document.querySelector(".history-7d");
  let history30d = document.querySelector(".history-30d");
  // when a change happen should fetch again and render the received data
  historyMetal?.addEventListener("change", async (e) => {
    let metal = e?.target?.value;
    let days = document.querySelector(".label-days5")?.textContent === "2" ? "7" : "30";
    let chart = document.getElementById("bar_chart");
  
    let history = await fetchHistory(metal, days);
    chart.innerHTML = "";
    renderHistoryChart(history, `${days}d`, currency.value);
  });
  
  // when a click happen to bring 30 days history should fetch again and render the received data
  history30d?.addEventListener("click", async (e) => {
    e.preventDefault();
  
    let chart = document.getElementById("bar_chart");
    let metal = document.querySelector(".history-metal")?.value;
  
    let history = await fetchHistory(metal, "30");
    chart.innerHTML = "";
    renderHistoryChart(history, "30d", currency.value);
  });
  
  // when a click happen to bring 7 days history should fetch again and render the received data
  history7d?.addEventListener("click", async (e) => {
    e.preventDefault();
    let metal = document.querySelector(".history-metal")?.value
    let history = await fetchHistory(metal, "7");
    let chart = document.getElementById("bar_chart");
    chart.innerHTML = "";
    renderHistoryChart(history, "7d", currency.value);
  });


})

// fetch and render metals
async function fetchedAndRendered() {
  startLoadingStatus();
  cards.innerHTML = "";
  container.innerHTML = "";
  let fetchedmetals = await fetchMetals(currency);
  if (!fetchedmetals) {
    endLoadingStatus(null, false);
    return false;
  } else {
    endLoadingStatus(fetchedmetals, true);
    container.append(chartbase());
    triggerListeners();
    let fetchedhistoory = await fetchHistory("xau", "1mo");
    renderHistoryChart(fetchedhistoory, "30d", currency.value);
  }
  fetchedmetals.forEach((metal) => cards.append(metalCard(metal)));
  return true;
}
