/* VANTORA MOTORS — inventory data
   Photography: Unsplash (free licence). Images are requested through Unsplash's
   image CDN with size parameters so each placement loads an appropriately sized file. */
(function () {
  const U = (id, w, extra) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${extra || ''}`;

  const PHOTOS = {
    heroDark: '1645400379459-f6fd3d963fd4',      // car emerging from darkness
    heroLines: '1756262208654-2cf76c5c267c',     // black car, light lines
    m720Front: '1664713907576-1c00104ca1ba',     // matte black 720S in garage
    m720Monaco: '1617814086906-d847a8bc6fca',    // two matte black cars, harbour
    huracanGreen: '1552176625-e47ff529b595',     // green huracán, smoke
    huracanTail: '1600510424051-30d592a75353',   // lamborghini taillight
    lamboStart: '1567410630260-9a9d3cfbb953',    // start button, alcantara
    darkSeats: '1712517272319-41fe0c28c3e0',     // dark bucket seats
    gt3rsBlack: '1580274455191-1c62238fa333',    // black GT3 RS
    gt3rsGrey: '1634673970798-a15ae56f6c65',     // grey GT3 RS
    porscheWheel: '1760204629480-2940a68855c9',  // porsche wheel, red calipers
    flatSix: '1519752594763-2633d8d4ea29',       // flat-six engine bay
    porscheCrest: '1745491373887-e0555027ea56',  // wet porsche crest
    amgFront: '1627440829335-b42fba2a15dd',      // AMG GT R front
    amgMonaco: '1617814065893-00757125efab',     // AMG GT harbour
    amgSide: '1618863099278-75222d755814',       // AMG GT R side
    amgGrey: '1618843479313-40f8afb4b4d8',       // AMG GT R three-quarter
    amgLamp: '1666195782998-5189c6a40793',       // AMG headlamp detail
    astonGrey: '1618486613525-c694bf152b2c',     // grey Aston coupe
    astonSeat: '1630683745440-2bf7085bb436',     // Aston Martin seat stitching
    forestRoad: '1573593612929-45d67798b534',    // coupe on forest road
    ghostBlack: '1740098160485-d098fbf42814',    // black Rolls-Royce
    ghostStage: '1647200527435-cc6b0e91e120',    // Rolls on stage, mono
    rollsDash: '1605437241278-c1806d14a4d9',     // Rolls dashboard, tan
    laferrari: '1583121274602-3e2820c69888',     // LaFerrari, white garage
    ferrariRear: '1597687190402-bd767ac2ce81',   // red ferrari rear
    ferrariWheel: '1615440321449-83897161d806',  // ferrari steering wheel
    lt600Mist: '1621615578530-cbf3c443165f',     // orange 600LT misty road
    lt600Detail: '1577473403731-a36ec9087f44',   // orange McLaren detail
    aventBlue: '1580654712603-eb43273aff33',     // blue aventador, dark
    senna: '1652992252915-f9b6592a61a3',         // red hypercar, dark studio
    silver911: '1669676867270-9d7afd8cd656',     // silver 911 in dark
    headlampBlue: '1725181937757-d4383b953c2c',  // blue headlamp detail
    headlampGrey: '1616761879141-f485e5fed5df',  // grey headlamp
    wheelSilver: '1623564493214-6137dff043ad',   // silver wheel
    gearLever: '1606128031531-52ae98c9707a',     // gear lever
    carbon: '1758563920442-280b4e7afe7a',        // carbon fibre texture
    carbonBody: '1751054564559-4500b7bbe29f',    // carbon bodywork
    spoiler: '1770172505231-2644765d984c',       // carbon spoiler
    showroom: '1740775525864-d8cc2ec1983e',      // showroom, cars from above
    showroomWhite: '1613921568536-555645be4032', // white porsche in showroom
    lounge: '1640357897497-599b4fc84f51',        // lounge, mono
    staircase: '1779493600136-de0f30279b4a',     // spiral staircase
    jet: '1616455436127-553454f32623',           // car beside private jet
    panning: '1690984651796-6bbb102fbf30',       // motion pan on track
    f40Alps: '1662500015066-2026db62f23e',       // red classic in the alps
    nightTail: '1610374634235-b51ef357f905',     // car at night
    seatDetail: '1705342253497-0f515970125f',    // headrest crest
    bentleyDash: '1629820408206-e9fc918abf63'    // luxury dashboard
  };

  const VEHICLES = [
    {
      id: 'mclaren-720s',
      make: 'McLaren',
      model: '720S Performance',
      short: '720S',
      year: 2021,
      mileage: 4120,
      engine: '4.0-litre twin-turbocharged V8',
      engineShort: '4.0 V8 TT',
      power: 720,
      torque: 770,
      topSpeed: 341,
      accel: 2.9,
      transmission: '7-speed SSG dual-clutch',
      drive: 'Rear-wheel drive',
      exterior: 'Onyx Black, satin finish',
      interior: 'Carbon Black Alcantara with Nappa bolsters',
      price: 189950,
      category: ['supercars'],
      tags: ['recent'],
      featured: true,
      description:
        'A single-owner Performance-specification 720S with the full carbon exterior pack, Track Telemetry and the lightweight forged wheel set. Presented in satin Onyx Black, it is one of the most understated 720S examples we have seen.',
      story:
        'Ordered new through McLaren London by a long-standing VANTORA client, this 720S was specified for the road rather than the show stand. The satin Onyx finish was a factory option applied at Woking; the carbon exterior pack, roof scoop and sports exhaust followed on the same build sheet. It has been dry-stored, dealer-maintained and never tracked.',
      photos: {
        hero: PHOTOS.m720Front,
        card: PHOTOS.m720Front,
        exterior: [PHOTOS.m720Front, PHOTOS.m720Monaco, PHOTOS.carbonBody, PHOTOS.spoiler],
        interior: [PHOTOS.darkSeats, PHOTOS.lamboStart, PHOTOS.gearLever],
        details: [PHOTOS.wheelSilver, PHOTOS.headlampGrey, PHOTOS.carbon],
        engine: PHOTOS.carbonBody
      },
      history: [
        { year: '2021', text: 'Supplied new by McLaren London. Performance specification, carbon exterior pack.' },
        { year: '2022', text: 'First annual service, McLaren Ascot. Paint protection film applied to full front.' },
        { year: '2024', text: 'Second service and brake fluid change. 3,600 miles recorded.' },
        { year: '2026', text: 'Acquired by VANTORA. 172-point inspection, full detail and preparation.' }
      ],
      technology: ['Proactive Chassis Control II', 'Variable Drift Control', 'Folding driver display', 'McLaren Track Telemetry with cameras', '360° park assist', 'Bowers & Wilkins 12-speaker audio']
    },
    {
      id: 'lamborghini-huracan-evo',
      make: 'Lamborghini',
      model: 'Huracán EVO',
      short: 'Huracán EVO',
      year: 2022,
      mileage: 2860,
      engine: '5.2-litre naturally aspirated V10',
      engineShort: '5.2 V10',
      power: 640,
      torque: 600,
      topSpeed: 325,
      accel: 2.9,
      transmission: '7-speed LDF dual-clutch',
      drive: 'All-wheel drive with rear steering',
      exterior: 'Verde Ermes, satin',
      interior: 'Nero Ade leather with Verde stitching',
      price: 214000,
      category: ['supercars'],
      tags: ['recent'],
      featured: true,
      description:
        'The last naturally aspirated V10 Lamborghini, specified in a rare satin Verde Ermes over Nero Ade with the sportivo interior pack, lifting system and forged Aesir wheels.',
      story:
        'Specified through Lamborghini Manchester with the Ad Personam programme, this Huracán EVO carries the satin Verde Ermes finish that is now almost impossible to order. Its two owners were both VANTORA clients, and it has never left dealer maintenance.',
      photos: {
        hero: PHOTOS.huracanGreen,
        card: PHOTOS.huracanGreen,
        exterior: [PHOTOS.huracanGreen, PHOTOS.huracanTail, PHOTOS.spoiler, PHOTOS.nightTail],
        interior: [PHOTOS.lamboStart, PHOTOS.darkSeats, PHOTOS.seatDetail],
        details: [PHOTOS.huracanTail, PHOTOS.carbon, PHOTOS.wheelSilver],
        engine: PHOTOS.huracanTail
      },
      history: [
        { year: '2022', text: 'Supplied new by Lamborghini Manchester. Ad Personam Verde Ermes.' },
        { year: '2023', text: 'First service. Ceramic coating and full-body PPF applied.' },
        { year: '2025', text: 'Second owner, VANTORA client. 2,100 miles.' },
        { year: '2026', text: 'Consigned to VANTORA. Inspected and prepared.' }
      ],
      technology: ['LDVI vehicle dynamics integration', 'Magnetorheological suspension', 'Rear-wheel steering', 'Sensonum sound system', 'Front-axle lifting system', 'Apple CarPlay via 8.4" touchscreen']
    },
    {
      id: 'porsche-911-gt3-rs',
      make: 'Porsche',
      model: '911 GT3 RS',
      short: 'GT3 RS',
      year: 2023,
      mileage: 1210,
      engine: '4.0-litre naturally aspirated flat-six',
      engineShort: '4.0 Flat-6',
      power: 525,
      torque: 465,
      topSpeed: 296,
      accel: 3.2,
      transmission: '7-speed PDK',
      drive: 'Rear-wheel drive',
      exterior: 'Black, Weissach Package',
      interior: 'Black Race-Tex with carbon full-bucket seats',
      price: 259000,
      category: ['performance', 'collectors'],
      tags: ['recent'],
      featured: true,
      description:
        'A 992-generation GT3 RS with the Weissach Package, magnesium wheels, Clubsport pack and front-axle lift. Delivery mileage and a full paint protection film from new.',
      story:
        'Allocated to a long-standing Porsche Centre client, this GT3 RS was collected from Zuffenhausen on the factory delivery programme and driven fewer than 1,300 miles since. The Weissach Package brings the carbon anti-roll bars, magnesium wheels and the exposed-carbon roof and bonnet.',
      photos: {
        hero: PHOTOS.gt3rsBlack,
        card: PHOTOS.gt3rsBlack,
        exterior: [PHOTOS.gt3rsBlack, PHOTOS.gt3rsGrey, PHOTOS.showroomWhite, PHOTOS.spoiler],
        interior: [PHOTOS.darkSeats, PHOTOS.seatDetail, PHOTOS.gearLever],
        details: [PHOTOS.porscheWheel, PHOTOS.porscheCrest, PHOTOS.carbon],
        engine: PHOTOS.flatSix
      },
      history: [
        { year: '2023', text: 'Factory collection, Zuffenhausen. Weissach Package, magnesium wheels.' },
        { year: '2024', text: 'Full-body PPF and ceramic coating. First service at 800 miles.' },
        { year: '2026', text: 'Consigned to VANTORA. 1,210 miles. Complete history file.' }
      ],
      technology: ['DRS-enabled active aerodynamics', 'Porsche Active Suspension Management', 'Track mode with individual damper and differential control', 'Carbon-ceramic brakes (PCCB)', 'Front-axle lift system', 'Chrono Package with lap trigger']
    },
    {
      id: 'mercedes-amg-gt-r-pro',
      make: 'Mercedes-AMG',
      model: 'GT R Pro',
      short: 'GT R Pro',
      year: 2020,
      mileage: 6400,
      engine: '4.0-litre biturbo V8',
      engineShort: '4.0 V8 BiT',
      power: 585,
      torque: 700,
      topSpeed: 318,
      accel: 3.6,
      transmission: '7-speed AMG Speedshift DCT',
      drive: 'Rear-wheel drive',
      exterior: 'Designo Selenite Grey Magno',
      interior: 'Black Nappa leather and Dinamica',
      price: 142500,
      category: ['performance'],
      tags: [],
      featured: false,
      description:
        'One of 750 GT R Pro cars built worldwide, in the definitive Selenite Grey Magno with the Track Package, carbon roof and adjustable coil-over suspension.',
      story:
        'The GT R Pro was AMG’s engineering send-off for the first-generation GT. This example was supplied by Mercedes-Benz Brooklands, has covered a modest 6,400 miles and carries the full AMG Track Package including the roll-over bar and four-point harnesses.',
      photos: {
        hero: PHOTOS.amgFront,
        card: PHOTOS.amgGrey,
        exterior: [PHOTOS.amgFront, PHOTOS.amgGrey, PHOTOS.amgSide, PHOTOS.amgMonaco],
        interior: [PHOTOS.darkSeats, PHOTOS.gearLever, PHOTOS.bentleyDash],
        details: [PHOTOS.amgLamp, PHOTOS.wheelSilver, PHOTOS.carbon],
        engine: PHOTOS.amgLamp
      },
      history: [
        { year: '2020', text: 'Supplied new by Mercedes-Benz Brooklands. Track Package.' },
        { year: '2021', text: 'First service, AMG Performance Centre.' },
        { year: '2023', text: 'Third service and new Michelin Cup 2 tyres.' },
        { year: '2026', text: 'Part-exchanged with VANTORA. Inspected and prepared.' }
      ],
      technology: ['AMG Ride Control with adjustable coil-overs', 'Active rear-wheel steering', 'AMG Traction Control (9-stage)', 'Carbon-ceramic brakes', 'AMG Track Pace telemetry', 'Burmester surround sound']
    },
    {
      id: 'aston-martin-dbs-superleggera',
      make: 'Aston Martin',
      model: 'DBS Superleggera',
      short: 'DBS',
      year: 2021,
      mileage: 3900,
      engine: '5.2-litre twin-turbocharged V12',
      engineShort: '5.2 V12 TT',
      power: 725,
      torque: 900,
      topSpeed: 340,
      accel: 3.4,
      transmission: '8-speed ZF automatic',
      drive: 'Rear-wheel drive',
      exterior: 'Xenon Grey',
      interior: 'Obsidian Black with Copper Tan accents',
      price: 198750,
      category: ['grand-touring'],
      tags: [],
      featured: true,
      description:
        'The definitive twin-turbo V12 grand tourer, in Xenon Grey with the carbon exterior pack, Bang & Olufsen audio and the Q by Aston Martin interior detailing.',
      story:
        'Commissioned through Q by Aston Martin, this DBS Superleggera was specified for long-distance driving: the comfort seats, the full Bang & Olufsen BeoSound system and a discreet Copper Tan accent through an otherwise Obsidian cabin. Two owners; complete Aston Martin service history.',
      photos: {
        hero: PHOTOS.astonGrey,
        card: PHOTOS.astonGrey,
        exterior: [PHOTOS.astonGrey, PHOTOS.forestRoad, PHOTOS.silver911, PHOTOS.nightTail],
        interior: [PHOTOS.astonSeat, PHOTOS.bentleyDash, PHOTOS.gearLever],
        details: [PHOTOS.headlampGrey, PHOTOS.wheelSilver, PHOTOS.carbon],
        engine: PHOTOS.headlampGrey
      },
      history: [
        { year: '2021', text: 'Supplied new by Aston Martin Mayfair. Q by Aston Martin interior.' },
        { year: '2022', text: 'First service. Ceramic coating applied.' },
        { year: '2024', text: 'Second owner. Third service at 3,400 miles.' },
        { year: '2026', text: 'Acquired by VANTORA.' }
      ],
      technology: ['Adaptive damping with GT / Sport / Sport+ modes', 'Mechanical limited-slip differential', 'Carbon-ceramic brakes', 'Bang & Olufsen BeoSound audio', '360° camera and park assist', 'Wireless phone charging']
    },
    {
      id: 'rolls-royce-ghost-black-badge',
      make: 'Rolls-Royce',
      model: 'Ghost Black Badge',
      short: 'Ghost',
      year: 2022,
      mileage: 5100,
      engine: '6.75-litre twin-turbocharged V12',
      engineShort: '6.75 V12 TT',
      power: 600,
      torque: 900,
      topSpeed: 250,
      accel: 4.7,
      transmission: '8-speed ZF automatic',
      drive: 'All-wheel drive with all-wheel steering',
      exterior: 'Black Diamond',
      interior: 'Black and Tan leather, Technical Fibre veneer',
      price: 335000,
      category: ['luxury'],
      tags: ['recent'],
      featured: false,
      description:
        'A Black Badge Ghost with the Starlight Headliner, Shooting Star, illuminated fascia and 22-inch carbon-composite wheels. One owner from new.',
      story:
        'Delivered by Rolls-Royce Motor Cars London with a bespoke Black Diamond finish and darkened Spirit of Ecstasy, this Ghost has spent its life on chauffeur-driven duties between Mayfair and the Cotswolds. The Starlight Headliner includes a Shooting Star, and the illuminated fascia was specified in Tan to match the seating.',
      photos: {
        hero: PHOTOS.ghostBlack,
        card: PHOTOS.ghostBlack,
        exterior: [PHOTOS.ghostBlack, PHOTOS.ghostStage, PHOTOS.nightTail, PHOTOS.staircase],
        interior: [PHOTOS.rollsDash, PHOTOS.bentleyDash, PHOTOS.seatDetail],
        details: [PHOTOS.headlampBlue, PHOTOS.wheelSilver, PHOTOS.carbon],
        engine: PHOTOS.ghostStage
      },
      history: [
        { year: '2022', text: 'Supplied new by Rolls-Royce Motor Cars London. Black Badge specification.' },
        { year: '2023', text: 'First service. Full-body PPF.' },
        { year: '2025', text: 'Third service. 4,800 miles.' },
        { year: '2026', text: 'Consigned to VANTORA by the first owner.' }
      ],
      technology: ['Planar Suspension System', 'Satellite Aided Transmission', 'Starlight Headliner with Shooting Star', 'Illuminated fascia', 'Micro-Environment Purification', 'Bespoke Audio, 18 speakers']
    },
    {
      id: 'ferrari-laferrari',
      make: 'Ferrari',
      model: 'LaFerrari',
      short: 'LaFerrari',
      year: 2015,
      mileage: 1450,
      engine: '6.3-litre V12 with HY-KERS hybrid system',
      engineShort: '6.3 V12 Hybrid',
      power: 963,
      torque: 900,
      topSpeed: 350,
      accel: 2.6,
      transmission: '7-speed F1 dual-clutch',
      drive: 'Rear-wheel drive',
      exterior: 'Rosso Corsa',
      interior: 'Nero leather and Alcantara, carbon fibre',
      price: 0,
      priceLabel: 'Price on application',
      category: ['collectors', 'supercars'],
      tags: [],
      featured: false,
      description:
        'One of 499 coupés. Rosso Corsa over Nero, with the original books, tools, car cover and a fully documented history including Ferrari Classiche certification.',
      story:
        'Delivered new to a private collector in Europe and imported to the UK in 2019, this LaFerrari has been maintained exclusively by Ferrari and holds Classiche certification. It is offered from a private collection and is available to view by appointment only.',
      photos: {
        hero: PHOTOS.laferrari,
        card: PHOTOS.laferrari,
        exterior: [PHOTOS.laferrari, PHOTOS.ferrariRear, PHOTOS.senna, PHOTOS.f40Alps],
        interior: [PHOTOS.ferrariWheel, PHOTOS.darkSeats, PHOTOS.gearLever],
        details: [PHOTOS.ferrariRear, PHOTOS.carbon, PHOTOS.wheelSilver],
        engine: PHOTOS.ferrariRear
      },
      history: [
        { year: '2015', text: 'Delivered new in Europe. One of 499 coupés.' },
        { year: '2019', text: 'Imported to the United Kingdom. Ferrari Classiche certification.' },
        { year: '2023', text: 'Hybrid battery service completed by Ferrari.' },
        { year: '2026', text: 'Offered by VANTORA on behalf of a private collection.' }
      ],
      technology: ['HY-KERS hybrid system with 120 kW electric motor', 'Active aerodynamics, front and rear', 'F1-Trac and E-Diff 3', 'Carbon-ceramic Brembo brakes', 'Carbon fibre monocoque', 'Ferrari Classiche certified']
    },
    {
      id: 'mclaren-600lt-spider',
      make: 'McLaren',
      model: '600LT Spider',
      short: '600LT',
      year: 2020,
      mileage: 7300,
      engine: '3.8-litre twin-turbocharged V8',
      engineShort: '3.8 V8 TT',
      power: 600,
      torque: 620,
      topSpeed: 324,
      accel: 2.9,
      transmission: '7-speed SSG dual-clutch',
      drive: 'Rear-wheel drive',
      exterior: 'McLaren Orange',
      interior: 'Carbon Black Alcantara, Senna seats',
      price: 176000,
      category: ['supercars'],
      tags: ['recent'],
      featured: false,
      description:
        'A Longtail Spider in the signature McLaren Orange with MSO Clubsport Pack, Senna carbon seats and top-exit exhausts. Full McLaren history.',
      story:
        'This 600LT Spider was supplied by McLaren Birmingham with the MSO Clubsport Pack and the Senna carbon-fibre seats. It has been enjoyed properly — 7,300 miles including two European tours — and serviced without exception at McLaren retailers.',
      photos: {
        hero: PHOTOS.lt600Mist,
        card: PHOTOS.lt600Mist,
        exterior: [PHOTOS.lt600Mist, PHOTOS.lt600Detail, PHOTOS.panning, PHOTOS.spoiler],
        interior: [PHOTOS.darkSeats, PHOTOS.lamboStart, PHOTOS.gearLever],
        details: [PHOTOS.lt600Detail, PHOTOS.carbon, PHOTOS.wheelSilver],
        engine: PHOTOS.lt600Detail
      },
      history: [
        { year: '2020', text: 'Supplied new by McLaren Birmingham. MSO Clubsport Pack.' },
        { year: '2021', text: 'First service. European tour, 1,800 miles.' },
        { year: '2024', text: 'Fourth service and new tyres.' },
        { year: '2026', text: 'Acquired by VANTORA.' }
      ],
      technology: ['Top-exit exhaust system', 'Senna carbon-fibre racing seats', 'Track Telemetry', 'Carbon-ceramic brakes', 'Proactive Chassis Control', 'Retractable hard-top in 15 seconds']
    }
  ];

  const COLLECTIONS = [
    { id: 'supercars', name: 'Supercars', note: 'Mid-engined, uncompromised', photo: PHOTOS.aventBlue },
    { id: 'luxury', name: 'Luxury', note: 'Silence, presence, craft', photo: PHOTOS.ghostBlack },
    { id: 'performance', name: 'Performance', note: 'Track-derived road cars', photo: PHOTOS.gt3rsGrey },
    { id: 'grand-touring', name: 'Grand Touring', note: 'Continents in a day', photo: PHOTOS.forestRoad },
    { id: 'collectors', name: 'Collectors', note: 'Limited series and provenance', photo: PHOTOS.laferrari },
    { id: 'recent', name: 'Recently Arrived', note: 'New to the showroom', photo: PHOTOS.m720Front }
  ];

  const fmtPrice = (v) =>
    v.priceLabel || '£' + v.price.toLocaleString('en-GB');
  const fmtMiles = (n) => n.toLocaleString('en-GB') + ' miles';

  window.VANTORA = { PHOTOS, VEHICLES, COLLECTIONS, U, fmtPrice, fmtMiles };
})();
