jQuery.urlParam = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) {
    return results[1] || 0;
  }
}

jQuery(document).ready(function() {
  jQuery("button").click(function() {
    input_value = jQuery("#drug_search").val()
    if (input_value != null) {
      window.location.href = "https://DrugLord-1.timbryant.repl.co?drug=\"" + input_value + "\"";
    } else {
      alert("please input a drug name into the search bar")
    }
  });
});

var drugParam = jQuery.urlParam('drug');
if (drugParam != null) {
  jQuery.getJSON("https://api.fda.gov/drug/label.json?search=openfda.brand_name:" + drugParam + "", function(data) {
    $(data).each(function(i, responseJSON) {
      console.log(responseJSON.results[0])
      drug = responseJSON.results[0];
      openfda = drug.openfda
      for (var key in openfda) {
        $('#attributeList').append(
          '<tr><td class="property-title">' + key.replace(/_/g, ' ') + '</td><td>' + openfda[key] + '</td></tr>'
        );
      }
      for (var key in drug) {
        if (key == 'openfda') {
          $('#attributeList').append(
            '<tr></tr>'
          );
        } else {
          $('#attributeList').append(
            '<tr><td class="property-title">' + key.replace(/_/g, ' ') + '</td><td>' + drug[key] + '</td></tr>'
          );
        }

      }
    });
  })
}