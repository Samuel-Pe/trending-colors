
(function () {
  var toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
  };

  var bustCache = '?' + new Date().getTime(),
      dataJson,
      oReq = new XMLHttpRequest();

  oReq.onload = function (e) {
      var xhr = e.target;
      console.log('Inside the onload event');
      if (xhr.responseType === 'json') {
          dataJson = JSON.parse(xhr.response.message);
      } else {
          dataJson = JSON.parse(xhr.responseText).message;
      }

      console.log(dataJson)
      console.log(dataJson[2])
      for(i = 0, len = dataJson.length; i < len ; i++) {
        document.body.innerHTML += '<div style="background-color: '
            + "#" + dataJson[i].hexvalue
            + ';">'


      }
  };

  oReq.onreadystatechange = function () {
      console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
  };
  oReq.open('GET', bustCache, true);
  oReq.responseType = 'json';
  oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
  oReq.send();

}());
