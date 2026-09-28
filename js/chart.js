(function () {
  "use strict";

  var TYPES = [
    {
      name: "Generator",
      strategy: "Wait for a bodily yes before committing.",
      authority: "Sacral",
      signature: "Frustration",
      note: "Sustained, meaningful work that produces a visible return. Roughly 37% of the population."
    },
    {
      name: "Manifestor",
      strategy: "Initiate, then let people inform rather than approve.",
      authority: "Sacral or Throat",
      signature: "Frustration",
      note: "Built to begin things and to move unblocked. Roughly 9% of the population."
    },
    {
      name: "Projector",
      strategy: "Be invited. Wait for recognition to arrive.",
      authority: "Emotional",
      signature: "Success",
      note: "A penetrating guide with no fixed energy of their own. Roughly 20% of the population."
    },
    {
      name: "Reflector",
      strategy: "Let the environment and time do the deciding.",
      authority: "Solar Plexus",
      signature: "Disappointment",
      note: "The rarest and most environment-sensitive type. Roughly 7% of the population."
    },
    {
      name: "Projector (Rebel)",
      strategy: "Work on your own terms; decline fixed structures.",
      authority: "Emotional",
      signature: "Success",
      note: "Reinventor whose progress comes in leaps, not lines. Roughly 27% of the population."
    }
  ];

  var PROFILES = [
    "Investigating", "The Remote", "The Mutation", "The Intimate",
    "The Opportunist 4/6", "The Role Model 6/3", "The Investigator 1/3",
    "The Righteous 2/4", "The Crossroads 3/6"
  ];

  var LINES = [
    "Perspective &mdash; you learn by standing back and watching.",
    "The Remote &mdash; your knowing is private until it is shared.",
    "The Mutation &mdash; life arrives in jumps, never in smooth steps.",
    "The Intimate &mdash; your power lives in real closeness."
  ];

  var CENTRES = [
    "Head", "Ajna", "Throat", "Heart", "Identity",
    "Solar Plexus", "Sacral", "Root", "Emotional"
  ];

  var PURPOSES = [
    "Movement", "Satisfaction", "Peace", "Connection", "Expression",
    "Discovery", "Nurture", "Evolution", "Truth"
  ];

  var THEMES = [
    "Waiting", "Searching", "Questioning", "Beginning", "Rebuilding",
    "Understanding", "Withdrawing", "Uniting", "Renewing"
  ];

  function seedFromDate(value) {
    var parts = value.split("-").map(Number);
    return (parts[0] * 10000 + parts[1] * 100 + parts[2]) >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rnd, list) {
    return list[Math.floor(rnd() * list.length)];
  }

  function formatDate(value) {
    var d = new Date(value + "T00:00:00");
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  var form = document.getElementById("chart-form");
  var dateInput = document.getElementById("chart-date");
  var timeInput = document.getElementById("chart-time");
  var errDate = document.getElementById("err-date");
  var result = document.getElementById("chart-result");

  if (!form) return;

  form.addEventListener("reset", function () {
    result.hidden = true;
    errDate.textContent = "";
    dateInput.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var value = dateInput.value;
    if (!value) {
      errDate.textContent = "Please enter a birth date.";
      dateInput.setAttribute("aria-invalid", "true");
      dateInput.focus();
      return;
    }

    var year = Number(value.split("-")[0]);
    if (year < 1900 || year > 2100) {
      errDate.textContent = "Please use a year between 1900 and 2100.";
      dateInput.setAttribute("aria-invalid", "true");
      return;
    }

    errDate.textContent = "";
    dateInput.removeAttribute("aria-invalid");

    var rnd = mulberry32(seedFromDate(value));
    var type = pick(rnd, TYPES);
    var profile = pick(rnd, PROFILES);
    var line = pick(rnd, LINES);
    var purpose = pick(rnd, PURPOSES);
    var theme = pick(rnd, THEMES);

    var defined = CENTRES.filter(function () { return rnd() < 0.45; });
    if (defined.length === 0) defined = [pick(rnd, CENTRES)];

    var name = document.getElementById("chart-name").value.trim();
    var city = document.getElementById("chart-city").value.trim();
    var time = timeInput.value;

    document.getElementById("result-type").textContent =
      (name ? name + ", you are a " : "You are a ") + type.name;

    document.getElementById("result-profile").textContent = profile;
    document.getElementById("result-summary").textContent = type.note;

    var grid = document.getElementById("result-grid");
    grid.innerHTML = "";

    var rows = [
      ["Strategy", type.strategy],
      ["Authority", type.authority],
      ["Not-self", type.signature],
      ["Line", line],
      ["Purpose", purpose],
      ["Theme", theme],
      ["Birth", formatDate(value) + (time ? " at " + time : "") + (city ? " in " + city : "")]
    ];

    rows.forEach(function (row) {
      var wrap = document.createElement("div");
      wrap.className = "chart-result__cell";
      var dt = document.createElement("dt");
      dt.textContent = row[0];
      var dd = document.createElement("dd");
      dd.textContent = row[1];
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      grid.appendChild(wrap);
    });

    var centres = document.getElementById("result-centres");
    centres.innerHTML = "";
    CENTRES.forEach(function (name) {
      var chip = document.createElement("span");
      chip.className = "centre-chip" + (defined.indexOf(name) !== -1 ? " centre-chip--on" : "");
      chip.textContent = name;
      centres.appendChild(chip);
    });

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
