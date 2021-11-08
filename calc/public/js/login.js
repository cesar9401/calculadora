const api = `http://localhost/api/auth`;
const form = document.querySelector('form');
const info = document.querySelector('#modal-info');

async function submit(e) {
	e.preventDefault();
	const email = form.querySelector('#input-email').value;
	const password = form.querySelector('#input-password').value;
	if(email !== undefined && password !== undefined) {
		try {
			const data = { email, password };
			const res = await fetch(`${api}/login`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
			const res1 = await res.json();
			console.log(res1);
			if(res1.token) {
				window.localStorage.setItem('authorization', res1.token);
				window.location='/calc';
			} else if(res1.res) {
				// console.log('credenciales incorrectas');
				showModal(res1.res);
			}
		} catch (error) {
			console.error(error);
			showModal('No es posible conectarse con el servidor.')
		}
	}
}

function showModal(res) {
	info.textContent = res;
	const myModal = new bootstrap.Modal(document.getElementById('modal-login'), { focus: true });
	myModal.show();
}

form.addEventListener("submit", submit);
