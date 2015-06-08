function setPlaces(topten) {
    var place = 1;
    for (var i = 0; i < topten.length; i++) {
        if (i == 0) {
            // First team, so set it to 1st
            topten[i]["Place"] = Number(place);
            topten[i]["Ordinal"] = ordinal(place);
            continue;
        } else {
            if (topten[i]["Team_Score"] < topten[i - 1]["Team_Score"]) {
                // Not tied with previous team
                topten[i]["Place"] = Number(++place);
                topten[i]["Ordinal"] = ordinal(place);
            } else {
                // Tied with previous team
                topten[i]["Place"] = Number(place);
                topten[i]["Ordinal"] = ordinal(place);
            }
        }
    }
    return topten;
}

function ordinal(n) {
	var s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

module.exports = setPlaces;