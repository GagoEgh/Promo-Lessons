// 1. foreach 
let arr = [55, 6, 58, 89];

Array.prototype.myForEach = function (back) {
	for (i = 0; i < this.length; i++) {
		back(this[i], i, this);
	}
}

arr.myForEach(
	(item) => {
		console.log(item)
	});


// 2. splice



function mySplice(arr1, start, end, ...args) {
	let size = 0;


	function createStart() {
		let starts = [];

			for (let i = 0; i < start; i++) {
				size += 1;
				starts.push(arr1[i]);
			}
		
		return starts;
	}

	startArry = createStart();

	function createEnd() {
		let ends = [];

		end += size;
		for (let i = end; i < arr1.length; i++) {
			ends.push(arr1[i]);
		}

		if (args.length) {
			for (let a = 0; a < args.length; a++) {
				ends.push(args[a])
			}
		}
		return ends
	}

	let endArray = createEnd();


	function nowArr() {
		for (let i = 0; i < endArray.length; i++) {
			startArry.push(endArray[i])
		}

		return startArry;
	}
	arr1 = nowArr();
	return arr1;
}


let arr1 = [34, 5, 65, 4, 44, 23];
console.log('my ', mySplice(arr1, 2, 1));
