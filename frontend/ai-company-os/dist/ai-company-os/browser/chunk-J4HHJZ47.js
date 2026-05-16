import {
  RouterLink
} from "./chunk-SUHDIYMP.js";
import {
  ApiService
} from "./chunk-DUR3BCI7.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-I2DB5OAP.js";

// src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.timestamp;
function DashboardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 5);
  }
}
function DashboardComponent_Conditional_10_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 27);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 21);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const act_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("agent-" + act_r1.agentRole);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 6, act_r1.agentRole));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(act_r1.action);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(act_r1.details);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 8, act_r1.timestamp, "shortTime"));
  }
}
function DashboardComponent_Conditional_10_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1, "No agent activity yet. Submit a requirement to start.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275text(5, "Total Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7)(9, "div", 11);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 9);
    \u0275\u0275text(12, "Tasks Done");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 10);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 7)(16, "div", 12);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 9);
    \u0275\u0275text(19, "Team Members");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 10);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 7)(23, "div", 13);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 9);
    \u0275\u0275text(27, "Total Budget");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 7)(29, "div", 14);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 9);
    \u0275\u0275text(32, "Completion Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 15);
    \u0275\u0275element(34, "div", 16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 17)(36, "div", 18)(37, "div", 19);
    \u0275\u0275text(38, "Recent Agent Activity");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(39, DashboardComponent_Conditional_10_For_40_Template, 12, 11, "div", 20, _forTrack0);
    \u0275\u0275template(41, DashboardComponent_Conditional_10_Conditional_41_Template, 2, 0, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 18)(43, "div", 19);
    \u0275\u0275text(44, "Quick Actions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 22)(46, "a", 23);
    \u0275\u0275text(47, " \u25A4 \xA0 Create New Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "a", 24);
    \u0275\u0275text(49, " \u229E \xA0 Submit Business Requirement ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "a", 25);
    \u0275\u0275text(51, " \u25CE \xA0 Manage Team Resources ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "a", 26);
    \u0275\u0275text(53, " \u2B21 \xA0 Monitor AI Agents ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.stats.totalProjects);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.stats.activeProjects, " active");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.stats.completedTasks);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("of ", ctx_r1.stats.totalTasks, " total");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.stats.totalResources);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.stats.availableResources, " available");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(25, 11, ctx_r1.stats.totalBudget, "INR", "symbol-narrow", "1.0-0"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.completionRate, "%");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r1.completionRate, "%");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.stats.recentAgentActivity);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(41, !(ctx_r1.stats.recentAgentActivity == null ? null : ctx_r1.stats.recentAgentActivity.length) ? 41 : -1);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.api = inject(ApiService);
    this.stats = null;
    this.loading = true;
  }
  get completionRate() {
    if (!this.stats || this.stats.totalTasks === 0)
      return 0;
    return Math.round(this.stats.completedTasks / this.stats.totalTasks * 100);
  }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.loading = true;
    this.api.getDashboardStats().subscribe({
      next: (s) => {
        this.stats = s;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 2, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "page-body"], [1, "spinner"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-value", 2, "color", "#6366f1"], [1, "stat-label"], [1, "stat-change", "text-muted"], [1, "stat-value", 2, "color", "#22c55e"], [1, "stat-value", 2, "color", "#38bdf8"], [1, "stat-value", 2, "color", "#f59e0b"], [1, "stat-value"], [1, "progress", "mt-2"], [1, "progress-fill"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "16px"], [1, "card"], [1, "card-title"], [2, "padding", "8px 0", "border-bottom", "1px solid var(--border)", "display", "flex", "gap", "12px", "align-items", "flex-start"], [1, "text-muted", "text-sm"], [2, "display", "flex", "flex-direction", "column", "gap", "10px", "margin-top", "4px"], ["routerLink", "/projects", 1, "btn", "btn-ghost", 2, "justify-content", "flex-start"], ["routerLink", "/requirements", 1, "btn", "btn-ghost", 2, "justify-content", "flex-start"], ["routerLink", "/resources", 1, "btn", "btn-ghost", 2, "justify-content", "flex-start"], ["routerLink", "/agents", 1, "btn", "btn-ghost", 2, "justify-content", "flex-start"], [1, "badge", "badge-muted", 2, "flex-shrink", "0", "margin-top", "1px"], [2, "font-size", "13px"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Command Center");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5, "AI agents are managing your company in real time");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 3);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_6_listener() {
          return ctx.refresh();
        });
        \u0275\u0275text(7, "Refresh");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4);
        \u0275\u0275template(9, DashboardComponent_Conditional_9_Template, 1, 0, "div", 5)(10, DashboardComponent_Conditional_10_Template, 54, 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, ctx.loading ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.stats ? 10 : -1);
      }
    }, dependencies: [CommonModule, UpperCasePipe, CurrencyPipe, DatePipe, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\dashboard\\dashboard.component.ts", lineNumber: 91 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-J4HHJZ47.js.map
