document.addEventListener("DOMContentLoaded", function () {
    let entries = [];

    function addEntry() {
        const activity = document.getElementById("activity").value;
        const duration = document.getElementById("duration").value;

        if (activity.trim() === "" || isNaN(duration) || duration <= 0) {
            alert("Please enter valid data.");
            return;
        }

        const entry = {
            activity: activity.trim(),
            duration: parseInt(duration),
        };

        entries.unshift(entry);
        updateEntriesList();

        document.getElementById("activity").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("activity").focus();
    }

    function updateEntriesList() {
        const entriesList = document.getElementById("entries-list");
        const entryCount = document.getElementById("entry-count");

        if (entryCount) {
            entryCount.textContent = entries.length;
        }

        entriesList.innerHTML = "";

        if (entries.length === 0) {
            entriesList.innerHTML = '<li class="text-gray-400 text-sm text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">No activities yet. Start tracking!</li>';
            return;
        }

        entries.forEach((entry) => {
            const listItem = document.createElement("li");
            listItem.className = "flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 transition-colors group";
            
            const leftDiv = document.createElement("div");
            leftDiv.className = "flex items-center";
            
            const iconDiv = document.createElement("div");
            iconDiv.className = "bg-white p-2 rounded-lg border border-gray-100 mr-3 shadow-sm group-hover:scale-105 transition-transform";
            // Make icon orange
            iconDiv.innerHTML = '<svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            
            const activitySpan = document.createElement("span");
            activitySpan.className = "font-medium text-gray-700 capitalize";
            activitySpan.textContent = entry.activity;

            leftDiv.appendChild(iconDiv);
            leftDiv.appendChild(activitySpan);

            const durationSpan = document.createElement("span");
            durationSpan.className = "text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shadow-sm";
            durationSpan.textContent = `${entry.duration} min`;

            listItem.appendChild(leftDiv);
            listItem.appendChild(durationSpan);

            entriesList.appendChild(listItem);
        });
    }

    document.querySelector("button").addEventListener("click", addEntry);
    
    document.getElementById("duration").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addEntry();
        }
    });
});
