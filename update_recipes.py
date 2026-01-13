
import json
import random

colors = ['orange', 'green', 'red', 'blue', 'yellow', 'purple']

with open('/Users/dwicaksono/Desktop/ramadhan-quest/src/data/recipes.json', 'r') as f:
    data = json.load(f)

for recipe in data:
    color = random.choice(colors)
    text = recipe['name'].split(' ')[0]
    recipe['imageUrl'] = f"https://placehold.co/600x400/{color}/white?text={text}"

with open('/Users/dwicaksono/Desktop/ramadhan-quest/src/data/recipes.json', 'w') as f:
    json.dump(data, f, indent=2)
