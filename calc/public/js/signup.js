const api = `http://localhost/api/auth`;
const form = document.querySelector('form');
const inf = document.querySelector('#modal-info-singup');

async function signup(e) {
	e.preventDefault();
	const email = form.querySelector('#input-email').value;
	const password = form.querySelector('#input-password').value;
	if(email !== undefined && password !== undefined) {
		try {
			const data = { email, password };
			const res = await fetch(`${api}/signup`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
			const res1 = await res.json();
			console.log(res1);
			if(res1.success === 1) {
				showModal('usuario creado', true);
			} else if(res1.success === 0) {
				showModal('el email ya tiene una cuenta asignada');
			} else {
				showModal('No es posible conectarse con el servidor1.')
			}
		} catch (error) {
			console.error(error);
			showModal('No es posible conectarse con el servidor.')
		}
	}
}

function showModal(res, flag) {
	inf.textContent = res;
	const myModal = new bootstrap.Modal(document.getElementById('modal-signup'), { focus: true });
	if(flag) {
		document.getElementById('modal-signup').addEventListener('hidden.bs.modal', () => {
			window.location = '/';
		});
	}
	myModal.show();
}

form.addEventListener("submit", signup);
