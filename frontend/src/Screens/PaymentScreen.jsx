import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // PayPal SDK
import paymentReducer from "../reducers/paymentReducer"; // Import reducer
import "../styles/PaymentScreen.css";

const API_URL = "http://127.0.0.1:8000";

const PaymentScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initial state for useReducer
    const initialState = {
        auctionData: null,
        loading: true,
        error: null,
        paymentStatus: null
    };

    // UseReducer hook to manage state
    const [state, dispatch] = useReducer(paymentReducer, initialState);

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                dispatch({ type: "FETCH_DATA_REQUEST" });

                // Replace with actual API call once ready
                const dummyData = {
                    winner: "JohnDoe",
                    winningBid: 250,
                    status: "Closed"
                };

                // Uncomment when backend is ready
                // const response = await axios.get(`${API_URL}/api/auctions/${id}/payment/`);
                // dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });

                dispatch({ type: "FETCH_DATA_SUCCESS", payload: dummyData });
            } catch (error) {
                console.error("Error fetching auction payment details", error);
                dispatch({ type: "FETCH_DATA_FAILURE", payload: "Failed to load payment details." });
            }
        };

        fetchAuctionData();
    }, [id]);

    const handlePaymentSuccess = (details) => {
        console.log("Payment successful", details);
        dispatch({ type: "PAYMENT_SUCCESS" });
        alert("Payment was successful!");
    };

    const handlePaymentError = (error) => {
        console.error("Payment error", error);
        dispatch({ type: "PAYMENT_FAILURE" });
        alert("There was an error processing the payment.");
    };

    if (state.loading) return <p className="text-center mt-4">Loading...</p>;
    if (state.error) return <p className="text-red-500 text-center mt-4">{state.error}</p>;

    return (
        <div className="payment-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="payment-title">Payment for Auction</h2>

            <div className="payment-details">
                <p><strong>Winner:</strong> {state.auctionData?.winner}</p>
                <p><strong>Winning Bid:</strong> ${state.auctionData?.winningBid}</p>
                <p><strong>Status:</strong> {state.auctionData?.status}</p>
            </div>

            {/* PayPal Button Section */}
            <PayPalScriptProvider options={{ "client-id": "AQql_VofYPjxjRfR-DqvuUP7jIwCg_jf3tOHhF9e922heDsZR1Esgztd-D-lF8bLK1mRIks1yPzZLlO8", currency: "USD" }}>
                <div className="pay-section">
                    <PayPalButtons
                        style={{ layout: "vertical", shape: "rect" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: state.auctionData?.winningBid.toString(),
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={handlePaymentSuccess}
                        onError={handlePaymentError}
                    />
                </div>
            </PayPalScriptProvider>
        </div>
    );
};

export default PaymentScreen;
