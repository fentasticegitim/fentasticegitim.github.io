// URL üzerinden gelen ders parametresini okur (Örn: soru-cozum.html?ders=fen veya ?ders=tarih)
const urlParams = new URLSearchParams(window.location.search);
const secilenDers = urlParams.get('ders') || 'tarih'; // Ders seçilmediyse varsayılan 'tarih' gelir

// TÜM DERSLERİN SORU HAVUZU
const tumSorular = [
  // --- TARİH SORULARI ---
  {
    ders: "tarih",
    soru: "Anadolu Selçuklu Devleti'nin kurucusu kimdir?",
    secenekler: ["I. Kılıç Arslan", "Kutalmışoğlu Süleyman Şah", "Alparslan", "Tuğrul Bey"],
    dogru: 1
  },
  {
    ders: "tarih",
    soru: "Osmanlı Devleti'nde ilk kâğıt para hangi dönemde basılmıştır?",
    secenekler: ["I. Süleyman", "Abdülmecid", "II. Mahmud", "Fatih Sultan Mehmet"],
    dogru: 1
  },

  // --- FEN BİLGİSİ SORULARI ---
  {
    ders: "fen",
    soru: "Hücrenin enerji santrali olarak bilinen organel hangisidir?",
    secenekler: ["Ribozom", "Lizozom", "Mitokondri", "Golgi Cisimciği"],
    dogru: 2
  },
  {
    ders: "fen",
    soru: "Bitkilerde fotosentez olayının gerçekleştiği organel hangisidir?",
    secenekler: ["Kloroplast", "Sentrozom", "Koful", "Çekirdek"],
    dogru: 0
  },

  // --- TÜRKÇE SORULARI ---
  {
    ders: "turkce",
    soru: "Aşağıdaki cümlelerin hangisinde deyim kullanılmıştır?",
    secenekler: ["Bugün hava çok güzel.", "Göz boyamak için her şeyi yaptı.", "Okula yürüyerek gitti.", "Kitap okumayı severim."],
    dogru: 1
  }
];

// Sadece seçilen derse ait soruları filtrele
const aktifSorular = tumSorular.filter(s => s.ders === secilenDers);

let mevcutSoruIndex = 0;

function soruyuGoster() {
  const soruMetni = document.getElementById("soru-metni");
  const seceneklerKutusu = document.getElementById("secenekler-alani");

  if (!soruMetni || !seceneklerKutusu) return;

  if (aktifSorular.length === 0) {
    soruMetni.innerText = "Bu derse ait henüz soru eklenmedi.";
    seceneklerKutusu.innerHTML = "";
    return;
  }

  const mevcutSoru = aktifSorular[mevcutSoruIndex];
  soruMetni.innerText = `${mevcutSoruIndex + 1}. ${mevcutSoru.soru}`;
  seceneklerKutusu.innerHTML = "";

  mevcutSoru.secenekler.forEach((secenek, index) => {
    const buton = document.createElement("button");
    buton.className = "secenek-btn";
    buton.innerText = secenek;
    buton.onclick = () => cevapKontrol(index);
    seceneklerKutusu.appendChild(buton);
  });
}

function cevapKontrol(secilenIndex) {
  const mevcutSoru = aktifSorular[mevcutSoruIndex];
  if (secilenIndex === mevcutSoru.dogru) {
    alert("Doğru cevap!");
  } else {
    alert("Yanlış cevap!");
  }

  if (mevcutSoruIndex < aktifSorular.length - 1) {
    mevcutSoruIndex++;
    soruyuGoster();
  } else {
    alert("Test tamamlandı!");
  }
}

window.onload = soruyuGoster;
