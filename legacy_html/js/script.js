/* =========================================================
   OUTSIDE THE LINES
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   CURRENT DATE & TIME
   ========================================================= */

function updateDateTime() {

    const dateElement =
        document.getElementById("current-date");

    const timeElement =
        document.getElementById("current-time");


    const now = new Date();


    if (dateElement) {

        dateElement.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            });

    }


    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            });

    }

}


updateDateTime();

setInterval(updateDateTime, 1000);



/* =========================================================
   DARK / LIGHT THEME
   ========================================================= */

const themeButton =
    document.getElementById("theme-toggle");


function applyTheme() {

    const savedTheme =
        localStorage.getItem(
            "outsideTheLinesTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        if (themeButton) {
            themeButton.textContent = "🌙";
        }

    }

}


applyTheme();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "outsideTheLinesTheme",
                isDark ? "dark" : "light"
            );


            themeButton.textContent =
                isDark ? "☀️" : "🌙";

        }
    );

}



/* =========================================================
   SIGNUP
   ========================================================= */

const signupForm =
    document.getElementById("signup-form");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const password =
                document.getElementById(
                    "password"
                ).value;


            if (
                !name ||
                !email ||
                !password
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "outsideTheLinesUser",
                JSON.stringify(user)
            );


            window.location.href =
                "onboarding.html";

        }
    );

}



/* =========================================================
   ONBOARDING VARIABLES
   ========================================================= */

let currentStep = 1;

let selectedSkills = [];

let selectedTime = "";



/* =========================================================
   ONBOARDING - NEXT STEP
   ========================================================= */

function nextStep(step) {

    /* -----------------------------------------
       STEP 1 VALIDATION
       ----------------------------------------- */

    if (step === 1) {

        const goalInput =
            document.getElementById("goal");


        if (
            !goalInput ||
            !goalInput.value.trim()
        ) {

            alert(
                "Please enter your goal."
            );

            return;

        }

    }


    /* -----------------------------------------
       STEP 2 VALIDATION
       ----------------------------------------- */

    if (step === 2) {

        if (
            selectedSkills.length === 0
        ) {

            alert(
                "Please add at least one skill."
            );

            return;

        }

    }


    /* -----------------------------------------
       STEP 3 VALIDATION
       ----------------------------------------- */

    if (step === 3) {

        if (!selectedTime) {

            alert(
                "Please select how much time you can give."
            );

            return;

        }

    }


    /* -----------------------------------------
       HIDE CURRENT STEP
       ----------------------------------------- */

    const current =
        document.getElementById(
            "step-" + step
        );


    if (current) {

        current.classList.remove(
            "active"
        );

    }


    /* -----------------------------------------
       SHOW NEXT STEP
       ----------------------------------------- */

    const next =
        document.getElementById(
            "step-" + (step + 1)
        );


    if (next) {

        next.classList.add(
            "active"
        );

    }


    currentStep =
        step + 1;


    /* -----------------------------------------
       UPDATE STEP NUMBER
       ----------------------------------------- */

    const stepNumber =
        document.getElementById(
            "step-number"
        );


    if (stepNumber) {

        stepNumber.textContent =
            currentStep;

    }

}



/* =========================================================
   ONBOARDING - ADD SKILL
   ========================================================= */

function addSkill() {

    const input =
        document.getElementById(
            "skill-input"
        );


    if (!input) {
        return;
    }


    const skill =
        input.value.trim();


    if (!skill) {

        return;

    }


    /* Prevent duplicates */

    if (
        selectedSkills.some(
            function (item) {

                return item.toLowerCase() ===
                       skill.toLowerCase();

            }
        )
    ) {

        input.value = "";

        return;

    }


    selectedSkills.push(
        skill
    );


    input.value = "";


    renderSkills();

}



/* =========================================================
   ONBOARDING - DISPLAY SKILLS
   ========================================================= */

function renderSkills() {

    const skillList =
        document.getElementById(
            "skill-list"
        );


    if (!skillList) {
        return;
    }


    skillList.innerHTML = "";


    selectedSkills.forEach(
        function (skill, index) {

            const skillItem =
                document.createElement(
                    "div"
                );


            skillItem.className =
                "skill-tag";


            skillItem.innerHTML = `

                <span>
                    ${skill}
                </span>

                <button
                    type="button"
                    onclick="removeSkill(${index})"
                >
                    ×
                </button>

            `;


            skillList.appendChild(
                skillItem
            );

        }
    );

}



/* =========================================================
   ONBOARDING - REMOVE SKILL
   ========================================================= */

function removeSkill(index) {

    selectedSkills.splice(
        index,
        1
    );


    renderSkills();

}



/* =========================================================
   ONBOARDING - SELECT TIME
   ========================================================= */

function selectTime(
    button,
    time
) {

    const buttons =
        document.querySelectorAll(
            ".time-options button"
        );


    buttons.forEach(
        function (item) {

            item.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    selectedTime =
        time;

}



/* =========================================================
   ONBOARDING - FINISH
   ========================================================= */

function finishOnboarding() {

    const goalInput =
        document.getElementById(
            "goal"
        );


    const targetDateInput =
        document.getElementById(
            "target-date"
        );


    if (
        !goalInput ||
        !goalInput.value.trim()
    ) {

        alert(
            "Please enter your goal."
        );

        return;

    }


    if (
        selectedSkills.length === 0
    ) {

        alert(
            "Please add at least one skill."
        );

        return;

    }


    if (!selectedTime) {

        alert(
            "Please select your available time."
        );

        return;

    }


    if (
        !targetDateInput ||
        !targetDateInput.value
    ) {

        alert(
            "Please select a target date."
        );

        return;

    }


    const journey = {

        goal:
            goalInput.value.trim(),

        skills:
            selectedSkills,

        availableTime:
            selectedTime,

        targetDate:
            targetDateInput.value

    };


    localStorage.setItem(
        "outsideTheLinesJourney",
        JSON.stringify(journey)
    );


    window.location.href =
        "dashboard.html";

}



/* =========================================================
   DASHBOARD - LOAD JOURNEY
   ========================================================= */

function loadDashboardData() {

    const savedJourney =
        localStorage.getItem(
            "outsideTheLinesJourney"
        );


    if (!savedJourney) {
        return;
    }


    let journey;


    try {

        journey =
            JSON.parse(savedJourney);

    } catch (error) {

        return;

    }


    /* -----------------------------------------
       USER NAME
       ----------------------------------------- */

    const userName =
        document.getElementById(
            "user-name"
        );


    const savedUser =
        localStorage.getItem(
            "outsideTheLinesUser"
        );


    if (
        userName &&
        savedUser
    ) {

        try {

            const user =
                JSON.parse(savedUser);


            if (user.name) {

                userName.textContent =
                    user.name;

            }

        } catch (error) {

            /* Ignore */

        }

    }


    /* -----------------------------------------
       GOAL
       ----------------------------------------- */

    const goalElement =
        document.getElementById(
            "user-goal"
        );


    if (goalElement) {

        goalElement.textContent =
            journey.goal || "-";

    }


    /* -----------------------------------------
       TARGET DATE
       ----------------------------------------- */

    const targetElement =
        document.getElementById(
            "target-date-display"
        );


    if (
        targetElement &&
        journey.targetDate
    ) {

        const date =
            new Date(
                journey.targetDate +
                "T00:00:00"
            );


        targetElement.textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    /* -----------------------------------------
       AVAILABLE TIME
       ----------------------------------------- */

    const timeElement =
        document.getElementById(
            "available-time"
        );


    if (timeElement) {

        timeElement.textContent =
            journey.availableTime || "-";

    }


    /* -----------------------------------------
       SKILLS
       ----------------------------------------- */

    const skillsElement =
        document.getElementById(
            "dashboard-skills"
        );


    if (
        skillsElement &&
        Array.isArray(journey.skills)
    ) {

        skillsElement.innerHTML = "";


        journey.skills.forEach(
            function (skill) {

                const skillTag =
                    document.createElement(
                        "span"
                    );


                skillTag.className =
                    "dashboard-skill-tag";


                skillTag.textContent =
                    skill;


                skillsElement.appendChild(
                    skillTag
                );

            }
        );

    }

}


if (
    document.querySelector(
        ".dashboard-container"
    )
) {

    loadDashboardData();

}



/* =========================================================
   DAILY CHECK-IN
   ========================================================= */

let selectedMood = "";



/* =========================================================
   SELECT MOOD
   ========================================================= */

function selectMood(
    button,
    mood
) {

    const moodButtons =
        document.querySelectorAll(
            ".mood-option"
        );


    moodButtons.forEach(
        function (item) {

            item.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    selectedMood =
        mood;

}



/* =========================================================
   SAVE CHECK-IN
   ========================================================= */

function saveCheckin() {

    const noteInput =
        document.getElementById(
            "checkin-note"
        );


    const message =
        document.getElementById(
            "checkin-message"
        );


    if (!selectedMood) {

        alert(
            "Please select how you're feeling today."
        );

        return;

    }


    const reflection =
        noteInput
            ? noteInput.value.trim()
            : "";


    const today =
        new Date();


    const checkin = {

        mood:
            selectedMood,

        reflection:
            reflection,

        date:
            today.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            ),

        dateKey:
            today.toISOString()
                 .split("T")[0],

        timestamp:
            today.getTime()

    };


    localStorage.setItem(
        "outsideTheLinesCheckin",
        JSON.stringify(checkin)
    );


    if (message) {

        message.textContent =
            "Your check-in has been saved. 🌱";

    }


    const saveButton =
        document.querySelector(
            ".checkin-save-btn"
        );


    if (saveButton) {

        saveButton.textContent =
            "Check-in Saved ✓";

    }

}



/* =========================================================
   LOAD CHECK-IN
   ========================================================= */

function loadCheckin() {

    const savedCheckin =
        localStorage.getItem(
            "outsideTheLinesCheckin"
        );


    if (!savedCheckin) {
        return;
    }


    let checkin;


    try {

        checkin =
            JSON.parse(savedCheckin);

    } catch (error) {

        return;

    }


    const moodButtons =
        document.querySelectorAll(
            ".mood-option"
        );


    moodButtons.forEach(
        function (button) {

            const buttonText =
                button
                    .querySelector("strong")
                    ?.textContent
                    .trim();


            if (
                buttonText ===
                checkin.mood
            ) {

                button.classList.add(
                    "selected"
                );


                selectedMood =
                    checkin.mood;

            }

        }
    );


    const noteInput =
        document.getElementById(
            "checkin-note"
        );


    if (noteInput) {

        noteInput.value =
            checkin.reflection || "";

    }


    const message =
        document.getElementById(
            "checkin-message"
        );


    if (message) {

        message.textContent =
            "Today's check-in is saved 🌱";

    }


    const saveButton =
        document.querySelector(
            ".checkin-save-btn"
        );


    if (saveButton) {

        saveButton.textContent =
            "Update Today's Check-in →";

    }

}


if (
    document.querySelector(
        ".checkin-container"
    )
) {

    loadCheckin();

}



/* =========================================================
   PLANNER - ADD TASK
   ========================================================= */

function addTask() {

    const taskInput =
        document.getElementById(
            "task-name"
        );


    const skillInput =
        document.getElementById(
            "task-skill"
        );


    const durationInput =
        document.getElementById(
            "task-duration"
        );


    if (
        !taskInput ||
        !skillInput ||
        !durationInput
    ) {

        return;

    }


    const taskName =
        taskInput.value.trim();


    const skill =
        skillInput.value;


    const duration =
        durationInput.value;


    /* -----------------------------------------
       VALIDATION
       ----------------------------------------- */

    if (!taskName) {

        alert(
            "Please enter a task."
        );

        return;

    }


    if (!skill) {

        alert(
            "Please select a skill."
        );

        return;

    }


    if (!duration) {

        alert(
            "Please select the duration."
        );

        return;

    }


    /* -----------------------------------------
       GET EXISTING TASKS
       ----------------------------------------- */

    const savedTasks =
        localStorage.getItem(
            "outsideTheLinesTasks"
        );


    let tasks = [];


    if (savedTasks) {

        try {

            tasks =
                JSON.parse(savedTasks);

        } catch (error) {

            tasks = [];

        }

    }


    /* -----------------------------------------
       TODAY'S DATE
       ----------------------------------------- */

    const today =
        new Date();


    const todayString =
        today.toISOString()
             .split("T")[0];


    /* -----------------------------------------
       CREATE TASK
       ----------------------------------------- */

    const newTask = {

        id:
            Date.now(),

        name:
            taskName,

        skill:
            skill,

        duration:
            duration,

        date:
            todayString,

        completed:
            false

    };


    tasks.push(
        newTask
    );


    /* -----------------------------------------
       SAVE
       ----------------------------------------- */

    localStorage.setItem(
        "outsideTheLinesTasks",
        JSON.stringify(tasks)
    );


    /* -----------------------------------------
       CLEAR FORM
       ----------------------------------------- */

    taskInput.value =
        "";

    skillInput.value =
        "";

    durationInput.value =
        "";


    /* -----------------------------------------
       REFRESH
       ----------------------------------------- */

    if (
        typeof loadTasks ===
        "function"
    ) {

        loadTasks();

    }

}



/* =========================================================
   PLANNER - LOAD TASKS
   ========================================================= */

function loadTasks() {

    const taskList =
        document.getElementById(
            "task-list"
        );


    if (!taskList) {
        return;
    }


    const savedTasks =
        localStorage.getItem(
            "outsideTheLinesTasks"
        );


    let tasks = [];


    if (savedTasks) {

        try {

            tasks =
                JSON.parse(savedTasks);

        } catch (error) {

            tasks = [];

        }

    }


    /* -----------------------------------------
       TODAY
       ----------------------------------------- */

    const today =
        new Date();


    const todayString =
        today.toISOString()
             .split("T")[0];


    const todayTasks =
        tasks.filter(
            function (task) {

                return task.date ===
                    todayString;

            }
        );


    /* -----------------------------------------
       EMPTY STATE
       ----------------------------------------- */

    const emptyTasks =
        document.getElementById(
            "empty-tasks"
        );


    if (
        todayTasks.length === 0
    ) {

        taskList.innerHTML = "";


        if (emptyTasks) {

            taskList.appendChild(
                emptyTasks
            );

        }


        updatePlannerProgress(
            todayTasks
        );


        updateTaskCount(
            todayTasks
        );


        return;

    }


    taskList.innerHTML = "";


    /* -----------------------------------------
       DISPLAY TASKS
       ----------------------------------------- */

    todayTasks.forEach(
        function (task) {

            const taskCard =
                document.createElement(
                    "div"
                );


            taskCard.className =
                "planner-task";


            if (task.completed) {

                taskCard.classList.add(
                    "completed"
                );

            }


            taskCard.innerHTML = `

                <div class="planner-task-left">

                    <button
                        class="task-checkbox"
                        onclick="toggleTask(${task.id})"
                    >
                        ${task.completed ? "✓" : ""}
                    </button>

                    <div class="planner-task-content">

                        <h3>
                            ${task.name}
                        </h3>

                        <p>
                            ${task.skill}
                            •
                            ${task.duration}
                        </p>

                    </div>

                </div>


                <button
                    class="task-delete-btn"
                    onclick="deleteTask(${task.id})"
                    title="Delete task"
                >
                    ×
                </button>

            `;


            taskList.appendChild(
                taskCard
            );

        }
    );


    updatePlannerProgress(
        todayTasks
    );


    updateTaskCount(
        todayTasks
    );

}



/* =========================================================
   PLANNER - TOGGLE TASK
   ========================================================= */

function toggleTask(taskId) {

    const savedTasks =
        localStorage.getItem(
            "outsideTheLinesTasks"
        );


    if (!savedTasks) {
        return;
    }


    let tasks;


    try {

        tasks =
            JSON.parse(savedTasks);

    } catch (error) {

        return;

    }


    tasks =
        tasks.map(
            function (task) {

                if (
                    task.id === taskId
                ) {

                    return {
                        ...task,
                        completed:
                            !task.completed
                    };

                }


                return task;

            }
        );


    localStorage.setItem(
        "outsideTheLinesTasks",
        JSON.stringify(tasks)
    );


    loadTasks();


    loadDashboardTodayData();

}



/* =========================================================
   PLANNER - DELETE TASK
   ========================================================= */

function deleteTask(taskId) {

    const savedTasks =
        localStorage.getItem(
            "outsideTheLinesTasks"
        );


    if (!savedTasks) {
        return;
    }


    let tasks;


    try {

        tasks =
            JSON.parse(savedTasks);

    } catch (error) {

        return;

    }


    tasks =
        tasks.filter(
            function (task) {

                return task.id !==
                    taskId;

            }
        );


    localStorage.setItem(
        "outsideTheLinesTasks",
        JSON.stringify(tasks)
    );


    loadTasks();


    loadDashboardTodayData();

}



/* =========================================================
   PLANNER - PROGRESS
   ========================================================= */

function updatePlannerProgress(
    tasks
) {

    const progressText =
        document.getElementById(
            "planner-progress-text"
        );


    const progressFill =
        document.getElementById(
            "planner-progress-fill"
        );


    if (!tasks) {
        return;
    }


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed === true;

            }
        ).length;


    const progress =
        total > 0
            ? Math.round(
                (completed / total) * 100
              )
            : 0;


    if (progressText) {

        progressText.textContent =
            progress + "% Complete";

    }


    if (progressFill) {

        progressFill.style.width =
            progress + "%";

    }

}



/* =========================================================
   PLANNER - TASK COUNT
   ========================================================= */

function updateTaskCount(
    tasks
) {

    const countElement =
        document.getElementById(
            "task-count"
        );


    if (!countElement) {
        return;
    }


    const count =
        tasks.length;


    countElement.textContent =
        count +
        (count === 1
            ? " task"
            : " tasks");

}



/* =========================================================
   PLANNER - LOAD SKILLS
   ========================================================= */

function loadPlannerSkills() {

    const skillSelect =
        document.getElementById(
            "task-skill"
        );


    if (!skillSelect) {
        return;
    }


    const savedJourney =
        localStorage.getItem(
            "outsideTheLinesJourney"
        );


    if (!savedJourney) {
        return;
    }


    let journey;


    try {

        journey =
            JSON.parse(savedJourney);

    } catch (error) {

        return;

    }


    if (
        !Array.isArray(
            journey.skills
        )
    ) {

        return;

    }


    skillSelect.innerHTML = `

        <option value="">
            Select a skill
        </option>

    `;


    journey.skills.forEach(
        function (skill) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                skill;


            option.textContent =
                skill;


            skillSelect.appendChild(
                option
            );

        }
    );

}



/* =========================================================
   PLANNER INITIALIZATION
   ========================================================= */

if (
    document.querySelector(
        ".planner-container"
    )
) {

    loadPlannerSkills();

    loadTasks();


    const plannerDate =
        document.getElementById(
            "planner-date"
        );


    if (plannerDate) {

        plannerDate.textContent =
            new Date().toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }

}



/* =========================================================
   DASHBOARD - TODAY'S DATA
   ========================================================= */

function loadDashboardTodayData() {

    const savedTasks =
        localStorage.getItem(
            "outsideTheLinesTasks"
        );


    let tasks = [];


    if (savedTasks) {

        try {

            tasks =
                JSON.parse(savedTasks);

        } catch (error) {

            tasks = [];

        }

    }


    /* -----------------------------------------
       TODAY'S DATE
       ----------------------------------------- */

    const today =
        new Date();


    const todayString =
        today.toISOString()
             .split("T")[0];


    /* -----------------------------------------
       ONLY TODAY'S TASKS
       ----------------------------------------- */

    const todayTasks =
        tasks.filter(
            function (task) {

                return task.date ===
                    todayString;

            }
        );


    /* -----------------------------------------
       COUNTS
       ----------------------------------------- */

    const totalTasks =
        todayTasks.length;


    const completedTasks =
        todayTasks.filter(
            function (task) {

                return task.completed === true;

            }
        ).length;


    const progress =
        totalTasks > 0
            ? Math.round(
                (completedTasks / totalTasks) * 100
              )
            : 0;


    /* -----------------------------------------
       UPDATE DASHBOARD
       ----------------------------------------- */

    const totalElement =
        document.getElementById(
            "today-total-tasks"
        );


    const completedElement =
        document.getElementById(
            "today-completed-tasks"
        );


    const progressElement =
        document.getElementById(
            "today-progress-percentage"
        );


    const progressFill =
        document.getElementById(
            "today-progress-fill"
        );


    if (totalElement) {

        totalElement.textContent =
            totalTasks;

    }


    if (completedElement) {

        completedElement.textContent =
            completedTasks;

    }


    if (progressElement) {

        progressElement.textContent =
            progress + "%";

    }


    if (progressFill) {

        progressFill.style.width =
            progress + "%";

    }


    /* -----------------------------------------
       CHECK-IN
       ----------------------------------------- */

    const savedCheckin =
        localStorage.getItem(
            "outsideTheLinesCheckin"
        );


    const moodElement =
        document.getElementById(
            "today-mood"
        );


    if (!moodElement) {
        return;
    }


    if (savedCheckin) {

        try {

            const checkin =
                JSON.parse(savedCheckin);


            /* Check whether it is today's check-in */

            if (
                checkin.dateKey ===
                todayString
            ) {

                moodElement.textContent =
                    getMoodEmoji(
                        checkin.mood
                    )
                    + " "
                    + checkin.mood;

            } else {

                moodElement.textContent =
                    "Not checked in yet.";

            }

        } catch (error) {

            moodElement.textContent =
                "Not checked in yet.";

        }

    } else {

        moodElement.textContent =
            "Not checked in yet.";

    }

}



/* =========================================================
   MOOD EMOJI
   ========================================================= */

function getMoodEmoji(
    mood
) {

    const moods = {

        "Great": "😊",

        "Good": "🙂",

        "Okay": "😐",

        "Low": "😔",

        "Overwhelmed": "😫"

    };


    return moods[mood] || "🌱";

}



/* =========================================================
   DASHBOARD INITIALIZATION
   ========================================================= */

if (
    document.querySelector(
        ".dashboard-container"
    )
) {

    loadDashboardTodayData();

}



/* =========================================================
   START TODAY'S JOURNEY
   ========================================================= */

function startJourney() {

    window.location.href =
        "planner.html";

}



/* =========================================================
   COMING SOON
   ========================================================= */

function showComingSoon(
    feature
) {

    alert(
        feature +
        " will be available soon."
    );

}



/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    /*
       We intentionally keep the journey,
       tasks and notes for now.

       Only the login/session information
       is removed.
    */

    localStorage.removeItem(
        "outsideTheLinesLoggedIn"
    );


    window.location.href =
        "index.html";

}