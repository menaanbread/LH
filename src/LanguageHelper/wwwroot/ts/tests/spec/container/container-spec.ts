/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../ioc/container.ts" />

module Tests {
    import IContainer = IoC.IContainer;
    import Castle = IoC.IocContainer;
    import LifeStyle = IoC.LifeStyle;
    
    let numberOfImplementations: number = 0;
    
    describe("container", () => {
        let container: IContainer;
        
        beforeEach(() => {
            container = new Castle();
            numberOfImplementations = 0;
        });
        
        it("should call new on an interface once for singleton", () => {
            container.register("ITestable", Testable, LifeStyle.Singleton);
            container.register("ITestable", Testable, LifeStyle.Singleton);
            container.register("ITestable", Testable, LifeStyle.Singleton);
            
            let testable = container.resolve<ITestable>("ITestable");
            
            expect(numberOfImplementations).toEqual(1);
        });
    });
    
    interface ITestable {
    }
    
    class Testable implements ITestable {
        constructor() {
            numberOfImplementations++;
        }
    }
}
