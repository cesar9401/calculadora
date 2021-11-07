const btnEqual = document.querySelector('#btn-equal');
const api = `http://localhost/api/operation`;

function sendOperation(e) {
	fetch(api)
		.then(data => data.json())
		.then(console.log)
		.catch(console.log);
}

btnEqual.addEventListener('click', sendOperation);
