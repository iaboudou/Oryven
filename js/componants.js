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

// the chart header
export function chartbase() {
  let el = document.createElement("div");
  el.innerHTML = `
  <section class="history">
    <div class="cntrls">
      <select id="history-metal" class="history-metal">
        <option value="xau">Or</option>
        <option value="silver">Argent</option>
      </select>
      <button type="button" class="chartbutton history-7d" data-days="7">7 jours</button>
      <button type="button" class="chartbutton history-30d" data-days="30">30 jours</button>
    </div>

    <div class="container-bar-char">
      <span class="label4"></span>

      <span class="label3"> </span>
      <span class="label2"> </span>
      <span class="label1"> </span>

      <svg id="bar_chart" viewBox="0 0 1500 500">
      </svg>

      <span class="label-days5"></span>
      <span class="label-days6"></span>
      <span class="label-days7"></span>
    </div>
  </section>`;

  return el;
}

// render the line shart
export function renderHistoryChart(points, days, currency) {
  let svg = document.getElementById("bar_chart");
  let w = 1500;
  let h = 500;

  let maxPrice = Math.max(...points.map((p) => Math.round(p.price)));
  let label1 = document.querySelector(".label1");
  let label2 = document.querySelector(".label2");
  let label3 = document.querySelector(".label3");
  let label4 = document.querySelector(".label4")
  let label_days5 = document.querySelector(".label-days5");
  let label_days6 = document.querySelector(".label-days6");
  let label_days7 = document.querySelector(".label-days7");

  label1.textContent = Math.floor(maxPrice * 0.25);
  label2.textContent = Math.floor(maxPrice * 0.5);
  label3.textContent = Math.floor(maxPrice * 0.75);
  label4.textContent = `prix en ${currency}`

  let d = 30;
  if (days == "30d") {
    label_days5.textContent = 10;
    label_days6.textContent = 20;
    label_days7.textContent = 30;
  } else if (days == "7d") {
    d = 7;
    label_days5.textContent = 2;
    label_days6.textContent = 4;
    label_days7.textContent = 6;
  }

  
  // calculate the exact (x, y) points will be rendred
  let pts = [];
  points.slice(points.length - d).forEach((p, i) => {
    let x = w - w * ((i + 1) / d);
    let y = h - (p.price * h) / maxPrice;
    pts.push(`${x},${y}`);
  });

  let polyline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );

  polyline.setAttribute("points", pts.concat(" "));
  polyline.setAttribute("stroke-width", 3);
  polyline.setAttribute("stroke", "var(--text)");
  polyline.setAttribute("fill", "none");

  svg.append(polyline);
}


