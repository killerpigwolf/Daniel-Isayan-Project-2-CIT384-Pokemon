$(function() {
  var OVERWEIGHT_THRESHOLD = 90;
  var pet_info = {
    name: "Primeape",
    weight: 70,
    happiness: 70
  };

  updatePetInfoInHtml();
  updateMood();

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.cry-button').click(clickedCryButton);
  $('.nickname-form').submit(clickedNicknameForm);

  function clickedTreatButton() {
    pet_info.happiness += 8;
    pet_info.weight += 1;
    checkAndUpdatePetInfoInHtml("Primeape enjoyed the treat! +8 happiness, +1 lb.");
  }

  function clickedPlayButton() {
    pet_info.happiness += 10;
    pet_info.weight -= 1;
    checkAndUpdatePetInfoInHtml("Playtime was a hit! +10 happiness, −1 lb.");
  }

  function clickedExerciseButton() {
    pet_info.happiness -= 5;
    pet_info.weight -= 2;
    checkAndUpdatePetInfoInHtml("Training complete. −5 happiness, −2 lbs.");
  }

  function clickedCryButton() {
    var audio = $('.cry-audio')[0];
    var playback = audio.play();

    if (playback && typeof playback.catch === "function") {
      playback.then(function() {
        announce("Primeape lets out a mighty cry!");
      }).catch(function() {
        announce("Primeape's cry could not be played. Try again.", true);
      });
    } else {
      announce("Primeape lets out a mighty cry!");
    }
  }

  function clickedNicknameForm(event) {
    event.preventDefault();
    // .val() reads the nickname input's current value; the empty string clears it after a successful update.
    var nickname = $('#nickname').val().trim();

    if (nickname.length === 0) {
      announce("Enter a nickname before setting it.", true);
      return;
    }

    pet_info.name = nickname;
    updatePetInfoInHtml();
    $('#nickname').val('');
    announce("Primeape's new nickname is " + nickname + "!");
  }

  function checkAndUpdatePetInfoInHtml(message) {
    var wasOverweight = pet_info.weight >= OVERWEIGHT_THRESHOLD;
    pet_info.weight = Math.max(0, pet_info.weight);
    pet_info.happiness = Math.max(0, Math.min(100, pet_info.happiness));

    if (!wasOverweight && pet_info.weight >= OVERWEIGHT_THRESHOLD) {
      message += " Primeape feels sad and sluggish after too many treats.";
    } else if (wasOverweight && pet_info.weight < OVERWEIGHT_THRESHOLD) {
      message += " Primeape feels lighter and happier again.";
    }

    updatePetInfoInHtml();
    updateMood();
    announce(message);
  }

  function updatePetInfoInHtml() {
    $('.name').text(pet_info.name);
    $('.weight').text(pet_info.weight);
    $('.happiness').text(pet_info.happiness);
  }

  function updateMood() {
    var isOverweight = pet_info.weight >= OVERWEIGHT_THRESHOLD;
    var mood = "Ready to rumble!";

    if (isOverweight) {
      mood = "Feeling sad and sluggish from too many treats.";
    } else if (pet_info.happiness >= 80) {
      mood = "Overjoyed!";
    } else if (pet_info.happiness < 30) {
      mood = "Needs some care.";
    }

    $('.mood').text(mood);
    $('.dashboard')[0].classList.toggle('is-overweight', isOverweight);
    $('.pet-image')[0].classList.toggle('is-sad', isOverweight);
  }

  function announce(message, isWarning) {
    var status = $('.status');
    // .removeClass() clears either previous status color so the next message gets only its current styling.
    status.removeClass('is-positive is-warning');
    status.text(message);
    status[0].classList.add(isWarning ? 'is-warning' : 'is-positive');
  }
});
