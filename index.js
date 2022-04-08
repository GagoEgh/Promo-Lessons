

class Table {
	url = "https://jsonplaceholder.typicode.com/";
	usersPost = [];
	constructor() { }

	getPost() {
		fetch(`${this.url}posts`)
			.then((response) => {
				return response.json()
			}).then((data) => {
				this.usersPost = data;
				const table = document.createElement('table');
				this.createTable()
			})
	}



	createTable() {

		const table = document.createElement('table');
		const thead = this.createThead();
		const tbody = this.createTbody();
		const body = document.body;
		table.appendChild(thead);
		table.appendChild(tbody);
		table.classList.add('table')
		body.appendChild(table);
		console.log(table)
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
				const values = Object.values(this.usersPost[i]);
				const arrSrc = ['imgs/box.png', 'imgs/edit.png', 'imgs/eye.png'];
				values.push(arrSrc);

				for (let j = 0; j < values.length; j++) {
					const td = document.createElement('td');
					td.classList.add('td');
					if (Array.isArray(values[j])) {
						for (let k = 0; k < values[j].length; k++) {
							const img = new Image(17, 17);
							img.src = values[j][k];
							td.appendChild(img);
							tr.append(td);

						}

						
					} else {
						td.textContent = values[j];
						tr.append(td);
					}
				}
				tbody.appendChild(tr)
			}
		}

		return tbody;
	}

	
}



const table = new Table();

table.getPost()