module IoC {
    export interface IContainer {
        install<TInterface, TImplementation>(interfaceType: { TInterface; }, type: { new(): TImplementation ;});
        resolve(interfaceName: string): any;
    }
    
    export class IocContainer implements IContainer {
        private _dependencyContainer: DependencyContainer = new DependencyContainer();

        // Current implementation will work with Singletons only
        public install<TInterface, TImplementation>(interfaceType: { TInterface; }, implementationType: { new(): TImplementation ;}) {
            var dependency: TImplementation = new implementationType();
            
            this._dependencyContainer.add(interfaceType, dependency);
        }
        
        public resolve(interfaceName: string): Object {
            return this._dependencyContainer.resolve(interfaceName);
        }
    }
    
    class DependencyContainer {
        private _interfaces: Array<any>;
        private _implementations: Array<Object>;
        
        public add<TInterface>(interfaceType: { TInterface; }, resolution: Object): void {
            this._interfaces.push(interfaceType);
            this._implementations.push(resolution);
        }
        
        public resolve(interfaceName: string): Object {
            let dependencyIndex: number = this._interfaces.indexOf(interfaceName);
            return this._implementations[dependencyIndex];
        }
    }
}