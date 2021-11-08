const btnEqual = document.querySelector('#btn-equal');
const api = `http://localhost/api/operation`;
const textA = document.querySelector('#text');
const ansText = document.querySelector("#ans");
let ans = 0;

async function sendOperation(e) {
	const value = textA.value;
	if(value) {
		try {
			const data = { ans: ans, operation: value };
			const res = await fetch(api, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
			const val = await res.json();
			if(val.ok) {
				ans = val.ans;
				ansText.value = ans;
			} else {
				console.log(val.ans);
				ansText.value = 'error en sintaxis';
			}
		} catch(error) {
			console.error(error);
		}
	}
}

btnEqual.addEventListener('click', sendOperation);
