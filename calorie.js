document.addEventListener("DOMContentLoaded", function () {
    let entries = [];

    function addEntry() {
        const food = document.getElementById("food").value;
        const calories = document.getElementById("calories").value;

        if (food.trim() === "" || isNaN(calories) || calories <= 0) {
            alert("Please enter valid data.");
            return;
        }

        const entry = {
            food: food.trim(),
            calories: parseInt(calories),
        };

        entries.unshift(entry);
        updateEntriesList();

        document.getElementById("food").value = "";
        document.getElementById("calories").value = "";
        document.getElementById("food").focus();
    }

    function updateEntriesList() {
        const entriesList = document.getElementById("entries-list");
        const entryCount = document.getElementById("entry-count");
        const totalCaloriesEl = document.getElementById("total-calories");

        if (entryCount) {
            entryCount.textContent = entries.length;
        }

        // Calculate total calories
        let totalCals = 0;
        entries.forEach(e => totalCals += e.calories);
        if (totalCaloriesEl) {
            totalCaloriesEl.textContent = totalCals;
        }

        entriesList.innerHTML = "";

        if (entries.length === 0) {
            entriesList.innerHTML = '<li class="text-gray-400 text-sm text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">No food logged yet!</li>';
            return;
        }

        entries.forEach((entry) => {
            const listItem = document.createElement("li");
            listItem.className = "flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 transition-colors group";
            
            const leftDiv = document.createElement("div");
            leftDiv.className = "flex items-center";
            
            const iconDiv = document.createElement("div");
            iconDiv.className = "bg-white p-2 rounded-lg border border-gray-100 mr-3 shadow-sm group-hover:scale-105 transition-transform";
            iconDiv.innerHTML = '<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
            
            const foodSpan = document.createElement("span");
            foodSpan.className = "font-medium text-gray-700 capitalize";
            foodSpan.textContent = entry.food;

            leftDiv.appendChild(iconDiv);
            leftDiv.appendChild(foodSpan);

            const calSpan = document.createElement("span");
            calSpan.className = "text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100 shadow-sm";
            calSpan.textContent = `${entry.calories} kcal`;

            listItem.appendChild(leftDiv);
            listItem.appendChild(calSpan);

            entriesList.appendChild(listItem);
        });
    }

    document.querySelector("button").addEventListener("click", addEntry);
    
    document.getElementById("calories").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addEntry();
        }
    });
});
