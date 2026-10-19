"use strict";

// The preview is intentionally separate from any real patient records.
const previewMetrics = {
  wait: {
    average: "28",
    unit: "dní",
    description: "Od indikácie lekárom po uskutočnenie výkonu",
    label: "Modelové čakacie doby podľa odbornosti",
    values: [14, 35, 42, 21],
    format: (value) => `${value} dní`,
  },
  fees: {
    average: "35",
    unit: "€",
    description: "Poplatky uhradené pacientom pri zdravotníckom výkone",
    label: "Modelové poplatky podľa odbornosti",
    values: [0, 40, 80, 20],
    format: (value) => `${value} €`,
  },
};

const chartTabs = [...document.querySelectorAll(".chart-tab")];
const chartPanel = document.querySelector("#chart-panel");
const chartRows = [...document.querySelectorAll(".chart-row")];

function selectMetric(tab) {
  const metric = previewMetrics[tab.dataset.metric];
  if (!metric) return;

  chartTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  chartPanel.setAttribute("aria-labelledby", tab.id);
  document.querySelector("#metric-value").textContent = metric.average;
  document.querySelector("#metric-unit").textContent = metric.unit;
  document.querySelector("#metric-description").textContent = metric.description;
  document.querySelector(".bar-chart").setAttribute("aria-label", metric.label);

  const maximum = Math.max(...metric.values);
  chartRows.forEach((row, index) => {
    row.querySelector(".chart-bar").style.setProperty("--bar-size", `${(metric.values[index] / maximum) * 100}%`);
    row.querySelector(".bar-value").textContent = metric.format(metric.values[index]);
  });
}

chartTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectMetric(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % chartTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + chartTabs.length) % chartTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = chartTabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    chartTabs[nextIndex].focus();
    selectMetric(chartTabs[nextIndex]);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Zavrieť navigáciu" : "Otvoriť navigáciu");
  navigation.classList.toggle("is-open", open);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) setMenuOpen(false);
});

const mobileViewport = window.matchMedia("(max-width: 640px)");
mobileViewport.addEventListener("change", () => setMenuOpen(false));

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const currentSection = entries.find((entry) => entry.isIntersecting);
    if (!currentSection) return;

    navigation.querySelectorAll("a").forEach((link) => {
      if (link.getAttribute("href") === `#${currentSection.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });

  document.querySelectorAll(".section-anchor").forEach((section) => sectionObserver.observe(section));
}
