/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../ioc/container.js" />
var Tests;
(function (Tests) {
    var IoC = require("../../../ioc/container.js");
    var IocContainer = IoC.IocContainer;
    var LifeStyle = IoC.LifeStyle;
    var numberOfImplementations = 0;
    describe("container", function () {
        var container;
        beforeEach(function () {
            container = new IocContainer();
            numberOfImplementations = 0;
        });
        it("should call new on an interface once for singleton", function () {
            container.register("ITestable", Testable, LifeStyle.Singleton);
            container.register("ITestable", Testable, LifeStyle.Singleton);
            container.register("ITestable", Testable, LifeStyle.Singleton);
            var testable = container.resolve("ITestable");
            expect(numberOfImplementations).toEqual(1);
        });
    });
    var Testable = (function () {
        function Testable() {
            numberOfImplementations++;
        }
        return Testable;
    })();
})(Tests || (Tests = {}));
