import { createEventEmitter } from "../utils/reactive/eventEmitter";

describe("eventEmitter", () => {
  test("publishes event to subscriber", async () => {
    const emitter = createEventEmitter();
    const listener = jest.fn();

    emitter.subscribe("userLogin", listener);

    await emitter.publish("userLogin", { user: "John" });

    expect(listener).toHaveBeenCalledWith({ user: "John" });
  });

  test("supports multiple subscribers", async () => {
    const emitter = createEventEmitter();
    const listenerOne = jest.fn();
    const listenerTwo = jest.fn();

    emitter.subscribe("update", listenerOne);
    emitter.subscribe("update", listenerTwo);

    await emitter.publish("update", "New Data");

    expect(listenerOne).toHaveBeenCalledWith("New Data");
    expect(listenerTwo).toHaveBeenCalledWith("New Data");
  });

  test("unsubscribe removes listener", async () => {
    const emitter = createEventEmitter();
    const listener = jest.fn();

    const unsubscribe = emitter.subscribe("logout", listener);
    unsubscribe();

    await emitter.publish("logout", true);

    expect(listener).not.toHaveBeenCalled();
  });
});