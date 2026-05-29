var vg_1 = "js/records_by_time.vg.json";
var vg_3 = "js/records_by_penguin.vg.json";
var vg_6 = "js/fledglings_over_time.vg.json";
var vg_7 = "js/breeding_stages_by_year.vg.json";
var vg_8 = "js/breeding_success_rate.vg.json";
var vg_10 = "js/breeding_season_timing.vg.json";
var vg_11 = "js/weather_vs_fledglings.vg.json";
var vg_12 = "js/heat_stress_heatmap.vg.json";

var vg_4 = "js/penguin_tracking_map.vg.json";
var vg_5 = "js/penguin_tracks_map.vg.json";
var vg_9 = "js/colony_map.vg.json";

vegaEmbed("#records_by_time", vg_1).then(function(result) {
}).catch(console.error);

//vegaEmbed("#records_by_year", vg_2).then(function(result) {
//}).catch(console.error);

vegaEmbed("#records_by_penguin", vg_3).then(function(result) {
}).catch(console.error);

vegaEmbed("#penguin_tracking_map", vg_4).then(function(result) {
}).catch(console.error);

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

vegaEmbed("#penguin_tracks_map", vg_5).then(function(result) {
  var view = result.view;

  var checkboxIds = [
    "show237","show360","show251","show364","show250",
    "show252","show243","show248","show366","show361"
  ];

  var selectAll = document.getElementById("selectAllPenguins");

  function updateVegaSignal(id) {
    view.signal(id, document.getElementById(id).checked);
  }

  function updateSelectAllState() {
    var allChecked  = checkboxIds.every(function(id) { return document.getElementById(id).checked; });
    var noneChecked = checkboxIds.every(function(id) { return !document.getElementById(id).checked; });
    selectAll.checked       = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  checkboxIds.forEach(function(id) {
    document.getElementById(id).addEventListener("change", function() {
      updateVegaSignal(id);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    checkboxIds.forEach(function(id) {
      document.getElementById(id).checked = selectAll.checked;
      updateVegaSignal(id);
    });
    selectAll.indeterminate = false;
    view.runAsync();
  });
}).catch(console.error);

vegaEmbed("#colony_map", vg_9).then(function(result) {
}).catch(console.error);