import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GatePYQ {
  id: number;
  year: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  userSelectedIndex?: number;
}

export interface GateFormula {
  title: string;
  formula: string;
  description: string;
}

export interface GateSimulation {
  title: string;
  type: 'visualization' | 'interactive';
  description: string;
  actionText: string;
}

export interface GateSubtopic {
  id: string;
  title: string;
  description: string;
  notesPdfUrl?: string;
  formulas: GateFormula[];
  simulations: GateSimulation[];
  pyqs: GatePYQ[];
}

export interface GateSubject {
  id: number;
  name: string;
  code: string;
  icon: string;
  topicsCount: number;
  subtopics: GateSubtopic[];
}

@Component({
  selector: 'app-gate-prep',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gate-prep.html',
  styleUrl: './gate-prep.css'
})
export class GatePrepComponent {
  selectedSubject = signal<GateSubject | null>(null);
  selectedSubtopic = signal<GateSubtopic | null>(null);
  activeTab = signal<'notes' | 'formulas' | 'simulations' | 'pyqs'>('notes');

  subjects: GateSubject[] = [
    // 1. Engineering Mathematics
    { 
      id: 1, 
      name: 'Engineering Mathematics', 
      code: 'EM', 
      icon: '📐', 
      topicsCount: 5,
      subtopics: [
        { 
          id: 'em-1', 
          title: 'Discrete Mathematics', 
          description: 'Propositional & predicate logic, sets, relations, functions, partial orders, groups',
          notesPdfUrl: '/assets/docs/discrete_math.pdf',
          formulas: [
            { title: 'Handshaking Theorem', formula: 'Σ deg(v) = 2|E|', description: 'Sum of degrees of all vertices equals twice the number of edges.' },
            { title: 'Euler Formula for Planar Graphs', formula: 'V - E + F = 2', description: 'Relates vertices, edges, and faces in connected planar graphs.' }
          ],
          simulations: [
            { title: 'Truth Table Generator', type: 'interactive', description: 'Build and verify truth tables for boolean logic statements.', actionText: 'Launch Generator' }
          ],
          pyqs: [
            {
              id: 101,
              year: 'GATE 2023',
              question: 'How many undirected graphs can be constructed out of a given set V of n vertices?',
              options: ['2^(n(n-1)/2)', '2^n', 'n(n-1)/2', '2^(n^2)'],
              correctOptionIndex: 0,
              explanation: 'Total possible edges is C(n,2) = n(n-1)/2. Since each edge can either exist or not exist, total graphs = 2^(n(n-1)/2).'
            }
          ]
        },
        { 
          id: 'em-2', 
          title: 'Linear Algebra', 
          description: 'Matrices, determinants, system of linear equations, eigenvalues & eigenvectors, LU decomposition',
          notesPdfUrl: '/assets/docs/linear_algebra.pdf',
          formulas: [
            { title: 'Sum & Product of Eigenvalues', formula: 'Trace(A) = Σλ_i  |  det(A) = Πλ_i', description: 'Trace equals sum of eigenvalues; determinant equals product of eigenvalues.' }
          ],
          simulations: [
            { title: 'Eigenvalue Visualizer', type: 'visualization', description: 'See how vector transformations work on 2D matrices.', actionText: 'Visualize Transformation' }
          ],
          pyqs: [
            {
              id: 102,
              year: 'GATE 2022',
              question: 'If a 3x3 matrix A has eigenvalues 1, 2, and 3, what is det(A)?',
              options: ['6', '5', '0', '1'],
              correctOptionIndex: 0,
              explanation: 'Determinant equals product of eigenvalues: 1 * 2 * 3 = 6.'
            }
          ]
        },
        { id: 'em-3', title: 'Calculus', description: 'Limits, continuity, differentiability, mean value theorems, integration, Fourier series', formulas: [{ title: 'L\'Hôpital\'s Rule', formula: 'lim [f(x)/g(x)] = lim [f\'(x)/g\'(x)]', description: 'Applies to 0/0 or ∞/∞ indeterminate forms.' }], simulations: [], pyqs: [] },
        { id: 'em-4', title: 'Probability & Statistics', description: 'Random variables, uniform/normal/exponential distributions, conditional probability, Bayes theorem', formulas: [{ title: 'Bayes Theorem', formula: 'P(A|B) = P(B|A)*P(A) / P(B)', description: 'Calculates conditional probability using prior knowledge.' }], simulations: [], pyqs: [] },
        { id: 'em-5', title: 'Combinatorics & Graph Theory', description: 'Permutations, combinations, counting, recurrence relations, generating functions', formulas: [{ title: 'Combinations', formula: 'nCr = n! / (r! * (n - r)!)', description: 'Number of ways to choose r items from n without replacement.' }], simulations: [], pyqs: [] }
      ]
    },

    // 2. Digital Logic
    { 
      id: 2, 
      name: 'Digital Logic', 
      code: 'DL', 
      icon: '⚡', 
      topicsCount: 4,
      subtopics: [
        { 
          id: 'dl-1', 
          title: 'Boolean Algebra & Logic Gates', 
          description: 'K-Maps, minimization, logic gates, canonical forms (SOP/POS)',
          notesPdfUrl: '/assets/docs/digital_logic.pdf',
          formulas: [
            { title: 'De Morgan Laws', formula: '(A + B)\' = A\' . B\' and (A . B)\' = A\' + B\'', description: 'Fundamental logic dualities.' }
          ],
          simulations: [
            { title: 'K-Map Solver Visualizer', type: 'interactive', description: 'Interactively group 1s and minterms to form minimal SOP expression.', actionText: 'Open K-Map Solver' }
          ],
          pyqs: [
            {
              id: 201,
              year: 'GATE 2022',
              question: 'Which logic gate is known as a Universal Gate?',
              options: ['AND', 'OR', 'NAND', 'XOR'],
              correctOptionIndex: 2,
              explanation: 'NAND and NOR gates are universal gates because any boolean function can be implemented using only NAND (or NOR) gates.'
            }
          ]
        },
        { id: 'dl-2', title: 'Combinational Circuits', description: 'Multiplexers, decoders, encoders, adders, subtractors, ALUs', formulas: [{ title: 'Mux Select Lines', formula: 'Inputs = 2^n for n select lines', description: 'A 2^n to 1 MUX requires n select lines.' }], simulations: [], pyqs: [] },
        { id: 'dl-3', title: 'Sequential Circuits', description: 'Flip-flops, state minimization, counters, shift registers, finite state machines', formulas: [{ title: 'Mod-N Counter', formula: 'Number of Flip-Flops (n) >= log2(N)', description: 'Minimum flip-flops needed for mod-N counting.' }], simulations: [], pyqs: [] },
        { id: 'dl-4', title: 'Data Representation', description: 'Number representations, signed magnitude, 2s complement, IEEE 754 floating point standard', formulas: [{ title: '2s Complement Range', formula: '-2^(n-1) to 2^(n-1) - 1', description: 'Representable range for n-bit signed integers.' }], simulations: [], pyqs: [] }
      ]
    },

    // 3. Computer Organization and Architecture
    { 
      id: 3, 
      name: 'Computer Organization & Architecture', 
      code: 'COA', 
      icon: '💻', 
      topicsCount: 6,
      subtopics: [
        { 
          id: 'coa-3', 
          title: 'Instruction Pipelining', 
          description: 'Pipeline hazards (structural, data, control), branch prediction, throughput, speedup calculations',
          notesPdfUrl: '/assets/docs/coa_pipelining.pdf',
          formulas: [
            { title: 'Speedup Ratio', formula: 'S = (n * k) / (k + n - 1)', description: 'Speedup ratio for k-stage pipeline with n instructions assuming no stalls.' }
          ],
          simulations: [
            { title: 'Pipeline Hazard Simulator', type: 'interactive', description: 'Simulate data hazards (RAW) and insert stalls/forwarding dynamically.', actionText: 'Launch Simulator' }
          ],
          pyqs: [
            {
              id: 301,
              year: 'GATE 2021',
              question: 'What is the ideal speedup factor of a 5-stage instruction pipeline over a non-pipelined execution?',
              options: ['1', '5', '2.5', '10'],
              correctOptionIndex: 1,
              explanation: 'Ideal speedup factor for a k-stage pipeline equals the number of stages (k = 5).'
            }
          ]
        },
        { id: 'coa-1', title: 'Machine Instructions & Addressing Modes', description: 'Instruction formats, opcode encoding, addressing modes, stack architectures', formulas: [], simulations: [], pyqs: [] },
        { id: 'coa-2', title: 'ALU & Data Path Control', description: 'Data path design, control unit (hardwired vs microprogrammed)', formulas: [], simulations: [], pyqs: [] },
        { id: 'coa-4', title: 'Memory Hierarchy & Cache Design', description: 'Direct/associative cache mapping, write policies, replacement algorithms, hit/miss ratios', formulas: [{ title: 'Average Memory Access Time (AMAT)', formula: 'AMAT = Hit Time + (Miss Rate * Miss Penalty)', description: 'Standard cache performance valuation.' }], simulations: [], pyqs: [] },
        { id: 'coa-5', title: 'I/O Interface & Interrupts', description: 'Programmed I/O, interrupt-driven I/O, DMA transfers', formulas: [], simulations: [], pyqs: [] },
        { id: 'coa-6', title: 'Secondary Storage & Disk Array', description: 'Disk scheduling, RAID levels, sector layout timing', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 4. Programming and Data Structures
    { 
      id: 4, 
      name: 'Programming & Data Structures', 
      code: 'DS', 
      icon: '🌳', 
      topicsCount: 5,
      subtopics: [
        { 
          id: 'ds-1', 
          title: 'C Programming', 
          description: 'Functions, recursion, scope, pointers, structures, dynamic memory management',
          notesPdfUrl: '/assets/docs/c_programming.pdf',
          formulas: [
            { title: 'Pointer Arithmetic', formula: 'ptr + i = Address + (i * sizeof(DataType))', description: 'Address step formula for pointers.' }
          ],
          simulations: [
            { title: 'Call Stack Visualizer', type: 'interactive', description: 'Visualize dynamic activation records and stack frames in recursive C functions.', actionText: 'Trace Call Stack' }
          ],
          pyqs: [
            {
              id: 401,
              year: 'GATE 2020',
              question: 'What is the evaluation order of function arguments in C standard?',
              options: ['Left to Right', 'Right to Left', 'Compiler Dependent', 'Simultaneous'],
              correctOptionIndex: 2,
              explanation: 'The C standard leaves the order of evaluation of function arguments as undefined/unspecified (compiler dependent).'
            }
          ]
        },
        { id: 'ds-2', title: 'Arrays, Stacks & Queues', description: '1D/2D arrays, stack evaluation, infix/postfix conversions, circular queues', formulas: [], simulations: [], pyqs: [] },
        { id: 'ds-3', title: 'Linked Lists', description: 'Singly, doubly, and circular linked lists implementation and operations', formulas: [], simulations: [], pyqs: [] },
        { id: 'ds-4', title: 'Trees & Binary Search Trees', description: 'Tree traversals, BST insertions/deletions, height balanced trees (AVL trees)', formulas: [{ title: 'Max Nodes in Binary Tree', formula: 'N = 2^h - 1', description: 'Maximum nodes for height h tree.' }], simulations: [], pyqs: [] },
        { id: 'ds-5', title: 'Heaps & Hashing', description: 'Binary heaps, min/max heap operations, hash tables, collision resolution', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 5. Algorithms
    { 
      id: 5, 
      name: 'Algorithms', 
      code: 'ALGO', 
      icon: '⚡', 
      topicsCount: 5,
      subtopics: [
        { 
          id: 'algo-1', 
          title: 'Asymptotic Complexity & Recurrences', 
          description: 'Big-O, Omega, Theta, Master Theorem, Substitution Method', 
          notesPdfUrl: '/assets/docs/algo_asymptotics.pdf',
          formulas: [
            { title: 'Master Theorem Formula', formula: 'T(n) = aT(n/b) + f(n)', description: 'Determines asymptotic bounds for divide and conquer recurrences.' },
            { title: 'Big-O Formal Definition', formula: '0 <= f(n) <= c * g(n)', description: 'Holds for all n >= n0 where c > 0 and n0 >= 1.' }
          ],
          simulations: [
            { title: 'Growth Rate Plotter', type: 'visualization', description: 'Compare N, N log N, N^2, and 2^N runtime curves dynamically.', actionText: 'Launch Growth Plotter' }
          ],
          pyqs: [
            {
              id: 501,
              year: 'GATE 2023',
              question: 'Which of the following functions grows asymptotically fastest?',
              options: ['n^2', '2^(log_2(n))', 'n^(1.5)', 'n log_2(n)'],
              correctOptionIndex: 0,
              explanation: 'n^2 is O(n^2), whereas 2^(log_2(n)) = n, making n^2 the fastest growing.'
            }
          ]
        },
        { 
          id: 'algo-4', 
          title: 'Graph Algorithms', 
          description: 'BFS, DFS, Minimum Spanning Trees (Kruskal, Prim), Bellman-Ford, Floyd-Warshall', 
          notesPdfUrl: '/assets/docs/graph_algorithms.pdf',
          formulas: [
            { title: 'Dijkstra Time Complexity', formula: 'O((V + E) log V)', description: 'Using Min-Heap priority queue implementation.' },
            { title: 'Floyd-Warshall All-Pairs Shortest Path', formula: 'O(V^3)', description: 'Dynamic programming matrix transformation for all vertex pairs.' }
          ],
          simulations: [
            { title: 'Dijkstra Visualizer', type: 'interactive', description: 'Step through vertex distance relaxation step by step.', actionText: 'Run Shortest Path Visualizer' },
            { title: 'Kruskal vs Prim MST Builder', type: 'visualization', description: 'Compare greedy edge additions live on custom weighted graphs.', actionText: 'Compare MST Algorithms' }
          ],
          pyqs: [
            {
              id: 502,
              year: 'GATE 2024',
              question: 'In a connected weighted graph, what condition guarantees a unique MST?',
              options: ['Graph is planar', 'All edge weights are distinct', 'Graph has no cycles', 'Graph is bipartite'],
              correctOptionIndex: 1,
              explanation: 'If all edge weights in a graph are strictly distinct, the Minimum Spanning Tree is guaranteed to be unique.'
            }
          ]
        },
        { id: 'algo-2', title: 'Divide & Conquer and Sorting', description: 'Merge Sort, Quick Sort, Heap Sort, Counting Sort, Comparison bounds', formulas: [], simulations: [], pyqs: [] },
        { id: 'algo-3', title: 'Greedy & Dynamic Programming', description: 'Knapsack, Huffman Coding, Dijkstra, LCS, Matrix Chain Multiplication', formulas: [], simulations: [], pyqs: [] },
        { id: 'algo-5', title: 'NP-Completeness', description: 'P, NP, NP-Hard, NP-Complete reductions', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 6. Theory of Computation
    { 
      id: 6, 
      name: 'Theory of Computation', 
      code: 'TOC', 
      icon: '⚙️', 
      topicsCount: 4,
      subtopics: [
        { 
          id: 'toc-1', 
          title: 'Regular Languages & Finite Automata', 
          description: 'DFA, NFA, Regular Expressions, Pumping Lemma, State Minimization',
          notesPdfUrl: '/assets/docs/toc_regular.pdf',
          formulas: [
            { title: 'DFA Minimization Theorem', formula: 'Equivalence Classes = Minimal States', description: 'Myhill-Nerode theorem gives exact minimal states.' }
          ],
          simulations: [
            { title: 'DFA Simulator Engine', type: 'interactive', description: 'Test string inputs against interactive finite state transitions live.', actionText: 'Run DFA Simulator' }
          ],
          pyqs: [
            {
              id: 601,
              year: 'GATE 2021',
              question: 'Which of the following is TRUE regarding regular languages?',
              options: ['Closed under Union and Intersection', 'Not closed under Complement', 'Context free implies Regular', 'Undecidable string membership'],
              correctOptionIndex: 0,
              explanation: 'Regular languages are closed under union, intersection, complementation, concatenation, and Kleene star.'
            }
          ]
        },
        { id: 'toc-2', title: 'Context-Free Languages & Pushdown Automata', description: 'CFG, Ambiguity, DPDA, NPDA, Closure Properties', formulas: [], simulations: [], pyqs: [] },
        { id: 'toc-3', title: 'Turing Machines & Decidability', description: 'TM Variants, Halting Problem, Undecidable Problems, Rice Theorem', formulas: [], simulations: [], pyqs: [] },
        { id: 'toc-4', title: 'Chomsky Hierarchy', description: 'Grammar classification and language recognition capabilities', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 7. Compiler Design
    { 
      id: 7, 
      name: 'Compiler Design', 
      code: 'CD', 
      icon: '🛠️', 
      topicsCount: 4,
      subtopics: [
        { 
          id: 'cd-2', 
          title: 'Parsing & Syntax Analysis', 
          description: 'Top-down (LL1) and Bottom-up (LR0, SLR1, LALR1, CLR1) parsers, shift-reduce conflicts',
          notesPdfUrl: '/assets/docs/compiler_parsing.pdf',
          formulas: [
            { title: 'Parser Power Hierarchy', formula: 'LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)', description: 'Expressive power relation between bottom-up parsers.' }
          ],
          simulations: [
            { title: 'LL(1) Parser Table Builder', type: 'interactive', description: 'Compute FIRST and FOLLOW sets to construct parsing tables.', actionText: 'Build Parser Table' }
          ],
          pyqs: [
            {
              id: 701,
              year: 'GATE 2022',
              question: 'Which grammar is parsed efficiently without backtracking using one token lookahead?',
              options: ['LL(1)', 'Ambiguous Grammar', 'LR(2)', 'Non-Deterministic Grammar'],
              correctOptionIndex: 0,
              explanation: 'LL(1) parsers process context-free grammars deterministically from left-to-right using 1 lookahead token.'
            }
          ]
        },
        { id: 'cd-1', title: 'Lexical Analysis', description: 'Tokens, regular expressions, finite automata construction, LEX tools', formulas: [], simulations: [], pyqs: [] },
        { id: 'cd-3', title: 'Syntax Directed Translation', description: 'S-attributed & L-attributed definitions, 3-address code, DAGs', formulas: [], simulations: [], pyqs: [] },
        { id: 'cd-4', title: 'Runtime Environments & Optimization', description: 'Activation records, parameter passing, basic blocks, flow graphs', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 8. Operating System
    { 
      id: 8, 
      name: 'Operating System', 
      code: 'OS', 
      icon: '🖥️', 
      topicsCount: 5,
      subtopics: [
        { 
          id: 'os-3', 
          title: 'Process Synchronization & Deadlocks', 
          description: 'Semaphores, Mutex, Classical IPC Problems, Banker Algorithm',
          notesPdfUrl: '/assets/docs/os_sync.pdf',
          formulas: [
            { title: 'Banker Safety Condition', formula: 'Need[i][j] = Max[i][j] - Allocation[i][j]', description: 'Calculates additional resource request needed by process i.' }
          ],
          simulations: [
            { title: 'Banker Algorithm Deadlock Tester', type: 'interactive', description: 'Input resource matrix and evaluate whether state is safe or deadlocked.', actionText: 'Run Safety Check' }
          ],
          pyqs: [
            {
              id: 801,
              year: 'GATE 2023',
              question: 'Which of the following conditions is NOT required for a deadlock to occur?',
              options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'],
              correctOptionIndex: 2,
              explanation: 'NO Preemption is required for deadlock. If preemption is enabled, deadlocks are prevented.'
            }
          ]
        },
        { id: 'os-1', title: 'Process & Thread Management', description: 'PCB, Process states, System calls, Multithreading models', formulas: [], simulations: [], pyqs: [] },
        { id: 'os-2', title: 'CPU Scheduling', description: 'FCFS, SJF, Round Robin, Priority scheduling, Multi-level Queue', formulas: [{ title: 'Turnaround Time', formula: 'TAT = Completion Time - Arrival Time', description: 'Total process cycle duration.' }], simulations: [], pyqs: [] },
        { id: 'os-4', title: 'Memory Management & Virtual Memory', description: 'Paging, Segmentation, Page Replacement (LRU, FIFO, Optimal), Thrashing', formulas: [], simulations: [], pyqs: [] },
        { id: 'os-5', title: 'File Systems & Disk Scheduling', description: 'File allocation methods, Disk Scheduling (SCAN, C-LOOK)', formulas: [], simulations: [], pyqs: [] }
      ]
    },

    // 9. Databases
    { 
      id: 9, 
      name: 'Databases', 
      code: 'DBMS', 
      icon: '🗄️', 
      topicsCount: 4,
      subtopics: [
        { 
          id: 'dbms-2', 
          title: 'SQL & Database Normalization', 
          description: 'Complex Queries, Functional Dependencies, 1NF, 2NF, 3NF, BCNF',
          notesPdfUrl: '/assets/docs/dbms_normalization.pdf',
          formulas: [
            { title: '3NF vs BCNF Condition', formula: 'X -> Y is BCNF if X is Superkey', description: '3NF relaxes this by allowing Y to be a prime attribute.' }
          ],
          simulations: [
            { title: 'Normalization Normal Form Finder', type: 'interactive', description: 'Enter functional dependencies and auto-determine highest normal form.', actionText: 'Analyze Normal Form' }
          ],
          pyqs: [
            {
              id: 901,
              year: 'GATE 2022',
              question: 'If a relation R is in BCNF, then it is also guaranteed to be in:',
              options: ['3NF', '4NF', '5NF', 'None of these'],
              correctOptionIndex: 0,
              explanation: 'BCNF is strictly stronger than 3NF. Any relation in BCNF is automatically in 3NF, 2NF, and 1NF.'
            }
          ]
        },
        { id: 'dbms-1', title: 'ER Models & Relational Algebra', description: 'Entity-Relationship Diagrams, Relational Algebra, Tuple/Domain Calculus', formulas: [], simulations: [], pyqs: [] },
        { id: 'dbms-3', title: 'Transactions & Concurrency Control', description: 'ACID properties, Serializability, 2PL, Timestamp ordering', formulas: [], simulations: [], pyqs: [] },
        { id: 'dbms-4', title: 'Indexing & B/B+ Trees', description: 'Primary/Secondary Indexes, B-Tree & B+ Tree insertions and height formulas', formulas: [{ title: 'B+ Tree Order Formula', formula: 'p*P_ptr + (p-1)*Key <= BlockSize', description: 'Determines maximum node capacity.' }], simulations: [], pyqs: [] }
      ]
    },

    // 10. Computer Networks
    { 
      id: 10, 
      name: 'Computer Networks', 
      code: 'CN', 
      icon: '🌐', 
      topicsCount: 5,
      subtopics: [
        { 
          id: 'cn-2', 
          title: 'Network Layer & IP Addressing', 
          description: 'IPv4/IPv6 headers, Subnetting, CIDR, Routing algorithms (Distance Vector, Link State)',
          notesPdfUrl: '/assets/docs/cn_ip_addressing.pdf',
          formulas: [
            { title: 'Subnet Mask Usable Hosts', formula: 'Usable Hosts = 2^(32 - N) - 2', description: 'For /N prefix mask length.' }
          ],
          simulations: [
            { title: 'Subnet & CIDR Calculator', type: 'interactive', description: 'Input IP and mask prefix to compute network ID, broadcast address, and range.', actionText: 'Calculate Subnet' }
          ],
          pyqs: [
            {
              id: 1001,
              year: 'GATE 2023',
              question: 'An IP subnet mask of /26 allows for how many usable host IP addresses?',
              options: ['62', '64', '30', '126'],
              correctOptionIndex: 0,
              explanation: 'Host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Usable host IPs = 64 - 2 = 62 (excluding network and broadcast addresses).'
            }
          ]
        },
        { id: 'cn-1', title: 'Data Link Layer & Framing', description: 'Error control (CRC), Flow control (Sliding Window), Ethernet (CSMA/CD)', formulas: [{ title: 'CSMA/CD Efficiency', formula: 'η = 1 / (1 + 6.44a)', description: 'Where a = T_prop / T_trans.' }], simulations: [], pyqs: [] },
        { id: 'cn-3', title: 'Transport Layer & Congestion Control', description: 'TCP/UDP protocols, 3-way handshake, TCP congestion control', formulas: [], simulations: [], pyqs: [] },
        { id: 'cn-4', title: 'Application Layer Protocols', description: 'DNS, HTTP, FTP, SMTP, DHCP', formulas: [], simulations: [], pyqs: [] },
        { id: 'cn-5', title: 'Network Security', description: 'Symmetric & Public key cryptography, RSA, Digital Signatures, Firewalls', formulas: [], simulations: [], pyqs: [] }
      ]
    }
  ];

  selectSubject(subject: GateSubject) {
    this.selectedSubject.set(subject);
    this.selectedSubtopic.set(null);
  }

  clearSelection() {
    this.selectedSubject.set(null);
    this.selectedSubtopic.set(null);
  }

  selectSubtopic(subtopic: GateSubtopic) {
    this.selectedSubtopic.set(subtopic);
    this.activeTab.set('notes');
  }

  setTab(tab: 'notes' | 'formulas' | 'simulations' | 'pyqs') {
    this.activeTab.set(tab);
  }

  selectOption(pyq: GatePYQ, optionIndex: number) {
    pyq.userSelectedIndex = optionIndex;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
}