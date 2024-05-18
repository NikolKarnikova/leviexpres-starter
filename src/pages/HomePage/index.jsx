import { useState } from "react";
import { JourneyPicker } from "../../components/JourneyPicker";

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? (
        <p>Nalezeno spojení s id {journey.journeyId}</p>
      ) : null}
      {/* /* {journey ?< p>Nalezeno spojení s id …</p> : null} */}
      {/* {journey !== null && <p>Nalezeno spojení s id {journey.journeyId}}</p> */}
    </main>
  );
};
