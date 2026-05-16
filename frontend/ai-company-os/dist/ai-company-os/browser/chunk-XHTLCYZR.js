import {
  SignalrService
} from "./chunk-WXCOL5SO.js";
import {
  ActivatedRoute
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
  DecimalPipe,
  __spreadProps,
  __spreadValues,
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

// src/app/features/tasks/tasks.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function TasksComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function TasksComponent_Conditional_13_For_2_For_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u25CE ", task_r2.assignedResourceName, " ");
  }
}
function TasksComponent_Conditional_13_For_2_For_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function TasksComponent_Conditional_13_For_2_For_7_Conditional_9_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const task_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.autoAssign(task_r2, $event));
    });
    \u0275\u0275text(1, " AI Assign ");
    \u0275\u0275elementEnd();
  }
}
function TasksComponent_Conditional_13_For_2_For_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", task_r2.estimatedHours, "h estimate");
  }
}
function TasksComponent_Conditional_13_For_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function TasksComponent_Conditional_13_For_2_For_7_Template_div_click_0_listener() {
      const task_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectTask(task_r2));
    });
    \u0275\u0275elementStart(1, "div", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "span", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TasksComponent_Conditional_13_For_2_For_7_Conditional_8_Template, 2, 1, "div", 19)(9, TasksComponent_Conditional_13_For_2_For_7_Conditional_9_Template, 2, 0, "button", 20)(10, TasksComponent_Conditional_13_For_2_For_7_Conditional_10_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(task_r2.agentRole);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.priorityBadge(task_r2.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r2.priority);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, task_r2.assignedResourceName ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, !task_r2.assignedResourceId ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, task_r2.estimatedHours ? 10 : -1);
  }
}
function TasksComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 12);
    \u0275\u0275repeaterCreate(6, TasksComponent_Conditional_13_For_2_For_7_Template, 11, 8, "div", 13, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const col_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", col_r5.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getColTasks(col_r5.key).length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getColTasks(col_r5.key));
  }
}
function TasksComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, TasksComponent_Conditional_13_For_2_Template, 8, 2, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.columns);
  }
}
function TasksComponent_Conditional_14_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275text(1, " Assigned to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selectedTask.assignedResourceName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 score: ", \u0275\u0275pipeBind2(5, 2, ctx_r2.selectedTask.assignmentScore, "1.2-2"), " ");
  }
}
function TasksComponent_Conditional_14_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function TasksComponent_Conditional_14_Conditional_52_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.autoAssign(ctx_r2.selectedTask));
    });
    \u0275\u0275text(1, "AI Auto-Assign");
    \u0275\u0275elementEnd();
  }
}
function TasksComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275listener("click", function TasksComponent_Conditional_14_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r2.selectedTask = null));
    });
    \u0275\u0275elementStart(1, "div", 24)(2, "div", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "div")(6, "label");
    \u0275\u0275text(7, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_14_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedTask.status, $event) || (ctx_r2.selectedTask.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function TasksComponent_Conditional_14_Template_select_change_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTask("status", ctx_r2.selectedTask.status));
    });
    \u0275\u0275elementStart(9, "option", 28);
    \u0275\u0275text(10, "Backlog");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 29);
    \u0275\u0275text(12, "To Do");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 30);
    \u0275\u0275text(14, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 31);
    \u0275\u0275text(16, "Review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 32);
    \u0275\u0275text(18, "Done");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div")(20, "label");
    \u0275\u0275text(21, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_14_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedTask.priority, $event) || (ctx_r2.selectedTask.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function TasksComponent_Conditional_14_Template_select_change_22_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTask("priority", ctx_r2.selectedTask.priority));
    });
    \u0275\u0275elementStart(23, "option", 33);
    \u0275\u0275text(24, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 34);
    \u0275\u0275text(26, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 35);
    \u0275\u0275text(28, "High");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 36);
    \u0275\u0275text(30, "Critical");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div", 37)(32, "label");
    \u0275\u0275text(33, "Sprint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_14_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedTask.sprint, $event) || (ctx_r2.selectedTask.sprint = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function TasksComponent_Conditional_14_Template_input_blur_34_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTask("sprint", ctx_r2.selectedTask.sprint));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 39)(36, "div")(37, "label");
    \u0275\u0275text(38, "Agent Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 40);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div")(42, "label");
    \u0275\u0275text(43, "Estimated Hours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 40);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(46, TasksComponent_Conditional_14_Conditional_46_Template, 6, 5, "div", 41);
    \u0275\u0275elementStart(47, "div", 42)(48, "button", 43);
    \u0275\u0275listener("click", function TasksComponent_Conditional_14_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteTask(ctx_r2.selectedTask.id));
    });
    \u0275\u0275text(49, "Delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "button", 44);
    \u0275\u0275listener("click", function TasksComponent_Conditional_14_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedTask = null);
    });
    \u0275\u0275text(51, "Close");
    \u0275\u0275elementEnd();
    \u0275\u0275template(52, TasksComponent_Conditional_14_Conditional_52_Template, 2, 0, "button", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selectedTask.title);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedTask.status);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedTask.priority);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedTask.sprint);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.selectedTask.agentRole);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.selectedTask.estimatedHours, "h");
    \u0275\u0275advance();
    \u0275\u0275conditional(46, ctx_r2.selectedTask.assignedResourceName ? 46 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(52, !ctx_r2.selectedTask.assignedResourceId ? 52 : -1);
  }
}
function TasksComponent_Conditional_15_Conditional_4_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r10 = ctx.$implicit;
    \u0275\u0275property("value", p_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r10.name);
  }
}
function TasksComponent_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "label");
    \u0275\u0275text(2, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 50);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Conditional_4_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.selectedProjectId, $event) || (ctx_r2.form.selectedProjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 58);
    \u0275\u0275text(5, "\u2014 select a project \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, TasksComponent_Conditional_15_Conditional_4_For_7_Template, 2, 2, "option", 59, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.selectedProjectId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function TasksComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275listener("click", function TasksComponent_Conditional_15_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r2.showModal = false));
    });
    \u0275\u0275elementStart(1, "div", 47)(2, "div", 25);
    \u0275\u0275text(3, "Add Task");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TasksComponent_Conditional_15_Conditional_4_Template, 8, 1, "div", 37);
    \u0275\u0275elementStart(5, "div", 37)(6, "label");
    \u0275\u0275text(7, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.title, $event) || (ctx_r2.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 37)(10, "label");
    \u0275\u0275text(11, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 49);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 39)(14, "div", 37)(15, "label");
    \u0275\u0275text(16, "Agent Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 50);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.agentRole, $event) || (ctx_r2.form.agentRole = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 51);
    \u0275\u0275text(19, "Developer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 52);
    \u0275\u0275text(21, "Designer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 53);
    \u0275\u0275text(23, "QA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 54);
    \u0275\u0275text(25, "DevOps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 55);
    \u0275\u0275text(27, "PM");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 37)(29, "label");
    \u0275\u0275text(30, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 50);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.priority, $event) || (ctx_r2.form.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(32, "option", 33);
    \u0275\u0275text(33, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 34);
    \u0275\u0275text(35, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 35);
    \u0275\u0275text(37, "High");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 36);
    \u0275\u0275text(39, "Critical");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 37)(41, "label");
    \u0275\u0275text(42, "Estimated Hours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function TasksComponent_Conditional_15_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.estimatedHours, $event) || (ctx_r2.form.estimatedHours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 42)(45, "button", 44);
    \u0275\u0275listener("click", function TasksComponent_Conditional_15_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showModal = false);
    });
    \u0275\u0275text(46, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 57);
    \u0275\u0275listener("click", function TasksComponent_Conditional_15_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createTask());
    });
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, !ctx_r2.projectId ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.agentRole);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.priority);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.estimatedHours);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving ? "Creating..." : "Create Task", " ");
  }
}
var TasksComponent = class _TasksComponent {
  constructor() {
    this.api = inject(ApiService);
    this.route = inject(ActivatedRoute);
    this.signalr = inject(SignalrService);
    this.board = null;
    this.allTasks = [];
    this.projects = [];
    this.loading = true;
    this.showModal = false;
    this.saving = false;
    this.selectedTask = null;
    this.projectId = null;
    this.form = { title: "", description: "", agentRole: "developer", priority: "medium", estimatedHours: 4, selectedProjectId: "" };
    this.columns = [
      { key: "backlog", label: "Backlog" },
      { key: "todo", label: "To Do" },
      { key: "in_progress", label: "In Progress" },
      { key: "review", label: "Review" },
      { key: "done", label: "Done" }
    ];
  }
  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("id");
    this.refresh();
    if (!this.projectId) {
      this.api.getProjects().subscribe({ next: (p) => {
        this.projects = p;
      }, error: () => {
      } });
    }
    this.sub = this.signalr.events$.subscribe((ev) => {
      if (ev.type === "TaskAssigned" || ev.type === "TaskUpdated")
        this.refresh();
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  refresh() {
    this.loading = true;
    if (this.projectId) {
      this.api.getTaskBoard(this.projectId).subscribe({
        next: (b) => {
          this.board = b;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.api.getTasks().subscribe({
        next: (tasks) => {
          this.allTasks = tasks;
          this.board = {
            backlog: tasks.filter((t) => t.status === "backlog"),
            todo: tasks.filter((t) => t.status === "todo"),
            inProgress: tasks.filter((t) => t.status === "in_progress"),
            review: tasks.filter((t) => t.status === "review"),
            done: tasks.filter((t) => t.status === "done")
          };
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
  getColTasks(key) {
    if (!this.board)
      return [];
    const map = {
      backlog: this.board.backlog,
      todo: this.board.todo,
      in_progress: this.board.inProgress,
      review: this.board.review,
      done: this.board.done
    };
    return map[key] ?? [];
  }
  selectTask(task) {
    this.selectedTask = __spreadValues({}, task);
  }
  updateTask(field, value) {
    if (!this.selectedTask)
      return;
    this.api.updateTask(this.selectedTask.id, { [field]: value }).subscribe(() => this.refresh());
  }
  autoAssign(task, event) {
    event?.stopPropagation();
    this.api.autoAssignTask(task.id).subscribe({ next: () => this.refresh(), error: () => {
    } });
  }
  createTask() {
    const projectId = this.projectId ?? this.form.selectedProjectId;
    if (!this.form.title || !projectId)
      return;
    this.saving = true;
    this.api.createTask(__spreadProps(__spreadValues({}, this.form), { projectId })).subscribe({
      next: () => {
        this.showModal = false;
        this.saving = false;
        this.refresh();
        this.form = { title: "", description: "", agentRole: "developer", priority: "medium", estimatedHours: 4, selectedProjectId: "" };
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  deleteTask(id) {
    this.api.deleteTask(id).subscribe(() => {
      this.selectedTask = null;
      this.refresh();
    });
  }
  priorityBadge(p) {
    return { "badge-danger": p === "critical", "badge-warning": p === "high", "badge-accent": p === "medium", "badge-muted": p === "low" };
  }
  static {
    this.\u0275fac = function TasksComponent_Factory(t) {
      return new (t || _TasksComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TasksComponent, selectors: [["app-tasks"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 5, consts: [[1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "flex", "gap-2"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "page-body", 2, "padding-bottom", "0"], [1, "spinner"], [1, "board"], [1, "modal-backdrop"], [1, "column"], [1, "column-header"], [1, "column-count"], [1, "column-body"], [1, "task-card"], [1, "task-card", 3, "click"], [1, "task-card-title"], [1, "task-card-meta"], [1, "badge", "badge-muted", "text-sm"], [1, "badge", "text-sm"], [1, "text-muted", "text-sm", 2, "margin-top", "6px"], [1, "btn", "btn-ghost", "btn-sm", 2, "margin-top", "8px", "width", "100%"], [1, "text-muted", "text-sm", 2, "margin-top", "4px"], [1, "btn", "btn-ghost", "btn-sm", 2, "margin-top", "8px", "width", "100%", 3, "click"], [1, "modal-backdrop", 3, "click"], [1, "modal", 2, "width", "520px"], [1, "modal-title"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "12px", "margin-bottom", "16px"], [3, "ngModelChange", "change", "ngModel"], ["value", "backlog"], ["value", "todo"], ["value", "in_progress"], ["value", "review"], ["value", "done"], ["value", "low"], ["value", "medium"], ["value", "high"], ["value", "critical"], [1, "form-group"], [3, "ngModelChange", "blur", "ngModel"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "12px"], [2, "padding", "9px 12px", "background", "var(--surface2)", "border-radius", "7px", "font-size", "13px"], [1, "alert", "alert-info", 2, "margin-top", "12px"], [1, "modal-footer"], [1, "btn", "btn-danger", "btn-sm", 3, "click"], [1, "btn", "btn-ghost", 3, "click"], [1, "btn", "btn-primary"], [1, "btn", "btn-primary", 3, "click"], [1, "modal"], ["placeholder", "Task title", 3, "ngModelChange", "ngModel"], ["placeholder", "What needs to be done?", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "developer"], ["value", "designer"], ["value", "qa"], ["value", "devops"], ["value", "pm"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["value", ""], [3, "value"]], template: function TasksComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "div", 1);
        \u0275\u0275text(3, "Task Board");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
        \u0275\u0275listener("click", function TasksComponent_Template_button_click_7_listener() {
          return ctx.showModal = true;
        });
        \u0275\u0275text(8, "+ Add Task");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 4);
        \u0275\u0275listener("click", function TasksComponent_Template_button_click_9_listener() {
          return ctx.refresh();
        });
        \u0275\u0275text(10, "Refresh");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 5);
        \u0275\u0275template(12, TasksComponent_Conditional_12_Template, 1, 0, "div", 6)(13, TasksComponent_Conditional_13_Template, 3, 0, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, TasksComponent_Conditional_14_Template, 53, 8, "div", 8)(15, TasksComponent_Conditional_15_Template, 49, 8, "div", 8);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.projectId ? "Project view" : "All tasks");
        \u0275\u0275advance(7);
        \u0275\u0275conditional(12, ctx.loading ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(13, ctx.board && !ctx.loading ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, ctx.selectedTask ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.showModal ? 15 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TasksComponent, { className: "TasksComponent", filePath: "src\\app\\features\\tasks\\tasks.component.ts", lineNumber: 180 });
})();
export {
  TasksComponent
};
//# sourceMappingURL=chunk-XHTLCYZR.js.map
