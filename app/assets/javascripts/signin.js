nextPage = () => {
	if (!$('button').attr('disabled')) {
		$(".signup.part1").hide();
		$(".signup.part2").show();
	}
}

prevPage = () => {
	$(".signup.part2").hide();
	$(".signup.part1").show();
}

enableSubmit = (el) => {
	if ($(el).is(":checked")) {
		$('input[type="submit"]').removeAttr('disabled');
	} else {
		$('input[type="submit"]').attr('disabled', 'disabled');
	}
}

validateEmail = (email, showError, isArtist) => {
	const atIndex = email.val().indexOf("@");
	if (!email.val() ||
			atIndex == -1 ||
			email.val().slice(atIndex + 1, email.val().length) != (isArtist ? "artists.sfai.edu" : "alumni.sfai.edu")) {
		
		if (showError) { email.next(".texthelp").addClass("error"); }
		return false;
	} else {
		email.next(".texthelp").removeClass("error");
		return true;
	}
}

validatePassword = (password, showError) => {
	if (!password.val() || password.val().length < 6) {
		if (showError) { password.next(".texthelp").addClass("error"); }
		return false;
	} else {
		password.next(".texthelp").removeClass("error");
		return true;
	}
}

validateConfirmation = (password, confirmation, showError) => {
	console.log('hnng');
	if (password.val() != confirmation.val()) {
		if (showError &&
			confirmation.next(".texthelp").length == 0) { 
			confirmation.after('<p class="texthelp error">Passwords must match</p>')
		}
		return false;
	} else {
		confirmation.next(".texthelp").remove();
		return true;
	}

}

validateForm = (showEmailError, showPasswordError, showConfirmationError) => {
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

	valid = validateEmail(email, showEmailError, isArtist) &&
			validatePassword(password, showPasswordError) &&
			validateConfirmation(
				password, passwordConfirmation, showConfirmationError);

	/* Enable button if no errors */	
	if (valid) {
		$('button').removeAttr('disabled');
	} else {
		$('button').attr('disabled', 'disabled');
	}
}
