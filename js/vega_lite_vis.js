var vg_1 = "js/records_by_time.vg.json";
var vg_3 = "js/records_by_penguin.vg.json";
var vg_6 = "js/fledglings_over_time.vg.json";
var vg_7 = "js/breeding_stages_by_year.vg.json";
var vg_8 = "js/breeding_success_rate.vg.json";
var vg_10 = "js/breeding_season_timing.vg.json";
var vg_11 = "js/weather_vs_fledglings.vg.json";
var vg_12 = "js/heat_stress_heatmap.vg.json";

vegaEmbed("#records_by_time", vg_1).then(function(result) {
}).catch(console.error);

//vegaEmbed("#records_by_year", vg_2).then(function(result) {
//}).catch(console.error);

vegaEmbed("#records_by_penguin", vg_3).then(function(result) {
}).catch(console.error);

// ── Leaflet overview map ────────────────────────────────────────────────────
(function () {
  var overviewMap = L.map("penguin-overview-map").setView([-36.5, 147.5], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(overviewMap);

  fetch("https://pcap0001.github.io/little-penguins-dv2/data/little_penguins_tracking_clean.csv")
    .then(function(r) { return r.text(); })
    .then(function(csvText) {
      var lines = csvText.trim().split("\n");
      var headers = lines[0].split(",");
      var idIdx  = headers.indexOf("organismID");
      var latIdx = headers.indexOf("decimalLatitude");
      var lngIdx = headers.indexOf("decimalLongitude");
      var dtIdx  = headers.indexOf("date");

      for (var i = 1; i < lines.length; i++) {
        var cols = lines[i].split(",");
        var lat  = parseFloat(cols[latIdx]);
        var lng  = parseFloat(cols[lngIdx]);
        var id   = cols[idIdx];
        var dt   = cols[dtIdx];
        if (isNaN(lat) || isNaN(lng)) continue;

        L.circleMarker([lat, lng], {
          radius: 3,
          color: "#c0392b",
          fillColor: "#e74c3c",
          fillOpacity: 0.25,
          weight: 0
        }).bindTooltip("Penguin " + id + "<br>" + dt, { sticky: true })
          .addTo(overviewMap);
      }
    })
    .catch(console.error);
})();
// ── end Leaflet overview map ────────────────────────────────────────────────

vegaEmbed("#fledglings_over_time", vg_6).then(function(result) {
  var view = result.view;

  var colonyCheckboxIds = [
    "showAntechamberBay",
    "showBrownlow",
    "showEmuBay",
    "showGraniteIsland",
    "showKingscote",
    "showNepeanPines",
    "showPenneshaw",
    "showTroubridge",
    "showVivonneBay",
    "showWestIsland"
  ];

  var selectAll = document.getElementById("selectAllColonies");

  function updateColonySignal(id) {
    view.signal(id, document.getElementById(id).checked);
  }

  function updateSelectAllState() {
    var allChecked  = colonyCheckboxIds.every(function(id) { return document.getElementById(id).checked; });
    var noneChecked = colonyCheckboxIds.every(function(id) { return !document.getElementById(id).checked; });
    selectAll.checked       = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  colonyCheckboxIds.forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      updateColonySignal(id);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    colonyCheckboxIds.forEach(function(id) {
      document.getElementById(id).checked = selectAll.checked;
      updateColonySignal(id);
    });
    selectAll.indeterminate = false;
    view.runAsync();
  });

}).catch(console.error);

vegaEmbed("#breeding_stages_by_year", vg_7).then(function(result) {
  var view = result.view;

  var stageCheckboxIds = [
    "showEggs",
    "showNestlings",
    "showFledglings"
  ];

  var selectAll = document.getElementById("selectAllStages");

  function updateStageSignal(id) {
    view.signal(id, document.getElementById(id).checked);
  }

  function updateSelectAllState() {
    var allChecked = stageCheckboxIds.every(function(id) {
      return document.getElementById(id).checked;
    });

    var noneChecked = stageCheckboxIds.every(function(id) {
      return !document.getElementById(id).checked;
    });

    selectAll.checked = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  stageCheckboxIds.forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      updateStageSignal(id);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    stageCheckboxIds.forEach(function(id) {
      document.getElementById(id).checked = selectAll.checked;
      updateStageSignal(id);
    });

    selectAll.indeterminate = false;
    view.runAsync();
  });

}).catch(console.error);

vegaEmbed("#breeding_success_heatmap", vg_8).then(function(result) {
  var view = result.view;

  var heatColonyCheckboxIds = [
    "heatAntechamberBay",
    "heatBrownlow",
    "heatEmuBay",
    "heatGraniteIsland",
    "heatKingscote",
    "heatNepeanPines",
    "heatPenneshaw",
    "heatTroubridge",
    "heatVivonneBay",
    "heatWestIsland"
  ];

  var selectAll = document.getElementById("selectAllHeatColonies");

  function updateHeatColonySignal(id) {
    view.signal(id, document.getElementById(id).checked);
  }

  function updateSelectAllState() {
    var allChecked = heatColonyCheckboxIds.every(function(id) {
      return document.getElementById(id).checked;
    });

    var noneChecked = heatColonyCheckboxIds.every(function(id) {
      return !document.getElementById(id).checked;
    });

    selectAll.checked = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  heatColonyCheckboxIds.forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      updateHeatColonySignal(id);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    heatColonyCheckboxIds.forEach(function(id) {
      document.getElementById(id).checked = selectAll.checked;
      updateHeatColonySignal(id);
    });

    selectAll.indeterminate = false;
    view.runAsync();
  });

}).catch(console.error);



vegaEmbed("#breeding_season_timing", vg_10, { width: "container" }).then(function(result) {
  var view = result.view;

  var timingIds = [
    "timingAntechamberBay", "timingBrownlow", "timingEmuBay",
    "timingGraniteIsland", "timingKingscote", "timingNepeanPines",
    "timingPenneshaw", "timingTroubridge", "timingVivonneBay", "timingWestIsland"
  ];

  var selectAll = document.getElementById("selectAllTimingColonies");

  function updateSelectAllState() {
    var allChecked  = timingIds.every(function(id) { return document.getElementById(id).checked; });
    var noneChecked = timingIds.every(function(id) { return !document.getElementById(id).checked; });
    selectAll.checked       = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  timingIds.forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      view.signal(id, document.getElementById(id).checked);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    timingIds.forEach(function(id) {
      document.getElementById(id).checked = selectAll.checked;
      view.signal(id, selectAll.checked);
    });
    selectAll.indeterminate = false;
    view.runAsync();
  });

}).catch(console.error);

vegaEmbed("#weather_vs_fledglings", vg_11).then(function(result) {
}).catch(console.error);

vegaEmbed("#heat_stress_heatmap", vg_12).then(function(result) {
  var view = result.view;

  var minSlider = document.getElementById("yearMinSlider");
  var maxSlider = document.getElementById("yearMaxSlider");
  var minLabel  = document.getElementById("yearMinLabel");
  var maxLabel  = document.getElementById("yearMaxLabel");

  function updateSliders() {
    var lo = parseInt(minSlider.value);
    var hi = parseInt(maxSlider.value);
    if (lo > hi) { lo = hi; minSlider.value = lo; }
    minLabel.textContent = lo;
    maxLabel.textContent = hi;
    view.signal("yearMin", lo);
    view.signal("yearMax", hi);
    view.runAsync();
  }

  minSlider.addEventListener("input", updateSliders);
  maxSlider.addEventListener("input", updateSliders);
}).catch(console.error);

// ── Leaflet penguin tracks map ──────────────────────────────────────────────
(function () {
  var PENGUIN_COLORS = {
    "237": "#4c78a8", "243": "#b279a2", "248": "#ff9da6", "250": "#72b7b2",
    "251": "#e45756", "252": "#eeca3b", "360": "#f58518", "361": "#bab0ac",
    "364": "#54a24b", "366": "#9d755d"
  };

  var checkboxIds = ["show237","show360","show251","show364","show250",
                     "show252","show243","show248","show366","show361"];

  function penguinId(cbId) { return cbId.replace("show", ""); }

  var map = L.map("penguin-leaflet-map").setView([-37.92, 144.87], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  var penguinLayers = {};

  fetch("https://pcap0001.github.io/little-penguins-dv2/data/little_penguins_tracking_clean.csv")
    .then(function(r) { return r.text(); })
    .then(function(csvText) {
      var lines = csvText.trim().split("\n");
      var headers = lines[0].split(",");
      var idIdx  = headers.indexOf("organismID");
      var latIdx = headers.indexOf("decimalLatitude");
      var lngIdx = headers.indexOf("decimalLongitude");
      var dtIdx  = headers.indexOf("eventDate");

      var byPenguin = {};
      Object.keys(PENGUIN_COLORS).forEach(function(id) { byPenguin[id] = []; });

      for (var i = 1; i < lines.length; i++) {
        var cols = lines[i].split(",");
        var id   = cols[idIdx];
        if (!byPenguin[id]) continue;
        var lat = parseFloat(cols[latIdx]);
        var lng = parseFloat(cols[lngIdx]);
        var dt  = cols[dtIdx];
        if (isNaN(lat) || isNaN(lng)) continue;
        byPenguin[id].push({ lat: lat, lng: lng, dt: dt });
      }

      Object.keys(byPenguin).forEach(function(id) {
        var pts = byPenguin[id].sort(function(a, b) {
          return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
        });
        if (pts.length === 0) return;

        var latlngs = pts.map(function(p) { return [p.lat, p.lng]; });
        var color   = PENGUIN_COLORS[id];

        var line = L.polyline(latlngs, { color: color, weight: 1.8, opacity: 0.55 });

        var dotLayer = L.layerGroup(pts.map(function(p) {
          return L.circleMarker([p.lat, p.lng], {
            radius: 2, color: color, fillColor: color, fillOpacity: 0.7, weight: 0
          }).bindTooltip("Penguin " + id + "<br>" + p.dt, { sticky: true });
        }));

        var group = L.layerGroup([line, dotLayer]).addTo(map);
        penguinLayers[id] = group;
      });
    })
    .catch(console.error);

  function setVisibility(id, visible) {
    var layer = penguinLayers[id];
    if (!layer) return;
    if (visible) { map.addLayer(layer); } else { map.removeLayer(layer); }
  }

  function updateSelectAllState() {
    var allChecked  = checkboxIds.every(function(id) { return document.getElementById(id).checked; });
    var noneChecked = checkboxIds.every(function(id) { return !document.getElementById(id).checked; });
    var selectAll   = document.getElementById("selectAllPenguins");
    selectAll.checked       = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  checkboxIds.forEach(function(cbId) {
    document.getElementById(cbId).addEventListener("change", function() {
      setVisibility(penguinId(cbId), this.checked);
      updateSelectAllState();
    });
  });

  document.getElementById("selectAllPenguins").addEventListener("change", function() {
    checkboxIds.forEach(function(cbId) {
      var cb = document.getElementById(cbId);
      cb.checked = document.getElementById("selectAllPenguins").checked;
      setVisibility(penguinId(cbId), cb.checked);
    });
    document.getElementById("selectAllPenguins").indeterminate = false;
  });
})();
// ── end Leaflet penguin tracks map ──────────────────────────────────────────

// ── Leaflet SA colony locations map ─────────────────────────────────────────
(function () {
  var COLONY_COLORS = {
    "Antechamber Bay":   "#4e79a7",
    "Brownlow":          "#f28e2b",
    "Emu Bay":           "#e15759",
    "Granite Island":    "#76b7b2",
    "Kingscote":         "#59a14f",
    "Nepean Pines":      "#edc948",
    "Penneshaw":         "#b07aa1",
    "Troubridge Island": "#ff9da7",
    "Vivonne Bay":       "#9c755f",
    "West Island":       "#bab0ac"
  };

  var COLONIES = [
    { name: "Antechamber Bay",   lat: -35.7877, lng: 138.0587 },
    { name: "Brownlow",          lat: -35.6699, lng: 137.6139 },
    { name: "Emu Bay",           lat: -35.5907, lng: 137.5037 },
    { name: "Granite Island",    lat: -35.5641, lng: 138.6302 },
    { name: "Kingscote",         lat: -35.6550, lng: 137.6393 },
    { name: "Nepean Pines",      lat: -35.6800, lng: 137.6300 },
    { name: "Penneshaw",         lat: -35.7183, lng: 137.9403 },
    { name: "Troubridge Island", lat: -35.1177, lng: 137.8273 },
    { name: "Vivonne Bay",       lat: -35.9814, lng: 137.1805 },
    { name: "West Island",       lat: -35.6083, lng: 138.5917 }
  ];

  var colonyMap = L.map("colony-leaflet-map").setView([-35.75, 137.8], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(colonyMap);

  COLONIES.forEach(function(colony) {
    var color = COLONY_COLORS[colony.name];
    L.circleMarker([colony.lat, colony.lng], {
      radius: 10, color: "#fff", weight: 2, fillColor: color, fillOpacity: 0.9
    })
    .bindPopup("<strong>" + colony.name + "</strong>")
    .bindTooltip(colony.name, { permanent: false, direction: "top" })
    .addTo(colonyMap);
  });
})();
// ── end Leaflet SA colony locations map ──────────────────────────────────────