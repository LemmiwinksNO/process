main = {};

main.sum = (a, b = 6) => (a + b);

main.square = (b) => {
	return b * b;
};

main.variable = 8;

main.MyClass = class MyClass {
	constructor(credentials) {
		this.name = credentials.name;
		this.enrollmentNo = credentials.enrollmentNo
	}
	getName() {
		return this.name;
	}
}

module.exports = main;
