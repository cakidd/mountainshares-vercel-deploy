const { ethers } = require("ethers");
        this.phaseManager = new PhaseManager();
const PhaseManager = require('./phase-system/phase-manager');
        this.phaseManager = new PhaseManager();
const axios = require('axios');
        this.phaseManager = new PhaseManager();
const winston = require('winston');
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// ARC MAXIMUM GRANULARITY - All 13 ARC States with Dense Coverage
        this.phaseManager = new PhaseManager();
const ARC_MAXIMUM_COVERAGE = [
        this.phaseManager = new PhaseManager();
    // WEST VIRGINIA - Ultra-dense (your current priority region)
        this.phaseManager = new PhaseManager();
    { name: "Charleston WV", lat: 38.3498, lon: -81.6326, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Huntington WV", lat: 38.4192, lon: -82.4452, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Fayetteville WV", lat: 38.0548, lon: -81.1040, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Beckley WV", lat: 37.7781, lon: -81.1881, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Morgantown WV", lat: 39.6295, lon: -79.9553, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Parkersburg WV", lat: 39.2667, lon: -81.5615, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Wheeling WV", lat: 40.0640, lon: -80.7209, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Martinsburg WV", lat: 39.4565, lon: -77.9636, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Bluefield WV", lat: 37.2696, lon: -81.2223, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Lewisburg WV", lat: 37.8018, lon: -80.4456, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Clarksburg WV", lat: 39.2806, lon: -80.3445, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Elkins WV", lat: 38.9262, lon: -79.8470, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Hurricane WV", lat: 38.4318, lon: -82.0193, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Keyser WV", lat: 39.4362, lon: -78.9817, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();
    { name: "Logan WV", lat: 37.8487, lon: -81.9934, state: "WV", priority: "critical" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // PENNSYLVANIA - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Pittsburgh PA", lat: 40.4406, lon: -79.9959, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Altoona PA", lat: 40.5187, lon: -78.3947, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Johnstown PA", lat: 40.3267, lon: -78.9220, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Uniontown PA", lat: 39.8967, lon: -79.7253, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Washington PA", lat: 40.1740, lon: -80.2462, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Indiana PA", lat: 40.6217, lon: -79.1553, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Somerset PA", lat: 40.0084, lon: -79.0781, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Connellsville PA", lat: 40.0176, lon: -79.5895, state: "PA", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // VIRGINIA - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Bristol VA", lat: 36.5951, lon: -82.1887, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Abingdon VA", lat: 36.7098, lon: -82.0187, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Big Stone Gap VA", lat: 36.8687, lon: -82.7788, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Norton VA", lat: 36.9334, lon: -82.6290, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Wise VA", lat: 36.9759, lon: -82.5740, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Lebanon VA", lat: 36.9012, lon: -82.0807, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Tazewell VA", lat: 37.1254, lon: -81.5187, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Grundy VA", lat: 37.2748, lon: -82.1021, state: "VA", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // KENTUCKY - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Pikeville KY", lat: 37.4793, lon: -82.5188, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Hazard KY", lat: 37.2493, lon: -83.1932, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Prestonsburg KY", lat: 37.6687, lon: -82.7718, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Whitesburg KY", lat: 37.1184, lon: -82.8268, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Paintsville KY", lat: 37.8142, lon: -82.8071, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Jackson KY", lat: 37.5526, lon: -83.3832, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Manchester KY", lat: 37.1537, lon: -83.7618, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Pineville KY", lat: 36.7623, lon: -83.6948, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Middlesboro KY", lat: 36.6084, lon: -83.7163, state: "KY", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // TENNESSEE - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Kingsport TN", lat: 36.5484, lon: -82.5618, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Johnson City TN", lat: 36.3134, lon: -82.3535, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Morristown TN", lat: 36.2140, lon: -83.2949, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Greeneville TN", lat: 36.1628, lon: -82.8310, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Newport TN", lat: 35.9668, lon: -83.1879, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Rogersville TN", lat: 36.4073, lon: -83.0065, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Sneedville TN", lat: 36.5281, lon: -83.2132, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Tazewell TN", lat: 36.4595, lon: -83.5730, state: "TN", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // NORTH CAROLINA - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Asheville NC", lat: 35.5951, lon: -82.5515, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Boone NC", lat: 36.2168, lon: -81.6746, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Morganton NC", lat: 35.7451, lon: -81.6848, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Hickory NC", lat: 35.7344, lon: -81.3444, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Lenoir NC", lat: 35.9140, lon: -81.5390, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Marion NC", lat: 35.6840, lon: -82.0090, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Burnsville NC", lat: 35.9176, lon: -82.2954, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Murphy NC", lat: 35.0876, lon: -84.0344, state: "NC", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // OHIO - ARC Counties (Dense Coverage)
        this.phaseManager = new PhaseManager();
    { name: "Athens OH", lat: 39.3292, lon: -82.1013, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Portsmouth OH", lat: 38.7317, lon: -82.9977, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Ironton OH", lat: 38.5364, lon: -82.6835, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Gallipolis OH", lat: 38.8100, lon: -82.2018, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Jackson OH", lat: 39.0520, lon: -82.6363, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Wellston OH", lat: 39.1170, lon: -82.5338, state: "OH", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // GEORGIA - ARC Counties
        this.phaseManager = new PhaseManager();
    { name: "Rome GA", lat: 34.2570, lon: -85.1647, state: "GA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Dalton GA", lat: 34.7698, lon: -84.9700, state: "GA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Gainesville GA", lat: 34.2979, lon: -83.8241, state: "GA", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Blue Ridge GA", lat: 34.8640, lon: -84.3238, state: "GA", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // ALABAMA - ARC Counties
        this.phaseManager = new PhaseManager();
    { name: "Huntsville AL", lat: 34.7304, lon: -86.5861, state: "AL", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Gadsden AL", lat: 34.0143, lon: -86.0066, state: "AL", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Anniston AL", lat: 33.6597, lon: -85.8316, state: "AL", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Fort Payne AL", lat: 34.4443, lon: -85.7197, state: "AL", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // SOUTH CAROLINA - ARC Counties
        this.phaseManager = new PhaseManager();
    { name: "Greenville SC", lat: 34.8526, lon: -82.3940, state: "SC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Spartanburg SC", lat: 34.9496, lon: -81.9320, state: "SC", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Anderson SC", lat: 34.5034, lon: -82.6501, state: "SC", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // MARYLAND - ARC Counties
        this.phaseManager = new PhaseManager();
    { name: "Cumberland MD", lat: 39.6529, lon: -78.7625, state: "MD", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Frostburg MD", lat: 39.6581, lon: -78.9281, state: "MD", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // NEW YORK - ARC Counties
        this.phaseManager = new PhaseManager();
    { name: "Binghamton NY", lat: 42.0987, lon: -75.9180, state: "NY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Elmira NY", lat: 42.0898, lon: -76.8077, state: "NY", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Corning NY", lat: 42.1428, lon: -77.0547, state: "NY", priority: "high" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // MISSISSIPPI - ARC Counties  
        this.phaseManager = new PhaseManager();
    { name: "Tupelo MS", lat: 34.2576, lon: -88.7034, state: "MS", priority: "high" },
        this.phaseManager = new PhaseManager();
    { name: "Columbus MS", lat: 33.4957, lon: -88.4273, state: "MS", priority: "high" }
        this.phaseManager = new PhaseManager();
];
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// COMPLETE US COVERAGE - All 50 States + DC + Territories
        this.phaseManager = new PhaseManager();
const COMPLETE_US_COVERAGE = [
        this.phaseManager = new PhaseManager();
    // NORTHEAST
        this.phaseManager = new PhaseManager();
    { name: "Boston MA", lat: 42.3601, lon: -71.0589, state: "MA" },
        this.phaseManager = new PhaseManager();
    { name: "Worcester MA", lat: 42.2626, lon: -71.8023, state: "MA" },
        this.phaseManager = new PhaseManager();
    { name: "Springfield MA", lat: 42.1015, lon: -72.5898, state: "MA" },
        this.phaseManager = new PhaseManager();
    { name: "Portland ME", lat: 43.6591, lon: -70.2568, state: "ME" },
        this.phaseManager = new PhaseManager();
    { name: "Bangor ME", lat: 44.8016, lon: -68.7712, state: "ME" },
        this.phaseManager = new PhaseManager();
    { name: "Manchester NH", lat: 42.9956, lon: -71.4548, state: "NH" },
        this.phaseManager = new PhaseManager();
    { name: "Concord NH", lat: 43.2081, lon: -71.5376, state: "NH" },
        this.phaseManager = new PhaseManager();
    { name: "Burlington VT", lat: 44.4759, lon: -73.2121, state: "VT" },
        this.phaseManager = new PhaseManager();
    { name: "Montpelier VT", lat: 44.2601, lon: -72.5806, state: "VT" },
        this.phaseManager = new PhaseManager();
    { name: "Providence RI", lat: 41.8240, lon: -71.4128, state: "RI" },
        this.phaseManager = new PhaseManager();
    { name: "Newport RI", lat: 41.4901, lon: -71.3128, state: "RI" },
        this.phaseManager = new PhaseManager();
    { name: "Hartford CT", lat: 41.7658, lon: -72.6734, state: "CT" },
        this.phaseManager = new PhaseManager();
    { name: "New Haven CT", lat: 41.3083, lon: -72.9279, state: "CT" },
        this.phaseManager = new PhaseManager();
    { name: "Bridgeport CT", lat: 41.1865, lon: -73.1952, state: "CT" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // MID-ATLANTIC
        this.phaseManager = new PhaseManager();
    { name: "New York City NY", lat: 40.7128, lon: -74.0060, state: "NY" },
        this.phaseManager = new PhaseManager();
    { name: "Albany NY", lat: 42.6526, lon: -73.7562, state: "NY" },
        this.phaseManager = new PhaseManager();
    { name: "Buffalo NY", lat: 42.8864, lon: -78.8784, state: "NY" },
        this.phaseManager = new PhaseManager();
    { name: "Rochester NY", lat: 43.1566, lon: -77.6088, state: "NY" },
        this.phaseManager = new PhaseManager();
    { name: "Syracuse NY", lat: 43.0481, lon: -76.1474, state: "NY" },
        this.phaseManager = new PhaseManager();
    { name: "Philadelphia PA", lat: 39.9526, lon: -75.1652, state: "PA" },
        this.phaseManager = new PhaseManager();
    { name: "Harrisburg PA", lat: 40.2732, lon: -76.8839, state: "PA" },
        this.phaseManager = new PhaseManager();
    { name: "Erie PA", lat: 42.1292, lon: -80.0851, state: "PA" },
        this.phaseManager = new PhaseManager();
    { name: "Scranton PA", lat: 41.4090, lon: -75.6624, state: "PA" },
        this.phaseManager = new PhaseManager();
    { name: "Newark NJ", lat: 40.7357, lon: -74.1724, state: "NJ" },
        this.phaseManager = new PhaseManager();
    { name: "Trenton NJ", lat: 40.2206, lon: -74.7563, state: "NJ" },
        this.phaseManager = new PhaseManager();
    { name: "Atlantic City NJ", lat: 39.3643, lon: -74.4229, state: "NJ" },
        this.phaseManager = new PhaseManager();
    { name: "Washington DC", lat: 38.9072, lon: -77.0369, state: "DC" },
        this.phaseManager = new PhaseManager();
    { name: "Baltimore MD", lat: 39.2904, lon: -76.6122, state: "MD" },
        this.phaseManager = new PhaseManager();
    { name: "Annapolis MD", lat: 38.9784, lon: -76.4951, state: "MD" },
        this.phaseManager = new PhaseManager();
    { name: "Wilmington DE", lat: 39.7391, lon: -75.5398, state: "DE" },
        this.phaseManager = new PhaseManager();
    { name: "Dover DE", lat: 39.1612, lon: -75.5264, state: "DE" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // SOUTHEAST
        this.phaseManager = new PhaseManager();
    { name: "Richmond VA", lat: 37.5407, lon: -77.4360, state: "VA" },
        this.phaseManager = new PhaseManager();
    { name: "Virginia Beach VA", lat: 36.8529, lon: -75.9780, state: "VA" },
        this.phaseManager = new PhaseManager();
    { name: "Norfolk VA", lat: 36.8468, lon: -76.2852, state: "VA" },
        this.phaseManager = new PhaseManager();
    { name: "Raleigh NC", lat: 35.7796, lon: -78.6382, state: "NC" },
        this.phaseManager = new PhaseManager();
    { name: "Charlotte NC", lat: 35.2271, lon: -80.8431, state: "NC" },
        this.phaseManager = new PhaseManager();
    { name: "Greensboro NC", lat: 36.0726, lon: -79.7920, state: "NC" },
        this.phaseManager = new PhaseManager();
    { name: "Wilmington NC", lat: 34.2257, lon: -77.9447, state: "NC" },
        this.phaseManager = new PhaseManager();
    { name: "Columbia SC", lat: 34.0007, lon: -81.0348, state: "SC" },
        this.phaseManager = new PhaseManager();
    { name: "Charleston SC", lat: 32.7765, lon: -79.9311, state: "SC" },
        this.phaseManager = new PhaseManager();
    { name: "Myrtle Beach SC", lat: 33.6891, lon: -78.8867, state: "SC" },
        this.phaseManager = new PhaseManager();
    { name: "Atlanta GA", lat: 33.7490, lon: -84.3880, state: "GA" },
        this.phaseManager = new PhaseManager();
    { name: "Savannah GA", lat: 32.0835, lon: -81.0998, state: "GA" },
        this.phaseManager = new PhaseManager();
    { name: "Augusta GA", lat: 33.4735, lon: -82.0105, state: "GA" },
        this.phaseManager = new PhaseManager();
    { name: "Columbus GA", lat: 32.4609, lon: -84.9877, state: "GA" },
        this.phaseManager = new PhaseManager();
    { name: "Jacksonville FL", lat: 30.3322, lon: -81.6557, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Miami FL", lat: 25.7617, lon: -80.1918, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Tampa FL", lat: 27.9506, lon: -82.4572, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Orlando FL", lat: 28.5383, lon: -81.3792, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Tallahassee FL", lat: 30.4518, lon: -84.2807, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Pensacola FL", lat: 30.4213, lon: -87.2169, state: "FL" },
        this.phaseManager = new PhaseManager();
    { name: "Key West FL", lat: 24.5557, lon: -81.7826, state: "FL" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // MIDWEST
        this.phaseManager = new PhaseManager();
    { name: "Chicago IL", lat: 41.8781, lon: -87.6298, state: "IL" },
        this.phaseManager = new PhaseManager();
    { name: "Springfield IL", lat: 39.7817, lon: -89.6501, state: "IL" },
        this.phaseManager = new PhaseManager();
    { name: "Rockford IL", lat: 42.2711, lon: -89.0940, state: "IL" },
        this.phaseManager = new PhaseManager();
    { name: "Peoria IL", lat: 40.6936, lon: -89.5890, state: "IL" },
        this.phaseManager = new PhaseManager();
    { name: "Indianapolis IN", lat: 39.7684, lon: -86.1581, state: "IN" },
        this.phaseManager = new PhaseManager();
    { name: "Fort Wayne IN", lat: 41.0793, lon: -85.1394, state: "IN" },
        this.phaseManager = new PhaseManager();
    { name: "Evansville IN", lat: 37.9716, lon: -87.5710, state: "IN" },
        this.phaseManager = new PhaseManager();
    { name: "Detroit MI", lat: 42.3314, lon: -83.0458, state: "MI" },
        this.phaseManager = new PhaseManager();
    { name: "Grand Rapids MI", lat: 42.9634, lon: -85.6681, state: "MI" },
        this.phaseManager = new PhaseManager();
    { name: "Lansing MI", lat: 42.3540, lon: -84.9551, state: "MI" },
        this.phaseManager = new PhaseManager();
    { name: "Flint MI", lat: 43.0125, lon: -83.6875, state: "MI" },
        this.phaseManager = new PhaseManager();
    { name: "Marquette MI", lat: 46.5436, lon: -87.3954, state: "MI" },
        this.phaseManager = new PhaseManager();
    { name: "Columbus OH", lat: 39.9612, lon: -82.9988, state: "OH" },
        this.phaseManager = new PhaseManager();
    { name: "Cleveland OH", lat: 41.4993, lon: -81.6944, state: "OH" },
        this.phaseManager = new PhaseManager();
    { name: "Cincinnati OH", lat: 39.1031, lon: -84.5120, state: "OH" },
        this.phaseManager = new PhaseManager();
    { name: "Toledo OH", lat: 41.6528, lon: -83.5379, state: "OH" },
        this.phaseManager = new PhaseManager();
    { name: "Milwaukee WI", lat: 43.0389, lon: -87.9065, state: "WI" },
        this.phaseManager = new PhaseManager();
    { name: "Madison WI", lat: 43.0731, lon: -89.4012, state: "WI" },
        this.phaseManager = new PhaseManager();
    { name: "Green Bay WI", lat: 44.5133, lon: -88.0133, state: "WI" },
        this.phaseManager = new PhaseManager();
    { name: "Minneapolis MN", lat: 44.9778, lon: -93.2650, state: "MN" },
        this.phaseManager = new PhaseManager();
    { name: "St. Paul MN", lat: 44.9537, lon: -93.0900, state: "MN" },
        this.phaseManager = new PhaseManager();
    { name: "Duluth MN", lat: 46.7867, lon: -92.1005, state: "MN" },
        this.phaseManager = new PhaseManager();
    { name: "Des Moines IA", lat: 41.5868, lon: -93.6250, state: "IA" },
        this.phaseManager = new PhaseManager();
    { name: "Cedar Rapids IA", lat: 41.9778, lon: -91.6656, state: "IA" },
        this.phaseManager = new PhaseManager();
    { name: "Davenport IA", lat: 41.5236, lon: -90.5776, state: "IA" },
        this.phaseManager = new PhaseManager();
    { name: "Kansas City MO", lat: 39.0997, lon: -94.5786, state: "MO" },
        this.phaseManager = new PhaseManager();
    { name: "St. Louis MO", lat: 38.6270, lon: -90.1994, state: "MO" },
        this.phaseManager = new PhaseManager();
    { name: "Springfield MO", lat: 37.2153, lon: -93.2982, state: "MO" },
        this.phaseManager = new PhaseManager();
    { name: "Columbia MO", lat: 38.9517, lon: -92.3341, state: "MO" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // GREAT PLAINS
        this.phaseManager = new PhaseManager();
    { name: "Fargo ND", lat: 46.8772, lon: -96.7898, state: "ND" },
        this.phaseManager = new PhaseManager();
    { name: "Bismarck ND", lat: 46.8083, lon: -100.7837, state: "ND" },
        this.phaseManager = new PhaseManager();
    { name: "Grand Forks ND", lat: 47.9253, lon: -97.0329, state: "ND" },
        this.phaseManager = new PhaseManager();
    { name: "Sioux Falls SD", lat: 43.5460, lon: -96.7313, state: "SD" },
        this.phaseManager = new PhaseManager();
    { name: "Rapid City SD", lat: 44.0805, lon: -103.2310, state: "SD" },
        this.phaseManager = new PhaseManager();
    { name: "Pierre SD", lat: 44.3683, lon: -100.3510, state: "SD" },
        this.phaseManager = new PhaseManager();
    { name: "Omaha NE", lat: 41.2565, lon: -95.9345, state: "NE" },
        this.phaseManager = new PhaseManager();
    { name: "Lincoln NE", lat: 40.8136, lon: -96.7026, state: "NE" },
        this.phaseManager = new PhaseManager();
    { name: "North Platte NE", lat: 41.1240, lon: -100.7654, state: "NE" },
        this.phaseManager = new PhaseManager();
    { name: "Topeka KS", lat: 39.0473, lon: -95.6890, state: "KS" },
        this.phaseManager = new PhaseManager();
    { name: "Wichita KS", lat: 37.6872, lon: -97.3301, state: "KS" },
        this.phaseManager = new PhaseManager();
    { name: "Dodge City KS", lat: 37.7528, lon: -100.0171, state: "KS" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // SOUTH
        this.phaseManager = new PhaseManager();
    { name: "Louisville KY", lat: 38.2527, lon: -85.7585, state: "KY" },
        this.phaseManager = new PhaseManager();
    { name: "Lexington KY", lat: 38.0406, lon: -84.5037, state: "KY" },
        this.phaseManager = new PhaseManager();
    { name: "Bowling Green KY", lat: 36.9685, lon: -86.4808, state: "KY" },
        this.phaseManager = new PhaseManager();
    { name: "Nashville TN", lat: 36.1627, lon: -86.7816, state: "TN" },
        this.phaseManager = new PhaseManager();
    { name: "Memphis TN", lat: 35.1495, lon: -90.0490, state: "TN" },
        this.phaseManager = new PhaseManager();
    { name: "Knoxville TN", lat: 35.9606, lon: -83.9207, state: "TN" },
        this.phaseManager = new PhaseManager();
    { name: "Chattanooga TN", lat: 35.0456, lon: -85.3097, state: "TN" },
        this.phaseManager = new PhaseManager();
    { name: "Birmingham AL", lat: 33.5207, lon: -86.8025, state: "AL" },
        this.phaseManager = new PhaseManager();
    { name: "Montgomery AL", lat: 32.3668, lon: -86.3000, state: "AL" },
        this.phaseManager = new PhaseManager();
    { name: "Mobile AL", lat: 30.6954, lon: -88.0399, state: "AL" },
        this.phaseManager = new PhaseManager();
    { name: "Jackson MS", lat: 32.2988, lon: -90.1848, state: "MS" },
        this.phaseManager = new PhaseManager();
    { name: "Biloxi MS", lat: 30.3960, lon: -88.8853, state: "MS" },
        this.phaseManager = new PhaseManager();
    { name: "Hattiesburg MS", lat: 31.3271, lon: -89.2903, state: "MS" },
        this.phaseManager = new PhaseManager();
    { name: "Little Rock AR", lat: 34.7465, lon: -92.2896, state: "AR" },
        this.phaseManager = new PhaseManager();
    { name: "Fort Smith AR", lat: 35.3859, lon: -94.3985, state: "AR" },
        this.phaseManager = new PhaseManager();
    { name: "Fayetteville AR", lat: 36.0626, lon: -94.1574, state: "AR" },
        this.phaseManager = new PhaseManager();
    { name: "New Orleans LA", lat: 29.9511, lon: -90.0715, state: "LA" },
        this.phaseManager = new PhaseManager();
    { name: "Baton Rouge LA", lat: 30.4515, lon: -91.1871, state: "LA" },
        this.phaseManager = new PhaseManager();
    { name: "Shreveport LA", lat: 32.5252, lon: -93.7502, state: "LA" },
        this.phaseManager = new PhaseManager();
    { name: "Lafayette LA", lat: 30.2241, lon: -92.0198, state: "LA" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // TEXAS
        this.phaseManager = new PhaseManager();
    { name: "Houston TX", lat: 29.7604, lon: -95.3698, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Dallas TX", lat: 32.7767, lon: -96.7970, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "San Antonio TX", lat: 29.4241, lon: -98.4936, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Austin TX", lat: 30.2672, lon: -97.7431, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Fort Worth TX", lat: 32.7555, lon: -97.3308, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "El Paso TX", lat: 31.7619, lon: -106.4850, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Corpus Christi TX", lat: 27.8006, lon: -97.3964, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Lubbock TX", lat: 33.5779, lon: -101.8552, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Amarillo TX", lat: 35.2220, lon: -101.8313, state: "TX" },
        this.phaseManager = new PhaseManager();
    { name: "Beaumont TX", lat: 30.0804, lon: -94.1266, state: "TX" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // OKLAHOMA
        this.phaseManager = new PhaseManager();
    { name: "Oklahoma City OK", lat: 35.4676, lon: -97.5164, state: "OK" },
        this.phaseManager = new PhaseManager();
    { name: "Tulsa OK", lat: 36.1540, lon: -95.9928, state: "OK" },
        this.phaseManager = new PhaseManager();
    { name: "Norman OK", lat: 35.2226, lon: -97.4395, state: "OK" },
        this.phaseManager = new PhaseManager();
    { name: "Lawton OK", lat: 34.6087, lon: -98.3959, state: "OK" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // MOUNTAIN WEST
        this.phaseManager = new PhaseManager();
    { name: "Denver CO", lat: 39.7392, lon: -104.9903, state: "CO" },
        this.phaseManager = new PhaseManager();
    { name: "Colorado Springs CO", lat: 38.8339, lon: -104.8214, state: "CO" },
        this.phaseManager = new PhaseManager();
    { name: "Grand Junction CO", lat: 39.0639, lon: -108.5506, state: "CO" },
        this.phaseManager = new PhaseManager();
    { name: "Pueblo CO", lat: 38.2544, lon: -104.6091, state: "CO" },
        this.phaseManager = new PhaseManager();
    { name: "Salt Lake City UT", lat: 40.7608, lon: -111.8910, state: "UT" },
        this.phaseManager = new PhaseManager();
    { name: "Provo UT", lat: 40.2338, lon: -111.6585, state: "UT" },
        this.phaseManager = new PhaseManager();
    { name: "Ogden UT", lat: 41.2230, lon: -111.9738, state: "UT" },
        this.phaseManager = new PhaseManager();
    { name: "Phoenix AZ", lat: 33.4484, lon: -112.0740, state: "AZ" },
        this.phaseManager = new PhaseManager();
    { name: "Tucson AZ", lat: 32.2226, lon: -110.9747, state: "AZ" },
        this.phaseManager = new PhaseManager();
    { name: "Flagstaff AZ", lat: 35.1983, lon: -111.6513, state: "AZ" },
        this.phaseManager = new PhaseManager();
    { name: "Yuma AZ", lat: 32.6927, lon: -114.6277, state: "AZ" },
        this.phaseManager = new PhaseManager();
    { name: "Las Vegas NV", lat: 36.1699, lon: -115.1398, state: "NV" },
        this.phaseManager = new PhaseManager();
    { name: "Reno NV", lat: 39.5296, lon: -119.8138, state: "NV" },
        this.phaseManager = new PhaseManager();
    { name: "Carson City NV", lat: 39.1638, lon: -119.7674, state: "NV" },
        this.phaseManager = new PhaseManager();
    { name: "Boise ID", lat: 43.6150, lon: -116.2023, state: "ID" },
        this.phaseManager = new PhaseManager();
    { name: "Idaho Falls ID", lat: 43.4666, lon: -112.0340, state: "ID" },
        this.phaseManager = new PhaseManager();
    { name: "Pocatello ID", lat: 42.8713, lon: -112.4455, state: "ID" },
        this.phaseManager = new PhaseManager();
    { name: "Billings MT", lat: 45.7833, lon: -108.5007, state: "MT" },
        this.phaseManager = new PhaseManager();
    { name: "Missoula MT", lat: 46.8721, lon: -113.9940, state: "MT" },
        this.phaseManager = new PhaseManager();
    { name: "Great Falls MT", lat: 47.4941, lon: -111.2833, state: "MT" },
        this.phaseManager = new PhaseManager();
    { name: "Helena MT", lat: 46.5958, lon: -112.0362, state: "MT" },
        this.phaseManager = new PhaseManager();
    { name: "Cheyenne WY", lat: 41.1400, lon: -104.8197, state: "WY" },
        this.phaseManager = new PhaseManager();
    { name: "Casper WY", lat: 42.8666, lon: -106.3131, state: "WY" },
        this.phaseManager = new PhaseManager();
    { name: "Jackson WY", lat: 43.4799, lon: -110.7624, state: "WY" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // CALIFORNIA
        this.phaseManager = new PhaseManager();
    { name: "Los Angeles CA", lat: 34.0522, lon: -118.2437, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "San Francisco CA", lat: 37.7749, lon: -122.4194, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "San Diego CA", lat: 32.7157, lon: -117.1611, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Sacramento CA", lat: 38.5816, lon: -121.4944, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "San Jose CA", lat: 37.3382, lon: -121.8863, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Fresno CA", lat: 36.7378, lon: -119.7871, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Oakland CA", lat: 37.8044, lon: -122.2712, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Bakersfield CA", lat: 35.3733, lon: -119.0187, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Stockton CA", lat: 37.9577, lon: -121.2908, state: "CA" },
        this.phaseManager = new PhaseManager();
    { name: "Eureka CA", lat: 40.8021, lon: -124.1637, state: "CA" },
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    // PACIFIC NORTHWEST
        this.phaseManager = new PhaseManager();
    { name: "Seattle WA", lat: 47.6062, lon: -122.3321, state: "WA" },
        this.phaseManager = new PhaseManager();
    { name: "Spokane WA", lat: 47.6587, lon: -117.4260, state: "WA" },
        this.phaseManager = new PhaseManager();
    { name: "Tacoma WA", lat: 47.2529, lon: -122.4443, state: "WA" },
        this.phaseManager = new PhaseManager();
    { name: "Bellingham WA", lat: 48.7519, lon: -122.4787, state: "WA" },
        this.phaseManager = new PhaseManager();
    { name: "Yakima WA", lat: 46.6021, lon: -120.5059, state: "WA" },
        this.phaseManager = new PhaseManager();
    { name: "Portland OR", lat: 45.5152, lon: -122.6784, state: "OR" },
        this.phaseManager = new PhaseManager();
    { name: "Eugene OR", lat: 44.0521, lon: -123.0868, state: "OR" },
        this.phaseManager = new PhaseManager();
    { name: "Salem OR", lat: 44.9429, lon: -123.0351, state: "OR" },
        this.phaseManager = new PhaseManager();
    { name: "Bend OR", lat: 44.0582, lon: -121.3153, state: "OR" },
        this.phaseManager = new PhaseManager();
    { name: "Medford OR", lat: 42.3265, lon: -122.8756, state: "OR" }
        this.phaseManager = new PhaseManager();
];
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// ALASKA COVERAGE - Strategic locations across the state
        this.phaseManager = new PhaseManager();
const ALASKA_COVERAGE = [
        this.phaseManager = new PhaseManager();
    { name: "Anchorage AK", lat: 61.2181, lon: -149.9003, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Fairbanks AK", lat: 64.8378, lon: -147.7164, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Juneau AK", lat: 58.3019, lon: -134.4197, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Sitka AK", lat: 57.0531, lon: -135.3300, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Ketchikan AK", lat: 55.3422, lon: -131.6461, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Kodiak AK", lat: 57.7900, lon: -152.4069, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Nome AK", lat: 64.5011, lon: -165.4064, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Barrow AK", lat: 71.2906, lon: -156.7886, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Bethel AK", lat: 60.7922, lon: -161.7558, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Dutch Harbor AK", lat: 53.8914, lon: -166.5436, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Valdez AK", lat: 61.1308, lon: -146.3486, state: "AK" },
        this.phaseManager = new PhaseManager();
    { name: "Seward AK", lat: 60.1042, lon: -149.4422, state: "AK" }
        this.phaseManager = new PhaseManager();
];
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// HAWAII COVERAGE - All major islands
        this.phaseManager = new PhaseManager();
const HAWAII_COVERAGE = [
        this.phaseManager = new PhaseManager();
    { name: "Honolulu HI", lat: 21.3099, lon: -157.8581, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Hilo HI", lat: 19.7297, lon: -155.0900, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Kahului HI", lat: 20.8893, lon: -156.4729, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Kailua-Kona HI", lat: 19.6390, lon: -155.9969, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Lihue HI", lat: 21.9811, lon: -159.3708, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Kaunakakai HI", lat: 21.0931, lon: -157.0228, state: "HI" },
        this.phaseManager = new PhaseManager();
    { name: "Lanai City HI", lat: 20.8283, lon: -156.9197, state: "HI" }
        this.phaseManager = new PhaseManager();
];
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// NOAA Weather Service (same as before)
        this.phaseManager = new PhaseManager();
class NOAAWeatherService {
        this.phaseManager = new PhaseManager();
    constructor() {
        this.phaseManager = new PhaseManager();
        this.baseUrl = 'https://api.weather.gov';
        this.phaseManager = new PhaseManager();
        this.userAgent = process.env.NOAA_USER_AGENT || 'MountainShares Emergency Response (contact@mountainshares.com)';
        this.phaseManager = new PhaseManager();
        this.zoneCache = new Map();
        this.phaseManager = new PhaseManager();
        this.rateLimitDelay = 300; // Reduced delay for faster scanning
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async getWeatherAlerts(lat, lon) {
        this.phaseManager = new PhaseManager();
        try {
        this.phaseManager = new PhaseManager();
            const coordKey = `${lat},${lon}`;
        this.phaseManager = new PhaseManager();
            let zoneId = this.zoneCache.get(coordKey);
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            if (!zoneId) {
        this.phaseManager = new PhaseManager();
                const pointsResponse = await axios.get(`${this.baseUrl}/points/${lat},${lon}`, {
        this.phaseManager = new PhaseManager();
                    headers: { 'User-Agent': this.userAgent },
        this.phaseManager = new PhaseManager();
                    timeout: 8000
        this.phaseManager = new PhaseManager();
                });
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
                const properties = pointsResponse.data.properties;
        this.phaseManager = new PhaseManager();
                const forecastZone = properties.forecastZone;
        this.phaseManager = new PhaseManager();
                zoneId = forecastZone.split('/').pop();
        this.phaseManager = new PhaseManager();
                this.zoneCache.set(coordKey, zoneId);
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            const alertsResponse = await axios.get(`${this.baseUrl}/alerts/active/zone/${zoneId}`, {
        this.phaseManager = new PhaseManager();
                headers: { 'User-Agent': this.userAgent },
        this.phaseManager = new PhaseManager();
                timeout: 8000
        this.phaseManager = new PhaseManager();
            });
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            const alerts = alertsResponse.data.features || [];
        this.phaseManager = new PhaseManager();
            return alerts.map(alert => this.formatAlert(alert, zoneId));
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        } catch (error) {
        this.phaseManager = new PhaseManager();
            if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        this.phaseManager = new PhaseManager();
                throw new Error(`NOAA API connection failed: ${error.message}`);
        this.phaseManager = new PhaseManager();
            } else if (error.response?.status === 404) {
        this.phaseManager = new PhaseManager();
                throw new Error(`Location not found: ${lat}, ${lon}`);
        this.phaseManager = new PhaseManager();
            } else if (error.response?.status === 429) {
        this.phaseManager = new PhaseManager();
                throw new Error('NOAA API rate limit exceeded');
        this.phaseManager = new PhaseManager();
            } else {
        this.phaseManager = new PhaseManager();
                throw new Error(`NOAA API error: ${error.message}`);
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    formatAlert(alert, zoneId) {
        this.phaseManager = new PhaseManager();
        const properties = alert.properties;
        this.phaseManager = new PhaseManager();
        let severity = 5;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        if (properties.severity === 'Extreme') severity = 10;
        this.phaseManager = new PhaseManager();
        else if (properties.severity === 'Severe') severity = 8;
        this.phaseManager = new PhaseManager();
        else if (properties.severity === 'Moderate') severity = 6;
        this.phaseManager = new PhaseManager();
        else if (properties.severity === 'Minor') severity = 3;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        if (properties.urgency === 'Immediate') severity = Math.min(10, severity + 2);
        this.phaseManager = new PhaseManager();
        else if (properties.urgency === 'Expected') severity = Math.min(10, severity + 1);
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        return {
        this.phaseManager = new PhaseManager();
            headline: properties.headline,
        this.phaseManager = new PhaseManager();
            event: properties.event,
        this.phaseManager = new PhaseManager();
            severity: severity,
        this.phaseManager = new PhaseManager();
            areas: properties.areaDesc ? [properties.areaDesc] : [zoneId],
        this.phaseManager = new PhaseManager();
            zones: [zoneId],
        this.phaseManager = new PhaseManager();
            description: properties.description,
        this.phaseManager = new PhaseManager();
            ends: properties.ends,
        this.phaseManager = new PhaseManager();
            urgency: properties.urgency,
        this.phaseManager = new PhaseManager();
            certainty: properties.certainty
        this.phaseManager = new PhaseManager();
        };
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();
}
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// Enhanced Production Emergency Monitor Class
        this.phaseManager = new PhaseManager();
class EnhancedEmergencyMonitor {
        this.phaseManager = new PhaseManager();
    constructor() {
        this.phaseManager = new PhaseManager();
        this.contractAddress = process.env.EMERGENCY_CONTRACT_ADDRESS;
        this.phaseManager = new PhaseManager();
        this.checkInterval = parseInt(process.env.WEATHER_CHECK_INTERVAL) || 300;
        this.phaseManager = new PhaseManager();
        this.isRunning = false;
        this.phaseManager = new PhaseManager();
        this.noaaService = new NOAAWeatherService();
        this.phaseManager = new PhaseManager();
        this.monitoredZones = new Set();
        this.phaseManager = new PhaseManager();
        this.cityToZoneMap = new Map();
        this.phaseManager = new PhaseManager();
        this.contract = null;
        this.phaseManager = new PhaseManager();
        this.signer = null;
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        this.logger = winston.createLogger({
        this.phaseManager = new PhaseManager();
            level: process.env.LOG_LEVEL || 'info',
        this.phaseManager = new PhaseManager();
            format: winston.format.combine(
        this.phaseManager = new PhaseManager();
                winston.format.timestamp(),
        this.phaseManager = new PhaseManager();
                winston.format.json()
        this.phaseManager = new PhaseManager();
            ),
        this.phaseManager = new PhaseManager();
            transports: [
        this.phaseManager = new PhaseManager();
                new winston.transports.Console(),
        this.phaseManager = new PhaseManager();
                new winston.transports.File({ filename: 'logs/emergency.log' })
        this.phaseManager = new PhaseManager();
            ]
        this.phaseManager = new PhaseManager();
        });
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async initializeContract() {
        this.phaseManager = new PhaseManager();
        if (!this.contractAddress) {
        this.phaseManager = new PhaseManager();
            this.logger.warn('⚠️ No contract address - blockchain integration disabled');
        this.phaseManager = new PhaseManager();
            return;
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        try {
        this.phaseManager = new PhaseManager();
            this.logger.info('🔗 Initializing Emergency Response contract...');
        this.phaseManager = new PhaseManager();
            const [signer] = await ethers.getSigners();
        this.phaseManager = new PhaseManager();
            this.signer = signer;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            const EmergencyResponse = await ethers.getContractFactory("EmergencyResponse");
        this.phaseManager = new PhaseManager();
            this.contract = EmergencyResponse.attach(this.contractAddress);
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            this.logger.info(`✅ Connected to contract: ${this.contractAddress}`);
        this.phaseManager = new PhaseManager();
            this.logger.info(`📝 Using account: ${signer.address}`);
        this.phaseManager = new PhaseManager();
        } catch (error) {
        this.phaseManager = new PhaseManager();
            this.logger.error(`❌ Contract initialization failed: ${error.message}`);
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async start() {
        this.phaseManager = new PhaseManager();
        const totalLocations = ARC_MAXIMUM_COVERAGE.length + COMPLETE_US_COVERAGE.length + ALASKA_COVERAGE.length + HAWAII_COVERAGE.length;
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        this.logger.info('🌐 Starting ENHANCED Continental Weather Monitor');
        this.phaseManager = new PhaseManager();
        this.logger.info(`🏔️ ARC Maximum: ${ARC_MAXIMUM_COVERAGE.length} Appalachian locations (CRITICAL PRIORITY)`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`🇺🇸 Continental US: ${COMPLETE_US_COVERAGE.length} major cities`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`🏔️ Alaska: ${ALASKA_COVERAGE.length} strategic locations`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`🌺 Hawaii: ${HAWAII_COVERAGE.length} island locations`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`📡 TOTAL COVERAGE: ${totalLocations} monitoring points across all 50 states + DC + territories`);
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        await this.initializeContract();
        this.phaseManager = new PhaseManager();
        await this.mapCitiesToZones();
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        this.isRunning = true;
        this.phaseManager = new PhaseManager();
        await this.checkWeather();
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        this.interval = setInterval(async () => {
        this.phaseManager = new PhaseManager();
            if (this.isRunning) {
        this.phaseManager = new PhaseManager();
                await this.checkWeather();
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }, this.checkInterval * 1000);
        this.phaseManager = new PhaseManager();
        
        this.phaseManager = new PhaseManager();
        this.logger.info('✅ ENHANCED monitoring started');
        this.phaseManager = new PhaseManager();
        this.logger.info(`🗺️ Monitoring ${this.monitoredZones.size} unique forecast zones nationwide`);
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async mapCitiesToZones() {
        this.phaseManager = new PhaseManager();
        this.logger.info('🗺️ Mapping ALL locations to NOAA zones...');
        this.phaseManager = new PhaseManager();
        const processedZones = new Set();
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🏔️ Processing ARC MAXIMUM regions (CRITICAL):');
        this.phaseManager = new PhaseManager();
        for (const city of ARC_MAXIMUM_COVERAGE) {
        this.phaseManager = new PhaseManager();
            await this.mapCityToZone(city, processedZones, 'ARC_CRITICAL');
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🇺🇸 Processing complete continental US:');
        this.phaseManager = new PhaseManager();
        for (const city of COMPLETE_US_COVERAGE) {
        this.phaseManager = new PhaseManager();
            await this.mapCityToZone(city, processedZones, 'CONTINENTAL');
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🏔️ Processing Alaska:');
        this.phaseManager = new PhaseManager();
        for (const city of ALASKA_COVERAGE) {
        this.phaseManager = new PhaseManager();
            await this.mapCityToZone(city, processedZones, 'ALASKA');
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🌺 Processing Hawaii:');
        this.phaseManager = new PhaseManager();
        for (const city of HAWAII_COVERAGE) {
        this.phaseManager = new PhaseManager();
            await this.mapCityToZone(city, processedZones, 'HAWAII');
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info(`📊 Enhanced zone mapping complete: ${this.monitoredZones.size} unique zones`);
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async mapCityToZone(city, processedZones, priority) {
        this.phaseManager = new PhaseManager();
        try {
        this.phaseManager = new PhaseManager();
            const coordKey = `${city.lat},${city.lon}`;
        this.phaseManager = new PhaseManager();
            await this.noaaService.getWeatherAlerts(city.lat, city.lon);
        this.phaseManager = new PhaseManager();
            const zoneId = this.noaaService.zoneCache.get(coordKey);
        this.phaseManager = new PhaseManager();
            
        this.phaseManager = new PhaseManager();
            if (zoneId && !processedZones.has(zoneId)) {
        this.phaseManager = new PhaseManager();
                this.monitoredZones.add(zoneId);
        this.phaseManager = new PhaseManager();
                this.cityToZoneMap.set(city.name, zoneId);
        this.phaseManager = new PhaseManager();
                processedZones.add(zoneId);
        this.phaseManager = new PhaseManager();
                this.logger.info(`   🗺️ ${city.name}, ${city.state} -> Zone ${zoneId} [${priority}]`);
        this.phaseManager = new PhaseManager();
            } else if (zoneId) {
        this.phaseManager = new PhaseManager();
                this.logger.info(`   📋 ${city.name}, ${city.state} -> Zone ${zoneId} (covered)`);
        this.phaseManager = new PhaseManager();
            } else {
        this.phaseManager = new PhaseManager();
                this.logger.warn(`   ❌ ${city.name}, ${city.state} -> Zone lookup failed`);
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        } catch (error) {
        this.phaseManager = new PhaseManager();
            this.logger.error(`❌ Error mapping ${city.name}: ${error.message}`);
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async checkWeather() {
        this.phaseManager = new PhaseManager();
        this.logger.info('🔍 Checking ENHANCED weather nationwide via NOAA API...');
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        let totalAlerts = 0;
        this.phaseManager = new PhaseManager();
        let arcAlerts = 0;
        this.phaseManager = new PhaseManager();
        let continentalAlerts = 0;
        this.phaseManager = new PhaseManager();
        let alaskaAlerts = 0;
        this.phaseManager = new PhaseManager();
        let hawaiiAlerts = 0;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🏔️ Checking ARC MAXIMUM regions (CRITICAL PRIORITY)...');
        this.phaseManager = new PhaseManager();
        for (const location of ARC_MAXIMUM_COVERAGE) {
        this.phaseManager = new PhaseManager();
            const alerts = await this.checkLocationWeather(location, 'ARC_CRITICAL');
        this.phaseManager = new PhaseManager();
            if (alerts.length > 0) {
        this.phaseManager = new PhaseManager();
                totalAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
                arcAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🇺🇸 Checking complete continental US...');
        this.phaseManager = new PhaseManager();
        for (const location of COMPLETE_US_COVERAGE) {
        this.phaseManager = new PhaseManager();
            const alerts = await this.checkLocationWeather(location, 'CONTINENTAL');
        this.phaseManager = new PhaseManager();
            if (alerts.length > 0) {
        this.phaseManager = new PhaseManager();
                totalAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
                continentalAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🏔️ Checking Alaska...');
        this.phaseManager = new PhaseManager();
        for (const location of ALASKA_COVERAGE) {
        this.phaseManager = new PhaseManager();
            const alerts = await this.checkLocationWeather(location, 'ALASKA');
        this.phaseManager = new PhaseManager();
            if (alerts.length > 0) {
        this.phaseManager = new PhaseManager();
                totalAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
                alaskaAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info('🌺 Checking Hawaii...');
        this.phaseManager = new PhaseManager();
        for (const location of HAWAII_COVERAGE) {
        this.phaseManager = new PhaseManager();
            const alerts = await this.checkLocationWeather(location, 'HAWAII');
        this.phaseManager = new PhaseManager();
            if (alerts.length > 0) {
        this.phaseManager = new PhaseManager();
                totalAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
                hawaiiAlerts += alerts.length;
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        const totalLocations = ARC_MAXIMUM_COVERAGE.length + COMPLETE_US_COVERAGE.length + ALASKA_COVERAGE.length + HAWAII_COVERAGE.length;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        this.logger.info(`📊 ENHANCED weather scan complete:`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`   🏔️ ARC Critical: ${ARC_MAXIMUM_COVERAGE.length} locations, ${arcAlerts} alerts`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`   🇺🇸 Continental: ${COMPLETE_US_COVERAGE.length} cities, ${continentalAlerts} alerts`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`   🏔️ Alaska: ${ALASKA_COVERAGE.length} locations, ${alaskaAlerts} alerts`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`   🌺 Hawaii: ${HAWAII_COVERAGE.length} locations, ${hawaiiAlerts} alerts`);
        this.phaseManager = new PhaseManager();
        this.logger.info(`   📍 TOTAL: ${totalLocations} locations, ${totalAlerts} alerts nationwide`);
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async checkLocationWeather(location, priority) {
        this.phaseManager = new PhaseManager();
        try {
        this.phaseManager = new PhaseManager();
            const alerts = await this.noaaService.getWeatherAlerts(location.lat, location.lon);
        this.phaseManager = new PhaseManager();
            
        this.phaseManager = new PhaseManager();
            if (alerts.length > 0) {
        this.phaseManager = new PhaseManager();
                const priorityEmoji = this.getPriorityEmoji(priority);
        this.phaseManager = new PhaseManager();
                this.logger.warn(`🚨 ${priorityEmoji} ${priority} ALERT: ${location.name}, ${location.state}: ${alerts.length} alert(s)`);
        this.phaseManager = new PhaseManager();
                
        this.phaseManager = new PhaseManager();
                for (const alert of alerts) {
        this.phaseManager = new PhaseManager();
                    this.logger.warn(`   ⚠️ ${alert.event} - Severity ${alert.severity}/10 - ${alert.headline}`);
        this.phaseManager = new PhaseManager();
                    await this.processAlert(alert, location, priority);
        this.phaseManager = new PhaseManager();
                }
        this.phaseManager = new PhaseManager();
            } else {
        this.phaseManager = new PhaseManager();
                this.logger.info(`   ✅ ${location.name}, ${location.state}: Clear`);
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            await new Promise(resolve => setTimeout(resolve, this.noaaService.rateLimitDelay));
        this.phaseManager = new PhaseManager();
            return alerts;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        } catch (error) {
        this.phaseManager = new PhaseManager();
            this.logger.error(`❌ Error checking ${location.name}: ${error.message}`);
        this.phaseManager = new PhaseManager();
            return [];
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    getPriorityEmoji(priority) {
        this.phaseManager = new PhaseManager();
        switch (priority) {
        this.phaseManager = new PhaseManager();
            case 'ARC_CRITICAL': return '🏔️ CRITICAL';
        this.phaseManager = new PhaseManager();
            case 'CONTINENTAL': return '🇺🇸';
        this.phaseManager = new PhaseManager();
            case 'ALASKA': return '🏔️ AK';
        this.phaseManager = new PhaseManager();
            case 'HAWAII': return '🌺 HI';
        this.phaseManager = new PhaseManager();
            default: return '📍';
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    async processAlert(alert, location, priority) {
        this.phaseManager = new PhaseManager();
        try {
        this.phaseManager = new PhaseManager();
            const priorityPrefix = this.getPriorityEmoji(priority);
        this.phaseManager = new PhaseManager();
            this.logger.info(`📢 ${priorityPrefix} Processing: ${location.name} - ${alert.event}`);
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
            if (this.contract && this.signer) {
        this.phaseManager = new PhaseManager();
                const alertMessage = priority === 'ARC_CRITICAL' 
        this.phaseManager = new PhaseManager();
                    ? `[ARC CRITICAL] ${alert.event} - ${location.name}, ${location.state}`
        this.phaseManager = new PhaseManager();
                    : `[${priority}] ${alert.event} - ${location.name}, ${location.state}`;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
                const gasLimit = ethers.BigNumber.from("500000");
        this.phaseManager = new PhaseManager();
                const tx = await this.contract.reportEmergency(
        this.phaseManager = new PhaseManager();
                    Date.now(),
        this.phaseManager = new PhaseManager();
                    alert.severity,
        this.phaseManager = new PhaseManager();
                    alertMessage,
        this.phaseManager = new PhaseManager();
                    { gasLimit }
        this.phaseManager = new PhaseManager();
                );
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
                this.logger.info(`🔗 Blockchain tx: ${tx.hash}`);
        this.phaseManager = new PhaseManager();
                if (priority === 'ARC_CRITICAL') {
        this.phaseManager = new PhaseManager();
                    this.logger.warn(`🏔️ ARC CRITICAL alert sent to blockchain!`);
        this.phaseManager = new PhaseManager();
                }
        this.phaseManager = new PhaseManager();
                
        this.phaseManager = new PhaseManager();
                await tx.wait();
        this.phaseManager = new PhaseManager();
                this.logger.info(`✅ Transaction confirmed for ${location.name}`);
        this.phaseManager = new PhaseManager();
            } else {
        this.phaseManager = new PhaseManager();
                this.logger.warn(`⚠️ Alert logged but no blockchain (contract not configured)`);
        this.phaseManager = new PhaseManager();
            }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
        } catch (error) {
        this.phaseManager = new PhaseManager();
            this.logger.error(`❌ Error processing alert for ${location.name}: ${error.message}`);
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
    stop() {
        this.phaseManager = new PhaseManager();
        this.logger.info('🛑 Stopping enhanced weather monitoring...');
        this.phaseManager = new PhaseManager();
        this.isRunning = false;
        this.phaseManager = new PhaseManager();
        if (this.interval) {
        this.phaseManager = new PhaseManager();
            clearInterval(this.interval);
        this.phaseManager = new PhaseManager();
        }
        this.phaseManager = new PhaseManager();
        this.logger.info('✅ Enhanced weather monitoring stopped');
        this.phaseManager = new PhaseManager();
    }
        this.phaseManager = new PhaseManager();
}
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
module.exports = EnhancedEmergencyMonitor;
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// === MountainShares Phase System Integration ===
        this.phaseManager = new PhaseManager();
const PhaseManager = require('./phase-system/phase-manager');
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// Add to your existing class constructor:
        this.phaseManager = new PhaseManager();
// this.phaseManager = new PhaseManager();
        this.phaseManager = new PhaseManager();

        this.phaseManager = new PhaseManager();
// Add to your emergency response handler:
        this.phaseManager = new PhaseManager();
/*
        this.phaseManager = new PhaseManager();
async processAlert(alert, location, priority) {
        this.phaseManager = new PhaseManager();
    // ... your existing code ...
        this.phaseManager = new PhaseManager();
    
        this.phaseManager = new PhaseManager();
    const baseReward = this.calculateBaseReward(alert, priority);
        this.phaseManager = new PhaseManager();
    const actualReward = await this.phaseManager.recordEmergencyResponse(
        this.phaseManager = new PhaseManager();
        Date.now(),
        this.phaseManager = new PhaseManager();
        responderAddress,
        this.phaseManager = new PhaseManager();
        baseReward
        this.phaseManager = new PhaseManager();
    );
        this.phaseManager = new PhaseManager();
    
        this.phaseManager = new PhaseManager();
    this.logger.info(`💰 Phase-enhanced reward: ${baseReward} → ${actualReward} MS`);
        this.phaseManager = new PhaseManager();
    return actualReward;
        this.phaseManager = new PhaseManager();
}
        this.phaseManager = new PhaseManager();
*/
        this.phaseManager = new PhaseManager();
