// fetch the metal price from /spot (query include currency and unit)
// fetch the previous prices from chart/ (query include symbol, range and interval)
export async function fetchMetals(currency) {
  try {
    let r = await fetch( `https://xaus.com/api/v1/spot?currency=${currency.value}&unit=gram` );
    let data = await r.json();

    let gold = await fetch( "https://xaus.com/api/v1/chart?symbol=xau&range=5d&interval=1d" );
    let goldHistory = await gold.json();

    let silver = await fetch( "https://xaus.com/api/v1/chart?symbol=silver&range=5d&interval=1d" );
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
    return null;
  }
}

// fetch history points and parse the date and price
export async function fetchHistory(symbol, days) {

  let currency = document.querySelector("#currency").value;

  let fx_rate = (await (await fetch(`https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`)).json()).fx_rate;
  let points = (await (await fetch(`https://xaus.com/api/v1/chart?symbol=${symbol}&range=${days}d&interval=1d`)).json()).points;

  return points.map((p) => ({
    date: p.t,
    price: (p.c * fx_rate) / 31.1035,
  }));
}
