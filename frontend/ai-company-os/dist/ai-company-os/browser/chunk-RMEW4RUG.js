import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BPRSKYVR.js";
import {
  ApiService
} from "./chunk-DUR3BCI7.js";
import {
  CommonModule,
  DecimalPipe,
  __spreadProps,
  __spreadValues,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I2DB5OAP.js";

// src/app/features/resources/resources.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ResourcesComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 5);
  }
}
function ResourcesComponent_For_30_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(skill_r1);
  }
}
function ResourcesComponent_For_30_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", r_r2.skills.length - 4, "");
  }
}
function ResourcesComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 10);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "div", 11);
    \u0275\u0275repeaterCreate(13, ResourcesComponent_For_30_For_14_Template, 2, 1, "span", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(15, ResourcesComponent_For_30_Conditional_15_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 13)(17, "div", 14)(18, "div", 15);
    \u0275\u0275element(19, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 17);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "td")(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td")(27, "span", 18);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.role);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.agentType);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(r_r2.skills.slice(0, 4));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(15, r_r2.skills.length > 4 ? 15 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", r_r2.currentLoad / r_r2.maxLoad * 100, "%");
    \u0275\u0275classProp("overloaded", r_r2.currentLoad >= r_r2.maxLoad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r2.currentLoad, "/", r_r2.maxLoad, "");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.scoreColor(r_r2.performanceScore));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 17, r_r2.performanceScore, "1.1-1"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(r_r2.isAvailable && r_r2.currentLoad < r_r2.maxLoad ? "badge-success" : "badge-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r2.isAvailable && r_r2.currentLoad < r_r2.maxLoad ? "Available" : "Busy", " ");
  }
}
function ResourcesComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function ResourcesComponent_Conditional_31_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r2.showModal = false));
    });
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21);
    \u0275\u0275text(3, "Add Team Member");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 22)(5, "div", 23)(6, "label");
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.name, $event) || (ctx_r2.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 23)(10, "label");
    \u0275\u0275text(11, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.email, $event) || (ctx_r2.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 22)(14, "div", 23)(15, "label");
    \u0275\u0275text(16, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.role, $event) || (ctx_r2.form.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 26);
    \u0275\u0275text(19, "Developer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 27);
    \u0275\u0275text(21, "Designer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 28);
    \u0275\u0275text(23, "QA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 29);
    \u0275\u0275text(25, "DevOps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 30);
    \u0275\u0275text(27, "PM");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 23)(29, "label");
    \u0275\u0275text(30, "Agent Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.agentType, $event) || (ctx_r2.form.agentType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(32, "option", 31);
    \u0275\u0275text(33, "Worker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 32);
    \u0275\u0275text(35, "Manager");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 33);
    \u0275\u0275text(37, "CTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 34);
    \u0275\u0275text(39, "CEO");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 23)(41, "label");
    \u0275\u0275text(42, "Skills (comma-separated)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.skillsInput, $event) || (ctx_r2.skillsInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 22)(45, "div", 23)(46, "label");
    \u0275\u0275text(47, "Max Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.maxLoad, $event) || (ctx_r2.form.maxLoad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 23)(50, "label");
    \u0275\u0275text(51, "Hourly Rate (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ResourcesComponent_Conditional_31_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.hourlyRate, $event) || (ctx_r2.form.hourlyRate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 37)(54, "button", 38);
    \u0275\u0275listener("click", function ResourcesComponent_Conditional_31_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showModal = false);
    });
    \u0275\u0275text(55, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 39);
    \u0275\u0275listener("click", function ResourcesComponent_Conditional_31_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.create());
    });
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.email);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.role);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.agentType);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.skillsInput);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.maxLoad);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.hourlyRate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving ? "Adding..." : "Add Member", " ");
  }
}
var ResourcesComponent = class _ResourcesComponent {
  constructor() {
    this.api = inject(ApiService);
    this.resources = [];
    this.loading = true;
    this.showModal = false;
    this.saving = false;
    this.skillsInput = "";
    this.form = { name: "", email: "", role: "developer", agentType: "worker", maxLoad: 5, hourlyRate: 0 };
  }
  ngOnInit() {
    this.api.getResources().subscribe({ next: (r) => {
      this.resources = r;
      this.loading = false;
    }, error: () => {
      this.loading = false;
    } });
  }
  create() {
    if (!this.form.name)
      return;
    this.saving = true;
    const skills = this.skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
    this.api.createResource(__spreadProps(__spreadValues({}, this.form), { skills })).subscribe({
      next: (r) => {
        this.resources.push(r);
        this.showModal = false;
        this.saving = false;
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  scoreColor(s) {
    return s >= 0.8 ? "priority-medium" : s >= 0.5 ? "priority-high" : "priority-critical";
  }
  static {
    this.\u0275fac = function ResourcesComponent_Factory(t) {
      return new (t || _ResourcesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResourcesComponent, selectors: [["app-resources"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 3, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn", "btn-primary", 3, "click"], [1, "page-body"], [1, "spinner"], [1, "table-wrap", "card"], [1, "modal-backdrop"], [2, "font-weight", "500"], [1, "text-muted", "text-sm"], [1, "badge", "badge-accent"], [2, "display", "flex", "gap", "4px", "flex-wrap", "wrap", "max-width", "200px"], [1, "badge", "badge-muted", 2, "font-size", "10px"], [2, "min-width", "140px"], [1, "flex", "items-center", "gap-2"], [1, "progress", 2, "flex", "1"], [1, "progress-fill"], [1, "text-sm", "text-muted"], [1, "badge"], [1, "modal-backdrop", 3, "click"], [1, "modal"], [1, "modal-title"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "12px"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["type", "email", 3, "ngModelChange", "ngModel"], ["value", "developer"], ["value", "designer"], ["value", "qa"], ["value", "devops"], ["value", "pm"], ["value", "worker"], ["value", "manager"], ["value", "cto"], ["value", "ceo"], ["placeholder", "angular, typescript, postgresql", 3, "ngModelChange", "ngModel"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-ghost", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"]], template: function ResourcesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Team Resources");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 3);
        \u0275\u0275listener("click", function ResourcesComponent_Template_button_click_6_listener() {
          return ctx.showModal = true;
        });
        \u0275\u0275text(7, "+ Add Member");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4);
        \u0275\u0275template(9, ResourcesComponent_Conditional_9_Template, 1, 0, "div", 5);
        \u0275\u0275elementStart(10, "div", 6)(11, "table")(12, "thead")(13, "tr")(14, "th");
        \u0275\u0275text(15, "Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th");
        \u0275\u0275text(17, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th");
        \u0275\u0275text(19, "Agent Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th");
        \u0275\u0275text(21, "Skills");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th");
        \u0275\u0275text(23, "Workload");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th");
        \u0275\u0275text(25, "Score");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "th");
        \u0275\u0275text(27, "Status");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "tbody");
        \u0275\u0275repeaterCreate(29, ResourcesComponent_For_30_Template, 29, 20, "tr", null, _forTrack0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(31, ResourcesComponent_Conditional_31_Template, 58, 9, "div", 7);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.resources.length, " members \u2014 AI manages their workload");
        \u0275\u0275advance(4);
        \u0275\u0275conditional(9, ctx.loading ? 9 : -1);
        \u0275\u0275advance(20);
        \u0275\u0275repeater(ctx.resources);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(31, ctx.showModal ? 31 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResourcesComponent, { className: "ResourcesComponent", filePath: "src\\app\\features\\resources\\resources.component.ts", lineNumber: 139 });
})();
export {
  ResourcesComponent
};
//# sourceMappingURL=chunk-RMEW4RUG.js.map
