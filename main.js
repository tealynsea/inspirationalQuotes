  // create base array
var quotes_list = []
//push in some preliminary quotes
quotes_list.push({
		quote: 'Do or Do Not.  There is No Try.',
		author: 'Yoda'
});
console.log('worked')

quotes_list.push({
		quote: 'Control. Control.  You must have control',
		author: 'Yoda'
});
 



var renderList = function(){
	$('#quotes-ul').empty();

	//Loop through and render each quote
	for (var i = 0; i < quotes_list.length; i++) {
		//create a new DOM list element 
		var newListItem = $('<li>');
		console.log('new list item stored')

		//Append an p with the current quote
		newListItem.append('<p>' + quotes_list[i].quote + '</p>');
		   console.log('appended?')
		newListItem.append('<h5>' + quotes_list[i].author + '</h5>');
           console.log('appended?')

		var actionsContainer = $('<div class ="actions">');
		//puts saved quotes into list items
		actionsContainer.appendTo(newListItem);

		//Add delete action
		actionsContainer.append('<button class="delete">Delete</button>');

		newListItem.prependTo('#quotes-ul');

		quotes_list[i].display = newListItem;


		newListItem.data('listIndex', i);

	};
};

var newQuoteSubmit = function(eventArguments) {
	//keeps browser from submitting form
	eventArguments.preventDefault();

	//cache inputs
	var quoteField = $(this).find('[name=quote]');
	var authorField = $(this).find('[name=author]');

	//gets quote
	var quote = quoteField.val();

	//gets author
	var author = authorField.val();

	var newQuoteAuthor = {
		quote: quote,
		author: author
	};


	quotes_list.push(newQuoteAuthor);

	renderList();

	quoteField.val('');
	authorField.val('');
}

var deleteQuote = function(eventArguments) {

	var quoteDisplay = $(this).closest('li');

	var quoteIndex = quoteDisplay.index();

	quotes_list.splice(quoteIndex, 1);

	quoteDisplay.remove();


	for (var i=0; i<quotes_list.length; i++) {

		if(quotes_list[i].display.get(0) === quoteDisplay.get(0)) {

			quotes_list[i].display.remove();

			quotes_list.splice(i, 1);

			break;
		}
	};

	var quoteIndex = quoteDisplay.data('quoteIndex');

	var quoteItem = quotes_list[quoteIndex];
	//throwing some error in console.log, but still deleting.
	quoteItem.display.remove();

	quotes_list.splice(quoteIndex, 1);
}



$(document).on('ready', function() {
 
 	renderList();


	$('#new-quote').on('submit', newQuoteSubmit);

	$(document).on('click', '.delete', deleteQuote);

});

