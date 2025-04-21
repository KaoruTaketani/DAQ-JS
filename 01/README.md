[home](../README.md)

According to MDN Web Docs, "JavaScript is a ... programming language with first-class functions. ... it is most well-known as the scripting language for Web Pages". Here, "A programming language is said to have first-class functions when functions in that language are treated like any other variable."

By runnging the sample code and clicking the button, different numbers are shown in the browser.

```js
buttonElement.addEventListener('click', () => {
  messageElement.innerText = `random number is ${Math.random()}`
})
```

## How to run the sample code in this folder
1. open ./index.html by your brouwser