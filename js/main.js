function loadPeople(){
				$.getJSON("http://localhost:2999/person", function(data) {
				usersObject = data;
				var users = [];
				$.each(data, function(key, object) {
					users.push({
						"id" : object["id"],
						"text" : object["name"]
					});
				});
				$("#kudosSearchBoxInput").select2({
					data : users,
					width : 'resolve',
					closeOnSelect : true,
					containerCssClass : 'selectSearch',
					//allowClear: true,
				});
			});
			$.getJSON("http://localhost:2999/skill", function(data) {
				$("#kudosSearchBoxSkills").select2({
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
			
			$('#kudosSearchBoxInput').on('select2-selected',
							function(e) {
								$('#kudosSearchBoxInput').select2("container").hide();
								$('#kudosSearchBoxSkills').select2("container").show();
								// Reveal the 'locked' user name
								$("#selectedUser").text($("#kudosSearchBoxInput").select2("data").text);
								$("#selectedUser").show();
								$("#s2id_autogen2").css("width","200px");
							});

			$("#selectedUser").click(function(){
				$("#selectedUser").hide();		
				$('#kudosSearchBoxInput').select2("container").show();	
				$('#kudosSearchBoxSkills').select2("container").hide();									
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
			loadPeople();
});
