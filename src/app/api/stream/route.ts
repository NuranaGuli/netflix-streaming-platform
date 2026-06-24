import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  let viewers = 18_000 + Math.floor(Math.random() * 4000);
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        if (closed) return;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ viewers })}\n\n`)
        );
        viewers = Math.max(10_000, viewers + Math.floor((Math.random() - 0.48) * 120));
      };

      send(); 
      const interval = setInterval(send, 1000);

      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
