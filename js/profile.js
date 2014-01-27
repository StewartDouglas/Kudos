var visualization_data = [];
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

 function drawChart() {
 	var data;
 	$.getJSON("http://localhost:2999/person/2", function(data) {
		var person = data["person"] ;
		var skills = data["skills"] ;
		var kudos  = data["kudos"] ;
		var departments = data["department_kudos"];

		$("#personalDetails").html("Hello " + person["name"] ) ;

		$.each( skills , function ( key , object ) {
			if(object["kudos"] >= 5){
				$("#skillsTable").append ( "<tr><td> " + object["skill"] + "</td>" +
											"<td>" + object["kudos"] + "</td><td><span class=\"glyphicon glyphicon-heart\"></span></td></tr>") ;
			}
			else{
				$("#skillsTable").append ( "<tr><td> " + object["skill"] + "</td>" +
									"<td>" + object["kudos"] + "</td><td><span class=\"glyphicon glyphicon-heart-empty\"></span></td></tr>") ;
			}
		});

		visualization_data.push(["Department","Kudos"]);

		$.each( departments , function ( key , value ) {
			visualization_data.push([key,value]);
		});


		data = new google.visualization.arrayToDataTable(visualization_data);
		var options = {
			title: 'Kudos Breakdown by Department',
			'width': 700,
			'height':450
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	});

  };






