#Lesson 5 In-Class Exercises

##Class 5 README
Take some time to finish up your forms app or ask any questions if you need to, and push your solution to your fork. Our solution to the walkthrough is [here](https://github.com/olinjs/olinjs/blob/master/lessons/05-client-jquery-ajax/formsAppWalkthrough). 

As always, pick the exercises which are interesting and challenging to you, and feel free to work with the people around you. **If you feel done or comfortable with these exercises, move on to the [homework](https://github.com/olinjs/olinjs/blob/master/lessons/05-client-jquery-ajax/HOMEWORK.md) -- it is fairly lengthy.**

##Folder Structure
Last class we discussed folder structure, so as a refresher, draw out the folder structure for a typical app on the board in small groups, indicating what belongs in each folder. Pay particular attention to which JavaScript files are clientside and which are serverside (we haven't done much clientside work yet).

##jQuery and AJAX
<<<<<<< HEAD
- Practice jQuery exercises. Fork before editing!
	- Selectors and CSS: http://codepen.io/ndhanushkodi/pen/EPmgLQ
	- Testing selections for a property: http://codepen.io/ndhanushkodi/pen/WQVONb
	- Write one on your own to make a button that gets disabled once you click it, and display some message at the bottom of the page, like 'button disabled'.

Remember that jQuery allows you to make AJAX requests, which may return some data (if you do a GET request for instance), and now you can dynamically update the page reflecting this new data if desired using jQuery. A great way to practice is to go back to old apps like isItChristmas or your cat app and keep the same functionality, except WITHOUT page refreshes to see updates in the data!

<<<<<<< HEAD
-Return to your version of isItChristmas.com and add the jQuery library to it. (Libraries are often included from a CDN. For example, Google hosts a CDN for jQuery, which you could include with 
=======
- Return to your version of isItChristmas.com and add the jQuery library to it. (Libraries are often included from a CDN. For example, Google hosts a CDN for jQuery, which you could include with 
>>>>>>> 524b7135c21e5b87d3d31b944b1173ba1dd05cc9
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
```
Or the other option would be to download the jQuery library itself, which would be in a single JavaScript file, and include it in the directory where you wish to access it through 
```html
<script src="jquery-1.12.0.min.js"></script>). 
```

<<<<<<< HEAD
-After adding jQuery, in your isItChristmas app, add a button that users can click to find out whether it is christmas or not without refreshing (print to chrome developer console). Have the page itself update to reflect the answer.
=======
- After adding jQuery, in your isItChristmas app, add a button that users can click to find out whether it is christmas or not without refreshing (print to chrome developer console). Have the page itself update to reflect the answer.

- Return to your cat app homework and add the jQuery library to it. 

- Rather than having several pages for each of the types of requests, have just one display page for the list of cats, with 4 buttons: Display, Add, GetBy <insert favorite color here> (with some textbox to enter the color), and Delete. 

- Each of these buttons will be linked to one AJAX request that returns some data update from your API routes. 

- Do as many or as few of these buttons as you want for practice, or just move on to the homework. 
>>>>>>> 524b7135c21e5b87d3d31b944b1173ba1dd05cc9

	- When the Add button is clicked, a cat is added, display the one cat on the page without a page refresh (GET /cats/new)
	- When the Display button is clicked, show the sorted list of cats by age, without page refresh (GET /cats) 
	- When the Delete button is clicked, a cat is deleted, display the newly updated list of cats (after the deletion) on the page without a page refresh (GET /cats/delete/old). You can also try to change this to a DELETE request!
	- When the GetBy <insert favorite color here> button is clicked, display the list of cats that have that color without a page refresh (GET /cats/bycolor/:color)


=======
- Practice jQuery JSFiddles. Fork before editing!
	- [Selectors and CSS](https://jsfiddle.net/swalters4925/zf52yaa0/3/)
	- [Selectors and click handlers](https://jsfiddle.net/swalters4925/ejgenk5c/2/)
	- [Disable a button after 1 click and display a "button disabled" message in the DOM](https://jsfiddle.net/swalters4925/a8r13c0u/3/)
		+ Challenge: disable the button after 3 clicks instead of after 1

- isItChristmas Refactor
	- Remember that jQuery allows you to make AJAX requests, which may return some data (if you do a GET request for instance), and now you can dynamically update the page reflecting this new data if desired using jQuery. A great way to practice is to go back to old apps like isItChristmas or your cat app and refactor them so they update WITHOUT page refreshes!

	- Return to your version of isItChristmas.com and add the jQuery library. (Libraries are often included from a CDN. For example, Google hosts a CDN for jQuery, and you can reference it with the following script tag:
		```html
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
		```
		Or the other option would be to download the jQuery library itself (it's a single JavaScript file) and include it in a script tag. It's common to put libraries in a `lib` directory.
		```html
		<script src="lib/jquery-1.12.0.min.js"></script>). 
		```

	- Now, add a button to your isItChristmas app that users can click to update the "Yes/No" text without a refresh.

- Cat App Refactor
	- Return to your cat app homework and add the jQuery library to it. 

	- Rather than having several pages for each of the types of requests, have just one display page for the list of cats, with links or buttons to Display All Cats, Add A Cat, Display Cats Which Are <insert favorite color here> (with some textbox to enter the color), and Delete A Cat. Each of these buttons will be linked to one AJAX request that returns some data update from your API routes. 
		- When Add A Cat is clicked, a cat is added, display the one cat on the page without a page refresh (GET /cats/new)
		- When Display All Cats is clicked, show the sorted list of cats by age, without page refresh (GET /cats) 
		- When Delete A Cat is clicked, display the newly updated list of cats (after the deletion) on the page without a page refresh (GET /cats/delete/old). You can also try to change your route from a GET to a DELETE request!
		- When the Display Cats Which Are <insert favorite color here> is clicked, display the list of cats that have that color without a page refresh (GET /cats/bycolor/:color)

##Feedback
>>>>>>> 17da7be2326d78b132d0a7b9fd6266c2ab3aed8f
When you're done, fill out this [feedback form](https://docs.google.com/forms/d/1sItfsMqIa5N5eGBpkfCJIMnVK2XsYbo52xOyHLQEPYI/viewform?usp=send_form) and get started with the homework!
