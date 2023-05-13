const veriler = [
  {
    dağıtımID: 123,
    veri: 'Arçelik MAYIS 2023',
    detay: { bilgi1: 'Bilgi 1', bilgi2: 'Bilgi 2' },
  },
  {
    dağıtımID: 456,
    veri: 'Beko NİSAN 2023',
    detay: { bilgi1: 'Bilgi 3', bilgi2: 'Bilgi 4' },
  },
  {
    dağıtımID: 789,
    veri: 'Bosh OCAK 2020',
    detay: { bilgi1: 'Bilgi 5', bilgi2: 'Bilgi 6' },
  },
];

let secilenDetay = null; // Seçilen detayı saklamak için değişken

function getir() {
  const veriInput = document.getElementById('veriInput');
  const veri = veriInput.value;

  const tbody = document.querySelector('#veriTablosu tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < veriler.length; i++) {
    if (veriler[i].veri.includes(veri)) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td><a href="#" onclick="detayiGoster(${veriler[i].dağıtımID})">${veriler[i].dağıtımID}</a></td><td>${veriler[i].veri}</td>`;
      tbody.appendChild(tr);
    }
  }

  veriInput.value = '';
}

function detayiGoster(id) {
  secilenDetay = veriler.find((item) => item.dağıtımID === id);

  const detayBaslik = document.getElementById('detayBaslik');
  const detayIcerik = document.getElementById('detayIcerik');
  const detayPanel = document.getElementById('detayPanel');

  detayBaslik.textContent = secilenDetay.dağıtımID;
  detayIcerik.innerHTML = `
        <p>DagıtımID: ${secilenDetay.dağıtımID}</p>
        <p>Veri: ${secilenDetay.veri}</p>
        <p>Bilgi 1: ${secilenDetay.detay.bilgi1}</p>
        <p>Bilgi 2: ${secilenDetay.detay.bilgi2}</p>
      `;

  document.getElementById('detayKapat').style.display = 'block';
  document.getElementById('excelBtn').style.display = 'block';

  detayPanel.style.display = 'block';
}

function detayiKapat() {
  const detayPanel = document.getElementById('detayPanel');
  detayPanel.style.display = 'none';
  document.getElementById('detayKapat').style.display = 'none';
  document.getElementById('excelBtn').style.display = 'none';
}
function verileriTabloyaDönüştür(veriler) {
  const tablo = [['Dağıtım ID', 'Veri', 'Bilgi 1', 'Bilgi 2']];

  veriler.forEach((veri) => {
    const satır = [
      veri.dağıtımID,
      veri.veri,
      veri.detay.bilgi1,
      veri.detay.bilgi2,
    ];
    tablo.push(satır);
  });

  return tablo;
}

function tabloyuExcelEaktar(tablo, dosyaAdı) {
  let csv = '';
  tablo.forEach((satır) => {
    csv += satır.join(',') + '\n';
  });

  const excelDosya = document.createElement('a');
  excelDosya.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  excelDosya.target = '_blank';
  excelDosya.download = dosyaAdı + '.csv';
  excelDosya.click();
}

// Seçilen detayın Excel'e dönüştürülmesi ve Outlook'a yönlendirilmesi
function veriyiExcelMailAt() {
  if (!secilenDetay) {
    return; // Eğer bir detay seçilmemişse fonksiyondan çık
  }

  const tablo = [
    ['Dağıtım ID', 'Veri', 'Bilgi 1', 'Bilgi 2'],
    [
      secilenDetay.dağıtımID,
      secilenDetay.veri,
      secilenDetay.detay.bilgi1,
      secilenDetay.detay.bilgi2,
    ],
  ];

  tabloyuExcelEaktar(tablo, 'secilen_detay');

  // Outlook'a yönlendirme
  const outlookURL = `mailto:?subject=Veri Ekleri&body=Merhaba, veri ekte yer almaktadır.&attach=${encodeURIComponent(
    'secilen_detay.csv',
  )}`;
  window.location.href = outlookURL;
}

// Verileri tabloya dönüştür
const tablo = verileriTabloyaDönüştür(veriler);

// Tabloyu Excel'e aktar
tabloyuExcelEaktar(tablo, 'veriler');
