const setUpA11y = () => {
	$("a.no-redirect").click(function(event) {
		event.preventDefault();
		return false;
	})

	$(".dropdown a, .dropdown-link-item a").focusin(function() {
		$(this).closest(".dropdown").addClass("open");
	})

	$(".dropdown a, .dropdown-link-item a").focusout(function() {
		if (!$('.dropdown a').is(":focus") && !$('.dropdown-link-item a').is(":focus")) {
			$(this).closest(".dropdown").removeClass("open");
		}
	})
}

$(document).ready(setUpA11y);
$(document).on('turbolinks:load', setUpA11y);
