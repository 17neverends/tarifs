document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("detailsContainer");
    const statusParagraph = document.querySelector(".status");
    let selectedType;
    let selectedDetail = null;
    fetch("/get_auth_webapp")
    .then(response => response.json())
    .then(data => {
        const authWebappValue = data.auth_webapp;
        console.log(authWebappValue);
    })
    .catch(error => console.error("Error fetching auth_webapp:", error));
    const details = {
        "details": [
            { "type": "Дверь1 - дверь1", "cost": "100р.", "datetime": "1-3 раб.д" },
            { "type": "Дверь1 - склад1", "cost": "2000р.", "datetime": "2-7 раб.д" },
            { "type": "Склад1 - дверь1", "cost": "3000р.", "datetime": "3-4 раб.д" },
            { "type": "Склад1 - склад1", "cost": "400р.", "datetime": "4-5 раб.д" },
            { "type": "Дверь2 - дверь2", "cost": "1500р.", "datetime": "1-2 раб.д" },
            { "type": "Дверь2 - склад2", "cost": "2000р.", "datetime": "2-5 раб.д" },
            { "type": "Склад2 - дверь2", "cost": "3000р.", "datetime": "3-4 раб.д" },
            { "type": "Склад2 - склад2", "cost": "4000р.", "datetime": "4-5 раб.д" },
            { "type": "Дверь3 - дверь3", "cost": "1000р.", "datetime": "1-2 раб.д" },
            { "type": "Дверь3 - склад3", "cost": "2000р.", "datetime": "2-3 раб.д" },
            { "type": "Склад3 - дверь3", "cost": "30000р.", "datetime": "7-8 раб.д" },
            { "type": "Склад3 - склад3", "cost": "4000р.", "datetime": "4-5 раб.д" }
        ]
    };

    function createDetailItem(detail) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const createAndAppend = (tag, text) => {
            const element = document.createElement(tag);
            element.textContent = text;
            itemDiv.appendChild(element);
        };

        createAndAppend("p", detail.type);
        createAndAppend("p", detail.cost);
        createAndAppend("p", detail.datetime);

        itemDiv.addEventListener("click", function () {
            if (selectedType === detail.type) {
                itemDiv.classList.remove("selected");
                selectedType = null;
                selectedDetail = null;
            } else {
                if (selectedDetail) {
                    selectedDetail.classList.remove("selected");
                }
                itemDiv.classList.add("selected");
                selectedType = detail.type;
                selectedDetail = itemDiv;
            }
        });

        return itemDiv;
    }

    function sortByCost() {
        detailsContainer.innerHTML = "";
        details.details
            .slice()
            .sort((a, b) => parseInt(a.cost) - parseInt(b.cost))
            .forEach(function (detail) {
                const itemDiv = createDetailItem(detail);
                detailsContainer.appendChild(itemDiv);
                    if (selectedType === detail.type) {
                    itemDiv.classList.add("selected");
                    selectedDetail = itemDiv;
                }
            });
    }
    
    function sortByTime() {
        detailsContainer.innerHTML = "";
        details.details
            .slice()
            .sort((a, b) => {
                const aTime = a.datetime.split(" ")[0].split("-").map(num => parseInt(num));
                const bTime = b.datetime.split(" ")[0].split("-").map(num => parseInt(num));
    
                if (aTime[0] !== bTime[0]) {
                    return aTime[0] - bTime[0];
                } else {
                    return aTime[1] - bTime[1];
                }
            })
            .forEach(function (detail) {
                const itemDiv = createDetailItem(detail);
                detailsContainer.appendChild(itemDiv);
                    if (selectedType === detail.type) {
                    itemDiv.classList.add("selected");
                    selectedDetail = itemDiv;
                }
            });
    }
    
    function resetFilters() {
        detailsContainer.innerHTML = "";
        details.details.forEach(function (detail) {
            const itemDiv = createDetailItem(detail);
            detailsContainer.appendChild(itemDiv);
                if (selectedType === detail.type) {
                itemDiv.classList.add("selected");
                selectedDetail = itemDiv;
            }
        });
    }
    

    details.details.forEach(function (detail) {
        const itemDiv = createDetailItem(detail);
        detailsContainer.appendChild(itemDiv);
    });

    document.getElementById("sortSelect").addEventListener("change", function (event) {
        const selectedOption = event.target.value;
        if (selectedOption === "default") {
            resetFilters();
        } else if (selectedOption === "cost") {
            sortByCost();
        } else if (selectedOption === "time") {
            sortByTime();
        }
    });

    document.getElementById("confirm").addEventListener("click", function () {
        if (!selectedType) {
            statusParagraph.textContent = "Выберите тариф";
        } else {
            statusParagraph.textContent = "Тариф выбран: " + selectedType;
        }
    });
});