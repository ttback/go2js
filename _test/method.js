/* Generated by GoScript (github.com/kless/goscript) */



function Rectangle(width, height) {
	this.width=width; this.height=height;
}

function noMethod() {
	var area = function(r) {
		return r.width * r.height;
	};

	var r1 = new Rectangle(12, 2);


	if (area(r1) === 24 && area(new Rectangle(9, 4)) === 36) {
		document.write("[OK]<br>");
	} else {
		document.write("[Error] Area of r1 is: " + area(r1) + "<br>");
		document.write("\tArea of \"Rectangle{9, 4}\" is: " + area(new Rectangle(9, 4)) + "<br>");
	}
}



Rectangle.prototype.area = function() {
	return this.width * this.height;
}

function Circle(radius) {
	this.radius=radius;
}

Circle.prototype.area = function() {
	return this.radius * this.radius * Math.PI;
}

function method() {
	var r1 = new Rectangle(12, 2);
	var r2 = new Rectangle(9, 4);
	var c1 = new Circle(10);
	var c2 = new Circle(25);


	if (r1.area() === 24 && r2.area() === 36) {
		document.write("[OK] rectangle<br>");
	} else {
		document.write("[Error] Area of r1 is: " + r1.area() + "<br>");
		document.write("\tArea of r2 is: " + r2.area() + "<br>");
	}

	if (c1.area() === 314.1592653589793 && c2.area() === 1963.4954084936207) {
		document.write("[OK] circle<br>");
	} else {
		document.write("[Error] Area of c1 is: " + c1.area() + "<br>");
		document.write("\tArea of c2 is: " + c2.area() + "<br>");
	}
}



function SliceOfints(t) { this.t=t; }
function AgesByNames(t) { this.t=t; }

SliceOfints.prototype.sum = function() {
	var sum = 0;
	var value; for (var _ in s) { value = s[_];
		sum += value;
	}
	return sum;
}

AgesByNames.prototype.older = function() {
	var a = 0;
	var n = "";
	var value; for (var key in people) { value = people[key];
		if (value > a) {
			a = value;
			n = key;
		}
	}
	return n;
}

function withNamedType() {
	var s = new SliceOfints(1, 2, 3, 4, 5);
	var folks = new AgesByNames();
	folks["Bob"] = 36,
	folks["Mike"] = 44,
	folks["Jane"] = 30,
	folks["Popey"] = 100;



	if (s.sum() === 15) {
		document.write("[OK] sum<br>");
	} else {
		document.write("[Error] The sum of ints in the slice s is: " + s.sum() + "<br>");
	}

	if (folks.older() === "Popey") {
		document.write("[OK] older<br>");
	} else {
		document.write("[Error] The older in the map folks is: " + folks.older() + "<br>");
	}
}



function main() {
	document.write("<br>== noMethod<br>");
	noMethod();
	document.write("<br>== method<br>");
	method();
	document.write("<br>== withNamedType<br>");
	withNamedType();
} main();
