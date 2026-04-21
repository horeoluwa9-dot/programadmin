import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.104.0/cors";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are the ABC AI Admin Assistant for Africa Business College (ABC) — a pan-African business school's institutional command center.

You help Program Administrators understand and act on institutional data. The platform manages:
- 6 active academic programs (Leadership Excellence, Entrepreneurship Lab, Strategic Finance, Digital Transformation, Agribusiness, Women in Leadership) plus a Fintech Lab in draft.
- ~2,500 enrolled students across cohorts in Lagos, Nairobi, Cairo, Accra, Cape Town, Kigali, Johannesburg, and Dakar.
- 7 faculty members and 6 industry mentors.
- Active simulations including Market Entry: East Africa, Cash Flow Crisis, and M&A Negotiation.
- Current institutional KPIs: 85% completion rate, 24+ at-risk students, ~78% avg simulation score.

Known active alerts:
- Accra '25 Cohort A: engagement down 32% over 4 days (high severity).
- Ms. Zanele Dlamini overloaded at 88% workload (medium).
- 12 missing assignments in Customer Discovery, Dakar '25 Cohort A (medium).

Style: concise, data-first, action-oriented. Use bullet points for lists. Recommend specific actions where relevant. When you don't know something, say so plainly. Keep most answers under 180 words.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "Payment required" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
