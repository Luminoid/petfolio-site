/**
 * Petfolio theme toggle.
 *
 * Three states: 'auto' (default — follow system preference), 'dark', 'light'.
 * Cycle on click: auto → dark → light → auto.
 * Persists in localStorage. Loaded synchronously in <head> so the
 * .theme-dark class is applied before <body> renders (no FOUC).
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'petfolio-theme';
    var STATES = ['auto', 'dark', 'light'];
    var ICONS = { auto: '⚙️', dark: '🌙', light: '☀️' };
    var LABELS = {
        auto: 'Theme: auto (system)',
        dark: 'Theme: dark',
        light: 'Theme: light',
    };

    var root = document.documentElement;

    function readState() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            return v === 'dark' || v === 'light' ? v : 'auto';
        } catch (_) {
            return 'auto';
        }
    }

    function writeState(state) {
        try {
            if (state === 'auto') localStorage.removeItem(STORAGE_KEY);
            else localStorage.setItem(STORAGE_KEY, state);
        } catch (_) { /* ignore */ }
    }

    function effectiveDark(state) {
        if (state === 'dark') return true;
        if (state === 'light') return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function applyTheme(state) {
        root.classList.toggle('theme-dark', effectiveDark(state));
    }

    function nextState(state) {
        var i = STATES.indexOf(state);
        return STATES[(i + 1) % STATES.length];
    }

    // Apply on initial load — runs before <body> parses, so no flash.
    applyTheme(readState());

    function updateButton(btn, state) {
        btn.textContent = ICONS[state];
        btn.setAttribute('aria-label', LABELS[state]);
        btn.setAttribute('title', LABELS[state]);
    }

    function bindToggles() {
        var btns = document.querySelectorAll('[data-theme-toggle]');
        if (!btns.length) return;

        var state = readState();
        btns.forEach(function (btn) {
            btn.classList.add('theme-toggle--ready');
            updateButton(btn, state);
            btn.addEventListener('click', function () {
                state = nextState(state);
                writeState(state);
                applyTheme(state);
                btns.forEach(function (b) { updateButton(b, state); });
            });
        });

        // Live-update if the system preference changes while in 'auto'.
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var listener = function () { if (readState() === 'auto') applyTheme('auto'); };
            if (mq.addEventListener) mq.addEventListener('change', listener);
            else if (mq.addListener) mq.addListener(listener);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindToggles);
    } else {
        bindToggles();
    }
})();
