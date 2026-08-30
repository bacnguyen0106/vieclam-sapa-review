Deno.serve(async (req) => {
  const url = new URL(req.url);
  let pathname = url.pathname;
  if (pathname === "/" || pathname === "") {
    pathname = "/index.html";
  }
  
  try {
    const filePath = "." + pathname;
    const file = await Deno.readFile(filePath);
    let contentType = "text/html; charset=utf-8";
    if (pathname.endsWith(".css")) contentType = "text/css; charset=utf-8";
    else if (pathname.endsWith(".js")) contentType = "application/javascript; charset=utf-8";
    else if (pathname.endsWith(".png")) contentType = "image/png";
    else if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (pathname.endsWith(".svg")) contentType = "image/svg+xml";
    else if (pathname.endsWith(".json")) contentType = "application/json; charset=utf-8";

    return new Response(file, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600"
      }
    });
  } catch (_e) {
    try {
      const indexFile = await Deno.readFile("./index.html");
      return new Response(indexFile, {
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    } catch (_err) {
      return new Response("Not Found", { status: 404 });
    }
  }
});
