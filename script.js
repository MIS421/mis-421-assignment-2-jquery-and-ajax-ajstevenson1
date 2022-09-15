var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };
    $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "031ee0a3b16949de9c483968fea4391f");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }
        $('#searchResults').html(results);


        $('#searchResults').dialog({
            title: 'Results for "' + $("#query").val() + '"',
            width: '90%',
            close: closeFunction,
            height: ($(window).height() - 75),
            modal: true
        });
        results = '';
    })
    .fail(function () {
      alert("error");
    });
}


function searchClick() {
    apiSearch();
    document.getElementById("searchResults").style.visibility = "visible";
}

function closeFunction() {
    document.getElementById("searchResults").style.visibility = "hidden";
    document.getElementById("searchResults").innerHTML = "";
    $("#query").val('');
}