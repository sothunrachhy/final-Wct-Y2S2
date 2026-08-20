-- Seed initial categories
INSERT INTO categories (id, name, slug, description) VALUES
(1, 'Fish', 'fish', 'Traditional Cambodian fish dishes featuring freshwater river fish and kroeung paste.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO categories (id, name, slug, description) VALUES
(2, 'Beef', 'beef', 'Savory Cambodian beef stir-fries, stews, and Kampot pepper grilled steaks.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO categories (id, name, slug, description) VALUES
(3, 'Pork', 'pork', 'Rich Cambodian pork dishes including marinated Bai Sach Chrouk and slow-grilled pork belly.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO categories (id, name, slug, description) VALUES
(4, 'Chicken', 'chicken', 'Hearty Khmer chicken curries and soothing lemongrass soups.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO categories (id, name, slug, description) VALUES
(5, 'Noodle', 'noodle', 'Classic Cambodian noodle dishes served with herbs, pickles, and traditional dressings.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- Seed initial recipes
INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  1,
  'amok-recipe',
  'Cambodian Fish Amok',
  'អាម៉ុកត្រី',
  'Fish Amok is one of the dishes I return to again and again—not because it is famous, but because it holds the soul of Khmer cooking. The curry is built on kroeung: lemongrass, galangal, turmeric, and kaffir lime, pounded until fragrant and alive. Then we bring in coconut cream, herbs, and a gentle set from egg, steaming everything until the texture becomes silky—almost like a savory custard.',
  30,
  15,
  '4-6 servings',
  1,
  'fish',
  '/assets/recipes/Fish-Amok-Recipe.jpg',
  '[
    "0.25kg fish fillet (any fish of your preference)",
    "3 tbsp lemongrass paste (Kreoung Paste), 180gr lemongrass slice, 35gr garlic, 16gr galangal, 10gr turmeric, 10gr finger root, 1gr kaffir lime leaf",
    "½ tbsp dried chilies paste, 1/3 tbsp shrimp paste / Prahok (based on preference), 3 tbsp vegetable oil, 1 tbsp fish sauce, 1 tbsp palm sugar, 1 pinch of salt",
    "70ml coconut cream/milk, 125ml chicken soup",
    "½ Kaffir Lime Leaves for garnish, Banana leaf for wrapping (optional), star gooseberry leaf, Steamed Jasmine rice (optional)"
  ]'::jsonb,
  '[
    "Prepare all the Kreoung Paste ready with the right amount.",
    "Heat the pan and pour the vegetable oil and wait for it to warm, then put kaffir lime leaves, shrimp paste, dried chilies paste and all Kreoung Paste together to fry until it smells good.",
    "Put fish fillet in and other ingredients, fry them until the fish is cooked.",
    "Pour coconut milk and taste to your preference, then it is done.",
    "Have the banana leaf wrapped with star gooseberry leaf placed inside, then add the ready Amok in.",
    "Add the cooked coconut milk on top of the Amok and make some decoration with sliced lemongrass and chilies.",
    "Amok can be served with Jasmine rice."
  ]'::jsonb,
  '[
    {"name": "Hand Blender", "url": "https://www.google.com/search?q=hand+blender&udm=2"},
    {"name": "Large Heavy Pot With Lid", "url": "https://www.google.com/search?q=large+heavy+pot+with+lid&udm=2"},
    {"name": "Measuring Spoons", "url": "https://www.google.com/search?q=measuring+spoons&udm=2"},
    {"name": "Measuring Cups", "url": "https://www.google.com/search?q=measuring+cups&udm=2"}
  ]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  2,
  'beef-lok-lak-recipe',
  'Beef Lok Lak',
  'ឆា ឡុកឡាក់',
  'A classic Cambodian stir-fried beef dish with savory garlic, palm sugar, and soy sauce, served over fresh lettuce with sunny-side up eggs and a bold Kampot pepper & lime dipping sauce.',
  20,
  25,
  '6-8 servings',
  2,
  'beef',
  '/assets/recipes/Beef_Lok_Lak_by_Chef_Nak_1.jpg',
  '[
    "1 kg beef tenderloin",
    "5 cloves garlic, 200 g onion, 400 g ripe tomatoes, 500 g lettuce",
    "4 eggs",
    "2 tbsp cooking oil, 1.5 tbsp sesame oil",
    "1.5 tbsp palm sugar, 1 tsp sea salt",
    "2 tbsp Chinese cooking wine, 2 tbsp oyster sauce, 2 tbsp soy sauce",
    "Kampot Pepper Sauce: 1.5 tbsp sea salt, 1 tbsp Kampot pepper, 5 tbsp lime juice"
  ]'::jsonb,
  '[
    "Fry the eggs sunny-side up and set aside. Finely chop the garlic. Wash the lettuce leaves and drain well. Thinly slice the onion and tomatoes.",
    "Cut the beef tenderloin into 2–3 cm cubes. Marinate with sea salt, palm sugar, Chinese cooking wine, oyster sauce, soy sauce, and sesame oil. Mix well.",
    "Heat a frying pan on high heat with cooking oil. Add chopped garlic and stir until lightly browned. Add the marinated beef with all the marinade and cook for 5–7 minutes, depending on how rare you want the beef.",
    "Dry roast the Kampot peppercorns in a pan over medium-low heat for 2–3 minutes until fragrant. Grind the roasted pepper, place in a bowl, then add sea salt and lime juice. Mix well and serve alongside the beef."
  ]'::jsonb,
  '[
    {"name": "Frying Pan", "url": "https://www.google.com/search?q=frying+pan&udm=2"},
    {"name": "Mixing Bowl", "url": "https://www.google.com/search?q=mixing+bowl&udm=2"},
    {"name": "Knife & Cutting Board", "url": "https://www.google.com/search?q=knife+cutting+board&udm=2"},
    {"name": "Measuring Spoons", "url": "https://www.google.com/search?q=measuring+spoons&udm=2"}
  ]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  3,
  'terk-kreoung-recipe',
  'Teuk Kreoung (Fusion)',
  'ទឹកគ្រឿង',
  'A rich and savory Cambodian crab sauce made with coconut cream, Prahok, and tamarind, served over Khmer rice noodles (Nom Banh Jouk) with an array of fresh side vegetables.',
  20,
  30,
  '4-6 servings',
  1,
  'fish',
  '/assets/recipes/terkkreng.png',
  '[
    "500 g crab meat (steamed, pounded, keeping all flavor)",
    "1 litre coconut cream",
    "6 cloves garlic, chopped",
    "70 g dried smoked red chilies paste",
    "Pea eggplant (optional)",
    "270 ml ripe tamarind juice, lime or lemon juice (to taste)",
    "1.5 tbsp Prahok, 0.5 tbsp salt, 2 tbsp fish sauce, 1 tbsp chicken powder",
    "Palm sugar or sugar (optional), fried peanut (optional)",
    "Nom Banh Jouk (Khmer rice noodles)",
    "Side vegetables: cucumber, eggplant, basil, herbs, water lily, banana flower, baby corns, edible flower"
  ]'::jsonb,
  '[
    "Heat garlic, pea eggplant, and dried smoked red chilies in a pot until browned. Transfer to a bowl and leave to cool.",
    "Peel the skin off the crab (after steaming, boiling, or grilling), remove the bones, and mash the meat in a bowl. Set aside.",
    "Boil water, then add Prahok and stir until fully mixed. Pour the Prahok water into the mashed crab meat bowl.",
    "Add coconut cream, the cooled garlic and chili mixture, ripe tamarind juice, salt, fish sauce, chicken powder, and palm sugar. Mix everything together thoroughly. Taste and adjust seasoning to your preference. Add lime juice if needed.",
    "Serve over Nom Banh Jouk (Khmer noodles) with your choice of side vegetables. Top with chili for decoration and crushed fried peanuts if desired."
  ]'::jsonb,
  '[
    {"name": "Large Pot", "url": "https://www.google.com/search?q=large+cooking+pot&udm=2"},
    {"name": "Mixing Bowl", "url": "https://www.google.com/search?q=mixing+bowl&udm=2"},
    {"name": "Mortar & Pestle", "url": "https://www.google.com/search?q=mortar+and+pestle&udm=2"},
    {"name": "Measuring Spoons", "url": "https://www.google.com/search?q=measuring+spoons&udm=2"}
  ]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  4,
  'bysrob-recipe',
  'Bai Sach Chrouk (By Srob)',
  'បាយសាច់ជ្រូក',
  'A beloved Cambodian breakfast of smoky coconut-marinated pork served over broken jasmine rice with fresh pickled vegetables and a light broth.',
  20,
  30,
  '4 servings',
  3,
  'pork',
  '/assets/recipes/bysrob.png',
  '[
    "500 g pork shoulder or loin, thinly sliced",
    "0.5 cups coconut milk",
    "6 garlic cloves, minced",
    "3 tablespoons fish sauce",
    "2 tablespoons oyster sauce",
    "2 tablespoons sugar",
    "1 teaspoon black pepper",
    "2 cups jasmine rice (preferably broken rice)",
    "3 cups water (for rice)",
    "150 g daikon radish, julienned",
    "100 g carrots, julienned",
    "4 tablespoons white vinegar",
    "1 tablespoon sugar (for pickles)",
    "0.5 teaspoons salt (for pickles)",
    "2 cups chicken broth",
    "3 spring onions, sliced",
    "3 slices fresh ginger"
  ]'::jsonb,
  '[
    "Marinate the pork: In a bowl, combine 0.5 cups coconut milk, 6 garlic cloves (minced), 3 tablespoons fish sauce, 2 tablespoons oyster sauce, 2 tablespoons sugar, and 1 teaspoon black pepper. Add sliced pork shoulder and coat well. Cover and refrigerate.",
    "Make the pickled vegetables: Mix 4 tbsp white vinegar, 1 tbsp sugar, and 0.5 tsp salt. Toss in daikon radish and carrots. Set aside to pickle.",
    "Cook the rice: Rinse 2 cups jasmine rice, add 3 cups water, bring to a boil, cover and simmer until cooked.",
    "Warm the broth: Gently heat chicken broth with ginger slices. Season with fish sauce and garnish with spring onions.",
    "Grill the pork: Heat grill pan over medium-high heat. Grill marinated pork slices 2-5 min per side until nicely charred.",
    "Rest and slice pork, then serve over warm rice with pickled veggies and broth on the side."
  ]'::jsonb,
  '[
    {"name": "Grill or Grill Pan", "url": "https://www.google.com/search?q=grill+pan&udm=2"},
    {"name": "Mixing Bowl", "url": "https://www.google.com/search?q=mixing+bowl&udm=2"},
    {"name": "Knife & Cutting Board", "url": "https://www.google.com/search?q=knife+cutting+board&udm=2"},
    {"name": "Rice Pot", "url": "https://www.google.com/search?q=rice+pot&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  5,
  'curry-recipe',
  'Khmer Chicken Curry',
  'ការីមាន់',
  'Traditional Cambodian dish — a rich and aromatic chicken curry simmered in coconut milk with vegetables and Senteurs d''Angkor curry spices.',
  15,
  35,
  '4-5 servings',
  4,
  'chicken',
  '/assets/recipes/curry.png',
  '[
    "500 g chicken (cut into pieces)",
    "1 liter coconut milk",
    "3 tsp Curry spices",
    "100 g shallots (chopped), 200 g onions",
    "200 g carrots (sliced), 400 g potatoes (cubed)",
    "100 g green beans",
    "2 stalks lemongrass (bruised), 3 kaffir lime leaves",
    "2 tbsp cooking oil, 1 tbsp fish sauce",
    "Salt to taste",
    "Steamed rice (for serving)"
  ]'::jsonb,
  '[
    "Heat a glass of coconut milk, curry spices, and shallots in a saucepan for 10 minutes.",
    "Add the chicken and cook until the sauce thickens.",
    "Add carrots and potatoes and cook for another 5 minutes.",
    "Pour in the remaining coconut milk and cook until boiling.",
    "Add green beans and onions. Boil for approximately 20 minutes. Add salt to taste. Serve hot with rice."
  ]'::jsonb,
  '[
    {"name": "Frying Pan", "url": "https://www.google.com/search?q=frying+pan&udm=2"},
    {"name": "Mixing Bowl", "url": "https://www.google.com/search?q=mixing+bowl&udm=2"},
    {"name": "Knife & Cutting Board", "url": "https://www.google.com/search?q=knife+cutting+board&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  6,
  'jrukang-recipe',
  'Moan Ang (Grilled Pork Belly)',
  'ជ្រូកអាំង',
  'Khmer-style grilled pork belly rubbed with galangal, lemongrass, and palm sugar — slow-grilled over wood fire until the skin is irresistibly crispy and the meat is juicy.',
  20,
  40,
  '4 servings',
  3,
  'pork',
  '/assets/recipes/jrukang.png',
  '[
    "800 g pork belly, skin-on, sliced into thick strips",
    "2 lemongrass stalks, finely minced",
    "30 g galangal, peeled and grated",
    "5 garlic cloves, minced",
    "3 shallots, finely chopped",
    "1 teaspoon fresh turmeric, grated",
    "3 tablespoons palm sugar",
    "3 tablespoons fish sauce",
    "2 tablespoons oyster sauce",
    "1 tablespoon dark soy sauce",
    "1 teaspoon black pepper",
    "2 kaffir lime leaves, finely shredded",
    "2 tablespoons honey (for glazing)",
    "3 fresh red chili, 4 garlic cloves, 3 tbsp lime juice, 2 tbsp fish sauce, 1 tsp sugar (for dipping sauce)"
  ]'::jsonb,
  '[
    "Score the pork belly skin in a crosshatch pattern.",
    "Mix lemongrass, galangal, garlic, shallots, turmeric, palm sugar, fish sauce, oyster sauce, dark soy, pepper, and kaffir lime into a paste.",
    "Rub marinade all over pork belly. Cover and refrigerate for at least 4 hours.",
    "Make dipping sauce: Whisk chili, garlic, lime juice, fish sauce, and sugar.",
    "Grill low and slow over medium heat, skin side down first.",
    "Brush with honey and crisp the skin over high heat. Rest, slice, and serve with cucumber and jasmine rice."
  ]'::jsonb,
  '[
    {"name": "Charcoal Grill", "url": "https://www.google.com/search?q=charcoal+grill&udm=2"},
    {"name": "Knife & Board", "url": "https://www.google.com/search?q=knife+cutting+board&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  7,
  'koang-recipe',
  'Kampot Pepper Beef Steak',
  'គោអាំងម្រេចកំពត',
  'Prime beef steak marinated with fragrant Senteurs d''Angkor Kampot black pepper and sea salt, seared to perfection on a ridged griddle pan.',
  30,
  6,
  '4-5 servings',
  2,
  'beef',
  '/assets/recipes/sachko.png',
  '[
    "30 g Senteurs d''Angkor Kampot black pepper (crushed)",
    "4 x 200 g beef steak",
    "olive oil",
    "salt"
  ]'::jsonb,
  '[
    "Brush the steaks with olive oil. Rub on both sides with salt and Kampot black pepper. Let it marinate for 30 minutes.",
    "Heat a ridged griddle pan or frying pan until smoking. Fry the steaks for 2-3 minutes each side for medium rare, or cook to your taste. Serve immediately."
  ]'::jsonb,
  '[
    {"name": "Frying Pan", "url": "https://www.google.com/search?q=frying+pan&udm=2"},
    {"name": "Mixing Bowl", "url": "https://www.google.com/search?q=mixing+bowl&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  8,
  'kola-noodle-recipe',
  'Kola Noodle',
  'មីកូឡា',
  'A refreshing Cambodian noodle salad served with shredded vegetables, dried shrimps, roasted peanuts, and a tangy Sweet & Sour Fish Sauce dressing known as Teuk Trey Pa-em.',
  20,
  15,
  '2-4 servings',
  5,
  'noodle',
  '/assets/recipes/kola.png',
  '[
    "Rice noodles",
    "Pickles",
    "Shredded green papaya, shredded cucumber, shredded carrot",
    "Bean sprouts",
    "Mixed fresh Khmer basil leaves",
    "Dark soy sauce, cooking oil",
    "Dried shrimps, ground roasted peanuts",
    "Hard-boiled egg",
    "Chopped garlic, chili flakes",
    "Teuk Trey Pa-em: lime juice / vinegar, sugar, salt, fish sauce, water, garlic"
  ]'::jsonb,
  '[
    "Simmer the rice noodles until soft. Crush peanuts and prepare dried shrimps.",
    "Boil eggs for 10 minutes, cool, peel, and set aside.",
    "Sauté chopped garlic in vegetable oil until golden brown. Toss noodles with dark soy sauce, fried garlic, and shredded vegetables.",
    "Make Teuk Trey Pa-em dressing: boil water, add garlic, sugar, salt, fish sauce, lime juice, and chili flakes.",
    "Assemble noodles with peanuts, dried shrimps, pickles, egg, and drizzle dressing overall."
  ]'::jsonb,
  '[
    {"name": "Pot", "url": "https://www.google.com/search?q=cooking+pot&udm=2"},
    {"name": "Frying Pan", "url": "https://www.google.com/search?q=frying+pan&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

INSERT INTO recipes (id, slug, title, khmer_title, description, prep_time, cook_time, servings, category_id, category_slug, image_url, ingredients, instructions, tools, is_featured) VALUES
(
  9,
  'ngamngov-recipe',
  'Lemongrass Soup (Ngam Ngov)',
  'សម្លង៉ាំង៉ូវ',
  'A refreshing and fragrant Cambodian chicken soup simmered with Senteurs d''Angkor lemongrass powder, onion, garlic, kaffir lime leaves, and fresh lime juice.',
  5,
  25,
  '4-5 servings',
  4,
  'chicken',
  '/assets/recipes/ngamngov.png',
  '[
    "4 tsp Senteurs d''Angkor Lemongrass powder",
    "500 g chicken",
    "water (enough to submerge the chicken)",
    "2 tbsp fish sauce",
    "2 tbsp sugar",
    "3 tsp salt",
    "1 clove of garlic (chopped)",
    "1 medium onion (sliced)",
    "3-4 kaffir leaves",
    "fresh basil (chopped)",
    "3 green limes"
  ]'::jsonb,
  '[
    "In a pot, boil water with garlic, onion, kaffir leaves, and lemongrass powder for 5 minutes.",
    "Add chicken and boil for 5 minutes, then reduce heat to low and simmer for 15 minutes.",
    "Season with fish sauce, sugar, and salt. Garnish with fresh basil and lime squeeze. Serve hot with steamed jasmine rice."
  ]'::jsonb,
  '[
    {"name": "Pot", "url": "https://www.google.com/search?q=cooking+pot&udm=2"},
    {"name": "Knife & Board", "url": "https://www.google.com/search?q=knife+cutting+board&udm=2"}
  ]'::jsonb,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions;

-- Initial reviews seed
INSERT INTO reviews (recipe_id, author, rating, comment) VALUES
(1, 'Chef Nak', 5, 'The authentic kroeung ratio in this recipe makes it taste exactly like traditional Siem Reap Amok! Delicious!'),
(1, 'Sophea', 5, 'Silky smooth texture and wonderful lemongrass aroma. Highly recommended.'),
(2, 'Vannak', 5, 'The Kampot pepper dipping sauce is the secret to amazing Lok Lak. Perfect recipe!'),
(4, 'Borith', 5, 'Reminds me of mornings in Phnom Penh! The pickled radish with coconut pork is unbeatable.');
