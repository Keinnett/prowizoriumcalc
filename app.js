function calcAll() {
  const pBrutto = parseFloat(document.getElementById('pow-brutto').value) || 0;
  const pWyl = parseFloat(document.getElementById('pow-wylaczenia').value) || 0;
  const rebnia = document.getElementById('rebnia').value;

  const nettoBaza = Math.max(0, pBrutto - pWyl);
  document.getElementById('netto-baza').innerText = nettoBaza.toFixed(2);

  // Gatunek 1: Dąb
  const pDb = parseFloat(document.getElementById('pow-db').value) || 0;
  const wxDb = parseFloat(document.getElementById('wx-db').value) || 1;
  const wyDb = parseFloat(document.getElementById('wy-db').value) || 1;
  const obsadaDb = 10000 / (wxDb * wyDb);
  const tsztDb = (pDb * obsadaDb) / 1000;
  document.getElementById('tszt-db').value = tsztDb.toFixed(2);
  document.getElementById('tooltip-db').setAttribute(
    'data-tooltip', 
    `Wzór: ${pDb.toFixed(2)} ha × [10 000 / (${wxDb} × ${wyDb})] = ${Math.round(tsztDb * 1000)} szt.`
  );

  // Gatunek 2: Buk
  const pBk = parseFloat(document.getElementById('pow-bk').value) || 0;
  const wxBk = parseFloat(document.getElementById('wx-bk').value) || 1;
  const wyBk = parseFloat(document.getElementById('wy-bk').value) || 1;
  const obsadaBk = 10000 / (wxBk * wyBk);
  const tsztBk = (pBk * obsadaBk) / 1000;
  document.getElementById('tszt-bk').value = tsztBk.toFixed(2);
  document.getElementById('tooltip-bk').setAttribute(
    'data-tooltip', 
    `Wzór: ${pBk.toFixed(2)} ha × [10 000 / (${wxBk} × ${wyBk})] = ${Math.round(tsztBk * 1000)} szt.`
  );

  // Bilans powierzchni
  const sumaZred = pDb + pBk;
  document.getElementById('suma-zred').innerText = sumaZred.toFixed(2);
  document.getElementById('val-odn').innerText = sumaZred.toFixed(2);
  document.getElementById('val-tszt').innerText = (tsztDb + tsztBk).toFixed(2);

  // Walidacja rębni IIIA (gniazda max 40% powierzchni manipulacyjnej)
  const statusEl = document.getElementById('status-walidacji');
  if (rebnia === 'IIIA') {
    const limitGniazd = pBrutto * 0.40;
    if (sumaZred > limitGniazd) {
      statusEl.innerText = `Ostrzeżenie: Gniazda (${sumaZred.toFixed(2)} ha) przekraczają 40% zrębu (${limitGniazd.toFixed(2)} ha)`;
      statusEl.className = 'alert';
    } else {
      statusEl.innerText = 'Bilanse w normie rębni IIIA';
      statusEl.className = 'ok';
    }
  } else {
    statusEl.innerText = 'Bilanse poprawne';
    statusEl.className = 'ok';
  }

  // Powierzchnia do grodzenia
  let powGrodz = 0;
  if (document.getElementById('grodz-db').checked) powGrodz += pDb;
  if (document.getElementById('grodz-bk').checked) powGrodz += pBk;
  document.getElementById('val-grodz').innerText = powGrodz.toFixed(2);
}

function copyValue(btn, targetId) {
  const text = document.getElementById(targetId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Skopiowano!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('copied');
    }, 1000);
  });
}

// Uruchomienie na start
calcAll();