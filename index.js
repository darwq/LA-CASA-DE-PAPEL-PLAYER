// PLAYER BUTTONS
var buttonPlay = $(".fa-play");
var buttonBack = $(".fa-step-backward");
var buttonNext = $(".fa-step-forward");

var documentTitle = $("title");

// SONG TITLE
var title = $(".song-title .title");

var songsList = [
  new Audio("Mad World (from Money Heist La casa De Papel Season 5).mp3"),
  new Audio(
    "Berlin Wedding SongTi Amo With English LyricsLacasa De PapelMoney Heist.mp3"
  ),
  new Audio(
    "Cecilia Krull & Pablo Alborán - Grandola Vila Morena (Requiem From La casa de papel).mp3"
  ),
  new Audio(
    "Herman Dune - I Wish That I Could See You Soon (Lyric video) • La Casa De Papel _ Part 5 Soundtrack.mp3"
  ),
  new Audio("Money Heist - Part 5 Vol. 2 _ Official Trailer _ Netflix.mp3"),
];
var songsNamesList = [
  "MAD WORLD",
  "TI AMO",
  "GRANDOLA VILA MORENA",
  "I WISH THAT I COULD SEE YOU SOON",
  "THE FUNERAL",
];
var counter = 0;
var i = 0;
var append = 0;

var songsDiv = $(".all-songs");
var buttonToShowSongsDiv = $(".songs-names .song-button");
var closeButton = $(".close-button");

songsDiv.hide();

var song = songsList[i];

var songs = [];

buttonPlay.click(function () {
  toggleClass(this, "fa-play");
  toggleClass(this, "fa-pause");

  switch (counter) {
    case 0:
      setTimeout(function () {
        counter++;
        song.play();
      }, 200);

      if (title.text() == "YOU ARE NOT PLAYING SONGS YET") {
        title.text(songsNamesList[i]);
      }
      break;

    case 1:
      setTimeout(function () {
        counter--;
        song.pause();
      }, 200);
      break;
  }
});

buttonNext.click(function () {
  if (i < songsList.length - 1 && i < songsNamesList.length - 1) {
    song.pause();

    if (title.text() == "YOU ARE NOT PLAYING SONGS YET") {
      song = songsList[i];

      song.addEventListener("ended", function () {
        song.pause();

        $(this).currentTime = 0;

        setTimeout(function () {
          song.play();
        }, 500);
      });

      song.currentTime = 0;
      song.play();

      title.slideToggle(400);

      if ($(buttonPlay).hasClass("fa-play")) {
        counter++;
        $(buttonPlay).removeClass("fa-play");
        $(buttonPlay).addClass("fa-pause");
      }

      setTimeout(function () {
        title.text(songsNamesList[i]);
        title.slideToggle(400);
      }, 400);

      return;
    }

    i++;

    song = songsList[i];

    song.addEventListener("ended", function () {
      song.pause();

      $(this).currentTime = 0;

      setTimeout(function () {
        song.play();
      }, 500);
    });

    song.currentTime = 0;
    song.play();

    title.slideToggle(400);

    if ($(buttonPlay).hasClass("fa-play")) {
      counter++;
      $(buttonPlay).removeClass("fa-play");
      $(buttonPlay).addClass("fa-pause");
    }

    setTimeout(function () {
      title.text(songsNamesList[i]);
      title.slideToggle(400);
    }, 400);
  }
});

buttonBack.click(function () {
  if (i > 0) {
    song.pause();

    i--;

    song = songsList[i];

    song.addEventListener("ended", function () {
      song.pause();

      $(this).currentTime = 0;

      setTimeout(function () {
        song.play();
      }, 500);

      console.log("Hello");
    });

    song.currentTime = 0;
    song.play();

    title.slideToggle(400);

    if ($(buttonPlay).hasClass("fa-play")) {
      counter++;
      $(buttonPlay).removeClass("fa-play");
      $(buttonPlay).addClass("fa-pause");
    }

    setTimeout(function () {
      title.text(songsNamesList[i]);
      title.slideToggle(400);
    }, 400);
  }
});

function toggleClass(button, Class) {
  $(button).toggleClass(Class);
}

function closeSongsSection() {
  $("body").css("overflow", "auto");

  songsDiv.hide(200);
}

buttonToShowSongsDiv.click(function () {
  $("body").css("overflow", "hidden");

  songsDiv.show(200);

  closeButton.click(function () {
    closeSongsSection();
  });

  if (append === 0) {
    for (var j = 0; j < songsList.length; j++) {
      songsDiv.append(
        "<div class='song'><h3 class='title title-" +
          j +
          "'>" +
          songsNamesList[j] +
          "</h3><button class='play-song'>▶ Play</button></div>"
      );

      songs.push($(".song .title-" + j + "").text());
    }

    var playSong = $(".play-song");

    playSong.click(function (event) {
      title.slideToggle(400);
      if ($(buttonPlay).hasClass("fa-play")) {
        counter++;

        $(buttonPlay).removeClass("fa-play");

        $(buttonPlay).addClass("fa-pause");
      }

      setTimeout(function () {
        var newTitle = $(event.target).closest(".song").find(".title");
        title.text(newTitle.text());
        title.slideToggle();

        song.pause();

        song = songsList[songs.indexOf(newTitle.text())];

        song.addEventListener("ended", function () {
          song.pause();

          $(this).currentTime = 0;

          setTimeout(function () {
            song.play();
          }, 500);
        });

        // setting the counter to song index
        i = songs.indexOf(newTitle.text());

        song.currentTime = 0;
        song.play();
      }, 400);

      append++;

      closeSongsSection();
    });

    append++;
  }
});
