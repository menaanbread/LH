var IoC;
(function (IoC) {
    (function (LifeStyle) {
        LifeStyle[LifeStyle["Singleton"] = 0] = "Singleton";
        LifeStyle[LifeStyle["Transient"] = 1] = "Transient";
    })(IoC.LifeStyle || (IoC.LifeStyle = {}));
    var LifeStyle = IoC.LifeStyle;
    var IocContainer = (function () {
        function IocContainer() {
            this._dependencyContainer = new DependencyContainer();
        }
        IocContainer.prototype.register = function (interfaceName, type, lifestyle) {
            switch (lifestyle) {
                case LifeStyle.Singleton:
                    var dependency = new type();
                    this._dependencyContainer.add(interfaceName, function () { return dependency; });
                    break;
                case LifeStyle.Transient:
                    this._dependencyContainer.add(interfaceName, function () { return new type(); });
                    break;
            }
        };
        IocContainer.prototype.resolve = function (interfaceName) {
            return this._dependencyContainer.resolve(interfaceName);
        };
        return IocContainer;
    })();
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
            return this._implementations[dependencyIndex]();
        };
        return DependencyContainer;
    })();
})(IoC || (IoC = {}));
