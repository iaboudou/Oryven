// fetch the metal price from /spot (query include currency and unit)
// fetch the previous prices from chart/ (query include symbol, range and interval)
export async function fetchMetals(currency) {
  if (!navigator.onLine) return "offline";
  try {
    let r = await fetch(`https://xaus.com/api/v1/spot?currency=${currency.value}&unit=gram` );
    if (r.status === 429) return "quota";
    if (r.status >= 500) return "server";
    if (r.status >= 400) return "client";
    let data;
    try {
      data = await r.json();
    } catch {
      return "parse";
    }

    let gold = await fetch("https://xaus.com/api/v1/chart?symbol=xau&range=5d&interval=1d" );
    let goldHistory = await gold.json();

    let silver = await fetch("https://xaus.com/api/v1/chart?symbol=silver&range=5d&interval=1d" );
    let silverHistory = await silver.json();
    return [
      {
        name: "Or",
        price: data.xau.price,
        previousPrice: (goldHistory.points.at(-2)?.c * data.fx_rate) / 31.1035,
        currency: data.xau.currency,
        unit: data.xau.unit,
        updated_at: data.updated_at,
      },
      {
        name: "Argent",
        price: (data.silver_usd_oz * data.fx_rate) / 31.1035,
        previousPrice:
          (silverHistory.points.at(-2)?.c * data.fx_rate) / 31.1035,
        currency: currency.value,
        unit: "gram",
      },
    ];
  } catch {
    return "network";
  }
}

// fetch history points and parse the date and price
export async function fetchHistory(symbol, days) {
  if (!navigator.onLine) return "offline";
  try {
    let currency = document.querySelector("#currency").value;

    let r = await fetch(`https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`);
    if (r.status === 429) return "quota";
    if (r.status >= 500) return "server";
    if (r.status >= 400) return "client";
    let valueOfCurrency;
    try { 
      valueOfCurrency = await r.json(); 
    } catch { 
      return "parse"; 
    }
    let fx_rate = valueOfCurrency.fx_rate;

    let range = days === "1mo" ? "1mo" : days + "d";
    let h = await fetch(`https://xaus.com/api/v1/chart?symbol=${symbol}&range=${range}&interval=1d`);
    if (h.status === 429) return "quota";
    if (h.status >= 500) return "server";
    if (h.status >= 400) return "client";
    let chartInfo;
    try { 
      chartInfo = await h.json(); 
    } catch { 
      return "parse"; 
    }
    let points = chartInfo.points;

    return points.map((p) => ({
      date: p.t,
      price: (p.c * fx_rate) / 31.1035,
    }));
  } catch {
    return "network";
  }
}
