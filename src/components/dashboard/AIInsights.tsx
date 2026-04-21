import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiInsights } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function AIInsights() {
  return (
    <Card className="shadow-elev-sm overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-primary text-primary-foreground">
        <CardTitle className="text-base flex items-center gap-2 text-primary-foreground">
          <Sparkles className="h-4 w-4 text-accent" />
          AI insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {aiInsights.map((i) => (
          <div key={i.id} className="rounded-md border border-border bg-card p-3">
            <p className="text-sm font-medium">{i.title}</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{i.description}</p>
            <Button size="sm" variant="outline" className="mt-2.5 h-7 text-xs">
              {i.action}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
