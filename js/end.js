$(document).ready(function() {
	let score = window.localStorage.getItem('score');
	$("h2").replaceWith(`<h2>Score: ${score}<h2>`);
})