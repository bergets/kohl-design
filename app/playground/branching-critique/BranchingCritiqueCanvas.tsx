"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  GitBranch,
  Minus,
  Plus,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface FrameTraits {
  noEyebrow: boolean;
  sentenceNotStats: boolean;
  hairlineList: boolean;
  unifiedControls: boolean;
  compactRhythm: boolean;
}

type FrameVerdict = "neutral" | "keep" | "reject";

interface CanvasNode {
  id: string;
  parentId: string | null;
  label: string;
  critique: string;
  x: number;
  y: number;
  traits: FrameTraits;
  verdict: FrameVerdict;
}

interface CritiqueAction {
  id: keyof FrameTraits;
  label: string;
  rule: string;
}

const CRITIQUE_ACTIONS: CritiqueAction[] = [
  {
    id: "noEyebrow",
    label: "Drop eyebrow",
    rule: "Never put small uppercase category eyebrows (`OVERVIEW`, `01`) above titles.",
  },
  {
    id: "sentenceNotStats",
    label: "Sentence over stats",
    rule: "Replace 3-column stat boxes with a single calm editorial sentence.",
  },
  {
    id: "hairlineList",
    label: "Hairline list",
    rule: "Use hairline dividers (`divide-y divide-border/60`) on the canvas instead of wrapping every list item in a Card.",
  },
  {
    id: "unifiedControls",
    label: "Match control heights",
    rule: "Always use the same `size` prop across sibling inputs and buttons in the same row.",
  },
  {
    id: "compactRhythm",
    label: "Compact rhythm",
    rule: "Use `data-type-scale=\"compact\"` (`14px` base) for dense team and schedule views.",
  },
];

const FRAME_WIDTH = 340;
const FRAME_HEIGHT_EST = 330;

const INITIAL_NODES: CanvasNode[] = [
  {
    id: "v1",
    parentId: null,
    label: "v1 · Initial AI draft",
    critique: "Default prompt output",
    x: 40,
    y: 120,
    traits: {
      noEyebrow: false,
      sentenceNotStats: false,
      hairlineList: false,
      unifiedControls: false,
      compactRhythm: false,
    },
    verdict: "reject",
  },
  {
    id: "v2",
    parentId: "v1",
    label: "v2 · Drop stat boxes",
    critique: "Too boxed — use an editorial sentence",
    x: 450,
    y: 40,
    traits: {
      noEyebrow: true,
      sentenceNotStats: true,
      hairlineList: false,
      unifiedControls: false,
      compactRhythm: false,
    },
    verdict: "neutral",
  },
  {
    id: "v3",
    parentId: "v2",
    label: "v3 · Hairline & unified",
    critique: "Hairline list + matching control heights",
    x: 860,
    y: 120,
    traits: {
      noEyebrow: true,
      sentenceNotStats: true,
      hairlineList: true,
      unifiedControls: true,
      compactRhythm: false,
    },
    verdict: "keep",
  },
];

function MiniScreenPreview({ traits }: { traits: FrameTraits }) {
  const members = [
    { name: "Astrid Lindholm", role: "Product Design" },
    { name: "Maja Ekström", role: "Frontend" },
  ];

  return (
    <div
      className={`rounded-lg border border-border/60 bg-background p-3.5 space-y-3 text-foreground select-none ${
        traits.compactRhythm ? "text-xs" : "text-sm"
      }`}
    >
      {/* Header */}
      <div className="space-y-0.5">
        {!traits.noEyebrow && (
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            OVERVIEW
          </p>
        )}
        <p className="font-cooper text-base font-normal text-foreground leading-tight">
          Stockholm team
        </p>
      </div>

      {/* Stats vs Editorial Sentence */}
      {traits.sentenceNotStats ? (
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">14 active members</span>{" "}
          across design and engineering · 3 invites pending.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { n: "14", l: "Members" },
            { n: "98%", l: "Active" },
            { n: "3", l: "Pending" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="rounded-md border border-border/70 bg-card p-2 text-center"
            >
              <p className="text-sm font-bold text-foreground">{stat.n}</p>
              <p className="text-[10px] text-muted-foreground">{stat.l}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search + Action */}
      <div className="flex items-center gap-1.5">
        <div className="flex-1 h-8 rounded-[var(--radius-sm)] border border-input bg-background px-2.5 flex items-center text-xs text-muted-foreground">
          Filter members...
        </div>
        <div
          className={`${
            traits.unifiedControls ? "h-8" : "h-7"
          } px-2.5 rounded-[var(--radius-sm)] bg-primary text-primary-foreground text-xs font-medium flex items-center`}
        >
          Invite
        </div>
      </div>

      {/* Member List */}
      {traits.hairlineList ? (
        <div className="border-t border-border/60 divide-y divide-border/60">
          {members.map((m) => (
            <div
              key={m.name}
              className="py-2 flex items-center justify-between text-xs"
            >
              <span className="font-medium text-foreground">{m.name}</span>
              <span className="text-muted-foreground">{m.role}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {members.map((m) => (
            <div
              key={m.name}
              className="rounded-md border border-border/70 bg-card px-2.5 py-2 flex items-center justify-between text-xs shadow-2xs"
            >
              <span className="font-medium text-foreground">{m.name}</span>
              <span className="text-muted-foreground">{m.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BranchingCritiqueCanvas() {
  const [nodes, setNodes] = React.useState<CanvasNode[]>(INITIAL_NODES);
  const [selectedId, setSelectedId] = React.useState<string>("v3");
  const [customNote, setCustomNote] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Pan & zoom state
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(0.95);
  const draggingRef = React.useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-canvas-node]")) return;
    draggingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    setPan({
      x: draggingRef.current.originX + (e.clientX - draggingRef.current.startX),
      y: draggingRef.current.originY + (e.clientY - draggingRef.current.startY),
    });
  }

  function handlePointerUp() {
    draggingRef.current = null;
  }

  function handleBranch(traitKey: keyof FrameTraits, label: string) {
    const parent = selectedNode;
    const siblings = nodes.filter((n) => n.parentId === parent.id);
    const nextVersion = nodes.length + 1;
    const newId = `v${nextVersion}`;
    const yOffset = siblings.length === 0 ? 0 : siblings.length * 360;

    const newNode: CanvasNode = {
      id: newId,
      parentId: parent.id,
      label: `${newId} · ${label}`,
      critique: customNote.trim() || label,
      x: parent.x + 410,
      y: parent.y + yOffset,
      traits: {
        ...parent.traits,
        [traitKey]: !parent.traits[traitKey],
      },
      verdict: "neutral",
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedId(newId);
    setCustomNote("");
  }

  function setVerdict(id: string, verdict: FrameVerdict) {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, verdict: n.verdict === verdict ? "neutral" : verdict } : n
      )
    );
  }

  function handleReset() {
    setNodes(INITIAL_NODES);
    setSelectedId("v3");
    setPan({ x: 0, y: 0 });
    setZoom(0.95);
    setCustomNote("");
  }

  // Extract AGENTS.md rules from Kept vs Rejected delta
  const extractedRules = React.useMemo(() => {
    const kept = nodes.filter((n) => n.verdict === "keep");
    const rejected = nodes.filter((n) => n.verdict === "reject");

    const rules: string[] = [];

    for (const action of CRITIQUE_ACTIONS) {
      const anyKeptHasIt = kept.some((n) => n.traits[action.id]);
      const anyRejectedLacksIt =
        rejected.length === 0 || rejected.some((n) => !n.traits[action.id]);

      if (anyKeptHasIt && anyRejectedLacksIt) {
        rules.push(`- ${action.rule}`);
      }
    }

    if (rules.length === 0) {
      return `## Extracted Rules\n- Mark at least one frame as Keep and one as Reject to extract the delta.`;
    }

    return `## Extracted Rules (from ${kept.length} kept, ${rejected.length} rejected)\n${rules.join(
      "\n"
    )}`;
  }, [nodes]);

  async function handleCopyRules() {
    try {
      await navigator.clipboard.writeText(extractedRules);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="space-y-5 pb-28 md:pb-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to projects
          </Link>
          <h1 className="font-cooper text-2xl sm:text-3xl font-normal text-foreground">
            Branching critique canvas
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Branch UI iterations on a 2D canvas, mark Keep or Reject, and extract AGENTS.md rules from the difference.
          </p>
        </div>

        {/* Canvas Zoom / Reset Controls — unified size="sm" */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setZoom((z) => Math.max(0.55, +(z - 0.1).toFixed(2)))}
            aria-label="Zoom out"
          >
            <Icon icon={Minus} size="xs" />
          </Button>
          <span className="font-mono text-xs text-muted-foreground w-11 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setZoom((z) => Math.min(1.3, +(z + 0.1).toFixed(2)))}
            aria-label="Zoom in"
          >
            <Icon icon={Plus} size="xs" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
          >
            <Icon icon={RotateCcw} size="xs" />
            <span>Reset</span>
          </Button>
        </div>
      </header>

      {/* Branching Controls for Selected Frame — unified size="sm" */}
      <div className="flex flex-wrap items-center gap-2 border-t border-b border-border/60 py-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground mr-1">
          <Icon icon={GitBranch} size="xs" />
          Branch from {selectedNode.id}:
        </span>

        <div className="w-48">
          <Input
            size="sm"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Optional critique note..."
          />
        </div>

        {CRITIQUE_ACTIONS.map((action) => {
          const active = selectedNode.traits[action.id];
          return (
            <Button
              key={action.id}
              type="button"
              variant={active ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleBranch(action.id, action.label)}
            >
              <span>{active ? `Undo: ${action.label}` : action.label}</span>
            </Button>
          );
        })}
      </div>

      {/* 2D Pannable Canvas */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[520px] w-full overflow-hidden rounded-xl border border-border/70 bg-muted/25 cursor-grab active:cursor-grabbing touch-none"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* SVG Connector Lines */}
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width="2400"
            height="1600"
          >
            {nodes.map((node) => {
              if (!node.parentId) return null;
              const parent = nodes.find((p) => p.id === node.parentId);
              if (!parent) return null;

              const x1 = parent.x + FRAME_WIDTH;
              const y1 = parent.y + FRAME_HEIGHT_EST / 2;
              const x2 = node.x;
              const y2 = node.y + FRAME_HEIGHT_EST / 2;
              const cx = (x1 + x2) / 2;

              return (
                <path
                  key={`${parent.id}-${node.id}`}
                  d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="text-border"
                />
              );
            })}
          </svg>

          {/* Canvas Frame Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedId;
            return (
              <div
                key={node.id}
                data-canvas-node
                onClick={() => setSelectedId(node.id)}
                style={{
                  left: node.x,
                  top: node.y,
                  width: FRAME_WIDTH,
                }}
                className={`absolute rounded-xl border bg-card p-3.5 shadow-sm transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-ring border-ring"
                    : node.verdict === "keep"
                    ? "border-primary/60"
                    : node.verdict === "reject"
                    ? "border-destructive/50 opacity-85"
                    : "border-border/70"
                }`}
              >
                {/* Node Header */}
                <div className="flex items-center justify-between gap-2 pb-2.5">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {node.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {node.critique}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant={node.verdict === "keep" ? "default" : "ghost"}
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVerdict(node.id, "keep");
                      }}
                      aria-label="Mark frame as keep"
                    >
                      <Icon icon={ThumbsUp} size="xs" />
                    </Button>
                    <Button
                      type="button"
                      variant={
                        node.verdict === "reject" ? "destructive" : "ghost"
                      }
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVerdict(node.id, "reject");
                      }}
                      aria-label="Mark frame as reject"
                    >
                      <Icon icon={ThumbsDown} size="xs" />
                    </Button>
                  </div>
                </div>

                {/* Live Mini UI */}
                <MiniScreenPreview traits={node.traits} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Extracted AGENTS.md Rules Output */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between gap-2.5">
          <p className="text-xs font-mono text-muted-foreground">
            Extracted AGENTS.md rules (Keep vs. Reject delta)
          </p>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleCopyRules}
          >
            <Icon icon={copied ? Check : Copy} size="xs" />
            <span>{copied ? "Copied rules" : "Copy rules"}</span>
          </Button>
        </div>

        <pre className="rounded-[var(--radius)] bg-muted/50 border border-border/60 p-4 font-mono text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap overflow-x-auto">
          {extractedRules}
        </pre>
      </div>
    </div>
  );
}
