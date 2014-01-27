// Get all the skills listed in the database and populate the kudosSearchBoxSkills div
function loadSkills(){
	$.getJSON("http://localhost:2999/skill", function(data) {
		$("#helpSearchBoxInput").select2({
			tags : data,
			width : 'resolve',
			multiple : true,
			maximumSelectionSize : 5,
			matcher : function(term, text) {
				return text;
			},
			containerCssClass : 'selectSearch',
		});
	});
}

$('#loginModal').on('show.bs.modal', function() {
	$('#loginMask').modal('show');
});


$(document).ready(
		function() {
			if (document.URL.indexOf("#") === -1) {
				$('#loginModal').modal({
					backdrop : false,
					keyboard : false,
				});
			}

			loadSkills();

});
