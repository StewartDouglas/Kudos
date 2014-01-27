$("#kudosForm").submit(
		function(event) {
			if ($("#kudosSearchBoxSkills").select2("val").length < 1) {
				$('#warningModal').modal('show');
				return false;
			}
			// Don't let the submit form behave as it normally does
			event.preventDefault();
			//var form = $(this);
			var skills = $("#kudosSearchBoxSkills").select2("val").join(" ");			
			var data = {
				"skills" : skills,
				"sender" : 2
			};
			var url = "http://localhost:2999/person/"
					+ $("#kudosSearchBoxInput").select2("val");
			var postAction = $.post(url, data);
			postAction.done(function(data) {
				$("#kudosSearchBoxInput").select2('val', 'All');
				$("#kudosSearchBoxSkills").select2('val', 'All');
				$('#kudosSearchBoxInput').select2("container").show();
				$('#kudosSearchBoxSkills').select2("container").hide();
				$("#selectedUser").hide();
			});
		});

$("#helpForm").submit(
		function(event) {
			if ($("#helpSearchBoxInput").select2("val").length < 1) {
				$('#warningModal').modal('show');
				return false;
			}
			event.preventDefault();
			var skills = $("#helpSearchBoxInput").select2("val").join(" ");
			var data = {
				"skill" : skills
			};
			var url = "http://localhost:2999/skill/" ;
			// Load data from the server
			var postAction = $.post(url, data);
			// Parse the data returned from the server
			postAction.done(function(data) {
				$("#helpFormTable > tbody").html("");
				$("#helpSearchBoxInput").select2('val', 'All');
				$.each ( data , function ( key , object) {
					$("#helpFormTable").append (
							"<tr>" +
								"<td>" + object["name"] + "</td>" +
								"<td>" + object["kudos"] + "</td>" +
							"</tr>"
						);
					$("#helpFormTable").show();
				});
			});
		});