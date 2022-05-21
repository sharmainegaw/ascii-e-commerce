const dateConvert = 1000 * 60;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatPrice(price) {
  return price.toFixed(2)
}

export function formatDate(dateString) {
  const postDate = new Date(dateString);
  const currentDate = new Date(Date.now());
  const diffMin = (currentDate - postDate.getTime()) / dateConvert;

  // seconds
  if (diffMin < 1) {
    return "A few seconds ago"
  }
  // minutes
  else if (diffMin < 60) {
    return diffMin.toString().split(".")[0] + " minute" + (diffMin > 1 && diffMin < 2 ? "" : "s") + " ago"
  }
  // hours
  else if (diffMin < 1440) {
    return (diffMin / 60).toString().split(".")[0] + " hour" + (diffMin >= 60 && diffMin < 120 ? "" : "s") + " ago"
  }
  // days
  else if (diffMin < 10080) {
    return (diffMin / 60 / 24).toString().split(".")[0] + " day" + (diffMin >= 1440 && diffMin < 2880 ? "" : "s") + " ago"
  }
  else {
    return monthNames[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
  }
}