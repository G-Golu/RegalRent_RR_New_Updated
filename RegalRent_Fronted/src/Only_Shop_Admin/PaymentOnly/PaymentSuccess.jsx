import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePaymentApi } from "../../api/shopAdmin/Checkout/checkoutApi";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {

    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return navigate("/shop-admin/checkout");
    }

    const updatePayment = async () => {
      try {
        await updatePaymentApi({
          orderId,
          paymentId: "txn_" + Date.now()
        });

        navigate(`/shop-admin/order-success/${orderId}`);

      } catch (error) {
        console.error("Payment Update Error:", error);
      }
    };

    updatePayment();

  }, []);

  return <h2>Processing Payment...</h2>;
};

export default PaymentSuccess;