function showMood() {
    name = document.getElementById("name").value;
    mood = document.getElementById("mood").value;
    moodString = name + " is " + mood + " today ";
    holder = document.getElementById("holder");

    holder.innerHTML = moodString;
}
