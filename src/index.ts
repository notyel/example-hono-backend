import { type Context, Env, Hono, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { Pool } from "pg";

const app = new Hono<Env>().basePath("/api");

// Middleware para gestionar la conexión a PostgreSQL
export const postgresMiddleware = (): MiddlewareHandler =>
  createMiddleware<Env>(async (ctx: Context, next: any) => {
    if (!ctx.get("pgClient")) {
      const connectionString = ctx.env.DATABASE_URL;
      const pool = new Pool({ connectionString });

      ctx.set("pgClient", pool);
    }

    await next();
  });

// Usar el middleware en la aplicación
app.use("*", postgresMiddleware());

// Ruta para obtener productos
app.get("/products", async (c: Context) => {
  const client = c.get("pgClient") as Pool;
  const res = await client.query("SELECT * FROM products");

  return c.json(res.rows);
});

// Ruta raíz
app.get("/", (c: Context) => {
  return c.json({ message: "Hello Hono!" });
});

export default app;
