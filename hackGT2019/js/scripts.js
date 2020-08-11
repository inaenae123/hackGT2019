function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#img').attr('src', e.target.result);
        findApple();
      }
      
      reader.readAsDataURL(input.files[0]);
    }
}
  
$("#imgInp").change(function() {
readURL(this);

});

function findApple() {
  var imageData = $('#img').attr('src');
  var imageData2 = imageData.substr(23);
  var body = {
      requests: [
          {
              image: {
                  content: imageData2
              },
              features: [
                  {
                      type: "LOGO_DETECTION"
                  }
              ]
          }
      ]
  };
  
  var xhr = new XMLHttpRequest();
  var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBQWHubUUK2jKGQP0_tN9UwroMi7MqFMvM";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
      console.log(xhr.status);
      var apples = [];
      var response = xhr.response;
      var obj = JSON.parse(response);
      var resp = obj.responses;
      var logos = resp[0].logoAnnotations;
      var apple = "Apple Inc.";
      for (l in logos) {
          var logo = logos[l];
          var str = logo.description;
          if (str.localeCompare(apple) == 0) {
              apples.push(logo.boundingPoly.vertices);
          }
      }
      addPears(apples);
  };
  var data = JSON.stringify(body);
  xhr.send(data);

}

function addPears(apples) {
    for (v in apples) {
        var vert = apples[v];
        var i;
        var left = vert[0].x;
        var right = vert[0].x;
        var top = vert[0].y;
        var bottom = vert[0].y;
        for (i = 0; i < 4; i++) {
            var coord = vert[i];
            var x = coord.x;
            var y = coord.y;
            if (x < left) {
                left = x;
            }
            if (x > right) {
                right = x;
            }
            if (y < top) {
                top = y;
            }
            if (x > bottom) {
                bottom = y;
            }
        }
        //var pear = document.createElement('div');
        $('#pear').attr('src', "./icarly.png");
        var pear = document.getElementById("pear");
        var width = right - left;
        var height = bottom - top;
        //top += 140;
        //left += 50;
        pear.style.width = width + "px";
        pear.style.height = height + "px";
        pear.style.top = "140px";
        // pear.style.bottom = "0";
        pear.style.left = "150px";
        // pear.style.right = "0";

        pear.style.position = "absolute";
        // pear.style.display = "inline-block";
        pear.style.zIndex = "2";
        pear.style.transform = "matrix(2,0,0,2," + left + "," + top + ")";
        // pear.style.transform = "translate(" + left + ", " + bottom + ")";
        // var picture = document.getElementById("img");
       // picture.appendChild(pear);
        //document.getElementById("img").appendChild(pear);
    }
}

