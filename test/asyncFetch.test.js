import { asyncFetch } from "../src/async/asyncFetch";

describe("asyncFetch utility", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handles successful API response", async () => {
    const mockData = [{ id: 1, title: "Test Post" }];

    global.fetch.mockResolvedValue({
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: async () => mockData,
    });

    const result = await asyncFetch("https://api.example.com/posts");

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("handles HTTP error response", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      headers: {
        get: () => "application/json",
      },
    });

    await expect(
      asyncFetch("https://api.example.com/wrong-url")
    ).rejects.toThrow("HTTP Error: 404");
  });

  test("retries request after network failure", async () => {
    const mockData = { success: true };

    global.fetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => mockData,
      });

    const result = await asyncFetch("https://api.example.com/posts", {
      retries: 1,
      retryDelay: 0,
    });

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});