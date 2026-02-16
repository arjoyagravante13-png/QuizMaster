let currentSub = "", currentType = "";
let qIndex = 0;
let score = 0;
let completed = { MCQ: false, ID: false, PS: false };
let canClick = true;

const quotes = [
    "\"Success is the sum of small efforts, repeated day in and day out.\" – Robert Collier",
    "\"It always seems impossible until it's done.\" – Nelson Mandela"
];

const quizData = {
    "AL 101": {
        MCQ: { 
            questions: ["A teacher asked students to analyze an algorithm that repeatedly compares and swaps adjacent elements in a list until everything is sorted. What is its complexity?", "Which algorithm uses the Divide and Conquer strategy?", "What is the best case time complexity of Bubble Sort?", "Which data structure is primarily used in DFS (Depth First Search)?", "What is the time complexity of Binary Search?", "Which sorting algorithm is known as the fastest on average?", "In Big O notation, what does O(1) mean?", "Which of the following is NOT a sorting algorithm?", "What is the main advantage of Quick Sort?", "Which algorithm is used to find the shortest path in a graph?"], 
            choices: [["a. O(log n)", "b. O(n log n)", "c. O(n)", "d. O(n^2)"], ["a. Selection Sort", "b. Merge Sort", "c. Bubble Sort", "d. Insertion Sort"], ["a. O(n)", "b. O(n^2)", "c. O(log n)", "d. O(1)"], ["a. Queue", "b. Stack", "c. Linked List", "d. Tree"], ["a. O(n)", "b. O(n^2)", "c. O(log n)", "d. O(n log n)"], ["a. Bubble Sort", "b. Selection Sort", "c. Quick Sort", "d. Insertion Sort"], ["a. Linear Time", "b. Logarithmic Time", "c. Constant Time", "d. Quadratic Time"], ["a. Merge", "b. Quick", "c. Binary", "d. Selection"], ["a. Stable sorting", "b. Low memory usage", "c. In-place sorting", "d. Slowest speed"], ["a. Kruskal's", "b. Dijkstra's", "c. Prim's", "d. Huffman"]], 
            answers: ["D", "B", "A", "B", "C", "C", "C", "C", "C", "B"] 
        },
        ID: { 
            questions: ["It breaks the problem into smaller sub-problems.", "The notation used to describe the upper bound of an algorithm's running time.", "A sorting algorithm that picks an element as 'pivot'.", "It is a step-by-step procedure to solve a problem.", "This complexity class means the time grows linearly with the input size.", "The 'M' in RAM stands for?", "A graph traversal that uses a Queue.", "The process of calling a function within itself.", "It refers to the amount of memory an algorithm uses.", "A search algorithm that requires the list to be sorted."], 
            answers: ["DIVIDE STEPS", "BIG O", "QUICK SORT", "ALGORITHM", "LINEAR", "MEMORY", "BFS", "RECURSION", "SPACE COMPLEXITY", "BINARY SEARCH"] 
        },
        PS: { 
            questions: ["Merge Sort: 70, 20, 30, 50, 60, 10, 40", "Given the list: 5, 1, 4, 2, 8. What is the sorted list using Bubble Sort?",  "Arrange in ascending order: 9, 3, 7, 1, 5",  "Binary Search: Find 15 in [5, 10, 15, 20, 25]",   "Quick Sort: 12, 7, 14, 9, 10",  "Count the comparisons in Bubble Sort for list: 4, 3, 2, 1",   "Determine Big O of Linear Search",  "DFS uses which data structure?", "Output after Insertion Sort: 8, 4, 3, 7", "Worst-case time complexity of Quick Sort"], 
            answers: ["10, 20, 30, 40, 50, 60, 70", "1, 2, 4, 5, 8", "1, 3, 5, 7, 9",  "15",  "7, 9, 10, 12, 14",  "6",  "O(N)",   "STACK",  "3, 4, 7, 8",   "O(N^2)"] 
        }
    },
    "CC104": {
        MCQ: { 
            questions: ["A computer science instructor asks students to classify items as data structures. Which should NOT be included?", "Which data structure works on the LIFO principle?", "Which data structure works on the FIFO principle?", "A data structure where each node has at most two children.", "What do you call the top node of a tree?", "Which of the following is a non-linear data structure?", "It is a collection of elements with a fixed size and same type.", "What is the term for adding an element to a stack?", "What is the term for removing an element from a queue?", "Which data structure uses pointers to connect nodes?"], 
            choices: [["a. Array", "b. Compiler", "c. Stacks", "d. Tree"], ["a. Queue", "b. Array", "c. Stack", "d. Hash Table"], ["a. Stack", "b. Queue", "c. Linked List", "d. Tree"], ["a. Binary Tree", "b. Heap", "c. Stack", "d. Array"], ["a. Leaf", "b. Branch", "c. Root", "d. Stem"], ["a. Array", "b. Stack", "c. Tree", "d. Queue"], ["a. Array", "b. Stack", "c. Linked List", "d. Queue"], ["a. Pop", "b. Push", "c. Insert", "d. Enqueue"], ["a. Pop", "b. Dequeue", "c. Delete", "d. Remove"], ["a. Array", "b. Linked List", "c. Stack", "d. Vector"]], 
            answers: ["B", "C", "B", "A", "C", "C", "A", "B", "B", "B"] 
        },
        ID: { 
            questions: ["It breaks the problem into smaller sub-problems.", "A linear data structure where elements are not stored in contiguous memory.", "The acronym LIFO stands for?", "The acronym FIFO stands for?", "A tree node that has no children.", "A data structure that stores key-value pairs.", "The act of visiting each node in a tree once.", "A stack underflow occurs when trying to pop from an empty stack.", "A data structure used to represent network connections.", "The first element of an array is at what index?"], 
            answers: ["DIVIDE STEPS", "LINKED LIST", "LAST IN FIRST OUT", "FIRST IN FIRST OUT", "LEAF", "HASH TABLE", "TRAVERSAL", "POP", "GRAPH", "0"] 
        },
        PS: { 
            questions: ["POP 3, 5, 9, 1, 12, 15", "PUSH 2, 4, 6, 8, 10, 12, 14",  "Identify the structure that follows FIFO principle",   "Stack Operation: PUSH 1, PUSH 2, POP",  "Binary Tree: Maximum number of children of a node",  "Queue Operation: ENQUEUE 1, 2, 3, DEQUEUE",   "Stack Operation: PUSH 9, 8, 7, POP",   "What data structure uses nodes and pointers?", "Array index of the first element",  "Operation used to insert an element in a queue"],
            answers: ["3, 3, 3, 3, 3, 3, 3", "2, 2, 2, 2, 2, 2, 2",  "QUEUE",   "2",  "2",  "1",   "7",  "LINKED LIST",  "0",   "ENQUEUE"] 
        }
    }
};

function showSection(id) {
    ["welcome", "subject", "type", "modeInstruction", "quiz", "finish"].forEach(sec => {
        document.getElementById(sec).classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

function goSubject() { showSection("subject"); }

function selectSubject(s) {
    currentSub = s;
    showSection("type");
    updateTypeButtons();
}

function updateTypeButtons() {
    document.getElementById("btnMCQ").disabled = completed.MCQ;
    document.getElementById("btnID").disabled = completed.ID;
    document.getElementById("btnPS").disabled = completed.PS;
}

function showInstruction(t) {
    currentType = t;
    const title = document.getElementById("modeTitle");
    const desc = document.getElementById("modeDesc");
    
    if (t === 'MCQ') {
        title.innerText = "MULTIPLE CHOICE";
        desc.innerText = "Read the following statements carefully. Select the best answer.";
    } else if (t === 'ID') {
        title.innerText = "IDENTIFICATION";
        desc.innerText = "Analyze the given situation below. Type your answer in the box.";
    } else {
        title.innerText = "PROBLEM SOLVING";
        desc.innerText = "Solve the following accordingly.";
    }
    
    showSection("modeInstruction");
}

function updateProgress() {
    const currentSet = quizData[currentSub][currentType];
    const maxQ = currentSet.questions.length;
    const percent = (qIndex / maxQ) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

function startQuiz() {
    qIndex = 0;
    document.getElementById("pBarCont").style.display = "block";
    showSection("quiz");
    showQuestion();
}

function showQuestion() {
    canClick = true;
    updateProgress();
    let currentSet = quizData[currentSub][currentType];
    
    document.getElementById("qnum").innerText = `MODE: ${currentType} | QUESTION ${qIndex + 1}`;
    document.getElementById("question").innerText = currentSet.questions[qIndex];
    
    const choicesDiv = document.getElementById("choices");
    const inputWrapper = document.getElementById("inputWrapper");
    
    choicesDiv.innerHTML = "";
    
    if (currentType === "MCQ") {
        inputWrapper.classList.add("hidden");
        currentSet.choices[qIndex].forEach(opt => {
            let btn = document.createElement("button");
            btn.className = "btn-choice";
            btn.innerText = opt;
            btn.onclick = () => checkMCQ(btn, opt.charAt(0).toUpperCase(), currentSet.answers[qIndex]);
            choicesDiv.appendChild(btn);
        });
    } else {
        inputWrapper.classList.remove("hidden");
        document.getElementById("inputAns").value = "";
        document.getElementById("inputAns").focus();
    }
}

function checkMCQ(btn, selected, correct) {
    if (!canClick) return;
    canClick = false;

    if (selected === correct) {
        btn.classList.add("correct-pick");
        score += 1;
    } else {
        btn.classList.add("wrong-pick");
        document.querySelectorAll(".btn-choice").forEach(b => {
            if(b.innerText.charAt(0).toUpperCase() === correct) b.classList.add("correct-pick");
        });
    }

    setTimeout(() => { qIndex++; nextStep(); }, 1200);
}

function submit() {
    let currentSet = quizData[currentSub][currentType];
    let ansInput = document.getElementById("inputAns");
    let ans = ansInput.value.toUpperCase().trim();

    if(ans === ""){
        ansInput.style.borderColor = "red";
        ansInput.focus();
        return;
    }

    ansInput.style.borderColor = "rgba(255,255,255,0.2)";

    if(ans === currentSet.answers[qIndex]){
        score += 1;
    }
    qIndex++;
    nextStep();
}

// qIndex++;
// nextStep();

function nextStep() {
    let currentSet = quizData[currentSub][currentType];
    if (qIndex < currentSet.questions.length) {
        showQuestion();
    } else {
        completed[currentType] = true;
        document.getElementById("pBarCont").style.display = "none";
        if (completed.MCQ && completed.ID && completed.PS) {
            finish();
        } else {
            showSection("type");
            updateTypeButtons();
        }
    }
}

function finish() {
    showSection("finish");
    document.getElementById("finishMsg").innerText = `Great job in ${currentSub}!`;
    document.getElementById("scoreText").innerText = `${score} / 30`;
    document.getElementById("quoteDisplay").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
