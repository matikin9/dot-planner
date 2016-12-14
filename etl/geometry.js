//Return Geometry Object
//
//Sample Inputs:
// var line = "LINESTRING(-13168634.8981 4026429.6236,-13168632.6717 4026903.5277,-13168633.785 4027126.3901,-13168632.6717 4027342.5441,-13168633.785 4027527.8222,-13168633.785 4027768.1511,-13168633.785 4028013.8557,-13168637.1245 4028503.9382,-13168637.1245 4028748.316,-13168637.1245 4028759.0581,-13168629.3322 4028759.0581,-13168593.7099 4028806.0544,-13168593.7099 4028818.1392,-13168629.3322 4028874.5352,-13168629.3322 4028886.62,-13168638.2378 4028886.62,-13168638.2378 4029159.2047,-13168637.1245 4029540.5656,-13168640.4642 4029901.796,-13168640.4642 4030424.1904,-13168639.3509 4030872.7434,-13168639.3509 4030876.7723,-13168634.8981 4030883.4874,-13168633.785 4030947.9516,-13168633.785 4031067.4799,-13168631.5586 4031239.3882)";
// var polygon = "POLYGON((-118.25934610284 34.0357737949248,-118.260369271425 34.0363448653233,-118.260868958136 34.0369635251466,-118.264295382326 34.0388908892032,-118.267989999639 34.0407199996283,-118.271766888731 34.0423649019187,-118.272742467891 34.0427218212551,-118.272314164867 34.0436736052527,-118.270791309571 34.0452440490736,-118.268935331001 34.0463148070828,-118.261939715246 34.0506454258458,-118.259036772929 34.0525727890031,-118.257228381984 34.0547618926473,-118.254587181054 34.0574268896393,-118.251303524238 34.0603060376935,-118.248852680107 34.0624713470751,-118.246544601552 34.0599015289325,-118.245402460755 34.0589021564094,-118.243260945636 34.0574030953766,-118.24154773444 34.0563323382668,-118.240476977331 34.0558088563936,-118.239358629897 34.0550712225589,-118.24085769093 34.0534531902126,-118.243379918748 34.0502885074088,-118.244712418144 34.0485515001517,-118.245331077068 34.0479328403284,-118.24692531605 34.0466717264191,-118.248947858057 34.0446015949877,-118.250423123928 34.0432215079663,-118.25406369918 34.0407230744104,-118.256633517323 34.0391050402654,-118.258346729418 34.0369873203086,-118.25934610284 34.0357737949248))";
//
//Sample Output
// {
// 	type: "LINESTRING",
// 	coordinates: [
// 		[x1, y1],
// 		[x2, x2],
// 		[xN, yN]
// 	]
// }

function parseGeometry(dbOutput){
	var objGeometry = {};

	objGeometry.type = dbOutput.substring(0, dbOutput.indexOf('('));
	//Convert to Leaflet Types
	switch(objGeometry.type){
		case("LINESTRING"):
			objGeometry.type = "LineString";
			break;
		case("MULTILINESTRING"):
			objGeometry.type = "MultiLineString";
			break;
		case("POLYGON"): 
			objGeometry.type = "Polygon";
			break;
		case("MULTIPOLYGON"):
			objGeometry.type = "MultiPolygon";
			break;
		case("POINT"):
			objGeometry.type = "Point";
			break;
	}
	//Account for extra Parentheses in Polygon
	var parenPos;
	dbOutput.charAt(dbOutput.indexOf('(')+1) == '(' ? parenPos = 2: parenPos =1; 

	//First Pass
	var makePairs = dbOutput
					.substring(dbOutput.indexOf('(')+parenPos, dbOutput.indexOf(')'))
					.split(',');
					
	//Second pass
	var finalArray = [];

	for (var i = 0; i < makePairs.length; i++){
		var myArr = [];
		makePairs[i].split(" ").forEach(function(el){
			myArr.push(parseFloat(el));
		})
		finalArray.push(myArr);
	}

	objGeometry.coordinates = finalArray;
	return objGeometry;
}

module.exports = parseGeometry;