# Primeape Pokepal

A Primeape-themed pet game for the CIT384 project. Feed and train Primeape to
become the best Pokémon there ever was. Give it a nickname and listen to its
cry.

## View the website

[Open Primeape Pokepal](https://killerpigwolf.github.io/Daniel-Isayan-Project-2-CIT384-Pokemon/)

## Controls

- **Treat** increases happiness and weight.
- **Play** increases happiness and decreases weight.
- **Train** decreases happiness and weight.
- At 90 lbs, Primeape feels sad and sluggish; training it below that threshold
  restores its usual mood.
- **Play Primeape's cry** plays the provided audio file locally without showing a
  YouTube player.
- Enter a nickname and choose **Set name** to rename your partner.

Weight and happiness cannot fall below zero, and happiness is capped at 100.

## jQuery methods

These two methods are used in addition to the starter-code methods:

- [`.val()`](https://api.jquery.com/val/) reads the nickname input, and sets it
  to an empty string after a nickname is accepted.
- [`.removeClass()`](https://api.jquery.com/removeClass/) removes the previous
  status-message color classes before the new message receives its current
  positive or warning style.

Open `index.html` in a browser to play locally. An internet connection is
required to load jQuery.
