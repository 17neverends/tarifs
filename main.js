document.addEventListener("DOMContentLoaded", function () {
    let detailsContainer = document.getElementById("detailsContainer");
    let selectedDetails;
    let statusParagraph = document.querySelector(".status");

    let details = {
        "details": [
            {
                "type": "Дверь - дверь",
                "cost": "1000р.",
                "datetime": "1-2 раб.д"
            },
            {
                "type": "Дверь - склад",
                "cost": "2000р.",
                "datetime": "2-3 раб.д"
            },
            {
                "type": "Склад - дверь",
                "cost": "3000р.",
                "datetime": "3-4 раб.д"
            },
            {
                "type": "Склад - склад",
                "cost": "4000р.",
                "datetime": "4-5 раб.д"
            },
            {
                "type": "Дверь - дверь",
                "cost": "1000р.",
                "datetime": "1-2 раб.д"
            },
            {
                "type": "Дверь - склад",
                "cost": "2000р.",
                "datetime": "2-3 раб.д"
            },
            {
                "type": "Склад - дверь",
                "cost": "3000р.",
                "datetime": "3-4 раб.д"
            },
            {
                "type": "Склад - склад",
                "cost": "4000р.",
                "datetime": "4-5 раб.д"
            }
        ]
    };

    details.details.forEach(function (detail, index) {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        let typeP = document.createElement("p");
        typeP.textContent = detail.type;
        let costP = document.createElement("p");
        costP.textContent = detail.cost;
        let datetimeP = document.createElement("p");
        datetimeP.textContent = detail.datetime;
        itemDiv.appendChild(typeP);
        itemDiv.appendChild(costP);
        itemDiv.appendChild(datetimeP);
        itemDiv.addEventListener("click", function () {
            if (selectedDetails === itemDiv) {
                itemDiv.classList.remove("selected");
                selectedDetails = null;
            } else {
                if (selectedDetails) {
                    selectedDetails.classList.remove("selected");
                }
                itemDiv.classList.add("selected");
                selectedDetails = itemDiv;
            }
        });
        detailsContainer.appendChild(itemDiv);

        if (index === 5 && details.details.length > 6) {
            detailsContainer.style.overflowY = "scroll";
            detailsContainer.style.maxHeight = "225px";
        }
    });


    let confirmButton = document.getElementById("confirm");
    confirmButton.addEventListener("click", function () {
        if (!selectedDetails) {
            statusParagraph.textContent = "Выберите тариф";
        } else {
            statusParagraph.textContent = "Тариф выбран: " + selectedDetails.querySelector("p").textContent;
        }
    });
});
