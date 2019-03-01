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

	const email = $('input[name="artist[email]"]');
	const password = $('input[name="artist[password]"]');
	const passwordConfirmation = $('input[name="artist[password_confirmation]"]');

	const atIndex = email.val().indexOf("@");
	if (!email.val() ||
			atIndex == -1 ||
			email.val().slice(atIndex + 1, email.val().length) != "artists.sfai.edu") {
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
