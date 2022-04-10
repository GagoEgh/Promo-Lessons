
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
		const body = document.body;
		table.appendChild(thead);
		this.clearPost();
		table.appendChild(tbody);
		table.classList.add('table')
		body.appendChild(table);

		
		console.log(table);
	}

	createThead() {
		const tr = document.createElement('tr');
		if (this.usersPost.length) {
			const keys = Object.keys(this.usersPost[0]);
			keys.push('Action');
			for (let i = 0; i < keys.length; i++) {
				const th = document.createElement('th');
				th.textContent = keys[i];
				th.classList.add('th')
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
				const id = this.usersPost[i]['id'];
				const values = Object.values(this.usersPost[i]);
				const action = {
					delete: 'imgs/box.png',
					edit: 'imgs/edit.png',
					eye: 'imgs/eye.png'
				}
				values.push(action);
				this.createTd(values, tr, id);
				tbody.appendChild(tr);
			}
		}

		return tbody;
	}

	createTd(values, tr, id) {
		for (let j = 0; j < values.length; j++) {
			const td = document.createElement('td');
			td.classList.add('td');

			if (typeof values[j] === 'object') {
				tr.append(this.createImg(td, values[j], id));

			} else {
				td.innerHTML = `<td>${values[j]}</td>`;
				tr.append(td);
			}
		}
	}

	createImg(td, value, id) {
		td.innerHTML = `
		<td >
			<img  class="width" id = ${id}  src = ${value.delete}>
			<img class="width"  src = ${value.edit}>
			<img class="width" src = ${value.eye}> 	
		</td>`;
		return td
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
							console.log(this.usersPost);
						})

				})
			}

		}
	}
}

const table = new Table();

table.getPost();


// const btn = document.getElementById('4');
// btn.addEventListener('click',function(event){
// 	id = event.target.id;
// 	console.log(id)
// 	fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
// 		method:'DELETE'
// 	})
// 	.then(res=>res.json)
// 	.then(data=>{

// 		console.log(data)
// 	})
// })