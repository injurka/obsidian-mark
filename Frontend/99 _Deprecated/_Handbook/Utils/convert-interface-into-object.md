```ts
export const createNames = <T>(config?: Partial<{ [key in keyof T]: string }>): { [key in keyof T]: string } => {
    const handler = {
        get(_: object, prop: keyof T) {
            return (config || ({} as T))[prop] ?? prop;
        }
    };

    return new Proxy({}, handler as ProxyHandler<object>) as { [key in keyof T]: string };
};

interface ITest {
    maxTasksCount: number;
    takeToWorkTime: number;
    sendNotificationTime: number;
}

const object = createNames<ITest>();
```