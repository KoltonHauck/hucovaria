function getProteinSelection() {
	ancestor = document.getElementById("chips");
	descendants = ancestor.getElementsByTagName("div");
	myArr = [];
	for (var i=0; i<descendants.length; i++) {
		myArr.push(descendants[i].id);
	}
	document.getElementById("hidden_sars_prots").value = myArr;
	console.log("ran getProteinSelection()");
}

document.getElementById("myform").addEventListener("submit",
	function(e) {
		e.preventDefault();

		let formData = new FormData();

        //human proteins
		formData.append("human_prots_text", document.querySelector("#human_prots_text").value);
		console.log("added human_prots_text");

		//virus proteins
		getProteinSelection();
		formData.append('hidden_sars_prots', document.querySelector("#hidden_sars_prots").value);
		console.log("added hidden_sars_prots");

        //strains
		{% for strain in strains %}
		    formData.append("{{ strain.name }}", document.getElementById("{{ strain.name }}").value);
		{% endfor %}
		console.log("added strains");

        //ontologies
		{% for ontology in ontologies %}
			formData.append("{{ ontology }}", document.getElementById("{{ ontology }}").value);
		{% endfor %}
		console.log("added ontologies");

        //annotations
	    formData.append("Annotation", document.querySelector('input[name="Annotation"]:checked').value);
        console.log("added annotations");

        //GO
        formData.append("Gene_Ontology", document.getElementById("Gene_Ontology").value);
        console.log("added GO");

        //result_name
        formData.append("result_name", document.querySelector("#result_name").value);
        console.log("added result_name");

        //csrf token
        formData.append("csrfmiddlewaretoken", '{{ csrf_token }}');
        console.log("add csrf token");

        alert("Your query has been submitted");
		fetch("{% url 'main:query' %}", {
			method: 'POST',
			body: formData
		})
		.then(response => response)
		.then(data => {
			alert("Success, your query is complete and available in the results tab");
		})

		.catch(error => {
            alert(`error: ${error}`);
            console.log(error);
		});
});

function selectOrClearAllStrains() {
	const button = document.getElementById("sars_strains_button");

	let strains = ["B.1.1.7", "B.1.351", "B.1.427", "B.1.525", "B.1.526", "B.1.617", "B.1.617.2", "B.1.617.3", "B.1.621", "P.1", "P.2", "Reference"]

	if (button.innerHTML === "Select All") {
		button.innerHTML = "De-select All";
		button.className = "btn btn-secondary";

		for (var i=0; i<strains.length; i++) {
			document.getElementById(strains[i]).checked = true;
		}

	} else {
		button.innerHTML = "Select All";
		button.className = "btn btn-primary";

		for (var i=0; i<strains.length; i++) {
			document.getElementById(strains[i]).checked = false;
		}
	}
}

function selectOrClearAll() {
	const button = document.getElementById("sars_proteins_button");

	const ancestor = document.getElementById("chips");
	const chipsToRemove = ancestor.getElementsByTagName("div");
	toRemove = [];

	for (var i=0; i<chipsToRemove.length; i++) {
		toRemove.push(chipsToRemove[i].id);
	}

	if (button.innerHTML === "Select All") {
		button.innerHTML = "Clear All";
		button.className = "btn btn-secondary";

		const multiSelect = document.getElementById("sars_proteins");
		const toSelect = [];

		for (var i=0; i<multiSelect.options.length; i++) {
			const id = multiSelect.options[i].id.split("_");
			toSelect.push(id[1]);
		}
		for (var i=0; i<toRemove.length; i++) {
			const index = toSelect.indexOf(toRemove[i]);
			toSelect.splice(index, 1);
		}
		for (var i=0; i<toSelect.length; i++) {
			myFunct(toSelect[i]);
		}

	} else {
		button.innerHTML = "Select All";
		button.className = "btn btn-primary";

		for (var i=0; i<toRemove.length; i++) {
			document.getElementById(toRemove[i]).remove();
		}
	}

}

function myFunct(selection) {
	if (typeof(selection) === "object") {
		selection = selection.value;
	}
	if (document.contains(document.getElementById(selection))) {
		document.getElementById(selection).remove();
	} else {
		const newChip = document.createElement("div");
		newChip.className = "chip";
		newChip.innerText=selection;
		newChip.id = selection;

		const newSpan = document.createElement("span");
		newSpan.className="closebtn";
		newSpan.onclick= function() {
			this.parentElement.remove();
		}
		newSpan.innerHTML="&times;";

		newChip.appendChild(newSpan);
		chips = document.getElementById("chips");
		chips.appendChild(newChip);
	}
}
