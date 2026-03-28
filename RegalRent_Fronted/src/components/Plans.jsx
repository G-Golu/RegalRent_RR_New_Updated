

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./plans.css";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  //const [popularPlan, setPopularPlan] = useState(null); // ⭐ NEW

  /* ================= FETCH PACKAGES + POPULAR ================= */
useEffect(() => {

  const fetchData = async () => {
    try {

      // ⭐ BOTH API CALL TOGETHER
      const [planRes, popularRes] = await Promise.all([
        axios.get("http://localhost:5000/api/packages"),
        axios.get("http://localhost:5000/api/contact/popular-plan"),
      ]);

      const active = planRes.data.filter((p) => p.status === 1);
      const popular = popularRes.data?.selected_plan;

      const categorized = {
        Silver: null,
        Gold: null,
        Platinum: null,
        Diamond: null,
      };

      active.forEach((p) => {
        let type = "";

        if (p.days <= 90) type = "Silver";
        else if (p.days <= 180) type = "Gold";
        else if (p.days <= 365) type = "Platinum";
          else type = "Diamond";

          if (!categorized[type] || p.price > categorized[type].price) {
          categorized[type] = {
            ...p,
            type,
          };
        }
      });

      const order = ["Silver", "Gold", "Platinum", "Diamond"];

      let finalPlans = order.map((type) => {
        return (
          categorized[type] || {
            id: type,
            package_name: `${type} Plan`,
            price: "--",
            days: "--",
            description: "Coming Soon",
            type,
          }
        );
      });

      // ⭐ FIND POPULAR PLAN OBJECT
      const popularPlanObj = active.find(
        (p) =>
          p.package_name.toLowerCase().trim() ===
          (popular || "").toLowerCase().trim()
      );

      // ⭐ GET TYPE
      let popularType = null;

      if (popularPlanObj) {
        if (popularPlanObj.days <= 90) popularType = "Silver";
        else if (popularPlanObj.days <= 180) popularType = "Gold";
        else if (popularPlanObj.days <= 365) popularType = "Platinum";
        else popularType = "Diamond";
      }

      console.log("POPULAR PLAN:", popular);
      console.log("POPULAR TYPE:", popularType);

      // ⭐ APPLY TAG BASED ON TYPE
      finalPlans = finalPlans.map((p) => ({
        ...p,
        features: featureMap[p.type] || [],
        tag: p.type === popularType ? "POPULAR" : null,
      }));

      setPlans(finalPlans);

    } catch (err) {
      console.log("Error:", err);
    }
  };

  fetchData();

}, []);// ⭐ IMPORTANT

  /* ================= CLICK ================= */
  const handleSelect = (plan) => {
    setSelectedPlan(plan.package_name);

    localStorage.setItem("selectedPlan", plan.package_name);

    window.dispatchEvent(new Event("planUpdated"));

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================= LOAD SAVED PLAN ================= */
  useEffect(() => {
    const saved = localStorage.getItem("selectedPlan");
    if (saved) {
      setSelectedPlan(saved);
    }
  }, []);

  /* ================= FEATURES ================= */
  const featureMap = {
    Silver: [
      "Basic Support",
      "Limited Access",
      "5 Orders / Month",
    ],
    Gold: [
      "Priority Support",
      "20 Orders / Month",
      "Basic Analytics",
    ],
    Platinum: [
      "24/7 Support",
      "Unlimited Orders",
      "Advanced Analytics",
      "Custom Alerts",
    ],
    Diamond: [
      "Dedicated Manager",
      "Unlimited Everything",
      "Premium Support",
      "Early Access Features",
    ],
  };

  return (
    <div className="rr-plans-section">
      <div className="rr-plans-container">

        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rr-plan-card 
              ${selectedPlan === plan.package_name ? "selected" : ""}
              ${plan.tag ? "active" : ""}
            `}
            onClick={() => handleSelect(plan)}
          >

            {/* TAG */}
            {plan.tag && (
              <span className="rr-plan-tag">{plan.tag}</span>
            )}

            {/* TYPE */}
            <p className="rr-type">{plan.type}</p>

            {/* NAME */}
            <h3 className="rr-title">{plan.package_name}</h3>

            {/* PRICE */}
            <h1 className="rr-price">
              ₹{plan.price}
              <span>/{plan.days} days</span>
            </h1>

            {/* DESC */}
            <p className="rr-plan-desc">{plan.description}</p>

            {/* FEATURES */}
            <ul className="rr-features">
              {plan.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* BUTTON */}
            <button className="rr-plan-btn">
              {selectedPlan === plan.package_name
                ? "Selected"
                : "Choose Plan"}
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default PlansPage;