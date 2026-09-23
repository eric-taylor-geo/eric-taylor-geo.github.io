var HW_FLOORS = [
  {
    id: "grounds", label: "Overview", map: "images/floorplan-grounds.png",
    locations: [
      { id: "great-lake",         label: "Great Lake",            x: 10.65, y: 22.84, image: "images/floorplan-grounds-greatlake.jpg",                                                     desc: "", firstSeen: "",    updatedIn: [],              history: "The real Great Lake is set in Loch Shiel, Scotland." },
      { id: "owlery",             label: "Owlery",                x: 93.46, y: 69.04, image: "images/floorplan-grounds-owlery.jpg",                                                     desc: "", firstSeen: "GoF",    updatedIn: [],              history: "The Owlery was added in GoF with new terrain to the West of the castle. " },
      { id: "ruins",              label: "Ruins",                 x: 63.63, y: 95.05, image: "images/floorplan-grounds-ruins.jpg",                   desc: "", firstSeen: "",    updatedIn: [],              history: "" },
      { id: "wooden-bridge",      label: "Wooden Bridge",         x: 86.99, y: 42.51, image: "images/floorplan-grounds-woodenbridge.jpg",                                                     desc: "'BOOM!'", firstSeen: "PoA",    updatedIn: ["DH2"],              history: "The Wooden Bridge was added in PoA, connecting the castle to the new locations for Hagrid's Hut, the Forbidden Forest, and the Whomping Willow." },
      { id: "boat-house",         label: "Boat House",            x: 23.37, y: 23.86, image: "images/floorplan-grounds-boathouse.jpg",               desc: "", firstSeen: "PS", updatedIn: ["HBP", "DH2"],         history: "" },
      { id: "viaduct-courtyard",  label: "Viaduct Courtyard",     x: 47.65, y: 27.86, image: "images/floorplan-grounds-viaductcourtyard.jpg",        desc: "", firstSeen: "GoF",  updatedIn: ["DH2"],         history: "The Viaduct Courtyard replaced the Chamber of Reception in GoF. It was updated to a larger design in DH2 for the Battle of Hogwarts." },
      { id: "the-quad",           label: "The Quad",              x: 59.45, y: 40.93, image: "images/floorplan-grounds-thequad.jpg",                                                     desc: "", firstSeen: "PS",    updatedIn: ["PoA", "OotP", "DH2"],              history: "" },
      { id: "transfiguration-ct", label: "Trans. Ct.",   x: 53.23, y: 73.73, image: "images/floorplan-grounds-transfigurationcourtyard.jpg",desc: "", firstSeen: "PS",  updatedIn: ["PoA", "GoF", "HBP"],         history: "The TC had two real-world film locations: Durham Cathedral and New College, Oxford, before being turned into a set for the HBP at Leavesden." },
      { id: "viaduct",            label: "Viaduct",               x: 46.93, y: 44.80, image: "images/floorplan-grounds-viaduct.jpg",                 desc: "", firstSeen: "PS", updatedIn: ["GoF", "DH2"],              history: "The Viaduct connects the West and East Wings. It originally connected the Viaduct Entrance and Chamber of Recepetion. The CoR was removed in GoF, being replaced by the Viaduct Courtyard. Harry and Ron can be seen running over the viaduct from the Great Hall to their Transfiguration class in PS." },
      { id: "great-hall-g",       label: "Great Hall",            x: 53.59, y: 18.46, image: "images/floorplan-grounds-greathall.jpg",               desc: "", firstSeen: "PS",  updatedIn: ["CoS","PoA","GoF","HBP", "DH2"], history: "" },
      { id: "viaduct-entrance-g", label: "Viaduct Entrance",      x: 46.17, y: 55.77, image: "images/floorplan-grounds-viaductentrance.jpg",         desc: "", firstSeen: "PS",  updatedIn: ["PoA"],         history: "The Viaduct Entrance was inspired by Durham Cathedral's East Facade, and acts as the main entrance to the East Wing." },
      { id: "central-tower",      label: "Central Tower",         x: 46.17, y: 63.01, image: "images/floorplan-grounds-centraltower.jpg",            desc: "", firstSeen: "PS",  updatedIn: ["PoA", "GoF"],         history: "The Central Tower originally had round turrets at each corner and a conical roof at its center. In PoA" },
      { id: "bell-tower-g",       label: "Bell Tower",            x: 43.66, y: 82.48, image: "images/floorplan-grounds-belltower.jpg",               desc: "", firstSeen: "PS", updatedIn: ["PoA"],              history: "" },
      { id: "astronomy-tower",    label: "Astronomy Tower",       x: 53.11, y: 67.39, image: "images/floorplan-grounds-astronomytower.jpg",          desc: "", firstSeen: "HBP", updatedIn: [],              history: "The Astronomy Tower replaced the Dark Tower in HBP and is the tallest structure in the castle." },
      { id: "clock-tower",        label: "Clock Tower",           x: 69.49, y: 41.88, image: "images/floorplan-grounds-clocktower.jpg",              desc: "", firstSeen: "PoA", updatedIn: [],              history: "" },
      { id: "grand-staircase",    label: "Grand Staircase Tower", x: 54.19, y: 32.55, image: "images/floorplan-grounds-grandstaircasetower.jpg",     desc: "", firstSeen: "PS",  updatedIn: ["PoA"],         history: "" },
      { id: "north-tower",        label: "North Tower",           x: 66.15, y: 31.98, image: "images/floorplan-grounds-northtower.jpg",              desc: "", firstSeen: "PS",  updatedIn: ["PoA"],              history: "" },
      { id: "alnwick-entrance",   label: "Alnwick Entrance",      x: 54.07, y: 94.23, image: "images/floorplan-grounds-alnickentrance.jpg",          desc: "", firstSeen: "PS",  updatedIn: ["CoS", "PoA"],         history: "Filmed at Alnwick Castle" },
      { id: "greenhouses",        label: "Greenhouses",           x: 46.17, y: 89.09, image: "images/floorplan-grounds-greenhouses.jpg",             desc: "", firstSeen: "PS",  updatedIn: ["CoS"],              history: "" }
    ]
  },
  {
    id: "floor-0", label: "Ground", map: "images/floorplan-0.png",
    locations: [
      { id: "great-hall",         label: "Great Hall",        x: 53.83, y: 18.65, image: "images/floorplan-0-greathall.jpg", desc: "", firstSeen: "",  updatedIn: [], history: "" },
      { id: "transfiguration",    label: "Transfiguration",   x: 53.83, y: 86.68, image: "images/floorplan-0-transfiguration.jpg", desc: "", firstSeen: "",  updatedIn: [],              history: "" },
      { id: "viaduct-entrance-int",   label: "Viaduct Entrance",  x: 46.09, y: 55.58, image: "images/floorplan-0-viaductentrance.jpg", desc: "", firstSeen: "",  updatedIn: [],         history: "" },
      { id: "dada",               label: "DADA",              x: 44.10, y: 72.46, image: "images/floorplan-0-dada.jpg", desc: "", firstSeen: "", updatedIn: [],              history: "" }
    ]
  },
  {
    id: "floor-1", label: "1st", map: "images/floorplan-1.png",
    locations: [
      { id: "library",              label: "Library",            x: 57.90, y: 72.97, image: "images/floorplan-1-library.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" },
      { id: "charms",               label: "Charms",             x: 48.25, y: 62.44, image: "images/floorplan-1-charms.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" },
      { id: "first-floor-corridor", label: "1st Floor Corridor", x: 59.41, y: 47.59, image: "images/floorplan-1-1stfloorcorridor.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" }
    ]
  },
  {
    id: "floor-2", label: "2nd", map: "images/floorplan-2.png",
    locations: [
      { id: "hall-of-hexes", label: "Hall of Hexes", x: 46.09, y: 71.19, image: "images/floorplan-2-hallofhexes.jpg", desc: "", firstSeen: "",  updatedIn: [], history: "" }
    ]
  },
  {
    id: "floor-3", label: "3rd", map: "images/floorplan-3.png",
    locations: [
      { id: "third-floor-corridor", label: "3rd Floor Corridor", x: 54.94, y: 46.83, image: "images/floorplan-3-3rdfloorcorridor.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" },
      { id: "gryffindor",           label: "Gryffindor",         x: 64.67, y: 48.61, image: "images/floorplan-3-gryffindor.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" },
      { id: "reading-room",         label: "Reading Room",        x: 61.08, y: 33.88, image: "images/floorplan-3-readingroom.jpg", desc: "", firstSeen: "",  updatedIn: [],  history: "" }
    ]
  },
  {
    id: "floor-4", label: "4th", map: "images/floorplan-4.png",
    locations: [
      { id: "forbidden-corridor", label: "Forbidden Corridor", x: 54.78, y: 42.13, image: "images/floorplan-4-forbiddencorridor.jpg", desc: "", firstSeen: "",  updatedIn: [], history: "" },
      { id: "divination",         label: "Divination",         x: 65.95, y: 32.23, image: "images/floorplan-4-divination.jpg", desc: "", firstSeen: "", updatedIn: [], history: "" }
    ]
  },
  {
    id: "floor-5", label: "5th", map: "images/floorplan-5.png",
    locations: [
      { id: "ravenclaw",     label: "Ravenclaw",     x: 46.21, y: 63.07, image: "images/floorplan-5-ravenclaw.jpg", desc: "", firstSeen: "",    updatedIn: [], history: "" },
      { id: "hospital-wing", label: "Hospital Wing", x: 64.03, y: 41.94, image: "images/floorplan-5-hospitalwing.jpg", desc: "", firstSeen: "",  updatedIn: [], history: "" },
      { id: "bell-towers",   label: "Bell Towers",   x: 43.58, y: 82.42, image: "", desc: "", firstSeen: "", updatedIn: [], history: "" }
    ]
  },
  {
    id: "floor-6", label: "6th", map: "images/floorplan-6.png",
    locations: [
      { id: "heads-office", label: "Head's Office", x: 54.07, y: 32.80, image: "images/floorplan-6-headsoffice.jpg", desc: "", firstSeen: "",  updatedIn: [], history: "" }
    ]
  }
];
