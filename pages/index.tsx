import {format} from "date-fns";
import {ar} from "date-fns/locale";
import {useEffect, useState} from "react";
import {collection, addDoc, getDocs} from "firebase/firestore";
import fromUnixTime from "date-fns/fromUnixTime";

import {database} from "../firebaseConfig";
const dbInstance = collection(database, "eventos");

type Event = {
  name: string;
  date: Date;
};

export default function Home() {
  const [now, setNow] = useState<Date>();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventRegistered, setEventRegistered] = useState<string>("");
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

  useEffect(() => {
    setNow(new Date());

    setInterval(() => {
      setNow(() => new Date());
    }, 1000);

    async function getEventsFromFS() {
      setLoadingEvents(true);
      const data = await getDocs(dbInstance);

      setEvents(
        data.docs.map((item) => {
          return {date: fromUnixTime(item.data().date.seconds), name: item.data().name};
        }),
      );
      setLoadingEvents(false);
    }
    getEventsFromFS();
  }, []);

  function registerEvent(eventName) {
    const newEvent = {name: eventName, date: new Date()};

    setEvents([newEvent, ...events]);
    addDoc(dbInstance, newEvent);
    setEventRegistered(eventName);
    setTimeout(() => {
      setEventRegistered("");
    }, 2000);
  }

  function getEmoticon(eventName) {
    switch (eventName) {
      case "caca":
        return "💩";
      case "teta":
        return "👩🏻‍🍼";
      case "mema":
        return "🍼";
    }
  }

  return (
    <div className="mx-auto h-full max-w-md border-2">
      <div className="flex h-60 items-center justify-center border-b-4 border-solid border-black bg-[url('/images/olivia.jpg')] bg-cover bg-center bg-no-repeat">
        <h1 className="font-bold text-4xl text-white drop-shadow-md">Olivia App</h1>
      </div>

      <p className="my-4 text-center font-bold">
        {now ? format(now, "dd/MM hh:mm:ss aaaa", {locale: ar}) : null}
        {/* {JSON.stringify(now)} */}
      </p>

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
      {}

      <div className="m-2">
        <p className="mt-4 text-center font-semibold text-xl uppercase">Ultimos registros</p>
        {loadingEvents ? <p className="text-center">Cargando eventos...</p> : null}
        {events.length > 0 ? (
          <ul className="mt-2">
            {events.map((event: Event) => (
              <li key={`${event.name}-${event.date}`} className="">
                Se registró{" "}
                <span className="font-bold">
                  {event.name} ({getEmoticon(event.name)})
                </span>{" "}
                el: {format(event.date, "dd/MM hh:mm:ss aaaa", {locale: ar})}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
