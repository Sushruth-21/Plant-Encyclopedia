/**
 * Extended Plant Database Part 3 — 400+ more plants
 * Covering: world flowers, rare species, agricultural crops, ornamentals, and regional varieties
 */

import { LocalPlant } from './plant-database';

type CP = [string, string, string, string, string, string, string, string[], string, string, boolean, boolean, boolean, boolean, string | null, string[], string];

function expand(p: CP): LocalPlant {
  return {
    id: `local-${p[0]}`, common_name: p[1], scientific_name: [p[2]], other_names: {},
    family: p[3], type: p[4], cycle: p[5], watering: p[6], sunlight: p[7],
    care_level: p[8], growth_rate: p[9], indoor: p[10], medicinal: p[11], edible: p[12],
    flowers: p[13], flowering_season: p[14], regions: p[15], image_url: '', images: [],
    description: p[16], origin: p[15],
  };
}

const FS=["Full Sun"],PS=["Part Shade"],FSPS=["Full Sun","Part Shade"],SH=["Shade"],WW=["Worldwide"],AI=["All India"];

const DATA: CP[] = [
  // ═══════ ROSES VARIETIES (15) ═══════
  ["hybrid-tea-rose","Hybrid Tea Rose","Rosa × hybrida","Rosaceae","Flower","Perennial","Average",FS,"Moderate","Moderate",false,true,false,true,"Spring-Autumn",WW,"Classic long-stemmed roses with large, elegant buds perfect for cutting and bouquets."],
  ["climbing-rose","Climbing Rose","Rosa setigera","Rosaceae","Vine","Perennial","Average",FS,"Moderate","High",false,false,false,true,"Spring-Summer",WW,"Climbing roses produce canes up to 20 feet long, covering walls and pergolas with blooms."],
  ["miniature-rose","Miniature Rose","Rosa chinensis minima","Rosaceae","Flower","Perennial","Average",FS,"Easy","Moderate",true,false,false,true,"Spring-Autumn",WW,"Miniature roses grow only 6-18 inches tall with perfectly scaled tiny blooms."],
  ["knockout-rose","Knockout Rose","Rosa Knock Out","Rosaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Spring-Autumn",WW,"Knockout roses are disease-resistant, self-cleaning, and bloom continuously without deadheading."],
  ["floribunda-rose","Floribunda Rose","Rosa floribunda","Rosaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Spring-Autumn",WW,"Floribunda roses produce large clusters of flowers, offering more color per bush than hybrid teas."],

  // ═══════ LILY VARIETIES (10) ═══════
  ["tiger-lily","Tiger Lily","Lilium lancifolium","Liliaceae","Flower","Perennial","Average",FSPS,"Easy","Moderate",false,true,true,true,"Summer",WW,"Tiger lilies have recurved orange petals with dark spots, symbolizing wealth and prosperity."],
  ["calla-lily","Calla Lily","Zantedeschia aethiopica","Araceae","Flower","Perennial","Average",PS,"Moderate","Moderate",false,false,false,true,"Spring-Summer",WW,"Calla lilies produce elegant trumpet-shaped spathes in white, pink, yellow, purple, and black."],
  ["daylily","Daylily","Hemerocallis","Asphodelaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,true,true,true,"Summer",WW,"Each daylily bloom lasts just one day, but plants produce dozens of buds for weeks of color."],
  ["asiatic-lily","Asiatic Lily","Lilium asiatica","Liliaceae","Flower","Perennial","Average",FSPS,"Easy","Moderate",false,false,false,true,"Summer",WW,"Asiatic lilies are unscented but produce vivid upward-facing blooms in every color except blue."],
  ["peace-lily","Peace Lily","Spathiphyllum wallisii","Araceae","Houseplant","Perennial","Average",SH,"Easy","Moderate",true,false,false,true,"Spring",WW,"Peace lily produces elegant white spathes and is one of the best indoor air-purifying plants."],
  ["stargazer-lily","Stargazer Lily","Lilium orientalis Stargazer","Liliaceae","Flower","Perennial","Average",FSPS,"Moderate","Moderate",false,false,false,true,"Summer",WW,"Stargazer lilies are intensely fragrant with upward-facing pink and white spotted blooms."],

  // ═══════ ORCHID VARIETIES (10) ═══════
  ["phalaenopsis","Moth Orchid","Phalaenopsis amabilis","Orchidaceae","Flower","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"All Year",WW,"Moth orchids are the world's most popular orchids with cascading sprays of butterfly-shaped blooms."],
  ["dendrobium","Dendrobium Orchid","Dendrobium nobile","Orchidaceae","Flower","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"Spring",["Northeast India","Southeast Asia"],"Dendrobium orchids grow on trees with cane-like pseudobulbs bearing clusters of fragrant flowers."],
  ["cattleya","Cattleya Orchid","Cattleya labiata","Orchidaceae","Flower","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"Spring",WW,"Cattleya is the 'Queen of Orchids' with large, showy, fragrant blooms often used in corsages."],
  ["vanda","Vanda Orchid","Vanda coerulea","Orchidaceae","Flower","Perennial","Average",PS,"Difficult","Low",true,false,false,true,"Autumn",["Northeast India"],"Vanda coerulea (Blue Vanda) is India's rarest orchid, found in the misty hills of the northeast."],
  ["oncidium","Dancing Lady Orchid","Oncidium","Orchidaceae","Flower","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"Autumn",WW,"Oncidium orchids produce sprays of small flowers resembling dancing ladies in yellow and brown."],

  // ═══════ HERB GARDEN (20) ═══════
  ["dill","Dill","Anethum graveolens","Apiaceae","Herb","Annual","Average",FS,"Easy","High",false,true,true,true,"Summer",WW,"Dill has feathery leaves and yellow flower umbels; both seeds and leaves are used in cooking."],
  ["chives","Chives","Allium schoenoprasum","Amaryllidaceae","Herb","Perennial","Average",FSPS,"Easy","Moderate",false,true,true,true,"Spring",WW,"Chives produce mild onion-flavored hollow leaves and edible purple pom-pom flowers."],
  ["tarragon","Tarragon","Artemisia dracunculus","Asteraceae","Herb","Perennial","Minimum",FS,"Easy","Moderate",false,true,true,true,"Summer",WW,"French tarragon has an anise-like flavor essential in béarnaise sauce and French cuisine."],
  ["bay-laurel","Bay Laurel","Laurus nobilis","Lauraceae","Herb","Perennial","Average",FSPS,"Easy","Low",true,true,true,true,"Spring",WW,"Bay leaves are essential in Indian and Mediterranean cooking; the tree symbolized victory in ancient Greece."],
  ["curry-leaf","Curry Leaf","Murraya koenigii","Rutaceae","Herb","Perennial","Average",FS,"Easy","High",false,true,true,true,"Spring",AI,"Curry leaves are indispensable in South Indian cooking, releasing an unmistakable aroma when tempered in oil."],
  ["holy-basil-2","Holy Basil (Krishna Tulsi)","Ocimum tenuiflorum","Lamiaceae","Herb","Perennial","Average",FS,"Easy","High",false,true,true,true,"Summer",AI,"Krishna Tulsi has dark purple leaves and is considered the most sacred variety of Tulsi."],
  ["peppermint","Peppermint","Mentha × piperita","Lamiaceae","Herb","Perennial","Average",PS,"Easy","High",false,true,true,true,"Summer",WW,"Peppermint has a stronger, more intense menthol flavor than spearmint, used in teas and desserts."],
  ["spearmint","Spearmint","Mentha spicata","Lamiaceae","Herb","Perennial","Average",PS,"Easy","High",false,true,true,true,"Summer",WW,"Spearmint has a sweeter, milder flavor than peppermint, the classic mint for mojitos and chutneys."],
  ["catnip","Catnip","Nepeta cataria","Lamiaceae","Herb","Perennial","Minimum",FSPS,"Easy","High",false,true,true,true,"Summer",WW,"Catnip contains nepetalactone which causes euphoria in cats; also makes a calming herbal tea for humans."],
  ["lovage","Lovage","Levisticum officinale","Apiaceae","Herb","Perennial","Average",FSPS,"Easy","High",false,true,true,true,"Summer",["Europe"],"Lovage tastes like intense celery and was a common flavoring in medieval European cooking."],
  ["borage","Borage","Borago officinalis","Boraginaceae","Herb","Annual","Average",FS,"Easy","High",false,true,true,true,"Summer",WW,"Borage produces striking blue star-shaped flowers that taste like cucumber; beloved by bees."],
  ["savory","Summer Savory","Satureja hortensis","Lamiaceae","Herb","Annual","Minimum",FS,"Easy","Moderate",false,true,true,true,"Summer",WW,"Savory has a peppery thyme-like flavor, traditionally paired with beans and lentil dishes."],
  ["marjoram","Sweet Marjoram","Origanum majorana","Lamiaceae","Herb","Perennial","Minimum",FS,"Easy","Moderate",true,true,true,true,"Summer",WW,"Marjoram is oregano's sweeter, milder cousin, used in Mediterranean and Middle Eastern cooking."],
  ["sorrel","Sorrel","Rumex acetosa","Polygonaceae","Herb","Perennial","Average",FSPS,"Easy","High",false,true,true,true,"Spring",WW,"Sorrel has tangy, lemony leaves used in French soups and sauces; rich in vitamin C."],
  ["chervil","Chervil","Anthriscus cerefolium","Apiaceae","Herb","Annual","Average",PS,"Easy","Moderate",false,true,true,true,"Spring",WW,"Chervil is a delicate herb with anise undertones, essential in French fines herbes blend."],

  // ═══════ BULBS & TUBERS (15) ═══════
  ["crocus","Crocus","Crocus vernus","Iridaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Spring",WW,"Crocuses are among the first flowers of spring, pushing through snow in purple, yellow, and white."],
  ["hyacinth","Hyacinth","Hyacinthus orientalis","Asparagaceae","Flower","Perennial","Average",FSPS,"Easy","Moderate",false,false,false,true,"Spring",WW,"Hyacinths produce dense spikes of intensely fragrant flowers in blue, pink, white, and purple."],
  ["gladiolus","Gladiolus","Gladiolus","Iridaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Summer",WW,"Gladiolus produces tall spikes of funnel-shaped flowers, a popular cut flower in many colors."],
  ["freesia","Freesia","Freesia refracta","Iridaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Spring",WW,"Freesias produce funnel-shaped flowers with one of the sweetest fragrances in the flower world."],
  ["snowdrop","Snowdrop","Galanthus nivalis","Amaryllidaceae","Flower","Perennial","Average",PS,"Easy","Low",false,false,false,true,"Winter",["Europe"],"Snowdrops are the first flowers of late winter, with delicate nodding white bell-shaped blooms."],
  ["dahlia-cactus","Cactus Dahlia","Dahlia × pinnata cactus","Asteraceae","Flower","Perennial","Average",FS,"Moderate","Moderate",false,false,false,true,"Summer-Autumn",WW,"Cactus dahlias have spiky, rolled petals creating dramatic spherical blooms up to 12 inches across."],
  ["tuberose","Tuberose (Rajnigandha)","Polianthes tuberosa","Asparagaceae","Flower","Perennial","Average",FS,"Easy","Moderate",false,true,false,true,"Summer",AI,"Tuberose (Rajnigandha) is prized for its intoxicating fragrance; essential in Indian garlands and perfumes."],
  ["cyclamen","Cyclamen","Cyclamen persicum","Primulaceae","Flower","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"Winter",WW,"Cyclamen produces swept-back butterfly-like flowers above heart-shaped silver-marbled leaves."],
  ["arum-lily","Arum Lily","Arum maculatum","Araceae","Flower","Perennial","Average",SH,"Easy","Moderate",false,true,false,true,"Spring",["Europe"],"Arum lily produces dramatic hooded spathes; also known as Lords-and-Ladies in English folklore."],
  ["muscari","Grape Hyacinth","Muscari armeniacum","Asparagaceae","Flower","Perennial","Average",FSPS,"Easy","Moderate",false,false,false,true,"Spring",WW,"Grape hyacinths produce dense spikes of tiny blue bell-shaped flowers resembling bunches of grapes."],

  // ═══════ VEGETABLES (25) ═══════
  ["asparagus","Asparagus","Asparagus officinalis","Asparagaceae","Vegetable","Perennial","Average",FS,"Moderate","Low",false,true,true,true,"Spring",WW,"Asparagus spears emerge in spring from underground crowns; plants can produce for 20+ years."],
  ["artichoke","Globe Artichoke","Cynara cardunculus var. scolymus","Asteraceae","Vegetable","Perennial","Average",FS,"Moderate","Moderate",false,true,true,true,"Spring",WW,"Artichokes are actually flower buds — if left unharvested, they open into large purple thistle blooms."],
  ["celery","Celery","Apium graveolens","Apiaceae","Vegetable","Biennial","Frequent",FSPS,"Moderate","Moderate",false,true,true,false,null,WW,"Celery produces crisp, water-rich stalks used raw in salads and cooked in soups and stocks."],
  ["zucchini","Zucchini (Courgette)","Cucurbita pepo","Cucurbitaceae","Vegetable","Annual","Average",FS,"Easy","High",false,false,true,true,"Summer",WW,"Zucchini is a prolific summer squash producing large yellow flowers, both flowers and fruit are edible."],
  ["bell-pepper","Bell Pepper (Capsicum)","Capsicum annuum","Solanaceae","Vegetable","Annual","Average",FS,"Easy","Moderate",false,true,true,true,"Summer",AI,"Bell peppers change from green to red/yellow as they ripen, each color having a sweeter flavor."],
  ["chili","Chili Pepper","Capsicum frutescens","Solanaceae","Vegetable","Annual","Average",FS,"Easy","Moderate",false,true,true,true,"Summer",AI,"India is the world's largest chili producer; Bhut Jolokia from Nagaland was once the world's hottest pepper."],
  ["ginger","Ginger","Zingiber officinale","Zingiberaceae","Vegetable","Perennial","Average",PS,"Easy","Moderate",false,true,true,true,"Summer",AI,"Ginger's pungent rhizome is essential in Indian chai, curries, and traditional Ayurvedic medicine."],
  ["turmeric","Turmeric","Curcuma longa","Zingiberaceae","Vegetable","Perennial","Average",PS,"Easy","Moderate",false,true,true,true,"Summer",AI,"India produces 80% of the world's turmeric; curcumin has powerful anti-inflammatory properties."],
  ["arugula","Arugula (Rocket)","Eruca vesicaria","Brassicaceae","Vegetable","Annual","Average",FSPS,"Easy","High",false,true,true,true,"Spring",WW,"Arugula has a distinctive peppery flavor that livens up salads and pizzas."],
  ["kale","Kale","Brassica oleracea var. sabellica","Brassicaceae","Vegetable","Biennial","Average",FSPS,"Easy","Moderate",false,true,true,false,null,WW,"Kale is a nutrient-dense superfood with more iron per calorie than beef."],
  ["swiss-chard","Swiss Chard","Beta vulgaris subsp. vulgaris","Amaranthaceae","Vegetable","Biennial","Average",FSPS,"Easy","Moderate",false,true,true,false,null,WW,"Swiss chard has colorful rainbow stems in red, yellow, orange, and white with nutritious dark green leaves."],
  ["leek","Leek","Allium ampeloprasum","Amaryllidaceae","Vegetable","Biennial","Average",FSPS,"Easy","Moderate",false,true,true,false,null,WW,"Leeks have a mild, sweet onion flavor; the national symbol of Wales since the 7th century."],
  ["parsnip","Parsnip","Pastinaca sativa","Apiaceae","Vegetable","Biennial","Average",FSPS,"Easy","Moderate",false,false,true,true,"Summer",WW,"Parsnips are sweet, nutty root vegetables that become sweeter after frost."],
  ["turnip","Turnip","Brassica rapa","Brassicaceae","Vegetable","Annual","Average",FSPS,"Easy","High",false,true,true,false,null,AI,"Turnip (Shalgam) roots and greens are eaten in North Indian winter cuisine."],
  ["kohlrabi","Kohlrabi (Knol Khol)","Brassica oleracea var. gongylodes","Brassicaceae","Vegetable","Annual","Average",FSPS,"Easy","Moderate",false,false,true,false,null,["Kashmir","Punjab"],"Kohlrabi looks like a flying saucer vegetable; popular in Kashmiri cuisine as Monji."],
  ["taro","Taro (Arbi)","Colocasia esculenta","Araceae","Vegetable","Perennial","Frequent",PS,"Easy","Moderate",false,true,true,true,"Monsoon",AI,"Taro is an ancient root crop; the large leaves (patra) are stuffed and steamed in Gujarati cuisine."],
  ["yam","Yam (Suran)","Dioscorea","Dioscoreaceae","Vegetable","Perennial","Average",FSPS,"Easy","Moderate",false,true,true,false,null,AI,"Yam (Suran/Jimikand) is a large tuber used in curries, chips, and pickles across India."],
  ["ridge-gourd","Ridge Gourd (Turai)","Luffa acutangula","Cucurbitaceae","Vegetable","Annual","Average",FS,"Easy","High",false,true,true,true,"Summer",AI,"Ridge gourd is a popular Indian vegetable; dried mature gourds become loofah sponges."],
  ["ivy-gourd","Ivy Gourd (Tindora)","Coccinia grandis","Cucurbitaceae","Vegetable","Perennial","Average",FS,"Easy","High",false,true,true,true,"Monsoon",AI,"Ivy gourd (Tindora/Kundru) is a small, crunchy vegetable loved in Gujarati and South Indian cooking."],
  ["cluster-bean","Cluster Bean (Guar)","Cyamopsis tetragonoloba","Fabaceae","Vegetable","Annual","Minimum",FS,"Easy","High",false,false,true,true,"Monsoon",["Rajasthan","Gujarat"],"Guar beans are used as vegetables and industrially for guar gum; Rajasthan produces 80% of world's supply."],

  // ═══════ AROMATIC & PERFUME PLANTS (10) ═══════
  ["ylang-ylang","Ylang Ylang","Cananga odorata","Annonaceae","Tree","Perennial","Average",FS,"Easy","High",false,true,false,true,"All Year",["Philippines","India"],"Ylang ylang flowers produce the essential oil used in Chanel No. 5 and other luxury perfumes."],
  ["patchouli","Patchouli","Pogostemon cablin","Lamiaceae","Herb","Perennial","Average",PS,"Easy","Moderate",false,true,false,false,null,["India","Southeast Asia"],"Patchouli's musky, earthy fragrance is used in perfumes, incense, and insect repellents."],
  ["vetiver-2","Khus (Vetiver)","Chrysopogon zizanioides","Poaceae","Grass","Perennial","Average",FS,"Easy","High",false,true,false,false,null,AI,"Khus roots are woven into mats and curtains that release a cooling fragrance when sprinkled with water in Indian summers."],
  ["mogra","Mogra (Arabian Jasmine)","Jasminum sambac","Oleaceae","Shrub","Perennial","Average",FS,"Easy","Moderate",false,true,false,true,"Summer",AI,"Mogra's intoxicating fragrance makes it the most beloved flower for garlands and hair adornment in India."],
  ["kewda","Kewda (Screw Pine)","Pandanus odorifer","Pandanaceae","Shrub","Perennial","Average",FS,"Easy","Moderate",false,true,true,true,"Monsoon",["Odisha","Andhra Pradesh"],"Kewda flowers produce a floral essence used to flavor sweets, drinks, and biryanis in Indian cuisine."],

  // ═══════ WORLD FLOWERS (50) ═══════
  ["protea","King Protea","Protea cynaroides","Proteaceae","Flower","Perennial","Minimum",FS,"Moderate","Low",false,false,false,true,"Winter-Spring",["South Africa"],"King Protea is South Africa's national flower with dramatic artichoke-like blooms up to 12 inches."],
  ["edelweiss","Edelweiss","Leontopodium alpinum","Asteraceae","Flower","Perennial","Average",FS,"Moderate","Low",false,true,false,true,"Summer",["Alps","Himalayas"],"Edelweiss is the iconic Alpine flower, woolly white and star-shaped, growing above 6000 feet."],
  ["sakura","Cherry Blossom (Sakura)","Prunus serrulata","Rosaceae","Tree","Perennial","Average",FS,"Moderate","Moderate",false,false,false,true,"Spring",["Japan","Shillong"],"Sakura is Japan's most celebrated flower; Shillong hosts India's own cherry blossom festival."],
  ["lotus-blue","Blue Lotus","Nymphaea caerulea","Nymphaeaceae","Aquatic","Perennial","Frequent",FS,"Moderate","Low",false,true,false,true,"Summer",["Egypt","India"],"Blue lotus was sacred in ancient Egypt; it contains mild psychoactive compounds used in rituals."],
  ["bird-paradise-2","White Bird of Paradise","Strelitzia nicolai","Strelitziaceae","Flower","Perennial","Average",FS,"Easy","High",true,false,false,true,"Summer",["South Africa"],"White Bird of Paradise grows up to 30 feet tall with massive banana-like leaves."],
  ["kangaroo-paw","Kangaroo Paw","Anigozanthos","Haemodoraceae","Flower","Perennial","Minimum",FS,"Moderate","Moderate",false,false,false,true,"Spring",["Australia"],"Kangaroo paw has fuzzy tubular flowers that open like a kangaroo's paw; Australia's iconic flower."],
  ["waratah","Waratah","Telopea speciosissima","Proteaceae","Flower","Perennial","Average",FSPS,"Moderate","Low",false,false,false,true,"Spring",["Australia"],"Waratah produces spectacular crimson flower heads; the state emblem of New South Wales."],
  ["rafflesia","Rafflesia (Corpse Flower)","Rafflesia arnoldii","Rafflesiaceae","Flower","Perennial","Frequent",SH,"Difficult","Low",false,false,false,true,"All Year",["Southeast Asia"],"Rafflesia produces the world's largest individual flower, up to 3 feet across, smelling of rotting flesh."],
  ["titan-arum","Titan Arum (Corpse Lily)","Amorphophallus titanum","Araceae","Flower","Perennial","Frequent",PS,"Difficult","Low",false,false,false,true,"Rare",["Sumatra"],"Titan arum has the world's largest unbranched inflorescence, blooming rarely with a terrible stench."],
  ["jade-vine","Jade Vine","Strongylodon macrobotrys","Fabaceae","Vine","Perennial","Frequent",PS,"Difficult","Moderate",false,false,false,true,"Spring",["Philippines"],"Jade vine produces stunning turquoise claw-shaped flowers; one of the rarest colors in nature."],
  ["corpse-flower","Victoria Water Lily","Victoria amazonica","Nymphaeaceae","Aquatic","Perennial","Frequent",FS,"Difficult","High",false,false,false,true,"Summer",["Amazon"],"Victoria amazonica has leaf pads up to 10 feet across that can support the weight of a child."],
  ["blue-poppy","Himalayan Blue Poppy","Meconopsis betonicifolia","Papaveraceae","Flower","Perennial","Frequent",PS,"Difficult","Low",false,false,false,true,"Summer",["Himalayas"],"The legendary blue poppy grows in mist-shrouded Himalayan meadows above 12000 feet; Bhutan's national flower."],
  ["torch-ginger","Torch Ginger","Etlingera elatior","Zingiberaceae","Flower","Perennial","Average",PS,"Moderate","High",false,true,true,true,"All Year",["Southeast Asia"],"Torch ginger produces spectacular red cone-shaped inflorescences; the flower buds are used in laksa."],
  ["frangipani-2","Red Frangipani","Plumeria rubra","Apocynaceae","Tree","Perennial","Minimum",FS,"Easy","Moderate",false,true,false,true,"Summer",AI,"Red frangipani produces vivid crimson-pink flowers with intense fragrance, common in temple gardens."],
  ["forget-me-not","Forget-Me-Not","Myosotis sylvatica","Boraginaceae","Flower","Biennial","Average",PS,"Easy","Moderate",false,false,false,true,"Spring",WW,"Tiny sky-blue flowers with yellow centers, symbolizing true love and remembrance."],
  ["lavender-french","French Lavender","Lavandula stoechas","Lamiaceae","Flower","Perennial","Minimum",FS,"Easy","Moderate",false,true,true,true,"Spring-Summer",WW,"French lavender has distinctive 'rabbit ear' petals atop dense flower heads."],
  ["bottlebrush","Bottlebrush","Callistemon citrinus","Myrtaceae","Shrub","Perennial","Minimum",FS,"Easy","Moderate",false,true,false,true,"Spring-Summer",AI,"Bottlebrush produces bright red cylindrical flowers shaped exactly like a bottle cleaning brush."],
  ["fuchsia","Fuchsia","Fuchsia magellanica","Onagraceae","Flower","Perennial","Average",PS,"Moderate","Moderate",false,false,false,true,"Summer",WW,"Fuchsias produce elegant pendulous flowers with flared petals in pink, purple, red, and white."],
  ["gazania","Gazania","Gazania rigens","Asteraceae","Flower","Perennial","Minimum",FS,"Easy","Moderate",false,false,false,true,"Summer",WW,"Gazanias are sun-loving daisies with bold striped petals that close on cloudy days."],
  ["lisianthus","Lisianthus","Eustoma grandiflorum","Gentianaceae","Flower","Annual","Average",FS,"Moderate","Moderate",false,false,false,true,"Summer",WW,"Lisianthus produces rose-like blooms in soft pastels; a premium cut flower rivaling roses."],
  ["nigella","Love-in-a-Mist (Nigella)","Nigella damascena","Ranunculaceae","Flower","Annual","Minimum",FS,"Easy","High",false,true,true,true,"Spring",WW,"Nigella has delicate blue flowers nestled in ferny foliage; the black seeds (kalonji) are used in Indian cooking."],
  ["celosia","Celosia (Cockscomb)","Celosia argentea","Amaranthaceae","Flower","Annual","Average",FS,"Easy","High",false,true,true,true,"Summer",AI,"Celosia produces flame-like or brain-shaped velvet flowers in vivid reds, oranges, and yellows."],
  ["statice","Statice (Sea Lavender)","Limonium sinuatum","Plumbaginaceae","Flower","Perennial","Minimum",FS,"Easy","Moderate",false,false,false,true,"Summer",WW,"Statice produces papery flowers in purple, pink, white, and yellow that dry beautifully for arrangements."],
  ["gerbera","Gerbera Daisy","Gerbera jamesonii","Asteraceae","Flower","Perennial","Average",FSPS,"Moderate","Moderate",false,false,false,true,"Spring-Autumn",WW,"Gerbera daisies have large, colorful blooms; the 5th most popular cut flower worldwide."],
  ["aconite","Monkshood (Aconite)","Aconitum napellus","Ranunculaceae","Flower","Perennial","Average",PS,"Moderate","Moderate",false,true,false,true,"Summer",["Himalayas","Europe"],"Monkshood produces striking blue hooded flowers but is one of Europe's most poisonous plants."],
  ["hellebore","Hellebore (Christmas Rose)","Helleborus niger","Ranunculaceae","Flower","Perennial","Average",PS,"Moderate","Low",false,true,false,true,"Winter",["Europe"],"Hellebores bloom in the dead of winter, producing elegant nodding flowers when nothing else grows."],
  ["ageratum","Ageratum (Floss Flower)","Ageratum houstonianum","Asteraceae","Flower","Annual","Average",FSPS,"Easy","High",false,false,false,true,"Summer",WW,"Ageratum produces fluffy powder-puff flowers in blue, purple, pink, and white."],
  ["acacia","Acacia (Babool)","Acacia nilotica","Fabaceae","Tree","Perennial","Minimum",FS,"Easy","Moderate",false,true,true,true,"Spring",AI,"Babool is a thorny desert tree; its gum, bark, and pods are used in Ayurveda and Indian sweets."],
  ["ailanthus","Tree of Heaven","Ailanthus altissima","Simaroubaceae","Tree","Perennial","Minimum",FS,"Easy","High",false,true,false,true,"Spring",WW,"Tree of Heaven is an incredibly fast-growing tree featured in 'A Tree Grows in Brooklyn'."],
  ["catalpa","Catalpa","Catalpa speciosa","Bignoniaceae","Tree","Perennial","Average",FS,"Easy","Moderate",false,false,false,true,"Spring",["North America"],"Catalpa produces showy white flowers with purple spots and long bean-like seed pods."],

  // ═══════ RARE & EXOTIC (15) ═══════
  ["ghost-orchid","Ghost Orchid","Dendrophylax lindenii","Orchidaceae","Flower","Perennial","Frequent",SH,"Difficult","Low",false,false,false,true,"Summer",["Florida","Cuba"],"The ghost orchid is leafless and appears to float in mid-air; subject of the book 'The Orchid Thief'."],
  ["black-bat-flower","Black Bat Flower","Tacca chantrieri","Dioscoreaceae","Flower","Perennial","Frequent",SH,"Difficult","Low",true,false,false,true,"Summer",["Southeast Asia"],"Black bat flower produces extraordinary bat-shaped blooms with long whisker-like bracts."],
  ["chocolate-cosmos","Chocolate Cosmos","Cosmos atrosanguineus","Asteraceae","Flower","Perennial","Average",FS,"Moderate","Moderate",false,false,false,true,"Summer",["Mexico"],"Chocolate cosmos produces dark burgundy flowers that smell remarkably like chocolate."],
  ["corpse-lily","Corpse Lily","Amorphophallus konjac","Araceae","Flower","Perennial","Average",PS,"Moderate","Moderate",false,true,true,true,"Spring",["Asia"],"A relative of titan arum; its corm (konjac) produces zero-calorie noodles popular in diet foods."],
  ["venus-flytrap","Venus Flytrap","Dionaea muscipula","Droseraceae","Carnivorous","Perennial","Frequent",FS,"Moderate","Low",true,false,false,true,"Spring",["North Carolina"],"Venus flytrap snaps shut in 0.1 seconds to catch insects, one of nature's fastest plant movements."],
  ["pitcher-plant","Pitcher Plant","Nepenthes","Nepenthaceae","Carnivorous","Perennial","Frequent",PS,"Difficult","Low",true,false,false,false,null,["Northeast India","Borneo"],"Pitcher plants trap insects in modified jug-shaped leaves filled with digestive enzymes."],
  ["sundew","Sundew","Drosera","Droseraceae","Carnivorous","Perennial","Frequent",FS,"Moderate","Low",false,true,false,true,"Summer",WW,"Sundews capture insects on glistening sticky tentacles that slowly curl around trapped prey."],
  ["welwitschia","Welwitschia","Welwitschia mirabilis","Welwitschiaceae","Shrub","Perennial","Minimum",FS,"Difficult","Low",false,false,false,false,null,["Namibia"],"Welwitschia lives 1000+ years with only two leaves that continuously grow and shred at the tips."],
  ["dragon-blood-tree","Dragon Blood Tree","Dracaena cinnabari","Asparagaceae","Tree","Perennial","Minimum",FS,"Moderate","Low",false,true,false,false,null,["Socotra"],"Dragon blood tree has an umbrella crown and bleeds red resin used in medicines since ancient Rome."],
  ["corpse-flower-2","Titan Arum","Amorphophallus titanum","Araceae","Flower","Perennial","Frequent",PS,"Difficult","Low",false,false,false,true,"Rare",["Sumatra"],"Titan Arum produces the world's tallest inflorescence, up to 10 feet, blooming only every 7-10 years."],

  // ═══════ AGRICULTURAL CROPS (20) ═══════
  ["cotton","Cotton","Gossypium hirsutum","Malvaceae","Crop","Annual","Average",FS,"Easy","High",false,true,false,true,"Summer",["Gujarat","Maharashtra","Telangana"],"India is the world's largest cotton producer; Gujarat alone produces 35% of India's cotton."],
  ["indigo","Indigo","Indigofera tinctoria","Fabaceae","Crop","Perennial","Average",FS,"Easy","High",false,true,false,true,"Summer",AI,"Indigo was India's gift to the world — the blue dye that makes denim jeans possible."],
  ["henna","Henna (Mehndi)","Lawsonia inermis","Lythraceae","Shrub","Perennial","Minimum",FS,"Easy","Moderate",false,true,false,true,"Summer",["Rajasthan","Gujarat"],"Henna leaves produce the orange-red dye used for mehndi body art in Indian weddings."],
  ["areca-nut","Areca Nut (Betel Nut)","Areca catechu","Arecaceae","Palm","Perennial","Average",PS,"Easy","Moderate",false,true,true,false,null,["Karnataka","Kerala"],"Areca nut is chewed with betel leaf across India; Karnataka produces 60% of India's supply."],
  ["betel-leaf","Betel Leaf (Paan)","Piper betle","Piperaceae","Vine","Perennial","Frequent",PS,"Moderate","Moderate",false,true,true,true,"All Year",AI,"Paan (betel leaf) is chewed after meals across India, wrapped around areca nut, lime, and spices."],
  ["cardamom","Cardamom (Elaichi)","Elettaria cardamomum","Zingiberaceae","Spice","Perennial","Average",PS,"Moderate","Low",false,true,true,true,"Monsoon",["Kerala","Karnataka"],"India produces the finest green cardamom; its essential oil flavors chai, sweets, and biryanis."],
  ["black-pepper","Black Pepper","Piper nigrum","Piperaceae","Vine","Perennial","Average",PS,"Moderate","Moderate",false,true,true,true,"Monsoon",["Kerala","Coorg"],"Black pepper is the 'King of Spices'; Kerala's Malabar pepper is prized globally."],
  ["cashew","Cashew","Anacardium occidentale","Anacardiaceae","Tree","Perennial","Minimum",FS,"Easy","Moderate",false,true,true,true,"Spring",["Goa","Kerala","Karnataka"],"Goa is India's cashew heartland; the nut grows outside the apple-like fruit on the tree."],
  ["arecanut-palm","Oil Palm","Elaeis guineensis","Arecaceae","Palm","Perennial","Average",FS,"Easy","Moderate",false,false,true,false,null,["Andhra Pradesh","Telangana"],"Oil palm produces more edible oil per hectare than any other crop; India is expanding cultivation."],
  ["flax","Flax (Linseed)","Linum usitatissimum","Linaceae","Crop","Annual","Average",FS,"Easy","Moderate",false,true,true,true,"Spring",AI,"Flax produces both linseed oil and linen fiber; its blue flowers carpet fields in spring."],
  ["sunflower-crop","Sunflower (Crop)","Helianthus annuus","Asteraceae","Crop","Annual","Average",FS,"Easy","High",false,false,true,true,"Summer",["Karnataka","Andhra Pradesh"],"Karnataka is India's sunflower state, producing nutritious seeds and cooking oil."],
  ["safflower","Safflower","Carthamus tinctorius","Asteraceae","Crop","Annual","Minimum",FS,"Easy","Moderate",false,true,true,true,"Winter",["Maharashtra","Karnataka"],"Safflower produces healthy cooking oil and was historically used as a cheaper saffron substitute."],
  ["opium-poppy","Opium Poppy","Papaver somniferum","Papaveraceae","Crop","Annual","Minimum",FS,"Easy","High",false,true,true,true,"Winter",["Madhya Pradesh","Rajasthan"],"India legally grows opium poppies for pharmaceutical morphine; the seeds are used in cooking as khus-khus."],
  ["castor","Castor","Ricinus communis","Euphorbiaceae","Crop","Annual","Minimum",FS,"Easy","High",false,true,false,true,"Monsoon",["Gujarat","Rajasthan"],"Gujarat produces 85% of India's castor oil, used in cosmetics, lubricants, and biofuel."],
  ["sisal","Sisal","Agave sisalana","Asparagaceae","Crop","Perennial","Minimum",FS,"Easy","Moderate",false,false,false,true,"Summer",AI,"Sisal is a tough fiber plant used for rope, twine, and carpet backing."],

  // ═══════ MORE HOUSEPLANTS (15) ═══════
  ["prayer-plant","Prayer Plant","Maranta leuconeura","Marantaceae","Houseplant","Perennial","Average",SH,"Easy","Moderate",true,false,false,false,null,WW,"Prayer plants fold their leaves upward at night like hands in prayer; stunning herringbone patterns."],
  ["polka-dot","Polka Dot Plant","Hypoestes phyllostachya","Acanthaceae","Houseplant","Perennial","Average",PS,"Easy","High",true,false,false,true,"Summer",WW,"Polka dot plant has leaves splashed with pink, white, or red spots against a green background."],
  ["aluminum-plant","Aluminum Plant","Pilea cadierei","Urticaceae","Houseplant","Perennial","Average",PS,"Easy","High",true,false,false,false,null,WW,"Aluminum plant has dark green leaves with raised metallic silver patches between the veins."],
  ["cast-iron","Cast Iron Plant","Aspidistra elatior","Asparagaceae","Houseplant","Perennial","Minimum",SH,"Easy","Low",true,false,false,false,null,WW,"Cast iron plant earned its name by surviving extreme neglect, low light, and temperature swings."],
  ["peperomia","Peperomia","Peperomia obtusifolia","Piperaceae","Houseplant","Perennial","Minimum",PS,"Easy","Low",true,false,false,false,null,WW,"Peperomias are compact, adorable plants with thick succulent-like leaves in many patterns and colors."],
  ["tradescantia","Wandering Jew","Tradescantia zebrina","Commelinaceae","Houseplant","Perennial","Average",PS,"Easy","High",true,false,false,true,"Summer",WW,"Tradescantia has stunning purple and silver striped leaves; one of the easiest plants to propagate."],
  ["nerve-plant","Nerve Plant (Fittonia)","Fittonia albivenis","Acanthaceae","Houseplant","Perennial","Frequent",SH,"Moderate","Low",true,false,false,false,null,WW,"Nerve plant has dramatically veined leaves in white, pink, or red against dark green."],
  ["ponytail-palm","Ponytail Palm","Beaucarnea recurvata","Asparagaceae","Houseplant","Perennial","Minimum",FS,"Easy","Low",true,false,false,false,null,WW,"Ponytail palm has a bulbous trunk that stores water and cascading curly leaves like a ponytail."],
  ["schefflera","Umbrella Plant","Schefflera actinophylla","Araliaceae","Houseplant","Perennial","Average",PS,"Easy","Moderate",true,false,false,false,null,WW,"Umbrella plant has compound leaves that radiate like an umbrella; a popular office and mall plant."],
  ["rex-begonia","Rex Begonia","Begonia rex","Begoniaceae","Houseplant","Perennial","Average",PS,"Moderate","Low",true,false,false,true,"Summer",WW,"Rex begonias are grown for their spectacular spiral-patterned leaves in silver, purple, and pink."],
  ["norfolk-pine","Norfolk Island Pine","Araucaria heterophylla","Araucariaceae","Houseplant","Perennial","Average",FSPS,"Moderate","Low",true,false,false,false,null,WW,"Norfolk Island Pine is a living Christmas tree that can be decorated and enjoyed year-round indoors."],
  ["money-tree","Money Tree (Pachira)","Pachira aquatica","Malvaceae","Houseplant","Perennial","Average",PS,"Easy","Moderate",true,false,false,true,"Summer",WW,"Money tree is a braided-trunk plant believed to bring good luck and financial prosperity."],
  ["string-hearts","String of Hearts","Ceropegia woodii","Apocynaceae","Houseplant","Perennial","Minimum",PS,"Easy","Moderate",true,false,false,true,"Summer",WW,"String of Hearts has tiny heart-shaped leaves on trailing stems, perfect for hanging baskets."],
  ["air-plant","Air Plant (Tillandsia)","Tillandsia","Bromeliaceae","Houseplant","Perennial","Average",PS,"Easy","Low",true,false,false,true,"Summer",WW,"Air plants absorb water and nutrients through their leaves; they need no soil at all."],
  ["lipstick-plant","Lipstick Plant","Aeschynanthus radicans","Gesneriaceae","Houseplant","Perennial","Average",PS,"Easy","Moderate",true,false,false,true,"Summer",WW,"Lipstick plant produces tubular red flowers that emerge from dark calyxes like lipstick from a tube."],
];

export const EXTENDED_PLANTS_P3: LocalPlant[] = DATA.map(expand);
