


class Table {

	url = "https://jsonplaceholder.typicode.com/posts";
	usersPost = [];

	constructor() { }

	getPost() {
		fetch(`${this.url}`)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				this.usersPost = data;
				const table = document.createElement('table');
				this.createTable();

			})
	}

	createTable() {

		const table = document.createElement('table');
		const thead = this.createThead();
		const tbody = this.createTbody();
		const parent = document.querySelector('.tableParent');
		table.appendChild(thead);

		table.appendChild(tbody);
		table.classList.add('table');


		parent.innerHTML = '';
		parent.appendChild(table);

		this.clearPost();

	}

	createThead() {
		const tr = document.createElement('tr');
		if (this.usersPost.length) {
			const keys = Object.keys(this.usersPost[0]);
			keys.push('Action');
			for (let i = 0; i < keys.length; i++) {
				const th = document.createElement('th');
				th.textContent = keys[i];
				th.classList.add('th');

				tr.appendChild(th);


			}
		}
		const thead = document.createElement('thead');
		thead.append(tr);
		return thead
	}

	createTbody() {
		const tbody = document.createElement('tbody');

		if (this.usersPost.length) {
			for (let i = 0; i < this.usersPost.length; i++) {
				const tr = document.createElement('tr');
				tr.innerHTML = `
				<tr>
					<td class = "td">${this.usersPost[i].userId}</td>
					<td class = "td">${this.usersPost[i].id}</td>
					<td class = "td">${this.usersPost[i].title}</td>
					<td class = "td">${this.usersPost[i].body}</td>
					<td class = "td">
						<img class="width delete" 
							id = ${this.usersPost[i].id} src='imgs/box.png'>
						<img class="width edit" data-edit = ${this.usersPost[i].id} src='imgs/edit.png'>
						<img class="width eye" data-eye = ${this.usersPost[i].id} src='imgs/eye.png'>
					</td>
				</tr>`
				tbody.appendChild(tr);
			}
		}
		return tbody;
	}


	clearPost() {

		if (this.usersPost.length) {

			for (let i = 0; i < this.usersPost.length; i++) {
				const clear = document.getElementById(this.usersPost[i]['id']);

				clear.addEventListener('click', (event) => {

					let id = event.target.id;
					fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
						.then((res) => res.json())
						.then(() => {
							this.usersPost = this.usersPost.filter((item) => item.id != id)
							this.createTable();
						})

				})

			}

		}
	}
}

const table = new Table();

table.getPost();

const form = document.forms.form;

form.addEventListener('submit', function(event){

	const post = {
		userId: form.elements.userId.value,
		title: form.elements.name.value,
		body: form.elements.body.value
	}

	fetch(`https://jsonplaceholder.typicode.com/posts`, {
		method: post,
		body: JSON.stringify(post),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
	.then((response) => response.json())
	.then((data) => {
		table.usersPost.push(post)
		console.log(data)
	});
});