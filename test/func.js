/* Generated by GoJscript <github.com/kless/GoJscript> */







function hello() { console.log("Hello world!"); }

function simpleFunc() {

	var max = function(a, b) {
		if (a > b) {
			return a;
		}
		return b;
	};

	var x = 3;
	var y = 4;
	var z = 5;

	var max_xy = max(x, y);
	var max_xz = max(x, z);

	alert("max(" + x + ", " + y + ") = " + max_xy + "\n");
	alert("max(" + x + ", " + z + ") = " + max_xz + "\n");
	alert("max(" + y + ", " + z + ") = " + max(y, z) + "\n");
}

function twoOuputValues() {

	var SumAndProduct = function(A, B) {
		return [A + B, A * B];
	};

	var x = 3;
	var y = 4;
	var _ = SumAndProduct(x, y), xPLUSy = _[0], xTIMESy = _[1];

	alert("" + x + " + " + y + " = " + xPLUSy + "\n");
	alert("" + x + " * " + y + " = " + xTIMESy + "\n");
}

function resultVariable() {


	var MySqrt = function(f) { var s = 0, ok = false;
		if (f > 0) {
			s = Math.sqrt(f), ok = true;
		}
		return [s, ok];
	};

	for (var i = -2.0; i <= 10; i++) {
		var _ = MySqrt(i), sqroot = _[0], ok = _[1];
		if (ok) {
			alert("The square root of " + i + " is " + sqroot + "\n");
		} else {
			alert("Sorry, no square root for " + i + "\n");
		}
	}
}

function emptyReturn(f) { var squareroot = 0, ok = false;
	if (f > 0) {
		squareroot = Math.sqrt(f), ok = true;
	}
	return [squareroot, ok];
}

function emptyReturn2(n) { var ok = false;
	if (n > 0) {
		ok = true;
	}
	return ok;
}

function parameterByValue() {

	var add = function(v) {
		v = v + 1;
		return v;
	};

	var x = 3;
	alert("x =  " + x + "\n");

	var x1 = add(x);
	alert("x+1 =  " + x1 + "\n");
	alert("x =  " + x + "\n");
}

function parameterByReference() {
	var add = function(v) {
		v[0] = v[0] + 1;
		return v[0];
	};

	var x = 3;
	alert("x =  " + x + "\n");

	var x1 = add(x=[x]);
	alert("x+1 =  " + x1 + "\n");
	alert("x =  " + x + "\n");

	x1 = add(x);
	alert("x+1 =  " + x1 + "\n");
	alert("x =  " + x + "\n");
}

function byReference2() {
	var add = function(v, i) { v[0] += i; };

	var value = 6;
	var incr = 1;

	add(value=[value], incr);
	alert(value + "\n");

	add(value, incr);
	alert(value + "\n");
}

function byReference3() {
	var x = 3;
	var y = x;

	y[0]++;
	console.log(x + "\n");

	y[0]++;
	console.log(x + "\n");
}

function byReference4() {
	var x = 3;
	var f = function() {
		x = 4;
	};
	var y = x;

	f();
	console.log(y[0] + "\n");
}
