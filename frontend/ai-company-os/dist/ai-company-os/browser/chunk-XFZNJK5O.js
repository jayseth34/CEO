import {
  SignalrService
} from "./chunk-WXCOL5SO.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BPRSKYVR.js";
import {
  ApiService
} from "./chunk-DUR3BCI7.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I2DB5OAP.js";

// src/app/features/agents/agents.component.ts
var _forTrack0 = ($index, $item) => $item.role;
var _forTrack1 = ($index, $item) => $item.id;
function AgentsComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24)(4, "div", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", a_r1.icon, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap("agent-" + a_r1.role);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.description);
  }
}
function AgentsComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 27)(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 20);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 20);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap("agent-" + log_r2.agentRole);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 9, log_r2.agentRole));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.levelBadge(log_r2.level));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(log_r2.level);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 11, log_r2.createdAt, "HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(log_r2.action);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r2.details);
  }
}
function AgentsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "No logs yet");
    \u0275\u0275elementEnd();
  }
}
function AgentsComponent_For_40_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "Rejected");
    \u0275\u0275elementEnd();
  }
}
function AgentsComponent_For_40_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function AgentsComponent_For_40_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.rejectDecision(d_r5.id));
    });
    \u0275\u0275text(1, "Reject");
    \u0275\u0275elementEnd();
  }
}
function AgentsComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 31)(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 32);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AgentsComponent_For_40_Conditional_10_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 34);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 20);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AgentsComponent_For_40_Conditional_16_Template, 2, 0, "button", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275classMap("agent-" + d_r5.agentRole);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 9, d_r5.agentRole));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r5.decisionType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 11, d_r5.confidenceScore * 100, "1.0-0"), "%");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, !d_r5.isApproved ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.rationale);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 14, d_r5.createdAt, "short"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(16, d_r5.isApproved ? 16 : -1);
  }
}
function AgentsComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "No decisions yet");
    \u0275\u0275elementEnd();
  }
}
var AgentsComponent = class _AgentsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.signalr = inject(SignalrService);
    this.logs = [];
    this.decisions = [];
    this.selectedRole = "";
    this.agentTypes = [
      { role: "ceo", icon: "\u{1F451}", label: "CEO Agent", description: "Parses requirements, sets strategy, generates tasks" },
      { role: "cto", icon: "\u2699\uFE0F", label: "CTO Agent", description: "Recommends tech stack, architecture, and risk" },
      { role: "pm", icon: "\u{1F4CB}", label: "PM Agent", description: "Assigns tasks to best-fit resources using scoring" },
      { role: "orchestrator", icon: "\u{1F504}", label: "Orchestrator", description: "Monitors workloads, deadlines, rebalances work" }
    ];
  }
  ngOnInit() {
    this.refresh();
    this.sub = this.signalr.events$.subscribe(() => this.loadLogs());
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  refresh() {
    this.loadLogs();
    this.loadDecisions();
  }
  loadLogs() {
    this.api.getAgentLogs(this.selectedRole || void 0, 50).subscribe((l) => this.logs = l);
  }
  loadDecisions() {
    this.api.getDecisions().subscribe((d) => this.decisions = d);
  }
  triggerRebalance() {
    this.api.triggerRebalance().subscribe(() => this.refresh());
  }
  rejectDecision(id) {
    this.api.approveDecision(id, false).subscribe(() => this.loadDecisions());
  }
  levelBadge(l) {
    return { "badge-danger": l === "error", "badge-warning": l === "warn", "badge-muted": l === "info" };
  }
  static {
    this.\u0275fac = function AgentsComponent_Factory(t) {
      return new (t || _AgentsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AgentsComponent, selectors: [["app-agents"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 42, vars: 3, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "flex", "gap-2"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "page-body"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "16px", "margin-bottom", "20px"], [1, "card", 2, "display", "flex", "gap", "12px", "align-items", "center"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "16px"], [1, "card"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "12px"], [1, "card-title", 2, "margin", "0"], [2, "width", "auto", "padding", "4px 8px", "font-size", "12px", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "ceo"], ["value", "cto"], ["value", "pm"], ["value", "orchestrator"], [2, "max-height", "400px", "overflow-y", "auto"], [2, "padding", "8px 0", "border-bottom", "1px solid var(--border)"], [1, "text-muted", "text-sm"], [1, "card-title"], [2, "padding", "10px 0", "border-bottom", "1px solid var(--border)"], [2, "width", "44px", "height", "44px", "border-radius", "50%", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "18px", "background", "var(--surface2)"], [2, "flex", "1"], [2, "font-weight", "600", "font-size", "14px"], [1, "status-dot", 2, "flex-shrink", "0"], [1, "flex", "items-center", "gap-2", 2, "margin-bottom", "2px"], [1, "badge", "badge-muted", 2, "font-size", "10px"], [1, "badge", 2, "font-size", "10px"], [2, "font-size", "12px", "font-weight", "500"], [1, "flex", "items-center", "gap-2", 2, "margin-bottom", "4px"], [1, "text-sm", 2, "color", "var(--success)"], [1, "badge", "badge-danger", 2, "font-size", "10px"], [1, "text-sm"], [1, "btn", "btn-danger", "btn-sm", 2, "margin-top", "6px"], [1, "btn", "btn-danger", "btn-sm", 2, "margin-top", "6px", 3, "click"]], template: function AgentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Agent Monitor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5, "Live activity from CEO, CTO, PM, and Orchestrator agents");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
        \u0275\u0275listener("click", function AgentsComponent_Template_button_click_7_listener() {
          return ctx.triggerRebalance();
        });
        \u0275\u0275text(8, "Trigger Rebalance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 4);
        \u0275\u0275listener("click", function AgentsComponent_Template_button_click_9_listener() {
          return ctx.refresh();
        });
        \u0275\u0275text(10, "Refresh");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 5)(12, "div", 6);
        \u0275\u0275repeaterCreate(13, AgentsComponent_For_14_Template, 9, 5, "div", 7, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 8)(16, "div", 9)(17, "div", 10)(18, "div", 11);
        \u0275\u0275text(19, "Agent Logs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "select", 12);
        \u0275\u0275twoWayListener("ngModelChange", function AgentsComponent_Template_select_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
          return $event;
        });
        \u0275\u0275listener("change", function AgentsComponent_Template_select_change_20_listener() {
          return ctx.loadLogs();
        });
        \u0275\u0275elementStart(21, "option", 13);
        \u0275\u0275text(22, "All agents");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "option", 14);
        \u0275\u0275text(24, "CEO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "option", 15);
        \u0275\u0275text(26, "CTO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "option", 16);
        \u0275\u0275text(28, "PM");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "option", 17);
        \u0275\u0275text(30, "Orchestrator");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "div", 18);
        \u0275\u0275repeaterCreate(32, AgentsComponent_For_33_Template, 14, 14, "div", 19, _forTrack1);
        \u0275\u0275template(34, AgentsComponent_Conditional_34_Template, 2, 0, "div", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "div", 9)(36, "div", 21);
        \u0275\u0275text(37, "AI Decisions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 18);
        \u0275\u0275repeaterCreate(39, AgentsComponent_For_40_Template, 17, 17, "div", 22, _forTrack1);
        \u0275\u0275template(41, AgentsComponent_Conditional_41_Template, 2, 0, "div", 20);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275repeater(ctx.agentTypes);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
        \u0275\u0275advance(12);
        \u0275\u0275repeater(ctx.logs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(34, !ctx.logs.length ? 34 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.decisions);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(41, !ctx.decisions.length ? 41 : -1);
      }
    }, dependencies: [CommonModule, UpperCasePipe, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AgentsComponent, { className: "AgentsComponent", filePath: "src\\app\\features\\agents\\agents.component.ts", lineNumber: 93 });
})();
export {
  AgentsComponent
};
//# sourceMappingURL=chunk-XFZNJK5O.js.map
