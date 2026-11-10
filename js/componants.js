// create and return the card element
// calculate the diffence prix percentage between two dates (depend on the range fetched by the query)
export function metalCard(metal) {
  let dp = metal.price - metal.previousPrice;
  let percentage = !metal.previousPrice ? 0 : (dp / metal.previousPrice) * 100;

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

// set loading status before fetching
export function startLoadingStatus() {
  let status = document.querySelector("#status");
  let statusText = document.querySelector("#status-text");

  status.classList.remove("success", "error");
  status.classList.add("loading");

  if (statusText) {
    statusText.textContent = "Chargement en cours…";
  } else {
    let circle = document.createElement("span");
    circle.className = "rotatedcircle";

    let text = document.createElement("span");
    text.id = "status-text";
    text.textContent = "Chargement en cours…";

    let retry = document.createElement("button");
    retry.id = "retry";
    retry.type = "button";
    retry.hidden = true;
    retry.textContent = "Réessayer";

    status.replaceChildren(circle, text, retry);
  }
}

// update loading status on the header after fetching and set last time updated
export function endLoadingStatus(metals, fetched) {
  let status = document.querySelector("#status");
  let statusText = document.querySelector("#status-text");

  status.classList.remove("loading");

  if (!fetched) {
    status.classList.remove("success");
    status.classList.add("error");
    if (statusText) {
      statusText.textContent = "Erreur de chargement des prix";
    } else {
      status.textContent = "Erreur de chargement des prix";
    }
    return;
  }
  status.classList.remove("error");
  status.classList.add("success");

  let date = new Date(metals[0]?.updated_at);
  let dateFormatted = `Dernière mise à jour : ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()} à ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  if (statusText) {
    statusText.textContent = dateFormatted;
  } else {
    let circle = document.createElement("span");
    circle.className = "rotatedcircle";

    let text = document.createElement("span");
    text.id = "status-text";
    text.textContent = dateFormatted;

    let retry = document.createElement("button");
    retry.id = "retry";
    retry.type = "button";
    retry.hidden = true;
    retry.textContent = "Réessayer";

    status.replaceChildren(circle, text, retry);
  }
}

// add a title on top of the metals cards
export function addMetalsTitle(cardsSection) {
  if (cardsSection.parentElement.querySelector("h2")) return;
  let el = document.createElement("h2");
  el.textContent = "Cours du jour";
  cardsSection.parentElement.prepend(el);
}
