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
        console.log(data)
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

function feelingLucky() {
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
            console.log(data)
            window.open(data.webPages.value[0].url, '_blank')
        })
}


function searchClick() {
    apiSearch();
    document.getElementById("searchResults").style.visibility = "visible";
}

function showTime() {
    //var d = new Date(); // for now
    //var time = '<h2>' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '</h2>';
    //console.log(time);
    //$('#time').html(time);

    //console.log($('#time').html())
    /*$('#time').dialog({
        title: 'Time',
        width: '50%',
        close: closeTime(),
        height: ($(window).height() - 150),
        modal: true
    });*/

        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let session = "AM";

        if (hh == 0) {
            hh = 12;
        }
        if (hh > 12) {
            hh = hh - 12;
            session = "PM";
        }

        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;

        let time = hh + ":" + mm + ":" + ss + " " + session;

       // document.getElementById("time").innerText = time;
        console.log('working2')

    //document.getElementById("time").innerText = time;
   // let t = setInterval(function () { updateTime() }, 1000);


    console.log($('#time').html())
    $('#time').dialog({
        title: 'Time',
        width: '50%',
        close: closeTime(),
        height: ($(window).height() - 600),
        modal: true
    });
    $('#time').html(time);
    //document.getElementById("time").innerText = time;
    console.log('working')
    document.getElementById("time").style.visibility = "visible";

    function closeTime() {
        document.getElementById("time").style.visibility = "hidden";
        document.getElementById("time").innerHTML = "";
        //clearInterval(t);

    }
}

function changeBackground() {
    console.log(document.body.style.backgroundImage)
    if (document.body.style.backgroundImage != 'url("./roman-denisenko-_XLmDKEvxrk-unsplash.jpg")') {
        document.body.style.backgroundImage = "url('./roman-denisenko-_XLmDKEvxrk-unsplash.jpg')";
        document.getElementById("header").style.color = "black";
    } else {
        document.body.style.backgroundImage = "url('./claudio-schwarz-j3jnm-n6iIY-unsplash.jpg')";
        //$("html").css({ 'background-image': 'url(./roman-denisenko-_XLmDKEvxrk-unsplash.jpg)' }).animate({height: '100%', background-position: 'center', background-repeat: 'no-repeat', background-size: 'cover' }, "slow") //.animate({ width: '300px', opacity: '0.8' }, "slow");
        document.getElementById("header").style.color = "white";
    }
}

function closeFunction() {
    document.getElementById("searchResults").style.visibility = "hidden";
    document.getElementById("searchResults").innerHTML = "";
    $("#query").val('');
}

$("#query").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        searchClick();
    }
});