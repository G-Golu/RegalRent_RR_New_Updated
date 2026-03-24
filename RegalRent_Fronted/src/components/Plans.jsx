// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./plans.css";

// const staticPlans = [
//   {
//     id: "free",
//     name: "Free Plan",
//     price: 0,
//     validity: "month",
//     desc: "For beginners to explore our platform",
//     button: "Start for Free",
//     features: [
//       "Track up to 5 stocks",
//       "Real-time stock prices",
//       "Mobile access",
//       "Basic insights",
//     ],
//     highlight: false,
//   },
//   {
//     id: "pro",
//     name: "Pro Plan",
//     price: 499,
//     validity: "month",
//     desc: "For active users who want more tools",
//     button: "Start Free Trial",
//     features: [
//       "Unlimited tracking",
//       "Advanced analytics",
//       "Custom alerts",
//       "Priority support",
//       "Export data",
//     ],
//     highlight: true,
//     tag: "POPULAR",
//   },
//   {
//     id: "premium",
//     name: "Premium Plan",
//     price: 999,
//     validity: "month",
//     desc: "Best for professionals",
//     button: "Contact Us",
//     features: [
//       "All Pro features",
//       "Unlimited stores",
//       "Advanced insights",
//       "24/7 support",
//     ],
//     highlight: false,
//   },
// ];

// const PlansPage = () => {
//   const [plans, setPlans] = useState(staticPlans);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   // ✅ Fetch ONLY price & validity
//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/plans");

//         // API expected: [{ id: "pro", price: 599, validity: "6 months" }]
//         const apiPlans = res.data;

//         const updatedPlans = staticPlans.map((plan) => {
//           const apiMatch = apiPlans.find((p) => p.id === plan.id);

//           return apiMatch
//             ? {
//                 ...plan,
//                 price: apiMatch.price,
//                 validity: apiMatch.validity,
//               }
//             : plan;
//         });

//         setPlans(updatedPlans);
//       } catch (err) {
//         console.log("Using static plans (API failed)");
//       }
//     };

//     fetchPrices();
//   }, []);

//   return (
//     <div className="rr-plans-section">
//       <div className="rr-plans-container">

//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`rr-plan-card 
//   ${selectedPlan === plan.id ? "selected" : ""}
//   ${!selectedPlan && plan.highlight ? "active" : ""}`}
//             onClick={() => setSelectedPlan(plan.id)}
//           >
//             {plan.tag && (
//               <span className="rr-plan-tag">{plan.tag}</span>
//             )}

//               <h3 className="rr-title">{plan.name}</h3>

//              <h1 className="rr-price">
//           ₹{plan.price}
//           <span>/{plan.validity}</span>
//         </h1>

//             <p className="rr-plan-desc">{plan.desc}</p>

//             <button className="rr-plan-btn">
//               {selectedPlan === plan.id ? "Selected" : plan.button}
//             </button>

//             <div className="rr-divider"></div>

//             <ul>
//               {plan.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

//   export default PlansPage;



// all ok only add for selected plans save for comment today is : 23-03-2026












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./plans.css";

// const PlansPage = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   /* ================= FETCH PACKAGES ================= */
//   useEffect(() => {
//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/packages");

//       const active = res.data.filter((p) => p.status === 1);

//       // ✅ FIXED 4 TYPES
//       const categorized = {
//         Silver: null,
//         Gold: null,
//         Platinum: null,
//         Diamond: null,
//       };

//       active.forEach((p) => {
//         let type = "";

//         // ✅ YOUR EXACT LOGIC
//         if (p.days <= 90) type = "Silver";
//         else if (p.days <= 180) type = "Gold";
//         else if (p.days <= 365) type = "Platinum";
//         else if (p.days <= 1095) type = "Diamond";
//         else type = "Diamond";

//         // ✅ KEEP BEST PACKAGE (PRICE BASED)
//         if (!categorized[type] || p.price > categorized[type].price) {
//           categorized[type] = {
//             ...p,
//             type,
//           };
//         }
//       });

//       // ✅ ALWAYS RETURN 4 CARDS
//       const order = ["Silver", "Gold", "Platinum", "Diamond"];

//       let finalPlans = order.map((type) => {
//         return (
//           categorized[type] || {
//             id: type,
//             package_name: `${type} Plan`,
//             price: "--",
//             days: "--",
//             description: "Coming Soon",
//             type,
//           }
//         );
//       });

//       // ✅ POPULAR (max days)
//       let popular = finalPlans.reduce((max, p) =>
//         (p.days || 0) > (max.days || 0) ? p : max
//       );

//       finalPlans = finalPlans.map((p) => ({
//         ...p,
//         features: featureMap[p.type] || [],
//         tag: p.id === popular.id ? "POPULAR" : null,
//       }));

//       setPlans(finalPlans);
//     } catch (err) {
//       console.log("Error fetching packages", err);
//     }
//   };

//   fetchPlans();
// }, []);

//   /* ================= CLICK ================= */
// const handleSelect = (plan) => {
//   setSelectedPlan(plan.package_name);

//   localStorage.setItem("selectedPlan", plan.package_name);

//   // 🔥 CUSTOM EVENT FIRE (IMPORTANT)
//   window.dispatchEvent(new Event("planUpdated"));

//   document.getElementById("contact")?.scrollIntoView({
//     behavior: "smooth",
//   });
// };


//   useEffect(() => {
//   const saved = localStorage.getItem("selectedPlan");
//   if (saved) {
//     setSelectedPlan(saved);
//   }
// }, []);


// //  for features add =================

// const featureMap = {
//   Silver: [
//     "Basic Support",
//     "Limited Access",
//     "5 Orders / Month",
//   ],
//   Gold: [
//     "Priority Support",
//     "20 Orders / Month",
//     "Basic Analytics",
//   ],
//   Platinum: [
//     "24/7 Support",
//     "Unlimited Orders",
//     "Advanced Analytics",
//     "Custom Alerts",
//   ],
//   Diamond: [
//     "Dedicated Manager",
//     "Unlimited Everything",
//     "Premium Support",
//     "Early Access Features",
//   ],
// };







//   return (
//     <div className="rr-plans-section">
//       <div className="rr-plans-container">

//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`rr-plan-card 
//               ${selectedPlan === plan.package_name ? "selected" : ""}
//               ${plan.tag ? "active" : ""}
//             `}
//             onClick={() => handleSelect(plan)}
//           >

//             {/* TAG */}
//             {plan.tag && (
//               <span className="rr-plan-tag">{plan.tag}</span>
//             )}

//             {/* TYPE */}
//             <p className="rr-type">{plan.type}</p>

//             {/* NAME */}
//             <h3 className="rr-title">{plan.package_name}</h3>

//             {/* PRICE */}
//             <h1 className="rr-price">
//               ₹{plan.price}
//               <span>/{plan.days} days</span>
//             </h1>

//             {/* DESC */}
//             <p className="rr-plan-desc">{plan.description}</p>
//             {/* FEATURES */}
// <ul className="rr-features">
//   {plan.features?.map((f, i) => (
//     <li key={i}>{f}</li>
//   ))}
// </ul>

//             {/* BUTTON */}
//             <button className="rr-plan-btn">
//               {selectedPlan === plan.package_name
//                 ? "Selected"
//                 : "Choose Plan"}
//             </button>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default PlansPage;



//  all are working with auto generate qr code everything is ok , only comment for add auto tag popular 
















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