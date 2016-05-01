var IoC;
(function (IoC) {
    class IocContainer {
        constructor() {
            this._dependencyContainer = new DependencyContainer();
        }
        install(interfaceName, implementationType) {
            let dependency = new implementationType();
            this._dependencyContainer.add(interfaceName, dependency);
        }
        resolve(interfaceName) {
            return this._dependencyContainer.resolve(interfaceName);
        }
    }
    IoC.IocContainer = IocContainer;
    class DependencyContainer {
        constructor() {
            this._interfaces = new Array();
            this._implementations = new Array();
        }
        add(interfaceName, resolution) {
            this._interfaces.push(interfaceName);
            this._implementations.push(resolution);
        }
        resolve(interfaceName) {
            let dependencyIndex = this._interfaces.indexOf(interfaceName);
            return this._implementations[dependencyIndex];
        }
    }
})(IoC || (IoC = {}));
//# sourceMappingURL=container.js.map