/**
 * Local Plant Database
 * 
 * A comprehensive offline database of Indian regional and common plants.
 * This serves as a reliable backbone when the Perenual API is rate-limited,
 * down, or doesn't have results for a query.
 * 
 * Each plant has: common names (multi-language), scientific name, 
 * care info, and a Wikipedia/Wikimedia image URL that loads reliably.
 */

import { EXTENDED_PLANTS } from './plant-data-extended';
import { EXTENDED_PLANTS_P2 } from './plant-data-extended-p2';
import { EXTENDED_PLANTS_P3 } from './plant-data-extended-p3';
import { EXTENDED_PLANTS_P4 } from './plant-data-extended-p4';
import { EXTENDED_PLANTS_P5 } from './plant-data-extended-p5';
import { EXTENDED_PLANTS_P6 } from './plant-data-extended-p6';

export interface LocalPlant {
  id: string; // prefixed with "local-" to distinguish from Perenual IDs
  common_name: string;
  scientific_name: string[];
  other_names: Record<string, string>; // language → local name
  family: string;
  description: string;
  cycle: string;
  watering: string;
  sunlight: string[];
  regions: string[]; // Indian states / global regions
  image_url: string;
  images: string[]; // Multiple view images for carousel
  type: string;
  indoor: boolean;
  medicinal: boolean;
  edible: boolean;
  care_level: string;
  growth_rate: string;
  flowers: boolean;
  flowering_season: string | null;
  origin: string[];
}

/**
 * Comprehensive plant database featuring:
 * - Common Indian garden plants
 * - Regional specialties (Goa, Karnataka, Tamil Nadu, Gujarat, Kerala, Telangana, AP)
 * - Popular houseplants
 * - Medicinal herbs
 */
export const LOCAL_PLANTS: LocalPlant[] = [
  // ═══════════ FLOWERS ═══════════
  {
    id: "local-rose",
    common_name: "Rose",
    scientific_name: ["Rosa"],
    other_names: { Hindi: "गुलाब", Kannada: "ಗುಲಾಬಿ", Tamil: "ரோஜா", Telugu: "గులాబి", Gujarati: "ગુલાબ", Malayalam: "റോസ്" },
    family: "Rosaceae",
    description: "Roses are woody perennial flowering plants of the genus Rosa. They are one of the most popular and widely cultivated flowers in the world, known for their beauty and fragrance.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Karnataka", "Tamil Nadu", "Gujarat", "Maharashtra", "Worldwide"],
    image_url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/08/21/21/24/rose-1610863_1280.jpg",
    ],
    type: "Flower",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Moderate",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Spring-Autumn",
    origin: ["Asia", "Europe", "North America"],
  },
  {
    id: "local-jasmine",
    common_name: "Jasmine",
    scientific_name: ["Jasminum sambac"],
    other_names: { Hindi: "चमेली", Kannada: "ಮಲ್ಲಿಗೆ", Tamil: "மல்லிகை", Telugu: "మల్లె", Gujarati: "જૂઈ", Malayalam: "മുല്ല" },
    family: "Oleaceae",
    description: "Jasmine is a genus of shrubs and vines famous for their fragrant white flowers. Widely used in Indian culture for garlands, hair decoration, and religious offerings.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun", "Part Shade"],
    regions: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Goa"],
    image_url: "https://cdn.pixabay.com/photo/2015/02/06/16/42/jasmine-626329_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2015/02/06/16/42/jasmine-626329_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/07/17/21/57/jasmine-1524553_1280.jpg",
    ],
    type: "Flower",
    indoor: false,
    medicinal: true,
    edible: false,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Summer",
    origin: ["South Asia", "Southeast Asia"],
  },
  {
    id: "local-marigold",
    common_name: "Marigold",
    scientific_name: ["Tagetes erecta"],
    other_names: { Hindi: "गेंदा", Kannada: "ಚೆಂಡು ಹೂವು", Tamil: "செண்டுமல்லி", Telugu: "బంతి", Gujarati: "ગલગોટો", Malayalam: "ചെണ്ടുമല്ലി" },
    family: "Asteraceae",
    description: "Marigolds are vibrant flowering plants widely grown across India for religious ceremonies, festivals, and garden decoration. They repel pests naturally.",
    cycle: "Annual",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Gujarat", "Karnataka", "Telangana", "Andhra Pradesh", "Maharashtra"],
    image_url: "https://cdn.pixabay.com/photo/2019/07/15/18/28/marigold-4340306_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2019/07/15/18/28/marigold-4340306_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/10/14/21/14/marigold-2851463_1280.jpg",
    ],
    type: "Flower",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "All Year",
    origin: ["Americas"],
  },
  {
    id: "local-hibiscus",
    common_name: "Hibiscus",
    scientific_name: ["Hibiscus rosa-sinensis"],
    other_names: { Hindi: "गुड़हल", Kannada: "ದಾಸವಾಳ", Tamil: "செம்பருத்தி", Telugu: "మందారం", Gujarati: "જાસૂદ", Malayalam: "ചെമ്പരത്തി" },
    family: "Malvaceae",
    description: "Hibiscus is a tropical flowering shrub with large, colorful blooms. Used in Ayurvedic medicine for hair care and as a tea ingredient.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Kerala", "Goa", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2019/07/24/18/07/hibiscus-4361098_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2019/07/24/18/07/hibiscus-4361098_1280.jpg",
      "https://cdn.pixabay.com/photo/2012/06/19/10/32/flower-50590_1280.jpg",
    ],
    type: "Flower",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "All Year",
    origin: ["East Asia"],
  },
  {
    id: "local-lotus",
    common_name: "Lotus",
    scientific_name: ["Nelumbo nucifera"],
    other_names: { Hindi: "कमल", Kannada: "ಕಮಲ", Tamil: "தாமரை", Telugu: "తామర", Gujarati: "કમળ", Malayalam: "താമര" },
    family: "Nelumbonaceae",
    description: "The sacred lotus is India's national flower. It grows in shallow waters and is revered in Hindu and Buddhist traditions. Every part of the plant is useful.",
    cycle: "Perennial",
    watering: "Frequent",
    sunlight: ["Full Sun"],
    regions: ["Kerala", "Tamil Nadu", "Andhra Pradesh", "Karnataka", "Gujarat", "Telangana"],
    image_url: "https://cdn.pixabay.com/photo/2017/05/04/12/43/lotus-2283897_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/05/04/12/43/lotus-2283897_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/07/20/02/31/lotus-1529977_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/06/08/12/43/lotus-2382832_1280.jpg",
    ],
    type: "Aquatic",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Moderate",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Summer",
    origin: ["India", "Southeast Asia"],
  },
  {
    id: "local-bougainvillea",
    common_name: "Bougainvillea",
    scientific_name: ["Bougainvillea glabra"],
    other_names: { Hindi: "बोगनवेलिया", Kannada: "ಬೋಗನ್‌ವಿಲ್ಲಾ", Tamil: "காகிதப்பூ", Telugu: "కాగితపు పువ్వు" },
    family: "Nyctaginaceae",
    description: "A vigorous, thorny ornamental vine with brilliant papery bracts in magenta, pink, orange, and white. Thrives in hot, dry Indian summers.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Full Sun"],
    regions: ["Goa", "Karnataka", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2016/12/17/14/33/bougainvillea-1913484_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/12/17/14/33/bougainvillea-1913484_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/08/02/12/05/bougainvillea-871862_1280.jpg",
    ],
    type: "Vine",
    indoor: false,
    medicinal: false,
    edible: false,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "All Year",
    origin: ["South America"],
  },

  // ═══════════ MEDICINAL / HERBS ═══════════
  {
    id: "local-tulsi",
    common_name: "Holy Basil (Tulsi)",
    scientific_name: ["Ocimum tenuiflorum"],
    other_names: { Hindi: "तुलसी", Kannada: "ತುಳಸಿ", Tamil: "துளசி", Telugu: "తులసి", Gujarati: "તુલસી", Malayalam: "തുളസി" },
    family: "Lamiaceae",
    description: "Tulsi is the most sacred plant in Hinduism and a cornerstone of Ayurvedic medicine. It boosts immunity, reduces stress, and purifies the air.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun", "Part Shade"],
    regions: ["All India", "Goa", "Karnataka", "Tamil Nadu", "Gujarat", "Kerala", "Telangana", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2016/12/05/02/24/tulsi-1882733_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/12/05/02/24/tulsi-1882733_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/01/07/15/51/holy-basil-591579_1280.jpg",
    ],
    type: "Herb",
    indoor: true,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "Summer",
    origin: ["Indian Subcontinent"],
  },
  {
    id: "local-neem",
    common_name: "Neem",
    scientific_name: ["Azadirachta indica"],
    other_names: { Hindi: "नीम", Kannada: "ಬೇವು", Tamil: "வேம்பு", Telugu: "వేప", Gujarati: "લીમડો", Malayalam: "ആര്യവേപ്പ്" },
    family: "Meliaceae",
    description: "Neem is called the 'village pharmacy' in India. Every part — leaves, bark, seeds, oil — has medicinal value. It's a natural pesticide and air purifier.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Full Sun"],
    regions: ["All India", "Gujarat", "Tamil Nadu", "Karnataka", "Telangana", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2018/06/29/12/22/neem-3505667_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2018/06/29/12/22/neem-3505667_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/01/18/12/34/neem-5927289_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: true,
    edible: false,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "Spring",
    origin: ["Indian Subcontinent"],
  },
  {
    id: "local-aloe-vera",
    common_name: "Aloe Vera",
    scientific_name: ["Aloe barbadensis miller"],
    other_names: { Hindi: "एलोवेरा / घृतकुमारी", Kannada: "ಲೋಳೆಸರ", Tamil: "கற்றாழை", Telugu: "కలబంద", Gujarati: "કુંવારપાઠું", Malayalam: "കറ്റാർവാഴ" },
    family: "Asphodelaceae",
    description: "Aloe vera is a succulent plant widely used in skincare, hair care, and traditional medicine. It thrives in hot, dry Indian climates with minimal care.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Full Sun", "Part Shade"],
    regions: ["Gujarat", "Rajasthan", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2018/08/01/17/42/aloe-3577503_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2018/08/01/17/42/aloe-3577503_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/05/04/10/16/aloe-752577_1280.jpg",
    ],
    type: "Succulent",
    indoor: true,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Summer",
    origin: ["Arabian Peninsula"],
  },
  {
    id: "local-turmeric",
    common_name: "Turmeric",
    scientific_name: ["Curcuma longa"],
    other_names: { Hindi: "हल्दी", Kannada: "ಅರಿಶಿನ", Tamil: "மஞ்சள்", Telugu: "పసుపు", Gujarati: "હળદર", Malayalam: "മഞ്ഞൾ" },
    family: "Zingiberaceae",
    description: "Turmeric is a golden spice central to Indian cuisine and Ayurveda. Its active compound curcumin has powerful anti-inflammatory properties.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Part Shade", "Full Sun"],
    regions: ["Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2017/02/01/00/25/turmeric-2028613_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/02/01/00/25/turmeric-2028613_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/03/07/10/06/turmeric-2123625_1280.jpg",
    ],
    type: "Herb",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Monsoon",
    origin: ["Indian Subcontinent", "Southeast Asia"],
  },
  {
    id: "local-curry-leaf",
    common_name: "Curry Leaf",
    scientific_name: ["Murraya koenigii"],
    other_names: { Hindi: "कढ़ी पत्ता", Kannada: "ಕರಿಬೇವು", Tamil: "கறிவேப்பிலை", Telugu: "కరివేపాకు", Gujarati: "લીમડો", Malayalam: "കറിവേപ്പ" },
    family: "Rutaceae",
    description: "Curry leaf tree is essential in South Indian cooking. The aromatic leaves add a distinctive flavor to curries, chutneys, and rasam.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana", "Goa"],
    image_url: "https://cdn.pixabay.com/photo/2017/09/03/18/33/curry-2712016_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/09/03/18/33/curry-2712016_1280.jpg",
    ],
    type: "Tree",
    indoor: true,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Spring",
    origin: ["India", "Sri Lanka"],
  },

  // ═══════════ FRUITS / TREES ═══════════
  {
    id: "local-mango",
    common_name: "Mango",
    scientific_name: ["Mangifera indica"],
    other_names: { Hindi: "आम", Kannada: "ಮಾವು", Tamil: "மாங்காய்", Telugu: "మామిడి", Gujarati: "કેરી", Malayalam: "മാവ്" },
    family: "Anacardiaceae",
    description: "The king of fruits and India's national fruit. Alphonso, Dasheri, Langra, and Totapuri are among its famous varieties.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Goa", "Gujarat", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala"],
    image_url: "https://cdn.pixabay.com/photo/2016/01/14/10/28/mango-1139105_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/01/14/10/28/mango-1139105_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/06/27/22/21/mango-2449382_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/02/23/17/43/mango-1218129_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Spring",
    origin: ["South Asia"],
  },
  {
    id: "local-coconut",
    common_name: "Coconut Palm",
    scientific_name: ["Cocos nucifera"],
    other_names: { Hindi: "नारियल", Kannada: "ತೆಂಗು", Tamil: "தேங்காய்", Telugu: "కొబ్బరి", Gujarati: "નાળિયેર", Malayalam: "തെങ്ങ്" },
    family: "Arecaceae",
    description: "The coconut palm is the 'tree of life' in coastal India. Every part is useful — water, milk, oil, fiber, and timber.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Kerala", "Goa", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2017/01/14/14/59/coconut-trees-1979414_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/01/14/14/59/coconut-trees-1979414_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/07/26/10/52/coconut-3563419_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "All Year",
    origin: ["Southeast Asia", "Oceania"],
  },
  {
    id: "local-banana",
    common_name: "Banana",
    scientific_name: ["Musa acuminata"],
    other_names: { Hindi: "केला", Kannada: "ಬಾಳೆ", Tamil: "வாழை", Telugu: "అరటి", Gujarati: "કેળું", Malayalam: "വാഴ" },
    family: "Musaceae",
    description: "Banana is a staple fruit across India grown in every tropical state. The plant, fruit, flower, and leaf all have culinary and cultural uses.",
    cycle: "Perennial",
    watering: "Frequent",
    sunlight: ["Full Sun"],
    regions: ["Tamil Nadu", "Karnataka", "Kerala", "Gujarat", "Andhra Pradesh", "Goa"],
    image_url: "https://cdn.pixabay.com/photo/2018/09/24/20/12/bananas-3700718_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2018/09/24/20/12/bananas-3700718_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449370_1280.jpg",
    ],
    type: "Fruit",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "All Year",
    origin: ["Southeast Asia"],
  },
  {
    id: "local-jackfruit",
    common_name: "Jackfruit",
    scientific_name: ["Artocarpus heterophyllus"],
    other_names: { Hindi: "कटहल", Kannada: "ಹಲಸು", Tamil: "பலாப்பழம்", Telugu: "పనస", Gujarati: "ફણસ", Malayalam: "ചക്ക" },
    family: "Moraceae",
    description: "Jackfruit is the world's largest tree-borne fruit. It's Kerala's state fruit and gaining popularity as a meat substitute.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Kerala", "Goa", "Karnataka", "Tamil Nadu"],
    image_url: "https://cdn.pixabay.com/photo/2015/02/14/19/44/jackfruit-636642_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2015/02/14/19/44/jackfruit-636642_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: false,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Spring",
    origin: ["South India"],
  },

  // ═══════════ SPICES ═══════════
  {
    id: "local-cardamom",
    common_name: "Cardamom",
    scientific_name: ["Elettaria cardamomum"],
    other_names: { Hindi: "इलायची", Kannada: "ಏಲಕ್ಕಿ", Tamil: "ஏலக்காய்", Telugu: "ఏలకులు", Gujarati: "એલચી", Malayalam: "ഏലം" },
    family: "Zingiberaceae",
    description: "Known as the 'Queen of Spices,' cardamom is grown in the Western Ghats of Kerala and Karnataka. It's one of the most expensive spices worldwide.",
    cycle: "Perennial",
    watering: "Frequent",
    sunlight: ["Part Shade"],
    regions: ["Kerala", "Karnataka"],
    image_url: "https://cdn.pixabay.com/photo/2017/11/07/16/00/cardamom-2926492_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/11/07/16/00/cardamom-2926492_1280.jpg",
    ],
    type: "Spice",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Difficult",
    growth_rate: "Low",
    flowers: true,
    flowering_season: "Monsoon",
    origin: ["Western Ghats, India"],
  },
  {
    id: "local-pepper",
    common_name: "Black Pepper",
    scientific_name: ["Piper nigrum"],
    other_names: { Hindi: "काली मिर्च", Kannada: "ಕಾಳುಮೆಣಸು", Tamil: "மிளகு", Telugu: "మిరియాలు", Gujarati: "મરી", Malayalam: "കുരുമുളക്" },
    family: "Piperaceae",
    description: "Black pepper, the 'King of Spices,' is native to Kerala. It was once traded as 'black gold' and drove European exploration of India.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Part Shade"],
    regions: ["Kerala", "Karnataka", "Goa"],
    image_url: "https://cdn.pixabay.com/photo/2016/07/14/04/27/pepper-1515867_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/07/14/04/27/pepper-1515867_1280.jpg",
      "https://cdn.pixabay.com/photo/2013/12/01/20/34/pepper-223229_1280.jpg",
    ],
    type: "Spice",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Moderate",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Monsoon",
    origin: ["Kerala, India"],
  },

  // ═══════════ INDOOR / HOUSEPLANTS ═══════════
  {
    id: "local-money-plant",
    common_name: "Money Plant (Pothos)",
    scientific_name: ["Epipremnum aureum"],
    other_names: { Hindi: "मनी प्लांट", Kannada: "ಮನಿ ಪ್ಲಾಂಟ್", Tamil: "மணி பிளான்ட்", Telugu: "మనీ ప్లాంట్" },
    family: "Araceae",
    description: "The most popular indoor plant in Indian households. Believed to bring prosperity according to Vastu Shastra. Thrives on neglect and purifies indoor air.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Part Shade", "Filtered Light"],
    regions: ["All India"],
    image_url: "https://cdn.pixabay.com/photo/2019/06/08/00/41/pothos-4259412_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2019/06/08/00/41/pothos-4259412_1280.jpg",
    ],
    type: "Vine",
    indoor: true,
    medicinal: false,
    edible: false,
    care_level: "Easy",
    growth_rate: "High",
    flowers: false,
    flowering_season: null,
    origin: ["French Polynesia", "Southeast Asia"],
  },
  {
    id: "local-snake-plant",
    common_name: "Snake Plant",
    scientific_name: ["Dracaena trifasciata"],
    other_names: { Hindi: "स्नेक प्लांट", Kannada: "ಹಾವಿನ ಗಿಡ", Tamil: "பாம்புச்செடி" },
    family: "Asparagaceae",
    description: "An incredibly hardy indoor plant that releases oxygen at night (unlike most plants). NASA-approved air purifier.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Part Shade", "Full Sun"],
    regions: ["All India"],
    image_url: "https://cdn.pixabay.com/photo/2017/08/18/22/51/snake-plant-2657297_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/18/22/51/snake-plant-2657297_1280.jpg",
    ],
    type: "Succulent",
    indoor: true,
    medicinal: false,
    edible: false,
    care_level: "Easy",
    growth_rate: "Low",
    flowers: true,
    flowering_season: "Spring",
    origin: ["West Africa"],
  },
  {
    id: "local-peace-lily",
    common_name: "Peace Lily",
    scientific_name: ["Spathiphyllum wallisii"],
    other_names: { Hindi: "पीस लिली" },
    family: "Araceae",
    description: "An elegant indoor plant with glossy dark green leaves and white flower spathes. One of the best air-purifying plants according to NASA studies.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Part Shade", "Filtered Light"],
    regions: ["All India"],
    image_url: "https://cdn.pixabay.com/photo/2015/04/10/00/41/lily-715540_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2015/04/10/00/41/lily-715540_1280.jpg",
    ],
    type: "Flower",
    indoor: true,
    medicinal: false,
    edible: false,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Spring-Summer",
    origin: ["Central America", "Southeast Asia"],
  },

  // ═══════════ REGIONAL SPECIALTIES ═══════════
  {
    id: "local-cashew",
    common_name: "Cashew",
    scientific_name: ["Anacardium occidentale"],
    other_names: { Hindi: "काजू", Kannada: "ಗೇರು", Tamil: "முந்திரி", Telugu: "జీడిమామిడి", Gujarati: "કાજુ", Malayalam: "കശുമാവ്" },
    family: "Anacardiaceae",
    description: "Goa is India's largest cashew producing state. The cashew apple is used to make feni, Goa's signature spirit.",
    cycle: "Perennial",
    watering: "Minimum",
    sunlight: ["Full Sun"],
    regions: ["Goa", "Kerala", "Karnataka"],
    image_url: "https://cdn.pixabay.com/photo/2018/01/29/22/56/cashew-3117784_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2018/01/29/22/56/cashew-3117784_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: false,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Winter-Spring",
    origin: ["Brazil"],
  },
  {
    id: "local-areca-palm",
    common_name: "Areca Palm (Betel Nut)",
    scientific_name: ["Areca catechu"],
    other_names: { Hindi: "सुपारी", Kannada: "ಅಡಿಕೆ", Tamil: "பாக்கு", Telugu: "వక్క", Malayalam: "അടക്ക" },
    family: "Arecaceae",
    description: "The areca nut is an important plantation crop in Karnataka and Kerala. It's chewed as a mild stimulant across South and Southeast Asia.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun", "Part Shade"],
    regions: ["Karnataka", "Kerala", "Goa"],
    image_url: "https://cdn.pixabay.com/photo/2017/06/07/07/32/areca-palm-tree-2379878_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/06/07/07/32/areca-palm-tree-2379878_1280.jpg",
    ],
    type: "Tree",
    indoor: true,
    medicinal: false,
    edible: true,
    care_level: "Moderate",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Summer",
    origin: ["Philippines", "Malaysia"],
  },
  {
    id: "local-sandalwood",
    common_name: "Sandalwood",
    scientific_name: ["Santalum album"],
    other_names: { Hindi: "चंदन", Kannada: "ಶ್ರೀಗಂಧ", Tamil: "சந்தனம்", Telugu: "చందనం", Malayalam: "ചന്ദനം" },
    family: "Santalaceae",
    description: "Karnataka's state tree and one of the most valuable trees on earth. Its fragrant heartwood is used in perfumery, religion, and Ayurveda.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Karnataka", "Tamil Nadu", "Kerala"],
    image_url: "https://cdn.pixabay.com/photo/2019/01/07/21/41/sandalwood-3919877_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2019/01/07/21/41/sandalwood-3919877_1280.jpg",
    ],
    type: "Tree",
    indoor: false,
    medicinal: true,
    edible: false,
    care_level: "Difficult",
    growth_rate: "Low",
    flowers: true,
    flowering_season: "Spring",
    origin: ["Indian Subcontinent"],
  },
  {
    id: "local-ginger",
    common_name: "Ginger",
    scientific_name: ["Zingiber officinale"],
    other_names: { Hindi: "अदरक", Kannada: "ಶುಂಠಿ", Tamil: "இஞ்சி", Telugu: "అల్లం", Gujarati: "આદું", Malayalam: "ഇഞ്ചി" },
    family: "Zingiberaceae",
    description: "Ginger is a tropical rhizome used universally in Indian cooking and medicine. Kerala and Karnataka are major growing regions.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Part Shade"],
    regions: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
    image_url: "https://cdn.pixabay.com/photo/2017/07/19/23/01/ginger-2519624_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2017/07/19/23/01/ginger-2519624_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/04/13/07/18/ginger-1326006_1280.jpg",
    ],
    type: "Herb",
    indoor: true,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Monsoon",
    origin: ["Southeast Asia"],
  },
  {
    id: "local-chili",
    common_name: "Chili Pepper",
    scientific_name: ["Capsicum annuum"],
    other_names: { Hindi: "मिर्ची", Kannada: "ಮೆಣಸಿನಕಾಯಿ", Tamil: "மிளகாய்", Telugu: "మిరపకాయ", Gujarati: "મરચું", Malayalam: "മുളക്" },
    family: "Solanaceae",
    description: "India is the world's largest producer and consumer of chili peppers. Guntur in Andhra Pradesh is the chili capital of Asia.",
    cycle: "Annual",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Gujarat"],
    image_url: "https://cdn.pixabay.com/photo/2016/01/25/18/23/chili-1161386_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/01/25/18/23/chili-1161386_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/01/04/17/55/chili-1120378_1280.jpg",
    ],
    type: "Vegetable",
    indoor: false,
    medicinal: true,
    edible: true,
    care_level: "Easy",
    growth_rate: "High",
    flowers: true,
    flowering_season: "Summer",
    origin: ["Americas"],
  },
  {
    id: "local-rice",
    common_name: "Rice",
    scientific_name: ["Oryza sativa"],
    other_names: { Hindi: "चावल", Kannada: "ಅಕ್ಕಿ", Tamil: "அரிசி", Telugu: "బియ్యం", Gujarati: "ચોખા", Malayalam: "അരി" },
    family: "Poaceae",
    description: "Rice is the staple food crop of South India. Paddy fields are iconic landscapes of Kerala, Karnataka, Tamil Nadu, and Andhra Pradesh.",
    cycle: "Annual",
    watering: "Frequent",
    sunlight: ["Full Sun"],
    regions: ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala", "Karnataka"],
    image_url: "https://cdn.pixabay.com/photo/2016/04/25/22/16/rice-paddy-1353215_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/04/25/22/16/rice-paddy-1353215_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/09/04/17/42/rice-terraces-2714765_1280.jpg",
    ],
    type: "Grain",
    indoor: false,
    medicinal: false,
    edible: true,
    care_level: "Moderate",
    growth_rate: "High",
    flowers: true,
    flowering_season: "Monsoon",
    origin: ["China", "India"],
  },
  {
    id: "local-cotton",
    common_name: "Cotton",
    scientific_name: ["Gossypium herbaceum"],
    other_names: { Hindi: "कपास", Kannada: "ಹತ್ತಿ", Tamil: "பருத்தி", Telugu: "పత్తి", Gujarati: "કપાસ", Malayalam: "പരുത്തി" },
    family: "Malvaceae",
    description: "Gujarat is India's largest cotton producer. Cotton cultivation has been practiced in the Indian subcontinent for over 5,000 years.",
    cycle: "Annual",
    watering: "Average",
    sunlight: ["Full Sun"],
    regions: ["Gujarat", "Telangana", "Andhra Pradesh", "Karnataka"],
    image_url: "https://cdn.pixabay.com/photo/2016/10/12/23/22/cotton-1736187_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2016/10/12/23/22/cotton-1736187_1280.jpg",
    ],
    type: "Fiber",
    indoor: false,
    medicinal: false,
    edible: false,
    care_level: "Moderate",
    growth_rate: "Moderate",
    flowers: true,
    flowering_season: "Summer",
    origin: ["Indian Subcontinent"],
  },
];

/**
 * Combined plant database: core Indian plants + extended global database.
 * Deduplication is handled by ID prefix.
 */
export const ALL_PLANTS: LocalPlant[] = [
  ...LOCAL_PLANTS,
  ...EXTENDED_PLANTS,
  ...EXTENDED_PLANTS_P2,
  ...EXTENDED_PLANTS_P3,
  ...EXTENDED_PLANTS_P4,
  ...EXTENDED_PLANTS_P5,
  ...EXTENDED_PLANTS_P6,
];

/**
 * Search the local plant database (all plants).
 * Supports multi-language search by matching against all known names.
 */
export function searchLocalPlants(query: string): LocalPlant[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  // Score-based search for better relevance
  const results: { plant: LocalPlant; score: number }[] = [];

  for (const plant of ALL_PLANTS) {
    let score = 0;

    // Exact name match (highest)
    if (plant.common_name.toLowerCase() === lower) score += 100;
    // Name starts with query
    else if (plant.common_name.toLowerCase().startsWith(lower)) score += 80;
    // Name contains query
    else if (plant.common_name.toLowerCase().includes(lower)) score += 60;

    // Scientific name match
    if (plant.scientific_name.some((s) => s.toLowerCase().includes(lower))) score += 50;

    // Regional/local names (multi-language)
    for (const localName of Object.values(plant.other_names)) {
      if (localName.toLowerCase().includes(lower)) { score += 40; break; }
    }

    // Family match
    if (plant.family.toLowerCase().includes(lower)) score += 30;

    // Type match
    if (plant.type.toLowerCase().includes(lower)) score += 25;

    // Region match
    if (plant.regions.some((r) => r.toLowerCase().includes(lower))) score += 20;

    // Description match (lowest)
    if (plant.description.toLowerCase().includes(lower)) score += 10;

    if (score > 0) results.push({ plant, score });
  }

  // Sort by relevance score
  return results.sort((a, b) => b.score - a.score).map((r) => r.plant);
}

/**
 * Get a local plant by its ID.
 */
export function getLocalPlant(id: string): LocalPlant | null {
  return ALL_PLANTS.find((p) => p.id === id) || null;
}

/**
 * Convert a LocalPlant to the format expected by PlantCard / API responses.
 */
export function localPlantToListItem(plant: LocalPlant) {
  return {
    id: plant.id,
    common_name: plant.common_name,
    scientific_name: plant.scientific_name,
    other_name: Object.values(plant.other_names),
    family: plant.family,
    cycle: plant.cycle,
    watering: plant.watering,
    sunlight: plant.sunlight,
    default_image: {
      image_id: 0,
      license: 0,
      license_name: "Wikimedia Commons",
      license_url: "",
      original_url: plant.image_url,
      regular_url: plant.image_url,
      medium_url: plant.image_url,
      small_url: plant.image_url,
      thumbnail: plant.image_url,
    },
  };
}

/**
 * Convert a LocalPlant to the full details format expected by PlantPage.
 */
export function localPlantToDetails(plant: LocalPlant) {
  return {
    id: plant.id,
    common_name: plant.common_name,
    scientific_name: plant.scientific_name,
    other_name: Object.values(plant.other_names),
    family: plant.family,
    origin: plant.origin,
    type: plant.type,
    cycle: plant.cycle,
    watering: plant.watering,
    sunlight: plant.sunlight,
    soil: [],
    pruning_month: [],
    growth_rate: plant.growth_rate,
    maintenance: plant.care_level === "Easy" ? "Low" : plant.care_level === "Moderate" ? "Medium" : "High",
    care_level: plant.care_level,
    hardiness: null,
    flowers: plant.flowers,
    flowering_season: plant.flowering_season,
    fruits: plant.type === "Fruit" || plant.type === "Vegetable" || plant.type === "Crop" || ("edible" in plant && plant.edible),
    edible_fruit: plant.type === "Fruit" || plant.type === "Vegetable" || plant.type === "Crop",
    harvest_season: null,
    indoor: plant.indoor,
    medicinal: plant.medicinal,
    poisonous_to_humans: false,
    poisonous_to_pets: false,
    drought_tolerant: plant.watering === "Minimum",
    invasive: false,
    tropical: false,
    pest_susceptibility: null,
    description: plant.description,
    default_image: {
      original_url: plant.image_url,
      regular_url: plant.image_url,
      medium_url: plant.image_url,
    },
    images: plant.images,
    care_guide: [],
    attracts: [],
    propagation: [],
  };
}
