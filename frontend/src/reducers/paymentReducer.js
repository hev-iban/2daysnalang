// reducers/paymentReducer.js
const paymentReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA_REQUEST":
        return { ...state, loading: true };
      case "FETCH_DATA_SUCCESS":
        return { ...state, loading: false, auctionData: action.payload };
      case "FETCH_DATA_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "PAYMENT_SUCCESS":
        return { ...state, paymentStatus: "success" };
      case "PAYMENT_FAILURE":
        return { ...state, paymentStatus: "failed" };
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  