const container = document.getElementById('listings');

// Əsas render funksiyası
function renderListings(data) {
  container.innerHTML = ''; // əvvəlki elanları sil

  if (data.length === 0) {
    container.innerHTML = '<p>Uyğun elan tapılmadı.</p>';
    return;
  }

  data.slice().reverse().forEach(item => {  // <-- slice().reverse() istifadə et
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image[0]}" alt="${item.title}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <p>${item.location}</p>
        <a href="listing.html?id=${item.id}">Ətraflı bax</a>
      </div>
    `;
    container.appendChild(card);
  });
}


// Qiymət stringindən rəqəm çıxarma funksiyası (məsələn: "450,000 AZN" → 450000)
function parsePrice(priceString) {
  return parseInt(priceString.replace(/[^\d]/g, ''), 10);
}

// Səhifə yüklənəndə bütün elanları göstər
renderListings(listings);

// Filtrləmə hadisəsi
document.getElementById("filterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("typeFilter").value;
  const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseInt(document.getElementById("maxPrice").value) || Infinity;
  const minArea = parseInt(document.getElementById("minArea").value) || 0;
  const maxArea = parseInt(document.getElementById("maxArea").value) || Infinity;
  const roomCount = document.getElementById("roomFilter").value;
  const district = document.getElementById("districtFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filteredListings = listings.filter((listing) => {
    const price = parsePrice(listing.price);
    const area = listing.area || 0;
    const matchesType = type ? listing.type === type : true;
    const matchesPrice = price >= minPrice && price <= maxPrice;
    const matchesArea = area >= minArea && area <= maxArea;
    const matchesRooms = roomCount ? (
      roomCount === "4" ? listing.rooms >= 4 : listing.rooms == roomCount
    ) : true;
    const matchesDistrict = district ? listing.district === district : true;
    const matchesStatus = status ? listing.status === status : true;

    return matchesType && matchesPrice && matchesArea && matchesRooms && matchesDistrict && matchesStatus;
  });

  renderListings(filteredListings);
});



