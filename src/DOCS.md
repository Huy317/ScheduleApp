mmkv data:
let profile = storage.getString("currentProfile") -> String of chosen profile for this session
let profileData = storage.getString(profile) -> Return data for that profile
profileData = JSON.parse(profileData) -> don't forget to parse it


Check AddToDo.js for updated task format

structure of 1 Task
const newTask = {
            id: Date.now().toString(), // Unique ID based on current timestamp
            title: , // String
            description: , //String
            date: date.toISOString(), //String
            done: false, // boolean
            priority: priority, //String
            completedDate: "", //String
        }

user need to store:
    email
    password
    the todo list
