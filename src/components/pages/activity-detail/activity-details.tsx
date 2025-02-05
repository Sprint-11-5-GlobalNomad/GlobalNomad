import ActivityDescription from "./activity-description";
import BookingSection from "./booking-section";

export default function ActivityDetails() {
  return (
    <div className="w-[120rem] flex justify-between">
      <div>
        <hr
          className="w-[79rem] h-[0.1rem] bg-nomad-black
        opacity-25 mb-[4rem]"
        ></hr>
        <ActivityDescription />
      </div>
      <BookingSection />
    </div>
  );
}
