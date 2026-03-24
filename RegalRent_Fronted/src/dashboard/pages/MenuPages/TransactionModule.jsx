// import React, { useEffect, useState } from "react";
// import "./TransactionModule.css";
// import axios from "axios";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   CartesianGrid
// } from "recharts";

// const TransactionModule = () => {

//   const [transactions,setTransactions] = useState([]);
//   const [refunds,setRefunds] = useState([]);

//   const [revenueChart,setRevenueChart] = useState([]);
//   const [paymentChart,setPaymentChart] = useState([]);
//   const [refundChart,setRefundChart] = useState([]);

//   const [refundReasonChart,setRefundReasonChart] = useState([]);
//   const [refundStatusChart,setRefundStatusChart] = useState([]);
//   const [priceTypeRefundChart,setPriceTypeRefundChart] = useState([]);

//   const COLORS = ["#2563eb","#16a34a","#f59e0b","#ef4444","#9333ea"];

//   const [summary,setSummary] = useState({
//     revenue:0,
//     pending:0,
//     refunds:0,
//     orders:0
//   });

//   useEffect(()=>{
//     fetchTransactions();
//     fetchRefunds();
//   },[]);

//   /* =============================
//      FETCH TRANSACTIONS
//   ============================= */

//   const fetchTransactions = async ()=>{

//     const res = await axios.get(
//       "http://localhost:5000/api/transactions/report?startDate=2024-01-01&endDate=2030-01-01"
//     );

//     setTransactions(res.data);

//     let revenue = 0;
//     let pending = 0;

//     res.data.forEach(t=>{
//       revenue += Number(t.grand_total);
//       pending += Number(t.due_amount);
//     });

//     setSummary(prev=>({
//       ...prev,
//       revenue,
//       pending,
//       orders:res.data.length
//     }));


//     /* DAILY REVENUE CHART */

//     const grouped = {};

//     res.data.forEach(t=>{

//       const date = t.created_at.split("T")[0];

//       if(!grouped[date]) grouped[date] = 0;

//       grouped[date] += Number(t.grand_total);

//     });

//     const chartData = Object.keys(grouped).map(date=>({
//       date,
//       revenue:grouped[date]
//     }));

//     setRevenueChart(chartData);


//     /* PAYMENT STATUS PIE */

//     const paymentGrouped = {};

//     res.data.forEach(t=>{

//       const status = t.payment_status || "Unknown";

//       if(!paymentGrouped[status]) paymentGrouped[status] = 0;

//       paymentGrouped[status]++;

//     });

//     const paymentData = Object.keys(paymentGrouped).map(key=>({
//       name:key,
//       value:paymentGrouped[key]
//     }));

//     setPaymentChart(paymentData);

//   };


//   /* =============================
//      FETCH REFUNDS
//   ============================= */

//   const fetchRefunds = async ()=>{

//     const res = await axios.get(
//       "http://localhost:5000/api/transactions/refunds"
//     );

//     setRefunds(res.data);

//     let totalRefund = 0;

//     const methodGroup = {};

//     const reasonGroup = {
//       "Product Damage":0,
//       "Quality Not Satisfied":0,
//       "Wrong Item Delivered":0,
//       "Other":0
//     };

//     const statusGroup = {
//       "Refunded":0,
//       "Pending":0
//     };

//     const priceTypeGroup = {};

//     res.data.forEach(r=>{

//       const amount = Number(r.total_refund_amount);

//       totalRefund += amount;


//       /* REFUND METHOD */

//       const method = r.refund_method || "Other";

//       if(!methodGroup[method]) methodGroup[method] = 0;

//       methodGroup[method] += amount;


//       /* REFUND REASON */

//       if(r.reason === "product_damage"){
//         reasonGroup["Product Damage"] += amount;
//       }
//       else if(r.reason === "quality_not_satisfied"){
//         reasonGroup["Quality Not Satisfied"] += amount;
//       }
//       else if(r.reason === "wrong_item_delivered"){
//         reasonGroup["Wrong Item Delivered"] += amount;
//       }
//       else{
//         reasonGroup["Other"] += amount;
//       }


//       /* REFUND STATUS */

//       if(r.status === "refunded"){
//         statusGroup["Refunded"]++;
//       }else{
//         statusGroup["Pending"]++;
//       }


//       /* PRICE TYPE COMPARISON BY DATE */

//       const date = r.created_at.split("T")[0];

//       if(!priceTypeGroup[date]){
//         priceTypeGroup[date] = {
//           date:date,
//           day_based:0,
//           fixed:0
//         };
//       }

//       if(r.price_type === "day_based"){
//         priceTypeGroup[date].day_based += amount;
//       }

//       if(r.price_type === "fixed"){
//         priceTypeGroup[date].fixed += amount;
//       }

//     });


//     setSummary(prev=>({
//       ...prev,
//       refunds:totalRefund
//     }));


//     setRefundChart(
//       Object.keys(methodGroup).map(key=>({
//         name:key,
//         value:methodGroup[key]
//       }))
//     );


//     setRefundReasonChart(
//       Object.keys(reasonGroup).map(key=>({
//         name:key,
//         value:reasonGroup[key]
//       }))
//     );


//     setRefundStatusChart(
//       Object.keys(statusGroup).map(key=>({
//         name:key,
//         value:statusGroup[key]
//       }))
//     );


//     setPriceTypeRefundChart(
//       Object.values(priceTypeGroup)
//     );

//   };


//   return(

//     <div className="transaction-page">

//       <div className="transaction-header">
//         <h1>Transaction Analytics Dashboard</h1>
//       </div>


//       {/* SUMMARY CARDS */}

//       <div className="summary-grid">

//         <div className="summary-card revenue">
//           <p>Total Revenue</p>
//           <h2>₹{summary.revenue}</h2>
//         </div>

//         <div className="summary-card pending">
//           <p>Pending Amount</p>
//           <h2>₹{summary.pending}</h2>
//         </div>

//         <div className="summary-card refund">
//           <p>Total Refunds</p>
//           <h2>₹{summary.refunds}</h2>
//         </div>

//         <div className="summary-card orders">
//           <p>Total Orders</p>
//           <h2>{summary.orders}</h2>
//         </div>

//       </div>


//       {/* REVENUE + PAYMENT */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Daily Revenue</h3>

//           <ResponsiveContainer width="100%" height={280}>

//             <BarChart data={revenueChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="date"/>
//               <YAxis/>

//               <Tooltip/>

//               <Bar dataKey="revenue" fill="#2563eb"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Payment Status</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={paymentChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {paymentChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>

//       </div>


//       {/* REFUND METHOD + REASON */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Refund Methods</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={refundChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {refundChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Refund by Reason</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <BarChart data={refundReasonChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="name"/>
//               <YAxis/>

//               <Tooltip/>

//               <Bar dataKey="value" fill="#ef4444"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>


//       {/* REFUND STATUS + PRICE TYPE */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Refund Status</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={refundStatusChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {refundStatusChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Refund Price Type Comparison</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <BarChart data={priceTypeRefundChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="date"/>
//               <YAxis/>

//               <Tooltip/>

//               <Legend/>

//               <Bar dataKey="day_based" fill="#2563eb" name="Day Based"/>

//               <Bar dataKey="fixed" fill="#9333ea" name="Fixed Price"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default TransactionModule;



























// import React, { useEffect, useState } from "react";
// import "./TransactionModule.css";
// import axios from "axios";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   CartesianGrid
// } from "recharts";

// const TransactionModule = () => {

//   const [transactions,setTransactions] = useState([]);
//   const [refunds,setRefunds] = useState([]);

//   const [revenueChart,setRevenueChart] = useState([]);
//   const [paymentChart,setPaymentChart] = useState([]);
//   const [refundChart,setRefundChart] = useState([]);

//   const [refundReasonChart,setRefundReasonChart] = useState([]);
//   const [refundStatusChart,setRefundStatusChart] = useState([]);
//   const [priceTypeRefundChart,setPriceTypeRefundChart] = useState([]);

//   const COLORS = ["#2563eb","#16a34a","#f59e0b","#ef4444","#9333ea"];

//   const [summary,setSummary] = useState({
//     revenue:0,
//     pending:0,
//     refunds:0,
//     orders:0
//   });

//   useEffect(()=>{
//     fetchTransactions();
//     fetchRefunds();
//   },[]);

//   /* =============================
//      FETCH TRANSACTIONS
//   ============================= */

//   const fetchTransactions = async ()=>{

//     const res = await axios.get(
//       "http://localhost:5000/api/transactions/report?startDate=2024-01-01&endDate=2030-01-01"
//     );

//     setTransactions(res.data);

//     let revenue = 0;
//     let pending = 0;

//     res.data.forEach(t=>{
//       revenue += Number(t.grand_total);
//       pending += Number(t.due_amount);
//     });

//     setSummary(prev=>({
//       ...prev,
//       revenue,
//       pending,
//       orders:res.data.length
//     }));


//     /* DAILY REVENUE CHART */

//     const grouped = {};

//     res.data.forEach(t=>{

//       const date = t.created_at.split("T")[0];

//       if(!grouped[date]) grouped[date] = 0;

//       grouped[date] += Number(t.grand_total);

//     });

//     const chartData = Object.keys(grouped).map(date=>({
//       date,
//       revenue:grouped[date]
//     }));

//     setRevenueChart(chartData);


//     /* PAYMENT STATUS PIE */

//     const paymentGrouped = {};

//     res.data.forEach(t=>{

//       const status = t.payment_status || "Unknown";

//       if(!paymentGrouped[status]) paymentGrouped[status] = 0;

//       paymentGrouped[status]++;

//     });

//     const paymentData = Object.keys(paymentGrouped).map(key=>({
//       name:key,
//       value:paymentGrouped[key]
//     }));

//     setPaymentChart(paymentData);

//   };


//   /* =============================
//      FETCH REFUNDS
//   ============================= */
// const fetchRefunds = async ()=>{

// const res = await axios.get(
//   "http://localhost:5000/api/transactions/refunds"
// );

// const refundList = res.data?.data || res.data;

// setRefunds(refundList);

// let totalRefund = 0;

// const methodGroup = {};

// const reasonGroup = {
//   "Product Damage":0,
//   "Quality Not Satisfied":0,
//   "Wrong Item Delivered":0,
//   "Other":0
// };

// const statusGroup = {
//   "Refunded":0,
//   "Pending":0
// };

// const priceTypeGroup = {};

// /* LOOP START */

// refundList.forEach(r=>{

//   const amount = Number(r.total_refund_amount);
//   totalRefund += amount;

//   /* METHOD */

//   const method = r.refund_method || "Other";

//   if(!methodGroup[method]) methodGroup[method] = 0;

//   methodGroup[method] += amount;

//   /* REASON */

//   if(r.reason === "product_damage"){
//     reasonGroup["Product Damage"] += amount;
//   }
//   else if(r.reason === "quality_not_satisfied"){
//     reasonGroup["Quality Not Satisfied"] += amount;
//   }
//   else if(r.reason === "wrong_item_delivered"){
//     reasonGroup["Wrong Item Delivered"] += amount;
//   }
//   else{
//     reasonGroup["Other"] += amount;
//   }

//   /* STATUS */

//   const status = (r.status || "").toLowerCase();

//   if(status === "returned"){
//     statusGroup["Refunded"]++;
//   }
//   else if(status === "pending"){
//     statusGroup["Pending"]++;
//   }

//   /* PRICE TYPE */

//   const date = r.created_at.split(" ")[0];

//   if(!priceTypeGroup[date]){
//     priceTypeGroup[date] = {
//       date:date,
//       day_based:0,
//       fixed:0
//     };
//   }

//   if(r.price_type === "day_based"){
//     priceTypeGroup[date].day_based += amount;
//   }

//   if(r.price_type === "fixed"){
//     priceTypeGroup[date].fixed += amount;
//   }

// });

// /* LOOP END */

// setSummary(prev=>({
//   ...prev,
//   refunds:totalRefund
// }));

// setRefundChart(
//   Object.keys(methodGroup).map(key=>({
//     name:key,
//     value:methodGroup[key]
//   }))
// );

// setRefundReasonChart(
//   Object.keys(reasonGroup).map(key=>({
//     name:key,
//     value:reasonGroup[key]
//   }))
// );

// setRefundStatusChart(
//   Object.keys(statusGroup).map(key=>({
//     name:key,
//     value:statusGroup[key]
//   }))
// );

// setPriceTypeRefundChart(
//   Object.values(priceTypeGroup)
// );

// };


//   return(

//     <div className="transaction-page">

//       <div className="transaction-header">
//         <h1>Transaction Analytics Dashboard</h1>
//       </div>


//       {/* SUMMARY CARDS */}

//       <div className="summary-grid">

//         <div className="summary-card revenue">
//           <p>Total Revenue</p>
//           <h2>₹{summary.revenue}</h2>
//         </div>

//         <div className="summary-card pending">
//           <p>Pending Amount</p>
//           <h2>₹{summary.pending}</h2>
//         </div>

//         <div className="summary-card refund">
//           <p>Total Refunds</p>
//           <h2>₹{summary.refunds}</h2>
//         </div>

//         <div className="summary-card orders">
//           <p>Total Orders</p>
//           <h2>{summary.orders}</h2>
//         </div>

//       </div>


//       {/* REVENUE + PAYMENT */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Daily Revenue</h3>

//           <ResponsiveContainer width="100%" height={280}>

//             <BarChart data={revenueChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="date"/>
//               <YAxis/>

//               <Tooltip/>

//               <Bar dataKey="revenue" fill="#2563eb"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Payment Status</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={paymentChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {paymentChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>

//       </div>


//       {/* REFUND METHOD + REASON */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Refund Methods</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={refundChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {refundChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Refund by Reason</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <BarChart data={refundReasonChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="name"/>
//               <YAxis/>

//               <Tooltip/>

//               <Bar dataKey="value" fill="#ef4444"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>


//       {/* REFUND STATUS + PRICE TYPE */}

//       <div className="charts-grid">

//         <div className="chart-card">

//           <h3>Refund Status</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <PieChart>

//               <Pie
//                 data={refundStatusChart}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={100}
//                 paddingAngle={5}
//                 label
//               >

//                 {refundStatusChart.map((entry,index)=>(
//                   <Cell key={index} fill={COLORS[index % COLORS.length]}/>
//                 ))}

//               </Pie>

//               <Legend/>
//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

//         </div>


//         <div className="chart-card">

//           <h3>Refund Price Type Comparison</h3>

//           <ResponsiveContainer width="100%" height={260}>

//             <BarChart data={priceTypeRefundChart}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="date"/>
//               <YAxis/>

//               <Tooltip/>

//               <Legend/>

//               <Bar dataKey="day_based" fill="#2563eb" name="Day Based"/>

//               <Bar dataKey="fixed" fill="#9333ea" name="Fixed Price"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default TransactionModule;


// all good but comment for data come correctly pending vs refunded



























import React, { useEffect, useState } from "react";
import "./TransactionModule.css";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";

const TransactionModule = () => {

  const [transactions,setTransactions] = useState([]);
  const [refunds,setRefunds] = useState([]);

  const [revenueChart,setRevenueChart] = useState([]);
  const [paymentChart,setPaymentChart] = useState([]);
  const [refundChart,setRefundChart] = useState([]);

  const [refundReasonChart,setRefundReasonChart] = useState([]);
  const [refundStatusChart,setRefundStatusChart] = useState([]);
  const [priceTypeRefundChart,setPriceTypeRefundChart] = useState([]);

  const COLORS = ["#2563eb","#16a34a","#f59e0b","#ef4444","#9333ea"];

  const [summary,setSummary] = useState({
    revenue:0,
    pending:0,
    refunds:0,
    orders:0
  });

  useEffect(()=>{
    fetchTransactions();
    fetchRefunds();
  },[]);

  /* =============================
     FETCH TRANSACTIONS
  ============================= */

  const fetchTransactions = async ()=>{

    const res = await axios.get(
      "http://localhost:5000/api/transactions/report?startDate=2024-01-01&endDate=2030-01-01"
    );

    setTransactions(res.data);

    let revenue = 0;
    let pending = 0;

    res.data.forEach(t=>{
      revenue += Number(t.grand_total);
      pending += Number(t.due_amount);
    });

    setSummary(prev=>({
      ...prev,
      revenue,
      pending,
      orders:res.data.length
    }));


    /* DAILY REVENUE CHART */

    const grouped = {};

    res.data.forEach(t=>{

      const date = t.created_at.split("T")[0];

      if(!grouped[date]) grouped[date] = 0;

      grouped[date] += Number(t.grand_total);

    });

    const chartData = Object.keys(grouped).map(date=>({
      date,
      revenue:grouped[date]
    }));

    setRevenueChart(chartData);


    /* PAYMENT STATUS PIE */

    const paymentGrouped = {};

    res.data.forEach(t=>{

      const status = t.payment_status || "Unknown";

      if(!paymentGrouped[status]) paymentGrouped[status] = 0;

      paymentGrouped[status]++;

    });

    const paymentData = Object.keys(paymentGrouped).map(key=>({
      name:key,
      value:paymentGrouped[key]
    }));

    setPaymentChart(paymentData);

  };


  /* =============================
     FETCH REFUNDS
  ============================= */
const fetchRefunds = async ()=>{
  

const res = await axios.get(
  "http://localhost:5000/api/transactions/refunds"
);

const refundList = res.data?.data || res.data;

setRefunds(refundList);

let totalRefund = 0;

const methodGroup = {};

const reasonGroup = {
  "Product Damage":0,
  "Quality Not Satisfied":0,
  "Wrong Item Delivered":0,
  "Other":0
};

const statusGroup = {
  "Refunded":0,
  "Pending":0
};

const priceTypeGroup = {};

/* LOOP START */

refundList.forEach(r=>{

  const amount = Number(r.total_refund_amount);
  totalRefund += amount;

  /* METHOD */

  const method = r.refund_method || "Other";

  if(!methodGroup[method]) methodGroup[method] = 0;

  methodGroup[method] += amount;

  /* REASON */

  const reason = (r.reason || "").toLowerCase();

if(reason.includes("damage")){
  reasonGroup["Product Damage"] += amount;
}
else if(reason.includes("quality")){
  reasonGroup["Quality Not Satisfied"] += amount;
}
else if(reason.includes("wrong")){
  reasonGroup["Wrong Item Delivered"] += amount;
}
else{
  reasonGroup["Other"] += amount;
}

  /* STATUS */

  const status = (r.status || "").toLowerCase();

  if(status === "returned"){
    statusGroup["Refunded"]++;
  }
  else if(status === "pending"){
    statusGroup["Pending"]++;
  }

  /* PRICE TYPE */

  const date = r.created_at.split(" ")[0];

  if(!priceTypeGroup[date]){
    priceTypeGroup[date] = {
      date:date,
      day_based:0,
      fixed:0
    };
  }

 if(r.pricing_type === "day_based"){
  priceTypeGroup[date].day_based += amount;
}

if(r.pricing_type === "fixed"){
  priceTypeGroup[date].fixed += amount;
}

});

/* LOOP END */

setSummary(prev=>({
  ...prev,
  refunds:totalRefund
}));

setRefundChart(
  Object.keys(methodGroup).map(key=>({
    name:key,
    value:methodGroup[key]
  }))
);

setRefundReasonChart(
  Object.keys(reasonGroup).map(key=>({
    name:key,
    value:reasonGroup[key]
  }))
);

setRefundStatusChart(
  Object.keys(statusGroup).map(key=>({
    name:key,
    value:statusGroup[key]
  }))
);

setPriceTypeRefundChart(
  Object.values(priceTypeGroup)
);

};


  return(

    <div className="transaction-page">

      <div className="transaction-header">
        <h1>Transaction Analytics Dashboard</h1>
      </div>


      {/* SUMMARY CARDS */}

      <div className="summary-grid">

        <div className="summary-card revenue">
          <p>Total Revenue</p>
          <h2>₹{summary.revenue}</h2>
        </div>

        <div className="summary-card pending">
          <p>Pending Amount</p>
          <h2>₹{summary.pending}</h2>
        </div>

        <div className="summary-card refund">
          <p>Total Refunds</p>
          <h2>₹{summary.refunds}</h2>
        </div>

        <div className="summary-card orders">
          <p>Total Orders</p>
          <h2>{summary.orders}</h2>
        </div>

      </div>


      {/* REVENUE + PAYMENT */}

      <div className="charts-grid">

        <div className="chart-card">

          <h3>Daily Revenue</h3>

          <ResponsiveContainer width="100%" height={280}>

            <BarChart data={revenueChart}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="date"/>
              <YAxis/>

              <Tooltip/>

              <Bar dataKey="revenue" fill="#2563eb"/>

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-card">

          <h3>Payment Status</h3>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={paymentChart}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label
              >

                {paymentChart.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}

              </Pie>

              <Legend/>
              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* REFUND METHOD + REASON */}

      <div className="charts-grid">

        <div className="chart-card">

          <h3>Refund Methods</h3>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={refundChart}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label
              >

                {refundChart.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}

              </Pie>

              <Legend/>
              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-card">

          <h3>Refund by Reason</h3>

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={refundReasonChart}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="name"/>
              <YAxis/>

              <Tooltip/>

              <Bar dataKey="value" fill="#ef4444"/>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* REFUND STATUS + PRICE TYPE */}

      <div className="charts-grid">

        <div className="chart-card">

          <h3>Refund Status</h3>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={refundStatusChart}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label
              >

                {refundStatusChart.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}

              </Pie>

              <Legend/>
              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-card">

          <h3>Refund Price Type Comparison</h3>

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={priceTypeRefundChart}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="date"/>
              <YAxis/>

              <Tooltip/>

              <Legend/>

              <Bar dataKey="day_based" fill="#2563eb" name="Day Based"/>

              <Bar dataKey="fixed" fill="#9333ea" name="Fixed Price"/>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default TransactionModule;


