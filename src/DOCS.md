mmkv data:
let profile = storage.getString("currentProfile") -> String of chosen profile for this session
let profileData = storage.getString(profile) -> Return data for that profile
profileData = JSON.parse(profileData) -> don't forget to parse it

profileData {
    TodoList{
            title: String,
            description: String,
            date: date.toISOString(),
            priority: String, -- "urgent","normal","low"
    },
    Settings{
        -- Will add later
    }
}
