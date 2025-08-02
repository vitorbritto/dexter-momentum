class LitePromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            queueMicrotask(() => {
                if (this.state === "pending") {
                    this.state = "fulfilled";
                    this.value = value;
                    this.onFulfilledCallbacks.forEach((fn) => fn(value));
                }
            });
        };

        const reject = (reason) => {
            queueMicrotask(() => {
                if (this.state === "pending") {
                    this.state = "rejected";
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach((fn) => fn(reason));
                }
            });
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
}
