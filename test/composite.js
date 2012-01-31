/* Generated by GoScript <github.com/kless/GoScript> */




function person(name, age) {
	this.name=name;
	this.age=age;
}


function Older(p1, p2) {
	if (p1.age > p2.age) {
		return [p1, p1.age - p2.age];
	}
	return [p2, p2.age - p1.age];
}

function testStruct() {
	var tom = new person("", 0);

	tom.name = "Tom", tom.age = 18;


	var bob = new person(); bob.age = 25, bob.name = "Bob";
	var paul = new person("Paul", 43);

	var _ = Older(tom, bob), tb_Older = _[0], tb_diff = _[1];

	if (JSON.stringify(tb_Older) === JSON.stringify(bob) && tb_diff === 7) {
		console.log("[OK] Tom, Bob\n");
	} else {
		alert("[Error] Of " + tom.name + " and " + bob.name + ", " + tb_Older.name + " is older by " + tb_diff + " years\n");

	}


	var _ = Older(tom, paul), tp_Older = _[0], tp_diff = _[1];

	if (JSON.stringify(tp_Older) === JSON.stringify(paul) && tp_diff === 25) {
		console.log("[OK] Tom, Paul\n");
	} else {
		alert("[Error] Of " + tom.name + " and " + paul.name + ", " + tp_Older.name + " is older by " + tp_diff + " years\n");

	}


	var _ = Older(bob, paul), bp_Older = _[0], bp_diff = _[1];

	if (JSON.stringify(bp_Older) === JSON.stringify(paul) && bp_diff === 18) {
		console.log("[OK] Bob, Paul\n");
	} else {
		alert("[Error] Of " + bob.name + " and " + paul.name + ", " + bp_Older.name + " is older by " + bp_diff + " years\n");

	}
}




function Older10(people) {
	var older = people[0];


	for (var index = 1; index < 10; index++) {
		if (people[index].age > older.age) {
			older = people[index];
		}
	}
	return older;
}

function testArray() {

	var array = []; for (var i=0; i<10; i++){ array[i]=new person("", 0); }



	array[1] = new person("Paul", 23);
	array[2] = new person("Jim", 24);
	array[3] = new person("Sam", 84);
	array[4] = new person("Rob", 54);
	array[8] = new person("Karl", 19);

	var older = Older10(array);


	if (older.name === "Sam") {
		console.log("[OK]\n");
	} else {
		alert("[Error] The older of the group is: " + older.name + "\n");
	}
}



function initializeArray() {

	var array1 = []; for (var i=0; i<10; i++){ array1[i]=new person("", 0); } array1 = [
		new person("", 0),
		new person("Paul", 23),
		new person("Jim", 24),
		new person("Sam", 84),
		new person("Rob", 54),
		new person("", 0),
		new person("", 0),
		new person("", 0),
		new person("Karl", 10),
		new person("", 0)
	];


	var array2 = [
		new person("", 0),
		new person("Paul", 23),
		new person("Jim", 24),
		new person("Sam", 84),
		new person("Rob", 54),
		new person("", 0),
		new person("", 0),
		new person("", 0),
		new person("Karl", 10),
		new person("", 0)];


	if (array1.length === array2.length) {
		console.log("[OK] length\n");
	} else {
		alert("[Error] len => array1: " + array1.length + ", array2: " + array2.length + "\n");
	}

	if (JSON.stringify(array1) === JSON.stringify(array2)) {
		console.log("[OK] comparison\n");
	} else {
		alert("[Error] array1: " + array1 + "\narray2: " + array2 + "\n");
	}
}



function multiArray() {

	var doubleArray_1 = []; for (var i=0; i<2; i++){ doubleArray_1[i]=[]; for (var j=0; j<4; j++){ doubleArray_1[i][j]=0; }} doubleArray_1 = [[1, 2, 3, 4], [5, 6, 7, 8]];


	var doubleArray_2 = []; for (var i=0; i<2; i++){ doubleArray_2[i]=[]; for (var j=0; j<4; j++){ doubleArray_2[i][j]=0; }} doubleArray_2 = [
		[1, 2, 3, 4], [5, 6, 7, 8]];


	var doubleArray_3 = []; for (var i=0; i<2; i++){ doubleArray_3[i]=[]; for (var j=0; j<4; j++){ doubleArray_3[i][j]=0; }} doubleArray_3 = [
		[1, 2, 3, 4],
		[5, 6, 7, 8]
	];


	if (JSON.stringify(doubleArray_1) === JSON.stringify(doubleArray_2) && JSON.stringify(doubleArray_2) === JSON.stringify(doubleArray_3)) {
		console.log("[OK]\n");
	} else {
		alert("[Error] multi-dimensional\n");
	}
}



function main() {
	console.log("\n== testStruct\n");
	testStruct();
	console.log("\n== testArray\n");
	testArray();
	console.log("\n== initializeArray\n");
	initializeArray();
	console.log("\n== multiArray\n");
	multiArray();
}
