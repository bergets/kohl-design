"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, FileText, Layers } from "lucide-react";
import { cooper } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ArtifactLens = "journey" | "blueprint" | "stakeholder" | "ecosystem" | "archetypes" | "ost";
type EmotionLevel = "high" | "neutral" | "low";

interface EvidenceQuote {
  id: string;
  role: string;
  quote: string;
}

interface JourneyStage {
  id: string;
  name: string;
  action: string;
  emotion: EmotionLevel;
  emotionLabel: string;
  friction: string;
  opportunity: string;
  evidence: EvidenceQuote[];
}

interface BlueprintColumn {
  id: string;
  stage: string;
  physicalEvidence: string;
  customerAction: string;
  frontstage: string;
  backstage: string;
  supportSystem: string;
  failPoint?: string;
  waitTime?: string;
  evidence: EvidenceQuote[];
}

interface StakeholderActor {
  id: string;
  name: string;
  ring: "Core Users" | "Internal Operators" | "External Ecosystem";
  needs: string;
  controls: string;
  tension: string;
  evidence: EvidenceQuote[];
}

interface EcosystemFlow {
  id: string;
  source: string;
  target: string;
  flowType: "Data" | "Trust / Status" | "Approval" | "Money";
  mechanism: string;
  health: "automated" | "manual-workaround" | "broken-loop";
  note: string;
  evidence: EvidenceQuote[];
}

interface BehavioralArchetype {
  id: string;
  mode: string;
  trigger: string;
  constraint: string;
  preferredChannel: string;
  doneLooksLike: string;
  evidence: EvidenceQuote[];
}

interface OstOpportunity {
  id: string;
  title: string;
  evidenceSummary: string;
  solutions: {
    id: string;
    title: string;
    experiment: string;
  }[];
  evidence: EvidenceQuote[];
}

interface ResearchDataset {
  id: string;
  label: string;
  contextSentence: string;
  desiredOutcome: string;
  rawBullets: string[];
  journey: JourneyStage[];
  blueprint: BlueprintColumn[];
  stakeholders: StakeholderActor[];
  ecosystem: EcosystemFlow[];
  archetypes: BehavioralArchetype[];
  ost: OstOpportunity[];
}

const DATASETS: ResearchDataset[] = [
  {
    id: "clinic-intake",
    label: "Clinic intake",
    contextSentence:
      "Synthesized from 6 patient & nurse interviews — main drop-off occurs between referral confirmation and lab-result triage.",
    desiredOutcome: "Cut time-to-first-consultation from 9 days to under 48 hours",
    rawBullets: [
      "P1 said they didn't know if their referral actually arrived after submitting online.",
      "P2 called the front desk twice because the SMS link expired after 24 hours.",
      "P3 (nurse) manually copies PDF lab values from the regional portal into the EHR.",
      "P4 liked the evening video slot but got confused by the pre-visit fasting instructions.",
      "P5 waited 4 days for a callback when a single checkbox on the intake form was unclear.",
      "P6 (doctor) often discovers missing bloodwork only 5 minutes before the video call.",
    ],
    journey: [
      {
        id: "trigger",
        name: "1. Referral",
        action: "Receives GP referral and opens clinic booking link.",
        emotion: "neutral",
        emotionLabel: "Uncertain",
        friction: "No confirmation receipt after submitting symptoms.",
        opportunity: "Instant status tracker with expected response window.",
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "I hit submit and got a blank thank-you screen. I had no idea if anyone actually saw it.",
          },
        ],
      },
      {
        id: "intake",
        name: "2. Digital intake",
        action: "Fills out medical history and fasting prep questions.",
        emotion: "low",
        emotionLabel: "Frustrated",
        friction: "SMS auth link expires in 24h; medical jargon causes guesswork.",
        opportunity: "Persistent magic link + plain-language examples for prep.",
        evidence: [
          {
            id: "P2",
            role: "Patient, 51",
            quote: "The text link expired before I got home from work, so I had to call reception twice.",
          },
          {
            id: "P5",
            role: "Patient, 29",
            quote: "I guessed on one checkbox and it delayed my whole booking by four days.",
          },
        ],
      },
      {
        id: "waiting",
        name: "3. Triage & wait",
        action: "Waits for nurse review and lab-order clearance.",
        emotion: "low",
        emotionLabel: "Anxious",
        friction: "Black-box queue while nurse manually re-keys PDF labs.",
        opportunity: "Auto-flag missing labs at booking; surface queue position.",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
      {
        id: "consult",
        name: "4. Consultation",
        action: "Joins 20-minute video visit with specialist.",
        emotion: "high",
        emotionLabel: "Relieved",
        friction: "Clinician occasionally discovers missing bloodwork mid-call.",
        opportunity: "Pre-flight readiness check 24h before appointment.",
        evidence: [
          {
            id: "P4",
            role: "Patient, 42",
            quote: "Once I was on the video call it was great—I just wish I'd known to fast beforehand.",
          },
          {
            id: "P6",
            role: "Specialist MD",
            quote: "Finding out five minutes before a call that labs are missing wastes everyone's slot.",
          },
        ],
      },
      {
        id: "followup",
        name: "5. Follow-up",
        action: "Reads care plan and books follow-up lab draw.",
        emotion: "high",
        emotionLabel: "Confident",
        friction: "Care plan arrives as a dense PDF attachment.",
        opportunity: "Interactive 3-step checklist with direct lab booking.",
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "The doctor explained it well, then sent a four-page PDF I couldn't read on my phone.",
          },
        ],
      },
    ],
    blueprint: [
      {
        id: "bp-1",
        stage: "Referral & Auth",
        physicalEvidence: "SMS invite, browser intake form",
        customerAction: "Clicks SMS link and verifies identity",
        frontstage: "24h expiring link screen",
        backstage: "Reception manually re-sends expired links",
        supportSystem: "Auth token service (24h TTL)",
        failPoint: "Link expires before evening; triggers phone calls",
        waitTime: "1–2 days",
        evidence: [
          {
            id: "P2",
            role: "Patient, 51",
            quote: "The text link expired before I got home from work, so I had to call reception twice.",
          },
        ],
      },
      {
        id: "bp-2",
        stage: "Triage & Labs",
        physicalEvidence: "Blank confirmation page",
        customerAction: "Submits symptom questionnaire",
        frontstage: "Static 'We will contact you' message",
        backstage: "Nurse downloads regional PDF and re-keys into EHR",
        supportSystem: "Regional lab portal (no FHIR sync)",
        failPoint: "Manual copy-paste creates 4-day bottleneck",
        waitTime: "3–5 days",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
      {
        id: "bp-3",
        stage: "Pre-visit Prep",
        physicalEvidence: "Calendar invite email",
        customerAction: "Prepares for video consultation",
        frontstage: "Generic appointment reminder",
        backstage: "MD reviews chart 5 min before call",
        supportSystem: "EHR + Video scheduler",
        failPoint: "Missing bloodwork caught too late to reschedule",
        waitTime: "24 hours",
        evidence: [
          {
            id: "P6",
            role: "Specialist MD",
            quote: "Finding out five minutes before a call that labs are missing wastes everyone's slot.",
          },
        ],
      },
      {
        id: "bp-4",
        stage: "Consultation",
        physicalEvidence: "Video room + Care plan PDF",
        customerAction: "Attends visit and downloads summary",
        frontstage: "Specialist conducts 20m video consult",
        backstage: "Clinician dictates note into EHR template",
        supportSystem: "PDF generator & patient portal",
        evidence: [
          {
            id: "P4",
            role: "Patient, 42",
            quote: "Once I was on the video call it was great—I just wish I'd known to fast beforehand.",
          },
        ],
      },
    ],
    stakeholders: [
      {
        id: "st-patient",
        name: "Referred Patients",
        ring: "Core Users",
        needs: "Clarity on whether their referral is moving and what to prep.",
        controls: "Form completion, attendance, and follow-up compliance.",
        tension: "Anxious silence during 4-day triage triggers unnecessary support calls.",
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "I hit submit and got a blank thank-you screen. I had no idea if anyone actually saw it.",
          },
        ],
      },
      {
        id: "st-nurse",
        name: "Triage Nurses",
        ring: "Internal Operators",
        needs: "Clean, structured lab values without manual PDF transcription.",
        controls: "Queue prioritization and slot release.",
        tension: "Acting as human middleware between regional lab PDFs and the EHR.",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
      {
        id: "st-md",
        name: "Specialist Clinicians",
        ring: "Internal Operators",
        needs: "Complete bloodwork and fasting prep verified before the call.",
        controls: "Clinical decisions and follow-up orders.",
        tension: "Wasted 20-minute slots when prep or labs are incomplete.",
        evidence: [
          {
            id: "P6",
            role: "Specialist MD",
            quote: "Finding out five minutes before a call that labs are missing wastes everyone's slot.",
          },
        ],
      },
      {
        id: "st-lab",
        name: "Regional Lab Portal",
        ring: "External Ecosystem",
        needs: "Strict access controls and audit logging.",
        controls: "Diagnostic PDFs and turnaround times.",
        tension: "No automated API sync forces manual backstage workarounds.",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
    ],
    ecosystem: [
      {
        id: "eco-1",
        source: "Patient",
        target: "Clinic Intake Portal",
        flowType: "Data",
        mechanism: "24h expiring SMS magic link",
        health: "broken-loop",
        note: "Link expires before evening; patient receives no confirmation receipt.",
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "I hit submit and got a blank thank-you screen. I had no idea if anyone actually saw it.",
          },
          {
            id: "P2",
            role: "Patient, 51",
            quote: "The text link expired before I got home from work, so I had to call reception twice.",
          },
        ],
      },
      {
        id: "eco-2",
        source: "Regional Lab Portal",
        target: "Clinic EHR",
        flowType: "Data",
        mechanism: "Triage nurse downloads PDF & re-keys values",
        health: "manual-workaround",
        note: "Human middleware bottleneck adds 3–5 days of queue latency.",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
      {
        id: "eco-3",
        source: "Clinic EHR",
        target: "Patient",
        flowType: "Trust / Status",
        mechanism: "Static 'we will contact you' page",
        health: "broken-loop",
        note: "No queue position or prep reminder until 24h before call.",
        evidence: [
          {
            id: "P4",
            role: "Patient, 42",
            quote: "Once I was on the video call it was great—I just wish I'd known to fast beforehand.",
          },
        ],
      },
      {
        id: "eco-4",
        source: "Triage Nurse",
        target: "Specialist MD",
        flowType: "Approval",
        mechanism: "EHR slot release",
        health: "automated",
        note: "Works smoothly once labs are attached, but misses pre-visit fasting checks.",
        evidence: [
          {
            id: "P6",
            role: "Specialist MD",
            quote: "Finding out five minutes before a call that labs are missing wastes everyone's slot.",
          },
        ],
      },
    ],
    archetypes: [
      {
        id: "arch-1",
        mode: "Anxious First-Timer",
        trigger: "Receives unexpected specialist referral from GP",
        constraint: "Low tolerance for silence; worries referral was lost",
        preferredChannel: "SMS status updates with clear next-step timestamps",
        doneLooksLike: "Knows exact date, prep rules, and that labs arrived",
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "I hit submit and got a blank thank-you screen. I had no idea if anyone actually saw it.",
          },
          {
            id: "P5",
            role: "Patient, 29",
            quote: "I guessed on one checkbox and it delayed my whole booking by four days.",
          },
        ],
      },
      {
        id: "arch-2",
        mode: "After-Hours Commuter",
        trigger: "Opens clinic invite on the train or after work",
        constraint: "Can't call reception during 9–5; 24h links expire",
        preferredChannel: "Persistent mobile web link (no phone fallback)",
        doneLooksLike: "Completes intake in 3 minutes on mobile without calling",
        evidence: [
          {
            id: "P2",
            role: "Patient, 51",
            quote: "The text link expired before I got home from work, so I had to call reception twice.",
          },
          {
            id: "P1",
            role: "Patient, 34",
            quote: "The doctor explained it well, then sent a four-page PDF I couldn't read on my phone.",
          },
        ],
      },
      {
        id: "arch-3",
        mode: "Human Middleware Operator",
        trigger: "Starts morning triage shift with 40+ unverified referrals",
        constraint: "Disconnected regional lab portal forces manual PDF transcription",
        preferredChannel: "Structured EHR inbox with auto-parsed lab flags",
        doneLooksLike: "Approves ready charts in <60s without switching tabs",
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
        ],
      },
    ],
    ost: [
      {
        id: "ost-1",
        title: "Eliminate silent triage black holes",
        evidenceSummary: "Cited by 4 of 6 participants (P1, P2, P3, P5)",
        solutions: [
          {
            id: "sol-1",
            title: "Live 3-step referral tracker with SMS updates",
            experiment: "Send manual status SMS at intake + lab-clear for 20 patients; measure inbound call drop.",
          },
          {
            id: "sol-2",
            title: "Extend intake magic link TTL to 7 days with one-tap reissue",
            experiment: "A/B test 7-day token vs. 24h token on link-expiry support tickets.",
          },
        ],
        evidence: [
          {
            id: "P1",
            role: "Patient, 34",
            quote: "I hit submit and got a blank thank-you screen. I had no idea if anyone actually saw it.",
          },
          {
            id: "P2",
            role: "Patient, 51",
            quote: "The text link expired before I got home from work, so I had to call reception twice.",
          },
        ],
      },
      {
        id: "ost-2",
        title: "Automate lab & prep readiness before clinician review",
        evidenceSummary: "Cited by Triage Nurse & Specialist MD (P3, P4, P6)",
        solutions: [
          {
            id: "sol-3",
            title: "Structured PDF parser for regional lab uploads",
            experiment: "Shadow-run parser on 50 lab PDFs and compare nurse review time.",
          },
          {
            id: "sol-4",
            title: "48h pre-flight readiness check (fasting + labs verified)",
            experiment: "Trigger automated SMS checklist 48h prior; track no-prep cancellations.",
          },
        ],
        evidence: [
          {
            id: "P3",
            role: "Triage Nurse",
            quote: "I spend half my morning copying PDF lab numbers from the regional portal into our EHR.",
          },
          {
            id: "P6",
            role: "Specialist MD",
            quote: "Finding out five minutes before a call that labs are missing wastes everyone's slot.",
          },
        ],
      },
    ],
  },
  {
    id: "b2b-onboarding",
    label: "B2B onboarding",
    contextSentence:
      "Synthesized from 5 design-partner teams — workspace setup stalls at SSO & billing approval before first data import.",
    desiredOutcome: "Increase 14-day team activation from 38% to 65%",
    rawBullets: [
      "P1 (Design Lead) invited 6 teammates, but nobody could log in until IT approved SSO.",
      "P2 couldn't test sample data without entering a company credit card first.",
      "P3 (IT Admin) rejected the security questionnaire because SOC2 docs were buried in a footer link.",
      "P4 imported a CSV twice because there was no dry-run preview before writing to production.",
      "P5 loved the interactive template gallery once they finally got past the billing gate.",
    ],
    journey: [
      {
        id: "b-1",
        name: "1. Sign-up",
        action: "Creates workspace and invites 5 teammates.",
        emotion: "high",
        emotionLabel: "Excited",
        friction: "Teammates hit SSO lock before seeing any product value.",
        opportunity: "Allow read-only sandbox preview while IT reviews SSO.",
        evidence: [
          {
            id: "P1",
            role: "Design Lead",
            quote: "I invited my whole team, then everyone got blocked by an IT approval screen.",
          },
        ],
      },
      {
        id: "b-2",
        name: "2. Security & Billing",
        action: "Forwards SOC2 & card request to IT and Finance.",
        emotion: "low",
        emotionLabel: "Stalled",
        friction: "Billing gate blocks sample data; SOC2 packet is hard to find.",
        opportunity: "14-day sandbox without card + one-click Trust Center packet.",
        evidence: [
          {
            id: "P2",
            role: "Product Ops",
            quote: "I just wanted to test with dummy data, why do I need a corporate card on step two?",
          },
          {
            id: "P3",
            role: "IT Admin",
            quote: "I had to email support just to get your SOC2 report and data residency sheet.",
          },
        ],
      },
      {
        id: "b-3",
        name: "3. Data import",
        action: "Uploads CSV of existing projects.",
        emotion: "neutral",
        emotionLabel: "Cautious",
        friction: "No dry-run preview causes duplicate records.",
        opportunity: "Interactive column mapper with dry-run diff.",
        evidence: [
          {
            id: "P4",
            role: "Eng Manager",
            quote: "I uploaded our CSV twice because I couldn't tell if the first import actually worked.",
          },
        ],
      },
      {
        id: "b-4",
        name: "4. First value",
        action: "Picks a pre-configured template and shares with team.",
        emotion: "high",
        emotionLabel: "Delighted",
        friction: "Hidden behind earlier gates.",
        opportunity: "Lead with template gallery before account provisioning.",
        evidence: [
          {
            id: "P5",
            role: "Staff Designer",
            quote: "Once we got past the gates, the template gallery got us running in ten minutes.",
          },
        ],
      },
    ],
    blueprint: [
      {
        id: "bbp-1",
        stage: "Team Invite",
        physicalEvidence: "Invite email + SSO wall",
        customerAction: "Champion invites 5 teammates",
        frontstage: "Domain-locked SSO prompt",
        backstage: "IT Admin receives ad-hoc Slack/email ask",
        supportSystem: "Org domain matcher",
        failPoint: "Momentum dies while waiting 5 days for IT",
        waitTime: "3–7 days",
        evidence: [
          {
            id: "P1",
            role: "Design Lead",
            quote: "I invited my whole team, then everyone got blocked by an IT approval screen.",
          },
        ],
      },
      {
        id: "bbp-2",
        stage: "Trust & Card Gate",
        physicalEvidence: "Stripe checkout + footer link",
        customerAction: "Tries to load sample workspace",
        frontstage: "Credit card required modal",
        backstage: "Support manually emails SOC2 PDFs",
        supportSystem: "Billing entitlement check",
        failPoint: "Evaluator bounces before seeing core product",
        waitTime: "2–4 days",
        evidence: [
          {
            id: "P2",
            role: "Product Ops",
            quote: "I just wanted to test with dummy data, why do I need a corporate card on step two?",
          },
        ],
      },
      {
        id: "bbp-3",
        stage: "CSV Migration",
        physicalEvidence: "File upload modal",
        customerAction: "Imports existing project data",
        frontstage: "Spinner with no row preview",
        backstage: "Async worker writes rows silently",
        supportSystem: "Import queue",
        failPoint: "Silent async job triggers duplicate uploads",
        evidence: [
          {
            id: "P4",
            role: "Eng Manager",
            quote: "I uploaded our CSV twice because I couldn't tell if the first import actually worked.",
          },
        ],
      },
    ],
    stakeholders: [
      {
        id: "bst-champ",
        name: "Team Champion",
        ring: "Core Users",
        needs: "Fast proof-of-value to show leadership.",
        controls: "Tool selection and internal advocacy.",
        tension: "Loses credibility when invited teammates hit immediate walls.",
        evidence: [
          {
            id: "P1",
            role: "Design Lead",
            quote: "I invited my whole team, then everyone got blocked by an IT approval screen.",
          },
        ],
      },
      {
        id: "bst-it",
        name: "IT & Security",
        ring: "External Ecosystem",
        needs: "SOC2, GDPR, and SSO docs in one self-serve packet.",
        controls: "Domain-wide SSO approval.",
        tension: "Blocks rollout when security docs require back-and-forth emails.",
        evidence: [
          {
            id: "P3",
            role: "IT Admin",
            quote: "I had to email support just to get your SOC2 report and data residency sheet.",
          },
        ],
      },
      {
        id: "bst-support",
        name: "Solutions & Support",
        ring: "Internal Operators",
        needs: "Fewer manual SOC2 & duplicate-import cleanup tickets.",
        controls: "Manual workspace resets and trust packet emails.",
        tension: "Spending onboarding calls on avoidable admin friction.",
        evidence: [
          {
            id: "P4",
            role: "Eng Manager",
            quote: "I uploaded our CSV twice because I couldn't tell if the first import actually worked.",
          },
        ],
      },
    ],
    ecosystem: [
      {
        id: "beco-1",
        source: "Team Champion",
        target: "Invited Teammates",
        flowType: "Trust / Status",
        mechanism: "Domain-locked SSO wall",
        health: "broken-loop",
        note: "Teammates get invited but hit an immediate IT lock with zero preview.",
        evidence: [
          {
            id: "P1",
            role: "Design Lead",
            quote: "I invited my whole team, then everyone got blocked by an IT approval screen.",
          },
        ],
      },
      {
        id: "beco-2",
        source: "Solutions & Support",
        target: "IT & Security",
        flowType: "Approval",
        mechanism: "Ad-hoc email with SOC2 PDFs",
        health: "manual-workaround",
        note: "Manual email back-and-forth stalls rollout by 3–7 days.",
        evidence: [
          {
            id: "P3",
            role: "IT Admin",
            quote: "I had to email support just to get your SOC2 report and data residency sheet.",
          },
        ],
      },
      {
        id: "beco-3",
        source: "Product Ops",
        target: "Billing System",
        flowType: "Money",
        mechanism: "Corporate card gate before sample data",
        health: "broken-loop",
        note: "Evaluator bounces before seeing the template gallery.",
        evidence: [
          {
            id: "P2",
            role: "Product Ops",
            quote: "I just wanted to test with dummy data, why do I need a corporate card on step two?",
          },
        ],
      },
    ],
    archetypes: [
      {
        id: "barch-1",
        mode: "Internal Champion",
        trigger: "Needs a quick team win before Friday's product review",
        constraint: "Loses credibility if invited teammates hit a wall",
        preferredChannel: "Shareable template sandbox without SSO gate",
        doneLooksLike: "Team collaborates on a live template in 10 minutes",
        evidence: [
          {
            id: "P1",
            role: "Design Lead",
            quote: "I invited my whole team, then everyone got blocked by an IT approval screen.",
          },
          {
            id: "P5",
            role: "Staff Designer",
            quote: "Once we got past the gates, the template gallery got us running in ten minutes.",
          },
        ],
      },
      {
        id: "barch-2",
        mode: "Risk-Averse Gatekeeper",
        trigger: "Receives surprise Slack ping asking to approve SSO & billing",
        constraint: "Won't sign off without SOC2, DPA, and data residency proof",
        preferredChannel: "Self-serve Trust Center link",
        doneLooksLike: "Verifies compliance in 2 minutes without emailing support",
        evidence: [
          {
            id: "P3",
            role: "IT Admin",
            quote: "I had to email support just to get your SOC2 report and data residency sheet.",
          },
        ],
      },
    ],
    ost: [
      {
        id: "bost-1",
        title: "Let evaluators experience templates before procurement",
        evidenceSummary: "Cited by P1, P2, P5",
        solutions: [
          {
            id: "bsol-1",
            title: "Card-free 14-day sandbox seeded with sample data",
            experiment: "Remove card gate for <5 seats; measure Day-1 template adoption.",
          },
          {
            id: "bsol-2",
            title: "One-click 'Send Trust Packet to IT' button",
            experiment: "Bundle SOC2 + DPA into shareable link; track IT approval time.",
          },
        ],
        evidence: [
          {
            id: "P2",
            role: "Product Ops",
            quote: "I just wanted to test with dummy data, why do I need a corporate card on step two?",
          },
          {
            id: "P5",
            role: "Staff Designer",
            quote: "Once we got past the gates, the template gallery got us running in ten minutes.",
          },
        ],
      },
    ],
  },
];

function emotionToY(emotion: EmotionLevel): number {
  if (emotion === "high") return 18;
  if (emotion === "neutral") return 46;
  return 74;
}

function buildMarkdownExport(dataset: ResearchDataset, lens: ArtifactLens): string {
  if (lens === "journey") {
    const header = `| Stage | User Action | Emotion | Friction | Opportunity | Evidence |\n| --- | --- | --- | --- | --- | --- |`;
    const rows = dataset.journey.map(
      (s) =>
        `| ${s.name} | ${s.action} | ${s.emotionLabel} | ${s.friction} | ${s.opportunity} | ${s.evidence
          .map((e) => `${e.id}: "${e.quote}"`)
          .join(" / ")} |`
    );
    return `## Journey Map — ${dataset.label}\n\n${dataset.contextSentence}\n\n${header}\n${rows.join("\n")}`;
  }
  if (lens === "blueprint") {
    const header = `| Stage | Customer Action | Frontstage | Backstage | Support | Fail Point |\n| --- | --- | --- | --- | --- | --- |`;
    const rows = dataset.blueprint.map(
      (b) =>
        `| ${b.stage} | ${b.customerAction} | ${b.frontstage} | ${b.backstage} | ${b.supportSystem} | ${b.failPoint ?? "—"} |`
    );
    return `## Service Blueprint — ${dataset.label}\n\n${header}\n${rows.join("\n")}`;
  }
  if (lens === "stakeholder") {
    const rows = dataset.stakeholders.map(
      (s) =>
        `- **${s.name}** (${s.ring})\n  - Needs: ${s.needs}\n  - Controls: ${s.controls}\n  - Tension: ${s.tension}`
    );
    return `## Stakeholder Map — ${dataset.label}\n\n${rows.join("\n")}`;
  }
  if (lens === "ecosystem") {
    const header = `| Source | Target | Flow Type | Mechanism | Health | Note |\n| --- | --- | --- | --- | --- | --- |`;
    const rows = dataset.ecosystem.map(
      (f) => `| ${f.source} | ${f.target} | ${f.flowType} | ${f.mechanism} | ${f.health} | ${f.note} |`
    );
    return `## Ecosystem / Value Flow Map — ${dataset.label}\n\n${header}\n${rows.join("\n")}`;
  }
  if (lens === "archetypes") {
    const rows = dataset.archetypes.map(
      (a) =>
        `- **${a.mode}**\n  - Trigger: ${a.trigger}\n  - Constraint: ${a.constraint}\n  - Preferred channel: ${a.preferredChannel}\n  - Done looks like: ${a.doneLooksLike}`
    );
    return `## Behavioral Archetypes — ${dataset.label}\n\n${rows.join("\n")}`;
  }
  const branches = dataset.ost.map(
    (o) =>
      `### Opportunity: ${o.title} (${o.evidenceSummary})\n${o.solutions
        .map((sol) => `- **Solution:** ${sol.title}\n  - *Experiment:* ${sol.experiment}`)
        .join("\n")}`
  );
  return `## Opportunity Solution Tree — ${dataset.label}\n\n**Desired Outcome:** ${dataset.desiredOutcome}\n\n${branches.join("\n\n")}`;
}

export function ResearchArtifactsWorkbench() {
  const [datasetId, setDatasetId] = React.useState<string>(DATASETS[0].id);
  const [lens, setLens] = React.useState<ArtifactLens>("journey");
  const [showRaw, setShowRaw] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>(DATASETS[0].journey[1].id);
  const [copied, setCopied] = React.useState(false);

  const dataset = React.useMemo(
    () => DATASETS.find((d) => d.id === datasetId) ?? DATASETS[0],
    [datasetId]
  );

  React.useEffect(() => {
    if (lens === "journey") setSelectedId(dataset.journey[1]?.id ?? dataset.journey[0].id);
    if (lens === "blueprint") setSelectedId(dataset.blueprint[1]?.id ?? dataset.blueprint[0].id);
    if (lens === "stakeholder") setSelectedId(dataset.stakeholders[0].id);
    if (lens === "ecosystem") setSelectedId(dataset.ecosystem[0].id);
    if (lens === "archetypes") setSelectedId(dataset.archetypes[0].id);
    if (lens === "ost") setSelectedId(dataset.ost[0].id);
  }, [dataset, lens]);

  const activeEvidence: EvidenceQuote[] = React.useMemo(() => {
    if (lens === "journey") {
      return dataset.journey.find((s) => s.id === selectedId)?.evidence ?? dataset.journey[0].evidence;
    }
    if (lens === "blueprint") {
      return dataset.blueprint.find((b) => b.id === selectedId)?.evidence ?? dataset.blueprint[0].evidence;
    }
    if (lens === "stakeholder") {
      return dataset.stakeholders.find((s) => s.id === selectedId)?.evidence ?? dataset.stakeholders[0].evidence;
    }
    if (lens === "ecosystem") {
      return dataset.ecosystem.find((f) => f.id === selectedId)?.evidence ?? dataset.ecosystem[0].evidence;
    }
    if (lens === "archetypes") {
      return dataset.archetypes.find((a) => a.id === selectedId)?.evidence ?? dataset.archetypes[0].evidence;
    }
    return dataset.ost.find((o) => o.id === selectedId)?.evidence ?? dataset.ost[0].evidence;
  }, [dataset, lens, selectedId]);

  const activeSelectionTitle = React.useMemo(() => {
    if (lens === "journey") {
      return dataset.journey.find((s) => s.id === selectedId)?.name ?? dataset.journey[0].name;
    }
    if (lens === "blueprint") {
      return dataset.blueprint.find((b) => b.id === selectedId)?.stage ?? dataset.blueprint[0].stage;
    }
    if (lens === "stakeholder") {
      return dataset.stakeholders.find((s) => s.id === selectedId)?.name ?? dataset.stakeholders[0].name;
    }
    if (lens === "ecosystem") {
      const flow = dataset.ecosystem.find((f) => f.id === selectedId) ?? dataset.ecosystem[0];
      return `${flow.source} → ${flow.target}`;
    }
    if (lens === "archetypes") {
      return dataset.archetypes.find((a) => a.id === selectedId)?.mode ?? dataset.archetypes[0].mode;
    }
    return dataset.ost.find((o) => o.id === selectedId)?.title ?? dataset.ost[0].title;
  }, [dataset, lens, selectedId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildMarkdownExport(dataset, lens));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Playground
            </Link>
            <span>/</span>
            <span className="text-foreground">Research artifacts</span>
          </div>
          <h1 className={cn(cooper.className, "text-2xl sm:text-3xl font-normal text-foreground")}>
            Research artifacts
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Turn raw qualitative interviews into service design artifacts instead of markdown bullet walls.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {DATASETS.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={dataset.id === item.id ? "default" : "outline"}
              onClick={() => setDatasetId(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Context Sentence */}
      <p className="text-sm text-foreground">
        {dataset.contextSentence}
      </p>

      {/* Unified Control Bar (all controls strictly size="sm") */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={lens} onValueChange={(v) => setLens(v as ArtifactLens)}>
          <TabsList size="sm" variant="default" className="flex-wrap h-auto sm:h-8">
            <TabsTrigger value="journey">Journey map</TabsTrigger>
            <TabsTrigger value="blueprint">Service blueprint</TabsTrigger>
            <TabsTrigger value="stakeholder">Stakeholder map</TabsTrigger>
            <TabsTrigger value="ecosystem">Ecosystem flow</TabsTrigger>
            <TabsTrigger value="archetypes">Archetypes</TabsTrigger>
            <TabsTrigger value="ost">Opportunity tree</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant={showRaw ? "secondary" : "outline"}
            onClick={() => setShowRaw((prev) => !prev)}
          >
            <FileText />
            {showRaw ? "Hide raw notes" : "Compare raw notes"}
          </Button>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy artifact"}
          </Button>
        </div>
      </div>

      {/* Main Split: Optional Raw Bullet Wall + Primary Service Design Artifact */}
      <div className={cn("grid gap-6", showRaw ? "lg:grid-cols-[320px_1fr]" : "grid-cols-1")}>
        {showRaw && (
          <div className="rounded-[var(--radius)] border border-border/70 bg-muted/40 p-5 space-y-3 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Typical LLM bullet summary
              </span>
              <span className="text-xs text-muted-foreground">Before</span>
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed list-disc pl-4">
              {dataset.rawBullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Primary Focal Surface */}
        <Card variant="default" className="p-0 overflow-hidden gap-0">
          {lens === "journey" && (
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                {/* Emotion Curve SVG */}
                <div className="px-5 pt-5 pb-3 border-b border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Emotional curve across stages</span>
                    <span>Click any stage to inspect evidence</span>
                  </div>
                  <svg
                    viewBox={`0 0 ${dataset.journey.length * 200} 92`}
                    className="w-full h-20 overflow-visible"
                    aria-label="User emotion curve across journey stages"
                  >
                    <line
                      x1="0"
                      y1="46"
                      x2={dataset.journey.length * 200}
                      y2="46"
                      className="stroke-border"
                      strokeDasharray="4 4"
                    />
                    <polyline
                      fill="none"
                      className="stroke-primary"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={dataset.journey
                        .map((s, i) => `${i * 200 + 100},${emotionToY(s.emotion)}`)
                        .join(" ")}
                    />
                    {dataset.journey.map((s, i) => {
                      const cx = i * 200 + 100;
                      const cy = emotionToY(s.emotion);
                      const isSelected = s.id === selectedId;
                      return (
                        <g
                          key={s.id}
                          className="cursor-pointer"
                          onClick={() => setSelectedId(s.id)}
                        >
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isSelected ? 7 : 5}
                            className={cn(
                              "transition-all",
                              s.emotion === "low"
                                ? "fill-crimson-500 stroke-background"
                                : "fill-primary stroke-background"
                            )}
                            strokeWidth="2"
                          />
                          <text
                            x={cx}
                            y={cy - 11}
                            textAnchor="middle"
                            className="fill-muted-foreground text-[11px] font-sans"
                          >
                            {s.emotionLabel}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Stages Grid */}
                <div
                  className="grid divide-x divide-border/60"
                  style={{ gridTemplateColumns: `repeat(${dataset.journey.length}, minmax(0, 1fr))` }}
                >
                  {dataset.journey.map((stage) => {
                    const isSelected = stage.id === selectedId;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setSelectedId(stage.id)}
                        className={cn(
                          "text-left p-4 space-y-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
                          isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-foreground">{stage.name}</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {stage.action}
                          </p>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-border/50">
                          <div className="text-xs font-medium text-crimson-600 dark:text-crimson-300">
                            Friction
                          </div>
                          <p className="text-xs text-foreground/90 leading-relaxed">
                            {stage.friction}
                          </p>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-border/50">
                          <div className="text-xs font-medium text-primary">Opportunity</div>
                          <p className="text-xs text-foreground/90 leading-relaxed">
                            {stage.opportunity}
                          </p>
                        </div>

                        <div className="pt-1 text-xs text-muted-foreground">
                          {stage.evidence.map((e) => e.id).join(", ")}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {lens === "blueprint" && (
            <div className="overflow-x-auto">
              <div className="min-w-[760px] divide-y divide-border/60">
                {/* Column Headers */}
                <div
                  className="grid bg-muted/20"
                  style={{
                    gridTemplateColumns: `160px repeat(${dataset.blueprint.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="p-3.5 text-xs font-medium text-muted-foreground">
                    Service layer
                  </div>
                  {dataset.blueprint.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedId(col.id)}
                      className={cn(
                        "p-3.5 text-left border-l border-border/60 transition-colors cursor-pointer",
                        col.id === selectedId ? "bg-primary/5" : "hover:bg-muted/30"
                      )}
                    >
                      <div className="text-sm font-semibold text-foreground">{col.stage}</div>
                      {col.waitTime && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Wait: {col.waitTime}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Physical Evidence & Customer Action */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `160px repeat(${dataset.blueprint.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="p-3.5 text-xs font-medium text-foreground bg-muted/10">
                    Customer action
                  </div>
                  {dataset.blueprint.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => setSelectedId(col.id)}
                      className={cn(
                        "p-3.5 text-xs text-foreground/90 border-l border-border/60 cursor-pointer space-y-1",
                        col.id === selectedId && "bg-primary/5"
                      )}
                    >
                      <p>{col.customerAction}</p>
                      <p className="text-muted-foreground">Touchpoint: {col.physicalEvidence}</p>
                    </div>
                  ))}
                </div>

                {/* Line of Interaction */}
                <div className="px-3.5 py-1.5 bg-muted/30 text-xs text-muted-foreground border-y border-dashed border-border">
                  Line of interaction
                </div>

                {/* Frontstage */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `160px repeat(${dataset.blueprint.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="p-3.5 text-xs font-medium text-foreground bg-muted/10">
                    Frontstage
                  </div>
                  {dataset.blueprint.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => setSelectedId(col.id)}
                      className={cn(
                        "p-3.5 text-xs text-foreground/90 border-l border-border/60 cursor-pointer",
                        col.id === selectedId && "bg-primary/5"
                      )}
                    >
                      {col.frontstage}
                    </div>
                  ))}
                </div>

                {/* Line of Visibility */}
                <div className="px-3.5 py-1.5 bg-muted/30 text-xs text-muted-foreground border-y border-dashed border-border">
                  Line of visibility
                </div>

                {/* Backstage */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `160px repeat(${dataset.blueprint.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="p-3.5 text-xs font-medium text-foreground bg-muted/10">
                    Backstage
                  </div>
                  {dataset.blueprint.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => setSelectedId(col.id)}
                      className={cn(
                        "p-3.5 text-xs border-l border-border/60 cursor-pointer space-y-1.5",
                        col.id === selectedId && "bg-primary/5"
                      )}
                    >
                      <p className="text-foreground/90">{col.backstage}</p>
                      {col.failPoint && (
                        <p className="text-crimson-600 dark:text-crimson-300 font-medium">
                          Fail point: {col.failPoint}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Support Systems */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `160px repeat(${dataset.blueprint.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="p-3.5 text-xs font-medium text-foreground bg-muted/10">
                    Support systems
                  </div>
                  {dataset.blueprint.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => setSelectedId(col.id)}
                      className={cn(
                        "p-3.5 text-xs text-muted-foreground border-l border-border/60 cursor-pointer",
                        col.id === selectedId && "bg-primary/5"
                      )}
                    >
                      {col.supportSystem}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {lens === "stakeholder" && (
            <div className="divide-y divide-border/60">
              {dataset.stakeholders.map((actor) => {
                const isSelected = actor.id === selectedId;
                return (
                  <button
                    key={actor.id}
                    type="button"
                    onClick={() => setSelectedId(actor.id)}
                    className={cn(
                      "w-full text-left p-5 grid gap-4 sm:grid-cols-[200px_1fr_1fr] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">{actor.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{actor.ring}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-foreground">Needs & controls</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{actor.needs}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Controls: {actor.controls}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-crimson-600 dark:text-crimson-300">
                        Key tension
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed">{actor.tension}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {lens === "ecosystem" && (
            <div className="divide-y divide-border/60">
              {dataset.ecosystem.map((flow) => {
                const isSelected = flow.id === selectedId;
                const healthLabel =
                  flow.health === "broken-loop"
                    ? "Broken loop"
                    : flow.health === "manual-workaround"
                      ? "Manual workaround"
                      : "Automated";
                return (
                  <button
                    key={flow.id}
                    type="button"
                    onClick={() => setSelectedId(flow.id)}
                    className={cn(
                      "w-full text-left p-5 grid gap-4 sm:grid-cols-[240px_1fr_160px] items-start transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground flex-wrap">
                        <span>{flow.source}</span>
                        <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                        <span>{flow.target}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{flow.flowType}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-medium text-foreground">{flow.mechanism}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{flow.note}</p>
                    </div>

                    <div className="sm:text-right">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          flow.health === "automated"
                            ? "text-primary"
                            : "text-crimson-600 dark:text-crimson-300"
                        )}
                      >
                        {healthLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {lens === "archetypes" && (
            <div className="divide-y divide-border/60">
              {dataset.archetypes.map((arch) => {
                const isSelected = arch.id === selectedId;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => setSelectedId(arch.id)}
                    className={cn(
                      "w-full text-left p-5 grid gap-4 sm:grid-cols-[200px_1fr_1fr] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-foreground">{arch.mode}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        Trigger: {arch.trigger}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-crimson-600 dark:text-crimson-300">
                        Constraint
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed">{arch.constraint}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-primary">
                        Channel &amp; done state
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {arch.preferredChannel}
                      </p>
                      <p className="text-xs text-foreground/90 leading-relaxed">
                        Done: {arch.doneLooksLike}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {lens === "ost" && (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Desired Outcome Root */}
              <div className="pb-4 border-b border-border/60">
                <div className="text-xs text-muted-foreground">Desired outcome</div>
                <div className="text-base font-semibold text-foreground mt-1">
                  {dataset.desiredOutcome}
                </div>
              </div>

              {/* Opportunity Branches */}
              <div className="divide-y divide-border/60">
                {dataset.ost.map((opp) => {
                  const isSelected = opp.id === selectedId;
                  return (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedId(opp.id)}
                      className={cn(
                        "py-5 first:pt-0 last:pb-0 space-y-4 cursor-pointer rounded-[var(--radius-sm)] transition-colors",
                        isSelected && "bg-primary/[0.03] -mx-3 px-3"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="text-sm font-semibold text-foreground">{opp.title}</div>
                        <div className="text-xs text-muted-foreground">{opp.evidenceSummary}</div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 pl-4 border-l border-border">
                        {opp.solutions.map((sol) => (
                          <div
                            key={sol.id}
                            className="p-3.5 rounded-[var(--radius-sm)] border border-border/70 bg-background space-y-1.5"
                          >
                            <div className="text-xs font-medium text-foreground">{sol.title}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Experiment: {sol.experiment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Grounded Evidence Footer Strip */}
      <div className="border-t border-border/60 pt-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Layers className="size-3.5" />
          <span>
            Grounded evidence for <span className="text-foreground font-medium">{activeSelectionTitle}</span>
          </span>
        </div>
        <div className="divide-y divide-border/60">
          {activeEvidence.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="text-xs font-medium text-foreground shrink-0 w-32">
                {item.id} · {item.role}
              </span>
              <p className="text-sm text-muted-foreground italic">“{item.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
