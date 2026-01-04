$(function(){

function generateSintaBadge(level){
  if(level==7) return `<span class="sinta-badge sinta-7">Belum Akreditasi</span>`;

  return `
    <span class="sinta-badge sinta-${level}">
      SINTA ${level}
    </span>
  `;
}

function levelSinta(level){
    if(level==7) return `Belum Terakreditasi`;
    if(level==8) return `Total Jurnal`;
    return `Sinta ${level}`;
}
   $.getJSON(API_URL, function(res){

    let colors = {
      1: "sinta-1",
      2: "sinta-2",
      3: "sinta-3",
      4: "sinta-4",
      5: "sinta-5",
      6: "sinta-6",
      7: "sinta-7",
      8: "sinta-8"
    };

    Object.keys(res.statistics).forEach(level => {
      let sinta = levelSinta(level);
      let total = res.statistics[level];

      let card = `
      <div class="col-md-3 col-4 mb-3">
        <div class="sinta-stat-card ${colors[level]}">
          <h3>${total}</h3>
          <span>${sinta}</span>
        </div>
      </div>`;

      $("#sintaStats").append(card);
    });    

    res.journals.forEach(j => {
      let badge = generateSintaBadge(j.sinta);
      let html = `
      <div class="col-md-4 mb-5 journal-item"
           data-title="${j.title} ${j.keyword}"
           data-sinta="${j.sinta}"
           data-category="${j.kategori}">

        <div class="journal-wrapper">
          <img src="${j.cover}" class="journal-cover">

          <div class="journal-info">
            <div class="journal-title">${j.title}</div>
            <a href="${j.link}" target="_blank" class="btn btn-green btn-sm w-100"> View Journal </a>
            <div class="info-akreditasi">Akreditasi : ${badge}</div>
            <div class="info-terbit">Terbit : ${j.terbit}</div>
          </div>
        </div>
      </div>`;
      $("#journalGrid").append(html);
    });

  });  
  
    // SEARCH
  function applyFilters(){
    let search   = $("#searchInput").val().toLowerCase();
    let sinta    = $("#sintaFilter").val();
    let category = $("#categoryFilter").val();

    $(".journal-item").each(function(){
        let titleMatch = $(this).data("title").toLowerCase().includes(search);
        let sintaMatch = sinta === "" || $(this).data("sinta") == sinta;
        let catMatch   = category === "" || $(this).data("category") == category;

        $(this).toggle(titleMatch && sintaMatch && catMatch);
    });
  }

  $("#searchInput, #sintaFilter, #categoryFilter").on("keyup change", applyFilters);

  $("#sortSelect").on("change", function(){
      let order = $(this).val();
      let items = $(".journal-item").get();

      items.sort(function(a,b){
          if(order === "sinta"){
              return $(a).data("sinta") - $(b).data("sinta");
          }

          let A = $(a).data("title").toUpperCase();
          let B = $(b).data("title").toUpperCase();
          return order === "az" ? A.localeCompare(B) : B.localeCompare(A);
      });

      $.each(items, function(i, el){
          $("#journalGrid").append(el);
      });
  });

  function applyFilters(){
    let search   = $("#searchInput").val().toLowerCase();
    let sinta    = $("#sintaFilter").val();
    let category = $("#categoryFilter").val();

    $(".journal-item").each(function(){
        let titleMatch = $(this).data("title").toLowerCase().includes(search);
        let sintaMatch = sinta === "" || $(this).data("sinta") == sinta;
        let catMatch   = category === "" || $(this).data("category") == category;

        $(this).toggle(titleMatch && sintaMatch && catMatch);
    });
  }

  $("#searchInput, #sintaFilter, #categoryFilter").on("keyup change", applyFilters);

  $("#sortSelect").on("change", function(){
      let order = $(this).val();
      let items = $(".journal-item").get();

      items.sort(function(a,b){
          if(order === "sinta"){
              return $(a).data("sinta") - $(b).data("sinta");
          }

          let A = $(a).data("title").toUpperCase();
          let B = $(b).data("title").toUpperCase();
          return order === "az" ? A.localeCompare(B) : B.localeCompare(A);
      });

      $.each(items, function(i, el){
          $("#journalGrid").append(el);
      });
  });  

});
