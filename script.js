// Counters for number

function animateCountUp(el) {
  const target = +el.textContent;     // Final number in HTML
  const duration = 1800;              // one and a half seconds
  const stepTime = 20;                // Update every 20ms
  const increment = target / (duration / stepTime);
  let current = 0;

  el.textContent = "0"; // Start from 0

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Observer: only trigger when visible
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp(entry.target);
      obs.unobserve(entry.target); // run only once per number
    }
  });
}, { threshold: 0.5 });

// Attach to elements after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".statNumberNumber").forEach(el => {
    observer.observe(el);
  });
});

// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  let scrollInterval;
  const scrollSpeed = 10; // Adjust this number to make it scroll faster or slower

  function startScrolling(direction) {
    // Clear any existing intervals to prevent overlapping speeds
    clearInterval(scrollInterval);

    // Move the container every 15 milliseconds
    scrollInterval = setInterval(() => {
      cardContainer.scrollBy({ left: direction * scrollSpeed, behavior: "auto" });
    }, 15);
  }

  function stopScrolling() {
    clearInterval(scrollInterval);
  }

  if (cardContainer) {
    if (scrollLeftBtn) {
      // Start scrolling left (-1) on hover, stop when the mouse leaves
      scrollLeftBtn.addEventListener("mouseenter", () => startScrolling(-1));
      scrollLeftBtn.addEventListener("mouseleave", stopScrolling);
    }

    if (scrollRightBtn) {
      // Start scrolling right (1) on hover, stop when the mouse leaves
      scrollRightBtn.addEventListener("mouseenter", () => startScrolling(1));
      scrollRightBtn.addEventListener("mouseleave", stopScrolling);
    }
  }
});

// =========================================
// Pricing Page Hover Logic
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const featureList = document.getElementById("feature-list");
  const planCards = document.querySelectorAll(".cs-item");

  // Safety check: Only run this code if the feature list exists on the current page
  if (featureList) {
    // Define the features for each plan
    const features = {
      agent: [
        "Agent who can handle basic tasks and inquiries",
        "Manage Schedules and Appointments",
        "Patient Communication Support",
        "Refills requests and fax management",
        "Available support for Spanish-speaking patients",
        "Medical interpretation for Spanish-speaking patients",

      ],
      nurseAndAgent: [
        "Everything in the Nurse plan",
        "Choose between a remote agent, a referrals manager or a billing specialist",
      ],
      nurse: [
        "Triage patients before escalating to the provider",
        "Labs and Imaging Results early review and follow-up",
        "CI metrics analysis and reporting",
        "Care and support for patients with chronic conditions",
        "Non-controlled Substances Refills authorized by the providers",
      ],
      billingReferrals: [
        "Accurate and quick clean claims submission",
        "Aggressive denial investigation and appeals",
        "Patient balance and payment plan inquiries",
        "End-to-end referral clinical documentation",
        "Secure insurance approvals and PAs",
        "Close the loop on referrals to prevent delays"
      ]
    };

    const checkmarkSVG = '<img class="cs-icon" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/mech-check.svg" alt="checkmark" width="24" height="24">';

    function renderFeatures(planKey) {
      const planFeatures = features[planKey];
      featureList.innerHTML = planFeatures.map(feature => `
          <li class="cs-li">
              ${checkmarkSVG}
              ${feature}
          </li>
      `).join("");
    }

    // Render default state (Nurse & Agent - popular plan)
    renderFeatures("nurseAndAgent");

    // Add hover event listeners
    planCards.forEach(card => {
      card.addEventListener("mouseenter", (e) => {
        const planKey = e.currentTarget.getAttribute("data-plan");
        renderFeatures(planKey);
      });
    });
  }
});