import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";

  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  )
    return "image";

  return "file";
};
const transformImage = (url = "", width = 100) => {
  // http://res.cloudinary.com/dcayp5lku/image/upload/v1729324406/8ef21d2b-2ab4-49ff-baed-f6c0a5885140.png
  // const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return url;
};

const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }

  return last7Days;
};
const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null; // Safely parse JSON if it exists
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null; // Return null if the value isn't valid JSON
    }
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export { fileFormat, transformImage, getLast7Days,getOrSaveFromStorage };
