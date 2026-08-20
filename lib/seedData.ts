export const CATEGORIES_SEED = [
  { id: 1, name: 'Fish', slug: 'fish', description: 'Traditional Cambodian fish dishes featuring freshwater river fish and kroeung paste.', count: 2 },
  { id: 2, name: 'Beef', slug: 'beef', description: 'Savory Cambodian beef stir-fries, stews, and Kampot pepper grilled steaks.', count: 2 },
  { id: 3, name: 'Pork', slug: 'pork', description: 'Rich Cambodian pork dishes including marinated Bai Sach Chrouk and slow-grilled pork belly.', count: 2 },
  { id: 4, name: 'Chicken', slug: 'chicken', description: 'Hearty Khmer chicken curries and soothing lemongrass soups.', count: 2 },
  { id: 5, name: 'Noodle', slug: 'noodle', description: 'Classic Cambodian noodle dishes served with herbs, pickles, and traditional dressings.', count: 1 },
];

export const RECIPES_SEED = [
  {
    id: 1,
    slug: 'amok-recipe',
    title: 'Cambodian Fish Amok',
    khmerTitle: 'អាម៉ុកត្រី',
    description: 'Fish Amok is one of the dishes I return to again and again—not because it is famous, but because it holds the soul of Khmer cooking.',
    prepTime: 30,
    cookTime: 15,
    servings: '4-6 servings',
    categorySlug: 'fish',
    categoryName: 'Fish',
    imageUrl: '/assets/recipes/Fish-Amok-Recipe.jpg',
    ingredients: [
      '0.25kg fish fillet (any fish of your preference)',
      '3 tbsp lemongrass paste (Kreoung Paste), 180gr lemongrass slice, 35gr garlic, 16gr galangal, 10gr turmeric, 10gr finger root, 1gr kaffir lime leaf',
      '½ tbsp dried chilies paste, 1/3 tbsp shrimp paste / Prahok (based on preference), 3 tbsp vegetable oil, 1 tbsp fish sauce, 1 tbsp palm sugar, 1 pinch of salt',
      '70ml coconut cream/milk, 125ml chicken soup',
      '½ Kaffir Lime Leaves for garnish, Banana leaf for wrapping (optional), star gooseberry leaf, Steamed Jasmine rice (optional)'
    ],
    instructions: [
      'Prepare all the Kreoung Paste ready with the right amount.',
      'Heat the pan and pour the vegetable oil and wait for it to warm, then put kaffir lime leaves, shrimp paste, dried chilies paste and all Kreoung Paste together to fry until it smells good.',
      'Put fish fillet in and other ingredients, fry them until the fish is cooked.',
      'Pour coconut milk and taste to your preference, then it is done.',
      'Have the banana leaf wrapped with star gooseberry leaf placed inside, then add the ready Amok in.',
      'Add the cooked coconut milk on top of the Amok and make some decoration with sliced lemongrass and chilies.',
      'Amok can be served with Jasmine rice.'
    ],
    tools: [
      { name: 'Hand Blender', url: 'https://www.google.com/search?q=hand+blender&udm=2' },
      { name: 'Large Heavy Pot With Lid', url: 'https://www.google.com/search?q=large+heavy+pot+with+lid&udm=2' },
      { name: 'Measuring Spoons', url: 'https://www.google.com/search?q=measuring+spoons&udm=2' }
    ],
    isFeatured: true,
  },
  {
    id: 2,
    slug: 'beef-lok-lak-recipe',
    title: 'Beef Lok Lak',
    khmerTitle: 'ឆា ឡុកឡាក់',
    description: 'A classic Cambodian stir-fried beef dish with savory garlic, palm sugar, and soy sauce, served over fresh lettuce with sunny-side up eggs and a bold Kampot pepper & lime dipping sauce.',
    prepTime: 20,
    cookTime: 25,
    servings: '6-8 servings',
    categorySlug: 'beef',
    categoryName: 'Beef',
    imageUrl: '/assets/recipes/Beef_Lok_Lak_by_Chef_Nak_1.jpg',
    ingredients: [
      '1 kg beef tenderloin',
      '5 cloves garlic, 200 g onion, 400 g ripe tomatoes, 500 g lettuce',
      '4 eggs',
      '2 tbsp cooking oil, 1.5 tbsp sesame oil',
      '1.5 tbsp palm sugar, 1 tsp sea salt',
      '2 tbsp Chinese cooking wine, 2 tbsp oyster sauce, 2 tbsp soy sauce',
      'Kampot Pepper Sauce: 1.5 tbsp sea salt, 1 tbsp Kampot pepper, 5 tbsp lime juice'
    ],
    instructions: [
      'Fry the eggs sunny-side up and set aside. Finely chop the garlic. Wash lettuce leaves and drain. Thinly slice onion and tomatoes.',
      'Cut beef tenderloin into 2–3 cm cubes. Marinate with sea salt, palm sugar, Chinese cooking wine, oyster sauce, soy sauce, and sesame oil.',
      'Heat a frying pan on high heat with oil. Add garlic and stir until lightly browned. Add marinated beef with marinade and cook 5–7 minutes.',
      'Dry roast Kampot peppercorns in a pan for 2–3 minutes. Grind pepper, place in bowl, add sea salt and lime juice. Serve alongside beef.'
    ],
    tools: [
      { name: 'Frying Pan', url: 'https://www.google.com/search?q=frying+pan&udm=2' },
      { name: 'Mixing Bowl', url: 'https://www.google.com/search?q=mixing+bowl&udm=2' }
    ],
    isFeatured: true,
  },
  {
    id: 3,
    slug: 'terk-kreoung-recipe',
    title: 'Teuk Kreoung (Fusion)',
    khmerTitle: 'ទឹកគ្រឿង',
    description: 'A rich and savory Cambodian crab sauce made with coconut cream, Prahok, and tamarind, served over Khmer rice noodles (Nom Banh Jouk) with an array of fresh side vegetables.',
    prepTime: 20,
    cookTime: 30,
    servings: '4-6 servings',
    categorySlug: 'fish',
    categoryName: 'Fish',
    imageUrl: '/assets/recipes/terkkreng.png',
    ingredients: [
      '500 g crab meat (steamed, pounded, keeping all flavor)',
      '1 litre coconut cream',
      '6 cloves garlic, chopped',
      '70 g dried smoked red chilies paste',
      '270 ml ripe tamarind juice, lime or lemon juice',
      '1.5 tbsp Prahok, 0.5 tbsp salt, 2 tbsp fish sauce, 1 tbsp chicken powder',
      'Nom Banh Jouk (Khmer rice noodles)',
      'Side vegetables: cucumber, eggplant, basil, herbs, water lily'
    ],
    instructions: [
      'Heat garlic, pea eggplant, and dried smoked red chilies in a pot until browned. Transfer to a bowl to cool.',
      'Peel crab meat, remove bones, mash meat in a bowl.',
      'Boil water, add Prahok, stir, and pour Prahok water into crab meat bowl.',
      'Add coconut cream, garlic/chili paste, tamarind juice, salt, fish sauce, chicken powder, and palm sugar. Mix well.',
      'Serve over Nom Banh Jouk with side vegetables.'
    ],
    tools: [
      { name: 'Large Pot', url: 'https://www.google.com/search?q=large+cooking+pot&udm=2' },
      { name: 'Mortar & Pestle', url: 'https://www.google.com/search?q=mortar+and+pestle&udm=2' }
    ],
    isFeatured: true,
  },
  {
    id: 4,
    slug: 'bysrob-recipe',
    title: 'Bai Sach Chrouk (By Srob)',
    khmerTitle: 'បាយសាច់ជ្រូក',
    description: 'A beloved Cambodian breakfast of smoky coconut-marinated pork served over broken jasmine rice with fresh pickled vegetables and a light broth.',
    prepTime: 20,
    cookTime: 30,
    servings: '4 servings',
    categorySlug: 'pork',
    categoryName: 'Pork',
    imageUrl: '/assets/recipes/bysrob.png',
    ingredients: [
      '500 g pork shoulder or loin, thinly sliced',
      '0.5 cups coconut milk',
      '6 garlic cloves, minced',
      '3 tablespoons fish sauce',
      '2 tablespoons oyster sauce',
      '2 cups jasmine rice (preferably broken rice)',
      '150 g daikon radish, julienned',
      '100 g carrots, julienned',
      '2 cups chicken broth with ginger'
    ],
    instructions: [
      'Marinate pork in coconut milk, garlic, fish sauce, oyster sauce, sugar, and pepper for at least 30 min.',
      'Pickle daikon radish and carrots in vinegar, sugar, and salt.',
      'Cook jasmine rice.',
      'Grill pork slices on high heat until charred and cooked through.',
      'Serve pork over rice with pickled vegetables and warm ginger broth.'
    ],
    tools: [
      { name: 'Grill Pan', url: 'https://www.google.com/search?q=grill+pan&udm=2' }
    ],
    isFeatured: false,
  },
  {
    id: 5,
    slug: 'curry-recipe',
    title: 'Khmer Chicken Curry',
    khmerTitle: 'ការីមាន់',
    description: 'Traditional Cambodian dish — a rich and aromatic chicken curry simmered in coconut milk with vegetables and Senteurs d\'Angkor curry spices.',
    prepTime: 15,
    cookTime: 35,
    servings: '4-5 servings',
    categorySlug: 'chicken',
    categoryName: 'Chicken',
    imageUrl: '/assets/recipes/curry.png',
    ingredients: [
      '500 g chicken (cut into pieces)',
      '1 liter coconut milk',
      '3 tsp Curry spices',
      '100 g shallots (chopped), 200 g onions',
      '200 g carrots (sliced), 400 g potatoes (cubed)',
      '100 g green beans',
      '2 stalks lemongrass (bruised), 3 kaffir lime leaves'
    ],
    instructions: [
      'Heat coconut milk, curry spices, and shallots in saucepan for 10 minutes.',
      'Add chicken and cook until sauce thickens.',
      'Add carrots and potatoes, cook for 5 minutes.',
      'Pour remaining coconut milk and boil.',
      'Add green beans and onions. Simmer 20 min. Serve with rice.'
    ],
    tools: [
      { name: 'Frying Pan', url: 'https://www.google.com/search?q=frying+pan&udm=2' }
    ],
    isFeatured: false,
  },
  {
    id: 6,
    slug: 'jrukang-recipe',
    title: 'Moan Ang (Grilled Pork Belly)',
    khmerTitle: 'ជ្រូកអាំង',
    description: 'Khmer-style grilled pork belly rubbed with galangal, lemongrass, and palm sugar — slow-grilled over wood fire until crispy and juicy.',
    prepTime: 20,
    cookTime: 40,
    servings: '4 servings',
    categorySlug: 'pork',
    categoryName: 'Pork',
    imageUrl: '/assets/recipes/jrukang.png',
    ingredients: [
      '800 g pork belly, skin-on',
      '2 lemongrass stalks, minced',
      '30 g galangal, grated',
      '5 garlic cloves, minced',
      '3 tbsp palm sugar, 3 tbsp fish sauce',
      '2 tbsp honey for glazing'
    ],
    instructions: [
      'Score pork belly skin in crosshatch pattern.',
      'Mix lemongrass, galangal, garlic, palm sugar, and fish sauce into paste. Rub over pork and marinate 4 hours.',
      'Grill pork skin side down first on medium heat.',
      'Brush with honey, crisp skin on high heat, slice and serve with jasmine rice.'
    ],
    tools: [
      { name: 'Charcoal Grill', url: 'https://www.google.com/search?q=charcoal+grill&udm=2' }
    ],
    isFeatured: false,
  },
  {
    id: 7,
    slug: 'koang-recipe',
    title: 'Kampot Pepper Beef Steak',
    khmerTitle: 'គោអាំងម្រេចកំពត',
    description: 'Prime beef steak marinated with fragrant Senteurs d\'Angkor Kampot black pepper and sea salt, seared to perfection on a ridged griddle pan.',
    prepTime: 30,
    cookTime: 6,
    servings: '4-5 servings',
    categorySlug: 'beef',
    categoryName: 'Beef',
    imageUrl: '/assets/recipes/sachko.png',
    ingredients: [
      '30 g Senteurs d\'Angkor Kampot black pepper (crushed)',
      '4 x 200 g beef steak',
      'olive oil',
      'sea salt'
    ],
    instructions: [
      'Brush steaks with olive oil. Rub with salt and crushed Kampot pepper. Marinate 30 minutes.',
      'Heat griddle pan until smoking. Fry steaks 2–3 minutes per side for medium rare. Serve immediately.'
    ],
    tools: [
      { name: 'Griddle Pan', url: 'https://www.google.com/search?q=frying+pan&udm=2' }
    ],
    isFeatured: false,
  },
  {
    id: 8,
    slug: 'kola-noodle-recipe',
    title: 'Kola Noodle',
    khmerTitle: 'មីកូឡា',
    description: 'A refreshing Cambodian noodle salad served with shredded vegetables, dried shrimps, roasted peanuts, and a tangy Sweet & Sour Fish Sauce dressing known as Teuk Trey Pa-em.',
    prepTime: 20,
    cookTime: 15,
    servings: '2-4 servings',
    categorySlug: 'noodle',
    categoryName: 'Noodle',
    imageUrl: '/assets/recipes/kola.png',
    ingredients: [
      'Rice noodles',
      'Shredded green papaya, cucumber, carrot',
      'Bean sprouts, Khmer basil leaves',
      'Dried shrimps, ground roasted peanuts',
      'Hard-boiled egg',
      'Teuk Trey Pa-em dressing'
    ],
    instructions: [
      'Simmer rice noodles until soft.',
      'Boil eggs 10 minutes and peel.',
      'Sauté garlic until golden brown. Toss noodles with dark soy sauce, fried garlic, and shredded vegetables.',
      'Make Teuk Trey Pa-em dressing and pour over assembled noodles with peanuts, dried shrimps, and egg.'
    ],
    tools: [
      { name: 'Cooking Pot', url: 'https://www.google.com/search?q=cooking+pot&udm=2' }
    ],
    isFeatured: false,
  },
  {
    id: 9,
    slug: 'ngamngov-recipe',
    title: 'Lemongrass Soup (Ngam Ngov)',
    khmerTitle: 'សម្លង៉ាំង៉ូវ',
    description: 'A refreshing and fragrant Cambodian chicken soup simmered with Senteurs d\'Angkor lemongrass powder, onion, garlic, kaffir lime leaves, and fresh lime juice.',
    prepTime: 5,
    cookTime: 25,
    servings: '4-5 servings',
    categorySlug: 'chicken',
    categoryName: 'Chicken',
    imageUrl: '/assets/recipes/ngamngov.png',
    ingredients: [
      '4 tsp Senteurs d\'Angkor Lemongrass powder',
      '500 g chicken',
      '2 tbsp fish sauce, 2 tbsp sugar, 3 tsp salt',
      '1 clove garlic, 1 medium onion, 3-4 kaffir leaves',
      'fresh basil, 3 green limes'
    ],
    instructions: [
      'In a pot, boil water with garlic, onion, kaffir leaves, and lemongrass powder for 5 minutes.',
      'Add chicken, boil 5 minutes, then simmer on low for 15 minutes.',
      'Season with fish sauce, sugar, salt. Garnish with basil and fresh lime juice. Serve with rice.'
    ],
    tools: [
      { name: 'Pot', url: 'https://www.google.com/search?q=cooking+pot&udm=2' }
    ],
    isFeatured: false,
  },
];

export const REVIEWS_SEED: { [key: number]: any[] } = {
  1: [
    { id: 101, author: 'Chef Nak', rating: 5, comment: 'The authentic kroeung ratio in this recipe makes it taste exactly like traditional Siem Reap Amok! Delicious!', createdAt: '2026-08-15' },
    { id: 102, author: 'Sophea', rating: 5, comment: 'Silky smooth texture and wonderful lemongrass aroma. Highly recommended.', createdAt: '2026-08-18' },
  ],
  2: [
    { id: 103, author: 'Vannak', rating: 5, comment: 'The Kampot pepper dipping sauce is the secret to amazing Lok Lak. Perfect recipe!', createdAt: '2026-08-12' },
  ],
  4: [
    { id: 104, author: 'Borith', rating: 5, comment: 'Reminds me of mornings in Phnom Penh! The pickled radish with coconut pork is unbeatable.', createdAt: '2026-08-10' },
  ],
};
