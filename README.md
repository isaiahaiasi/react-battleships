# React Battleship

The classic game "Battleship."

## [Play it here!](https://isaiahaiasi.github.io/react-battleships/)

Tech:

- React
- Jest
- Styled-Components
- gh-pages

This project was bootstrapped with Create React App.

## Build it yourself

Clone the repo and install dependencies:

```sh
git clone https://github.com/isaiahaiasi/react-battleships.git
...
npm install
```

Run locally:

```sh
npm start
```

Run the test suites:

```sh
npm test
```

## Learning Objectives

- Test Driven Design concepts
- Jest testing library
- Integrating unit-testable logic into a state-managed UI library

You may notice, there is nothing about "styling" or "css" listed as learning objectives. And if you view the live version, you will see that those were _definitely_ not objectives!

## Integrating "logic" modules with React

Although the focus of this project was on TDD, I think _this_ was the real challenge for me. Ultimately, my approach was to try to avoid statefulness altogether. Instead of having a function mutate a ship's state, it would return a new ship object. This approach seemed to gel really nicely with React state, and allowed me to plug my ships and gameboards into React very easily.

However, I definitely came away from this approach with some concerns:

- **Creating immutable objects**: It's surprisingly difficult to make an object deeply immutable in JavaScript, and I don't think I found a perfect solution to this problem. It became especially challenging once I had nested objects (eg, ships within gameboards).
- **Taking immutability on faith**: As far as I can tell, anything that wants to consume these supposedly immutable objects has to take that immutability on faith. It has no assurance that the object will never have side-effects or contain some mutable state. I'd like to have an easy way on the React side to verify that an object is immutable before shoving it in some State.
- **Performance & space consumption**: Copying data all over the place seems like treacherous territory for optimization. This isn't as large a concern as the first two, but it's something that leads me to worry that this approach would limit a project's scalability.

I also found it surprisingly difficult to plan each "logic" module's interface. I repeatedly would try to add the next UI feature, only to realize some critical piece of information was private. This led to an interface-creep where more information was probably exposed than necessary. This isn't a React-specific problem of course, just something to be mindful of in future projects.

## Areas that could be improved

- I probably should have created some mocks for my test suites. For example, the ship in my gameboard unit tests
- When I expanded my gameboard & ship interfaces, I did not continue with TDD. Oops! I did go back and add coverage, but ultimately it ended up being about 70% "TDD" and 30% "DDT."
- Obviously, I was not attentive to UI/UX. To put it mildly.
- My algorithm for the AI placing ships is... bad. Critically, it lacks the ability to backtrack if it makes poor choices for the first few ships, which means that it could theoretically create a board that it can't finish setting ships on, even if there are enough spaces overall. In practice, I don't use non-standard board sizes or ship sets, so this failure should never occur in the current iteration. But if I ever wanted to extend this project, this would probably have to be one of the first things I addressed.
