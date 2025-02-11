const Snput = document.getElementById("search")
const type = document.getElementById("SeachSelect")

function getNation(desc) {
	const nationWikiRegex = /(?<=nofollow">)[^<]+(?=<\/a>\))/;
	const nationRegex = /(?<=\()[^)]*/;
	if (desc.includes('(<a ')) return desc.match(nationWikiRegex)[0];
	else return desc.match(nationRegex)[0];
}





Snput.addEventListener("keydown", async (event) => {
    
    if (event.key === "Enter") {
        if (Snput.value.trim() !== "") {
            const markers = await fetch("./assets/markers_earth.json")
		.then(resp => resp.json())
		.then(json => json.sets['townyPlugin.markerset'].areas)
		.catch(() => {
			sendAlert(`Couldn't get needed data, try again later.`);
			return;
		});

	const town = Object.values(markers).find(town => {
		const {desc, label} = town;
		if (type.value === 'nation') {
			const nation = getNation(desc);
			return nation.toLowerCase() === Snput.value.toLowerCase() && desc.includes('capital: true');
		} else return label.toLowerCase() === Snput.value.toLowerCase();
	});
	if (town) {
		const avgX = (Math.min(...town.x) + Math.max(...town.x)) / 2;
		const avgZ = (Math.min(...town.z) + Math.max(...town.z)) / 2;
		location.href = `./?z=${-avgZ}&x=${avgX}&zoom=-6`;
		return;
	}
        } 
    }
});






