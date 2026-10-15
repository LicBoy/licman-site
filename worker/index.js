// Serves static assets, adding HTTP Range support for media files.
// Safari (macOS and iOS) only plays <video> when the server answers byte-range requests with 206.
export default {
  async fetch(request, env) {
    const range = request.headers.get("Range");
    const headers = new Headers(request.headers);
    headers.delete("Range");
    const res = await env.ASSETS.fetch(new Request(request.url, { method: request.method, headers }));
    if (res.status !== 200) return res;

    const out = new Headers(res.headers);
    out.set("Accept-Ranges", "bytes");
    if (!range) return new Response(res.body, { status: 200, headers: out });

    const buf = await res.arrayBuffer();
    const size = buf.byteLength;
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    let start, end;
    if (m && m[1] !== "") { start = +m[1]; end = m[2] !== "" ? Math.min(+m[2], size - 1) : size - 1; }
    else if (m && m[2] !== "") { start = Math.max(0, size - +m[2]); end = size - 1; }
    if (start === undefined || start > end || start >= size) {
      out.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers: out });
    }
    out.set("Content-Range", `bytes ${start}-${end}/${size}`);
    out.set("Content-Length", String(end - start + 1));
    return new Response(request.method === "HEAD" ? null : buf.slice(start, end + 1), { status: 206, headers: out });
  },
};
