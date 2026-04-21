import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Plus, BookOpen, FileText, FlaskConical, ClipboardCheck } from "lucide-react";

interface Item {
  id: string;
  title: string;
  type: "lesson" | "assignment" | "quiz" | "simulation";
  duration: string;
}
interface Module {
  id: string;
  title: string;
  items: Item[];
}

const initial: Module[] = [
  {
    id: "m1",
    title: "Module 1: Strategic Thinking Foundations",
    items: [
      { id: "i1", title: "Welcome & frameworks overview", type: "lesson", duration: "20 min" },
      { id: "i2", title: "Case: Dangote Group decisions", type: "assignment", duration: "2 hr" },
      { id: "i3", title: "Quiz: Strategic frameworks", type: "quiz", duration: "15 min" },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Market Entry Strategy",
    items: [
      { id: "i4", title: "Lecture: African market dynamics", type: "lesson", duration: "45 min" },
      { id: "i5", title: "Simulation: East Africa expansion", type: "simulation", duration: "3 hr" },
      { id: "i6", title: "Group assignment", type: "assignment", duration: "1 wk" },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Leading Through Change",
    items: [
      { id: "i7", title: "Lecture: Kotter's 8 steps", type: "lesson", duration: "40 min" },
      { id: "i8", title: "Reflection essay", type: "assignment", duration: "2 hr" },
    ],
  },
];

const typeIcon = {
  lesson: BookOpen,
  assignment: FileText,
  quiz: ClipboardCheck,
  simulation: FlaskConical,
};

const typeColor = {
  lesson: "text-info",
  assignment: "text-warning",
  quiz: "text-accent",
  simulation: "text-primary",
};

export function CurriculumBuilder() {
  const [modules, setModules] = useState<Module[]>(initial);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleModuleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setModules((mods) => {
      const oldIdx = mods.findIndex((m) => m.id === active.id);
      const newIdx = mods.findIndex((m) => m.id === over.id);
      return arrayMove(mods, oldIdx, newIdx);
    });
  };

  return (
    <Card className="shadow-elev-sm">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Curriculum builder</CardTitle>
        <Button size="sm" variant="outline"><Plus className="h-4 w-4" /> Add module</Button>
      </CardHeader>
      <CardContent>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleModuleDragEnd}>
          <SortableContext items={modules.map((m) => m.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {modules.map((m) => (
                <SortableModule key={m.id} module={m} setModules={setModules} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}

function SortableModule({ module, setModules }: { module: Module; setModules: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleItemDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setModules((mods: Module[]) =>
      mods.map((m) => {
        if (m.id !== module.id) return m;
        const oldIdx = m.items.findIndex((i) => i.id === active.id);
        const newIdx = m.items.findIndex((i) => i.id === over.id);
        return { ...m, items: arrayMove(m.items, oldIdx, newIdx) };
      }),
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-lg border border-border bg-card ${isDragging ? "shadow-elev-lg" : "shadow-elev-sm"}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2.5">
        <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
          <GripVertical className="h-4 w-4" />
        </button>
        <h4 className="text-sm font-medium flex-1">{module.title}</h4>
        <Badge variant="outline" className="text-[10px]">{module.items.length} items</Badge>
        <Button size="sm" variant="ghost" className="h-7"><Plus className="h-3.5 w-3.5" /></Button>
      </div>
      <div className="p-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleItemDragEnd}>
          <SortableContext items={module.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {module.items.map((item) => <SortableItem key={item.id} item={item} />)}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const Icon = typeIcon[item.type];
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm hover:bg-muted/50 hover:border-border ${isDragging ? "bg-card shadow-elev-md" : ""}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <Icon className={`h-3.5 w-3.5 ${typeColor[item.type]}`} />
      <span className="flex-1 truncate">{item.title}</span>
      <span className="text-xs text-muted-foreground tabular-nums">{item.duration}</span>
      <Badge variant="outline" className="text-[10px] capitalize">{item.type}</Badge>
    </div>
  );
}
