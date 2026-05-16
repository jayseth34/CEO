import {
  ActivatedRoute,
  RouterLink
} from "./chunk-SUHDIYMP.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RadioControlValueAccessor,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I2DB5OAP.js";

// src/app/features/project-analyze/project-analyze.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.resourceId;
function ProjectAnalyzeComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.statusBadge(ctx_r0.project.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.project.status);
  }
}
function ProjectAnalyzeComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275text(2, " Fetching codebase and generating 4 documents with AI \u2014 this may take 30\u201360 seconds\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.analyzeError, " ");
  }
}
function ProjectAnalyzeComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 20);
  }
}
function ProjectAnalyzeComponent_For_35_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "slice");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r3.gitSource.length > 50 ? \u0275\u0275pipeBind3(2, 1, doc_r3.gitSource, 0, 50) + "\u2026" : doc_r3.gitSource, " ");
  }
}
function ProjectAnalyzeComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 50)(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ProjectAnalyzeComponent_For_35_Conditional_9_Template, 3, 5, "div", 51);
    \u0275\u0275elementStart(10, "div", 52)(11, "button", 26);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_For_35_Template_button_click_11_listener() {
      const doc_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewDoc(doc_r3));
    });
    \u0275\u0275text(12, "View");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 26);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_For_35_Template_button_click_13_listener() {
      const doc_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.download(doc_r3));
    });
    \u0275\u0275text(14, "\u2193 Download");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 53);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_For_35_Template_button_click_15_listener() {
      const doc_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteDoc(doc_r3.id));
    });
    \u0275\u0275text(16, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.docTypeBadge(doc_r3.documentType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.docTypeLabel(doc_r3.documentType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 6, doc_r3.generatedAt, "dd MMM, HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(doc_r3.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, doc_r3.gitSource ? 9 : -1);
  }
}
function ProjectAnalyzeComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, " No documents yet. Use the form above to analyze a codebase. ");
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_For_51_Template_div_click_0_listener() {
      const m_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectResource(m_r5.resourceId));
    });
    \u0275\u0275elementStart(1, "div", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 56);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("border-color", ctx_r0.selectedResourceId === m_r5.resourceId ? "var(--accent)" : "var(--border)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r5.resourceName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r5.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", m_r5.activeTasks, " active");
  }
}
function ProjectAnalyzeComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, ' No members yet \u2014 click "Manage Team" to add people. ');
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r0.selectedMemberName, "");
  }
}
function ProjectAnalyzeComponent_For_86_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r8 = ctx.$implicit;
    \u0275\u0275property("value", m_r8.resourceId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r8.resourceName);
  }
}
function ProjectAnalyzeComponent_For_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 46)(1, "td", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 58)(4, "select", 59);
    \u0275\u0275listener("change", function ProjectAnalyzeComponent_For_86_Template_select_change_4_listener($event) {
      const task_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reassignTask(task_r7, $event.target.value));
    });
    \u0275\u0275elementStart(5, "option", 36);
    \u0275\u0275text(6, "\u2014 Unassigned \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, ProjectAnalyzeComponent_For_86_For_8_Template, 2, 2, "option", 60, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 58)(10, "span", 48);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 58)(13, "select", 61);
    \u0275\u0275listener("change", function ProjectAnalyzeComponent_For_86_Template_select_change_13_listener($event) {
      const task_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateTaskStatus(task_r7, $event.target.value));
    });
    \u0275\u0275elementStart(14, "option", 37);
    \u0275\u0275text(15, "Backlog");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 38);
    \u0275\u0275text(17, "Todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 39);
    \u0275\u0275text(19, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 40);
    \u0275\u0275text(21, "Review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 41);
    \u0275\u0275text(23, "Done");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const task_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", (tmp_11_0 = task_r7.assignedResourceId) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : "");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.team);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r0.priorityBadge(task_r7.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r7.priority);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", task_r7.status);
  }
}
function ProjectAnalyzeComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 62);
    \u0275\u0275text(2, " No tasks match the current filter. ");
    \u0275\u0275elementEnd()();
  }
}
function ProjectAnalyzeComponent_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_88_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r0.viewingDoc = null));
    });
    \u0275\u0275elementStart(1, "div", 64)(2, "div", 65)(3, "div")(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 68);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_88_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingDoc = null);
    });
    \u0275\u0275text(9, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 69)(11, "pre", 70);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 71)(14, "button", 72);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_88_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewingDoc = null);
    });
    \u0275\u0275text(15, "Close");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 73);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_88_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.download(ctx_r0.viewingDoc));
    });
    \u0275\u0275text(17, "\u2193 Download .md");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.docTypeBadge(ctx_r0.viewingDoc.documentType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.docTypeLabel(ctx_r0.viewingDoc.documentType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.viewingDoc.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.viewingDoc.content);
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 76);
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 83);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const r_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeMember(r_r12));
    });
    \u0275\u0275text(1, "Remove");
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const r_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addMember(r_r12));
    });
    \u0275\u0275text(1, "+ Add");
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "div")(2, "div", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_6_Template, 2, 0, "button", 82)(7, ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Conditional_7_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r12.resourceName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, r_r12.isMember ? 6 : 7);
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1, " No resources found. Add resources in the Resources page first. ");
    \u0275\u0275elementEnd();
  }
}
function ProjectAnalyzeComponent_Conditional_89_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275repeaterCreate(1, ProjectAnalyzeComponent_Conditional_89_Conditional_8_For_2_Template, 8, 3, "div", 79, _forTrack1);
    \u0275\u0275template(3, ProjectAnalyzeComponent_Conditional_89_Conditional_8_Conditional_3_Template, 2, 0, "div", 80);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.allResources);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, !ctx_r0.allResources.length ? 3 : -1);
  }
}
function ProjectAnalyzeComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_89_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.target === $event.currentTarget && (ctx_r0.showManageTeam = false));
    });
    \u0275\u0275elementStart(1, "div", 74)(2, "div", 75)(3, "div", 67);
    \u0275\u0275text(4, "Manage Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 68);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_89_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showManageTeam = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ProjectAnalyzeComponent_Conditional_89_Conditional_7_Template, 1, 0, "div", 76)(8, ProjectAnalyzeComponent_Conditional_89_Conditional_8_Template, 4, 1);
    \u0275\u0275elementStart(9, "div", 77)(10, "button", 72);
    \u0275\u0275listener("click", function ProjectAnalyzeComponent_Conditional_89_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showManageTeam = false);
    });
    \u0275\u0275text(11, "Done");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(7, ctx_r0.allResourcesLoading ? 7 : 8);
  }
}
var ProjectAnalyzeComponent = class _ProjectAnalyzeComponent {
  constructor() {
    this.api = inject(ApiService);
    this.route = inject(ActivatedRoute);
    this.project = null;
    this.documents = [];
    this.team = [];
    this.tasks = [];
    this.allResources = [];
    this.sourceType = "github";
    this.sourceInput = "";
    this.analyzing = false;
    this.analyzeError = "";
    this.docsLoading = true;
    this.teamLoading = true;
    this.allResourcesLoading = false;
    this.selectedResourceId = null;
    this.statusFilter = "";
    this.viewingDoc = null;
    this.showManageTeam = false;
  }
  get filteredTasks() {
    return this.tasks.filter((t) => (!this.selectedResourceId || t.assignedResourceId === this.selectedResourceId) && (!this.statusFilter || t.status === this.statusFilter));
  }
  get selectedMemberName() {
    return this.team.find((m) => m.resourceId === this.selectedResourceId)?.resourceName ?? "";
  }
  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("id");
    this.loadProject();
    this.loadDocuments();
    this.loadTeam();
  }
  loadProject() {
    this.api.getProject(this.projectId).subscribe({
      next: (p) => {
        this.project = p;
        this.tasks = p.tasks ?? [];
      }
    });
  }
  loadDocuments() {
    this.docsLoading = true;
    this.api.getProjectDocuments(this.projectId).subscribe({
      next: (d) => {
        this.documents = d;
        this.docsLoading = false;
      },
      error: () => {
        this.docsLoading = false;
      }
    });
  }
  loadTeam() {
    this.teamLoading = true;
    this.api.getProjectTeam(this.projectId).subscribe({
      next: (t) => {
        this.team = t;
        this.teamLoading = false;
      },
      error: () => {
        this.teamLoading = false;
      }
    });
  }
  openManageTeam() {
    this.showManageTeam = true;
    this.allResourcesLoading = true;
    this.api.getAllResourcesWithMembership(this.projectId).subscribe({
      next: (r) => {
        this.allResources = r;
        this.allResourcesLoading = false;
      },
      error: () => {
        this.allResourcesLoading = false;
      }
    });
  }
  addMember(r) {
    this.api.addProjectMember(this.projectId, r.resourceId).subscribe(() => {
      r.isMember = true;
      this.loadTeam();
    });
  }
  removeMember(r) {
    this.api.removeProjectMember(this.projectId, r.resourceId).subscribe(() => {
      r.isMember = false;
      if (this.selectedResourceId === r.resourceId)
        this.selectedResourceId = null;
      this.loadTeam();
    });
  }
  analyze() {
    if (!this.sourceInput.trim())
      return;
    this.analyzing = true;
    this.analyzeError = "";
    const dto = this.sourceType === "github" ? { githubUrl: this.sourceInput.trim(), localPath: null } : { githubUrl: null, localPath: this.sourceInput.trim() };
    this.api.analyzeProject(this.projectId, dto).subscribe({
      next: (docs) => {
        this.documents = [...docs, ...this.documents];
        this.analyzing = false;
        this.sourceInput = "";
      },
      error: (err) => {
        this.analyzeError = err?.error?.error ?? "Analysis failed. Check the URL or path and try again.";
        this.analyzing = false;
      }
    });
  }
  viewDoc(doc) {
    this.viewingDoc = doc;
  }
  download(doc) {
    this.api.downloadDocument(doc.id).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.documentType}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  deleteDoc(id) {
    this.api.deleteDocument(id).subscribe(() => {
      this.documents = this.documents.filter((d) => d.id !== id);
      if (this.viewingDoc?.id === id)
        this.viewingDoc = null;
    });
  }
  selectResource(id) {
    this.selectedResourceId = id;
  }
  updateTaskStatus(task, status) {
    this.api.updateTask(task.id, { status }).subscribe(() => {
      task.status = status;
      this.loadTeam();
    });
  }
  reassignTask(task, resourceId) {
    const newId = resourceId || null;
    this.api.updateTask(task.id, { assignedResourceId: newId }).subscribe(() => {
      task.assignedResourceId = newId ?? void 0;
      task.assignedResourceName = newId ? this.team.find((m) => m.resourceId === newId)?.resourceName : void 0;
      this.loadTeam();
    });
  }
  docTypeLabel(type) {
    const labels = {
      root_plan: "Root Plan",
      requirements: "Requirements",
      test_cases: "Test Cases",
      change_impact: "Change Impact"
    };
    return labels[type] ?? type;
  }
  docTypeBadge(type) {
    const map = {
      root_plan: "badge-accent",
      requirements: "badge-success",
      test_cases: "badge-warning",
      change_impact: "badge-danger"
    };
    return map[type] ?? "badge-muted";
  }
  statusBadge(s) {
    return {
      "badge-success": s === "active" || s === "completed",
      "badge-warning": s === "planning" || s === "paused",
      "badge-muted": s === "pending"
    };
  }
  priorityBadge(p) {
    return {
      "badge-danger": p === "critical",
      "badge-warning": p === "high",
      "badge-accent": p === "medium",
      "badge-muted": p === "low"
    };
  }
  static {
    this.\u0275fac = function ProjectAnalyzeComponent_Factory(t) {
      return new (t || _ProjectAnalyzeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectAnalyzeComponent, selectors: [["app-project-analyze"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 90, vars: 24, consts: [[1, "page-header"], ["routerLink", "/projects", 2, "color", "var(--text-muted)", "text-decoration", "none", "font-size", "13px", "display", "inline-block", "margin-bottom", "4px"], [1, "page-title"], [1, "page-sub"], [1, "badge", 3, "class"], [1, "page-body"], [1, "card", 2, "margin-bottom", "20px"], [2, "font-size", "14px", "font-weight", "600", "margin-bottom", "12px"], [2, "font-size", "13px", "color", "var(--text-muted)", "margin-bottom", "12px"], [2, "display", "flex", "gap", "16px", "margin-bottom", "12px"], [2, "display", "flex", "align-items", "center", "gap", "6px", "cursor", "pointer", "font-size", "13px"], ["type", "radio", "value", "github", 3, "ngModelChange", "ngModel"], ["type", "radio", "value", "local", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "8px"], [2, "flex", "1", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], [1, "btn", "btn-primary", 3, "click", "disabled"], [2, "margin-top", "12px", "display", "flex", "align-items", "center", "gap", "8px", "color", "var(--text-muted)", "font-size", "13px"], [2, "margin-top", "10px", "padding", "8px 12px", "background", "rgba(239,68,68,0.1)", "border-radius", "6px", "color", "#ef4444", "font-size", "13px"], [2, "font-size", "14px", "font-weight", "600", "margin-bottom", "10px"], [1, "badge", "badge-muted", 2, "margin-left", "8px"], [1, "spinner", 2, "margin-bottom", "20px"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(260px,1fr))", "gap", "12px", "margin-bottom", "28px"], [1, "card", 2, "display", "flex", "flex-direction", "column", "gap", "8px"], [1, "text-muted", "text-sm", 2, "grid-column", "1/-1", "padding", "16px 0"], [1, "flex", "items-center", "justify-between", 2, "margin-bottom", "10px"], [2, "font-size", "14px", "font-weight", "600"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "10px", "margin-bottom", "28px"], [1, "card", 2, "min-width", "160px", "cursor", "pointer", "padding", "12px 16px", "border", "2px solid transparent", "transition", "border-color 0.15s", 3, "click"], [2, "font-weight", "600", "font-size", "14px"], [1, "text-muted", "text-sm"], [1, "card", 2, "min-width", "160px", "cursor", "pointer", "padding", "12px 16px", "border", "2px solid transparent", "transition", "border-color 0.15s", "position", "relative", 3, "border-color"], [1, "text-muted", "text-sm", 2, "padding", "12px 0"], [1, "flex", "items-center", "justify-between", 2, "margin-bottom", "12px"], [1, "text-muted", 2, "font-weight", "400"], [2, "font-size", "13px", "background", "var(--surface2)", "border", "1px solid var(--border)", "color", "var(--text)", "padding", "4px 10px", "border-radius", "6px", "cursor", "pointer", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "backlog"], ["value", "todo"], ["value", "in_progress"], ["value", "review"], ["value", "done"], [1, "card", 2, "padding", "0", "overflow", "hidden", "margin-bottom", "32px"], [2, "width", "100%", "border-collapse", "collapse", "font-size", "13px"], [2, "border-bottom", "1px solid var(--border)", "background", "var(--surface2)"], [2, "padding", "10px 14px", "text-align", "left", "color", "var(--text-muted)", "font-weight", "500"], [2, "border-bottom", "1px solid var(--border)"], [1, "modal-backdrop"], [1, "badge"], [1, "spinner", 2, "width", "14px", "height", "14px", "flex-shrink", "0"], [1, "flex", "items-center", "justify-between"], [1, "text-muted", "text-sm", 2, "font-size", "11px", "word-break", "break-all"], [1, "flex", "gap-2", 2, "margin-top", "4px"], [1, "btn", "btn-ghost", "btn-sm", 2, "color", "#ef4444", 3, "click"], [1, "card", 2, "min-width", "160px", "cursor", "pointer", "padding", "12px 16px", "border", "2px solid transparent", "transition", "border-color 0.15s", "position", "relative", 3, "click"], [1, "text-muted", "text-sm", 2, "margin-bottom", "4px"], [1, "badge", "badge-warning"], [2, "padding", "10px 14px", "font-weight", "500"], [2, "padding", "10px 14px"], [2, "font-size", "12px", "background", "var(--surface2)", "border", "1px solid var(--border)", "color", "var(--text)", "padding", "3px 8px", "border-radius", "4px", "cursor", "pointer", "max-width", "160px", 3, "change", "value"], [3, "value"], [2, "font-size", "12px", "background", "var(--surface2)", "border", "1px solid var(--border)", "color", "var(--text)", "padding", "3px 8px", "border-radius", "4px", "cursor", "pointer", 3, "change", "value"], ["colspan", "4", 2, "padding", "24px 14px", "color", "var(--text-muted)", "text-align", "center"], [1, "modal-backdrop", 3, "click"], [1, "modal", 2, "max-width", "820px", "width", "92vw", "max-height", "88vh", "display", "flex", "flex-direction", "column"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "14px"], [1, "badge", 2, "margin-bottom", "4px"], [1, "modal-title", 2, "margin-bottom", "0"], [1, "btn", "btn-ghost", 2, "font-size", "18px", "padding", "4px 10px", 3, "click"], [2, "flex", "1", "overflow-y", "auto", "background", "var(--surface)", "border-radius", "8px", "padding", "16px", "border", "1px solid var(--border)"], [2, "font-size", "12px", "line-height", "1.7", "white-space", "pre-wrap", "word-break", "break-word", "margin", "0", "font-family", "inherit", "color", "var(--text)"], [1, "modal-footer", 2, "margin-top", "14px"], [1, "btn", "btn-ghost", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "modal", 2, "max-width", "520px", "width", "92vw"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "16px"], [1, "spinner"], [1, "modal-footer", 2, "margin-top", "16px"], [2, "max-height", "400px", "overflow-y", "auto", "display", "flex", "flex-direction", "column", "gap", "8px"], [1, "card", 2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "10px 14px"], [1, "text-muted", "text-sm", 2, "padding", "16px 0", "text-align", "center"], [2, "font-weight", "600", "font-size", "13px"], [1, "btn", "btn-ghost", "btn-sm", 2, "color", "#ef4444", "min-width", "72px"], [1, "btn", "btn-ghost", "btn-sm", 2, "color", "#ef4444", "min-width", "72px", 3, "click"], [1, "btn", "btn-primary", "btn-sm", 2, "min-width", "72px", 3, "click"]], template: function ProjectAnalyzeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "a", 1);
        \u0275\u0275text(3, "\u2190 Back to Projects");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 3);
        \u0275\u0275text(7, "Codebase analysis \xB7 Documents \xB7 Team status");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, ProjectAnalyzeComponent_Conditional_8_Template, 2, 3, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 5)(10, "div", 6)(11, "div", 7);
        \u0275\u0275text(12, "Analyze Codebase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 8);
        \u0275\u0275text(14, " Point to a GitHub repository or a local directory \u2014 AI will generate a Root Plan, Requirements doc, Test Cases, and Change Impact Analysis. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 9)(16, "label", 10)(17, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectAnalyzeComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.sourceType, $event) || (ctx.sourceType = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " GitHub URL ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "label", 10)(20, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectAnalyzeComponent_Template_input_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.sourceType, $event) || (ctx.sourceType = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Local Path ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 13)(23, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectAnalyzeComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.sourceInput, $event) || (ctx.sourceInput = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function ProjectAnalyzeComponent_Template_input_keyup_enter_23_listener() {
          return ctx.analyze();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 15);
        \u0275\u0275listener("click", function ProjectAnalyzeComponent_Template_button_click_24_listener() {
          return ctx.analyze();
        });
        \u0275\u0275text(25);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(26, ProjectAnalyzeComponent_Conditional_26_Template, 3, 0, "div", 16)(27, ProjectAnalyzeComponent_Conditional_27_Template, 2, 1, "div", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 18);
        \u0275\u0275text(29, " Generated Documents ");
        \u0275\u0275elementStart(30, "span", 19);
        \u0275\u0275text(31);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(32, ProjectAnalyzeComponent_Conditional_32_Template, 1, 0, "div", 20);
        \u0275\u0275elementStart(33, "div", 21);
        \u0275\u0275repeaterCreate(34, ProjectAnalyzeComponent_For_35_Template, 17, 9, "div", 22, _forTrack0);
        \u0275\u0275template(36, ProjectAnalyzeComponent_Conditional_36_Template, 2, 0, "div", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 24)(38, "div", 25);
        \u0275\u0275text(39, " Project Team ");
        \u0275\u0275elementStart(40, "span", 19);
        \u0275\u0275text(41);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "button", 26);
        \u0275\u0275listener("click", function ProjectAnalyzeComponent_Template_button_click_42_listener() {
          return ctx.openManageTeam();
        });
        \u0275\u0275text(43, "+ Manage Team");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 27)(45, "div", 28);
        \u0275\u0275listener("click", function ProjectAnalyzeComponent_Template_div_click_45_listener() {
          return ctx.selectResource(null);
        });
        \u0275\u0275elementStart(46, "div", 29);
        \u0275\u0275text(47, "All Tasks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div", 30);
        \u0275\u0275text(49);
        \u0275\u0275elementEnd()();
        \u0275\u0275repeaterCreate(50, ProjectAnalyzeComponent_For_51_Template, 7, 5, "div", 31, _forTrack1);
        \u0275\u0275template(52, ProjectAnalyzeComponent_Conditional_52_Template, 2, 0, "div", 32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 33)(54, "div", 25);
        \u0275\u0275text(55, " Tasks ");
        \u0275\u0275template(56, ProjectAnalyzeComponent_Conditional_56_Template, 2, 1, "span", 34);
        \u0275\u0275elementStart(57, "span", 19);
        \u0275\u0275text(58);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "select", 35);
        \u0275\u0275twoWayListener("ngModelChange", function ProjectAnalyzeComponent_Template_select_ngModelChange_59_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275elementStart(60, "option", 36);
        \u0275\u0275text(61, "All Statuses");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "option", 37);
        \u0275\u0275text(63, "Backlog");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "option", 38);
        \u0275\u0275text(65, "Todo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "option", 39);
        \u0275\u0275text(67, "In Progress");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "option", 40);
        \u0275\u0275text(69, "Review");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "option", 41);
        \u0275\u0275text(71, "Done");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(72, "div", 42)(73, "table", 43)(74, "thead")(75, "tr", 44)(76, "th", 45);
        \u0275\u0275text(77, "Task");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "th", 45);
        \u0275\u0275text(79, "Assignee");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "th", 45);
        \u0275\u0275text(81, "Priority");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "th", 45);
        \u0275\u0275text(83, "Status");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(84, "tbody");
        \u0275\u0275repeaterCreate(85, ProjectAnalyzeComponent_For_86_Template, 24, 6, "tr", 46, _forTrack0);
        \u0275\u0275template(87, ProjectAnalyzeComponent_Conditional_87_Template, 3, 0, "tr");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(88, ProjectAnalyzeComponent_Conditional_88_Template, 18, 5, "div", 47)(89, ProjectAnalyzeComponent_Conditional_89_Template, 12, 1, "div", 47);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((ctx.project == null ? null : ctx.project.name) || "Project Analysis");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(8, ctx.project ? 8 : -1);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.sourceType);
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("ngModel", ctx.sourceType);
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("ngModel", ctx.sourceInput);
        \u0275\u0275property("placeholder", ctx.sourceType === "github" ? "https://github.com/owner/repo" : "C:ProjectsMyApp");
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.analyzing || !ctx.sourceInput.trim());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.analyzing ? "Analyzing..." : "Generate All Documents", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.analyzing ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(27, ctx.analyzeError ? 27 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.documents.length);
        \u0275\u0275advance();
        \u0275\u0275conditional(32, ctx.docsLoading ? 32 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.documents);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(36, !ctx.docsLoading && !ctx.documents.length ? 36 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.team.length);
        \u0275\u0275advance(4);
        \u0275\u0275styleProp("border-color", ctx.selectedResourceId === null ? "var(--accent)" : "var(--border)");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", ctx.tasks.length, " total");
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.team);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(52, !ctx.team.length && !ctx.teamLoading ? 52 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(56, ctx.selectedResourceId ? 56 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.filteredTasks.length);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(26);
        \u0275\u0275repeater(ctx.filteredTasks);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(87, !ctx.filteredTasks.length ? 87 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(88, ctx.viewingDoc ? 88 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(89, ctx.showManageTeam ? 89 : -1);
      }
    }, dependencies: [CommonModule, SlicePipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectAnalyzeComponent, { className: "ProjectAnalyzeComponent", filePath: "src\\app\\features\\project-analyze\\project-analyze.component.ts", lineNumber: 284 });
})();
export {
  ProjectAnalyzeComponent
};
//# sourceMappingURL=chunk-ZXMD6IVF.js.map
