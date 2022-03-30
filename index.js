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
	debugger
	let size = 0;

	let qount = start + end;
	for (let i = 0; i < arr1.length; i++) {

		if (i > qount) {
			arr1[i - end] = arr1[i];
		}
	}

	while (size < end) {
		size += 1;
		arr1.pop();
	}

	if (args.length) {
		for (let j = 0; j < args.length; j++) {
			arr1.push(args[j]);
		}

		let changeIndex = arr1.length - args.length;
		let max = changeIndex + args.length;
		let tmp = '';
		for (let g = start; g < arr1.length; g++) {
			if (g > start && g < changeIndex && changeIndex < max) {
				tmp = arr1[g];
				arr1[g] = arr1[changeIndex];
				arr1[changeIndex] = tmp;;
				changeIndex += 1;
			}
		}
	}

	return arr1;

}

let arr1 = [34, 5, 65, 4, 44, 23];
console.log(mySplice(arr1, 2, 1));

