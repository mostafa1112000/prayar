import { useEffect, useState } from "react";
import Prayar from "./component/prayar";
function App() {
  const [prayarTimes, setPrayarTimes] = useState({});
  const [dateTime, setdateTime] = useState("");
  const [city, setCity] = useState("Cairo");
  const cities = [
    {
      name: "القاهرة",
      value: "Cairo",
    },
    {
      name: "الاسكندرية",
      value: "Alexandria",
    },
    {
      name: "الجيزة",
      value: "Giza",
    },
    {
      name: "المنصورة",
      value: "Mansoura",
    },
    {
      name: "أسوان",
      value: "Aswan",
    },
    {
      name: "الأقصر",
      value: "Luxor",
    },
  ];

  useEffect(() => {
    const fetchPrayarTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/13-03-2025?city=${city}&country=egypt&method=8`
        );
        const data_prayar = await response.json();

        setPrayarTimes(data_prayar.data.timings);
        setdateTime(data_prayar.data.date.gregorian.date);
      } catch {
        console.error(error);
      }
    };
    fetchPrayarTimes();
  }, [city]);

  {
    /** This Function Convert Date from system 24hours to 12 hours and Make AM Or PM  */
  }
  const formatTimes = (time) => {
    if (!time) {
      return "00.00";
    }

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top_section">
          {/* city section*/}
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_obj) => (
                <option key={city_obj.value} value={city_obj.value}>
                  {city_obj.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date section*/}

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayar name="الفجر" time={formatTimes(prayarTimes.Fajr)} />
        <Prayar name="الظهر" time={formatTimes(prayarTimes.Dhuhr)} />
        <Prayar name="العصر" time={formatTimes(prayarTimes.Asr)} />
        <Prayar name="المغرب" time={formatTimes(prayarTimes.Maghrib)} />
        <Prayar name="العشاء" time={formatTimes(prayarTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
