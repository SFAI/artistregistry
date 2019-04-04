nextPage = () => {
	if (!$('button').attr('disabled')) {
		uncheckTermsAndConditions();
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
	const emailDomain = email.val().slice(atIndex + 1, email.val().length);
	// Patrons can sign up with any email domain.
	const isValidDomain = !isArtist || emailDomain == "artists.sfai.edu" || emailDomain == "sfai.edu";
	if (!email.val() || atIndex == -1 || !isValidDomain) {
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
	const email = $('#email-field');
	const password = $('#password-field');
	const passwordConfirmation = $('#confirmation-field');

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

uncheckTermsAndConditions = () => {
	if ($('#terms_checkbox').is(':checked')){
		$('#terms_checkbox').removeAttr('checked')
    }
}
