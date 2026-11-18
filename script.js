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
    var AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextConstructor) {
      announce("This browser does not support the synthesized cry.", true);
      return;
    }

    var audioContext = new AudioContextConstructor();
    var masterGain = audioContext.createGain();
    var filter = audioContext.createBiquadFilter();
    var now = audioContext.currentTime;

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    var growl = audioContext.createOscillator();
    var overtone = audioContext.createOscillator();
    var overtoneGain = audioContext.createGain();

    growl.type = "sawtooth";
    growl.frequency.setValueAtTime(250, now);
    growl.frequency.exponentialRampToValueAtTime(95, now + 0.55);
    overtone.type = "square";
    overtone.frequency.setValueAtTime(510, now);
    overtone.frequency.exponentialRampToValueAtTime(190, now + 0.55);
    overtoneGain.gain.setValueAtTime(0.18, now);

    growl.connect(filter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(filter);
    growl.onended = function() {
      audioContext.close();
    };
    growl.start(now);
    overtone.start(now);
    growl.stop(now + 0.6);
    overtone.stop(now + 0.6);

    announce("Primeape lets out a mighty growl!");
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
