import { Toaster } from "react-hot-toast";

export const Toast = () => {

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-right",
          success: {
            style: {
              background: "green",
              color: "#FFF",
              fontSize: "16px",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#FFF",
              fontSize: "16px",
            },
          },
        }}
      />
    </>
  );
};
