












var PASS = true;

function Rectangle(width, height) {
	this.width=width; this.height=height
}

function noMethod() {
	var pass = true;

	var area = function(r) {
		return r.width * r.height;
	};

	var r1 = new Rectangle(12, 2);

	if (area(r1) !== 24) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: area r1 => got " + area(r1) + ", want 24)<br>");
		pass = false, PASS = false;
	}
	if (area(new Rectangle(9, 4)) !== 36) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: area Rectangle{9,4} => got " + area(new Rectangle(9, 4)) + ", want 36)<br>");

		pass = false, PASS = false;
	}

	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}



Rectangle.prototype.area = function() {
	return this.width * this.height;
}

function Circle(radius) {
	this.radius=radius
}

Circle.prototype.area = function() {
	return this.radius * this.radius * Math.PI;
}

function method() {
	var pass = true;

	var r1 = new Rectangle(12, 2);
	var r2 = new Rectangle(9, 4);
	var c1 = new Circle(10);
	var c2 = new Circle(25);

	var _ = function(msg, in_, out) { return {
		msg: msg,
		in_: in_,
		out: out
	};}; var tests = [
		_("Rectangle{12,2}", r1.area(), 24),
		_("Rectangle{9,4}", r2.area(), 36),
		_("Circle{10}", c1.area(), 314.1592653589793),
		_("Circle{25}", c2.area(), 1963.4954084936207)
	];

	var t; for (var _ in tests) { t = tests[_];
		if (JSON.stringify(t.in_) !== JSON.stringify(t.out)) {
			document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: " + t.msg + " => got " + t.in_ + ", want " + t.out + "<br>");
			pass = false, PASS = false;
		}
	}
	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}



function sliceOfints(t) { this.t=arguments; }
function agesByNames(t) { this.t=arguments; }

sliceOfints.prototype.sum = function() {
	var sum = 0;
	var value; for (var _ in this.t) { value = this.t[_];
		sum += value;
	}
	return sum;
}

agesByNames.prototype.older = function() {
	var a = 0;
	var n = "";
	var value; for (var key in this.t) { value = this.t[key];
		if (value > a) {
			a = value;
			n = key;
		}
	}
	return n;
}

function withNamedType() {
	var pass = true;

	var s = new sliceOfints(1, 2, 3, 4, 5);
	var folks = new agesByNames();
	folks["Bob"] = 36,
	folks["Mike"] = 44,
	folks["Jane"] = 30,
	folks["Popey"] = 100;


	if (s.sum() !== 15) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: s.sum => got " + s.sum() + ", want 15)<br>");
		pass = false, PASS = false;
	}
	if (folks.older() !== "Popey") {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;FAIL: folks.older => got " + folks.older() + ", want Popey)<br>");

		pass = false, PASS = false;
	}

	if (pass) {
		document.write("&nbsp;&nbsp;&nbsp;&nbsp;pass<br>");
	}
}

function main() {
	document.write("<br><br>== Methods<br><br>");

	document.write("=== RUN noMethod<br>");
	noMethod();
	document.write("=== RUN method<br>");
	method();
	document.write("=== RUN withNamedType<br>");
	withNamedType();

	if (PASS) {
		document.write("PASS<br>");
	} else {
		document.write("FAIL<br>");
		alert("Fail: Methods");
	}
} main();
/* Generated by GoScript (github.com/kless/goscript) */