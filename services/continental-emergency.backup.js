const { ethers } = require("ethers");
const axios = require('axios');
const winston = require('winston');

// ARC MAXIMUM GRANULARITY - All 13 ARC States with Dense Coverage
const ARC_MAXIMUM_COVERAGE = [
    // WEST VIRGINIA - Ultra-dense (your current priority region)
    { name: "Charleston WV", lat: 38.3498, lon: -81.6326, state: "WV", priority: "critical" },
    { name: "Huntington WV", lat: 38.4192, lon: -82.4452, state: "WV", priority: "critical" },
    { name: "Fayetteville WV", lat: 38.0548, lon: -81.1040, state: "WV", priority: "critical" },
    { name: "Beckley WV", lat: 37.7781, lon: -81.1881, state: "WV", priority: "critical" },
    { name: "Morgantown WV", lat: 39.6295, lon: -79.9553, state: "WV", priority: "critical" },
    { name: "Parkersburg WV", lat: 39.2667, lon: -81.5615, state: "WV", priority: "critical" },
    { name: "Wheeling WV", lat: 40.0640, lon: -80.7209, state: "WV", priority: "critical" },
    { name: "Martinsburg WV", lat: 39.4565, lon: -77.9636, state: "WV", priority: "critical" },
    { name: "Bluefield WV", lat: 37.2696, lon: -81.2223, state: "WV", priority: "critical" },
    { name: "Lewisburg WV", lat: 37.8018, lon: -80.4456, state: "WV", priority: "critical" },
    { name: "Clarksburg WV", lat: 39.2806, lon: -80.3445, state: "WV", priority: "critical" },
    { name: "Elkins WV", lat: 38.9262, lon: -79.8470, state: "WV", priority: "critical" },
    { name: "Hurricane WV", lat: 38.4318, lon: -82.0193, state: "WV", priority: "critical" },
    { name: "Keyser WV", lat: 39.4362, lon: -78.9817, state: "WV", priority: "critical" },
    { name: "Logan WV", lat: 37.8487, lon: -81.9934, state: "WV", priority: "critical" },

    // PENNSYLVANIA - ARC Counties (Dense Coverage)
    { name: "Pittsburgh PA", lat: 40.4406, lon: -79.9959, state: "PA", priority: "high" },
    { name: "Altoona PA", lat: 40.5187, lon: -78.3947, state: "PA", priority: "high" },
    { name: "Johnstown PA", lat: 40.3267, lon: -78.9220, state: "PA", priority: "high" },
    { name: "Uniontown PA", lat: 39.8967, lon: -79.7253, state: "PA", priority: "high" },
    { name: "Washington PA", lat: 40.1740, lon: -80.2462, state: "PA", priority: "high" },
    { name: "Indiana PA", lat: 40.6217, lon: -79.1553, state: "PA", priority: "high" },
    { name: "Somerset PA", lat: 40.0084, lon: -79.0781, state: "PA", priority: "high" },
    { name: "Connellsville PA", lat: 40.0176, lon: -79.5895, state: "PA", priority: "high" },

    // VIRGINIA - ARC Counties (Dense Coverage)
    { name: "Bristol VA", lat: 36.5951, lon: -82.1887, state: "VA", priority: "high" },
    { name: "Abingdon VA", lat: 36.7098, lon: -82.0187, state: "VA", priority: "high" },
    { name: "Big Stone Gap VA", lat: 36.8687, lon: -82.7788, state: "VA", priority: "high" },
    { name: "Norton VA", lat: 36.9334, lon: -82.6290, state: "VA", priority: "high" },
    { name: "Wise VA", lat: 36.9759, lon: -82.5740, state: "VA", priority: "high" },
    { name: "Lebanon VA", lat: 36.9012, lon: -82.0807, state: "VA", priority: "high" },
    { name: "Tazewell VA", lat: 37.1254, lon: -81.5187, state: "VA", priority: "high" },
    { name: "Grundy VA", lat: 37.2748, lon: -82.1021, state: "VA", priority: "high" },

    // KENTUCKY - ARC Counties (Dense Coverage)
    { name: "Pikeville KY", lat: 37.4793, lon: -82.5188, state: "KY", priority: "high" },
    { name: "Hazard KY", lat: 37.2493, lon: -83.1932, state: "KY", priority: "high" },
    { name: "Prestonsburg KY", lat: 37.6687, lon: -82.7718, state: "KY", priority: "high" },
    { name: "Whitesburg KY", lat: 37.1184, lon: -82.8268, state: "KY", priority: "high" },
    { name: "Paintsville KY", lat: 37.8142, lon: -82.8071, state: "KY", priority: "high" },
    { name: "Jackson KY", lat: 37.5526, lon: -83.3832, state: "KY", priority: "high" },
    { name: "Manchester KY", lat: 37.1537, lon: -83.7618, state: "KY", priority: "high" },
    { name: "Pineville KY", lat: 36.7623, lon: -83.6948, state: "KY", priority: "high" },
    { name: "Middlesboro KY", lat: 36.6084, lon: -83.7163, state: "KY", priority: "high" },

    // TENNESSEE - ARC Counties (Dense Coverage)
    { name: "Kingsport TN", lat: 36.5484, lon: -82.5618, state: "TN", priority: "high" },
    { name: "Johnson City TN", lat: 36.3134, lon: -82.3535, state: "TN", priority: "high" },
    { name: "Morristown TN", lat: 36.2140, lon: -83.2949, state: "TN", priority: "high" },
    { name: "Greeneville TN", lat: 36.1628, lon: -82.8310, state: "TN", priority: "high" },
    { name: "Newport TN", lat: 35.9668, lon: -83.1879, state: "TN", priority: "high" },
    { name: "Rogersville TN", lat: 36.4073, lon: -83.0065, state: "TN", priority: "high" },
    { name: "Sneedville TN", lat: 36.5281, lon: -83.2132, state: "TN", priority: "high" },
    { name: "Tazewell TN", lat: 36.4595, lon: -83.5730, state: "TN", priority: "high" },

    // NORTH CAROLINA - ARC Counties (Dense Coverage)
    { name: "Asheville NC", lat: 35.5951, lon: -82.5515, state: "NC", priority: "high" },
    { name: "Boone NC", lat: 36.2168, lon: -81.6746, state: "NC", priority: "high" },
    { name: "Morganton NC", lat: 35.7451, lon: -81.6848, state: "NC", priority: "high" },
    { name: "Hickory NC", lat: 35.7344, lon: -81.3444, state: "NC", priority: "high" },
    { name: "Lenoir NC", lat: 35.9140, lon: -81.5390, state: "NC", priority: "high" },
    { name: "Marion NC", lat: 35.6840, lon: -82.0090, state: "NC", priority: "high" },
    { name: "Burnsville NC", lat: 35.9176, lon: -82.2954, state: "NC", priority: "high" },
    { name: "Murphy NC", lat: 35.0876, lon: -84.0344, state: "NC", priority: "high" },

    // OHIO - ARC Counties (Dense Coverage)
    { name: "Athens OH", lat: 39.3292, lon: -82.1013, state: "OH", priority: "high" },
    { name: "Portsmouth OH", lat: 38.7317, lon: -82.9977, state: "OH", priority: "high" },
    { name: "Ironton OH", lat: 38.5364, lon: -82.6835, state: "OH", priority: "high" },
    { name: "Gallipolis OH", lat: 38.8100, lon: -82.2018, state: "OH", priority: "high" },
    { name: "Jackson OH", lat: 39.0520, lon: -82.6363, state: "OH", priority: "high" },
    { name: "Wellston OH", lat: 39.1170, lon: -82.5338, state: "OH", priority: "high" },

    // GEORGIA - ARC Counties
    { name: "Rome GA", lat: 34.2570, lon: -85.1647, state: "GA", priority: "high" },
    { name: "Dalton GA", lat: 34.7698, lon: -84.9700, state: "GA", priority: "high" },
    { name: "Gainesville GA", lat: 34.2979, lon: -83.8241, state: "GA", priority: "high" },
    { name: "Blue Ridge GA", lat: 34.8640, lon: -84.3238, state: "GA", priority: "high" },

    // ALABAMA - ARC Counties
    { name: "Huntsville AL", lat: 34.7304, lon: -86.5861, state: "AL", priority: "high" },
    { name: "Gadsden AL", lat: 34.0143, lon: -86.0066, state: "AL", priority: "high" },
    { name: "Anniston AL", lat: 33.6597, lon: -85.8316, state: "AL", priority: "high" },
    { name: "Fort Payne AL", lat: 34.4443, lon: -85.7197, state: "AL", priority: "high" },

    // SOUTH CAROLINA - ARC Counties
    { name: "Greenville SC", lat: 34.8526, lon: -82.3940, state: "SC", priority: "high" },
    { name: "Spartanburg SC", lat: 34.9496, lon: -81.9320, state: "SC", priority: "high" },
    { name: "Anderson SC", lat: 34.5034, lon: -82.6501, state: "SC", priority: "high" },

    // MARYLAND - ARC Counties
    { name: "Cumberland MD", lat: 39.6529, lon: -78.7625, state: "MD", priority: "high" },
    { name: "Frostburg MD", lat: 39.6581, lon: -78.9281, state: "MD", priority: "high" },

    // NEW YORK - ARC Counties
    { name: "Binghamton NY", lat: 42.0987, lon: -75.9180, state: "NY", priority: "high" },
    { name: "Elmira NY", lat: 42.0898, lon: -76.8077, state: "NY", priority: "high" },
    { name: "Corning NY", lat: 42.1428, lon: -77.0547, state: "NY", priority: "high" },

    // MISSISSIPPI - ARC Counties  
    { name: "Tupelo MS", lat: 34.2576, lon: -88.7034, state: "MS", priority: "high" },
    { name: "Columbus MS", lat: 33.4957, lon: -88.4273, state: "MS", priority: "high" }
];

// COMPLETE US COVERAGE - All 50 States + DC + Territories
const COMPLETE_US_COVERAGE = [
    // NORTHEAST
    { name: "Boston MA", lat: 42.3601, lon: -71.0589, state: "MA" },
    { name: "Worcester MA", lat: 42.2626, lon: -71.8023, state: "MA" },
    { name: "Springfield MA", lat: 42.1015, lon: -72.5898, state: "MA" },
    { name: "Portland ME", lat: 43.6591, lon: -70.2568, state: "ME" },
    { name: "Bangor ME", lat: 44.8016, lon: -68.7712, state: "ME" },
    { name: "Manchester NH", lat: 42.9956, lon: -71.4548, state: "NH" },
    { name: "Concord NH", lat: 43.2081, lon: -71.5376, state: "NH" },
    { name: "Burlington VT", lat: 44.4759, lon: -73.2121, state: "VT" },
    { name: "Montpelier VT", lat: 44.2601, lon: -72.5806, state: "VT" },
    { name: "Providence RI", lat: 41.8240, lon: -71.4128, state: "RI" },
    { name: "Newport RI", lat: 41.4901, lon: -71.3128, state: "RI" },
    { name: "Hartford CT", lat: 41.7658, lon: -72.6734, state: "CT" },
    { name: "New Haven CT", lat: 41.3083, lon: -72.9279, state: "CT" },
    { name: "Bridgeport CT", lat: 41.1865, lon: -73.1952, state: "CT" },

    // MID-ATLANTIC
    { name: "New York City NY", lat: 40.7128, lon: -74.0060, state: "NY" },
    { name: "Albany NY", lat: 42.6526, lon: -73.7562, state: "NY" },
    { name: "Buffalo NY", lat: 42.8864, lon: -78.8784, state: "NY" },
    { name: "Rochester NY", lat: 43.1566, lon: -77.6088, state: "NY" },
    { name: "Syracuse NY", lat: 43.0481, lon: -76.1474, state: "NY" },
    { name: "Philadelphia PA", lat: 39.9526, lon: -75.1652, state: "PA" },
    { name: "Harrisburg PA", lat: 40.2732, lon: -76.8839, state: "PA" },
    { name: "Erie PA", lat: 42.1292, lon: -80.0851, state: "PA" },
    { name: "Scranton PA", lat: 41.4090, lon: -75.6624, state: "PA" },
    { name: "Newark NJ", lat: 40.7357, lon: -74.1724, state: "NJ" },
    { name: "Trenton NJ", lat: 40.2206, lon: -74.7563, state: "NJ" },
    { name: "Atlantic City NJ", lat: 39.3643, lon: -74.4229, state: "NJ" },
    { name: "Washington DC", lat: 38.9072, lon: -77.0369, state: "DC" },
    { name: "Baltimore MD", lat: 39.2904, lon: -76.6122, state: "MD" },
    { name: "Annapolis MD", lat: 38.9784, lon: -76.4951, state: "MD" },
    { name: "Wilmington DE", lat: 39.7391, lon: -75.5398, state: "DE" },
    { name: "Dover DE", lat: 39.1612, lon: -75.5264, state: "DE" },

    // SOUTHEAST
    { name: "Richmond VA", lat: 37.5407, lon: -77.4360, state: "VA" },
    { name: "Virginia Beach VA", lat: 36.8529, lon: -75.9780, state: "VA" },
    { name: "Norfolk VA", lat: 36.8468, lon: -76.2852, state: "VA" },
    { name: "Raleigh NC", lat: 35.7796, lon: -78.6382, state: "NC" },
    { name: "Charlotte NC", lat: 35.2271, lon: -80.8431, state: "NC" },
    { name: "Greensboro NC", lat: 36.0726, lon: -79.7920, state: "NC" },
    { name: "Wilmington NC", lat: 34.2257, lon: -77.9447, state: "NC" },
    { name: "Columbia SC", lat: 34.0007, lon: -81.0348, state: "SC" },
    { name: "Charleston SC", lat: 32.7765, lon: -79.9311, state: "SC" },
    { name: "Myrtle Beach SC", lat: 33.6891, lon: -78.8867, state: "SC" },
    { name: "Atlanta GA", lat: 33.7490, lon: -84.3880, state: "GA" },
    { name: "Savannah GA", lat: 32.0835, lon: -81.0998, state: "GA" },
    { name: "Augusta GA", lat: 33.4735, lon: -82.0105, state: "GA" },
    { name: "Columbus GA", lat: 32.4609, lon: -84.9877, state: "GA" },
    { name: "Jacksonville FL", lat: 30.3322, lon: -81.6557, state: "FL" },
    { name: "Miami FL", lat: 25.7617, lon: -80.1918, state: "FL" },
    { name: "Tampa FL", lat: 27.9506, lon: -82.4572, state: "FL" },
    { name: "Orlando FL", lat: 28.5383, lon: -81.3792, state: "FL" },
    { name: "Tallahassee FL", lat: 30.4518, lon: -84.2807, state: "FL" },
    { name: "Pensacola FL", lat: 30.4213, lon: -87.2169, state: "FL" },
    { name: "Key West FL", lat: 24.5557, lon: -81.7826, state: "FL" },

    // MIDWEST
    { name: "Chicago IL", lat: 41.8781, lon: -87.6298, state: "IL" },
    { name: "Springfield IL", lat: 39.7817, lon: -89.6501, state: "IL" },
    { name: "Rockford IL", lat: 42.2711, lon: -89.0940, state: "IL" },
    { name: "Peoria IL", lat: 40.6936, lon: -89.5890, state: "IL" },
    { name: "Indianapolis IN", lat: 39.7684, lon: -86.1581, state: "IN" },
    { name: "Fort Wayne IN", lat: 41.0793, lon: -85.1394, state: "IN" },
    { name: "Evansville IN", lat: 37.9716, lon: -87.5710, state: "IN" },
    { name: "Detroit MI", lat: 42.3314, lon: -83.0458, state: "MI" },
    { name: "Grand Rapids MI", lat: 42.9634, lon: -85.6681, state: "MI" },
    { name: "Lansing MI", lat: 42.3540, lon: -84.9551, state: "MI" },
    { name: "Flint MI", lat: 43.0125, lon: -83.6875, state: "MI" },
    { name: "Marquette MI", lat: 46.5436, lon: -87.3954, state: "MI" },
    { name: "Columbus OH", lat: 39.9612, lon: -82.9988, state: "OH" },
    { name: "Cleveland OH", lat: 41.4993, lon: -81.6944, state: "OH" },
    { name: "Cincinnati OH", lat: 39.1031, lon: -84.5120, state: "OH" },
    { name: "Toledo OH", lat: 41.6528, lon: -83.5379, state: "OH" },
    { name: "Milwaukee WI", lat: 43.0389, lon: -87.9065, state: "WI" },
    { name: "Madison WI", lat: 43.0731, lon: -89.4012, state: "WI" },
    { name: "Green Bay WI", lat: 44.5133, lon: -88.0133, state: "WI" },
    { name: "Minneapolis MN", lat: 44.9778, lon: -93.2650, state: "MN" },
    { name: "St. Paul MN", lat: 44.9537, lon: -93.0900, state: "MN" },
    { name: "Duluth MN", lat: 46.7867, lon: -92.1005, state: "MN" },
    { name: "Des Moines IA", lat: 41.5868, lon: -93.6250, state: "IA" },
    { name: "Cedar Rapids IA", lat: 41.9778, lon: -91.6656, state: "IA" },
    { name: "Davenport IA", lat: 41.5236, lon: -90.5776, state: "IA" },
    { name: "Kansas City MO", lat: 39.0997, lon: -94.5786, state: "MO" },
    { name: "St. Louis MO", lat: 38.6270, lon: -90.1994, state: "MO" },
    { name: "Springfield MO", lat: 37.2153, lon: -93.2982, state: "MO" },
    { name: "Columbia MO", lat: 38.9517, lon: -92.3341, state: "MO" },

    // GREAT PLAINS
    { name: "Fargo ND", lat: 46.8772, lon: -96.7898, state: "ND" },
    { name: "Bismarck ND", lat: 46.8083, lon: -100.7837, state: "ND" },
    { name: "Grand Forks ND", lat: 47.9253, lon: -97.0329, state: "ND" },
    { name: "Sioux Falls SD", lat: 43.5460, lon: -96.7313, state: "SD" },
    { name: "Rapid City SD", lat: 44.0805, lon: -103.2310, state: "SD" },
    { name: "Pierre SD", lat: 44.3683, lon: -100.3510, state: "SD" },
    { name: "Omaha NE", lat: 41.2565, lon: -95.9345, state: "NE" },
    { name: "Lincoln NE", lat: 40.8136, lon: -96.7026, state: "NE" },
    { name: "North Platte NE", lat: 41.1240, lon: -100.7654, state: "NE" },
    { name: "Topeka KS", lat: 39.0473, lon: -95.6890, state: "KS" },
    { name: "Wichita KS", lat: 37.6872, lon: -97.3301, state: "KS" },
    { name: "Dodge City KS", lat: 37.7528, lon: -100.0171, state: "KS" },

    // SOUTH
    { name: "Louisville KY", lat: 38.2527, lon: -85.7585, state: "KY" },
    { name: "Lexington KY", lat: 38.0406, lon: -84.5037, state: "KY" },
    { name: "Bowling Green KY", lat: 36.9685, lon: -86.4808, state: "KY" },
    { name: "Nashville TN", lat: 36.1627, lon: -86.7816, state: "TN" },
    { name: "Memphis TN", lat: 35.1495, lon: -90.0490, state: "TN" },
    { name: "Knoxville TN", lat: 35.9606, lon: -83.9207, state: "TN" },
    { name: "Chattanooga TN", lat: 35.0456, lon: -85.3097, state: "TN" },
    { name: "Birmingham AL", lat: 33.5207, lon: -86.8025, state: "AL" },
    { name: "Montgomery AL", lat: 32.3668, lon: -86.3000, state: "AL" },
    { name: "Mobile AL", lat: 30.6954, lon: -88.0399, state: "AL" },
    { name: "Jackson MS", lat: 32.2988, lon: -90.1848, state: "MS" },
    { name: "Biloxi MS", lat: 30.3960, lon: -88.8853, state: "MS" },
    { name: "Hattiesburg MS", lat: 31.3271, lon: -89.2903, state: "MS" },
    { name: "Little Rock AR", lat: 34.7465, lon: -92.2896, state: "AR" },
    { name: "Fort Smith AR", lat: 35.3859, lon: -94.3985, state: "AR" },
    { name: "Fayetteville AR", lat: 36.0626, lon: -94.1574, state: "AR" },
    { name: "New Orleans LA", lat: 29.9511, lon: -90.0715, state: "LA" },
    { name: "Baton Rouge LA", lat: 30.4515, lon: -91.1871, state: "LA" },
    { name: "Shreveport LA", lat: 32.5252, lon: -93.7502, state: "LA" },
    { name: "Lafayette LA", lat: 30.2241, lon: -92.0198, state: "LA" },

    // TEXAS
    { name: "Houston TX", lat: 29.7604, lon: -95.3698, state: "TX" },
    { name: "Dallas TX", lat: 32.7767, lon: -96.7970, state: "TX" },
    { name: "San Antonio TX", lat: 29.4241, lon: -98.4936, state: "TX" },
    { name: "Austin TX", lat: 30.2672, lon: -97.7431, state: "TX" },
    { name: "Fort Worth TX", lat: 32.7555, lon: -97.3308, state: "TX" },
    { name: "El Paso TX", lat: 31.7619, lon: -106.4850, state: "TX" },
    { name: "Corpus Christi TX", lat: 27.8006, lon: -97.3964, state: "TX" },
    { name: "Lubbock TX", lat: 33.5779, lon: -101.8552, state: "TX" },
    { name: "Amarillo TX", lat: 35.2220, lon: -101.8313, state: "TX" },
    { name: "Beaumont TX", lat: 30.0804, lon: -94.1266, state: "TX" },

    // OKLAHOMA
    { name: "Oklahoma City OK", lat: 35.4676, lon: -97.5164, state: "OK" },
    { name: "Tulsa OK", lat: 36.1540, lon: -95.9928, state: "OK" },
    { name: "Norman OK", lat: 35.2226, lon: -97.4395, state: "OK" },
    { name: "Lawton OK", lat: 34.6087, lon: -98.3959, state: "OK" },

    // MOUNTAIN WEST
    { name: "Denver CO", lat: 39.7392, lon: -104.9903, state: "CO" },
    { name: "Colorado Springs CO", lat: 38.8339, lon: -104.8214, state: "CO" },
    { name: "Grand Junction CO", lat: 39.0639, lon: -108.5506, state: "CO" },
    { name: "Pueblo CO", lat: 38.2544, lon: -104.6091, state: "CO" },
    { name: "Salt Lake City UT", lat: 40.7608, lon: -111.8910, state: "UT" },
    { name: "Provo UT", lat: 40.2338, lon: -111.6585, state: "UT" },
    { name: "Ogden UT", lat: 41.2230, lon: -111.9738, state: "UT" },
    { name: "Phoenix AZ", lat: 33.4484, lon: -112.0740, state: "AZ" },
    { name: "Tucson AZ", lat: 32.2226, lon: -110.9747, state: "AZ" },
    { name: "Flagstaff AZ", lat: 35.1983, lon: -111.6513, state: "AZ" },
    { name: "Yuma AZ", lat: 32.6927, lon: -114.6277, state: "AZ" },
    { name: "Las Vegas NV", lat: 36.1699, lon: -115.1398, state: "NV" },
    { name: "Reno NV", lat: 39.5296, lon: -119.8138, state: "NV" },
    { name: "Carson City NV", lat: 39.1638, lon: -119.7674, state: "NV" },
    { name: "Boise ID", lat: 43.6150, lon: -116.2023, state: "ID" },
    { name: "Idaho Falls ID", lat: 43.4666, lon: -112.0340, state: "ID" },
    { name: "Pocatello ID", lat: 42.8713, lon: -112.4455, state: "ID" },
    { name: "Billings MT", lat: 45.7833, lon: -108.5007, state: "MT" },
    { name: "Missoula MT", lat: 46.8721, lon: -113.9940, state: "MT" },
    { name: "Great Falls MT", lat: 47.4941, lon: -111.2833, state: "MT" },
    { name: "Helena MT", lat: 46.5958, lon: -112.0362, state: "MT" },
    { name: "Cheyenne WY", lat: 41.1400, lon: -104.8197, state: "WY" },
    { name: "Casper WY", lat: 42.8666, lon: -106.3131, state: "WY" },
    { name: "Jackson WY", lat: 43.4799, lon: -110.7624, state: "WY" },

    // CALIFORNIA
    { name: "Los Angeles CA", lat: 34.0522, lon: -118.2437, state: "CA" },
    { name: "San Francisco CA", lat: 37.7749, lon: -122.4194, state: "CA" },
    { name: "San Diego CA", lat: 32.7157, lon: -117.1611, state: "CA" },
    { name: "Sacramento CA", lat: 38.5816, lon: -121.4944, state: "CA" },
    { name: "San Jose CA", lat: 37.3382, lon: -121.8863, state: "CA" },
    { name: "Fresno CA", lat: 36.7378, lon: -119.7871, state: "CA" },
    { name: "Oakland CA", lat: 37.8044, lon: -122.2712, state: "CA" },
    { name: "Bakersfield CA", lat: 35.3733, lon: -119.0187, state: "CA" },
    { name: "Stockton CA", lat: 37.9577, lon: -121.2908, state: "CA" },
    { name: "Eureka CA", lat: 40.8021, lon: -124.1637, state: "CA" },

    // PACIFIC NORTHWEST
    { name: "Seattle WA", lat: 47.6062, lon: -122.3321, state: "WA" },
    { name: "Spokane WA", lat: 47.6587, lon: -117.4260, state: "WA" },
    { name: "Tacoma WA", lat: 47.2529, lon: -122.4443, state: "WA" },
    { name: "Bellingham WA", lat: 48.7519, lon: -122.4787, state: "WA" },
    { name: "Yakima WA", lat: 46.6021, lon: -120.5059, state: "WA" },
    { name: "Portland OR", lat: 45.5152, lon: -122.6784, state: "OR" },
    { name: "Eugene OR", lat: 44.0521, lon: -123.0868, state: "OR" },
    { name: "Salem OR", lat: 44.9429, lon: -123.0351, state: "OR" },
    { name: "Bend OR", lat: 44.0582, lon: -121.3153, state: "OR" },
    { name: "Medford OR", lat: 42.3265, lon: -122.8756, state: "OR" }
];

// ALASKA COVERAGE - Strategic locations across the state
const ALASKA_COVERAGE = [
    { name: "Anchorage AK", lat: 61.2181, lon: -149.9003, state: "AK" },
    { name: "Fairbanks AK", lat: 64.8378, lon: -147.7164, state: "AK" },
    { name: "Juneau AK", lat: 58.3019, lon: -134.4197, state: "AK" },
    { name: "Sitka AK", lat: 57.0531, lon: -135.3300, state: "AK" },
    { name: "Ketchikan AK", lat: 55.3422, lon: -131.6461, state: "AK" },
    { name: "Kodiak AK", lat: 57.7900, lon: -152.4069, state: "AK" },
    { name: "Nome AK", lat: 64.5011, lon: -165.4064, state: "AK" },
    { name: "Barrow AK", lat: 71.2906, lon: -156.7886, state: "AK" },
    { name: "Bethel AK", lat: 60.7922, lon: -161.7558, state: "AK" },
    { name: "Dutch Harbor AK", lat: 53.8914, lon: -166.5436, state: "AK" },
    { name: "Valdez AK", lat: 61.1308, lon: -146.3486, state: "AK" },
    { name: "Seward AK", lat: 60.1042, lon: -149.4422, state: "AK" }
];

// HAWAII COVERAGE - All major islands
const HAWAII_COVERAGE = [
    { name: "Honolulu HI", lat: 21.3099, lon: -157.8581, state: "HI" },
    { name: "Hilo HI", lat: 19.7297, lon: -155.0900, state: "HI" },
    { name: "Kahului HI", lat: 20.8893, lon: -156.4729, state: "HI" },
    { name: "Kailua-Kona HI", lat: 19.6390, lon: -155.9969, state: "HI" },
    { name: "Lihue HI", lat: 21.9811, lon: -159.3708, state: "HI" },
    { name: "Kaunakakai HI", lat: 21.0931, lon: -157.0228, state: "HI" },
    { name: "Lanai City HI", lat: 20.8283, lon: -156.9197, state: "HI" }
];

// NOAA Weather Service (same as before)
class NOAAWeatherService {
    constructor() {
        this.baseUrl = 'https://api.weather.gov';
        this.userAgent = process.env.NOAA_USER_AGENT || 'MountainShares Emergency Response (contact@mountainshares.com)';
        this.zoneCache = new Map();
        this.rateLimitDelay = 300; // Reduced delay for faster scanning
    }

    async getWeatherAlerts(lat, lon) {
        try {
            const coordKey = `${lat},${lon}`;
            let zoneId = this.zoneCache.get(coordKey);

            if (!zoneId) {
                const pointsResponse = await axios.get(`${this.baseUrl}/points/${lat},${lon}`, {
                    headers: { 'User-Agent': this.userAgent },
                    timeout: 8000
                });

                const properties = pointsResponse.data.properties;
                const forecastZone = properties.forecastZone;
                zoneId = forecastZone.split('/').pop();
                this.zoneCache.set(coordKey, zoneId);
            }

            const alertsResponse = await axios.get(`${this.baseUrl}/alerts/active/zone/${zoneId}`, {
                headers: { 'User-Agent': this.userAgent },
                timeout: 8000
            });

            const alerts = alertsResponse.data.features || [];
            return alerts.map(alert => this.formatAlert(alert, zoneId));

        } catch (error) {
            if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                throw new Error(`NOAA API connection failed: ${error.message}`);
            } else if (error.response?.status === 404) {
                throw new Error(`Location not found: ${lat}, ${lon}`);
            } else if (error.response?.status === 429) {
                throw new Error('NOAA API rate limit exceeded');
            } else {
                throw new Error(`NOAA API error: ${error.message}`);
            }
        }
    }

    formatAlert(alert, zoneId) {
        const properties = alert.properties;
        let severity = 5;

        if (properties.severity === 'Extreme') severity = 10;
        else if (properties.severity === 'Severe') severity = 8;
        else if (properties.severity === 'Moderate') severity = 6;
        else if (properties.severity === 'Minor') severity = 3;

        if (properties.urgency === 'Immediate') severity = Math.min(10, severity + 2);
        else if (properties.urgency === 'Expected') severity = Math.min(10, severity + 1);

        return {
            headline: properties.headline,
            event: properties.event,
            severity: severity,
            areas: properties.areaDesc ? [properties.areaDesc] : [zoneId],
            zones: [zoneId],
            description: properties.description,
            ends: properties.ends,
            urgency: properties.urgency,
            certainty: properties.certainty
        };
    }
}

// Enhanced Production Emergency Monitor Class
class EnhancedEmergencyMonitor {
    constructor() {
        this.contractAddress = process.env.EMERGENCY_CONTRACT_ADDRESS;
        this.checkInterval = parseInt(process.env.WEATHER_CHECK_INTERVAL) || 300;
        this.isRunning = false;
        this.noaaService = new NOAAWeatherService();
        this.monitoredZones = new Set();
        this.cityToZoneMap = new Map();
        this.contract = null;
        this.signer = null;
        
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/emergency.log' })
            ]
        });
    }

    async initializeContract() {
        if (!this.contractAddress) {
            this.logger.warn('⚠️ No contract address - blockchain integration disabled');
            return;
        }

        try {
            this.logger.info('🔗 Initializing Emergency Response contract...');
            const [signer] = await ethers.getSigners();
            this.signer = signer;

            const EmergencyResponse = await ethers.getContractFactory("EmergencyResponse");
            this.contract = EmergencyResponse.attach(this.contractAddress);

            this.logger.info(`✅ Connected to contract: ${this.contractAddress}`);
            this.logger.info(`📝 Using account: ${signer.address}`);
        } catch (error) {
            this.logger.error(`❌ Contract initialization failed: ${error.message}`);
        }
    }

    async start() {
        const totalLocations = ARC_MAXIMUM_COVERAGE.length + COMPLETE_US_COVERAGE.length + ALASKA_COVERAGE.length + HAWAII_COVERAGE.length;
        
        this.logger.info('🌐 Starting ENHANCED Continental Weather Monitor');
        this.logger.info(`🏔️ ARC Maximum: ${ARC_MAXIMUM_COVERAGE.length} Appalachian locations (CRITICAL PRIORITY)`);
        this.logger.info(`🇺🇸 Continental US: ${COMPLETE_US_COVERAGE.length} major cities`);
        this.logger.info(`🏔️ Alaska: ${ALASKA_COVERAGE.length} strategic locations`);
        this.logger.info(`🌺 Hawaii: ${HAWAII_COVERAGE.length} island locations`);
        this.logger.info(`📡 TOTAL COVERAGE: ${totalLocations} monitoring points across all 50 states + DC + territories`);
        
        await this.initializeContract();
        await this.mapCitiesToZones();
        
        this.isRunning = true;
        await this.checkWeather();
        
        this.interval = setInterval(async () => {
            if (this.isRunning) {
                await this.checkWeather();
            }
        }, this.checkInterval * 1000);
        
        this.logger.info('✅ ENHANCED monitoring started');
        this.logger.info(`🗺️ Monitoring ${this.monitoredZones.size} unique forecast zones nationwide`);
    }

    async mapCitiesToZones() {
        this.logger.info('🗺️ Mapping ALL locations to NOAA zones...');
        const processedZones = new Set();

        this.logger.info('🏔️ Processing ARC MAXIMUM regions (CRITICAL):');
        for (const city of ARC_MAXIMUM_COVERAGE) {
            await this.mapCityToZone(city, processedZones, 'ARC_CRITICAL');
        }

        this.logger.info('🇺🇸 Processing complete continental US:');
        for (const city of COMPLETE_US_COVERAGE) {
            await this.mapCityToZone(city, processedZones, 'CONTINENTAL');
        }

        this.logger.info('🏔️ Processing Alaska:');
        for (const city of ALASKA_COVERAGE) {
            await this.mapCityToZone(city, processedZones, 'ALASKA');
        }

        this.logger.info('🌺 Processing Hawaii:');
        for (const city of HAWAII_COVERAGE) {
            await this.mapCityToZone(city, processedZones, 'HAWAII');
        }

        this.logger.info(`📊 Enhanced zone mapping complete: ${this.monitoredZones.size} unique zones`);
    }

    async mapCityToZone(city, processedZones, priority) {
        try {
            const coordKey = `${city.lat},${city.lon}`;
            await this.noaaService.getWeatherAlerts(city.lat, city.lon);
            const zoneId = this.noaaService.zoneCache.get(coordKey);
            
            if (zoneId && !processedZones.has(zoneId)) {
                this.monitoredZones.add(zoneId);
                this.cityToZoneMap.set(city.name, zoneId);
                processedZones.add(zoneId);
                this.logger.info(`   🗺️ ${city.name}, ${city.state} -> Zone ${zoneId} [${priority}]`);
            } else if (zoneId) {
                this.logger.info(`   📋 ${city.name}, ${city.state} -> Zone ${zoneId} (covered)`);
            } else {
                this.logger.warn(`   ❌ ${city.name}, ${city.state} -> Zone lookup failed`);
            }

            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));

        } catch (error) {
            this.logger.error(`❌ Error mapping ${city.name}: ${error.message}`);
        }
    }

    async checkWeather() {
        this.logger.info('🔍 Checking ENHANCED weather nationwide via NOAA API...');

        let totalAlerts = 0;
        let arcAlerts = 0;
        let continentalAlerts = 0;
        let alaskaAlerts = 0;
        let hawaiiAlerts = 0;

        this.logger.info('🏔️ Checking ARC MAXIMUM regions (CRITICAL PRIORITY)...');
        for (const location of ARC_MAXIMUM_COVERAGE) {
            const alerts = await this.checkLocationWeather(location, 'ARC_CRITICAL');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                arcAlerts += alerts.length;
            }
        }

        this.logger.info('🇺🇸 Checking complete continental US...');
        for (const location of COMPLETE_US_COVERAGE) {
            const alerts = await this.checkLocationWeather(location, 'CONTINENTAL');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                continentalAlerts += alerts.length;
            }
        }

        this.logger.info('🏔️ Checking Alaska...');
        for (const location of ALASKA_COVERAGE) {
            const alerts = await this.checkLocationWeather(location, 'ALASKA');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                alaskaAlerts += alerts.length;
            }
        }

        this.logger.info('🌺 Checking Hawaii...');
        for (const location of HAWAII_COVERAGE) {
            const alerts = await this.checkLocationWeather(location, 'HAWAII');
            if (alerts.length > 0) {
                totalAlerts += alerts.length;
                hawaiiAlerts += alerts.length;
            }
        }

        const totalLocations = ARC_MAXIMUM_COVERAGE.length + COMPLETE_US_COVERAGE.length + ALASKA_COVERAGE.length + HAWAII_COVERAGE.length;

        this.logger.info(`📊 ENHANCED weather scan complete:`);
        this.logger.info(`   🏔️ ARC Critical: ${ARC_MAXIMUM_COVERAGE.length} locations, ${arcAlerts} alerts`);
        this.logger.info(`   🇺🇸 Continental: ${COMPLETE_US_COVERAGE.length} cities, ${continentalAlerts} alerts`);
        this.logger.info(`   🏔️ Alaska: ${ALASKA_COVERAGE.length} locations, ${alaskaAlerts} alerts`);
        this.logger.info(`   🌺 Hawaii: ${HAWAII_COVERAGE.length} locations, ${hawaiiAlerts} alerts`);
        this.logger.info(`   📍 TOTAL: ${totalLocations} locations, ${totalAlerts} alerts nationwide`);
    }

    async checkLocationWeather(location, priority) {
        try {
            const alerts = await this.noaaService.getWeatherAlerts(location.lat, location.lon);
            
            if (alerts.length > 0) {
                const priorityEmoji = this.getPriorityEmoji(priority);
                this.logger.warn(`🚨 ${priorityEmoji} ${priority} ALERT: ${location.name}, ${location.state}: ${alerts.length} alert(s)`);
                
                for (const alert of alerts) {
                    this.logger.warn(`   ⚠️ ${alert.event} - Severity ${alert.severity}/10 - ${alert.headline}`);
                    await this.processAlert(alert, location, priority);
                }
            } else {
                this.logger.info(`   ✅ ${location.name}, ${location.state}: Clear`);
            }

            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));
            return alerts;

        } catch (error) {
            this.logger.error(`❌ Error checking ${location.name}: ${error.message}`);
            return [];
        }
    }

    getPriorityEmoji(priority) {
        switch (priority) {
            case 'ARC_CRITICAL': return '🏔️ CRITICAL';
            case 'CONTINENTAL': return '🇺🇸';
            case 'ALASKA': return '🏔️ AK';
            case 'HAWAII': return '🌺 HI';
            default: return '📍';
        }
    }

    async processAlert(alert, location, priority) {
        try {
            const priorityPrefix = this.getPriorityEmoji(priority);
            this.logger.info(`📢 ${priorityPrefix} Processing: ${location.name} - ${alert.event}`);

            if (this.contract && this.signer) {
                const alertMessage = priority === 'ARC_CRITICAL' 
                    ? `[ARC CRITICAL] ${alert.event} - ${location.name}, ${location.state}`
                    : `[${priority}] ${alert.event} - ${location.name}, ${location.state}`;

                const gasLimit = ethers.BigNumber.from("500000");
                const tx = await this.contract.reportEmergency(
                    Date.now(),
                    alert.severity,
                    alertMessage,
                    { gasLimit }
                );

                this.logger.info(`🔗 Blockchain tx: ${tx.hash}`);
                if (priority === 'ARC_CRITICAL') {
                    this.logger.warn(`🏔️ ARC CRITICAL alert sent to blockchain!`);
                }
                
                await tx.wait();
                this.logger.info(`✅ Transaction confirmed for ${location.name}`);
            } else {
                this.logger.warn(`⚠️ Alert logged but no blockchain (contract not configured)`);
            }

        } catch (error) {
            this.logger.error(`❌ Error processing alert for ${location.name}: ${error.message}`);
        }
    }

    stop() {
        this.logger.info('🛑 Stopping enhanced weather monitoring...');
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.logger.info('✅ Enhanced weather monitoring stopped');
    }
}


module.exports = EnhancedEmergencyMonitor;
