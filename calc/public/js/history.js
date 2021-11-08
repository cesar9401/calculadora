const api = `http://localhost/api/operation`;
const tbody = document.querySelector("tbody");

async function getHistory() {
	const hist = await fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': window.localStorage.getItem('authorization') ?? '' }});
	const res = await hist.json();
	renderHistory(res);
}

getHistory();

function renderHistory(data) {
	for(const property in data) {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.innerHTML = property.replaceAll('\"', "");
		tr.appendChild(td);

		const td1 = document.createElement("td");
		td1.innerHTML = data[property];
		tr.appendChild(td1);

		tbody.appendChild(tr);
	}
}
