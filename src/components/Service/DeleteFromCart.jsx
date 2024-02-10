import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteFromCart = (session, moveToList, bookId) => {

  const handleReloadWithDelay = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  try {
    let session_key = session[1];
    axios
      .delete("http://127.0.0.1:8000/deletefromcart/", {
        data: {
          session_key: session_key,
          MoveToList: moveToList,
          BookObj: bookId,
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          handleReloadWithDelay();
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        if (error.response) {
          let message = error.response.data;
          if (message.error) toast.error(message.error);
        } else if (error.request) {
          console.error("No response received from the server:", error.request);
        } else {
          console.error("Error during request setup:", error.message);
        }
      });
  } catch (error) {
    console.error("Error during adding to cart:", error);
  }
};

export default DeleteFromCart;