var es_endpoint = "http://" + document.location.hostname + ":9200/";

$.getJSON(es_endpoint + "_snapshot", function(snapshot_config) {
  var getNextSnapshot, html, keys;
  keys = Object.keys(snapshot_config);
  html = "<ul>";
  return (getNextSnapshot = function() {
    var key;
    if (key = keys.shift()) {
      html += "<li>" + key + "<table><th>name</th><th>date</th><th>state</th><th>shards</th><th>operations</th>";
      return $.getJSON(es_endpoint + "_snapshot/" + key + "/_all", function(snapshots) {
        var i, len, ref, value;
        ref = snapshots.snapshots;
        for (i = 0, len = ref.length; i < len; i++) {
          value = ref[i];
          var snapshot_url = es_endpoint + "_snapshot/" + key + "/" + value.snapshot + "/_restore"
          html += "<tr><td>" + value.snapshot + "</td><td>" + value.start_time + "</td><td>" + value.state + "</td><td>" + value.shards.total + "</td><td>" + "[<a href='javascript:Restore(\"" + key + "\",\"" + value.snapshot + "\")'>restore</a>|<a href='javascript:Delete(\"" + key + "\",\"" + value.snapshot + "\")'>delete</a>]" + "</td></tr>";
        }
        html += "</table></li>";
        return getNextSnapshot();
      });
    } else {
      html += "</ul>";
      return $("#snapshots").append(html);
    }
  })();
});

function Restore(key, snapshot){
  if(confirm("Are you sure you want to restore?")) {
    $.post(es_endpoint + "_snapshot/" + key + "/" + snapshot + "/_restore");
  }
}

function Delete(key, snapshot){
   var delete_url = es_endpoint + "_snapshot/" + key + "/" + snapshot;
   if(confirm("Are you sure you want to delete?")) {
     $.ajax({
         type: 'DELETE',
         url: delete_url,
         success: function() {
             location.reload();
         }
     });
   }
}