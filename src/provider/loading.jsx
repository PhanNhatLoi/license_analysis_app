import { useState, useContext, createContext } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {loading && (
        <div className="relative">
          <div
            className="absolute top-0 left-0 flex justify-center items-center z-10"
            style={{
              height: "100vh",
              width: "100vw",
              background: "black",
              opacity: 0.25,
            }}
          >
            <div className="loader z-20"></div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default LoadingProvider;
