const request = require("supertest");
const app = require("../src/app");

describe("Task Manager API", () => {
  test("health endpoint returns ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("creates a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Learn Node.js" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Learn Node.js");
  });

  test("rejects an empty title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "   " });

    expect(response.status).toBe(400);
  });

  test("returns 404 for a missing task", async () => {
    const response = await request(app).get("/tasks/999999");

    expect(response.status).toBe(404);
  });
});