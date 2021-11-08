const btnEqual = document.querySelector('#btn-equal');
const api1 = `http://localhost/api/operation`;
const textA = document.querySelector('#text');
const ansText = document.querySelector("#ans");
let ans = 0;

async function sendOperation(e) {
	const value = textA.value;
	if(value) {
		try {
			const data = { ans: ans, operation: value };
			const res = await fetch(api1, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'authorization': window.localStorage.getItem('authorization') ?? '' } });
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

document.querySelector('#logout').addEventListener('click', () => {
	window.localStorage.removeItem('authorization');
	window.location = '/';
});
