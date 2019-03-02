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

	/* Validate email domain is correct */
	const atIndex = email.val().indexOf("@");
	if (!email.val() ||
			atIndex == -1 ||
			email.val().slice(atIndex + 1, email.val().length) != (isArtist ? "artists.sfai.edu" : "alumni.sfai.edu")) {
		
		if (showEmailError) { email.next(".texthelp").addClass("error"); }
		valid = false;
	} else {
		email.next(".texthelp").removeClass("error");
	}

	/* Validate password is minimum length */
	if (!password.val() || password.val().length < 6) {
		if (showPasswordError) { password.next(".texthelp").addClass("error"); }
		valid = false;
	} else {
		password.next(".texthelp").removeClass("error");
	}

	/* Validate password confirmation is minimum length */
	if (!passwordConfirmation.val() ||
		passwordConfirmation.val().length < 6) {
		valid = false;
	}

	/* Validate password and password confirmation match up */
	if (password.val() != passwordConfirmation.val()) {
		if (showConfirmationError &&
			passwordConfirmation.next(".texthelp").length == 0) { 
			passwordConfirmation.after('<p class="texthelp error">Passwords must match</p>')
		}
		valid = false;
	} else {
		passwordConfirmation.next(".texthelp").remove();
	}

	/* Enable button if no errors */	
	if (valid) {
		$('button').removeAttr('disabled');
	} else {
		$('button').attr('disabled', 'disabled');
	}
}
