import axiosInstance from "./axiosInstance";

export const getCartAPI = async () => {
  const { data } = await axiosInstance.get("/api/cart");
  return data;
};

export const updateCartItemAPI = async (productId, quantity) => {
  const { data } = await axiosInstance.put("/api/cart/update", {
    productId,
    quantity,
  });
  return data;
};

export const removeCartItemAPI = async (productId) => {
  const { data } = await axiosInstance.delete(`/api/cart/remove/${productId}`);
  return data;
};
