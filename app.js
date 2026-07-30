function studyTracker() {
   return {
     storageKey: "lf-cka-cks-tracker-v1",
     weeks: [],
     doneMap: {},
     totalTaskCount: 0,
     completedCount: 0,
     overallCompletion: 0,
     currentWeekLabel: "Week 1",
 
     quizBank: [
       {
         id: "q1",
         topic: "Linux",
         prompt: "Which command checks inode usage for /var?",
         options: ["df -h /var", "df -i /var", "du -sh /var", "lsblk /var"],
         answer: 1,
         explain: "df -i reports inode usage. Inode exhaustion can cause write failures even with free disk space."
       },
       {
         id: "q2",
         topic: "Linux",
         prompt: "Fastest first check for a failed systemd service?",
         options: ["reboot", "journalctl -xe", "systemctl status <unit>", "rm -rf /var/log/*"],
         answer: 2,
         explain: "systemctl status gives immediate service state and recent failure summary."
       },
       {
         id: "q3",
         topic: "Core Workloads",
         prompt: "A Service has no endpoints. Most likely first thing to inspect?",
         options: ["kube-apiserver logs", "Service selector and Pod labels", "etcd restore", "node reboot"],
         answer: 1,
         explain: "Endpoint population depends on label selector matching running Pods."
       },
       {
         id: "q4",
         topic: "Scheduling",
         prompt: "A Pod stuck in Pending is most often diagnosed first with:",
         options: ["kubectl describe pod <name>", "kubectl delete pod <name>", "journalctl -u kubelet on control-plane", "docker ps"],
         answer: 0,
         explain: "kubectl describe pod shows scheduling events and admission issues."
       },
       {
         id: "q5",
         topic: "Core Workloads",
         prompt: "Which object controls rolling updates and rollback?",
         options: ["ReplicaSet", "DaemonSet", "Deployment", "StatefulSet"],
         answer: 2,
         explain: "Deployments manage ReplicaSets and provide rollout and rollback controls."
       },
       {
         id: "q6",
         topic: "Security",
         prompt: "Command to test whether a user/service account can perform an action:",
         options: ["kubectl who-can", "kubectl auth can-i", "kubectl get roles --test", "kubectl describe sa --verify"],
         answer: 1,
         explain: "kubectl auth can-i is the direct RBAC authorization check command."
       },
       {
         id: "q7",
         topic: "Linux",
         prompt: "Why use -x with du during /var investigation?",
         options: ["Exclude hidden files", "Use exact block sizes", "Stay on same filesystem", "Enable extended attributes"],
         answer: 2,
         explain: "-x prevents crossing mount points and keeps analysis scoped to one filesystem."
       },
       {
         id: "q8",
         topic: "Core Workloads",
         prompt: "A Pod in CrashLoopBackOff should first be checked with:",
         options: ["kubectl logs <pod> --previous", "kubectl drain node", "kubectl cordon node", "kubeadm upgrade"],
         answer: 0,
         explain: "Previous logs often show why the last container instance crashed."
       },
       {
         id: "q9",
         topic: "Networking",
         prompt: "NetworkPolicy applies traffic controls primarily at which scope?",
         options: ["Cluster-wide DNS", "Selected Pods in a namespace", "Nodes only", "Control plane components only"],
         answer: 1,
         explain: "NetworkPolicy selects Pods and applies ingress/egress controls in namespace context."
       },
       {
         id: "q10",
         topic: "Linux",
         prompt: "Best command pair after cleanup to verify space and service health quickly:",
         options: ["du -sh / && reboot", "df -h /var and systemctl --failed", "lsblk and ip route", "chmod and chown"],
         answer: 1,
         explain: "df confirms relief of storage pressure; systemctl --failed shows remaining service impact."
       },
       {
         id: "q11",
         topic: "Storage",
         prompt: "A PVC stays Pending. Most likely area to inspect first:",
         options: ["ServiceAccount token", "StorageClass and PV availability", "Deployment strategy", "Cluster DNS"],
         answer: 1,
         explain: "Binding issues are usually due to storage class mismatch or unavailable PV/provisioner."
       },
       {
         id: "q12",
         topic: "Security",
         prompt: "Least privilege in Kubernetes is mainly enforced by:",
         options: ["DaemonSets", "RBAC roles and bindings", "Horizontal Pod Autoscaler", "CoreDNS"],
         answer: 1,
         explain: "RBAC controls what identities can do and should be scoped minimally."
       },
       {
         id: "q13",
         topic: "Scheduling",
         prompt: "A Pod fails to schedule due to insufficient node CPU. Best first response?",
         options: ["Lower resource requests or add node capacity", "Delete the namespace", "Restart the kubelet", "Cordon every node"],
         answer: 0,
         explain: "Pending due to capacity is fixed by right-sizing requests or expanding cluster capacity."
       },
       {
         id: "q14",
         topic: "Scheduling",
         prompt: "A taint on a node with effect NoSchedule blocks a Pod unless the Pod has:",
         options: ["A matching toleration", "A higher priorityClassName", "A readiness probe", "A ServiceAccount token"],
         answer: 0,
         explain: "Tolerations allow (but do not guarantee) scheduling onto tainted nodes."
       },
       {
         id: "q15",
         topic: "Storage",
         prompt: "Which PV reclaimPolicy keeps data after the PVC is deleted?",
         options: ["Delete", "Retain", "Recycle", "Expire"],
         answer: 1,
         explain: "Retain preserves the underlying volume for manual recovery after PVC deletion."
       },
       {
         id: "q16",
         topic: "Networking",
         prompt: "A Pod cannot resolve a Service name but IP-based access works. First thing to check?",
         options: ["CoreDNS pods and kube-dns Service health", "Node disk usage", "kubelet certificate expiry", "etcd cluster health"],
         answer: 0,
         explain: "Name resolution failures with working connectivity usually point to CoreDNS."
       },
       {
         id: "q17",
         topic: "Networking",
         prompt: "An Ingress resource has no effect on routing. What is most likely missing?",
         options: ["A running Ingress controller", "A NetworkPolicy", "A StorageClass", "A PodDisruptionBudget"],
         answer: 0,
         explain: "Ingress resources require a controller (e.g., nginx-ingress) to actually implement routing rules."
       },
       {
         id: "q18",
         topic: "Cluster Admin",
         prompt: "Which command creates an etcd snapshot backup?",
         options: ["kubectl backup etcd", "etcdctl snapshot save <file>", "kubeadm backup", "crictl snapshot"],
         answer: 1,
         explain: "etcdctl snapshot save is the standard etcd backup command, typically with TLS cert flags."
       },
       {
         id: "q19",
         topic: "Cluster Admin",
         prompt: "During a kubeadm cluster upgrade, correct order is:",
         options: ["Upgrade worker nodes, then control plane", "Upgrade control plane first, then worker nodes", "Upgrade all nodes simultaneously", "Upgrade etcd only, skip kubelet"],
         answer: 1,
         explain: "Control plane components are upgraded first, followed by kubelet/kubeadm on worker nodes."
       },
       {
         id: "q20",
         topic: "Cluster Admin",
         prompt: "Best command to check certificate expiration dates for a kubeadm cluster?",
         options: ["kubeadm certs check-expiration", "kubectl get certs", "openssl x509 -in /etc/kubernetes", "crictl certs"],
         answer: 0,
         explain: "kubeadm certs check-expiration reports expiry for all cluster certificates."
       },
       {
         id: "q21",
         topic: "Security",
         prompt: "Which Pod Security Standard level is most restrictive?",
         options: ["Privileged", "Baseline", "Restricted", "Default"],
         answer: 2,
         explain: "Restricted enforces the strongest hardening, following current Pod security best practices."
       },
       {
         id: "q22",
         topic: "Security",
         prompt: "Best practice to reduce image-based supply chain risk is:",
         options: ["Always use the latest tag", "Pull from trusted registries and scan images", "Run all containers as root", "Disable image pull policy"],
         answer: 1,
         explain: "Trusted registries plus vulnerability scanning reduce the risk of compromised images."
       },
       {
         id: "q23",
         topic: "Core Workloads",
         prompt: "Difference between readiness and liveness probes:",
         options: [
           "Readiness restarts containers, liveness controls traffic",
           "Readiness controls traffic eligibility, liveness restarts unhealthy containers",
           "They are identical",
           "Liveness only applies to Jobs"
         ],
         answer: 1,
         explain: "Readiness gates Service traffic; liveness failures trigger container restarts."
       },
       {
         id: "q24",
         topic: "Linux",
         prompt: "Which command shows currently listening TCP ports and owning process?",
         options: ["ss -tlnp", "chmod -R 755", "tar -xvf", "find / -perm 777"],
         answer: 0,
         explain: "ss -tlnp lists listening TCP sockets with process ownership, replacing netstat in modern systems."
       }
     ],
     activeQuiz: [],
     quizActive: false,
     quizIndex: 0,
     quizStats: {
       best: 0,
       last: 0,
       byTopic: {},
       byTopicCorrect: {},
       weakIds: [],
       bestScoreText: "0/10",
       lastScoreText: "0/10"
     },
     weakTopics: [],
     strongTopics: [],
     quizSecondsLeft: 0,
     quizTimerId: null,
     quizDurationSeconds: 720,
     notes: [],
     noteDraft: "",
 
     init() {
       this.weeks = this.buildWeeks();
       this.totalTaskCount = this.weeks.reduce((sum, w) => sum + w.tasks.length, 0);
       this.loadState();
       this.recompute();
       this.renderWeakTopics();
     },
 
     buildWeeks() {
       return [
         {
           id: "w1",
           title: "Week 1: Linux Core and Incident Basics",
           goal: "Build reliable Linux triage flow and service troubleshooting order.",
           open: true,
           tasks: [
             { id: "w1d1", title: "Mon: Space vs inode fundamentals", detail: "Practice df -h, df -i, du -xhd1 with sample files." },
             { id: "w1d2", title: "Tue: Users groups permissions", detail: "Create users, groups, set ownership and permission paths." },
             { id: "w1d3", title: "Wed: Process operations", detail: "Use ps, kill, nice workflow on simulated noisy process." },
             { id: "w1d4", title: "Thu: systemd lifecycle", detail: "Run status, restart, enable, and journal checks for a test service." },
             { id: "w1d5", title: "Fri: SSH hardening basics", detail: "Set key-based auth and test fail-safe login path." },
             { id: "w1s", title: "Sat: Comprehensive troubleshooting lab", detail: "Disk full plus failed service plus login issue chain." },
             { id: "w1u", title: "Sun: Timed mini mock #1", detail: "45 to 60 minutes LFCS-style tasks and review misses." }
           ]
         },
         {
           id: "w2",
           title: "Week 2: Linux Networking and Storage",
           goal: "Diagnose host connectivity and mount failures quickly.",
           open: false,
           tasks: [
             { id: "w2d1", title: "Mon: Interface and route checks", detail: "Inspect address and route table using ip and ss tools." },
             { id: "w2d2", title: "Tue: Port and service mapping", detail: "Map listening ports to services and isolate blockers." },
             { id: "w2d3", title: "Wed: DNS troubleshooting", detail: "Trace resolution path and compare host-level differences." },
             { id: "w2d4", title: "Thu: Mounts and fstab", detail: "Practice persistent mount setup and validation logic." },
             { id: "w2d5", title: "Fri: Backup restore drill", detail: "Use tar and rsync for backup and recovery checks." },
             { id: "w2s", title: "Sat: Comprehensive troubleshooting lab", detail: "SSH plus DNS plus mount failure cascade scenario." },
             { id: "w2u", title: "Sun: Timed mini mock #2", detail: "60-minute Linux incident exam plus weak-topic review." }
           ]
         },
         {
           id: "w3",
           title: "Week 3: Kubernetes Foundations",
           goal: "Become fluent with kubectl and core workload objects.",
           open: false,
           tasks: [
             { id: "w3d1", title: "Mon: Architecture baseline", detail: "Inspect control-plane and node components." },
             { id: "w3d2", title: "Tue: Pods and ReplicaSets", detail: "Create and recover workloads from YAML and CLI." },
             { id: "w3d3", title: "Wed: Deployments and rollout", detail: "Perform image update, pause, resume, rollback." },
             { id: "w3d4", title: "Thu: Services selectors endpoints", detail: "Validate service routing and endpoint population." },
             { id: "w3d5", title: "Fri: ConfigMaps Secrets namespaces", detail: "Inject app config and secret data safely." },
             { id: "w3s", title: "Sat: Comprehensive troubleshooting lab", detail: "Broken deployment plus selector mismatch and wrong namespace." },
             { id: "w3u", title: "Sun: Timed mini mock #3", detail: "60-minute CKA foundation scenario set." }
           ]
         },
         {
           id: "w4",
           title: "Week 4: Scheduling and Workloads",
           goal: "Handle placement and lifecycle behavior under constraints.",
           open: false,
           tasks: [
             { id: "w4d1", title: "Mon: Resource requests limits", detail: "Tune CPU and memory constraints and observe effects." },
             { id: "w4d2", title: "Tue: Health probes", detail: "Configure liveness readiness startup probes and test." },
             { id: "w4d3", title: "Wed: Taints tolerations affinity", detail: "Force intentional workload placement and exclusion." },
             { id: "w4d4", title: "Thu: DaemonSets StatefulSets", detail: "Deploy node-wide and stateful apps with stable identity." },
             { id: "w4d5", title: "Fri: Jobs CronJobs", detail: "Run batch workloads and inspect retries and completions." },
             { id: "w4s", title: "Sat: Comprehensive troubleshooting lab", detail: "Pending pods plus CrashLoopBackOff plus probe timing issue." },
             { id: "w4u", title: "Sun: Timed mini mock #4", detail: "60-minute workload debugging sprint." }
           ]
         },
         {
           id: "w5",
           title: "Week 5: Kubernetes Networking and Storage",
           goal: "Solve service discovery and persistence problems.",
           open: false,
           tasks: [
             { id: "w5d1", title: "Mon: Cluster DNS checks", detail: "Run DNS test pods and isolate name resolution failures." },
             { id: "w5d2", title: "Tue: Ingress routing", detail: "Route host and path traffic across services." },
             { id: "w5d3", title: "Wed: PV PVC StorageClass", detail: "Bind persistent claims and inspect dynamic provisioning." },
             { id: "w5d4", title: "Thu: NetworkPolicy", detail: "Enforce allow deny policy and validate traffic behavior." },
             { id: "w5d5", title: "Fri: End-to-end connectivity", detail: "Trace app path pod to service to ingress." },
             { id: "w5s", title: "Sat: Comprehensive troubleshooting lab", detail: "DNS plus NetworkPolicy plus PVC failures in one chain." },
             { id: "w5u", title: "Sun: Timed mini mock #5", detail: "75-minute mixed CKA troubleshooting set." }
           ]
         },
         {
           id: "w6",
           title: "Week 6: Cluster Administration and Recovery",
           goal: "Build confidence in kubeadm and control-plane recovery tasks.",
           open: false,
           tasks: [
             { id: "w6d1", title: "Mon: kubeadm lifecycle", detail: "Inspect cluster bootstrap artifacts and configs." },
             { id: "w6d2", title: "Tue: kubelet diagnostics", detail: "Use systemctl and journalctl to resolve Node NotReady." },
             { id: "w6d3", title: "Wed: etcd backup restore", detail: "Perform and verify backup plus restore workflow." },
             { id: "w6d4", title: "Thu: Upgrade rehearsal", detail: "Practice version checks and upgrade sequence planning." },
             { id: "w6d5", title: "Fri: Runtime diagnostics", detail: "Use crictl to inspect runtime-level failures." },
             { id: "w6s", title: "Sat: Comprehensive troubleshooting lab", detail: "Node NotReady plus kubelet issue plus etcd restore chain." },
             { id: "w6u", title: "Sun: Timed mini mock #6", detail: "75-minute admin-focused scenario." }
           ]
         },
         {
           id: "w7",
           title: "Week 7: Security Intensive",
           goal: "Harden workloads and resolve permission policy breakages.",
           open: false,
           tasks: [
             { id: "w7d1", title: "Mon: RBAC fundamentals", detail: "Create and test roles and bindings with can-i checks." },
             { id: "w7d2", title: "Tue: Service accounts", detail: "Scope identities and verify workload binding behavior." },
             { id: "w7d3", title: "Wed: Pod security standards", detail: "Enforce restricted policy and fix denied specs." },
             { id: "w7d4", title: "Thu: Admission and policy flow", detail: "Analyze deny decisions and correct manifests." },
             { id: "w7d5", title: "Fri: Secrets image runtime security", detail: "Apply safe secret handling and image hygiene checks." },
             { id: "w7s", title: "Sat: Comprehensive troubleshooting lab", detail: "RBAC deny plus restricted pod plus policy block chain." },
             { id: "w7u", title: "Sun: Timed mini mock #7", detail: "90-minute CKS-style mixed tasks." }
           ]
         },
         {
           id: "w8",
           title: "Week 8: Final Consolidation and Simulation",
           goal: "Convert weak points into repeatable exam execution speed.",
           open: false,
           tasks: [
             { id: "w8d1", title: "Mon: Weak topic repair #1", detail: "Target highest miss topic from quiz and mocks." },
             { id: "w8d2", title: "Tue: Weak topic repair #2", detail: "Target second-highest miss topic." },
             { id: "w8d3", title: "Wed: Linux plus Kubernetes sprint", detail: "Run mixed troubleshooting drills from memory." },
             { id: "w8d4", title: "Thu: Security plus recovery sprint", detail: "Combine CKS and recovery tasks under time cap." },
             { id: "w8d5", title: "Fri: Command speed drill", detail: "No notes run-through for core commands." },
             { id: "w8s", title: "Sat: Comprehensive troubleshooting lab", detail: "Full stack incident with Linux and Kubernetes layers." },
             { id: "w8u", title: "Sun: Timed mini mock #8", detail: "90-minute final simulation and revision sheet." }
           ]
         }
       ];
     },
 
     toggleTask(taskId) {
       this.doneMap[taskId] = !this.doneMap[taskId];
       this.saveState();
       this.recompute();
     },
 
     isDone(taskId) {
       return !!this.doneMap[taskId];
     },
 
     recompute() {
       this.completedCount = Object.values(this.doneMap).filter(Boolean).length;
       this.overallCompletion = this.totalTaskCount === 0
         ? 0
         : Math.round((this.completedCount / this.totalTaskCount) * 100);
 
       const firstIncomplete = this.weeks.find((w) => w.tasks.some((t) => !this.isDone(t.id)));
       this.currentWeekLabel = firstIncomplete ? firstIncomplete.title.split(":")[0] : "Complete";
     },
 
     weekCompletion(week) {
       const done = week.tasks.filter((t) => this.isDone(t.id)).length;
       return Math.round((done / week.tasks.length) * 100);
     },
 
     expandAll() {
       this.weeks.forEach((w) => {
         w.open = true;
       });
       this.saveState();
     },
 
     collapseAll() {
       this.weeks.forEach((w) => {
         w.open = false;
       });
       this.saveState();
     },
 
     resetProgress() {
       if (!window.confirm("Reset all checkboxes and quiz history?")) {
         return;
       }
 
       this.doneMap = {};
       this.quizStats = {
         best: 0,
         last: 0,
         byTopic: {},
         byTopicCorrect: {},
         weakIds: [],
         bestScoreText: "0/10",
         lastScoreText: "0/10"
       };
       this.renderWeakTopics();
       this.saveState();
       this.recompute();
     },
 
     startQuiz() {
       this.activeQuiz = this.shuffle([...this.quizBank]).slice(0, 10).map((q) => ({ ...q, answered: false, isCorrect: false }));
       this.quizIndex = 0;
       this.quizActive = true;
       this.startTimer();
     },
 
     weakQuestionPool() {
       const weakSet = new Set(this.quizStats.weakIds);
       return this.quizBank.filter((q) => weakSet.has(q.id));
     },
 
     startWeakQuiz() {
       const pool = this.weakQuestionPool();
       if (pool.length === 0) {
         return;
       }
 
       this.activeQuiz = this.shuffle([...pool]).slice(0, Math.min(10, pool.length)).map((q) => ({ ...q, answered: false, isCorrect: false }));
       this.quizIndex = 0;
       this.quizActive = true;
       this.startTimer();
     },
 
     startTimer() {
       this.stopTimer();
       const secondsPerQuestion = this.quizDurationSeconds / 10;
       this.quizSecondsLeft = Math.max(180, Math.round(this.activeQuiz.length * secondsPerQuestion));
       this.quizTimerId = setInterval(() => {
         this.quizSecondsLeft -= 1;
         if (this.quizSecondsLeft <= 0) {
           this.finishQuiz();
         }
       }, 1000);
     },
 
     stopTimer() {
       if (this.quizTimerId) {
         clearInterval(this.quizTimerId);
         this.quizTimerId = null;
       }
     },
 
     formatTime(totalSeconds) {
       const safeSeconds = Math.max(0, totalSeconds);
       const minutes = Math.floor(safeSeconds / 60);
       const seconds = safeSeconds % 60;
       return minutes + ":" + String(seconds).padStart(2, "0");
     },
 
     currentQuestion() {
       return this.activeQuiz[this.quizIndex] || { options: [] };
     },
 
     answerQuestion(selected) {
       const q = this.currentQuestion();
       if (q.answered) {
         return;
       }
 
       q.answered = true;
       q.isCorrect = selected === q.answer;
 
       if (!q.isCorrect) {
         this.quizStats.byTopic[q.topic] = (this.quizStats.byTopic[q.topic] || 0) + 1;
         if (!this.quizStats.weakIds.includes(q.id)) {
           this.quizStats.weakIds.push(q.id);
         }
       } else {
         this.quizStats.byTopicCorrect[q.topic] = (this.quizStats.byTopicCorrect[q.topic] || 0) + 1;
         this.quizStats.weakIds = this.quizStats.weakIds.filter((id) => id !== q.id);
       }
     },
 
     nextQuestion() {
       if (this.quizIndex < this.activeQuiz.length - 1) {
         this.quizIndex += 1;
         return;
       }
 
       this.finishQuiz();
     },
 
     finishQuiz() {
       this.stopTimer();
       const correct = this.activeQuiz.filter((q) => q.isCorrect).length;
       const attempted = this.activeQuiz.length;
       this.quizStats.last = correct;
       this.quizStats.best = Math.max(this.quizStats.best, correct);
       this.quizStats.lastScoreText = `${correct}/${attempted}`;
       this.quizStats.bestScoreText = `${this.quizStats.best}/${attempted}`;
       this.quizActive = false;
       this.activeQuiz = [];
       this.quizIndex = 0;
       this.renderWeakTopics();
       this.saveState();
     },
 
     renderWeakTopics() {
       this.weakTopics = Object.entries(this.quizStats.byTopic)
         .map(([name, wrong]) => ({ name, wrong }))
         .sort((a, b) => b.wrong - a.wrong);
 
       this.strongTopics = Object.entries(this.quizStats.byTopicCorrect || {})
         .map(([name, correct]) => ({ name, correct }))
         .sort((a, b) => b.correct - a.correct);
     },
 
     addNote() {
       const text = this.noteDraft.trim();
       if (!text) {
         return;
       }
 
       this.notes.unshift({
         id: `n${Date.now()}`,
         text,
         date: new Date().toLocaleDateString()
       });
       this.noteDraft = "";
       this.saveState();
     },
 
     deleteNote(noteId) {
       this.notes = this.notes.filter((n) => n.id !== noteId);
       this.saveState();
     },
 
     exportProgress() {
       const payload = {
         doneMap: this.doneMap,
         quizStats: this.quizStats,
         notes: this.notes,
         exportedAt: new Date().toISOString()
       };
       const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
       const url = URL.createObjectURL(blob);
       const link = document.createElement("a");
       link.href = url;
       link.download = `exam-prep-progress-${new Date().toISOString().slice(0, 10)}.json`;
       link.click();
       URL.revokeObjectURL(url);
     },
 
     importProgress(event) {
       const file = event.target.files && event.target.files[0];
       if (!file) {
         return;
       }
 
       const reader = new FileReader();
       reader.onload = () => {
         try {
           const parsed = JSON.parse(String(reader.result));
           if (parsed.doneMap && typeof parsed.doneMap === "object") {
             this.doneMap = parsed.doneMap;
           }
           if (parsed.quizStats && typeof parsed.quizStats === "object") {
             this.quizStats = {
               best: parsed.quizStats.best || 0,
               last: parsed.quizStats.last || 0,
               byTopic: parsed.quizStats.byTopic || {},
               byTopicCorrect: parsed.quizStats.byTopicCorrect || {},
               weakIds: parsed.quizStats.weakIds || [],
               bestScoreText: parsed.quizStats.bestScoreText || "0/10",
               lastScoreText: parsed.quizStats.lastScoreText || "0/10"
             };
           }
           if (Array.isArray(parsed.notes)) {
             this.notes = parsed.notes;
           }
           this.renderWeakTopics();
           this.recompute();
           this.saveState();
           window.alert("Progress imported successfully.");
         } catch (err) {
           console.error("Invalid backup file", err);
           window.alert("Could not import file: invalid or corrupted backup JSON.");
         }
       };
       reader.readAsText(file);
       event.target.value = "";
     },
 
     severityClass(wrong) {
       if (wrong >= 6) {
         return "high";
       }
 
       if (wrong >= 3) {
         return "mid";
       }
 
       return "low";
     },
 
     saveState() {
       const payload = {
         doneMap: this.doneMap,
         weekOpen: this.weeks.map((w) => ({ id: w.id, open: w.open })),
         quizStats: this.quizStats,
         notes: this.notes
       };
 
       try {
         localStorage.setItem(this.storageKey, JSON.stringify(payload));
       } catch (err) {
         console.error("Could not save progress locally", err);
       }
     },
 
     loadState() {
       const raw = localStorage.getItem(this.storageKey);
       if (!raw) {
         return;
       }
 
       try {
         const state = JSON.parse(raw);
         this.doneMap = state.doneMap || {};
 
         if (Array.isArray(state.weekOpen)) {
           const openMap = Object.fromEntries(state.weekOpen.map((w) => [w.id, w.open]));
           this.weeks.forEach((w) => {
             if (Object.prototype.hasOwnProperty.call(openMap, w.id)) {
               w.open = !!openMap[w.id];
             }
           });
         }
 
         if (state.quizStats) {
           this.quizStats = {
             best: state.quizStats.best || 0,
             last: state.quizStats.last || 0,
             byTopic: state.quizStats.byTopic || {},
             byTopicCorrect: state.quizStats.byTopicCorrect || {},
             weakIds: state.quizStats.weakIds || [],
             bestScoreText: state.quizStats.bestScoreText || "0/10",
             lastScoreText: state.quizStats.lastScoreText || "0/10"
           };
         }
 
         if (Array.isArray(state.notes)) {
           this.notes = state.notes;
         }
       } catch (err) {
         console.error("Could not load state", err);
       }
     },
 
     shuffle(arr) {
       for (let i = arr.length - 1; i > 0; i -= 1) {
         const j = Math.floor(Math.random() * (i + 1));
         [arr[i], arr[j]] = [arr[j], arr[i]];
       }
       return arr;
     }
   };
 }
