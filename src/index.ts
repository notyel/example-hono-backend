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

// Ruta para consultar un producto por su ID
app.get("/products/:id", async (c: Context) => {
  const client = c.get("pgClient") as Pool;
  const productId = c.req.param("id");

  try {
    const res = await client.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    if (res.rows.length === 0) {
      return c.text("Producto no encontrado", 404);
    }

    return c.json(res.rows[0]);
  } catch (err) {
    console.error(err);
    return c.text("Error al obtener el producto", 500);
  }
});

// Ruta para obtener usuarios
app.get("/users", async (c: Context) => {
  const client = c.get("pgClient") as Pool;
  const res = await client.query("SELECT * FROM users");

  return c.json(res.rows);
});

// Ruta raíz
app.get("/", (c: Context) => {
  return c.json({ message: "Hello Hono!" });
});

export default app;
