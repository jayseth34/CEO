import {
  RouterLink
} from "./chunk-SUHDIYMP.js";
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
  DatePipe,
  DecimalPipe,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
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

// src/app/features/projects/projects.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/projects", a0, "board"];
var _c1 = (a0) => ["/projects", a0, "analyze"];
var _c2 = () => ["/requirements"];
var _c3 = (a0) => ({ projectId: a0 });
function ProjectsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 5);
  }
}
function ProjectsComponent_For_12_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", p_r2.completedTasks / p_r2.totalTasks * 100, "%");
  }
}
function ProjectsComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 11);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 14)(11, "div")(12, "div", 13);
    \u0275\u0275text(13, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 15);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "div", 13);
    \u0275\u0275text(19, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 15);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "div", 13);
    \u0275\u0275text(25, "Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 15);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "div", 13);
    \u0275\u0275text(30, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 15);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(33, ProjectsComponent_For_12_Conditional_33_Template, 2, 2, "div", 16);
    \u0275\u0275elementStart(34, "div", 17)(35, "a", 18);
    \u0275\u0275text(36, "Board");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "a", 18);
    \u0275\u0275text(38, "Analyze");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "a", 19);
    \u0275\u0275text(40, "+ Req");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "select", 20);
    \u0275\u0275listener("change", function ProjectsComponent_For_12_Template_select_change_41_listener($event) {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeStatus(p_r2.id, $event.target.value));
    });
    \u0275\u0275elementStart(42, "option", 21);
    \u0275\u0275text(43, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 22);
    \u0275\u0275text(45, "Planning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "option", 23);
    \u0275\u0275text(47, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "option", 24);
    \u0275\u0275text(49, "Paused");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "option", 25);
    \u0275\u0275text(51, "Completed");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.statusBadge(p_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r2.status);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.priorityBadge(p_r2.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r2.priority);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.clientName);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(16, 19, p_r2.budget, "1.0-0"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 22, p_r2.deadline, "mediumDate"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", p_r2.completedTasks, "/", p_r2.totalTasks, " done");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r2.inProgressTasks);
    \u0275\u0275advance();
    \u0275\u0275conditional(33, p_r2.totalTasks > 0 ? 33 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(25, _c0, p_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(27, _c1, p_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(29, _c2))("queryParams", \u0275\u0275pureFunction1(30, _c3, p_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", p_r2.status);
  }
}
function ProjectsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " No projects yet. Create your first project. ");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r2.showModal = false));
    });
    \u0275\u0275elementStart(1, "div", 28)(2, "div", 29);
    \u0275\u0275text(3, "New Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 30)(5, "label");
    \u0275\u0275text(6, "Project Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.name, $event) || (ctx_r2.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 30)(9, "label");
    \u0275\u0275text(10, "Client Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.clientName, $event) || (ctx_r2.form.clientName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 30)(13, "label");
    \u0275\u0275text(14, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 34)(17, "div", 30)(18, "label");
    \u0275\u0275text(19, "Budget (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.budget, $event) || (ctx_r2.form.budget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 30)(22, "label");
    \u0275\u0275text(23, "Deadline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.deadline, $event) || (ctx_r2.form.deadline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 30)(26, "label");
    \u0275\u0275text(27, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectsComponent_Conditional_14_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.priority, $event) || (ctx_r2.form.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(29, "option", 38);
    \u0275\u0275text(30, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 39);
    \u0275\u0275text(32, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 40);
    \u0275\u0275text(34, "High");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 41);
    \u0275\u0275text(36, "Critical");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 42)(38, "button", 43);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showModal = false);
    });
    \u0275\u0275text(39, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 44);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.create());
    });
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.clientName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.budget);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.deadline);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.priority);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r2.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving ? "Creating..." : "Create Project", " ");
  }
}
var ProjectsComponent = class _ProjectsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.projects = [];
    this.loading = true;
    this.showModal = false;
    this.saving = false;
    this.form = { name: "", clientName: "", description: "", budget: 0, deadline: "", priority: "medium" };
  }
  ngOnInit() {
    this.api.getProjects().subscribe({ next: (p) => {
      this.projects = p;
      this.loading = false;
    }, error: () => {
      this.loading = false;
    } });
  }
  create() {
    if (!this.form.name || !this.form.clientName)
      return;
    this.saving = true;
    this.api.createProject(this.form).subscribe({
      next: (p) => {
        this.projects.unshift(p);
        this.showModal = false;
        this.saving = false;
        this.form = { name: "", clientName: "", description: "", budget: 0, deadline: "", priority: "medium" };
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  changeStatus(id, status) {
    this.api.updateProjectStatus(id, status).subscribe(() => {
      const p = this.projects.find((p2) => p2.id === id);
      if (p)
        p.status = status;
    });
  }
  statusBadge(s) {
    return { "badge-success": s === "active" || s === "completed", "badge-warning": s === "planning" || s === "paused", "badge-muted": s === "pending" };
  }
  priorityBadge(p) {
    return { "badge-danger": p === "critical", "badge-warning": p === "high", "badge-accent": p === "medium", "badge-muted": p === "low" };
  }
  static {
    this.\u0275fac = function ProjectsComponent_Factory(t) {
      return new (t || _ProjectsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectsComponent, selectors: [["app-projects"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 4, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "btn", "btn-primary", 3, "click"], [1, "page-body"], [1, "spinner"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(300px,1fr))", "gap", "14px"], [1, "card", 2, "position", "relative"], [1, "text-muted", 2, "grid-column", "1/-1", "text-align", "center", "padding", "40px"], [1, "modal-backdrop"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "badge"], [2, "font-size", "15px", "font-weight", "600", "margin-bottom", "4px"], [1, "text-muted", "text-sm"], [2, "margin", "12px 0", "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "8px"], [2, "font-size", "13px", "font-weight", "500"], [1, "progress", "mb-4"], [1, "flex", "gap-2"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink", "queryParams"], [1, "btn", "btn-ghost", "btn-sm", 2, "padding", "4px 8px", "cursor", "pointer", 3, "change", "value"], ["value", "pending"], ["value", "planning"], ["value", "active"], ["value", "paused"], ["value", "completed"], [1, "progress-fill"], [1, "modal-backdrop", 3, "click"], [1, "modal"], [1, "modal-title"], [1, "form-group"], ["placeholder", "e.g. Food Delivery App", 3, "ngModelChange", "ngModel"], ["placeholder", "Client or company name", 3, "ngModelChange", "ngModel"], ["placeholder", "Brief project overview", 3, "ngModelChange", "ngModel"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "12px"], ["type", "number", "placeholder", "2000000", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "low"], ["value", "medium"], ["value", "high"], ["value", "critical"], [1, "modal-footer"], [1, "btn", "btn-ghost", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"]], template: function ProjectsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 3);
        \u0275\u0275listener("click", function ProjectsComponent_Template_button_click_6_listener() {
          return ctx.showModal = true;
        });
        \u0275\u0275text(7, "+ New Project");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4);
        \u0275\u0275template(9, ProjectsComponent_Conditional_9_Template, 1, 0, "div", 5);
        \u0275\u0275elementStart(10, "div", 6);
        \u0275\u0275repeaterCreate(11, ProjectsComponent_For_12_Template, 52, 32, "div", 7, _forTrack0);
        \u0275\u0275template(13, ProjectsComponent_Conditional_13_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(14, ProjectsComponent_Conditional_14_Template, 42, 8, "div", 9);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.projects.length, " projects");
        \u0275\u0275advance(4);
        \u0275\u0275conditional(9, ctx.loading ? 9 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.projects);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, !ctx.loading && !ctx.projects.length ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, ctx.showModal ? 14 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectsComponent, { className: "ProjectsComponent", filePath: "src\\app\\features\\projects\\projects.component.ts", lineNumber: 125 });
})();
export {
  ProjectsComponent
};
//# sourceMappingURL=chunk-B5UJEU4M.js.map
