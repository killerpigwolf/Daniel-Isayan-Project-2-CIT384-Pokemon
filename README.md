# Primeape Pokepal

A Primeape-themed pet game for the CIT384 project. Feed, play with, and train
Primeape, give it a nickname, and listen to a short synthesized cry.

## View the website

[Open Primeape Pokepal](https://killerpigwolf.github.io/Daniel-Isayan-Project-2-CIT384-Pokemon/)

GitHub Pages publishes the files from the root of the `main` branch. After a
push, allow GitHub a few minutes to finish building the site before sharing the
link.

## Controls

- **Treat** increases happiness and weight.
- **Play** increases happiness and decreases weight.
- **Train** decreases happiness and weight.
- At 90 lbs, Primeape feels sad and sluggish; training it below that threshold
  restores its usual mood.
- **Hear Primeape's cry** plays a synthesized sound generated in the browser; it
  is an original approximation, not the official Pokémon cry.
- Enter a nickname and choose **Set name** to rename your partner.

Weight and happiness cannot fall below zero, and happiness is capped at 100.

## jQuery methods

These two methods are used in addition to the starter-code methods:

- [`.val()`](https://api.jquery.com/val/) reads the nickname input, and sets it
  to an empty string after a nickname is accepted.
- [`.removeClass()`](https://api.jquery.com/removeClass/) removes the previous
  status-message color classes before the new message receives its current
  positive or warning style.

## Running locally

Open `index.html` in a browser. The page loads jQuery from its CDN, so an
internet connection is needed for the controls to work.
