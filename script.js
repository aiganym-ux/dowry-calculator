document.getElementById("submit").addEventListener("click", calculateDowry);

function calculateDowry() {
    let basePrice = 100;


    const education = document.getElementById("education").value;
    const educationCoeff = {
        "undergraduate": 1.5,
        "college": 1.2,
        "high_school": 1.05,
        "middle_school": 0.9
    };
    if (education in educationCoeff) {
        basePrice *= educationCoeff[education];
    }

    // Net Worth Coefficient
    const networth = document.getElementById("networth").value;
    const networthCoeff = {
        upper: 2,
        mid: 1.5,
        lower: 1.2
    };
    if (networth === "upper_class") basePrice *= networthCoeff.upper;
    else if (networth === "middle_class") basePrice *= networthCoeff.mid;
    else if (networth === "lower_class") basePrice *= networthCoeff.lower;
    // Caste Bonus
    const caste = document.getElementById("caste").value;
    const casteBonus = {
        brahmin: 100,
        kshatriya: 50,
        vaishya: 20,
        shudra: 10,
        untouchable: -50
    };
    if (caste in casteBonus) {
        basePrice += casteBonus[caste];
    }

    // Skills Bonus
    const skillCheckboxes = document.querySelectorAll('input[name="skills"]:checked');
    const skillBonus = {
        instrument: 10,
        cook: 20,
        easygoing: 15,
        singing: 10
    };
    skillCheckboxes.forEach(skill => {
        basePrice += skillBonus[skill.value];
    });

    // Age Coefficient
    const age = document.querySelector('input[name="age"]:checked');
    if (age) {
        if (age && age.value === "18_23") basePrice *= 1.5;
        else if (age.value === "24_27") basePrice *= 1.2;
        else basePrice *= 0.95;
    }


    const reputation = document.querySelectorAll('input[name="reputation"]:checked');
    let repCoeff = 1;
    let repPenalty = 0;
    reputation.forEach(rep => {
        if (rep.value === "parents") repCoeff *= 0.85;
        if (rep.value === "character") repCoeff *= 0.9;
        if (rep.value === "general") repPenalty += 20;
    });

    basePrice = basePrice * repCoeff - repPenalty;

    const modalResult = document.getElementById("modalResult");
    modalResult.innerHTML = `💰 Final calculated dowry: $${basePrice.toFixed(2)}`;

    modalResult.classList.add("text-success", "h4");
    document.querySelector(".modal-title").textContent = "Результат расчета приданого";


    const modalContent = document.querySelector(".modal-content");
    modalContent.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
    $('#resultModal').modal('show');

}
