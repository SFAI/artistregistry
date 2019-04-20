document.addEventListener("click", (e) => {
	if ($(e.target).hasClass("request-ellipsis")) {
		$(e.target).parent().toggleClass("requests-dropdown-selected");
	} else {
		$(".requests-dropdown-selected").removeClass("requests-dropdown-selected");
	}
});
