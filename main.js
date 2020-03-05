var FIbonacci = {
    of: function (num) {
        if (num <= 2) {
            return 1
        }
        else {
            var a = 1;
            var b = 1;
            var i = 2;
            while (i < num) {
                var temp = a;
                a = a + b;
                b = temp;
                i += 1;
            }
            return a
        }
    }
}
Fibonacci = Object.create(FIbonacci)
var main = function () {
    num = 100;
    for (var i = 1; i <= 200; i++) {
        console.log("斐波那契额数列第" + i + "是：" + Fibonacci.of(i))
    }
}
main()
