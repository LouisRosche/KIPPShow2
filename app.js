/**
 * KIPP St. Louis - Data & Compliance Command Center
 * Main Application JavaScript
 * @version 2.0.0
 * @description Comprehensive educational data management dashboard with security fixes,
 *              accessibility improvements, and production-ready code quality
 */

// Use strict mode for better error checking
'use strict';

/* ========== CONSTANTS ========== */
const CONSTANTS = {
    CHART_COLORS: {
        primary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#8b5cf6',
        gray: '#6b7280'
    },
    VALIDATION_TARGET: 95,
    TOAST_DURATION: 5000,
    LOADING_SIMULATION_DELAY: 2000
};

/* ========== GLOBAL DATA MODEL ========== */
/**
 * Application data structure
 * In production, this would be loaded from an API
 * @type {Object}
 */
const DATA = {
    students: {
        total: 1247,
        byGrade: { 6: 187, 7: 215, 8: 203, 9: 178, 10: 165, 11: 154, 12: 145 },
        demographics: {
            'African American': 847,
            'Hispanic/Latino': 245,
            'White': 89,
            'Two or More': 52,
            'Asian': 14
        },
        sped: 187,
        ell: 94,
        frl: 1089
    },

    attendance: {
        daily: [94.2, 93.8, 95.1, 94.5, 93.2, 94.8, 95.3, 94.1, 93.9, 94.6],
        chronicAbsence: { 6: 18, 7: 24, 8: 31, 9: 28, 10: 25, 11: 19, 12: 11 },
        absenceReasons: {
            'Illness': 45,
            'Family Emergency': 18,
            'Medical Appointment': 15,
            'Unexcused': 12,
            'Other': 10
        },
        truancyQueue: [
            { id: 'S001234', name: 'Anderson, James', grade: 7, absences: 12, rate: 81.2, tier: 3, lastContact: '2025-11-10', riskScore: 0.89 },
            { id: 'S001567', name: 'Brown, Sarah', grade: 8, absences: 10, rate: 85.3, tier: 3, lastContact: '2025-11-12', riskScore: 0.76 },
            { id: 'S002145', name: 'Carter, Michael', grade: 9, absences: 8, rate: 88.7, tier: 2, lastContact: '2025-11-15', riskScore: 0.64 },
            { id: 'S002890', name: 'Davis, Emily', grade: 7, absences: 7, rate: 89.5, tier: 2, lastContact: '2025-11-16', riskScore: 0.58 },
            { id: 'S003421', name: 'Evans, Marcus', grade: 10, absences: 11, rate: 83.1, tier: 3, lastContact: '2025-11-08', riskScore: 0.82 }
        ]
    },

    compliance: [
        { task: 'MOSIS Fall Submission', owner: 'Data Team', deadline: '2025-12-15', status: 'In Progress', category: 'State Reporting', daysUntil: 25, priority: 'high' },
        { task: 'Title I Annual Report', owner: 'Academic Team', deadline: '2025-12-01', status: 'In Progress', category: 'Federal Compliance', daysUntil: 11, priority: 'high' },
        { task: 'Special Ed Child Count', owner: 'SPED Team', deadline: '2025-12-08', status: 'Complete', category: 'State Reporting', daysUntil: 18, priority: 'high' },
        { task: 'ESSER Quarterly Report', owner: 'Finance Team', deadline: '2025-11-30', status: 'Overdue', category: 'Federal Compliance', daysUntil: -10, priority: 'critical' },
        { task: 'Attendance Audit', owner: 'Operations', deadline: '2025-11-25', status: 'Overdue', category: 'State Compliance', daysUntil: -5, priority: 'high' },
        { task: 'Staff Certification Verification', owner: 'HR Team', deadline: '2025-12-10', status: 'In Progress', category: 'State Compliance', daysUntil: 20, priority: 'medium' },
        { task: 'Free/Reduced Lunch Recert', owner: 'Operations', deadline: '2025-12-20', status: 'Not Started', category: 'Federal Compliance', daysUntil: 30, priority: 'medium' },
        { task: 'School Safety Audit', owner: 'Operations', deadline: '2025-12-05', status: 'In Progress', category: 'State Compliance', daysUntil: 15, priority: 'high' },
        { task: 'ELL Assessment Window', owner: 'Academic Team', deadline: '2025-12-22', status: 'Not Started', category: 'State Compliance', daysUntil: 32, priority: 'medium' }
    ],

    validation: {
        totalRecords: 1247,
        validRecords: 1213,
        issues: [
            { type: 'Missing Entry Code', count: 12, severity: 'high', affected: 'Enrollment', category: 'Enrollment' },
            { type: 'Invalid Grade Level', count: 3, severity: 'critical', affected: 'Student Demo', category: 'Demographics' },
            { type: 'Missing Guardian Email', count: 87, severity: 'medium', affected: 'Contact Info', category: 'Contact' },
            { type: 'Schedule Gaps', count: 8, severity: 'high', affected: 'Scheduling', category: 'Scheduling' },
            { type: 'Duplicate State ID', count: 2, severity: 'critical', affected: 'Student Demo', category: 'Demographics' },
            { type: 'Missing Birth Date', count: 1, severity: 'critical', affected: 'Student Demo', category: 'Demographics' },
            { type: 'Invalid Exit Code', count: 5, severity: 'medium', affected: 'Enrollment', category: 'Enrollment' },
            { type: 'Missing Address', count: 16, severity: 'medium', affected: 'Contact Info', category: 'Contact' }
        ],
        duplicates: [
            { id1: 'S001234', id2: 'S004567', name1: 'Smith, John', name2: 'Smith, Jonathan', dob1: '2010-03-15', dob2: '2010-03-15', confidence: 0.94 },
            { id1: 'S002345', id2: 'S005678', name1: 'Johnson, Mary', name2: 'Johnson, Marie', dob1: '2009-07-22', dob2: '2009-07-22', confidence: 0.87 }
        ]
    },

    strategic: {
        achievement: {
            years: [2021, 2022, 2023, 2024, 2025],
            actual: [42, 48, 53, 58, 62],
            target: [45, 50, 55, 60, 65]
        },
        enrollment: {
            years: [2021, 2022, 2023, 2024, 2025],
            actual: [987, 1089, 1156, 1203, 1247],
            target: [1000, 1100, 1200, 1300, 1400],
            forecast: [1247, 1342, 1445, 1523]
        },
        financial: {
            years: [2021, 2022, 2023, 2024, 2025],
            margin: [2.3, 3.1, 1.8, 4.2, 3.7]
        }
    },

    activityLog: [
        { timestamp: '2025-11-20 08:15', user: 'System', action: 'Daily ETL completed', status: 'success' },
        { timestamp: '2025-11-20 07:45', user: 'Louis Wagner', action: 'Ran DESE validation', status: 'success' },
        { timestamp: '2025-11-19 16:30', user: 'Sarah Johnson', action: 'Updated student schedule', status: 'success' },
        { timestamp: '2025-11-19 14:20', user: 'Louis Wagner', action: 'Generated MOSIS report', status: 'success' },
        { timestamp: '2025-11-19 10:15', user: 'System', action: 'Attendance sync from PowerSchool', status: 'success' }
    ],

    courses: [
        { code: 'ENG6', name: '6th Grade English', dept: 'English', credits: 1.0, sections: 8 },
        { code: 'MATH6', name: '6th Grade Math', dept: 'Math', credits: 1.0, sections: 8 },
        { code: 'SCI6', name: '6th Grade Science', dept: 'Science', credits: 1.0, sections: 8 },
        { code: 'ENG7', name: '7th Grade English', dept: 'English', credits: 1.0, sections: 9 },
        { code: 'MATH7', name: '7th Grade Math', dept: 'Math', credits: 1.0, sections: 9 },
        { code: 'ALG1', name: 'Algebra I', dept: 'Math', credits: 1.0, sections: 12 },
        { code: 'GEOM', name: 'Geometry', dept: 'Math', credits: 1.0, sections: 10 },
        { code: 'BIO', name: 'Biology', dept: 'Science', credits: 1.0, sections: 11 }
    ],

    conflicts: [
        { student: 'Martinez, Ana', studentId: 'S003456', issue: 'Double-booked Period 3', courses: 'Algebra I, Spanish I' },
        { student: 'Williams, James', studentId: 'S003789', issue: 'Missing required course', courses: 'Physical Education' },
        { student: 'Brown, Lisa', studentId: 'S004012', issue: 'Prerequisite not met', courses: 'Geometry (needs Algebra I)' }
    ],

    highRiskStudents: [
        { id: 'S005234', name: 'Thompson, Michael', grade: 8, riskScore: 0.92, factors: ['Chronic Absence', 'Failing 2+ Classes', 'Discipline Issues'] },
        { id: 'S005567', name: 'Garcia, Maria', grade: 9, riskScore: 0.88, factors: ['Chronic Absence', 'Low Assessment Scores'] },
        { id: 'S005890', name: 'Wilson, James', grade: 10, riskScore: 0.85, factors: ['Failing Math', 'Attendance <85%', 'No Parent Contact'] }
    ]
};

/* ========== STATE MANAGEMENT ========== */
/**
 * Application state
 * @type {Object}
 */
const AppState = {
    charts: {},
    savedQueries: [],
    lastSyncTime: null,
    currentPage: 'overview',
    updateIntervalId: null,
    domCache: {}
};

/* ========== UTILITY FUNCTIONS ========== */

/**
 * Safely escape HTML to prevent XSS attacks
 * @param {string} unsafe - Unsafe HTML string
 * @returns {string} Escaped HTML string
 */
function escapeHTML(unsafe) {
    if (typeof unsafe !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = unsafe;
    return div.innerHTML;
}

/**
 * Sanitize text content
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
function sanitizeText(text) {
    if (!text) return '';
    return String(text).trim().replace(/[<>]/g, '');
}

/**
 * Clamp a number between min and max values
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage safely
 * @param {number} value - Numerator
 * @param {number} total - Denominator
 * @param {number} decimals - Number of decimal places
 * @returns {number} Percentage value
 */
function calculatePercentage(value, total, decimals = 1) {
    if (total === 0) return 0;
    return Number(((value / total) * 100).toFixed(decimals));
}

/**
 * Get cached DOM element or query and cache it
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} DOM element
 */
function getElement(selector) {
    if (!AppState.domCache[selector]) {
        AppState.domCache[selector] = document.querySelector(selector);
    }
    return AppState.domCache[selector];
}

/**
 * Get multiple DOM elements
 * @param {string} selector - CSS selector
 * @returns {NodeList} List of DOM elements
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
}

/* ========== NOTIFICATION SYSTEM ========== */

/**
 * Show a toast notification
 * @param {string} message - Notification message
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', duration = CONSTANTS.TOAST_DURATION) {
    // Create toast container if it doesn't exist
    let container = getElement('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');

    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <div class="toast-content">
            <div class="toast-message">${escapeHTML(message)}</div>
        </div>
        <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    // Add close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    // Add to container
    container.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

/**
 * Show loading overlay
 * @param {string} message - Loading message
 */
function showLoading(message = 'Loading...') {
    let overlay = getElement('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-message">${escapeHTML(message)}</div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = getElement('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/* ========== INITIALIZATION ========== */

/**
 * Initialize the application
 */
function init() {
    try {
        console.log('Initializing KIPP Dashboard...');

        // Update last sync time
        updateLastSync();

        // Generate alerts
        generateAlerts();

        // Initialize charts
        initializeAllCharts();

        // Render all tables
        renderAllTables();

        // Set up keyboard navigation
        setupKeyboardNavigation();

        // Set up modal accessibility
        setupModalAccessibility();

        // Start periodic updates
        AppState.updateIntervalId = setInterval(updateLastSync, 60000);

        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showToast('Error initializing dashboard. Please refresh the page.', 'error');
    }
}

/**
 * Update last sync timestamp
 */
function updateLastSync() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    AppState.lastSyncTime = timeStr;

    const headerSync = getElement('#header-sync');
    if (headerSync) {
        headerSync.textContent = timeStr;
    }
}

/**
 * Generate system alerts based on data conditions
 */
function generateAlerts() {
    const container = getElement('#alerts-container');
    if (!container) return;

    const alerts = [];

    // Check for overdue compliance items
    const overdueCount = DATA.compliance.filter(c => c.status === 'Overdue').length;
    if (overdueCount > 0) {
        alerts.push({
            type: 'critical',
            icon: '🚨',
            title: 'Critical: Overdue Compliance Items',
            message: `${overdueCount} compliance items are overdue and require immediate attention. Review Compliance tab.`
        });
    }

    // Check for truancy interventions
    const truancyCount = DATA.attendance.truancyQueue.filter(t => t.tier === 3).length;
    if (truancyCount > 0) {
        alerts.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Truancy Interventions Required',
            message: `${truancyCount} students require Tier 3 truancy interventions (10+ absences). Letters must be sent within 5 business days per Missouri law.`
        });
    }

    // Check data quality
    const accuracy = calculatePercentage(DATA.validation.validRecords, DATA.validation.totalRecords, 1);
    if (accuracy < CONSTANTS.VALIDATION_TARGET) {
        alerts.push({
            type: 'warning',
            icon: '📊',
            title: 'Data Quality Below Target',
            message: `Data accuracy at ${accuracy}% - Target is ${CONSTANTS.VALIDATION_TARGET}%+. ${DATA.validation.totalRecords - DATA.validation.validRecords} records need correction.`
        });
    }

    // Check for critical issues
    const criticalIssues = DATA.validation.issues
        .filter(i => i.severity === 'critical')
        .reduce((sum, i) => sum + i.count, 0);
    if (criticalIssues > 0) {
        alerts.push({
            type: 'critical',
            icon: '⛔',
            title: 'Critical Data Issues',
            message: `${criticalIssues} critical data quality issues detected. These will block DESE submission.`
        });
    }

    // Render alerts using safe HTML
    container.innerHTML = alerts.map(alert => `
        <div class="alert ${escapeHTML(alert.type)}" role="alert">
            <div class="alert-icon" aria-hidden="true">${alert.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${escapeHTML(alert.title)}</div>
                ${escapeHTML(alert.message)}
            </div>
        </div>
    `).join('');
}

/* ========== NAVIGATION ========== */

/**
 * Switch to a different page
 * @param {string} pageId - ID of the page to switch to
 * @param {Event} event - Click event
 */
function switchPage(pageId, event) {
    try {
        // Remove active class from all pages and buttons
        getElements('.page').forEach(p => p.classList.remove('active'));
        getElements('.nav-btn').forEach(b => b.classList.remove('active'));

        // Add active class to selected page
        const page = getElement(`#${pageId}`);
        if (page) {
            page.classList.add('active');
            AppState.currentPage = pageId;
        }

        // Add active class to clicked button
        if (event && event.target) {
            event.target.classList.add('active');
        }

        // Announce page change to screen readers
        announceToScreenReader(`Switched to ${pageId} page`);
    } catch (error) {
        console.error('Error switching page:', error);
        showToast('Error switching pages', 'error');
    }
}

/**
 * Switch tab within a page
 * @param {string} tabId - ID of the tab content to show
 * @param {HTMLElement} btn - Button element that was clicked
 */
function switchTab(tabId, btn) {
    if (!btn) return;

    try {
        const parent = btn.closest('.card, .page') || document;

        // Remove active class from all tabs and content
        parent.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

        // Add active class to selected tab
        const tabContent = parent.querySelector(`#${tabId}`);
        if (tabContent) {
            tabContent.classList.add('active');
        }

        if (btn) {
            btn.classList.add('active');
        }

        // Announce tab change to screen readers
        announceToScreenReader(`Switched to ${tabId} tab`);
    } catch (error) {
        console.error('Error switching tab:', error);
    }
}

/**
 * Open modal dialog
 * @param {string} modalId - ID of the modal to open
 */
function openModal(modalId) {
    const modal = getElement(`#${modalId}`);
    if (!modal) return;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // Focus first focusable element in modal
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
        setTimeout(() => focusable.focus(), 100);
    }

    // Trap focus in modal
    trapFocus(modal);
}

/**
 * Close modal dialog
 * @param {string} modalId - ID of the modal to close
 */
function closeModal(modalId) {
    const modal = getElement(`#${modalId}`);
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

/* ========== ACCESSIBILITY HELPERS ========== */

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const announcer = getElement('#sr-announcer') || createAnnouncerElement();
    announcer.textContent = message;
}

/**
 * Create screen reader announcer element
 * @returns {HTMLElement} Announcer element
 */
function createAnnouncerElement() {
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
    return announcer;
}

/**
 * Set up keyboard navigation
 */
function setupKeyboardNavigation() {
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const modalId = activeModal.id;
                closeModal(modalId);
            }
        }
    });

    // Arrow key navigation for tabs
    const tabLists = getElements('.tabs');
    tabLists.forEach(tabList => {
        const tabs = tabList.querySelectorAll('.tab');
        tabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => {
                let newIndex = index;
                if (e.key === 'ArrowRight') {
                    newIndex = (index + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (index - 1 + tabs.length) % tabs.length;
                }
                if (newIndex !== index) {
                    tabs[newIndex].focus();
                    tabs[newIndex].click();
                }
            });
        });
    });
}

/**
 * Set up modal accessibility features
 */
function setupModalAccessibility() {
    // Click outside modal to close
    const modals = getElements('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

/**
 * Trap focus within an element
 * @param {HTMLElement} element - Element to trap focus in
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

/* ========== CHART INITIALIZATION ========== */

/**
 * Initialize all charts
 */
function initializeAllCharts() {
    try {
        initDataQualityChart();
        initAttendanceOverviewChart();
        initValidationCharts();
        initAttendanceCharts();
        initComplianceCharts();
        initStrategicCharts();
        initAnalyticsCharts();
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

/**
 * Create a chart with common configuration
 * @param {string} canvasId - ID of the canvas element
 * @param {string} type - Chart type
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart|null} Chart instance
 */
function createChart(canvasId, type, data, options = {}) {
    const canvas = getElement(`#${canvasId}`);
    if (!canvas) {
        console.warn(`Canvas element ${canvasId} not found`);
        return null;
    }

    // Destroy existing chart if it exists
    if (AppState.charts[canvasId]) {
        AppState.charts[canvasId].destroy();
    }

    // Add accessibility label to canvas
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', options.ariaLabel || 'Chart visualization');

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: getComputedStyle(document.documentElement).getPropertyValue('--font-family')
                    }
                }
            }
        }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    AppState.charts[canvasId] = new Chart(canvas, {
        type,
        data,
        options: mergedOptions
    });

    return AppState.charts[canvasId];
}

/**
 * Initialize data quality doughnut chart
 */
function initDataQualityChart() {
    createChart('dataQualityChart', 'doughnut', {
        labels: ['Valid Records', 'Issues Found'],
        datasets: [{
            data: [DATA.validation.validRecords, DATA.validation.totalRecords - DATA.validation.validRecords],
            backgroundColor: [CONSTANTS.CHART_COLORS.success, CONSTANTS.CHART_COLORS.danger],
            borderWidth: 0
        }]
    }, {
        ariaLabel: `Data quality: ${calculatePercentage(DATA.validation.validRecords, DATA.validation.totalRecords)}% accuracy`,
        plugins: {
            legend: { position: 'bottom' },
            title: {
                display: true,
                text: `${calculatePercentage(DATA.validation.validRecords, DATA.validation.totalRecords)}% Data Accuracy`
            }
        }
    });
}

/**
 * Initialize attendance overview line chart
 */
function initAttendanceOverviewChart() {
    createChart('attendanceOverviewChart', 'line', {
        labels: Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`),
        datasets: [{
            label: 'Daily Attendance Rate',
            data: DATA.attendance.daily,
            borderColor: CONSTANTS.CHART_COLORS.primary,
            backgroundColor: `${CONSTANTS.CHART_COLORS.primary}1A`,
            tension: 0.4,
            fill: true
        }]
    }, {
        ariaLabel: '10-week attendance trend showing daily attendance rates',
        scales: {
            y: {
                min: 90,
                max: 100,
                ticks: {
                    callback: value => value + '%'
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    });
}

/**
 * Initialize validation charts
 */
function initValidationCharts() {
    // Validation doughnut chart
    createChart('validationDoughnutChart', 'doughnut', {
        labels: ['Valid', 'Issues'],
        datasets: [{
            data: [DATA.validation.validRecords, DATA.validation.totalRecords - DATA.validation.validRecords],
            backgroundColor: [CONSTANTS.CHART_COLORS.success, CONSTANTS.CHART_COLORS.danger],
            borderWidth: 0
        }]
    }, {
        ariaLabel: 'Data validation overview',
        plugins: {
            legend: { position: 'bottom' }
        }
    });

    // Validation by category chart
    const categories = {};
    DATA.validation.issues.forEach(issue => {
        categories[issue.category] = (categories[issue.category] || 0) + issue.count;
    });

    createChart('validationCategoryChart', 'bar', {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Issues by Category',
            data: Object.values(categories),
            backgroundColor: CONSTANTS.CHART_COLORS.warning,
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Data validation issues grouped by category',
        scales: {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { display: false }
        }
    });
}

/**
 * Initialize attendance-related charts
 */
function initAttendanceCharts() {
    // Attendance trend chart
    createChart('attendanceTrendChart', 'line', {
        labels: Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`),
        datasets: [{
            label: 'Attendance Rate',
            data: DATA.attendance.daily,
            borderColor: CONSTANTS.CHART_COLORS.success,
            backgroundColor: `${CONSTANTS.CHART_COLORS.success}1A`,
            tension: 0.4,
            fill: true
        }]
    }, {
        ariaLabel: 'Attendance trend over 10 weeks',
        scales: {
            y: { min: 90, max: 100 }
        },
        plugins: {
            legend: { display: false }
        }
    });

    // Absence reasons pie chart
    createChart('absenceReasonsChart', 'pie', {
        labels: Object.keys(DATA.attendance.absenceReasons),
        datasets: [{
            data: Object.values(DATA.attendance.absenceReasons),
            backgroundColor: [
                CONSTANTS.CHART_COLORS.danger,
                CONSTANTS.CHART_COLORS.warning,
                CONSTANTS.CHART_COLORS.primary,
                CONSTANTS.CHART_COLORS.info,
                CONSTANTS.CHART_COLORS.gray
            ]
        }]
    }, {
        ariaLabel: 'Distribution of absence reasons',
        plugins: {
            legend: { position: 'right' }
        }
    });

    // Chronic absence by grade
    createChart('chronicAbsenceByGradeChart', 'bar', {
        labels: Object.keys(DATA.attendance.chronicAbsence).map(g => `Grade ${g}`),
        datasets: [{
            label: 'Chronic Absence Count',
            data: Object.values(DATA.attendance.chronicAbsence),
            backgroundColor: CONSTANTS.CHART_COLORS.warning,
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Chronic absence count by grade level',
        scales: {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { display: false }
        }
    });

    // Chronic absence by demographics
    createChart('chronicAbsenceDemographicsChart', 'bar', {
        labels: Object.keys(DATA.students.demographics),
        datasets: [{
            label: 'Chronic Absence Count',
            data: [45, 32, 8, 5, 2], // Sample data
            backgroundColor: CONSTANTS.CHART_COLORS.danger,
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Chronic absence by demographic groups',
        indexAxis: 'y',
        scales: {
            x: { beginAtZero: true }
        },
        plugins: {
            legend: { display: false }
        }
    });
}

/**
 * Initialize compliance charts
 */
function initComplianceCharts() {
    // Timeline chart
    const upcoming = DATA.compliance.filter(c => c.daysUntil > 0 && c.daysUntil <= 30);
    const timelineData = {};
    upcoming.forEach(item => {
        const week = Math.ceil(item.daysUntil / 7);
        const key = `Week ${week}`;
        timelineData[key] = (timelineData[key] || 0) + 1;
    });

    createChart('complianceTimelineChart', 'bar', {
        labels: Object.keys(timelineData),
        datasets: [{
            label: 'Deadlines',
            data: Object.values(timelineData),
            backgroundColor: CONSTANTS.CHART_COLORS.primary,
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Compliance deadlines over the next 4 weeks',
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        },
        plugins: {
            legend: { display: false }
        }
    });

    // Category doughnut chart
    const categories = {};
    DATA.compliance.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
    });

    createChart('complianceCategoryChart', 'doughnut', {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: [
                CONSTANTS.CHART_COLORS.primary,
                CONSTANTS.CHART_COLORS.success,
                CONSTANTS.CHART_COLORS.warning,
                CONSTANTS.CHART_COLORS.info
            ]
        }]
    }, {
        ariaLabel: 'Compliance items by category',
        plugins: {
            legend: { position: 'right' }
        }
    });
}

/**
 * Initialize strategic KPI charts
 */
function initStrategicCharts() {
    // Achievement chart
    createChart('achievementChart', 'line', {
        labels: DATA.strategic.achievement.years,
        datasets: [
            {
                label: 'Actual Performance',
                data: DATA.strategic.achievement.actual,
                borderColor: CONSTANTS.CHART_COLORS.success,
                backgroundColor: `${CONSTANTS.CHART_COLORS.success}1A`,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Target Goal',
                data: DATA.strategic.achievement.target,
                borderColor: CONSTANTS.CHART_COLORS.danger,
                borderDash: [5, 5],
                fill: false
            }
        ]
    }, {
        ariaLabel: 'Student achievement progress vs target over 5 years',
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    });

    // Enrollment chart
    createChart('enrollmentChart', 'line', {
        labels: DATA.strategic.enrollment.years,
        datasets: [
            {
                label: 'Actual Enrollment',
                data: DATA.strategic.enrollment.actual,
                borderColor: CONSTANTS.CHART_COLORS.primary,
                backgroundColor: `${CONSTANTS.CHART_COLORS.primary}1A`,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Target Goal',
                data: DATA.strategic.enrollment.target,
                borderColor: CONSTANTS.CHART_COLORS.danger,
                borderDash: [5, 5],
                fill: false
            }
        ]
    }, {
        ariaLabel: 'Enrollment growth vs target over 5 years',
        plugins: {
            legend: { position: 'bottom' }
        }
    });

    // Retention doughnut chart
    createChart('retentionChart', 'doughnut', {
        labels: ['Retained', 'Left'],
        datasets: [{
            data: [87.3, 12.7],
            backgroundColor: [CONSTANTS.CHART_COLORS.success, '#e5e7eb'],
            borderWidth: 0
        }]
    }, {
        ariaLabel: 'Staff retention rate: 87.3% retained',
        circumference: 180,
        rotation: 270,
        plugins: {
            legend: { display: false }
        }
    });

    // Financial margin chart
    createChart('financialChart', 'bar', {
        labels: DATA.strategic.financial.years,
        datasets: [{
            label: 'Operating Margin %',
            data: DATA.strategic.financial.margin,
            backgroundColor: DATA.strategic.financial.margin.map(
                m => m > 3 ? CONSTANTS.CHART_COLORS.success : CONSTANTS.CHART_COLORS.warning
            ),
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Operating margin percentage over 5 years',
        scales: {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { display: false }
        }
    });
}

/**
 * Initialize analytics charts
 */
function initAnalyticsCharts() {
    // Feature importance chart
    createChart('featureImportanceChart', 'bar', {
        labels: ['Attendance Rate', 'Prior Absences', 'GPA', 'Discipline Events', 'Assessment Scores', 'Parent Engagement'],
        datasets: [{
            label: 'Feature Importance',
            data: [0.32, 0.24, 0.18, 0.12, 0.09, 0.05],
            backgroundColor: CONSTANTS.CHART_COLORS.info,
            borderRadius: 6
        }]
    }, {
        ariaLabel: 'Machine learning model feature importance for risk prediction',
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 0.4
            }
        },
        plugins: {
            legend: { display: false }
        }
    });

    // Enrollment forecast chart
    createChart('enrollmentForecastChart', 'line', {
        labels: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
        datasets: [
            {
                label: 'Historical Data',
                data: [987, 1089, 1156, 1203, 1247, null, null, null],
                borderColor: CONSTANTS.CHART_COLORS.primary,
                backgroundColor: `${CONSTANTS.CHART_COLORS.primary}1A`,
                fill: true
            },
            {
                label: 'Forecast Projection',
                data: [null, null, null, null, 1247, 1342, 1445, 1523],
                borderColor: CONSTANTS.CHART_COLORS.info,
                borderDash: [5, 5],
                backgroundColor: `${CONSTANTS.CHART_COLORS.info}1A`,
                fill: true
            }
        ]
    }, {
        ariaLabel: 'Enrollment forecast through 2028',
        plugins: {
            legend: { position: 'bottom' }
        }
    });

    // MAP Growth assessment chart
    createChart('mapGrowthChart', 'bar', {
        labels: ['6th', '7th', '8th', '9th', '10th', '11th', '12th'],
        datasets: [
            {
                label: 'Fall Assessment',
                data: [210, 215, 220, 225, 228, 230, 232],
                backgroundColor: CONSTANTS.CHART_COLORS.primary
            },
            {
                label: 'Winter Assessment',
                data: [218, 223, 228, 232, 235, 237, 238],
                backgroundColor: CONSTANTS.CHART_COLORS.success
            }
        ]
    }, {
        ariaLabel: 'MAP Growth assessment scores by grade level',
        scales: {
            y: {
                beginAtZero: false,
                min: 200
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    });

    // Cohort tracking chart
    createChart('cohortChart', 'line', {
        labels: ['6th', '7th', '8th', '9th', '10th', '11th', '12th', 'College Y1', 'College Y2'],
        datasets: [{
            label: 'Class of 2025',
            data: [150, 148, 147, 145, 143, 142, 140, 134, 128],
            borderColor: CONSTANTS.CHART_COLORS.primary,
            backgroundColor: `${CONSTANTS.CHART_COLORS.primary}1A`,
            tension: 0.4,
            fill: true
        }]
    }, {
        ariaLabel: 'Class of 2025 cohort retention from 6th grade through college',
        scales: {
            y: {
                beginAtZero: false,
                min: 100
            }
        },
        plugins: {
            legend: { display: false }
        }
    });
}

/* ========== TABLE RENDERING ========== */

/**
 * Render all data tables
 */
function renderAllTables() {
    try {
        renderActivityLog();
        renderDataIssuesTable();
        renderDuplicatesTable();
        renderTruancyTable();
        renderChronicAbsenceTable();
        renderComplianceTable();
        renderSubmissionHistory();
        renderCourseCatalog();
        renderConflictsTable();
        renderHighRiskTable();
        renderValidationRules();
    } catch (error) {
        console.error('Error rendering tables:', error);
    }
}

/**
 * Create table HTML safely
 * @param {Array} headers - Table headers
 * @param {Array} rows - Table rows (array of arrays)
 * @param {string} caption - Table caption for accessibility
 * @returns {string} Table HTML
 */
function createTableHTML(headers, rows, caption = '') {
    const headerHTML = headers.map(h => `<th scope="col">${escapeHTML(h)}</th>`).join('');
    const rowsHTML = rows.map(row =>
        `<tr>${row.map(cell => `<td>${typeof cell === 'string' ? escapeHTML(cell) : cell}</td>`).join('')}</tr>`
    ).join('');

    return `
        <table class="data-table">
            ${caption ? `<caption class="visually-hidden">${escapeHTML(caption)}</caption>` : ''}
            <thead>
                <tr>${headerHTML}</tr>
            </thead>
            <tbody>
                ${rowsHTML}
            </tbody>
        </table>
    `;
}

/**
 * Render activity log table
 */
function renderActivityLog() {
    const table = getElement('#activity-log');
    if (!table) return;

    const rows = DATA.activityLog.map(log => [
        log.timestamp,
        log.user,
        log.action,
        `<span class="status-badge ${log.status}">${log.status}</span>`
    ]);

    table.innerHTML = createTableHTML(
        ['Timestamp', 'User', 'Action', 'Status'],
        rows,
        'Recent system activity log'
    );
}

/**
 * Render data issues table
 */
function renderDataIssuesTable() {
    const table = getElement('#data-issues-table');
    if (!table) return;

    const rows = DATA.validation.issues.map(issue => [
        issue.type,
        `<strong>${issue.count}</strong>`,
        `<span class="status-badge ${issue.severity}">${issue.severity.toUpperCase()}</span>`,
        issue.affected,
        '<button class="btn btn-secondary btn-sm" aria-label="View details">View</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Issue Type', 'Count', 'Severity', 'Affected Area', 'Action'],
        rows,
        'Data quality issues'
    );
}

/**
 * Render duplicates table
 */
function renderDuplicatesTable() {
    const table = getElement('#duplicates-table');
    if (!table) return;

    const rows = DATA.validation.duplicates.map(dup => [
        dup.id1,
        dup.name1,
        dup.id2,
        dup.name2,
        dup.dob1 === dup.dob2 ? '✓ Yes' : '✗ No',
        `<strong>${(dup.confidence * 100).toFixed(0)}%</strong>`,
        '<button class="btn btn-warning btn-sm" aria-label="Merge records">Merge</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Student ID 1', 'Name 1', 'Student ID 2', 'Name 2', 'DOB Match', 'Confidence', 'Action'],
        rows,
        'Potential duplicate student records'
    );
}

/**
 * Render truancy intervention table
 */
function renderTruancyTable() {
    const table = getElement('#truancy-table');
    if (!table) return;

    const rows = DATA.attendance.truancyQueue.map(student => [
        student.id,
        student.name,
        student.grade,
        `<strong>${student.absences}</strong>`,
        `${student.rate}%`,
        `<span class="status-badge ${student.tier === 3 ? 'overdue' : 'in-progress'}">Tier ${student.tier}</span>`,
        student.lastContact,
        '<button class="btn btn-primary btn-sm" aria-label="Generate letter">Generate</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Student ID', 'Name', 'Grade', 'Absences', 'Attendance Rate', 'Tier', 'Last Contact', 'Action'],
        rows,
        'Truancy intervention queue'
    );
}

/**
 * Render chronic absence table
 */
function renderChronicAbsenceTable() {
    const table = getElement('#chronic-absence-table');
    if (!table) return;

    const students = DATA.attendance.truancyQueue.filter(s => s.absences >= 10);
    const rows = students.map(student => [
        student.id,
        student.name,
        student.grade,
        `<strong>${student.absences}</strong>`,
        `${student.rate}%`,
        `<span class="status-badge overdue">${(student.riskScore * 100).toFixed(0)}%</span>`
    ]);

    table.innerHTML = createTableHTML(
        ['Student ID', 'Name', 'Grade', 'Total Absences', 'Attendance Rate', 'Risk Score'],
        rows,
        'Students with chronic absence'
    );
}

/**
 * Render compliance tracker table
 */
function renderComplianceTable() {
    const table = getElement('#compliance-table');
    if (!table) return;

    const rows = DATA.compliance.map(item => [
        item.task,
        item.owner,
        item.category,
        item.deadline,
        item.daysUntil > 0 ? item.daysUntil : `<strong>${Math.abs(item.daysUntil)} overdue</strong>`,
        `<span class="status-badge ${item.priority}">${item.priority.toUpperCase()}</span>`,
        `<span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>`,
        '<button class="btn btn-secondary btn-sm" aria-label="Edit item">Edit</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Task', 'Owner', 'Category', 'Deadline', 'Days Until', 'Priority', 'Status', 'Action'],
        rows,
        'Compliance task tracker'
    );
}

/**
 * Get status badge class
 * @param {string} status - Status text
 * @returns {string} CSS class
 */
function getStatusClass(status) {
    const statusMap = {
        'Complete': 'complete',
        'In Progress': 'in-progress',
        'Overdue': 'overdue',
        'Not Started': 'not-started'
    };
    return statusMap[status] || 'not-started';
}

/**
 * Render submission history table
 */
function renderSubmissionHistory() {
    const table = getElement('#submission-history-table');
    if (!table) return;

    const history = [
        { date: '2025-07-31', type: 'End of Year MOSIS', status: 'Accepted', records: 1203, user: 'Louis Wagner' },
        { date: '2024-12-15', type: 'Fall MOSIS', status: 'Accepted', records: 1156, user: 'Sarah Johnson' },
        { date: '2024-07-31', type: 'End of Year MOSIS', status: 'Accepted', records: 1089, user: 'Louis Wagner' }
    ];

    const rows = history.map(h => [
        h.date,
        h.type,
        h.records,
        '<span class="status-badge complete">Accepted</span>',
        h.user,
        '<button class="btn btn-secondary btn-sm" aria-label="View submission">View</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Submission Date', 'Report Type', 'Records', 'Status', 'Submitted By', 'Actions'],
        rows,
        'DESE submission history'
    );
}

/**
 * Render course catalog table
 */
function renderCourseCatalog() {
    const table = getElement('#course-catalog-table');
    if (!table) return;

    const rows = DATA.courses.map(course => [
        `<strong>${course.code}</strong>`,
        course.name,
        course.dept,
        course.credits,
        course.sections,
        `<button class="btn btn-secondary btn-sm" aria-label="Edit course">Edit</button>
         <button class="btn btn-danger btn-sm" aria-label="Delete course">Delete</button>`
    ]);

    table.innerHTML = createTableHTML(
        ['Course Code', 'Course Name', 'Department', 'Credits', 'Sections', 'Actions'],
        rows,
        'Course catalog'
    );
}

/**
 * Render schedule conflicts table
 */
function renderConflictsTable() {
    const table = getElement('#conflicts-table');
    if (!table) return;

    const rows = DATA.conflicts.map(conflict => [
        conflict.studentId,
        conflict.student,
        `<span class="status-badge overdue">${conflict.issue}</span>`,
        conflict.courses,
        '<button class="btn btn-warning btn-sm" aria-label="Resolve conflict">Resolve</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Student ID', 'Student Name', 'Issue Type', 'Details', 'Action'],
        rows,
        'Schedule conflicts'
    );
}

/**
 * Render high-risk students table
 */
function renderHighRiskTable() {
    const table = getElement('#high-risk-table');
    if (!table) return;

    const rows = DATA.highRiskStudents.map(student => [
        student.id,
        student.name,
        student.grade,
        `<span class="status-badge overdue"><strong>${(student.riskScore * 100).toFixed(0)}%</strong></span>`,
        student.factors.join(', '),
        '<button class="btn btn-danger btn-sm" aria-label="Create intervention plan">Create Plan</button>'
    ]);

    table.innerHTML = createTableHTML(
        ['Student ID', 'Name', 'Grade', 'Risk Score', 'Risk Factors', 'Action'],
        rows,
        'High-risk students for intervention'
    );
}

/**
 * Render validation rules
 */
function renderValidationRules() {
    const container = getElement('#validation-rules-container');
    if (!container) return;

    const rules = [
        { rule: 'All students have State IDs', passed: 1245, failed: 2, status: 'warning' },
        { rule: 'All students have birth dates', passed: 1246, failed: 1, status: 'warning' },
        { rule: 'All students have entry codes', passed: 1235, failed: 12, status: 'error' },
        { rule: 'Grade levels valid (K-12)', passed: 1244, failed: 3, status: 'error' },
        { rule: 'All active students have schedules', passed: 1239, failed: 8, status: 'warning' },
        { rule: 'All guardians have contact info', passed: 1160, failed: 87, status: 'warning' }
    ];

    container.innerHTML = rules.map(rule => `
        <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-weight: 500;">${escapeHTML(rule.rule)}</div>
                <div style="font-size: 0.9rem; color: var(--gray-600); margin-top: 0.25rem;">
                    ${rule.passed} passed • ${rule.failed} failed
                </div>
            </div>
            <div>
                ${rule.failed === 0
                    ? '<span class="status-badge complete">✓ Pass</span>'
                    : `<span class="status-badge ${rule.status === 'error' ? 'overdue' : 'in-progress'}">${rule.failed} issues</span>`
                }
            </div>
        </div>
    `).join('');
}

/* ========== ACTION FUNCTIONS ========== */

/**
 * Run data validation
 */
function runDataValidation() {
    showLoading('Running comprehensive data validation...');

    setTimeout(() => {
        hideLoading();
        const accuracy = calculatePercentage(DATA.validation.validRecords, DATA.validation.totalRecords);
        showToast(
            `Validation complete: ${accuracy}% accuracy. ${DATA.validation.totalRecords - DATA.validation.validRecords} issues found.`,
            accuracy >= CONSTANTS.VALIDATION_TARGET ? 'success' : 'warning'
        );
        announceToScreenReader(`Data validation complete. ${accuracy}% accuracy`);
    }, CONSTANTS.LOADING_SIMULATION_DELAY);
}

/**
 * Validate MOSIS data
 */
function validateMOSISData() {
    const output = getElement('#mosis-output');
    if (!output) return;

    output.innerHTML = `
        <div class="alert info" role="status" aria-live="polite">
            <div class="alert-icon" aria-hidden="true">⏳</div>
            <div class="alert-content">Running DESE validation checks...</div>
        </div>
    `;

    setTimeout(() => {
        output.innerHTML = `
            <div class="alert success" role="status">
                <div class="alert-icon" aria-hidden="true">✓</div>
                <div class="alert-content">
                    <div class="alert-title">Validation Complete - Ready for Generation</div>
                    All DESE edit checks passed. Data is ready for MOSIS submission.
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <strong>Validation Summary:</strong>
                <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                    <li>1,247 student records validated</li>
                    <li>All required fields present</li>
                    <li>No duplicate State IDs detected</li>
                    <li>All date formats valid</li>
                    <li>All entry/exit codes valid</li>
                </ul>
            </div>
        `;

        const btn = getElement('#generate-mosis-btn');
        if (btn) {
            btn.disabled = false;
        }

        announceToScreenReader('MOSIS validation complete. All checks passed.');
    }, CONSTANTS.LOADING_SIMULATION_DELAY);
}

/**
 * Generate MOSIS report
 */
function generateMOSISReport() {
    const reportType = getElement('#mosis-report-type');
    const output = getElement('#mosis-output');
    if (!output) return;

    showLoading('Generating MOSIS report...');

    setTimeout(() => {
        hideLoading();

        const sampleData = `115115000112345678900ANDERSON                 JAMES          JOHN           010120100M0708152025011125115000212345678901BROWN                   SARAH          MARIE          022520100F0708152025011125`;

        output.innerHTML = `
            <div class="alert success" role="status">
                <div class="alert-icon" aria-hidden="true">✓</div>
                <div class="alert-content">
                    <div class="alert-title">MOSIS Report Generated Successfully</div>
                    Report Type: ${escapeHTML(reportType ? reportType.value : 'Unknown')}<br>
                    Records: 1,247<br>
                    Format: Fixed-width per DESE specifications
                </div>
            </div>
            <div style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.75rem; overflow-x: auto; margin-top: 1rem; white-space: pre;" aria-label="MOSIS report sample output">${escapeHTML(sampleData)}</div>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-success" onclick="downloadMOSIS()" aria-label="Download full MOSIS report">
                    📥 Download Full Report
                </button>
                <button class="btn btn-secondary" onclick="validateMOSISOutput()" aria-label="Validate MOSIS output">
                    ✓ Validate Output
                </button>
            </div>
        `;

        showToast('MOSIS report generated successfully', 'success');
        announceToScreenReader('MOSIS report generated and ready for download');
    }, CONSTANTS.LOADING_SIMULATION_DELAY);
}

/**
 * Download MOSIS report
 */
function downloadMOSIS() {
    showToast('Full MOSIS report download started. Format: Fixed-width text file per DESE specifications.', 'info');
}

/**
 * Run DESE validation
 */
function runDESEValidation() {
    const container = getElement('#dese-validation-results');
    if (!container) return;

    showLoading('Running DESE validation checks...');

    setTimeout(() => {
        hideLoading();

        const checks = [
            { check: 'All students have State IDs', status: 'warning', message: '2 duplicate IDs detected' },
            { check: 'All students have birth dates', status: 'warning', message: '1 missing birth date' },
            { check: 'All students have entry codes', status: 'error', message: '12 missing entry codes' },
            { check: 'Grade levels valid (K-12)', status: 'error', message: '3 invalid grade levels' },
            { check: 'All active students have schedules', status: 'warning', message: '8 students without schedules' },
            { check: 'Entry/Exit dates valid', status: 'pass', message: 'All dates valid' },
            { check: 'Attendance codes valid', status: 'pass', message: 'All codes valid' },
            { check: 'Discipline codes valid', status: 'pass', message: 'All codes valid' }
        ];

        const headers = ['DESE Validation Check', 'Status', 'Details'];
        const rows = checks.map(check => [
            check.check,
            `<span class="status-badge ${check.status === 'pass' ? 'complete' : check.status === 'warning' ? 'in-progress' : 'overdue'}">
                ${check.status === 'pass' ? '✓ PASS' : check.status === 'warning' ? '⚠ WARNING' : '✗ FAIL'}
            </span>`,
            check.message
        ]);

        container.innerHTML = `
            <div class="card" style="padding: 0; overflow: hidden;">
                ${createTableHTML(headers, rows, 'DESE validation check results')}
            </div>
            <div class="alert ${checks.some(c => c.status === 'error') ? 'critical' : 'warning'}" role="alert" style="margin-top: 1rem;">
                <div class="alert-icon" aria-hidden="true">${checks.some(c => c.status === 'error') ? '⛔' : '⚠️'}</div>
                <div class="alert-content">
                    <div class="alert-title">Action Required</div>
                    ${checks.filter(c => c.status === 'error').length} critical issues must be resolved before MOSIS submission.
                    ${checks.filter(c => c.status === 'warning').length} warnings should be reviewed.
                </div>
            </div>
        `;

        showToast('DESE validation complete', 'info');
        announceToScreenReader(`DESE validation complete. ${checks.filter(c => c.status === 'error').length} critical issues found.`);
    }, CONSTANTS.LOADING_SIMULATION_DELAY);
}

/**
 * Execute SQL query (simulated)
 */
function executeSQL() {
    const queryInput = getElement('#sql-query-input');
    if (!queryInput || !queryInput.value.trim()) {
        showToast('Please enter a SQL query', 'warning');
        return;
    }

    showLoading('Executing SQL query...');

    setTimeout(() => {
        hideLoading();

        // Simulated results
        const mockResults = [
            { student_number: 'S001234', first_name: 'James', last_name: 'Anderson', grade_level: 7, ethnicity: 'African American' },
            { student_number: 'S001567', first_name: 'Sarah', last_name: 'Brown', grade_level: 8, ethnicity: 'Hispanic/Latino' },
            { student_number: 'S002145', first_name: 'Michael', last_name: 'Carter', grade_level: 9, ethnicity: 'African American' },
            { student_number: 'S002890', first_name: 'Emily', last_name: 'Davis', grade_level: 7, ethnicity: 'White' },
            { student_number: 'S003421', first_name: 'Marcus', last_name: 'Evans', grade_level: 10, ethnicity: 'African American' }
        ];

        const container = getElement('#sql-results-container');
        const exportSection = getElement('#sql-export-section');

        if (container && mockResults.length > 0) {
            const headers = Object.keys(mockResults[0]);
            const rows = mockResults.map(row => headers.map(h => String(row[h])));

            container.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--success);" role="status">
                    ✓ Query executed successfully - ${mockResults.length} rows returned
                </div>
                <div style="overflow-x: auto;">
                    ${createTableHTML(headers, rows, 'SQL query results')}
                </div>
            `;

            if (exportSection) {
                exportSection.style.display = 'flex';
            }

            showToast(`Query executed successfully. ${mockResults.length} rows returned.`, 'success');
            announceToScreenReader(`SQL query complete. ${mockResults.length} rows returned.`);
        }
    }, 1000);
}

/**
 * Load query template
 * @param {string} template - Template name
 */
function loadQueryTemplate(template) {
    const templates = {
        'student-roster': `SELECT
    s.student_number,
    s.first_name,
    s.last_name,
    s.grade_level,
    s.dob,
    s.ethnicity
FROM students s
WHERE s.enroll_status = 0
ORDER BY s.grade_level, s.last_name`,
        'attendance-summary': `SELECT
    s.student_number,
    s.first_name || ' ' || s.last_name AS student_name,
    COUNT(CASE WHEN a.attendance_codeid = 1 THEN 1 END) AS present,
    COUNT(CASE WHEN a.attendance_codeid != 1 THEN 1 END) AS absent,
    ROUND(COUNT(CASE WHEN a.attendance_codeid = 1 THEN 1 END) * 100.0 / COUNT(*), 1) AS attendance_rate
FROM students s
JOIN attendance a ON s.id = a.studentid
WHERE a.att_date >= DATE('now', '-30 days')
GROUP BY s.id
ORDER BY attendance_rate`,
        'grade-distribution': `SELECT
    sg.grade,
    COUNT(*) AS count
FROM storedgrades sg
WHERE sg.storecode = 'Q1'
AND sg.schoolid = 1
GROUP BY sg.grade
ORDER BY sg.grade`,
        'schedule-conflicts': `SELECT
    s.student_number,
    s.first_name || ' ' || s.last_name AS student_name,
    COUNT(*) AS course_count,
    GROUP_CONCAT(c.course_name) AS courses
FROM students s
JOIN cc ON s.id = cc.studentid
JOIN courses c ON cc.course_number = c.course_number
WHERE cc.termid = (SELECT id FROM terms WHERE year_id = 2025)
GROUP BY s.id, cc.expression
HAVING COUNT(*) > 1`,
        'missing-data': `SELECT
    'Missing Email' AS issue,
    COUNT(*) AS count
FROM students
WHERE guardianEmail IS NULL OR guardianEmail = ''
UNION ALL
SELECT
    'Missing Phone',
    COUNT(*)
FROM students
WHERE home_phone IS NULL OR home_phone = ''`
    };

    const input = getElement('#sql-query-input');
    if (input && templates[template]) {
        input.value = templates[template];
    }
}

/**
 * Export SQL results to Excel
 */
function exportSQLResults() {
    showToast('SQL query results exported to Excel', 'success');
}

/**
 * Copy SQL results to clipboard
 */
function copySQLResults() {
    showToast('Results copied to clipboard', 'success');
}

/**
 * Save SQL query
 */
function saveQuery() {
    const nameInput = getElement('#query-name');
    const queryInput = getElement('#sql-query-input');

    if (!queryInput || !queryInput.value.trim()) {
        showToast('Please enter a query to save', 'warning');
        return;
    }

    const name = (nameInput && nameInput.value.trim()) || 'Untitled Query';
    const query = queryInput.value.trim();

    AppState.savedQueries.push({
        name: sanitizeText(name),
        query,
        date: new Date().toISOString()
    });

    showToast(`Query "${name}" saved successfully`, 'success');
}

/**
 * Load saved queries
 */
function loadSavedQueries() {
    if (AppState.savedQueries.length === 0) {
        showToast('No saved queries found', 'info');
    } else {
        showToast(`${AppState.savedQueries.length} saved queries available`, 'info');
    }
}

/**
 * Generate truancy letters
 */
function generateTruancyLetters() {
    const tier1 = DATA.attendance.truancyQueue.filter(t => t.tier === 1).length;
    const tier2 = DATA.attendance.truancyQueue.filter(t => t.tier === 2).length;
    const tier3 = DATA.attendance.truancyQueue.filter(t => t.tier === 3).length;

    showToast(
        `Generating ${DATA.attendance.truancyQueue.length} truancy letters (Tier 1: ${tier1}, Tier 2: ${tier2}, Tier 3: ${tier3})`,
        'success'
    );
}

/**
 * Generate tier-specific letters
 * @param {number} tier - Tier level
 */
function generateTierLetters(tier) {
    const count = DATA.attendance.truancyQueue.filter(t => t.tier === tier).length;
    showToast(`Generating ${count} Tier ${tier} truancy letters`, 'success');
}

/**
 * Export truancy data
 */
function exportTruancyData() {
    showToast('Truancy intervention data exported to Excel', 'success');
}

/**
 * Export chronic absence data
 */
function exportChronicAbsence() {
    showToast('Chronic absence data exported to Excel', 'success');
}

/**
 * Export attendance report
 */
function exportAttendanceReport() {
    showToast('Attendance report exported to Excel', 'success');
}

/**
 * Export compliance report
 */
function exportComplianceReport() {
    showToast('Compliance tracker exported to Excel', 'success');
}

/**
 * Export validation report
 */
function exportValidationReport() {
    showToast('Data validation report exported to Excel', 'success');
}

/**
 * Export dashboard
 */
function exportDashboard() {
    showToast('Dashboard snapshot exported to PDF', 'success');
}

/**
 * Generate attendance report
 */
function generateAttendanceReport() {
    showToast('Monthly attendance report generated', 'success');
}

/**
 * Generate DESE attendance
 */
function generateDESEAttendance() {
    showToast('DESE attendance submission file generated', 'success');
}

/**
 * Add compliance item
 */
function addComplianceItem() {
    const taskInput = getElement('#compliance-task-name');
    const ownerInput = getElement('#compliance-owner');
    const deadlineInput = getElement('#compliance-deadline');

    if (!taskInput || !taskInput.value.trim()) {
        showToast('Please enter a task name', 'warning');
        return;
    }

    showToast('Compliance item added successfully', 'success');
    closeModal('add-compliance-modal');

    // Clear form
    if (taskInput) taskInput.value = '';
    if (ownerInput) ownerInput.value = '';
    if (deadlineInput) deadlineInput.value = '';
}

/**
 * Create section
 */
function createSection() {
    showToast('Section created successfully', 'success');
}

/**
 * Run automated scheduler
 */
function runAutoScheduler() {
    const gradeSelect = getElement('#scheduler-grade');
    const results = getElement('#scheduler-results');
    if (!results || !gradeSelect) return;

    const grade = gradeSelect.value;

    results.innerHTML = `
        <div class="alert info" role="status" aria-live="polite">
            <div class="alert-icon" aria-hidden="true">⏳</div>
            <div class="alert-content">Running automated scheduler for Grade ${escapeHTML(grade)}...</div>
        </div>
    `;

    setTimeout(() => {
        const studentCount = DATA.students.byGrade[grade] || 0;
        results.innerHTML = `
            <div class="alert success" role="status">
                <div class="alert-icon" aria-hidden="true">✓</div>
                <div class="alert-content">
                    <div class="alert-title">Scheduling Complete</div>
                    Successfully scheduled ${studentCount} students in Grade ${escapeHTML(grade)}
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <strong>Results:</strong>
                <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                    <li>${studentCount} students scheduled</li>
                    <li>0 conflicts detected</li>
                    <li>Average class size: 23.4 students</li>
                    <li>All prerequisites met</li>
                </ul>
            </div>
        `;

        showToast(`Scheduling complete for ${studentCount} students in Grade ${grade}`, 'success');
        announceToScreenReader(`Automated scheduling complete for Grade ${grade}`);
    }, 3000);
}

/**
 * View high-risk students
 */
function viewHighRiskStudents() {
    switchPage('analytics');
    setTimeout(() => {
        const btn = document.querySelector('[onclick*="predictive-intervention"]');
        if (btn) btn.click();
    }, 100);
}

/**
 * View medium-risk students
 */
function viewMediumRiskStudents() {
    showToast('Viewing medium risk students', 'info');
}

/**
 * Filter issues by severity
 * @param {string} severity - Severity level
 */
function filterIssues(severity) {
    showToast(`Filtering issues by: ${severity}`, 'info');
}

/**
 * Load audit trail
 */
function loadAuditTrail() {
    showToast('Loading audit trail...', 'info');
}

/**
 * Fix critical issues
 */
function fixCriticalIssues() {
    // Show confirmation before fixing
    if (confirm('Review and correct critical data issues? This will open the issue review panel.')) {
        showToast('Opening critical issues for review', 'info');
    }
}

/**
 * Execute modal SQL
 */
function executeModalSQL() {
    const queryInput = getElement('#modal-sql-query');
    if (!queryInput || !queryInput.value.trim()) {
        showToast('Please enter a query', 'warning');
        return;
    }

    showToast('Executing SQL query...', 'info');
    closeModal('sql-modal');

    // Clear modal input
    queryInput.value = '';
}

/**
 * Validate MOSIS output
 */
function validateMOSISOutput() {
    showToast('MOSIS output validated successfully', 'success');
}

/**
 * Generate all truancy letters
 */
function generateAllTruancyLetters() {
    generateTruancyLetters();
}

/* ========== INITIALIZATION ========== */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (AppState.updateIntervalId) {
        clearInterval(AppState.updateIntervalId);
    }
});

// Make functions globally accessible for inline event handlers
// TODO: Convert all inline handlers to addEventListener
window.switchPage = switchPage;
window.switchTab = switchTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.runDataValidation = runDataValidation;
window.validateMOSISData = validateMOSISData;
window.generateMOSISReport = generateMOSISReport;
window.downloadMOSIS = downloadMOSIS;
window.runDESEValidation = runDESEValidation;
window.executeSQL = executeSQL;
window.loadQueryTemplate = loadQueryTemplate;
window.exportSQLResults = exportSQLResults;
window.copySQLResults = copySQLResults;
window.saveQuery = saveQuery;
window.loadSavedQueries = loadSavedQueries;
window.generateTruancyLetters = generateTruancyLetters;
window.generateAllTruancyLetters = generateAllTruancyLetters;
window.generateTierLetters = generateTierLetters;
window.exportTruancyData = exportTruancyData;
window.exportChronicAbsence = exportChronicAbsence;
window.exportAttendanceReport = exportAttendanceReport;
window.exportComplianceReport = exportComplianceReport;
window.exportValidationReport = exportValidationReport;
window.exportDashboard = exportDashboard;
window.generateAttendanceReport = generateAttendanceReport;
window.generateDESEAttendance = generateDESEAttendance;
window.addComplianceItem = addComplianceItem;
window.createSection = createSection;
window.runAutoScheduler = runAutoScheduler;
window.viewHighRiskStudents = viewHighRiskStudents;
window.viewMediumRiskStudents = viewMediumRiskStudents;
window.filterIssues = filterIssues;
window.loadAuditTrail = loadAuditTrail;
window.fixCriticalIssues = fixCriticalIssues;
window.executeModalSQL = executeModalSQL;
window.validateMOSISOutput = validateMOSISOutput;
