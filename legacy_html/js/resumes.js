/* =========================================================
   OUTSIDE THE LINES — RESUME VAULT
   resumes.js
   Stores resumes (as base64 PDF) in localStorage.
   ========================================================= */


/* ---------------------------------------------------------
   STORAGE KEY
   --------------------------------------------------------- */

const RV_KEY = "outsideTheLinesResumes";


/* ---------------------------------------------------------
   STATE
   --------------------------------------------------------- */

let rvResumes      = [];   // { id, role, fileName, fileB64, note, addedAt }
let rvEditId       = null; // id of resume being edited (null = adding new)
let rvDeleteId     = null; // id staged for deletion
let rvChosenFile   = null; // FileReader result (base64) for current modal


/* ---------------------------------------------------------
   DOM REFS
   --------------------------------------------------------- */

const rvGrid            = document.getElementById("rv-grid");
const rvEmpty           = document.getElementById("rv-empty");
const rvTotalCount      = document.getElementById("rv-total-count");
const rvRolesCount      = document.getElementById("rv-roles-count");
const rvLatestLabel     = document.getElementById("rv-latest-label");
const rvSearch          = document.getElementById("rv-search");
const rvFilterRole      = document.getElementById("rv-filter-role");

// Add/Edit modal
const rvModalOverlay    = document.getElementById("rv-modal-overlay");
const rvModalTitle      = document.getElementById("rv-modal-title");
const rvRoleInput       = document.getElementById("rv-role-input");
const rvFileInput       = document.getElementById("rv-file-input");
const rvFileNameDisplay = document.getElementById("rv-file-name-display");
const rvFileDrop        = document.getElementById("rv-file-drop");
const rvFileField       = document.getElementById("rv-file-field");
const rvNoteInput       = document.getElementById("rv-note-input");
const rvFormError       = document.getElementById("rv-form-error");
const rvForm            = document.getElementById("rv-form");
const rvSaveBtn         = document.getElementById("rv-save-btn");

// PDF viewer modal
const rvViewerOverlay   = document.getElementById("rv-viewer-overlay");
const rvViewerTitle     = document.getElementById("rv-viewer-title");
const rvViewerFrame     = document.getElementById("rv-viewer-frame");

// Delete confirm modal
const rvConfirmOverlay  = document.getElementById("rv-confirm-overlay");
const rvConfirmText     = document.getElementById("rv-confirm-text");

// Toast
const rvToast           = document.getElementById("rv-toast");


/* ---------------------------------------------------------
   STORAGE HELPERS
   --------------------------------------------------------- */

function rvLoad() {
    try {
        rvResumes = JSON.parse(localStorage.getItem(RV_KEY)) || [];
    } catch (_) {
        rvResumes = [];
    }
}

function rvSave() {
    try {
        localStorage.setItem(RV_KEY, JSON.stringify(rvResumes));
    } catch (e) {
        // localStorage might be full (large PDFs)
        rvShowToast("Storage full — try a smaller PDF.", "error");
    }
}


/* ---------------------------------------------------------
   TOAST
   --------------------------------------------------------- */

let rvToastTimer = null;

function rvShowToast(message, type = "success") {
    rvToast.textContent = message;
    rvToast.className = "rv-toast rv-toast-show rv-toast-" + type;
    clearTimeout(rvToastTimer);
    rvToastTimer = setTimeout(() => {
        rvToast.classList.remove("rv-toast-show");
    }, 3200);
}


/* ---------------------------------------------------------
   MODAL HELPERS
   --------------------------------------------------------- */

function rvOpenModal(overlay) {
    overlay.classList.add("rv-open");
    document.body.style.overflow = "hidden";
}

function rvCloseModal(overlay) {
    overlay.classList.remove("rv-open");
    document.body.style.overflow = "";
}


/* ---------------------------------------------------------
   STATS BAR
   --------------------------------------------------------- */

function rvUpdateStats() {
    rvTotalCount.textContent = rvResumes.length;

    const uniqueRoles = new Set(
        rvResumes.map(r => r.role.trim().toLowerCase())
    ).size;
    rvRolesCount.textContent = uniqueRoles;

    if (rvResumes.length > 0) {
        const latest = rvResumes.reduce((a, b) =>
            new Date(a.addedAt) > new Date(b.addedAt) ? a : b
        );
        const d = new Date(latest.addedAt);
        rvLatestLabel.textContent = d.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
        });
    } else {
        rvLatestLabel.textContent = "—";
    }
}


/* ---------------------------------------------------------
   ROLE FILTER DROPDOWN
   --------------------------------------------------------- */

function rvPopulateRoleFilter() {
    const current = rvFilterRole.value;
    const roles = [...new Set(rvResumes.map(r => r.role.trim()))].sort();

    // rebuild options
    rvFilterRole.innerHTML = "<option value=\"\">All Roles</option>";
    roles.forEach(role => {
        const opt = document.createElement("option");
        opt.value = role;
        opt.textContent = role;
        rvFilterRole.appendChild(opt);
    });

    // restore previous selection if it still exists
    if (roles.includes(current)) {
        rvFilterRole.value = current;
    }
}


/* ---------------------------------------------------------
   RENDER GRID
   --------------------------------------------------------- */

function rvRender() {
    rvUpdateStats();
    rvPopulateRoleFilter();

    const query  = rvSearch.value.trim().toLowerCase();
    const filter = rvFilterRole.value.trim().toLowerCase();

    const filtered = rvResumes.filter(r => {
        const matchesSearch =
            !query ||
            r.role.toLowerCase().includes(query) ||
            r.fileName.toLowerCase().includes(query);
        const matchesRole =
            !filter ||
            r.role.trim().toLowerCase() === filter;
        return matchesSearch && matchesRole;
    });

    // Remove all cards (but keep empty state div)
    Array.from(rvGrid.querySelectorAll(".rv-card, .rv-no-results"))
        .forEach(el => el.remove());

    if (rvResumes.length === 0) {
        rvEmpty.style.display = "flex";
        return;
    }

    rvEmpty.style.display = "none";

    if (filtered.length === 0) {
        const noRes = document.createElement("p");
        noRes.className = "rv-no-results";
        noRes.textContent = "No resumes match your search.";
        rvGrid.appendChild(noRes);
        return;
    }

    // Sort newest first
    const sorted = [...filtered].sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
    );

    sorted.forEach((resume, idx) => {
        const card = rvBuildCard(resume, idx);
        rvGrid.appendChild(card);
    });
}


/* ---------------------------------------------------------
   BUILD CARD
   --------------------------------------------------------- */

function rvBuildCard(resume, idx) {
    const card = document.createElement("div");
    card.className = "rv-card";
    card.style.animationDelay = (idx * 0.07) + "s";

    const addedDate = new Date(resume.addedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    card.innerHTML = `
        <div class="rv-card-top">
            <div class="rv-card-pdf-icon">📄</div>
            <div class="rv-card-info">
                <div class="rv-card-role" title="${escHtml(resume.role)}">${escHtml(resume.role)}</div>
                <div class="rv-card-filename" title="${escHtml(resume.fileName)}">${escHtml(resume.fileName)}</div>
            </div>
        </div>
        ${resume.note
            ? `<p class="rv-card-note">${escHtml(resume.note)}</p>`
            : `<p class="rv-card-note" style="color:#bbb9cc;font-style:italic;">No notes added.</p>`
        }
        <p class="rv-card-meta">Added ${addedDate}</p>
        <div class="rv-card-actions">
            <button class="rv-btn-view"     data-id="${resume.id}" data-action="view">👁 View</button>
            <button class="rv-btn-download" data-id="${resume.id}" data-action="open">↗ Open</button>
            <button class="rv-btn-edit"     data-id="${resume.id}" data-action="edit">✏ Edit</button>
            <button class="rv-btn-delete"   data-id="${resume.id}" data-action="delete">🗑</button>
        </div>
    `;

    return card;
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


/* ---------------------------------------------------------
   CARD BUTTON DELEGATION
   --------------------------------------------------------- */

rvGrid.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id     = btn.dataset.id;
    const action = btn.dataset.action;
    const resume = rvResumes.find(r => r.id === id);
    if (!resume) return;

    if (action === "view")   rvViewResume(resume);
    if (action === "open")   rvOpenResume(resume);
    if (action === "edit")   rvOpenEditModal(resume);
    if (action === "delete") rvStageDeletion(resume);
});


/* ---------------------------------------------------------
   VIEW PDF
   --------------------------------------------------------- */

function rvViewResume(resume) {
    rvViewerTitle.textContent = resume.role + " — " + resume.fileName;
    rvViewerFrame.src = resume.fileB64;
    rvOpenModal(rvViewerOverlay);
}


/* ---------------------------------------------------------
   OPEN PDF IN NEW TAB
   Converts the stored base64 data URL → Blob → Object URL
   and opens it in a new browser tab. No re-download needed.
   --------------------------------------------------------- */

function rvOpenResume(resume) {
    // Convert base64 data URL to a Blob so the browser
    // treats it as a real PDF rather than a download.
    try {
        const byteString = atob(resume.fileB64.split(",")[1]);
        const byteArray  = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        const blob      = new Blob([byteArray], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        const tab       = window.open(objectUrl, "_blank");
        // Revoke the object URL after the tab has loaded to free memory
        if (tab) {
            tab.addEventListener("load", () => URL.revokeObjectURL(objectUrl), { once: true });
        }
    } catch (err) {
        // Fallback: open base64 URL directly
        window.open(resume.fileB64, "_blank");
    }
}


/* ---------------------------------------------------------
   OPEN ADD MODAL
   --------------------------------------------------------- */

function rvOpenAddModal() {
    rvEditId = null;
    rvChosenFile = null;
    rvForm.reset();
    rvFormError.textContent = "";
    rvModalTitle.textContent = "Add Resume";
    rvSaveBtn.textContent = "Save Resume";
    rvFileField.style.display = "";
    rvFileNameDisplay.textContent = "Click or drag & drop a PDF file here";
    rvFileDrop.classList.remove("rv-file-chosen");
    rvOpenModal(rvModalOverlay);
}


/* ---------------------------------------------------------
   OPEN EDIT MODAL
   --------------------------------------------------------- */

function rvOpenEditModal(resume) {
    rvEditId = resume.id;
    rvChosenFile = null;   // keep existing file unless user picks new one
    rvFormError.textContent = "";
    rvModalTitle.textContent = "Edit Resume";
    rvSaveBtn.textContent = "Update Resume";
    rvRoleInput.value = resume.role;
    rvNoteInput.value = resume.note || "";
    // Hide file field — show hint that upload is optional
    rvFileField.style.display = "";
    rvFileNameDisplay.textContent = "📎 " + resume.fileName + "  (upload new to replace)";
    rvFileDrop.classList.add("rv-file-chosen");
    rvOpenModal(rvModalOverlay);
}


/* ---------------------------------------------------------
   FORM SUBMIT (Add / Edit)
   --------------------------------------------------------- */

rvForm.addEventListener("submit", e => {
    e.preventDefault();
    rvFormError.textContent = "";

    const role = rvRoleInput.value.trim();
    const note = rvNoteInput.value.trim();

    if (!role) {
        rvFormError.textContent = "Please enter a job role.";
        rvRoleInput.focus();
        return;
    }

    // Adding new — file is required
    if (!rvEditId && !rvChosenFile) {
        rvFormError.textContent = "Please select a PDF file.";
        return;
    }

    if (rvEditId) {
        // Update existing
        const idx = rvResumes.findIndex(r => r.id === rvEditId);
        if (idx !== -1) {
            rvResumes[idx].role = role;
            rvResumes[idx].note = note;
            if (rvChosenFile) {
                rvResumes[idx].fileB64    = rvChosenFile.b64;
                rvResumes[idx].fileName   = rvChosenFile.name;
            }
        }
        rvSave();
        rvCloseModal(rvModalOverlay);
        rvRender();
        rvShowToast("Resume updated!", "success");
    } else {
        // Add new
        const newResume = {
            id:       crypto.randomUUID(),
            role,
            note,
            fileName: rvChosenFile.name,
            fileB64:  rvChosenFile.b64,
            addedAt:  new Date().toISOString()
        };
        rvResumes.push(newResume);
        rvSave();
        rvCloseModal(rvModalOverlay);
        rvRender();
        rvShowToast("Resume added!", "success");
    }
});


/* ---------------------------------------------------------
   FILE INPUT / DRAG & DROP
   --------------------------------------------------------- */

rvFileInput.addEventListener("change", () => {
    handleFileSelect(rvFileInput.files[0]);
});

rvFileDrop.addEventListener("dragover", e => {
    e.preventDefault();
    rvFileDrop.classList.add("rv-drag-over");
});

rvFileDrop.addEventListener("dragleave", () => {
    rvFileDrop.classList.remove("rv-drag-over");
});

rvFileDrop.addEventListener("drop", e => {
    e.preventDefault();
    rvFileDrop.classList.remove("rv-drag-over");
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
});

function handleFileSelect(file) {
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
        rvFormError.textContent = "Only PDF files are supported.";
        return;
    }

    const MAX_MB = 10;
    if (file.size > MAX_MB * 1024 * 1024) {
        rvFormError.textContent = `File is too large (max ${MAX_MB} MB).`;
        return;
    }

    rvFormError.textContent = "";

    const reader = new FileReader();
    reader.onload = ev => {
        rvChosenFile = { b64: ev.target.result, name: file.name };
        rvFileNameDisplay.textContent = "✅  " + file.name;
        rvFileDrop.classList.add("rv-file-chosen");
    };
    reader.onerror = () => {
        rvFormError.textContent = "Failed to read file. Please try again.";
    };
    reader.readAsDataURL(file);
}


/* ---------------------------------------------------------
   DELETION FLOW
   --------------------------------------------------------- */

function rvStageDeletion(resume) {
    rvDeleteId = resume.id;
    rvConfirmText.textContent =
        `"${resume.role}" (${resume.fileName}) will be permanently removed.`;
    rvOpenModal(rvConfirmOverlay);
}

document.getElementById("rv-confirm-delete").addEventListener("click", () => {
    if (!rvDeleteId) return;
    rvResumes = rvResumes.filter(r => r.id !== rvDeleteId);
    rvDeleteId = null;
    rvSave();
    rvCloseModal(rvConfirmOverlay);
    rvRender();
    rvShowToast("Resume deleted.", "info");
});

document.getElementById("rv-confirm-cancel").addEventListener("click", () => {
    rvDeleteId = null;
    rvCloseModal(rvConfirmOverlay);
});


/* ---------------------------------------------------------
   BUTTON WIRING — Open/Close modals
   --------------------------------------------------------- */

document.getElementById("rv-open-modal-btn").addEventListener("click", rvOpenAddModal);
document.getElementById("rv-empty-add-btn").addEventListener("click", rvOpenAddModal);

document.getElementById("rv-modal-close").addEventListener("click", () => rvCloseModal(rvModalOverlay));
document.getElementById("rv-cancel-btn").addEventListener("click", () => rvCloseModal(rvModalOverlay));

document.getElementById("rv-viewer-close").addEventListener("click", () => {
    rvCloseModal(rvViewerOverlay);
    // clear iframe src to stop PDF rendering
    rvViewerFrame.src = "";
});

// Click outside modals to close
[rvModalOverlay, rvViewerOverlay, rvConfirmOverlay].forEach(overlay => {
    overlay.addEventListener("click", e => {
        if (e.target === overlay) {
            if (overlay === rvViewerOverlay) rvViewerFrame.src = "";
            if (overlay === rvConfirmOverlay) rvDeleteId = null;
            rvCloseModal(overlay);
        }
    });
});

// Escape key
document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (rvViewerOverlay.classList.contains("rv-open")) {
        rvViewerFrame.src = "";
        rvCloseModal(rvViewerOverlay);
    } else if (rvConfirmOverlay.classList.contains("rv-open")) {
        rvDeleteId = null;
        rvCloseModal(rvConfirmOverlay);
    } else if (rvModalOverlay.classList.contains("rv-open")) {
        rvCloseModal(rvModalOverlay);
    }
});


/* ---------------------------------------------------------
   SEARCH & FILTER
   --------------------------------------------------------- */

rvSearch.addEventListener("input", rvRender);
rvFilterRole.addEventListener("change", rvRender);


/* ---------------------------------------------------------
   INIT
   --------------------------------------------------------- */

rvLoad();
rvRender();
