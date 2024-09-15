import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./components/StarRating";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      color="#fcc491"
      size={48}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
  </React.StrictMode>
);
