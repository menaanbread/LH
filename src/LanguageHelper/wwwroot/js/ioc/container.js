var IoC;
(function (IoC) {
    var IocContainer = (function () {
        function IocContainer() {
            this._dependencyContainer = new DependencyContainer();
        }
        // Current implementation will work with Singletons only
        IocContainer.prototype.install = function (interfaceName, implementationType) {
            var dependency = new implementationType();
            this._dependencyContainer.add(interfaceName, dependency);
        };
        IocContainer.prototype.resolve = function (interfaceName) {
            return this._dependencyContainer.resolve(interfaceName);
        };
        return IocContainer;
    }());
    IoC.IocContainer = IocContainer;
    var DependencyContainer = (function () {
        function DependencyContainer() {
            this._interfaces = new Array();
            this._implementations = new Array();
        }
        DependencyContainer.prototype.add = function (interfaceName, resolution) {
            this._interfaces.push(interfaceName);
            this._implementations.push(resolution);
        };
        DependencyContainer.prototype.resolve = function (interfaceName) {
            var dependencyIndex = this._interfaces.indexOf(interfaceName);
            return this._implementations[dependencyIndex];
        };
        return DependencyContainer;
    }());
})(IoC || (IoC = {}));
