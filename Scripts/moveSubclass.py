import os

cur_path = os.path.dirname(__file__)
old_archetype_path = os.path.relpath('../src/')

traits_path = os.path.relpath('../Assets/ClassTraits.json', cur_path)
subclass_path = os.path.relpath('../Assets/Archetypes.json', cur_path)
class_path = os.path.relpath('../src/Classes', cur_path)

with open(traits_path) as file:
    class_data = json.load(file, object_pairs_hook=OrderedDict)

with open(subclass_path) as file:
    subclass_data = json.load(file, object_pairs_hook=OrderedDict)


for key in class_data.keys():
    subclass_dict = subclass_data[key]
    new_dir_path = class_path + "/" + key.capitalize() 
    new_subcl_path = new_dir_path + "/" + "Subclasses"
    
    new_json_path = new_dir_path + "/" + key.capitalize() + ".json"    

    os.mkdir(new_dir_path)


    with open(new_json_path, "w") as new_json:
        json.dump(class_data[key], new_json, indent=2)    

    os.mkdir(new_subcl_path)

    for skey in subclass_dict.keys():
        new_sc_json_path = new_subcl_path + "/" + skey.title().replace(" ", "") + ".json"
        with open(new_sc_json_path, "w") as new_sc_json:
            json.dump(subclass_dict[skey], new_sc_json, indent=2)

    
