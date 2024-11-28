export default function ClubsList() {
  const clubs = [
    {
      name: "Startup 001 fsdfhsd fnksdnfksdf fnksdnfksd fksdnfksnfksd",
      image: "/img/demo/1691982395 (1).webp",
      pinned: true,
    },
    {
      name: "Share Market",
      image:
        "/img/demo/stock-market-highlights-short-covering-rally-takes-nifty-beyond-24k-heres-how-to-trade-on-friday.webp",
      pinned: true,
    },
    { name: "Market Today", image: "/img/demo/images (1).jpeg", pinned: true },
    {
      name: "Lean Startup",
      image: "/img/demo/startup-business-concept.jpg",
      pinned: false,
    },
    {
      name: "Health Care",
      image: "/img/demo/drarticle-primary-health-1024x576.png",
      pinned: false,
    },
    {
      name: "The Dev",
      image: "/img/demo/Top-6-Software-Development-Methodologies.jpg",
      pinned: false,
    },
    {
      name: "The AI",
      image:
        "/img/demo/What-is-M.Tech-in-Artificial-Intelligence_AI.jpg.optimal.jpg",
      pinned: false,
    },
    {
      name: "Business Man",
      image: "/img/demo/startup-business-concept.jpg",
      pinned: false,
    },
    {
      name: "The Dev",
      image: "/img/demo/Top-6-Software-Development-Methodologies.jpg",
      pinned: false,
    },
  ];

  return (
    <div className="relative">
      {clubs.map((club, index) => (
        <div
          key={index}
          className="relative flex flex-row items-center mb-2 gap-1"
        >
          <div className="relative flex-shrink-0">
            <img
              src={club.image}
              alt={club.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-t5-black truncate">{club.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
