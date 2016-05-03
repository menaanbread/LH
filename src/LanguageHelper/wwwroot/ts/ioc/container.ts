module IoC {
    export enum LifeStyle {
        Singleton,
        Transient
    }

    export interface IContainer {

        register<TInterface, TImplementation>(interfaceName: string, type: { new(): TImplementation; }, lifestyle: LifeStyle): void;
        resolve<TInterface>(interfaceName: string): TInterface;
    }

    export class IocContainer implements IContainer {

        private _dependencyContainer: DependencyContainer = new DependencyContainer();

        public register<TInterface, TImplementation>(interfaceName: string, type: { new(): TImplementation; }, lifestyle: LifeStyle): void {
            switch (lifestyle) {
                case LifeStyle.Singleton:
                    let dependency: TImplementation = new type();
                    this._dependencyContainer.add(interfaceName, () => dependency);
                    break;
                case LifeStyle.Transient:
                    this._dependencyContainer.add(interfaceName, () => new type());
                    break;
            }
        }

        public resolve<TInterface>(interfaceName: string): TInterface {
            return this._dependencyContainer.resolve<TInterface>(interfaceName);
        }
    }

    class DependencyContainer {

        private _interfaces: Array<string>;
        private _implementations: Array<() => Object>;

        constructor() {
          this._interfaces = new Array<string>();
          this._implementations = new Array<() => Object>();
        }

        public add<TInterface>(interfaceName: string, resolution: () => TInterface): void {
            this._interfaces.push(interfaceName);
            this._implementations.push(resolution);
        }

        public resolve<TInterface>(interfaceName: string): TInterface {
            let dependencyIndex: number = this._interfaces.indexOf(interfaceName);
            return <TInterface>this._implementations[dependencyIndex]();
        }
    }
}
