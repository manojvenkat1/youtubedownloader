/* form suggetion code */
function handleData(data) {
  var suggestionBox = document.getElementById("suggestion_box");
  suggestionBox.innerHTML = "";
  suggestionBox.style.display = "block";
  var suggestionsList = document.createElement("ul");
  suggestionsList.className = "suggestions";
  suggestionsList.id = "suggestions";
  data[1].forEach(function (term) {
    var listItem = document.createElement("li");
    listItem.className = "search_result";
    listItem.textContent = term;
    suggestionsList.appendChild(listItem);
  });
  suggestionBox.appendChild(suggestionsList);
}

function getSuggestions(e) {
  if (!e || !e.target) return;
  var script = document.createElement("script");
  script.src =
  "https://suggestqueries.google.com/complete/search?output=chrome&q=" +
  e.target.value +
  "&callback=handleData";
  document.body.appendChild(script);
  script.onload = function () {
    document.body.removeChild(script);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("url").addEventListener("keyup", function (e) {
    var code = e.keyCode || e.which;
    if ([37, 38, 39, 40].includes(code)) {
      e.preventDefault();
      var suggestions = document.querySelectorAll("#suggestions li");
      var index = Array.from(suggestions).findIndex((li) =>
        li.classList.contains("active")
        );
      if (index === -1) index = 0;
      var newIndex;
      switch (code) {
      case 38:
        newIndex = Math.max(0, index - 1);
        break;
      case 40:
        newIndex = Math.min(suggestions.length - 1, index + 1);
        break;
      }
      suggestions.forEach((li) => li.classList.remove("active"));
      suggestions[newIndex].classList.add("active");
      var newQuery = suggestions[newIndex].textContent;
      document.getElementById("url").value = newQuery;
    } else if (code == 13) {
      document.getElementById("suggestion_box").style.display = "none";
    } else {
      getSuggestions(e);
    }
  });

  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target.closest("#suggestion_box")) {
      document.getElementById("suggestion_box").style.display = "none";
    }
  });

  document.addEventListener("click", function (e) {
    var target = e.target;
    if (target.closest("ul#suggestions li")) {
      var valattr = target.textContent;
      document.getElementById("url").value = valattr;
      document.getElementById("suggestion_box").style.display = "none";
      document.getElementById("submit-btn").click();
    }
  });

  document.addEventListener("mouseenter", function (event) {
    if (
      !event.target ||
      !event.target.classList ||
      !event.target.classList.contains("search_result")
      ) {
      return;
  }
  var listItems = document.querySelectorAll("#suggestions li");
  listItems.forEach(function (item) {
    item.classList.remove("active");
  });
  event.target.classList.add("active");
  var activeItem = document.querySelector("#suggestions li.active");
  var newQuery = activeItem.textContent;
  document.querySelector("#url").value = newQuery;
});
});

/* navbar and language dropdown code */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelector(".dropdown-content").classList.toggle("lang_menu");
    });
  });
  document.querySelectorAll(".hamburger").forEach(function (hamburger) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelector(".nav").classList.toggle("open_menu");
      document.querySelector(".dropdown-content").classList.remove("lang_menu");
    });
  });
  document.addEventListener("click", function (event) {
    const nav = document.querySelector(".nav");
    const dropdownContent = document.querySelector(".dropdown-content");
    if (nav && dropdownContent && !nav.contains(event.target) && !dropdownContent.contains(event.target)) {
      nav.classList.remove("open_menu");
      dropdownContent.classList.remove("lang_menu");
    }
  });
  document.querySelectorAll(".dropdown-content").forEach(function (content) {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});



document.getElementById('SearchResultsDivs').style.display = 'none';
document.getElementById('url').addEventListener('paste', function(e) {
  setTimeout(function() {
    var qry_data = document.getElementById('url').value;
    var blocked = ["YVnTGDRXctA", "Rk2MW6L89mY", "LL0Njfd4oCk", "bloYQwsi0Q0", "XHdWkjtuW8M", "nVp-RXCloRg", "anpXyXmBzW8", "VQIJpTCgtek", "oWLym1xuLNM", "ONkLOc-0gH4", "HnsP76JsfqM", "fvLPaP1T8w0", "VQ5BmJ_oyBw", "_P7S2lKif-A", "oslzW2fEBr8", "RRkMbtbNBBs", "kI4xmwcfEw0", "OCioFrQ-pb8", "fYqeSZoNqqA", "jjrnZ3rHBAM", "PWmJhh_qTSY", "mkGDc9LQr6M", "68_RO1Z0548", "rNoL0n2WFh4", "RcagpuZ8frA", "cZ_wbu0ebvc", "9fNbjMXXYV4", "hbHw7noE0b4", "cBqRQqAqypM", "aKnyTRH6lRw", "vKQGTmaDy30", "kNlqMit92LI", "0Cuwgzbejdc", "XKoW06LRNGs", "AlXp0b9ckgs", "rJWdfDPZ9Ck", "pfxyk1glEq4", "jjrnZ3rHBAM", "dQw4w9WgXcQ", "qh78Rg89upM", "33T-Ub4XtAU", "z0rsohKGd-w", "jKbR7u8J5PU", "K7oav1IOVpk", "fUeoMS7EC7Q", "BNx2BKvte80", "nYpEc2-kfJY", "xo2-GVRNEro", "gD44wpQTLvw", "WsaDrHNt8IQ", "WbPeQXJAmts", "oacrqT9HAtk", "vBiOA84AuKc", "qhg7QXSXxeY", "ltIzQliz3XQ", "qkrrqTEH_zg"];
    qry_data = (blocked.includes(qry_data)) ? '' : qry_data;
    if (qry_data) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "https://api.flvto.online/@api/search/YouTube/" + qry_data, true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var final_result = '';
          data['items'].forEach(function(value) {
            var videoId = value['id'];
            var duration = value['duration'];
            if (!blocked.includes(videoId)) {
              final_result += '<form method="POST" action="https://yt5s.is/convert" class="result_form result_form2"><input type="hidden" name="vid_id" value="' + videoId + '"><input type="hidden" name="duration" value="' + duration + '"><button class="submit-video" id="submit-video2" type="submit" name="submit"></button></form>';
            }
          });
          document.getElementById('SearchResultsDivs').innerHTML = final_result;
          var submitButtons = document.getElementsByClassName('submit-video');
          if (submitButtons.length > 0) {
            submitButtons[0].click();
          }
        }
      };
      xhr.send();
    }
  }, 0);
});