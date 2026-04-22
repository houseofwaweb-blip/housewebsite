interface Week {
  week: string;
  title: string;
  description: string;
  accent?: string;
}

const WEEKS: Week[] = [
  {
    week: "Week 1",
    title: "The Companion catches damp early.",
    description: "You photograph a mark behind the radiator. The Companion identifies a likely valve seal leak, flags it as non-urgent, and suggests a plumber at the House rate. £120, resolved before the cold snap.",
    accent: "howa-teal",
  },
  {
    week: "Week 2",
    title: "Boiler service booked at member rate.",
    description: "HoWA remembers the boiler was installed in 2018. It surfaces a reminder for annual service, matches you with a House-vetted engineer, and books at the HoWA+ member rate. 15% less than calling direct.",
  },
  {
    week: "Week 3",
    title: "The Hearth publishes seasonal prep.",
    description: "A new article on preparing the garden for autumn lands in your feed. The Companion connects it to your garden record and suggests scheduling a gutter clear before the leaves fall.",
  },
  {
    week: "Week 4",
    title: "Dashboard shows the home stable.",
    description: "Everything is current. The boiler is serviced, the damp is fixed, the gutters are scheduled. HoWA queues the next quarter's priorities. You didn't chase anything.",
  },
];

export function MonthTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {WEEKS.map((w, i) => (
        <div
          key={w.week}
          className="relative pl-8 border-l-2 border-house-gold/20 pb-2"
        >
          <span className="absolute left-[-7px] top-[2px] is-round w-3 h-3 bg-house-gold" />
          <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold mb-1 block">
            {w.week}
          </span>
          <h4 className="font-sans font-medium text-[16px] text-house-brown mb-2 leading-[1.3]">
            {w.title}
          </h4>
          <p className="font-sans text-[14px] leading-[1.6] text-house-stone">
            {w.description}
          </p>
        </div>
      ))}
    </div>
  );
}
