export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/api/products" && request.method === "GET") {
            const { results } = await env.DB.prepare(
                "SELECT * FROM products ORDER BY id DESC"
            ).all();

            return Response.json(results);
        }

        if (url.pathname === "/api/products" && request.method === "POST") {
            const body = await request.json();

            await env.DB.prepare(
                "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)"
            ).bind(
                body.name,
                body.description,
                body.price,
                body.image,
                body.category
            ).run();

            return Response.json({ success: true });
        }

        if (url.pathname.startsWith("/api/products/") && request.method === "PUT") {
            const id = url.pathname.split("/").pop();
            const body = await request.json();

            await env.DB.prepare(
                "UPDATE products SET name=?, description=?, price=?, image=?, category=? WHERE id=?"
            ).bind(
                body.name,
                body.description,
                body.price,
                body.image,
                body.category,
                id
            ).run();

            return Response.json({ success: true });
        }

        if (url.pathname.startsWith("/api/products/") && request.method === "DELETE") {
            const id = url.pathname.split("/").pop();

            await env.DB.prepare(
                "DELETE FROM products WHERE id=?"
            ).bind(id).run();

            return Response.json({ success: true });
        }

        return new Response("Not Found", { status: 404 });
    }
};