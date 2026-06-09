import { createStateManager } from "../utils/reactive/stateManager";

describe("stateManager", () => {
  test("updates state correctly", async () => {
    const manager = createStateManager({ count: 0 });

    await manager.setState({ count: 1 });

    expect(manager.getState().count).toBe(1);
  });

  test("handles async updates without race condition", async () => {
    const manager = createStateManager({ count: 0 });

    await Promise.all([
      manager.setState((state) => ({ count: state.count + 1 })),
      manager.setState((state) => ({ count: state.count + 1 })),
    ]);

    expect(manager.getState().count).toBe(2);
  });

  test("notifies subscribers when state changes", async () => {
    const manager = createStateManager({ name: "Old" });
    const listener = jest.fn();

    manager.subscribe(listener);

    await manager.setState({ name: "New" });

    expect(listener).toHaveBeenCalledWith({ name: "New" });
  });
});