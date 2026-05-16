import {
  ActivatedRoute
} from "./chunk-SUHDIYMP.js";
import {
  DefaultValueAccessor,
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
  SlicePipe,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I2DB5OAP.js";

// src/app/features/requirements/requirements.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.title;
function RequirementsComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
function RequirementsComponent_Conditional_27_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(task_r2.agentRole);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.priorityBadge(task_r2.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r2.priority);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", task_r2.estimatedHours, "h");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.title);
  }
}
function RequirementsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 6);
    \u0275\u0275text(2, "CEO Agent Response");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, RequirementsComponent_Conditional_27_For_6_Template, 10, 6, "div", 17, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.result.tasksGenerated, " tasks generated \u2014 ", ctx_r2.result.summary, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.result.tasks);
  }
}
function RequirementsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Select a project to see its requirements");
    \u0275\u0275elementEnd();
  }
}
function RequirementsComponent_For_33_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const req_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(req_r4.parsedSummary);
  }
}
function RequirementsComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 22)(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "slice");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, RequirementsComponent_For_33_Conditional_10_Template, 2, 1, "div", 14);
    \u0275\u0275elementStart(11, "div", 24);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const req_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275classMap(req_r4.status === "tasked" ? "badge-success" : "badge-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(req_r4.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 8, req_r4.createdAt, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(' "', \u0275\u0275pipeBind3(9, 11, req_r4.rawText, 0, 120), "", req_r4.rawText.length > 120 ? "..." : "", '" ');
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, req_r4.parsedSummary ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", req_r4.tasksGenerated, " tasks generated");
  }
}
function RequirementsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "No requirements submitted yet for this project");
    \u0275\u0275elementEnd();
  }
}
var RequirementsComponent = class _RequirementsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.route = inject(ActivatedRoute);
    this.projects = [];
    this.requirements = [];
    this.submitting = false;
    this.result = null;
    this.form = { projectId: "", rawText: "" };
  }
  ngOnInit() {
    this.api.getProjects().subscribe((p) => {
      this.projects = p;
      const preselect = this.route.snapshot.queryParamMap.get("projectId");
      if (preselect) {
        this.form.projectId = preselect;
        this.loadRequirements();
      }
    });
  }
  submit() {
    if (!this.form.projectId || !this.form.rawText.trim())
      return;
    this.submitting = true;
    this.result = null;
    this.api.submitRequirement(this.form.projectId, this.form.rawText).subscribe({
      next: (res) => {
        this.result = res;
        this.submitting = false;
        this.form.rawText = "";
        this.loadRequirements();
      },
      error: () => {
        this.submitting = false;
      }
    });
  }
  loadRequirements() {
    if (!this.form.projectId)
      return;
    this.api.getRequirements(this.form.projectId).subscribe((r) => this.requirements = r);
  }
  priorityBadge(p) {
    return { "badge-danger": p === "critical", "badge-warning": p === "high", "badge-accent": p === "medium", "badge-muted": p === "low" };
  }
  static {
    this.\u0275fac = function RequirementsComponent_Factory(t) {
      return new (t || _RequirementsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RequirementsComponent, selectors: [["app-requirements"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 35, vars: 7, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "page-body"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "20px"], [1, "card", 2, "margin-bottom", "16px"], [1, "card-title"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["rows", "6", "placeholder", "Describe what you need in plain language. Example: Build us a food delivery app with real-time tracking, restaurant management portal, and payment integration. Budget \u20B920L, deadline 3 months.", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 2, "width", "100%", 3, "click", "disabled"], [1, "card"], [1, "text-muted", "text-sm"], [2, "padding", "12px 0", "border-bottom", "1px solid var(--border)"], [1, "alert", "alert-info", 2, "margin-bottom", "12px"], [2, "padding", "8px 0", "border-bottom", "1px solid var(--border)"], [2, "display", "flex", "gap", "8px", "align-items", "center", "margin-bottom", "2px"], [1, "badge", "badge-muted"], [1, "badge"], [2, "font-size", "13px", "font-weight", "500"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-sm", 2, "color", "var(--text)", "margin-bottom", "4px", "font-style", "italic"], [1, "text-muted", "text-sm", 2, "margin-top", "4px"]], template: function RequirementsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Requirements");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5, "Submit business requirements \u2014 CEO agent breaks them into tasks");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "div")(9, "div", 5)(10, "div", 6);
        \u0275\u0275text(11, "Submit New Requirement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7)(13, "label");
        \u0275\u0275text(14, "Project");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function RequirementsComponent_Template_select_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.projectId, $event) || (ctx.form.projectId = $event);
          return $event;
        });
        \u0275\u0275elementStart(16, "option", 9);
        \u0275\u0275text(17, "Select project...");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(18, RequirementsComponent_For_19_Template, 2, 2, "option", 10, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 7)(21, "label");
        \u0275\u0275text(22, "Business Requirement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "textarea", 11);
        \u0275\u0275twoWayListener("ngModelChange", function RequirementsComponent_Template_textarea_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.rawText, $event) || (ctx.form.rawText = $event);
          return $event;
        });
        \u0275\u0275text(24, "              ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "button", 12);
        \u0275\u0275listener("click", function RequirementsComponent_Template_button_click_25_listener() {
          return ctx.submit();
        });
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, RequirementsComponent_Conditional_27_Template, 7, 2, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 13)(29, "div", 6);
        \u0275\u0275text(30, "Requirement History");
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, RequirementsComponent_Conditional_31_Template, 2, 0, "div", 14);
        \u0275\u0275repeaterCreate(32, RequirementsComponent_For_33_Template, 13, 15, "div", 15, _forTrack0);
        \u0275\u0275template(34, RequirementsComponent_Conditional_34_Template, 2, 0, "div", 14);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.projectId);
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.projects);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.rawText);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.submitting || !ctx.form.projectId || !ctx.form.rawText);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting ? "CEO Agent is parsing..." : "Submit to CEO Agent", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(27, ctx.result ? 27 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(31, !ctx.form.projectId ? 31 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.requirements);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(34, !ctx.requirements.length && ctx.form.projectId ? 34 : -1);
      }
    }, dependencies: [CommonModule, SlicePipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RequirementsComponent, { className: "RequirementsComponent", filePath: "src\\app\\features\\requirements\\requirements.component.ts", lineNumber: 92 });
})();
export {
  RequirementsComponent
};
//# sourceMappingURL=chunk-AZUISSBR.js.map
