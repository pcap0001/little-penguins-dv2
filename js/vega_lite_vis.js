var vg_1 = "js/records_by_time.vg.json?v=5";
var vg_3 = "js/records_by_penguin.vg.json";
var vg_4 = "js/penguin_tracking_map.vg.json";
var vg_5 = "js/penguin_tracks_map.vg.json";
var vg_6 = "js/fledglings_over_time.vg.json";
var vg_7 = "js/breeding_stages_by_year.vg.json";
var vg_8 = "js/breeding_success_heatmap.vg.json";
var vg_9 = "js/sst_vs_fledglings.vg.json";
var vg_10 = "js/breeding_season_timing.vg.json";

vegaEmbed("#records_by_time", vg_1).then(function(result) {
}).catch(console.error);

//vegaEmbed("#records_by_year", vg_2).then(function(result) {
//}).catch(console.error);

vegaEmbed("#records_by_penguin", vg_3).then(function(result) {
}).catch(console.error);

vegaEmbed("#penguin_tracking_map", vg_4).then(function(result) {
}).catch(console.error);

vegaEmbed("#penguin_tracks_map", vg_5).then(function(result) {
  var view = result.view;

  var checkboxIds = [
    "show237",
    "show360",
    "show251",
    "show364",
    "show250",
    "show252",
    "show243",
    "show248",
    "show366",
    "show361"
  ];

  var selectAll = document.getElementById("selectAllPenguins");

  function updateVegaSignal(id) {
    var checkbox = document.getElementById(id);
    view.signal(id, checkbox.checked);
  }

  function updateSelectAllState() {
    var allChecked = checkboxIds.every(function(id) {
      return document.getElementById(id).checked;
    });

    var noneChecked = checkboxIds.every(function(id) {
      return !document.getElementById(id).checked;
    });

    selectAll.checked = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
  }

  checkboxIds.forEach(function(id) {
    var checkbox = document.getElementById(id);

    checkbox.addEventListener("change", function() {
      updateVegaSignal(id);
      updateSelectAllState();
      view.runAsync();
    });
  });

  selectAll.addEventListener("change", function() {
    checkboxIds.forEach(function(id) {
      var checkbox = document.getElementById(id);
      checkbox.checked = selectAll.checked;
      updateVegaSignal(id);
    });

    selectAll.indeterminate = false;
    view.runAsync();
  });
}).catch(console.error);

vegaEmbed("#fledglings_over_time", vg_6).then(function(result) {
}).catch(console.error);

vegaEmbed("#breeding_stages_by_year", vg_7).then(function(result) {
}).catch(console.error);

vegaEmbed("#breeding_success_heatmap", vg_8).then(function(result) {
}).catch(console.error);

vegaEmbed("#sst_vs_fledglings", vg_9).then(function(result) {
}).catch(console.error);

vegaEmbed("#breeding_season_timing", vg_10).then(function(result) {
}).catch(console.error);