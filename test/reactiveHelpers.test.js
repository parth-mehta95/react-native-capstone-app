import {
  debounce,
  throttle,
  createObservable,
} from "../utils/reactive/reactiveHelpers";

describe("reactiveHelpers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("debounce calls function only once after delay", () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 300);

    debouncedFunction("first");
    debouncedFunction("second");

    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });

  test("throttle limits repeated function calls", () => {
    const callback = jest.fn();
    const throttledFunction = throttle(callback, 1000);

    throttledFunction();
    throttledFunction();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    throttledFunction();

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("observable notifies subscribers", () => {
    const observable = createObservable("old");
    const subscriber = jest.fn();

    observable.subscribe(subscriber);
    observable.setValue("new");

    expect(observable.getValue()).toBe("new");
    expect(subscriber).toHaveBeenCalledWith("new");
  });
});