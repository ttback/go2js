









var PASS = true;

function testIf() {
	var pass = true;


	var x = 5;

	if (x > 10) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: simple<br>");
		pass = false, PASS = false;
	}


	var x = 12; if (x > 10) {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: with statement<br>");
		pass = false, PASS = false;
	}


	var i = 7;

	if (i === 3) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: multiple (i == 3)<br>");
		pass = false, PASS = false;
	} else if (i < 3) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: multiple (i < 3)<br>");
		pass = false, PASS = false;
	} else {

	}


	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}

function testSwitch() {
	var pass = true;


	var i = 10;

	switch (i) {
	default:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: simple (default)<br>");
		pass = false, PASS = false; break;
	case 1:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: simple (1)<br>");
		pass = false, PASS = false; break;
	case 2: case 3: case 4:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: simple (2,3,4)<br>");
		pass = false, PASS = false; break;
	case 10:

	}


	i = 5; switch (true) {
	case i < 10: break;

	case i > 10: case i < 0:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: without expression (i>10, i<0)<br>");
		pass = false, PASS = false; break;
	case i === 10:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: without expression (i==10)<br>");
		pass = false, PASS = false; break;
	default:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: without expression (default)<br>");
		pass = false, PASS = false;
	}


	switch (true) {
	case i === 5: break;

	default:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: without expression 2 (default)<br>");
		pass = false, PASS = false;
	}


	switch (i) {
	case 4:
		pass = false;
		
	case 5:
		pass = false;
		
	case 6:
		pass = false;
		
	case 7:
		pass = true; break;
	case 8:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: with fallthrough (8)<br>");
		pass = false, PASS = false; break;
	default:
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: with fallthrough (default)<br>");
		pass = false, PASS = false;
	}

	if (JSON.stringify(pass) === JSON.stringify(false) && JSON.stringify(PASS) === JSON.stringify(true)) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: with fallthrough (4,5,6)<br>");
		PASS = false;
	}


	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}

function testFor() {
	var pass = true;


	var sum = 0;

	for (var i = 0; i < 10; i++) {
		sum += i;
	}

	if (sum === 45) {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: simple<br>");
		pass = false, PASS = false;
	}


	sum = 1;
	for (; sum < 1000;) {
		sum += sum;
	}

	if (sum === 1024) {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: 2 expressions omitted<br>");
		pass = false, PASS = false;
	}


	sum = 1;
	for (; sum < 1000;) {
		sum += sum;
	}

	if (sum === 1024) {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: 2 expressions omitted, no semicolons<br>");
		pass = false, PASS = false;
	}


	var i = 0;
	var s = "";

	for (;;) {
		i++;
		if (i === 3) {
			s = "" + i + "";
			break;
		}
	}

	if (s === "3") {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: infinite loop<br>");
		pass = false, PASS = false;
	}


	s = "";
	for (var i = 10; i > 0; i--) {
		if (i < 5) {
			break;
		}
		s += "" + i + " ";
	}

	if (s === "10 9 8 7 6 5 ") {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: break<br>");
		pass = false, PASS = false;
	}


	s = "";
	for (var i = 10; i > 0; i--) {
		if (i === 5) {
			continue;
		}
		s += "" + i + " ";
	}

	if (s === "10 9 8 7 6 4 3 2 1 ") {

	} else {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: continue<br>");
		pass = false, PASS = false;
	}


	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}

function testRange() {
	var pass = true;

	var s = g.Slice(0, [2, 3, 5]);

	var tests = g.Map(0, {
		0: 2,
		1: 3,
		2: 5
	});

	var v; for (var i in s.get()) { v = s.get()[i];
		if (JSON.stringify(tests.get(i)[0]) !== JSON.stringify(v)) {
			document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: " + i + ". got " + v + ", want " + tests.get(i)[0] + "<br>");
			pass = false, PASS = false;
		}
	}

	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}

function main() {
	document.write("<br><br>== Control statements<br><br>");

	document.write("=== RUN testIf<br>");
	testIf();
	document.write("=== RUN testSwitch<br>");
	testSwitch();
	document.write("=== RUN testFor<br>");
	testFor();
	document.write("=== RUN testRange<br>");
	testRange();

	if (PASS) {
		document.write("PASS<br>");
	} else {
		document.write("FAIL<br>");
		alert("Fail: Control statements");
	}
} main();
/* Generated by GoScript (github.com/kless/goscript) */
