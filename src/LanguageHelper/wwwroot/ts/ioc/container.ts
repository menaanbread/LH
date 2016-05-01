module IoC {
    export interface IContainer {

        install<TInterface, TImplementation>(interfaceName: string, type: { new(): TImplementation; }): void;
        resolve<TInterface>(interfaceName: string): TInterface;
    }

    export class IocContainer implements IContainer {

        private _dependencyContainer: DependencyContainer = new DependencyContainer();

        // Current implementation will work with Singletons only
        public install<TInterface, TImplementation>(interfaceName: string, implementationType: { new(): TImplementation; }): void {
            let dependency: TImplementation = new implementationType();
            this._dependencyContainer.add(interfaceName, dependency);
        }

        public resolve<TInterface>(interfaceName: string): TInterface {
            return this._dependencyContainer.resolve<TInterface>(interfaceName);
        }
    }

    class DependencyContainer {

        private _interfaces: Array<string>;
        private _implementations: Array<Object>;

        constructor() {
          this._interfaces = new Array<string>();
          this._implementations = new Array<Object>();
        }

        public add<TInterface>(interfaceName: string, resolution: Object): void {
            this._interfaces.push(interfaceName);
            this._implementations.push(resolution);
        }

        public resolve<TInterface>(interfaceName: string): TInterface {
            let dependencyIndex: number = this._interfaces.indexOf(interfaceName);
            return <TInterface>this._implementations[dependencyIndex];
        }
    }
}
