// const url = "https://stream123.norwayeast.cloudapp.azure.com/";
const url = "http://localhost:3000/";

const getRooms = async () => {
  // ||
  //   new Date() - JSON.parse(localStorage.getItem("rooms")).timestamp > 604800000

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
      },
    });

    const result = await response.json();
    console.log("getRooms", result);
  } catch (error) {
    console.error(error);
  }
};
const splitDate = (date) => {
  return date.toLocaleDateString("sv");
};
const getWeekReservations = async (date, room, refresh = false) => {
  while (date.getDay() != 1) {
    if (date.getDay() === 0) {
      date.setDate(date.getDate() + 1);
      break;
    }
    if (date.getDay() === 6) {
      date.setDate(date.getDate() + 2);
      break;
    }
    date.setDate(date.getDate() - 1);
  }

  const addDays = (date, days) => {
    const res = new Date(date);
    res.setDate(date.getDate() + days);
    return res;
  };
  const end = splitDate(addDays(date, +4));
  const startDate = date;
  const endDate = end;
  date = splitDate(date);

  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
      },
    };
    const response = await fetch(
      `${url}week?startDate=${startDate}&endDate=${endDate}&room=${room}`,
      fetchOptions
    );
    const result = await response.json();

    const obj = {
      reservations: result.reservations,
      timestamp: new Date().getTime(),
    };
    const reservations = JSON.stringify(obj);
    localStorage.setItem("week" + date + room, reservations);

    console.log("getWeekReservations", result);
  } catch (error) {
    console.error(error);
  }
};
const getReservations = async (date, room, refresh = false) => {
  date = splitDate(date);

  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
      },
    };

    const response = await fetch(
      `${url}day?startDate=${date}&endDate=${date}&room=${room}`,
      fetchOptions
    );
    const result = await response.json();

    const obj = {
      reservations: result.reservations,
      timestamp: new Date().getTime(),
    };
    const reservations = JSON.stringify(obj);
    localStorage.setItem(date + room, reservations);

    console.log("getReservations", result);
  } catch (error) {
    console.error(error);
  }
};
getRooms();
getWeekReservations(new Date(), "KMD659");
getReservations(new Date(), "KMD659");
