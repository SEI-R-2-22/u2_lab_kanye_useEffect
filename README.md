# Kanye useEffect()

![kanye](https://i.imgur.com/nxSDbbb.jpg)


## Overview
Have you ever wondered what's on Kanye's mind? Well, now we'll get to find out! In this lab we'll be building a small Kanye quote generating application to get practice using React's `useEffect` hook in tandem with `axios` to connect to external APIs. We'll be utilizing the https://kanye.rest/ API to source our quotes.

## Getting Started
- `Fork` and `clone` this repository
- A starter app has been provided for you
- `cd` into the project and run `npm i` to install dependencies

## Instructions
### Setup
Let's start by creating a new component called `KanyeQuote.jsx` in our components folder. We'll be using this component to make API calls and render quotes. We'll keep it as a simple functional component that returns an _italic_ styled `<h2>` for now.

```jsx
const KanyeQuote = (props) => {

  return (
    <h2 style={{fontStyle: 'italic'}}>Quote</h2>
  )
}

export default KanyeQuote
```

Now, let's take a look at `App.js`. We currently have:
- A `<header>` that displays an image
- A `<main>` than wraps all of our site content:
  - A `<div>` that will contain our quotes
  - A `<button>` that we'll use to set state
- A `useState` variable `displayQuote` that is a boolean initially set to `false`
- And a function `toggleQuotes`, which we'll use to toggle the state of `displayQuote` 

### Conditional Rendering
In `App.js` we'll need to add a few things before we move on to making our API calls in `KanyeQuote.jsx`.

- First we'll need our `toggleQuote` function to `setDisplayQuote` to `true` if it is `false` and `false` if it is `true`. We'll be using this boolean to conditionally render our `KanyeQuote` component.
- Next, in the `<button>`'s `onClick` we'll need to fire our `toggleQuote` function.
- We'll also add a little bit of conditional rendering within the button, since we'll be toggling our quote display:
  
    ```js
    <button onClick={toggleQuotes}>{displayQuote === false ? "New Quote" : "Clear Quote"}</button>
    ```

Great! Now when a the button is clicked, it should be setting the state of `displayQuote` and conditionally rendering either "New Quote" or "Clear Quote"! Now let's add in our `<KanyeQuote>` component:

- First, we'll need to import it with:
    
    ```js
    import KanyeQuote from './components/KanyeQuote'
    ```

- Now we'll need to render it in the return of `App.js`
- Since we already have an `<h2>` where we'll want our quote to display, let's add some conditional logic that will display our `<KanyeQuote>` instead if `displayQuote` is set to `true`.

    ```js
    {displayQuote === false ? 
    <h2>Need some inspiration? See what Kanye thinks.</h2>
    :
    <KanyeQuote />}
    ```

`<KanyeQuote>` should now be displaying instead of the initial `<h2>` when `displayQuote` is set to `true`. We can move on to our `KanyeQuote.jsx` now!

___
### useEffect() and Axios Calls
Now we'll get into making API calls with `useEffect()` and `axios`
- We'll need a few imports at the top of `KanyeQuote.jsx` to start off:
    ```js
    import { useState, useEffect } from 'react'
    import axios from 'axios'
    ```

Next we'll need a `useState` variable that we can store our quotes in within our component. 
- Let's make a `useState()` variable that is initially set to an empty string `''` for our quotes:
    ```js
    const [quote, setQuote] = useState('')
    ```

Since we now have a means of storing our API data, we can create a function below our `useState()` variable that makes our API call.
- First, we know we want to make our axios call when our component mounts, so in this case we get to use useEffect in place of a ComponentDidMount!  Let's add in a `useEffect()` hook that will fire off an axios call function when this component is first rendered. Remember that `useEffect()` requires an anonymous callback!
    ```js
    useEffect(() => {
      // here is where we'll invoke our axios call helper function later
    })
    ```
- Now, let's create a helper function above our useEffect to make the call to the API. This function should be asynchronous, setting a response `res` variable to an `axios.get()` call to our API endpoint: "https://api.kanye.rest"
- Make sure to add a `console.log` of the response data with `console.log(res.data)` so we can see what we're getting back from the API response when we run it later. HINT: We may need to drill deeper in the response data to get to our quote! Our `console.log` will help us know where to look.
- Later, when we've gotten a quote back from the API, we'll set the state of our `quote` variable to the quote from the API response with `setQuote()`.
- Here's the structure of the try/catch block we'll want to build this helper function in:
    ```js
    const getKanyeQuote = async () => {
      try {
        // AXIOS CALL HERE
        // setQuote() HERE
      } catch(err) {
        console.log(err)
      }
    }
    ```

Finally, back to our `useEffect()` so we can actually make the API call and see what response we get back! Let's add our `getKanyeQuote` function to our useEffect. 

```js
useEffect(() => {
  getKanyeQuote()
})
```

Once you've set the state of `quote` with our API response, let's add a tiny bit of conditional rendering into the return of our component to replace the plain text. This way, we'll only see a `quote` in this component if we've gotten one from the API.

```js
<h2 style={{fontStyle: 'italic'}}>{quote !== '' && quote}</h2>
```

Once you've finished with this step, try running your app with `npm start` to test out your `New Quote` button. There may be an issue...

#### OH NO! We're stuck in an endless loop!

Don't worry, `I'ma let you finish`, since useEffect does have one nastiest loops of all time.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F3oEduFfxiiHUa7Zfgs%2Fgiphy.gif&f=1&nofb=1)

___
### Adding a Dependency Array
Our `useEffect()` is currently looping through API calls forever since when our `getKanyeQuote` function sets the state of `quote`, the component re-renders and our `useEffect()` fires off again. Not the best behavior for an API call. However, there is a fix - a `Dependency Array`.

- A `dependency array` is added as a second argument within a `useEffect()` in order to tell our `useEffect()` _when to fire_. Without it, it will continue with business as usual.
- Within our dependency array, we'll need to input some variable that we can track.
- Now, our useEffect will only fire when the value of that variable changes.
- But now the question becomes, "Which variable to track?"

Let's make a small modification to our rendering of `<KanyeQuote>` in `App.js` and to give it something stable to track:

```js
<KanyeQuote displayQuote={displayQuote} />
```
- Now we'll have access to the `displayQuote` boolean from `App.js` as a `prop`!
- Let's use destructuring in the arguments of our `KanyeQuote` component to access `displayQuote`.
    ```js
    const KanyeQuote = ({displayQuote}) => {
    ...
    ```
- Since we now have access to `displayQuote`, we can add it to a `dependency array` for our `useEffect` _after_ its callback function:

    ```js
    useEffect(() => {
      getKanyeQuote();
    }, [displayQuote]) // <--- dependency array
    ```

Now that we're tracking `displayQuote` with the dependency array of our `useEffect()`, it should only fire once when the component loads, since `displayQuote` is always true when `<KanyeQuote>` is rendered!

And with that, we've done it! You should now have your very own Kanye Quote generating app!

![success](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.JJUEyXlNObQUEPiyp6b26gHaFg%26pid%3DApi&f=1)

___
## Recap
In this lab we practiced using the `useEffect()` hook with `useState()` and `axios` to make API calls and render the data in state. A few key things to note:
- `useEffect()` will fire when a component mounts
- If state is set within a `useEffect()` hook, the component will render again and create an endless state-setting loop.
- To fix this, we add a `dependency array []` as the second argument of our `useEffect()` and input variables for it to track changes on
- From there, our `useEffect()` will be controlled by the amount of changes present in the variables it is tracking in its `dependency array`

## Resources
- [React useEffect() Docs](https://reactjs.org/docs/hooks-effect.html)
