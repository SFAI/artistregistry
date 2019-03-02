nextPage = () => {
	if (!$('button').attr('disabled')) {
		$(".signup.part1").hide();
		$(".signup.part2").show();
	}
}

enableNextPage = () => {
	if (validateForm()) {
		$('button').removeAttr('disabled');
	} else {
		$('button').attr('disabled', 'disabled');
	}
}

enableSubmit = (el) => {
	if ($(el).is(":checked")) {
		$('input[type="submit"]').removeAttr('disabled');
	} else {
		$('input[type="submit"]').attr('disabled', 'disabled');
	}
}

validateForm = () => {
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
		return false;
	}

	if (!password.val() || password.val().length < 6) {
		return false;
	}

	if (!passwordConfirmation.val() ||
		passwordConfirmation.val().length < 6) {
		return false;
	}

	if (password.val() != passwordConfirmation.val()) {
		return false;
	}

  return true; 
}
