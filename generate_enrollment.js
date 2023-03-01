
function getDataToGenerate() {
    return [
        {
            "student": "Aakriti Kumari",
            "father": "Hemant Singh"
        }
    ];
}

const studentsToGenerate = [];

function selectStudents() {
    const dataToGenerate = getDataToGenerate();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const columns = row.querySelectorAll("td");
        if (columns.length > 0) {
            const isMigrationProvided = columns.item(9).innerText.toLowerCase() != "no";
            
            const studentName = columns.item(2).innerText;
            const fatherName = columns.item(3).innerText;
            const shouldSelect = getShouldSelect(dataToGenerate, studentName, fatherName);

            if (isMigrationProvided && shouldSelect >= 0) {
                const input = columns.item(0).querySelector("input");
                const attr = input.getAttribute("disabled");
                if (attr != "disabled" && attr != true) {
                    input.setAttribute("generateEnrollment", true);

                    studentsToGenerate.push(dataToGenerate[shouldSelect]);
                    dataToGenerate = dataToGenerate.slice(shouldSelect, 1);
                }
            }
        }
    });

    console.log(dataToGenerate);
    const studentsToGenerateString = prepareStringFromArray(studentsToGenerate);

    const proceed = confirm("Select these students? \n" + studentsToGenerateString);
    if (proceed) {
        const inputsToSelect = document.querySelectorAll("[generateEnrollment=true]");
        inputsToSelect.forEach(input => input.click());
        console.log("Thanks");
    }
}

function getShouldSelect(data, studentName, fatherName) {
    for (let i = 0, l = data.length; i < l; i++) {
        const stud = data[i];
        if (stud.student.toLowerCase() == studentName.toLowerCase() && stud.father.toLowerCase() == fatherName.toLowerCase()) {
            return i;
        }
    }

    return -1;
}

function prepareStringFromArray(array) {
    var text = "";
    array.forEach(item => {
        text += `Student Name: ${item.student}, Father Name: ${item.father}\n`;
    });


    return text;
}

selectStudents();