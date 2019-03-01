nextPage = (e) => {
	if (validateForm()) {
		$(".signup.part1").hide();
		$(".signup.part2").show();
	} else {
	}
}

checkInputs = () => {
	let isCorrect = true;
	$('.part1 input').each(function() {
	  if ($(this).val().length <= 1) {
	  	isCorrect = false;
	  }
	});

	return isCorrect;
}

validateForm = () => {
	let valid = true;
	const isArtist = $("form").hasClass("new_artist");
	let email, password, passwordConfirmation;
	
	if (isArtist) {
		email = $('input[name="artist[email]"]');
		password = $('input[name="artist[password]"]');
		passwordConfirmation = $('input[name="artist[password_confirmation]"]');
	} else {
		email = $('input[name="buyer[email]"]');
		password = $('input[name="buyer[password]"]');
		passwordConfirmation = $('input[name="buyer[password_confirmation]"]');
	}

	const atIndex = email.val().indexOf("@");
	if (!email.val() ||
			atIndex == -1 ||
			email.val().slice(atIndex + 1, email.val().length) != (isArtist ? "artists.sfai.edu" : "alumni.sfai.edu")) {
		email.addClass("invalid");
		valid = false;
	}

	if (!password.val() || password.val().length < 6) {
		password.addClass("invalid");
		valid = false;
	}

	if (!passwordConfirmation.val() ||
		passwordConfirmation.val().length < 6) {
		passwordConfirmation.addClass("invalid");
		valid = false;
	}

	if (password.val() != passwordConfirmation.val()) {
		passwordConfirmation.addClass("invalid");
		valid = false;
	}

  return valid; 
}

resetStyle = (el) => {
	$(el).removeClass("invalid");
}
