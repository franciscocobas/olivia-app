import {format} from "date-fns";
import {uy} from "date-fns/locale";
import {useEffect, useState} from "react";

export default function Home() {
  const [hour, setHour] = useState();
  const [events, setEvents] = useState([]);
  const [eventRegistered, setEventRegistered] = useState("");

  useEffect(() => {
    setHour(format(new Date(), "hh:mm:ss aaaa", {locale: uy}));
    setInterval(() => {
      setHour(() => format(new Date(), "hh:mm:ss aaaa", {locale: uy}));
    }, 1000);
  }, []);

  function registerEvent(event) {
    setEvents([...events, {event, hour: new Date()}]);
    setEventRegistered(event);
    setTimeout(() => {
      setEventRegistered("");
    }, 2000);
  }

  return (
    <>
      <div className="flex h-60 items-center justify-center border-b-4 border-solid border-black bg-[url('/images/olivia.jpg')] bg-cover bg-center bg-no-repeat">
        <h1 className="font-bold text-4xl text-white drop-shadow-md">Olivia App</h1>
      </div>

      <p className="my-4 text-center font-bold">{hour}</p>

      <div className="flex flex-col">
        <button
          className="relative m-2 h-14 rounded border-2 font-extralight active:translate-x-[1.5px] active:translate-y-[1.5px] active:bg-gray-100"
          disabled={eventRegistered !== ""}
          onClick={() => registerEvent("mema")}
        >
          Tomó mema 🍼{" "}
          {eventRegistered === "mema" ? <span className="absolute ml-6">✅</span> : null}
        </button>
        <button
          className="relative m-2 h-14 rounded border-2 font-extralight active:translate-x-[1.5px] active:translate-y-[1.5px] active:bg-gray-100"
          disabled={eventRegistered !== ""}
          onClick={() => registerEvent("teta")}
        >
          Tomó teta 👩🏻‍🍼{" "}
          {eventRegistered === "teta" ? <span className="absolute ml-6">✅</span> : null}
        </button>
        <button
          className="relative m-2 h-14 rounded border-2 font-extralight active:translate-x-[1.5px] active:translate-y-[1.5px] active:bg-gray-100"
          disabled={eventRegistered !== ""}
          onClick={() => registerEvent("caca")}
        >
          Hizo Caca 💩{" "}
          {eventRegistered === "caca" ? <span className="absolute ml-6">✅</span> : null}
        </button>
      </div>
      {events.length > 0 ? (
        <div className="m-2">
          <p className="mt-4 text-center font-semibold text-xl uppercase">Ultimos registros</p>
          <ul className="mt-2">
            {events.map((event) => (
              <li key={`${event.event}-${event.hour}`} className="">
                Se registró <span className="font-bold">{event.event}</span> a las{" "}
                {format(event.hour, "hh:mm:ss aaaa", {locale: uy})}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
