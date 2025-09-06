# Rendering Steps

This document explains the steps that React takes to update the UI.

## 1. Triggering a Render

Rendering begins when React detects that the UI might need to change. This can happen through:

- State updates (setState or useState).
- Props changes (a parent passes new data).
- Context updates (when a Provider value changes).

## 2. Render Phase (Reconciliation)

React starts by calling the component functions again to figure out what the UI should look like now.

- It builds a new virtual DOM tree (lightweight JS object representation of the UI).
- React compares the new virtual DOM with the previous one (a process called diffing).
- This phase is pure and side-effect free — meaning React just calculates changes without touching the browser DOM yet.

## 3. Commit Phase

After React knows what needs to change, it moves into the commit phase. This is where actual updates happen:

- DOM updates → inserting, updating, or removing real DOM nodes.
- Layout effects (useLayoutEffect) run synchronously right after the DOM updates.
- Passive effects (useEffect) run asynchronously after painting, so they don’t block UI rendering.

## 4. Browser Paint

Finally, the browser takes the updated DOM and paints pixels on the screen.
This includes applying styles, recalculating layout, and compositing elements.

# 🔄 Summary Flow

1. Trigger → state/props/context changes.
2. Render Phase → React builds a new virtual DOM & diffs it.
3. Commit Phase → React updates the real DOM + runs effects.
4. Browser Paint → user sees the changes.

# 👉 Think of it like a chef (React) preparing a dish:

- The order (state change) comes in.
- The recipe is planned (render phase).
- The dish is cooked and plated (commit phase).
- The customer eats (browser paint).
