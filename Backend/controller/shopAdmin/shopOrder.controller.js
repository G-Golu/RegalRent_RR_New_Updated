import db from "../../config/db.js";

/* GET all orders */
export const getShopOrders = (req, res) => {
  const sql = "SELECT * FROM shop_order ORDER BY date DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* UPDATE status + action */
export const updateOrderStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE shop_order SET status=?, action=? WHERE id=?";
  db.query(sql, [status, status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Status updated" });
  });
};

/* UPDATE return status */
export const updateReturnStatus = (req, res) => {
  const { returnStatus } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE shop_order SET returnStatus=? WHERE id=?";
  db.query(sql, [returnStatus, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Return status updated" });
  });
};
