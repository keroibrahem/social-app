export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:5000/api/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export const deleteImage = async (publicId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/image/${publicId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}