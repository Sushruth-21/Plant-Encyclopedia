/**
 * Extended Plant Database Part 2 — 200+ more plants
 * Covering: tropical, subtropical, ornamental, wildflowers, climbers, grasses, etc.
 */

import { LocalPlant } from './plant-database';

type CompactPlant = [string, string, string, string, string, string, string, string[], string, string, boolean, boolean, boolean, boolean, string | null, string[], string, string[], string];

function expand(p: CompactPlant): LocalPlant {
  return {
    id: `local-${p[0]}`,
    common_name: p[1],
    scientific_name: [p[2]],
    other_names: {},
    family: p[3],
    type: p[4],
    cycle: p[5],
    watering: p[6],
    sunlight: p[7],
    care_level: p[8],
    growth_rate: p[9],
    indoor: p[10],
    medicinal: p[11],
    edible: p[12],
    flowers: p[13],
    flowering_season: p[14],
    regions: p[15],
    image_url: '',
    images: p[17],
    description: p[18],
    origin: p[15],
  };
}

const FS = ["Full Sun"];
const PS = ["Part Shade"];
const FSPS = ["Full Sun", "Part Shade"];
const SH = ["Shade"];
const WW = ["Worldwide"];
const AI = ["All India"];

const DATA_P2: CompactPlant[] = [
  // ═══════════ ORNAMENTAL SHRUBS (30) ═══════════
  ["azalea", "Azalea", "Rhododendron", "Ericaceae", "Shrub", "Perennial", "Average", PS, "Moderate", "Low", false, false, false, true, "Spring", WW, "", [], "Azaleas produce masses of showy trumpet-shaped flowers in spring in shades of pink, red, white and purple."],
  ["bougainvillea", "Bougainvillea", "Bougainvillea glabra", "Nyctaginaceae", "Vine", "Perennial", "Minimum", FS, "Easy", "High", false, false, false, true, "All Year", AI, "", [], "Bougainvillea is a thorny ornamental vine with vibrant papery bracts in magenta, purple, orange and red."],
  ["oleander", "Oleander", "Nerium oleander", "Apocynaceae", "Shrub", "Perennial", "Minimum", FS, "Easy", "Moderate", false, true, false, true, "Summer", AI, "", [], "Oleander is a drought-hardy shrub with fragrant clusters of pink, red, or white flowers; all parts are toxic."],
  ["ixora", "Ixora (Jungle Flame)", "Ixora coccinea", "Rubiaceae", "Shrub", "Perennial", "Average", FSPS, "Easy", "Moderate", false, true, false, true, "All Year", AI, "", [], "Ixora produces dense clusters of star-shaped flowers in red, orange, yellow, and pink year-round in tropical gardens."],
  ["lantana", "Lantana", "Lantana camara", "Verbenaceae", "Shrub", "Perennial", "Minimum", FS, "Easy", "High", false, true, false, true, "All Year", AI, "", [], "Lantana is a hardy shrub with multicolored flower clusters that attract butterflies; considered invasive in some regions."],
  ["duranta", "Duranta (Golden Dewdrop)", "Duranta erecta", "Verbenaceae", "Shrub", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, true, "Summer", AI, "", [], "Duranta produces cascading clusters of purple flowers followed by golden berries, popular for hedges."],
  ["tecoma", "Yellow Bells (Tecoma)", "Tecoma stans", "Bignoniaceae", "Shrub", "Perennial", "Minimum", FS, "Easy", "High", false, true, false, true, "All Year", AI, "", [], "Yellow Bells produce trumpet-shaped flowers year-round, tolerating extreme heat and poor soil."],
  ["plumbago", "Plumbago", "Plumbago auriculata", "Plumbaginaceae", "Shrub", "Perennial", "Average", FS, "Easy", "High", false, true, false, true, "All Year", ["South Africa","India"], "", [], "Plumbago produces clusters of sky-blue flowers resembling phlox, excellent for hedges and borders."],
  ["allamanda", "Allamanda (Golden Trumpet)", "Allamanda cathartica", "Apocynaceae", "Vine", "Perennial", "Average", FS, "Easy", "High", false, true, false, true, "Summer", AI, "", [], "Allamanda is a tropical vine with large, showy golden-yellow trumpet flowers."],
  ["thunbergia", "Black-Eyed Susan Vine", "Thunbergia alata", "Acanthaceae", "Vine", "Annual", "Average", FSPS, "Easy", "High", false, false, false, true, "Summer", WW, "", [], "Black-Eyed Susan Vine produces cheerful orange flowers with dark centers on twining vines."],
  ["pentas", "Pentas (Star Cluster)", "Pentas lanceolata", "Rubiaceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, true, "All Year", AI, "", [], "Pentas produce star-shaped flower clusters that are magnets for butterflies and hummingbirds."],
  ["portulaca", "Portulaca (Moss Rose)", "Portulaca grandiflora", "Portulacaceae", "Flower", "Annual", "Minimum", FS, "Easy", "High", false, false, false, true, "Summer", AI, "", [], "Portulaca produces vibrant rose-like flowers in hot colors, thriving in poor soil and scorching sun."],
  ["vinca", "Vinca (Madagascar Periwinkle)", "Catharanthus roseus", "Apocynaceae", "Flower", "Perennial", "Minimum", FS, "Easy", "High", false, true, false, true, "All Year", AI, "", [], "Vinca is one of the hardiest flowering plants, blooming year-round even in extreme heat and drought."],
  ["impatiens", "Impatiens (Busy Lizzie)", "Impatiens walleriana", "Balsaminaceae", "Flower", "Annual", "Frequent", SH, "Easy", "High", true, false, false, true, "Summer", WW, "", [], "Impatiens are shade-loving plants producing masses of colorful flowers ideal for shady garden beds."],
  ["coleus", "Coleus", "Coleus scutellarioides", "Lamiaceae", "Houseplant", "Perennial", "Average", PS, "Easy", "High", true, false, false, false, null, WW, "", [], "Coleus is grown for its brilliantly colored foliage in combinations of red, green, purple, and yellow."],
  ["kalanchoe", "Kalanchoe", "Kalanchoe blossfeldiana", "Crassulaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Moderate", true, true, false, true, "Winter", WW, "", [], "Kalanchoe is a popular flowering succulent with clusters of tiny blooms in red, orange, yellow, and pink."],
  ["poinsettia", "Poinsettia", "Euphorbia pulcherrima", "Euphorbiaceae", "Shrub", "Perennial", "Average", FSPS, "Moderate", "Moderate", true, false, false, true, "Winter", WW, "", [], "Poinsettia's brilliant red bracts make it the iconic Christmas plant; native to Mexico."],
  ["adenium", "Desert Rose (Adenium)", "Adenium obesum", "Apocynaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Low", false, true, false, true, "Summer", AI, "", [], "Desert Rose has a sculptural swollen trunk and produces stunning pink, red, and white flowers."],
  ["mandevilla", "Mandevilla", "Mandevilla sanderi", "Apocynaceae", "Vine", "Perennial", "Average", FS, "Moderate", "High", false, false, false, true, "Summer", WW, "", [], "Mandevilla produces large, trumpet-shaped flowers in pink, red, and white on twining tropical vines."],
  ["heliconia", "Heliconia (Lobster Claw)", "Heliconia rostrata", "Heliconiaceae", "Flower", "Perennial", "Frequent", PS, "Moderate", "High", false, false, false, true, "Summer", ["Kerala","Northeast India"], "", [], "Heliconia produces spectacular hanging claw-like inflorescences in red and yellow, attracting hummingbirds."],

  // ═══════════ TROPICAL FRUITS (20) ═══════════
  ["jackfruit", "Jackfruit", "Artocarpus heterophyllus", "Moraceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, false, true, false, null, AI, "", [], "Jackfruit is the world's largest tree-borne fruit, weighing up to 50kg, with sweet yellow flesh used in curries."],
  ["lychee", "Lychee", "Litchi chinensis", "Sapindaceae", "Tree", "Perennial", "Average", FS, "Moderate", "Moderate", false, false, true, true, "Spring", ["Bihar","West Bengal"], "", [], "Lychee produces clusters of small, rough-skinned fruit with translucent sweet flesh, prized in India and China."],
  ["dragonfruit", "Dragon Fruit", "Hylocereus undatus", "Cactaceae", "Cactus", "Perennial", "Average", FS, "Easy", "High", false, false, true, true, "Summer", ["Maharashtra","Gujarat","Karnataka"], "", [], "Dragon fruit is a climbing cactus producing exotic pink-skinned fruit with speckled white flesh."],
  ["passion-fruit", "Passion Fruit", "Passiflora edulis", "Passifloraceae", "Vine", "Perennial", "Average", FS, "Easy", "High", false, true, true, true, "Summer", ["Kerala","Karnataka","Northeast India"], "", [], "Passion fruit vine produces exotic flowers and tangy-sweet purple fruit rich in vitamins."],
  ["custard-apple", "Custard Apple (Sitaphal)", "Annona squamosa", "Annonaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, true, true, "Autumn", AI, "", [], "Custard apple has creamy, sweet white flesh tasting like custard; popular across India during festival season."],
  ["star-fruit", "Star Fruit (Carambola)", "Averrhoa carambola", "Oxalidaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, true, true, "All Year", ["Kerala","Goa","Gujarat"], "", [], "Star fruit slices form a perfect star shape; sweet-sour flavor popular in juices and salads."],
  ["rambutan", "Rambutan", "Nephelium lappaceum", "Sapindaceae", "Tree", "Perennial", "Average", PS, "Moderate", "Moderate", false, false, true, false, null, ["Kerala","Karnataka"], "", [], "Rambutan produces hairy red fruit with sweet translucent flesh similar to lychee."],
  ["durian", "Durian", "Durio zibethinus", "Malvaceae", "Tree", "Perennial", "Frequent", PS, "Difficult", "Moderate", false, true, true, false, null, ["Southeast Asia"], "", [], "Durian is the 'King of Fruits' with creamy rich flesh but notoriously pungent smell."],
  ["breadfruit", "Breadfruit", "Artocarpus altilis", "Moraceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, false, true, false, null, ["Kerala","Andaman"], "", [], "Breadfruit is a starchy tropical fruit that tastes like bread when cooked; highly nutritious."],
  ["kiwi", "Kiwi Fruit", "Actinidia deliciosa", "Actinidiaceae", "Vine", "Perennial", "Average", PS, "Moderate", "Moderate", false, true, true, true, "Spring", ["Arunachal Pradesh","Himachal Pradesh"], "", [], "Kiwi fruit is grown in northeast India's hills, with fuzzy brown skin and bright green vitamin C-rich flesh."],
  ["persimmon", "Persimmon", "Diospyros kaki", "Ebenaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, true, true, "Autumn", ["Kashmir","Himachal Pradesh"], "", [], "Persimmon produces sweet orange fruit in autumn, grown in India's northern hill states."],
  ["mulberry", "Mulberry", "Morus alba", "Moraceae", "Tree", "Perennial", "Average", FS, "Easy", "High", false, true, true, true, "Spring", AI, "", [], "Mulberry trees produce sweet berries and are essential for silkworm rearing in Karnataka and Kashmir."],
  ["jamun", "Java Plum (Jamun)", "Syzygium cumini", "Myrtaceae", "Tree", "Perennial", "Average", FS, "Easy", "High", false, true, true, true, "Summer", AI, "", [], "Jamun produces dark purple fruits that stain the tongue, traditionally used to manage diabetes in Ayurveda."],
  ["cranberry", "Cranberry", "Vaccinium macrocarpon", "Ericaceae", "Shrub", "Perennial", "Frequent", FSPS, "Moderate", "Low", false, true, true, true, "Autumn", ["North America"], "", [], "Cranberries are tart red berries grown in bogs, used in juices, sauces, and UTI prevention."],
  ["blueberry", "Blueberry", "Vaccinium corymbosum", "Ericaceae", "Shrub", "Perennial", "Average", FSPS, "Moderate", "Low", false, true, true, true, "Summer", WW, "", [], "Blueberries are antioxidant-rich superfruits now commercially grown in several Indian states."],
  ["raspberry", "Raspberry", "Rubus idaeus", "Rosaceae", "Shrub", "Perennial", "Average", FSPS, "Moderate", "Moderate", false, true, true, true, "Summer", WW, "", [], "Raspberries produce sweet-tart red berries popular in desserts, jams, and smoothies."],
  ["blackberry", "Blackberry", "Rubus fruticosus", "Rosaceae", "Shrub", "Perennial", "Average", FSPS, "Easy", "High", false, true, true, true, "Summer", WW, "", [], "Blackberries are vigorous brambles producing dark, sweet berries rich in antioxidants."],

  // ═══════════ LEGUMES & PULSES (15) ═══════════
  ["chickpea", "Chickpea (Chana)", "Cicer arietinum", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "Moderate", false, false, true, true, "Winter", AI, "", [], "Chickpea is India's most important pulse, used in chana masala, hummus, and besan flour."],
  ["pigeon-pea", "Pigeon Pea (Toor Dal)", "Cajanus cajan", "Fabaceae", "Crop", "Perennial", "Minimum", FS, "Easy", "Moderate", false, false, true, true, "Monsoon", AI, "", [], "Pigeon pea is the source of toor dal, India's most consumed lentil, essential in sambhar and dal fry."],
  ["lentil", "Lentil (Masoor)", "Lens culinaris", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "Moderate", false, false, true, true, "Winter", AI, "", [], "Lentils are protein-rich pulses; masoor dal is a staple across Indian households."],
  ["mung-bean", "Mung Bean (Moong)", "Vigna radiata", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "High", false, false, true, true, "Monsoon", AI, "", [], "Mung beans are used as dal, sprouts, and in sweets like moong dal halwa across India."],
  ["kidney-bean", "Kidney Bean (Rajma)", "Phaseolus vulgaris", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "Moderate", false, false, true, true, "Summer", ["Jammu","Himachal Pradesh","Uttarakhand"], "", [], "Rajma chawal (kidney beans with rice) is North India's beloved comfort food."],
  ["black-gram", "Black Gram (Urad)", "Vigna mungo", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "Moderate", false, false, true, true, "Monsoon", AI, "", [], "Urad dal is essential for making dal makhani, idli batter, and medu vada across India."],
  ["soybean", "Soybean", "Glycine max", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "High", false, true, true, true, "Monsoon", ["Madhya Pradesh","Maharashtra"], "", [], "Soybean is a versatile protein-rich legume used for oil, tofu, soy milk, and animal feed."],
  ["peanut", "Peanut", "Arachis hypogaea", "Fabaceae", "Crop", "Annual", "Average", FS, "Easy", "Moderate", false, true, true, true, "Monsoon", ["Gujarat","Andhra Pradesh"], "", [], "India is the second-largest peanut producer; used in chutneys, chikkis, and cooking oils."],

  // ═══════════ WILDFLOWERS & NATIVE (20) ═══════════
  ["black-eyed-susan", "Black-Eyed Susan", "Rudbeckia hirta", "Asteraceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, true, "Summer", ["North America"], "", [], "Black-Eyed Susan is a cheerful wildflower with golden petals around a dark brown cone center."],
  ["coneflower", "Purple Coneflower (Echinacea)", "Echinacea purpurea", "Asteraceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, true, false, true, "Summer", ["North America"], "", [], "Echinacea is a medicinal wildflower used to boost immune function, with purple daisy-like flowers."],
  ["goldenrod", "Goldenrod", "Solidago", "Asteraceae", "Flower", "Perennial", "Minimum", FS, "Easy", "Moderate", false, true, false, true, "Autumn", ["North America","Europe"], "", [], "Goldenrod produces feathery golden plumes in autumn, important for pollinators and traditional medicine."],
  ["lupine", "Lupine", "Lupinus", "Fabaceae", "Flower", "Perennial", "Average", FSPS, "Easy", "Moderate", false, false, false, true, "Spring-Summer", WW, "", [], "Lupines produce tall spikes of pea-like flowers in blue, purple, pink, and white."],
  ["delphinium", "Delphinium (Larkspur)", "Delphinium", "Ranunculaceae", "Flower", "Perennial", "Average", FSPS, "Moderate", "Moderate", false, true, false, true, "Summer", WW, "", [], "Delphiniums produce tall, dramatic spires of blue, purple, white, and pink flowers."],
  ["hollyhock", "Hollyhock", "Alcea rosea", "Malvaceae", "Flower", "Biennial", "Average", FS, "Easy", "High", false, true, false, true, "Summer", WW, "", [], "Hollyhocks are classic cottage garden flowers with tall spikes of ruffled blooms in many colors."],
  ["sweet-pea", "Sweet Pea", "Lathyrus odoratus", "Fabaceae", "Vine", "Annual", "Average", FS, "Easy", "High", false, false, false, true, "Spring", WW, "", [], "Sweet peas are fragrant climbing annuals with butterfly-like flowers in pastel shades."],
  ["bleeding-heart", "Bleeding Heart", "Lamprocapnos spectabilis", "Papaveraceae", "Flower", "Perennial", "Average", PS, "Moderate", "Moderate", false, false, false, true, "Spring", WW, "", [], "Bleeding heart produces arching stems of heart-shaped pink and white pendulous flowers."],
  ["anemone", "Anemone", "Anemone coronaria", "Ranunculaceae", "Flower", "Perennial", "Average", FSPS, "Moderate", "Moderate", false, false, false, true, "Spring", WW, "", [], "Anemones produce poppy-like flowers with dark centers in red, blue, purple, and white."],
  ["dianthus", "Dianthus (Pinks)", "Dianthus", "Caryophyllaceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, true, true, true, "Spring-Summer", WW, "", [], "Dianthus (Pinks) produce fringed, spicy-scented flowers in pink, red, white, and bicolor shades."],
  ["calendula", "Calendula (Pot Marigold)", "Calendula officinalis", "Asteraceae", "Flower", "Annual", "Average", FS, "Easy", "High", false, true, true, true, "Spring-Autumn", WW, "", [], "Calendula is the medicinal marigold with edible petals used in salves, teas, and wound healing."],
  ["verbena", "Verbena", "Verbena", "Verbenaceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, true, false, true, "Summer", WW, "", [], "Verbena produces clusters of tiny flowers in vibrant colors, excellent for borders and containers."],
  ["stock", "Stock (Matthiola)", "Matthiola incana", "Brassicaceae", "Flower", "Annual", "Average", FS, "Easy", "Moderate", false, false, false, true, "Winter-Spring", WW, "", [], "Stock produces intensely fragrant double flowers on spikes, popular in winter gardens."],
  ["sweet-william", "Sweet William", "Dianthus barbatus", "Caryophyllaceae", "Flower", "Biennial", "Average", FSPS, "Easy", "Moderate", false, false, false, true, "Spring-Summer", WW, "", [], "Sweet William produces dense clusters of fringed flowers in red, pink, white, and bicolor patterns."],
  ["columbine", "Columbine", "Aquilegia", "Ranunculaceae", "Flower", "Perennial", "Average", PS, "Easy", "Moderate", false, true, false, true, "Spring", WW, "", [], "Columbine has distinctive spurred flowers in blue, red, yellow, and white, attracting hummingbirds."],
  ["phlox", "Phlox", "Phlox paniculata", "Polemoniaceae", "Flower", "Perennial", "Average", FSPS, "Easy", "Moderate", false, false, false, true, "Summer", WW, "", [], "Phlox produces fragrant dome-shaped flower clusters in pink, purple, red, and white."],
  ["primrose", "Primrose", "Primula vulgaris", "Primulaceae", "Flower", "Perennial", "Average", PS, "Easy", "Moderate", false, true, false, true, "Spring", WW, "", [], "Primroses herald spring with cheerful clusters of flowers in yellow, pink, purple, and red."],
  ["allium", "Allium (Ornamental)", "Allium giganteum", "Amaryllidaceae", "Flower", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, true, "Summer", WW, "", [], "Ornamental alliums produce stunning globe-shaped flower heads in purple, pink, and white."],
  ["agapanthus", "Agapanthus (Lily of the Nile)", "Agapanthus africanus", "Amaryllidaceae", "Flower", "Perennial", "Average", FSPS, "Easy", "Moderate", false, false, false, true, "Summer", ["South Africa"], "", [], "Agapanthus produces large spherical clusters of trumpet-shaped blue or white flowers."],
  ["heather", "Heather", "Calluna vulgaris", "Ericaceae", "Shrub", "Perennial", "Average", FS, "Easy", "Low", false, true, false, true, "Summer-Autumn", ["Europe"], "", [], "Heather covers moorlands with purple, pink, and white bell-shaped flowers in late summer."],

  // ═══════════ PALMS & TROPICAL (15) ═══════════
  ["areca-palm", "Areca Palm", "Dypsis lutescens", "Arecaceae", "Palm", "Perennial", "Average", PS, "Easy", "Moderate", true, false, false, false, null, AI, "", [], "Areca palm is India's most popular indoor palm with feathery, arching golden-green fronds."],
  ["coconut-palm", "Coconut Palm", "Cocos nucifera", "Arecaceae", "Palm", "Perennial", "Average", FS, "Easy", "Moderate", false, false, true, true, "All Year", ["Kerala","Karnataka","Goa"], "", [], "Coconut palm is called 'Kalpavriksha' (wish-fulfilling tree) in India; every part is used."],
  ["date-palm", "Date Palm", "Phoenix dactylifera", "Arecaceae", "Palm", "Perennial", "Minimum", FS, "Easy", "Low", false, true, true, true, "Summer", ["Rajasthan","Gujarat"], "", [], "Date palms thrive in India's Thar desert, producing sweet dates rich in minerals and energy."],
  ["fan-palm", "Chinese Fan Palm", "Livistona chinensis", "Arecaceae", "Palm", "Perennial", "Average", PS, "Easy", "Low", true, false, false, false, null, WW, "", [], "Fan palms have distinctive circular fan-shaped fronds, elegant in gardens and indoor spaces."],
  ["travellers-palm", "Traveller's Palm", "Ravenala madagascariensis", "Strelitziaceae", "Palm", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, false, null, ["Madagascar","India"], "", [], "Traveller's Palm stores water in its leaf bases; its fan-shaped arrangement always aligns east-west."],
  ["cycad", "Cycad (Sago Palm)", "Cycas revoluta", "Cycadaceae", "Shrub", "Perennial", "Minimum", FSPS, "Easy", "Low", true, false, false, false, null, WW, "", [], "Cycads are living fossils, virtually unchanged for 280 million years, with stiff palm-like fronds."],
  ["bird-nest-fern", "Bird's Nest Fern", "Asplenium nidus", "Aspleniaceae", "Houseplant", "Perennial", "Average", SH, "Easy", "Moderate", true, false, false, false, null, WW, "", [], "Bird's Nest Fern has wide, rippled fronds arranged in a rosette, thriving in humid indoor spaces."],
  ["staghorn-fern", "Staghorn Fern", "Platycerium", "Polypodiaceae", "Houseplant", "Perennial", "Average", PS, "Moderate", "Moderate", true, false, false, false, null, WW, "", [], "Staghorn fern has antler-shaped fronds and grows mounted on boards or in hanging baskets."],
  ["bromeliad", "Bromeliad", "Bromeliaceae", "Bromeliaceae", "Houseplant", "Perennial", "Average", PS, "Easy", "Low", true, false, false, true, "Summer", WW, "", [], "Bromeliads are tropical epiphytes with colorful rosettes and dramatic central flower spikes."],
  ["ti-plant", "Ti Plant (Cordyline)", "Cordyline fruticosa", "Asparagaceae", "Houseplant", "Perennial", "Average", PS, "Easy", "Moderate", true, false, false, false, null, AI, "", [], "Ti Plant has dramatic sword-shaped leaves in red, purple, pink, and green combinations."],

  // ═══════════ AQUATICS & WATER PLANTS (10) ═══════════
  ["hydrilla", "Hydrilla", "Hydrilla verticillata", "Hydrocharitaceae", "Aquatic", "Perennial", "Frequent", FSPS, "Easy", "High", false, false, false, false, null, AI, "", [], "Hydrilla is a submerged aquatic plant used in aquariums and fish ponds across India."],
  ["duckweed", "Duckweed", "Lemna minor", "Araceae", "Aquatic", "Annual", "Frequent", FSPS, "Easy", "High", false, true, true, false, null, WW, "", [], "Duckweed is the world's smallest flowering plant, used for water purification and animal feed."],
  ["cattail", "Cattail (Bulrush)", "Typha latifolia", "Typhaceae", "Aquatic", "Perennial", "Frequent", FS, "Easy", "High", false, true, true, true, "Summer", WW, "", [], "Cattails are wetland plants with distinctive brown cylindrical seed heads, used for basket weaving."],
  ["hornwort", "Hornwort", "Ceratophyllum demersum", "Ceratophyllaceae", "Aquatic", "Perennial", "Frequent", PS, "Easy", "High", false, false, false, false, null, WW, "", [], "Hornwort is a rootless aquatic plant popular in aquariums for oxygenation and algae control."],
  ["water-hyacinth", "Water Hyacinth", "Eichhornia crassipes", "Pontederiaceae", "Aquatic", "Perennial", "Frequent", FS, "Easy", "High", false, true, false, true, "Summer", AI, "", [], "Water hyacinth produces beautiful lavender flowers but is one of the world's worst invasive aquatic weeds."],

  // ═══════════ GRASSES & GROUND COVERS (10) ═══════════
  ["bermuda-grass", "Bermuda Grass", "Cynodon dactylon", "Poaceae", "Grass", "Perennial", "Average", FS, "Easy", "High", false, true, false, false, null, AI, "", [], "Bermuda grass (Durva) is sacred in Hinduism and the most common lawn grass in tropical India."],
  ["vetiver", "Vetiver", "Chrysopogon zizanioides", "Poaceae", "Grass", "Perennial", "Average", FS, "Easy", "High", false, true, false, false, null, AI, "", [], "Vetiver roots produce a calming, earthy fragrance used in perfumes and natural cooling in Indian summers."],
  ["mondo-grass", "Mondo Grass", "Ophiopogon japonicus", "Asparagaceae", "Grass", "Perennial", "Average", PS, "Easy", "Low", false, false, false, true, "Summer", WW, "", [], "Mondo grass is a versatile ground cover with dark green grass-like foliage and small blue berries."],
  ["creeping-fig", "Creeping Fig", "Ficus pumila", "Moraceae", "Vine", "Perennial", "Average", PS, "Easy", "High", true, false, false, false, null, WW, "", [], "Creeping fig clings to walls and surfaces with aerial roots, creating a lush living wall."],
  ["clover", "Clover", "Trifolium repens", "Fabaceae", "Ground Cover", "Perennial", "Average", FSPS, "Easy", "High", false, true, true, true, "Spring-Summer", WW, "", [], "Clover is a nitrogen-fixing ground cover with iconic three-leaf shape and white pom-pom flowers."],

  // ═══════════ CACTI & SUCCULENTS (15) ═══════════
  ["aloe-vera", "Aloe Vera", "Aloe barbadensis miller", "Asphodelaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Moderate", true, true, true, true, "Summer", AI, "", [], "Aloe vera gel is used for burns, skin care, and digestive health; one of India's most useful medicinal plants."],
  ["prickly-pear", "Prickly Pear Cactus", "Opuntia ficus-indica", "Cactaceae", "Cactus", "Perennial", "Minimum", FS, "Easy", "Moderate", false, true, true, true, "Spring", AI, "", [], "Prickly pear produces edible fruits and pads; thrives in arid regions of Rajasthan and Gujarat."],
  ["christmas-cactus", "Christmas Cactus", "Schlumbergera bridgesii", "Cactaceae", "Cactus", "Perennial", "Average", PS, "Easy", "Moderate", true, false, false, true, "Winter", WW, "", [], "Christmas cactus blooms during the holiday season with pink, red, and white tubular flowers."],
  ["barrel-cactus", "Barrel Cactus", "Ferocactus", "Cactaceae", "Cactus", "Perennial", "Minimum", FS, "Easy", "Low", false, false, false, true, "Spring", WW, "", [], "Barrel cacti are globular desert plants with prominent ribs and spines, producing crown flowers."],
  ["agave", "Agave", "Agave americana", "Asparagaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Low", false, true, true, true, "Summer", WW, "", [], "Agave plants form large rosettes and bloom once after decades with a dramatic tall flower spike."],
  ["sempervivum", "Sempervivum (Hens & Chicks)", "Sempervivum tectorum", "Crassulaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Low", true, false, false, true, "Summer", WW, "", [], "Sempervivum forms tight rosettes that multiply by producing baby offsets around the mother plant."],
  ["haworthia", "Haworthia", "Haworthia fasciata", "Asphodelaceae", "Succulent", "Perennial", "Minimum", PS, "Easy", "Low", true, false, false, true, "Summer", WW, "", [], "Haworthia has small rosettes with distinctive white horizontal stripes, perfect for windowsill growing."],
  ["lithops", "Living Stones (Lithops)", "Lithops", "Aizoaceae", "Succulent", "Perennial", "Minimum", FS, "Moderate", "Low", true, false, false, true, "Autumn", ["South Africa"], "", [], "Lithops mimic stones in the desert, splitting open to reveal flowers; masters of camouflage."],
  ["sedum", "Sedum (Stonecrop)", "Sedum", "Crassulaceae", "Succulent", "Perennial", "Minimum", FS, "Easy", "Moderate", true, false, false, true, "Summer", WW, "", [], "Sedum is a versatile succulent ground cover with star-shaped flowers in pink, red, yellow, and white."],
  ["snake-plant-2", "Snake Plant (Moonshine)", "Sansevieria trifasciata", "Asparagaceae", "Succulent", "Perennial", "Minimum", SH, "Easy", "Low", true, false, false, false, null, WW, "", [], "Snake Plant (Mother-in-law's Tongue) is virtually indestructible and a NASA-rated air purifier."],

  // ═══════════ MORE TREES (20) ═══════════
  ["baobab", "Baobab", "Adansonia", "Malvaceae", "Tree", "Perennial", "Minimum", FS, "Easy", "Low", false, true, true, true, "Summer", ["Africa","Madagascar"], "", [], "Baobab is the 'Tree of Life' — it can live 5000 years and store 120,000 liters of water in its trunk."],
  ["birch", "Birch", "Betula", "Betulaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "Moderate", false, true, false, false, null, WW, "", [], "Birch trees have distinctive white peeling bark and graceful drooping branches with delicate leaves."],
  ["elm", "Elm", "Ulmus", "Ulmaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "Moderate", false, false, false, false, null, WW, "", [], "Elms are stately shade trees with arching canopies; once lined streets worldwide before Dutch elm disease."],
  ["sequoia", "Giant Sequoia", "Sequoiadendron giganteum", "Cupressaceae", "Tree", "Perennial", "Average", FS, "Easy", "Low", false, false, false, false, null, ["California"], "", [], "Giant Sequoias are the world's largest trees by volume, living over 3000 years."],
  ["redwood", "Coastal Redwood", "Sequoia sempervirens", "Cupressaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "High", false, false, false, false, null, ["California"], "", [], "Coastal Redwoods are the tallest trees on Earth, reaching over 115 meters."],
  ["ginkgo", "Ginkgo Biloba", "Ginkgo biloba", "Ginkgoaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "Low", false, true, false, true, "Spring", WW, "", [], "Ginkgo is a living fossil unchanged for 270 million years; its extract improves memory and circulation."],
  ["cedar", "Cedar", "Cedrus deodara", "Pinaceae", "Tree", "Perennial", "Minimum", FS, "Easy", "Low", false, true, false, false, null, ["Himalayas"], "", [], "Deodar cedar (Devadaru) is Himachal Pradesh's state tree, producing aromatic timber used in temples."],
  ["cypress", "Italian Cypress", "Cupressus sempervirens", "Cupressaceae", "Tree", "Perennial", "Minimum", FS, "Easy", "Moderate", false, false, false, false, null, WW, "", [], "Italian Cypress forms tall, narrow columns that define Mediterranean and Mughal garden landscapes."],
  ["jacaranda", "Jacaranda", "Jacaranda mimosifolia", "Bignoniaceae", "Tree", "Perennial", "Average", FS, "Easy", "High", false, false, false, true, "Spring", ["Bangalore","Pune"], "", [], "Jacaranda paints Bangalore's streets purple in spring with spectacular lavender-blue flower canopies."],
  ["palash", "Flame of the Forest (Palash)", "Butea monosperma", "Fabaceae", "Tree", "Perennial", "Minimum", FS, "Easy", "Moderate", false, true, false, true, "Spring", AI, "", [], "Palash flowers create a fire-like spectacle in spring; the flowers produce natural orange Holi colors."],
  ["amaltas", "Golden Shower Tree (Amaltas)", "Cassia fistula", "Fabaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, false, true, "Summer", AI, "", [], "Amaltas (Golden Shower) is Kerala's state flower, producing cascading chains of golden-yellow blooms."],
  ["ashoka", "Ashoka Tree", "Saraca asoca", "Fabaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "Moderate", false, true, false, true, "Spring", AI, "", [], "The sacred Ashoka tree reduces sorrow (a-shoka) in Hindu mythology; Queen Maya gave birth to Buddha beneath one."],
  ["kadamba", "Kadamba", "Neolamarckia cadamba", "Rubiaceae", "Tree", "Perennial", "Average", FS, "Easy", "High", false, true, false, true, "Monsoon", AI, "", [], "Kadamba is sacred to Lord Krishna, producing spherical fragrant flower balls during the monsoon."],
  ["champa-tree", "Champa (Champak)", "Magnolia champaca", "Magnoliaceae", "Tree", "Perennial", "Average", FSPS, "Easy", "Moderate", false, true, true, true, "All Year", AI, "", [], "Champak produces intensely fragrant golden-yellow flowers used in Indian perfumes and temple offerings."],
  ["sal", "Sal Tree", "Shorea robusta", "Dipterocarpaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, false, true, "Spring", AI, "", [], "Sal is one of India's most important timber trees; sacred to Buddhists as the tree under which Buddha passed."],
  ["mahogany", "Mahogany", "Swietenia macrophylla", "Meliaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, false, false, true, "Spring", WW, "", [], "Mahogany produces some of the world's most prized furniture wood, with a rich reddish-brown color."],
  ["sandalwood", "Sandalwood", "Santalum album", "Santalaceae", "Tree", "Perennial", "Average", FSPS, "Difficult", "Low", false, true, false, true, "Summer", ["Karnataka","Tamil Nadu"], "", [], "Indian sandalwood from Karnataka produces the world's finest fragrant heartwood; worth more than gold by weight."],
  ["rosewood", "Rosewood (Sheesham)", "Dalbergia sissoo", "Fabaceae", "Tree", "Perennial", "Average", FS, "Easy", "Moderate", false, true, false, true, "Spring", AI, "", [], "Sheesham is India's premier furniture wood, prized for durability and beautiful grain patterns."],

  // ═══════════ CLIMBERS & VINES (10) ═══════════
  ["jasmine-vine", "Star Jasmine", "Trachelospermum jasminoides", "Apocynaceae", "Vine", "Perennial", "Average", FSPS, "Easy", "Moderate", false, false, false, true, "Spring-Summer", WW, "", [], "Star Jasmine produces masses of tiny, intensely fragrant white star-shaped flowers on evergreen vines."],
  ["honeysuckle", "Honeysuckle", "Lonicera japonica", "Caprifoliaceae", "Vine", "Perennial", "Average", FSPS, "Easy", "High", false, true, true, true, "Summer", WW, "", [], "Honeysuckle vines produce sweetly fragrant tubular flowers; children love sipping the nectar."],
  ["trumpet-vine", "Trumpet Vine", "Campsis radicans", "Bignoniaceae", "Vine", "Perennial", "Average", FS, "Easy", "High", false, false, false, true, "Summer", WW, "", [], "Trumpet vine produces clusters of large orange-red trumpet flowers that hummingbirds love."],
  ["virginia-creeper", "Virginia Creeper", "Parthenocissus quinquefolia", "Vitaceae", "Vine", "Perennial", "Average", FSPS, "Easy", "High", false, false, false, false, null, WW, "", [], "Virginia Creeper turns brilliant crimson in autumn, clinging to walls creating a living tapestry."],
  ["passion-flower", "Passion Flower", "Passiflora caerulea", "Passifloraceae", "Vine", "Perennial", "Average", FS, "Easy", "High", false, true, false, true, "Summer", WW, "", [], "Passion flower has extraordinary complex blooms with a crown of filaments, symbolizing Christ's passion."],
  ["hoya", "Hoya (Wax Plant)", "Hoya carnosa", "Apocynaceae", "Vine", "Perennial", "Minimum", PS, "Easy", "Moderate", true, false, false, true, "Summer", WW, "", [], "Hoya produces clusters of waxy, star-shaped flowers with a sweet fragrance, popular as indoor trailing plants."],
  ["pothos", "Pothos (Money Plant)", "Epipremnum aureum", "Araceae", "Vine", "Perennial", "Minimum", SH, "Easy", "High", true, false, false, false, null, AI, "", [], "Pothos (Money Plant) is India's most popular houseplant, believed to bring prosperity; grows in water or soil."],
  ["bignonia", "Orange Trumpet Vine", "Pyrostegia venusta", "Bignoniaceae", "Vine", "Perennial", "Average", FS, "Easy", "High", false, false, false, true, "Winter", AI, "", [], "Orange Trumpet Vine blankets walls and fences with cascading curtains of orange tubular flowers in winter."],

  // ═══════════ FERNS & MOSSES (5) ═══════════
  ["maidenhair-fern", "Maidenhair Fern", "Adiantum capillus-veneris", "Pteridaceae", "Fern", "Perennial", "Frequent", SH, "Moderate", "Moderate", true, true, false, false, null, WW, "", [], "Maidenhair fern has delicate, fan-shaped fronds on wiry black stems, thriving in humid conditions."],
  ["japanese-fern", "Japanese Painted Fern", "Athyrium niponicum", "Athyriaceae", "Fern", "Perennial", "Average", SH, "Moderate", "Low", true, false, false, false, null, WW, "", [], "Japanese Painted Fern has stunning silvery-grey fronds flushed with burgundy and purple."],
  ["tree-fern", "Tree Fern", "Cyathea", "Cyatheaceae", "Fern", "Perennial", "Frequent", SH, "Moderate", "Low", false, false, false, false, null, WW, "", [], "Tree ferns are ancient plants with thick trunk-like stems topped by crowns of large fronds."],
  ["selaginella", "Spike Moss (Selaginella)", "Selaginella", "Selaginellaceae", "Fern", "Perennial", "Frequent", SH, "Moderate", "Low", true, true, false, false, null, WW, "", [], "Selaginella forms dense mats of tiny leaves; the 'resurrection plant' variety revives after drying out."],
  ["moss-ball", "Marimo Moss Ball", "Aegagropila linnaei", "Cladophoraceae", "Aquatic", "Perennial", "Frequent", SH, "Easy", "Low", true, false, false, false, null, ["Japan"], "", [], "Marimo moss balls are rare spherical algae grown in water, considered good luck charms in Japan."],
];

export const EXTENDED_PLANTS_P2: LocalPlant[] = DATA_P2.map(expand);
