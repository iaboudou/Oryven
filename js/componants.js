// create and return the card element
// calculate the diffence prix percentage between two dates (depend on the range fetched by the query)
export function metalCard(metal) {
  let dp = metal.price - metal.previousPrice;
  let percentage = (dp / metal.previousPrice) * 100;

  let card = document.createElement("div");
  card.className = "card";

  let title = document.createElement("h3");
  title.textContent = metal.name;

  let price = document.createElement("p");
  price.className = "price";
  price.textContent = `${metal.price.toFixed(2)} ${metal.currency}`;

  let unit = document.createElement("p");
  unit.className = "unit";
  unit.textContent = `Prix par ${metal.unit}`;

  let difference = document.createElement("p");
  difference.textContent = `${dp >= 0 ? "▲" : "▼"} ${percentage.toFixed(2)} %`;
  difference.style.color = dp >= 0 ? "green" : "red";

  card.append(title, price, unit, difference);
  return card;
}

// update loading status on the header after fetching and set last time updated
export function endLoadingStatus(metals) {
  let status = document.querySelector("#status");

  status.classList.remove("loading");
  status.classList.add("success");

  let date = new Date(metals[0]?.updated_at);
  status.textContent = `Dernière mise à jour : ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()} à ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
